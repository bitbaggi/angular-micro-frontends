/**
 * Creates a bundle out of
 * - custom-elements polyfill
 * - zonejs
 * - rxjs
 * - angular/angular packages
 * - angular/cdk packages
 * - angular/material packages
 *
 * Execute with 'node create-bundle.js'
 * Adjust OUTPUT_FILENAME to fit your needs.
 *
 * CAUTION:
 * Don't forget to precompile your angular libraries with Ivy.
 * 'ngcc --properties main es2015'
 *
 * cheers
 * flash :zap:
 */

const fs = require("fs");
const OUTPUT_FILENAME = 'dist/bundle.angular.js';
let bundle = '';

// Add required libs
processCustomElements();
write('node_modules/zone.js/dist/zone.min.js');
write('node_modules/rxjs/bundles/rxjs.umd.min.js');

// Add Angular Bundles
processNgCore();
//processNgCdk();
//processNgMat();

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
 * Adds all angular angular packages to the bundle
 */
function processNgCore() {
  function writeCore(strings) {
    try {
      bundle += fs.readFileSync(`node_modules/@angular/${strings[0]}/__ivy_ngcc__/bundles/${strings[0]}.umd.js`, 'utf8') + '\n';
    } catch {
    }
  }

  writeCore`core`;
  writeCore`common`;
  write('node_modules/@angular/common/bundles/common-http.umd.js');
  writeCore`platform-browser`;
  //writeCore`animations`;
  //writeCore`forms`;
  writeCore`elements`;
}

/**
 * Adds all angular cdk packages to the bundle
 */
function processNgCdk() {
  function writeCdk(strings) {
    try {
      bundle += fs.readFileSync(`node_modules/@angular/cdk/bundles/cdk-${strings[0]}.umd.js`, 'utf8') + '\n';
    } catch {
    }
  }

  write('node_modules/@angular/cdk/bundles/cdk.umd.js');
  writeCdk`platform`;
  write('node_modules/@angular/cdk/bundles/cdk-coercion.umd.js');
  writeCdk`bidi`;
  writeCdk`observers`;
  writeCdk`a11y`;
  writeCdk`scrolling`;
  writeCdk`portal`;
  writeCdk`text-field`;
  writeCdk`layout`;
  writeCdk`clipboard`;
  writeCdk`collections`;
  writeCdk`keycodes`;
  writeCdk`drag-drop`;
  writeCdk`accordion`;
  writeCdk`overlay`;
  writeCdk`stepper`;
  writeCdk`tree`;
  writeCdk`table`;
}

/**
 * Adds all angular material packages to the bundle
 */
function processNgMat() {
  function writeMat(strings) {
    try {
      bundle += fs.readFileSync(`node_modules/@angular/material/bundles/material-${strings[0]}.umd.js`, 'utf8') + '\n';
    } catch {
    }
  }

  write('node_modules/@angular/animations/bundles/animations-browser.umd.js');
  write('node_modules/@angular/platform-browser/bundles/platform-browser-animations.umd.js');
  writeMat`core`;
  writeMat`sort`;
  writeMat`button`;
  writeMat`form-field`;
  writeMat`input`;
  writeMat`tooltip`;
  writeMat`select`;
  writeMat`slide-toggle`;
  writeMat`tabs`;
  writeMat`paginator`;
  writeMat`progress-bar`;
  writeMat`divider`;
  writeMat`dialog`;
  writeMat`sidenav`;
  writeMat`slider`;
  writeMat`radio`;
  writeMat`progress-spinner`;
  writeMat`tree`;
  writeMat`icon-testing`;
  writeMat`expansion`;
  writeMat`button-toggle`;
  writeMat`card`;
  writeMat`list`;
  writeMat`toolbar`;
  writeMat`chips`;
  writeMat`table`;
  writeMat`autocomplete`;
  writeMat`grid-list`;
  writeMat`icon`;
  writeMat`datepicker`;
  writeMat`snack-bar`;
  writeMat`stepper`;
  writeMat`checkbox`;
  writeMat`menu`;
  writeMat`bottom-sheet`;
  writeMat`badge`;
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
