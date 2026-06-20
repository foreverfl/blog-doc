// Bundle the split OpenAPI sources into a single self-contained document.
//
// The spec is authored across static/openapi/{openapi,apple,banana}.yaml, where
// the root file pulls each resource in via `$ref: './apple.yaml#/collection'`.
// Scalar's standalone bundle does NOT fetch external $ref files in the browser,
// so we inline them at build time into one JSON document that Scalar can load.
// Invoked from docusaurus.config.js, which every docusaurus command evaluates.
const fs = require('fs');
const path = require('path');
const yaml = require('js-yaml');

const openapiDir = path.join(__dirname, '..', 'static/openapi');
const rootFile = path.join(openapiDir, 'openapi.yaml');
const outFile = path.join(openapiDir, 'openapi.bundle.json');

// Resolve `#/a/b/c` against an already-parsed document.
function resolvePointer(doc, pointer) {
  return pointer
    .replace(/^#\//, '')
    .split('/')
    .reduce((node, key) => node[key], doc);
}

module.exports = function bundleOpenapi() {
  if (!fs.existsSync(rootFile)) {
    return;
  }
  const root = yaml.load(fs.readFileSync(rootFile, 'utf8'));
  const cache = {};
  const loadResource = (file) => {
    if (!cache[file]) {
      cache[file] = yaml.load(fs.readFileSync(path.join(openapiDir, file), 'utf8'));
    }
    return cache[file];
  };

  // Inline each external path-item ref and collect the resource files used.
  for (const [route, value] of Object.entries(root.paths || {})) {
    const ref = value && value.$ref;
    const match = typeof ref === 'string' && ref.match(/^\.\/(.+?)(#\/.+)$/);
    if (!match) {
      continue;
    }
    const [, file, pointer] = match;
    const resource = loadResource(file);
    root.paths[route] = resolvePointer(resource, pointer);
  }

  // Merge every resource's component schemas into the root so the inlined
  // operations' `#/components/schemas/*` refs resolve in the single document.
  root.components = root.components || {};
  root.components.schemas = root.components.schemas || {};
  for (const resource of Object.values(cache)) {
    Object.assign(root.components.schemas, resource.components?.schemas || {});
  }

  fs.writeFileSync(outFile, JSON.stringify(root, null, 2));
};
