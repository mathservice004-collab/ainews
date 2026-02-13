import { NewsItem } from "./news";

export const MOCK_NEWS: NewsItem[] = [
    {
        id: "1",
        title: "Global AI Semiconductor Export Surge Reaches Record High",
        category: "Economy",
        summary: [
            "Export of AI specialized semiconductors increased by 45% year-on-year.",
            "Growing demand from global data centers is the primary driver.",
            "Supply chain diversification is accelerating across major tech hubs."
        ],
        impact: {
            short: "Immediate boost in semiconductor stock prices and export revenue.",
            long: "Shift in global tech hegemony towards AI-hardware specialized nations.",
            risk: "Potential oversupply if AI infrastructure build-up slows down."
        },
        actions: {
            investor: [
                "Monitor quarterly earnings of major chip foundries.",
                "Consider diversification into AI infrastructure services."
            ],
            educator: [
                "Introduce hardware-software co-design concepts in CS curriculum.",
                "Focus on the economic impact of technological shifts."
            ],
            founder: [
                "Explore niche markets in specialized AI chip design (ASICs).",
                "Build strategic partnerships with hardware suppliers."
            ]
        },
        originalImageUrl: "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&q=80&w=1000",
        aiImageUrl: "https://images.unsplash.com/photo-1591453089816-0fbb971b454c?auto=format&fit=crop&q=80&w=1000",
        createdAt: "2026-02-13T10:00:00Z"
    },
    {
        id: "2",
        title: "AI Tutors Becoming Standard in K-12 Classrooms",
        category: "Edutech",
        summary: [
            "Personalized AI tutoring systems show 30% improvement in student engagement.",
            "Teachers' roles are shifting from lecturers to facilitators.",
            "Data privacy concerns remain a major hurdle for widespread adoption."
        ],
        impact: {
            short: "Reduction in repetitive tasks for educators.",
            long: "Democratic access to high-quality personalized education.",
            risk: "Aggravation of the digital divide if access is unequal."
        },
        actions: {
            investor: [
                "Look into Edutech platforms with strong data privacy frameworks.",
                "Venture into emerging markets where teacher shortages are acute."
            ],
            educator: [
                "Get certified in AI-human collaborative teaching models.",
                "Advocate for ethical AI usage policies in schools."
            ],
            founder: [
                "Develop AI tools for teacher support rather than just student tutoring.",
                "Focus on localizing AI content for diverse cultural contexts."
            ]
        },
        originalImageUrl: "https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&q=80&w=1000",
        aiImageUrl: "https://images.unsplash.com/photo-1501504905252-473c47e087f8?auto=format&fit=crop&q=80&w=1000",
        createdAt: "2026-02-12T15:30:00Z"
    }
];
