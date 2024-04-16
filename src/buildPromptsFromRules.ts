const glob = require("glob");
import { FilePattern } from "./readPrompts";

/**
 * Maps a file path to prompt.
 */
export type FilePrompts = { [path: string]: string };

/**
 * Constructs GPT prompts based on a set of glob patterns.
 *
 * @param rules
 * @returns
 */
export const buildPromptsFromRules = async (
  rules: FilePattern[]
): Promise<FilePrompts> => {
  const filePrompts: { [path: string]: string } = {};

  rules.forEach((rule) => {
    const options = {
      ignore: ["node_modules/**", ...(rule.ignore || [])]
    };
    const files: string[] = glob.sync(rule.pattern, options);
    // console.log(rule.pattern, files);
    files.forEach((filePath) => {
      filePrompts[filePath] =
        (filePrompts[filePath] ? `${filePrompts[filePath]}\n` : "") +
        rule.content;
    });
  });

  return filePrompts;
};
