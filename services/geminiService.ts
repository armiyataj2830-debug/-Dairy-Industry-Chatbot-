
import { GoogleGenAI, Chat } from "@google/genai";

class GeminiService {
    private ai: GoogleGenAI;
    private chat: Chat | null = null;

    constructor() {
        if (!process.env.API_KEY) {
            throw new Error("API_KEY environment variable not set");
        }
        this.ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
    }

    private initializeChat(): Chat {
        if (!this.chat) {
            this.chat = this.ai.chats.create({
                model: 'gemini-2.5-flash',
                config: {
                    systemInstruction: 'You are an expert on the Karnataka dairy industry, including the Karnataka Milk Federation (KMF) and the Nandini brand. Your answers should be factual, concise, and helpful for someone learning about this topic. Be friendly and conversational.',
                },
            });
        }
        return this.chat;
    }

    public async sendMessage(message: string): Promise<string> {
        try {
            const chatSession = this.initializeChat();
            const response = await chatSession.sendMessage({ message });
            return response.text;
        } catch (error) {
            console.error("Error sending message to Gemini:", error);
            // In case of an error, reset the chat session
            this.chat = null;
            throw new Error("Failed to get a response from the AI.");
        }
    }
}

export const geminiService = new GeminiService();
