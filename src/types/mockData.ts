import { NewsItem } from "./news";

export const MOCK_NEWS: NewsItem[] = [
    {
        id: "1",
        title: "글로벌 AI 반도체 수출 급증, 역대 최고치 경신",
        category: "Economy",
        summary: [
            "AI 전용 반도체 수출이 전년 대비 45% 증가하며 사상 최대치를 기록했습니다.",
            "엔비디아 등 글로벌 테크 기업들의 HBM(고대역폭 메모리) 수요가 폭발적입니다.",
            "차세대 패키징 기술 확보가 향후 시장 점유율의 핵심 변수로 떠오르고 있습니다."
        ],
        impact: {
            short: "국내 반도체 대장주 호재 및 관련 소부장 기업들의 실적 동반 상승.",
            long: "메모리 중심에서 AI 연산 가속기 시장으로의 산업 구조 개편 가속화.",
            risk: "미-중 기술 갈등 심화에 따른 공급망 불확실성 및 지정학적 리스크."
        },
        actions: {
            investor: [
                "HBM 5세대(HBM3E) 양산 속도가 빠른 기업의 비중을 확대하세요.",
                "AI 인프라 및 데이터센터 리츠(REITs) 투자를 검토하세요."
            ],
            educator: [
                "반도체 공정 교육에 AI 가속기 설계를 포함한 융합 과정 도입을 고려하세요.",
                "첨단 산업 변화에 따른 이공계 인재 양성 및 취업 전략을 재설정하세요."
            ],
            founder: [
                "온디바이스 AI(On-device AI) 전용 저전력 반도체 설계 솔루션을 탐색하세요.",
                "글로벌 빅테크 기업과의 공동 개발 파이프라인 구축 기회를 모색하세요."
            ]
        },
        originalImageUrl: "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&q=80&w=1000",
        aiImageUrl: "https://images.unsplash.com/photo-1591453089816-0fbb971b454c?auto=format&fit=crop&q=80&w=1000",
        createdAt: "2026-02-13T10:00:00Z"
    },
    {
        id: "2",
        title: "AI 튜터, 전국 초중고 교실에 공식 도입 개시",
        category: "Edutech",
        summary: [
            "정부 주도로 공교육 현장에 개인별 맞춤 학습을 지원하는 AI 디지털 교과서가 보급됩니다.",
            "학습 부진아의 성취도가 기존 대비 30% 이상 향상되는 등 긍정적 지표가 보고되었습니다.",
            "교사는 단순 전달자에서 인간적 상호작용과 정서 케어에 집중하는 멘토로 역할이 전환됩니다."
        ],
        impact: {
            short: "에듀테크 관련 기업들의 공공 조달 시장 규모 확대 및 주가 모멘텀.",
            long: "데이터 기반의 맞춤형 교육 체계로의 근본적 패러다임 변화.",
            risk: "디지털 기기 과의존 문제 및 지역 간 교육 격차 심화 가능성."
        },
        actions: {
            investor: [
                "LMS(학습관리시스템)과 AI가 결합된 통합 교육 플랫폼 기업에 주목하세요.",
                "B2G(정부 대상) 매출 비중이 안정적인 에듀테크 상장사를 분석하세요."
            ],
            educator: [
                "AI 도구를 활용한 수업 설계(Lesson Design) 역량 강화 연수에 참여하세요.",
                "학생들의 디지털 리터러시와 윤리적 AI 사용 가이드를 수립하세요."
            ],
            founder: [
                "특수 교육이나 성인 교육(Upskilling) 분야의 AI 튜터 틈새 시장을 공략하세요.",
                "공교육 시스템과의 API 연동이 가능한 데이터 보안 기술을 확보하세요."
            ]
        },
        originalImageUrl: "https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&q=80&w=1000",
        aiImageUrl: "https://images.unsplash.com/photo-1501504905252-473c47e087f8?auto=format&fit=crop&q=80&w=1000",
        createdAt: "2026-02-12T15:30:00Z"
    },
    {
        id: "3",
        title: "줄기세포 유전자 가위 기술, 유전병 완치 가능성 입증",
        category: "Bio",
        summary: [
            "최신 크리스퍼(CRISPR) 기술을 활용한 유전병 환자 임상 시험에서 완치 사례가 확인되었습니다.",
            "복잡한 유전 정보를 AI로 분석하여 표적 유전자만 정확히 교정하는 효율이 극대화되었습니다.",
            "희귀 난치성 질환 극복을 위한 글로벌 제약사들의 원천 기술 확보 경쟁이 치열합니다."
        ],
        impact: {
            short: "바이오 테크 분야의 대규모 글로벌 기술 이전 협상 활성화.",
            long: "질병 치료의 패러다임이 '관리'에서 '완전 정복'으로 이동.",
            risk: "생명 윤리 논란 소지 및 고가 치료제에 따른 건강권 불평등 문제."
        },
        actions: {
            investor: [
                "유전자 분석 및 편집 원천 특허를 보유한 바이오벤처에 분산 투자하세요.",
                "임상 3상 단계에 진입한 글로벌 파이프라인 리스트를 점검하세요."
            ],
            educator: [
                "생명과학 교과 과정 내 최신 유전공학 기술의 원리와 윤리적 쟁점을 강화하세요.",
                "Bio-AI 융합 전공 분야의 국내외 대학 진학 가이드를 마련하세요."
            ],
            founder: [
                "고가의 유전자 치료제 생산 단가를 낮출 수 있는 혁신 공정 기술을 개발하세요.",
                "정밀 의료 데이터 플랫폼 사업으로의 확장을 검토하세요."
            ]
        },
        originalImageUrl: "https://images.unsplash.com/photo-1532187875605-1ef6c237ddc4?auto=format&fit=crop&q=80&w=1000",
        aiImageUrl: "https://images.unsplash.com/photo-1576086213369-97a306d36557?auto=format&fit=crop&q=80&w=1000",
        createdAt: "2026-02-11T09:20:00Z"
    },
    {
        id: "4",
        title: "초전도체 상용화 성큼, 에너지 혁명 예고",
        category: "Science",
        summary: [
            "국내외 연구진이 상온 저압 상태에서 작동하는 새로운 초전도 박막 제조 기법을 발표했습니다.",
            "전력 송전 손실 제로(Zero)화 및 초고속 자기부상열차 구현이 현실화될 전망입니다.",
            "전기차 배터리 충전 속도와 에너지 밀도를 획기적으로 개선할 수 있는 단초를 마련했습니다."
        ],
        impact: {
            short: "신소재 및 양자 컴퓨팅 관련 테마주로의 강력한 수급 유입.",
            long: "에너지 효율의 극대화로 인한 탄소 중립 달성 속도 가속화.",
            risk: "상용화까지의 대규모 인프라 투자 비용 및 기술 표준 선점 경쟁."
        },
        actions: {
            investor: [
                "특수 금속 및 초전도 선재 제조 기술력을 가진 제조사에 주목하세요.",
                "양자 컴퓨터 상용화 로드맵을 보유한 빅테크 기업을 분석하세요."
            ],
            educator: [
                "물리학 교육 과정에 양자 현상과 신소재 기술 비중을 확대하세요.",
                "기초 과학의 힘이 산업에 미치는 실질적 연결 고리를 강조하세요."
            ],
            founder: [
                "초전도 기술을 응용한 초소형 고효율 모터 설계 비즈니스를 검토하세요.",
                "극한의 전력 환경이 필요한 데이터 센터 냉각 솔루션을 개발하세요."
            ]
        },
        originalImageUrl: "https://images.unsplash.com/photo-1635070041078-e363dbe005cb?auto=format&fit=crop&q=80&w=1000",
        aiImageUrl: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&q=80&w=1000",
        createdAt: "2026-02-10T14:45:00Z"
    },
    {
        id: "5",
        title: "고령화 사회 대응, 실버 테크 시장 '골드러시'",
        category: "Society",
        summary: [
            "초고령화 시대에 진입함에 따라 노인 돌봄 로봇과 웨어러블 헬스케어 기기 시장이 급성장 중입니다.",
            "시니어 전용 AI 소셜 로봇이 독거 노인의 우울증과 치매 예방에 탁월한 효과를 보이고 있습니다.",
            "단순 수발을 넘어 삶의 질(QoL)을 높여주는 맞춤형 구독 서비스가 인기입니다."
        ],
        impact: {
            short: "실버 푸드, 헬스케어, 자산 관리 서비스 산업의 매출 상승세.",
            long: "세대 간 갈등 해소를 위한 복지 정책과 민간 서비스의 적극적 융합.",
            risk: "고령층 내의 디지털 소외 계층 발생 및 복지 비용 부담 증대."
        },
        actions: {
            investor: [
                "디지털 헬스케어와 시니어 여가 산업 테마 ETF를 검토하세요.",
                "고령 친화 마을(CCRC) 등 시니어 주거 관련 부동산 펀드에 주목하세요."
            ],
            educator: [
                "전 세대를 아우르는 디지털 리터러시 교육의 표준을 정립하세요.",
                "사회복지 체계와 시니어 상담 기법에 대한 전문 교육을 강화하세요."
            ],
            founder: [
                "조작이 간편한 시니어 전용 UI/UX 디자인 가이드를 제품에 적용하세요.",
                "자산 상속 및 사후 관리 등 실버 금융과 결합된 라이프 케어 서비스를 창업하세요."
            ]
        },
        originalImageUrl: "https://images.unsplash.com/photo-1573497620053-ea5300f94f21?auto=format&fit=crop&q=80&w=1000",
        aiImageUrl: "https://images.unsplash.com/photo-1544027993-37dbfe43562a?auto=format&fit=crop&q=80&w=1000",
        createdAt: "2026-02-09T18:10:00Z"
    }
];
