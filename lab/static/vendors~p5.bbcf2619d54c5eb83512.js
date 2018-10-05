(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["vendors~p5"],{

/***/ "nbcw":
/*!*********************************************************************!*\
  !*** ./node_modules/@deathbeds/jyve-kyrnel-p5-unsafe/lib/kernel.js ***!
  \*********************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const jyve_kyrnel_js_unsafe_1 = __webpack_require__(/*! @deathbeds/jyve-kyrnel-js-unsafe */ "5rgu");
const kernel_1 = __webpack_require__(/*! @deathbeds/jyve/lib/kernel */ "0amK");
// tslint:disable-next-line
const { jyve } = __webpack_require__(/*! ../package.json */ "UUHW");
exports.kernelSpec = jyve.kernelspec;
class P5UnsafeKernel extends jyve_kyrnel_js_unsafe_1.JSUnsafeKernel {
    constructor(options, id) {
        super(options, id);
        this.kernelSpec = exports.kernelSpec;
        this.frameChanged.connect((_, iframe) => __awaiter(this, void 0, void 0, function* () {
            if (iframe && iframe.contentWindow) {
                yield P5UnsafeKernel.p5(iframe.contentWindow);
            }
        }));
    }
    jyveInfo() {
        const jsInfo = super.jyveInfo();
        return Object.assign({}, jsInfo, { help_links: [...jsInfo.help_links, ...jyve.help_links], implementation: exports.kernelSpec.name, language_info: jyve.language_info });
    }
}
exports.P5UnsafeKernel = P5UnsafeKernel;
(function (P5UnsafeKernel) {
    function p5(window) {
        return __awaiter(this, void 0, void 0, function* () {
            const document = window.document;
            if (window.p5) {
                return window.p5;
            }
            const p5Src = __webpack_require__(/*! !raw-loader!p5/lib/p5.js */ "yhvO");
            const p5Script = document.createElement('script');
            p5Script.textContent = p5Src;
            p5Script.id = 'jyve-kyrnel-p5';
            document.body.appendChild(p5Script);
            let timeout = 0.5;
            while (!window.p5) {
                yield kernel_1.JyveKernel.wait(timeout);
                timeout = timeout * 2;
            }
            return window.p5;
        });
    }
    P5UnsafeKernel.p5 = p5;
})(P5UnsafeKernel = exports.P5UnsafeKernel || (exports.P5UnsafeKernel = {}));


/***/ }),

/***/ "yhvO":
/*!*************************************************************!*\
  !*** ./node_modules/raw-loader!./node_modules/p5/lib/p5.js ***!
  \*************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {


/***/ })

}]);
//# sourceMappingURL=vendors~p5.bbcf2619d54c5eb83512.js.map