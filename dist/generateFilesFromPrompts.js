"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateFilesFromPrompts = void 0;
const fs_1 = __importDefault(require("fs"));
const extractFilePathAndInsertFileContents_1 = require("./extractFilePathAndInsertFileContents");
const extractCodeFromGptResponse_1 = require("./extractCodeFromGptResponse");
const sendPromptToChatGPT_1 = require("./sendPromptToChatGPT");
const promptFilePathToTargetFilePath_1 = require("./promptFilePathToTargetFilePath");
const settings_1 = require("./settings");
const generateFilesFromPrompts = async (filePrompts) => {
    const filePaths = Object.keys(filePrompts);
    const processedFiles = [];
    const failedFiles = [];
    for (var i = 0; i < filePaths.length; i++) {
        const filePath = filePaths[i];
        const targetPath = (0, promptFilePathToTargetFilePath_1.promptFilePathToTargetFilePath)(filePath);
        const filePrompt = fs_1.default.readFileSync(filePath, "utf8");
        const fullPrompt = `${filePrompt}\n\n${filePrompts[filePath]}\nPlease only return source code.`;
        try {
            // this will fail when it refers to files that have not yet been generated, which may
            // occur when test prompts are written alongside the file to be tested
            const promptWithFiles = await (0, extractFilePathAndInsertFileContents_1.extractFilePathAndInsertFileContents)(fullPrompt, targetPath);
            // write out the prompt to help with debugging
            settings_1.debugSaveFullPrompt &&
                fs_1.default.writeFileSync(`${targetPath}.fullPrompt`, promptWithFiles);
            !settings_1.silent && console.log(`generating ${targetPath}...`);
            const generatedContent = await (0, sendPromptToChatGPT_1.sendPromptToChatGPT)(promptWithFiles);
            const contentsCode = (0, extractCodeFromGptResponse_1.extractCodeFromGptResponse)(generatedContent);
            fs_1.default.writeFileSync(targetPath, contentsCode);
            processedFiles.push(filePath);
        }
        catch {
            failedFiles.push(filePath);
        }
    }
    return {
        generated: processedFiles,
        failed: failedFiles,
    };
};
exports.generateFilesFromPrompts = generateFilesFromPrompts;
