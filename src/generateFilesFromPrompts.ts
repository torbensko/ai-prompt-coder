import fs from "fs";

import { extractFilePathAndInsertFileContents } from "./extractFilePathAndInsertFileContents";
import { extractCodeFromGptResponse } from "./extractCodeFromGptResponse";
import { sendPromptToChatGPT } from "./sendPromptToChatGPT";
import { FilePrompts } from "./buildPromptsFromRules";
import { promptFilePathToTargetFilePath } from "./promptFilePathToTargetFilePath";
import { debugSaveFullPrompt, silent } from "./settings";

export const generateFilesFromPrompts = async (
  filePrompts: FilePrompts
): Promise<{ generated: string[]; failed: string[] }> => {
  const filePaths = Object.keys(filePrompts);
  const processedFiles: string[] = [];
  const failedFiles: string[] = [];

  for (var i = 0; i < filePaths.length; i++) {
    const filePath = filePaths[i];
    const targetPath = promptFilePathToTargetFilePath(filePath);

    const filePrompt = fs.readFileSync(filePath, "utf8");
    const fullPrompt = `${filePrompt}\n\n${filePrompts[filePath]}\nPlease only return source code.`;

    try {
      // this will fail when it refers to files that have not yet been generated, which may
      // occur when test prompts are written alongside the file to be tested
      const promptWithFiles = await extractFilePathAndInsertFileContents(
        fullPrompt,
        targetPath
      );
      // write out the prompt to help with debugging
      debugSaveFullPrompt &&
        fs.writeFileSync(`${targetPath}.fullPrompt`, promptWithFiles);
      !silent && console.log(`generating ${targetPath}...`);
      const generatedContent = await sendPromptToChatGPT(promptWithFiles);
      const contentsCode = extractCodeFromGptResponse(generatedContent);
      fs.writeFileSync(targetPath, contentsCode);
      processedFiles.push(filePath);
    } catch {
      failedFiles.push(filePath);
    }
  }
  return {
    generated: processedFiles,
    failed: failedFiles,
  };
};
