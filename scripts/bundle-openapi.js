// Merge the blog-v2 OpenAPI domain specs into one Scalar-loadable document.
//
// CI fetches the specs (one standalone OpenAPI doc per backend domain) from
// blog-v2 and points OPENAPI_SPECS_SRC at them. Their paths and components are
// merged into a single self-contained static/openapi/openapi.bundle.json,
// since Scalar's browser bundle can't follow external $refs. Invoked from
// docusaurus.config.js.
const fs = require('fs');
const path = require('path');
const yaml = require('js-yaml');

// CI sets OPENAPI_SPECS_SRC; the sibling path is a local-dev fallback.
const defaultSrc = path.join(
  __dirname,
  '..',
  '..',
  'blog-v2/doc-source/openapi/specs',
);
const specsDir = process.env.OPENAPI_SPECS_SRC || defaultSrc;
const outFile = path.join(__dirname, '..', 'static/openapi/openapi.bundle.json');

module.exports = function bundleOpenapi() {
  if (!fs.existsSync(specsDir)) {
    // Source specs not present (e.g. blog-v2 not checked out as a sibling).
    // Leave any previously generated bundle in place.
    return;
  }
  const files = fs
    .readdirSync(specsDir)
    .filter((file) => file.endsWith('.yaml') || file.endsWith('.yml'))
    .sort();
  if (files.length === 0) {
    return;
  }

  const bundle = {
    openapi: '3.1.0',
    info: {title: 'mogumogu API', version: '1.0.0'},
    tags: [],
    paths: {},
    components: {},
  };
  const seenTags = new Set();

  for (const file of files) {
    const spec = yaml.load(fs.readFileSync(path.join(specsDir, file), 'utf8'));
    if (!spec) {
      continue;
    }

    for (const tag of spec.tags || []) {
      if (!seenTags.has(tag.name)) {
        seenTags.add(tag.name);
        bundle.tags.push(tag);
      }
    }
    // Pin each domain's servers onto its own paths so domains keep separate
    // base URLs in the merged doc.
    const specServers = spec.servers || [];
    for (const [route, item] of Object.entries(spec.paths || {})) {
      if (bundle.paths[route]) {
        console.warn(`[bundle-openapi] ${file}: path ${route} overwrites an earlier spec`);
      }
      bundle.paths[route] =
        specServers.length && !item.servers ? {...item, servers: specServers} : item;
    }
    // Every components subsection (schemas, parameters, responses, …) is a
    // map of named objects, so merge whichever ones the spec actually has.
    for (const [group, entries] of Object.entries(spec.components || {})) {
      bundle.components[group] = bundle.components[group] || {};
      for (const [name, value] of Object.entries(entries)) {
        if (bundle.components[group][name]) {
          console.warn(`[bundle-openapi] ${file}: component ${group}/${name} overwrites an earlier spec`);
        }
        bundle.components[group][name] = value;
      }
    }
  }

  fs.writeFileSync(outFile, JSON.stringify(bundle, null, 2));
};
