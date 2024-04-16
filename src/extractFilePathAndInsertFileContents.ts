import fs from "fs/promises";
import { join } from "path";
import path from "path";
import _ from "lodash";

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
const extractFilePathAndInsertFileContents = async (
  text: string,
  basePath: string
) => {
  let match;
  let replacedText = text;
  let fileContents = "";

  while ((match = regex.exec(text)) !== null) {
    let filePath = match[1];
    replacedText = _.replace(replacedText, match[0], "(contents below)");

    try {
      // TODO return null when unable to read a file rather than error out
      let fileContent = await fs.readFile(
        join(path.dirname(basePath), filePath),
        "utf8"
      );
      fileContents += `\nContents of ${filePath}:\n\`\`\`\n${fileContent}\n\`\`\`\n`;
    } catch (err) {
      console.error(`Failed to read file at ${filePath}`, err);
      throw err;
    }
  }

  return `${replacedText}\n${fileContents}`;
};

export { extractFilePathAndInsertFileContents };
