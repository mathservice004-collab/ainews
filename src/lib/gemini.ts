import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || "");
const model = genAI.getGenerativeModel({ model: "gemini-1.5-pro" });

export async function generateNewsInsight(rawContent: string) {
    const prompt = `
    You are a professional news analyst and strategic advisor.
    Analyze the following news content and provide a structured intelligence report in JSON format.
    
    Content: ${rawContent}

    Required JSON Structure:
    {
      "title": "Clear concise title",
      "category": "Economy | Edutech | Science | Society | Bio",
      "summary": ["Point 1", "Point 2", "Point 3"],
      "impact": {
        "short": "Short-term impact description",
        "long": "Long-term strategic meaning",
        "risk": "Critical risk factor"
      },
      "actions": {
        "investor": ["Action 1", "Action 2"],
        "educator": ["Action 1", "Action 2"],
        "founder": ["Action 1", "Action 2"]
      },
      "imagePrompt": "A detailed high-quality editorial illustration prompt for Gemini Image Gen about..."
    }
  `;

    try {
        const result = await model.generateContent(prompt);
        const text = result.response.text();
        // In a real app, we would parse the JSON here.
        return text;
    } catch (error) {
        console.error("Gemini Generation Error:", error);
        return null;
    }
}

export async function generateAIImage(prompt: string) {
    // Placeholder for Image Generation API call
    // Gemini 1.5 Pro doesn't generate images directly via 'generateContent' in the same way,
    // usually requires ImageGen API or similar.
    console.log("Generating image with prompt:", prompt);
    return "https://images.unsplash.com/photo-1614728263952-84ea256f9679?auto=format&fit=crop&q=80&w=1000";
}
