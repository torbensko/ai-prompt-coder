"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendPromptToChatGPT = exports.modelName = exports.organisationKey = exports.apiKey = void 0;
const openai_1 = require("openai");
if (!process.env.GPTCODER_OPENAI_KEY) {
    console.log("Please set GPTCODER_OPENAI_KEY");
}
if (!process.env.GPTCODER_OPENAI_ORG) {
    console.log("Please set GPTCODER_OPENAI_ORG");
}
if (!process.env.GPTCODER_OPENAI_KEY || !process.env.GPTCODER_OPENAI_ORG) {
    process.exit();
}
exports.apiKey = process.env.GPTCODER_OPENAI_KEY;
exports.organisationKey = process.env.GPTCODER_OPENAI_ORG;
exports.modelName = "gpt-4";
async function sendPromptToChatGPT(prompt) {
    const configuration = new openai_1.Configuration({
        apiKey: exports.apiKey,
        organization: exports.organisationKey
    });
    const openai = new openai_1.OpenAIApi(configuration);
    try {
        const response = await openai.createChatCompletion({
            model: exports.modelName,
            temperature: 0.888,
            max_tokens: 2048,
            frequency_penalty: 0,
            presence_penalty: 0,
            top_p: 1,
            messages: [
                { role: "system", content: prompt },
                { role: "user", content: "" }
            ] // {role: "assistant", content: ''}
        }, { timeout: 60000 });
        return response.data.choices[0].message?.content?.trim() || "";
    }
    catch (error) {
        console.error("Error calling OpenAI:", error);
        return ""; // Return empty string on failure
    }
}
exports.sendPromptToChatGPT = sendPromptToChatGPT;
