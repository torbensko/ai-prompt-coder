"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const extractFilePathAndInsertFileContents_1 = require("../extractFilePathAndInsertFileContents");
const promises_1 = __importDefault(require("fs/promises"));
jest.mock("fs/promises");
describe("extractFilePathAndInsertFileContents", () => {
    afterEach(() => {
        jest.clearAllMocks();
    });
    it("should replace the pattern and append the contents of the specified file", async () => {
        const text = "Test [[./foo.txt]] and [[./bar.txt]] function.";
        const basePath = ".";
        promises_1.default.readFile.mockImplementation((filePath) => {
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
        const result = await (0, extractFilePathAndInsertFileContents_1.extractFilePathAndInsertFileContents)(text, basePath);
        console.log(`"${result}"`);
        console.log(`"${expected}"`);
        expect(result).toEqual(expected);
    });
    it("should throw an error if file does not exist", async () => {
        const text = "Test [[./foo.txt]] function.";
        const basePath = "/path/to/base";
        promises_1.default.readFile.mockImplementation(() => {
            return Promise.reject(new Error("File not found"));
        });
        await expect((0, extractFilePathAndInsertFileContents_1.extractFilePathAndInsertFileContents)(text, basePath)).rejects.toThrow("File not found");
    });
});
