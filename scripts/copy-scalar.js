// Copy the Scalar standalone bundle from node_modules into static/ so the
// API reference page (static/api/index.html) loads it locally instead of from
// a CDN. Invoked from docusaurus.config.js, which every docusaurus command
// evaluates, so the bundle is always present before start/build/serve.
const fs = require('fs');
const path = require('path');

const source = path.join(
  __dirname,
  '..',
  'node_modules/@scalar/api-reference/dist/browser/standalone.js',
);
const destination = path.join(__dirname, '..', 'static/api/scalar.js');

module.exports = function copyScalarBundle() {
  if (!fs.existsSync(source)) {
    // Dependency not installed yet — skip quietly rather than fail the build.
    return;
  }
  // Re-copy only when missing or stale (size mismatch), to keep commands fast.
  const sourceSize = fs.statSync(source).size;
  const upToDate =
    fs.existsSync(destination) && fs.statSync(destination).size === sourceSize;
  if (upToDate) {
    return;
  }
  fs.mkdirSync(path.dirname(destination), {recursive: true});
  fs.copyFileSync(source, destination);
};
