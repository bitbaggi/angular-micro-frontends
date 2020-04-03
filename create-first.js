/**
 * Creates a __ivy_ngcc__ bundle of
 * - custom-elements polyfill
 * - first-component
 * - shared-service
 * - @microsoft/applicationinsights-web
 *
 * Execute with 'node create-first.js'
 * Adjust OUTPUT_FILENAME to fit your needs.
 *
 * CAUTION:
 * Don't forget to precompile your angular libraries with Ivy.
 * 'ngcc --properties main es2015'
 */

const fs = require("fs");
const OUTPUT_FILENAME = 'dist/bundle.first.js';
let bundle = '';

// Add required libs
processCustomElements();
// Add Angular Bundles
write('node_modules/@microsoft/applicationinsights-web/dist/applicationinsights-web.js');
write('node_modules/@angular-mfe/shared/__ivy-ngcc__/bundles/angular-mfe-shared.umd.js');
write('dist/first/bundles/angular-mfe-first.umd.js');


// Check if /dist folder exists
try {
  fs.statSync("dist").isDirectory()
} catch (e) {
  fs.mkdirSync("dist");
}
// Write out file
fs.writeFileSync(OUTPUT_FILENAME, bundle, 'utf8');

/**
 * Helper function to add content of a file to the bundle
 * @param path
 */
function write(path) {
  try {
    bundle += `${fs.readFileSync(path, 'utf8')}\n`;
  } catch {
  }
}

/**
 * Adds custom element polyfill to the bundle
 */
function processCustomElements() {
  bundle += `
(function () {
    'use strict';
    (function(){if(void 0===window.Reflect||void 0===window.customElements||window.customElements.polyfillWrapFlushCallback)return;const a=HTMLElement;window.HTMLElement={HTMLElement:function HTMLElement(){return Reflect.construct(a,[],this.constructor)}}.HTMLElement,HTMLElement.prototype=a.prototype,HTMLElement.prototype.constructor=HTMLElement,Object.setPrototypeOf(HTMLElement,a);})();
}());
  `
}
