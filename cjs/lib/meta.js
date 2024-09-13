"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getRequire = exports.getDirName = void 0;

function getDirName() {
    return __dirname;
}
exports.getDirName = getDirName;

function getRequire() {
    return require;
}
exports.getRequire = getRequire;
