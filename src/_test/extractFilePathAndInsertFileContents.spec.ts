import { extractFilePathAndInsertFileContents } from "../extractFilePathAndInsertFileContents";
import fs from "fs/promises";

jest.mock("fs/promises");

describe("extractFilePathAndInsertFileContents", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should replace the pattern and append the contents of the specified file", async () => {
    const text = "Test [[./foo.txt]] and [[./bar.txt]] function.";
    const basePath = ".";

    (fs.readFile as jest.Mock).mockImplementation((filePath) => {
      if (filePath.includes("foo.txt")) {
        return Promise.resolve("Contents of foo");
      }
      if (filePath.includes("bar.txt")) {
        return Promise.resolve("Contents of bar");
      }
      return Promise.reject(new Error("File not found"));
    });

    const expected = `Test (contents below) and (contents below) function.\n
Contents of ./foo.txt:\nContents of foo\n
Contents of ./bar.txt:\nContents of bar\n`;

    const result = await extractFilePathAndInsertFileContents(text, basePath);
    console.log(`"${result}"`);
    console.log(`"${expected}"`);
    expect(result).toEqual(expected);
  });

  it("should throw an error if file does not exist", async () => {
    const text = "Test [[./foo.txt]] function.";
    const basePath = "/path/to/base";

    (fs.readFile as jest.Mock).mockImplementation(() => {
      return Promise.reject(new Error("File not found"));
    });

    await expect(
      extractFilePathAndInsertFileContents(text, basePath)
    ).rejects.toThrow("File not found");
  });
});
