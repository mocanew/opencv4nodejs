"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = extendWithJsSources;
const drawUtils_js_1 = __importDefault(require("./drawUtils.js"));
const deprecations_js_1 = __importDefault(require("./deprecations.js"));
const misc_js_1 = __importDefault(require("./misc.js"));
function extendWithJsSources(cv) {
    // add functions
    (0, drawUtils_js_1.default)(cv);
    // add functions
    (0, misc_js_1.default)(cv);
    // add wrapper on calcHist function
    (0, deprecations_js_1.default)(cv);
    return cv;
}
