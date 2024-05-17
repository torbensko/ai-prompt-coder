"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.promptFilePathToTargetFilePath = void 0;
function promptFilePathToTargetFilePath(filePath) {
    const target = filePath.replace(".prompt", "").replace("/_prompts/", "/");
    return target;
}
exports.promptFilePathToTargetFilePath = promptFilePathToTargetFilePath;
