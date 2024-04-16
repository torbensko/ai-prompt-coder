#!/usr/bin/env node
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const readPrompts_1 = require("./readPrompts");
const buildPromptsFromRules_1 = require("./buildPromptsFromRules");
const removeGeneratedFilePrompts_1 = require("./removeGeneratedFilePrompts");
const iterativelyGenerateFilesFromPrompts_1 = require("./iterativelyGenerateFilesFromPrompts");
(async () => {
    const rules = await (0, readPrompts_1.readPrompts)("rules.prompt");
    // builds all possible prompts
    const filePrompts = await (0, buildPromptsFromRules_1.buildPromptsFromRules)(rules);
    // removes the prompts that have already been processed
    const incompleteFilePrompts = (0, removeGeneratedFilePrompts_1.removeGeneratedFilePrompts)(filePrompts);
    const failedFiles = await (0, iterativelyGenerateFilesFromPrompts_1.iterativelyGenerateFilesFromPrompts)(incompleteFilePrompts);
    failedFiles.forEach((path) => {
        console.warn(`Unable to generate ${path}`);
    });
    process.exit();
})();
