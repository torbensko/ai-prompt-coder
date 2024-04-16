"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.buildPromptsFromRules = void 0;
const glob = require("glob");
/**
 * Constructs GPT prompts based on a set of glob patterns.
 *
 * @param rules
 * @returns
 */
const buildPromptsFromRules = async (rules) => {
    const filePrompts = {};
    rules.forEach((rule) => {
        const options = {
            ignore: ["node_modules/**", ...(rule.ignore || [])]
        };
        const files = glob.sync(rule.pattern, options);
        // console.log(rule.pattern, files);
        files.forEach((filePath) => {
            filePrompts[filePath] =
                (filePrompts[filePath] ? `${filePrompts[filePath]}\n` : "") +
                    rule.content;
        });
    });
    return filePrompts;
};
exports.buildPromptsFromRules = buildPromptsFromRules;
