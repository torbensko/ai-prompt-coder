"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const extractCodeFromGptResponse_1 = require("../extractCodeFromGptResponse");
describe("extractCodeFromGptResponse", () => {
    it("should extract source code from response", () => {
        const gptResponse = `Here is your code: 
\`\`\`
const hello = "world";
console.log(hello);
\`\`\`
    This code logs "world" to the console.`;
        const expectedCode = `const hello = "world";
console.log(hello);`;
        expect((0, extractCodeFromGptResponse_1.extractCodeFromGptResponse)(gptResponse)).toBe(expectedCode);
    });
    it("should extract source code from response with additional markup", () => {
        const gptResponse = `Here is your code: 
\`\`\`tsx
const hello = "world";
console.log(hello);
\`\`\`
    This code logs "world" to the console.`;
        const expectedCode = `const hello = "world";
console.log(hello);`;
        expect((0, extractCodeFromGptResponse_1.extractCodeFromGptResponse)(gptResponse)).toBe(expectedCode);
    });
    it("should return an empty string if no code is found", () => {
        const gptResponse = `There is no code in this response.`;
        expect((0, extractCodeFromGptResponse_1.extractCodeFromGptResponse)(gptResponse)).toBe("");
    });
});
