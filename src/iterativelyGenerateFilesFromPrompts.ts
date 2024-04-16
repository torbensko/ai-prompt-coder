import { FilePrompts } from "./buildPromptsFromRules";
import { generateFilesFromPrompts } from "./generateFilesFromPrompts";

export const iterativelyGenerateFilesFromPrompts = async (
  incompleteFilePrompts: FilePrompts
): Promise<string[]> => {
  let generatedCount = 0;
  let remainingPrompts = incompleteFilePrompts;
  do {
    const { generated, failed } = await generateFilesFromPrompts(
      remainingPrompts
    );
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
