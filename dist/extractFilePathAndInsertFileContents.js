"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.extractFilePathAndInsertFileContents = void 0;
const promises_1 = __importDefault(require("fs/promises"));
const path_1 = require("path");
const path_2 = __importDefault(require("path"));
const lodash_1 = __importDefault(require("lodash"));
const regex = /\[\[(.*?)\]\]/g;
/**
 * Within the given text, it teplaces the pattern [[filepath]]
 * with "(contents below)" and appends the contents of the specified file at the
 * end of text.
 *
 * @param text
 * @param basePath The path base path for the file that all filepaths are assumed
 * to be relative to.
 * @returns
 */
const extractFilePathAndInsertFileContents = async (text, basePath) => {
    let match;
    let replacedText = text;
    let fileContents = "";
    while ((match = regex.exec(text)) !== null) {
        let filePath = match[1];
        replacedText = lodash_1.default.replace(replacedText, match[0], "(contents below)");
        try {
            // TODO return null when unable to read a file rather than error out
            let fileContent = await promises_1.default.readFile((0, path_1.join)(path_2.default.dirname(basePath), filePath), "utf8");
            fileContents += `\nContents of ${filePath}:\n\`\`\`\n${fileContent}\n\`\`\`\n`;
        }
        catch (err) {
            console.error(`Failed to read file at ${filePath}`, err);
            throw err;
        }
    }
    return `${replacedText}\n${fileContents}`;
};
exports.extractFilePathAndInsertFileContents = extractFilePathAndInsertFileContents;
