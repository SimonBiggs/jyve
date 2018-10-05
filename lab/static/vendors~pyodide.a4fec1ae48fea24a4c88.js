(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["vendors~pyodide"],{

/***/ "CzyC":
/*!***************************************************************************!*\
  !*** ./node_modules/@deathbeds/jyve-kyrnel-pyodide-unsafe/lib/pyodyde.js ***!
  \***************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// FIXME: need to pull this off the app
// const baseURL = '/jyve/vendor/pyodide-demo/';
Object.defineProperty(exports, "__esModule", { value: true });
const DEBUG = false;
/**
 * The main bootstrap script for loading pyodide.
 */
function getPyodide(window, baseURL) {
    return new Promise((resolve, reject) => {
        const document = window.document;
        ////////////////////////////////////////////////////////////
        // Package loading
        let loadedPackages = new Set();
        let loadPackage = (names) => {
            // DFS to find all dependencies of the requested packages
            let packages = window.pyodide.packages.dependencies;
            let queue = new Array(...names);
            let toLoad = new Set();
            while (queue.length) {
                const _package = queue.pop();
                if (!loadedPackages.has(_package)) {
                    toLoad.add(_package);
                    if (packages.hasOwnProperty(_package)) {
                        packages[_package].forEach((subpackage) => {
                            if (!loadedPackages.has(subpackage) && !toLoad.has(subpackage)) {
                                queue.push(subpackage);
                            }
                        });
                    }
                    else {
                        console.log(`Unknown package '${_package}'`);
                    }
                }
            }
            let promise = new Promise((resolve, reject) => {
                if (toLoad.size === 0) {
                    console.log(`No new packages to load`);
                    resolve('No new packages to load');
                }
                window.pyodide.monitorRunDependencies = (n) => {
                    if (n === 0) {
                        toLoad.forEach((_package) => loadedPackages.add(_package));
                        delete window.pyodide.monitorRunDependencies;
                        const packageList = Array.from(toLoad.keys()).join(', ');
                        console.log(`Loaded ${packageList}`);
                        resolve(`Loaded ${packageList}`);
                    }
                };
                toLoad.forEach((_package) => {
                    let script = document.createElement('script');
                    script.src = `${baseURL}${_package}.js`;
                    script.onerror = (e) => {
                        reject(e);
                    };
                    document.body.appendChild(script);
                });
                // We have to invalidate Python's import caches, or it won't
                // see the new files. This is done here so it happens in parallel
                // with the fetching over the network.
                console.log(`invalidating import cache`);
                window.pyodide.runPython('import importlib as _importlib\n' + '_importlib.invalidate_caches()\n');
            });
            return promise;
        };
        function fixRecursionLimit(pyodide) {
            // The Javascript/Wasm call stack may be too small to handle the default
            // Python call stack limit of 1000 frames. This is generally the case on
            // Chrom(ium), but not on Firefox. Here, we determine the Javascript call
            // stack depth available, and then divide by 50 (determined heuristically)
            // to set the maximum Python call stack depth.
            let depth = 0;
            function recurse() {
                depth += 1;
                recurse();
            }
            try {
                recurse();
            }
            catch (err) {
                if (DEBUG) {
                    console.error(err);
                }
            }
            let recursionLimit = depth / 50;
            if (recursionLimit > 1000) {
                recursionLimit = 1000;
            }
            console.log(`Recursion limit set to ${recursionLimit}`);
            pyodide.runPython(`import sys; sys.setrecursionlimit(int(${recursionLimit}))`);
        }
        ////////////////////////////////////////////////////////////
        // Loading Pyodide
        let wasmURL = `${baseURL}pyodide.asm.wasm`;
        // tslint:disable-next-line
        let Module = {};
        window.Module = Module;
        Module.noImageDecoding = true;
        Module.noAudioDecoding = true;
        let isFirefox = navigator.userAgent.toLowerCase().indexOf('firefox') > -1;
        if (isFirefox) {
            console.log('Skipping wasm decoding');
            Module.noWasmDecoding = true;
        }
        // tslint:disable-next-line
        const wasm_promise = WebAssembly.compileStreaming(fetch(wasmURL));
        Module.instantiateWasm = (info, receiveInstance) => {
            wasm_promise
                .then((module) => {
                console.log('instantiating wasm');
                return WebAssembly.instantiate(module, info);
            })
                .then((instance) => {
                console.log('receiving instance');
                return receiveInstance(instance);
            });
            return {};
        };
        Module.filePackagePrefixURL = baseURL;
        Module.locateFile = (path) => baseURL + path;
        const postRunPromise = new Promise((resolve) => {
            Module.postRun = () => {
                delete window.Module;
                window.pyodide.packages = { dependencies: {} };
                fixRecursionLimit(window.pyodide);
                resolve();
                console.log('fetching packages');
                fetch(`${baseURL}packages.json`)
                    .then((response) => response.json())
                    .then((json) => {
                    console.log('received json');
                    window.pyodide.packages = json;
                    fixRecursionLimit(window.pyodide);
                    resolve();
                });
            };
        });
        // const dataLoadPromise = new Promise((resolve) => {
        //   console.log('configuring monitorRunDependencies');
        //   Module.monitorRunDependencies = (n: number) => {
        //     console.log('monitorRunDependencies', n);
        //     if (n === 0) {
        //       delete Module.monitorRunDependencies;
        //       console.log('resolving monitorRunDependencies');
        //       resolve();
        //     }
        //   };
        // });
        Promise.all([postRunPromise /*, dataLoadPromise */])
            .then(() => {
            console.log('resolving the big Promise');
            // callback();
            resolve();
        })
            .catch((err) => {
            console.log('REJECTING the big Promise');
            reject(err);
        });
        // tslint:disable-next-line
        let data_script = document.createElement('script');
        data_script.src = `${baseURL}pyodide.asm.data.js`;
        data_script.onload = () => {
            let script = document.createElement('script');
            script.src = `${baseURL}pyodide.asm.js`;
            script.onload = function () {
                // tslint:disable-next-line
                window.pyodide = window.pyodide(Module);
                window.pyodide.loadPackage = loadPackage;
                console.log('ok, window has pyodide');
            };
            document.head.appendChild(script);
            console.log('appending package script');
        };
        document.head.appendChild(data_script);
        console.log('appending data script');
    });
}
exports.getPyodide = getPyodide;


/***/ }),

