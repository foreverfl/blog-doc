# Authoring Guide (RAG-friendly information architecture)

This internal reference is not built into the site (`_` prefix). Both hand-written
docs and docs auto-generated from `blog-v2` **must follow this template**.

> Korean mirror: `_authoring-ko.md`. English here is the source of truth; when you
> edit one, mirror the change in the other.

## Two areas

This repo builds two areas.

- **API** (`/api`) — blog-v2 backend endpoint reference, generated from OpenAPI
  via Scalar.
- **Docs** (sidebar) — the **mogumogu.dev blog usage guide**. Explains what each
  page is and what the on-screen buttons/elements do.

This guide is the authoring standard for the **Docs** area.

## Why this template exists

Docs are both a human-readable **usage guide** and a **RAG source** for search and
Q&A. Chunk self-containment and metadata are decided *at authoring time*, so fitting
docs to RAG after writing them means a full rewrite. Writing to this template from
the start means the docs load straight into RAG.

## Six principles

1. **One doc = one page.** A doc describes one blog screen (page) and covers the
   role of every area and button on it. It reads complete on its own.
2. **Headings = chunk boundaries.** H2/H3 become the retrieval chunk units. Each H2
   must read on its own.
3. **Metadata in frontmatter.** Fill every field in the schema below — search,
   filtering, and freshness signals all come from here.
4. **Question/task-form sections.** Prefer "How do I …?" or "…-ing" so headings
   align with real user-question embeddings.
5. **Text first, alt required on images.** RAG cannot read images. Keep key
   information in body text and give every image a descriptive alt.
6. **Same structure across three languages.** en/ko/ja must share the same headings
   and the same explicit anchors (`{#id}`) so links and chunks stay aligned.

## Frontmatter schema

| Field | Required | Purpose | Example |
| --- | :---: | --- | --- |
| `title` | ✅ | Chunk title. Matches the H1 | `Post list` |
| `description` | ✅ | One-sentence summary (≤120 chars). Chunk summary + meta description | `What the post list screen shows and how to open a post` |
| `keywords` | ✅ | Search/embedding match terms. Include synonyms | `[posts, list, feed]` |
| `tags` | ✅ | Facet classification | `[posts, navigation]` |
| `source` | ✅ | Origin: `manual` or `generated` | `manual` |
| `last_verified` | ✅ | Freshness signal (YYYY-MM-DD) | `2026-06-20` |
| `audience` | ⬜ | Reader: `reader` / `admin` / `all` | `reader` |
| `sidebar_position` | ⬜ | Sidebar order | `2` |

Auto-generated docs must set `source: generated` so they are distinguishable from
hand-written ones and can be picked out for verification and refresh.

## Heading rules (chunk boundaries)

- **Exactly one H1 per doc** — it is the page itself and matches `title`.
- **H2 is a major section = primary chunk boundary** — each H2 must read on its own.
- **H3 is a sub-item** — never skip a level (no H2 → H4).
- **Repeat the subject instead of pronouns** — "it/this" depends on the previous
  chunk, so meaning is lost when a chunk is split. Restate the subject.
- **Split sections that grow too long** — if one section runs well past a screen,
  break it into H3s.

## Category skeleton

The Docs sidebar **mirrors the blog's sidebar menu structure in order, up to depth
2**. A top menu is a category; the pages inside it are documents. One document maps
to one blog page.

```
docs/docs/
  <top-menu-1>/
    _category_.json
    <page-a>.md     # one blog page = one document
    <page-b>.md
  <top-menu-2>/
    _category_.json
    ...
```

(Real menu names and order follow the blog sidebar exactly.)

Each category gets a `_category_.json`.

```json
{
  "label": "<menu name>",
  "position": 2,
  "link": { "type": "generated-index", "slug": "/docs/<menu-slug>" }
}
```

- `label` — the blog sidebar menu name, verbatim
- `position` — sidebar order (matches the blog menu order)
- `link.slug` — always `/docs/<menu-slug>` (prevents generated indexes from leaking
  to `/category/*`)

## Content pipeline (mapping → fill)

CI/CD maintains Docs in two stages. The contract between them is the **mapping
file** (`docs-map.yaml`), which is the source of truth for the sidebar structure.

1. **Map** — read the blog sidebar and (re)generate the menu/page structure into
   `docs-map.yaml`. When the blog menu changes, this file is updated.
2. **Fill** — for each page, visit the real blog page (`url`) and generate en/ko/ja
   docs from the frontmatter schema + `_template.md` structure. Track progress with
   `status` so an updated mapping only fills new pages.

Mapping schema (`docs-map.yaml`):

```yaml
menus:                      # sidebar top-level menus = categories, in order
  - slug: posts             # /docs/posts, category dir name
    label: { en: Posts, ko: 게시글, ja: 記事 }
    position: 1
    pages:                  # pages inside the menu = documents (depth 2)
      - slug: list
        label: { en: Post list, ko: 게시글 목록, ja: 記事一覧 }
        url: /              # real blog path the fill stage visits
        status: pending     # pending | generated | manual
```

| Field | Level | Purpose |
| --- | --- | --- |
| `menus[].slug` | menu | category dir name / slug |
| `menus[].label` | menu | three-language category label |
| `menus[].position` | menu | sidebar order |
| `pages[].slug` | page | document file name / slug |
| `pages[].label` | page | three-language page label |
| `pages[].url` | page | real blog path (the fill stage reads it) |
| `pages[].status` | page | `pending` / `generated` / `manual` |

## Authoring checklist

- [ ] One doc = one page, reads complete on its own
- [ ] All required frontmatter fields filled
- [ ] Each H2 is self-contained (no pronoun dependency on a prior section)
- [ ] Section headings are question/task-form
- [ ] Every image has a descriptive alt; key info is also in body text
- [ ] en/ko/ja share the same headings and the same explicit anchors
- [ ] Auto-generated docs are marked `source: generated`
