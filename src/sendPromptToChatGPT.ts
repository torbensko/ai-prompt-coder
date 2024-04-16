import { Configuration, OpenAIApi } from "openai";

if (!process.env.GPTCODER_OPENAI_KEY) {
  console.log("Please set GPTCODER_OPENAI_KEY");
}
if (!process.env.GPTCODER_OPENAI_ORG) {
  console.log("Please set GPTCODER_OPENAI_ORG");
}
if (!process.env.GPTCODER_OPENAI_KEY || !process.env.GPTCODER_OPENAI_ORG) {
  process.exit();
}

export const apiKey = process.env.GPTCODER_OPENAI_KEY;
export const organisationKey = process.env.GPTCODER_OPENAI_ORG;
export const modelName = "gpt-4";

export async function sendPromptToChatGPT(prompt: string): Promise<string> {
  const configuration = new Configuration({
    apiKey: apiKey,
    organization: organisationKey
  });
  const openai = new OpenAIApi(configuration);

  try {
    const response = await openai.createChatCompletion(
      {
        model: modelName,
        temperature: 0.888,
        max_tokens: 2048,
        frequency_penalty: 0,
        presence_penalty: 0,
        top_p: 1,
        messages: [
          { role: "system", content: prompt },
          { role: "user", content: "" }
        ] // {role: "assistant", content: ''}
      },
      { timeout: 60000 }
    );

    return response.data.choices[0].message?.content?.trim() || "";
  } catch (error) {
    console.error("Error calling OpenAI:", error);
    return ""; // Return empty string on failure
  }
}