/***/ "g3ZM":
/*!**************************************************************************!*\
  !*** ./node_modules/@deathbeds/jyve-kyrnel-pyodide-unsafe/lib/kernel.js ***!
  \**************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// tslint:disable-next-line
/// <reference path="../../../node_modules/@types/webassembly-js-api/index.d.ts"/>
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const services_1 = __webpack_require__(/*! @jupyterlab/services */ "S9up");
const coreutils_1 = __webpack_require__(/*! @jupyterlab/coreutils */ "hI0s");
const jyve_kyrnel_js_unsafe_1 = __webpack_require__(/*! @deathbeds/jyve-kyrnel-js-unsafe */ "5rgu");
const pyodyde_1 = __webpack_require__(/*! ./pyodyde */ "CzyC");
// tslint:disable-next-line
const pkg = __webpack_require__(/*! ../package.json */ "GIzp");
exports.kernelSpec = pkg.jyve.kernelspec;
class PyodideUnsafeKernel extends jyve_kyrnel_js_unsafe_1.JSUnsafeKernel {
    constructor() {
        super(...arguments);
        this.kernelSpec = exports.kernelSpec;
    }
    jyveInfo() {
        const jsInfo = super.jyveInfo();
        return Object.assign({}, jsInfo, { help_links: [...jsInfo.help_links, ...pkg.jyve.help_links], implementation: exports.kernelSpec.name, language_info: pkg.jyve.language_info });
    }
    pyodideWindow() {
        return __awaiter(this, void 0, void 0, function* () {
            // return (await this.iframe()).contentWindow as IPyodideWindow;
            return window;
        });
    }
    pyodide() {
        return __awaiter(this, void 0, void 0, function* () {
            let window = yield this.pyodideWindow();
            if (!window.pyodide) {
                let baseURL = coreutils_1.URLExt.join(services_1.ServerConnection.makeSettings().baseUrl, 'jyve', 'vendor', 'pyodide-demo') + '/';
                yield pyodyde_1.getPyodide(window, baseURL);
                console.log('we have pyodide in kernel');
            }
        });
    }
    resetUserNS() {
        // TODO: Clear the namespace on the Python side
        this.userNS = {};
    }
    execNS(parent) {
        const _super = name => super[name];
        return __awaiter(this, void 0, void 0, function* () {
            let window = yield this.pyodideWindow();
            let execNS = yield _super("execNS").call(this, parent);
            console.log('waiting for pyodide in execNS');
            try {
                yield this.pyodide();
            }
            catch (err) {
                console.error('EXECNS ERROR', err);
                return;
            }
            console.log("...and we're back in execNS");
            // pyodide.$options = {debug: DEBUG ? 10 : 0};
            execNS = Object.assign({}, execNS, { __PYODIDE__: window.pyodide });
            // TODO: rich display, type inspection
            window.pyodide.write = (data) => {
                console.log('displaying', data);
                this.sendJSON(this.fakeDisplayData(parent, {
                    'text/plain': `${data}`,
                }));
            };
            window.pyodide.runPython('from js import window as _window\n' +
                'import sys\n' +
                'sys.stdout.write = _window.pyodide.write\n' +
                'sys.stderr.write = _window.pyodide.write\n');
            return execNS;
        });
    }
    transpile(code) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log('waiting for pyodide in transpile');
            yield this.pyodide();
            console.log('got it');
            const src = JSON.stringify(code);
            return `__PYODIDE__.runPython(${src});`;
        });
    }
}
exports.PyodideUnsafeKernel = PyodideUnsafeKernel;


/***/ })

}]);
//# sourceMappingURL=vendors~pyodide.a4fec1ae48fea24a4c88.js.map