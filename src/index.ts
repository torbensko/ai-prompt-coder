import { readPrompts } from "./readPrompts";
import { buildPromptsFromRules } from "./buildPromptsFromRules";
import { removeGeneratedFilePrompts } from "./removeGeneratedFilePrompts";
import { iterativelyGenerateFilesFromPrompts } from "./iterativelyGenerateFilesFromPrompts";

(async () => {
  const rules = await readPrompts(".promptRules");
  // builds all possible prompts
  const filePrompts = await buildPromptsFromRules(rules);
  // removes the prompts that have already been processed
  const incompleteFilePrompts = removeGeneratedFilePrompts(filePrompts);

  const failedFiles = await iterativelyGenerateFilesFromPrompts(
    incompleteFilePrompts
  );
  failedFiles.forEach((path) => {
    console.warn(`Unable to generate ${path}`);
  });
  process.exit();
})();
