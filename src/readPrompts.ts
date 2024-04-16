import fs from "fs";
import path from "path";

// Define the interface for the resulting data structure
export interface FilePattern {
  pattern: string;
  content?: string;
  ignore?: string[];
}

// Function to read and parse the file
export async function readPrompts(filePath: string): Promise<FilePattern[]> {
  try {
    const fullPath = path.resolve(filePath);
    const fileContent = await fs.promises.readFile(fullPath, "utf8");
    const lines = fileContent.split("\n");
    const result: FilePattern[] = [];
    let currentPattern: FilePattern | null = null;

    lines.forEach((line) => {
      if (line.startsWith("-- ")) {
        if (currentPattern) {
          result.push(currentPattern);
        }
        const parts = line.split(/-- ([^ ]+)( \[?(.*)?\])?/);
        currentPattern = { pattern: parts[1] };

        if (parts[3] !== undefined) {
          currentPattern.ignore = parts[3].replace(/[ "]/g, "").split(",");
        }
      } else if (currentPattern) {
        currentPattern.content = (currentPattern.content || "") + line + "\n";
      }
    });

    if (currentPattern) {
      result.push(currentPattern);
    }

    // Clean up the content by removing the trailing new line
    result.forEach((pattern) => {
      if (pattern.content) {
        pattern.content = pattern.content.trim();
      }
    });

    return result;
  } catch (error) {
    console.error("Failed to read or parse the file:", error);
    throw error;
  }
}
