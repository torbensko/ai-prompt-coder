"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.iterativelyGenerateFilesFromPrompts = void 0;
const generateFilesFromPrompts_1 = require("./generateFilesFromPrompts");
const iterativelyGenerateFilesFromPrompts = async (incompleteFilePrompts) => {
    let generatedCount = 0;
    let remainingPrompts = incompleteFilePrompts;
    do {
        const { generated, failed } = await (0, generateFilesFromPrompts_1.generateFilesFromPrompts)(remainingPrompts);
        // keep generating until unable to generate anything
        generatedCount = generated.length;
        // update the list based on the failed prompts
        remainingPrompts = {};
        failed.forEach((path) => {
            remainingPrompts[path] = incompleteFilePrompts[path];
        });
    } while (generatedCount > 0);
    // report the files that could not be generated
    return Object.keys(remainingPrompts);
};
exports.iterativelyGenerateFilesFromPrompts = iterativelyGenerateFilesFromPrompts;
