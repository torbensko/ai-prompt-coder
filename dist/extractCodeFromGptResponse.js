"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.extractCodeFromGptResponse = void 0;
/**
 * This function extracts any codeblocks from the input text.
 * The block will always start and end with ```.
 * @param textFromGpt string
 * @returns string
 */
function extractCodeFromGptResponse(textFromGpt) {
    const matched = textFromGpt.match(/```[\s\S]*?```/g);
    if (!matched)
        return "";
    return matched
        .map((codeBlock) => {
        return codeBlock
            .replace(/```[\w\s]*\n/g, "") // remove the opening tag
            .replace(/\n```/g, ""); // remove the closing tag
    })
        .join("\n\n");
}
exports.extractCodeFromGptResponse = extractCodeFromGptResponse;
