"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.readPrompts = void 0;
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
// Function to read and parse the file
async function readPrompts(filePath) {
    try {
        const fullPath = path_1.default.resolve(filePath);
        const fileContent = await fs_1.default.promises.readFile(fullPath, "utf8");
        const lines = fileContent.split("\n");
        const result = [];
        let currentPattern = null;
        lines.forEach((line) => {
            if (line.startsWith("-- ")) {
                if (currentPattern) {
                    result.push(currentPattern);
                }
                const parts = line.split(/-- ([^ ]+)( \[?(.*)?\])?/);
                currentPattern = { pattern: parts[1] };
                if (parts[3] !== undefined) {
                    currentPattern.ignore = parts[3].replace(/[ "]/g, "").split(",");
                }
            }
            else if (currentPattern) {
                currentPattern.content = (currentPattern.content || "") + line + "\n";
            }
        });
        if (currentPattern) {
            result.push(currentPattern);
        }
        // Clean up the content by removing the trailing new line
        result.forEach((pattern) => {
            if (pattern.content) {
                pattern.content = pattern.content.trim();
            }
        });
        return result;
    }
    catch (error) {
        console.error("Failed to read or parse the file:", error);
        throw error;
    }
}
exports.readPrompts = readPrompts;
