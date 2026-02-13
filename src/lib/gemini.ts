import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || "");
const model = genAI.getGenerativeModel({ model: "gemini-1.5-pro" });

export async function generateNewsInsight(rawContent: string) {
  const prompt = `
    당신은 전문 뉴스 분석가이자 전략 컨설턴트입니다.
    다음 뉴스 내용을 분석하여 구조화된 인텔리전스 보고서를 한국어 JSON 형식으로 작성하세요.
    
    내용: ${rawContent}

    반드시 다음 JSON 구조를 지키세요 (다른 텍스트 없이 JSON만 반환):
    {
      "title": "명확하고 간결한 제목",
      "category": "Economy | Edutech | Science | Society | Bio 중 하나",
      "summary": ["포인트 1", "포인트 2", "포인트 3"],
      "impact": {
        "short": "단기적 영향 기술",
        "long": "장기적 전략적 의미 기술",
        "risk": "핵심 리스크 요인"
      },
      "actions": {
        "investor": ["투자자 제안 1", "투자자 제안 2"],
        "educator": ["교육자 제안 1", "교육자 제안 2"],
        "founder": ["창업자 제안 1", "창업자 제안 2"]
      },
      "imagePrompt": "Gemini 이미지 생성을 위한 고품질 에디토리얼 일러스트레이션 묘사"
    }
  `;

  try {
    const result = await model.generateContent(prompt);
    const text = result.response.text();
    // JSON 추출 (마크다운 코드 블록 제거)
    const jsonMatch = text.match(/\{[\s\S]*\}/);
    return jsonMatch ? jsonMatch[0] : null;
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
