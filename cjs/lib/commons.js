"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.resolvePath = resolvePath;
exports.isElectronWebpack = isElectronWebpack;
const path_1 = __importDefault(require("path"));
function resolvePath(filePath, file) {
    if (!filePath) {
        return '';
    }
    return (file ? path_1.default.resolve(filePath, file) : path_1.default.resolve(filePath)).replace(/\\/g, '/');
}
/**
  * detect if electron https://github.com/electron/electron/issues/2288
 */
function isElectronWebpack() {
    // return process.versions.hasOwnProperty('electron');
    // assume module required by webpack if no system path inv envs
    return !process.env.path
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        && global.window && global.window.process && global.window.process.type
        && global.navigator && ((global.navigator.userAgent || '').toLowerCase().indexOf(' electron/') > -1);
}
