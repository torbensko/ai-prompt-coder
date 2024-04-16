"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.promptFilePathToTargetFilePath = void 0;
function promptFilePathToTargetFilePath(filePath) {
    return filePath.replace(".prompt", "");
}
exports.promptFilePathToTargetFilePath = promptFilePathToTargetFilePath;
