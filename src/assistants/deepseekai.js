import OpenAI from "openai";
import { OpenAIAssistant } from "./openai";

const deepseekAI = new OpenAI({
  baseURL: "https://api.deepseek.com",
  apiKey: import.meta.env.VITE_DEEPSEEK_AI_API_KEY,
  dangerouslyAllowBrowser: true,
});

export class DeepseekAssistant extends OpenAIAssistant {
  constructor(model = "deepseek-chat", client = deepseekAI) {
    super(model, client);
  }
}
