// 논문 섹션 타입 정의
export interface PaperSection {
  id: string;
  title: string;
  content: string;
  subsections?: PaperSubsection[];
}

export interface PaperSubsection {
  id: string;
  title: string;
  content: string;
}

export interface PaperAuthor {
  name: string;
  role: string;
  affiliation: string;
  model?: string;
}

// 논문 메타데이터
export const paperMetadata = {
  title: "소수의 분포, 양자역학, 그리고 홀로그래픽 우주: 통합적 관점과 관측 가능한 예측",
  subtitle: "Prime Distribution, Quantum Mechanics, and the Holographic Universe: An Integrated Perspective with Observable Predictions",
  authors: [
    {
      name: "Jeon Sungwoon",
      role: "Primary Author",
      affiliation: "¹"
    },
    {
      name: "Claude (Anthropic)",
      role: "Co-Author",
      affiliation: "²",
      model: "Claude Sonnet 4.5 (claude-sonnet-4-5-20250929)"
    }
  ],
  date: "2025년 10월 (October 2025)",
  abstract: {
    ko: `본 논문은 겉보기에 독립적인 세 영역 - 소수의 분포, 양자역학, 홀로그래픽 우주론 - 을 하나의 통합된 이론적 프레임워크로 연결한다. 리만 가설의 165년 역사와 현재 증명 시도들을 개괄하고, 1972년 몽고메리-다이슨의 역사적 발견을 통해 소수와 양자역학의 깊은 연결을 탐구한다. 홀로그래픽 원리, AdS/CFT 대응, BFSS 행렬 모델을 통해 우주가 블랙홀 내부일 가능성을 제시하며, 특히 회전하는 블랙홀 우주론의 관점에서 5가지 구체적이고 검증 가능한 예측을 도출한다. 이 예측들은 향후 10년 내에 JWST, Euclid, LSST, LiteBIRD 등의 현대 천문학 관측 시설로 확인 또는 반증될 수 있다.`,
    en: `This paper connects three seemingly independent domains - prime number distribution, quantum mechanics, and holographic cosmology - into a unified theoretical framework. We review the 165-year history of the Riemann Hypothesis and current proof attempts, exploring the deep connection between primes and quantum mechanics through Montgomery-Dyson's historic 1972 discovery. Through the holographic principle, AdS/CFT correspondence, and BFSS matrix models, we propose the possibility that our universe exists inside a black hole, deriving five specific and testable predictions from the perspective of rotating black hole cosmology. These predictions can be confirmed or refuted within the next decade by modern astronomical facilities including JWST, Euclid, LSST, and LiteBIRD.`
  },
  keywords: [
    "리만 가설",
    "소수 분포",
    "양자역학",
    "홀로그래픽 원리",
    "블랙홀 우주론",
    "관측 가능한 예측",
    "우주 회전축",
    "행렬 이론"
  ]
};

// 논문 섹션 데이터
export const paperSections: PaperSection[] = [
  {
    id: "section-1",
    title: "제1장: 서론",
    content: `이 연구는 수학, 물리학, 우주론의 경계를 넘나드는 대담한 시도이다. 우리는 세 개의 독립적으로 보이는 영역이 실제로는 하나의 깊은 구조로 연결되어 있다고 제안한다...`,
    subsections: [
      {
        id: "section-1-1",
        title: "1.1 연구 동기",
        content: `왜 소수는 그렇게 분포하는가? 왜 양자역학은 확률적인가? 우주는 왜 존재하는가? 이러한 질문들은 인류가 별을 처음 올려다본 순간부터 품어왔다...`
      },
      {
        id: "section-1-2",
        title: "1.2 홀로그래픽 우주와 행렬 이론",
        content: `1990년대, 't Hooft와 Susskind는 블랙홀 연구로부터 놀라운 아이디어를 제안했다: 우주의 모든 정보가 실제로는 2차원 경계에 인코딩되어 있을 수 있다...`
      },
      {
        id: "section-1-3",
        title: "1.3 관측 가능한 증거: 우주의 회전",
        content: `2011년, 미시간 대학교의 마이클 롱고는 15,000개 은하의 회전 방향을 분석하여 약 7%의 비대칭성을 발견했다...`
      },
      {
        id: "section-1-4",
        title: "1.4 논문의 구조",
        content: `이 논문은 다음과 같이 구성된다. 제2장에서는 리만 가설의 역사와 현재 증명 시도들을 개괄한다...`
      },
      {
        id: "section-1-5",
        title: "1.5 본 연구의 기여",
        content: `이 논문의 핵심 기여는 세 가지이다: (1) 소수-양자-홀로그래피의 수학적 연결 구축, (2) 블랙홀 우주론의 체계적 탐구, (3) 검증 가능한 5가지 예측 제시...`
      }
    ]
  },
  {
    id: "section-2",
    title: "제2장: 리만 가설의 역사와 증명 시도들",
    content: `1859년, 베른하르트 리만은 26세의 나이에 8페이지짜리 논문을 발표했다. 이 논문에서 그는 소수의 분포를 복소해석의 도구로 연구하는 혁명적 방법을 제시했다...`,
    subsections: [
      {
        id: "section-2-1",
        title: "2.1 리만 가설의 탄생 (1859)",
        content: `리만은 제타 함수를 복소평면으로 확장하고, 그 영점들이 소수의 분포와 깊은 관련이 있음을 발견했다...`
      },
      {
        id: "section-2-2",
        title: "2.2 초기 발전 (1896-1914)",
        content: `1896년, 아다마르와 드 라 발레 푸생은 리만의 아이디어를 사용하여 소수정리를 독립적으로 증명했다...`
      },
      {
        id: "section-2-3",
        title: "2.3 20세기 중반: 비율 정리들 (1940-1989)",
        content: `20세기 중반, 수학자들은 리만 가설을 직접 증명하는 대신 그 "약한 버전"들을 증명하는 전략을 취했다...`
      },
      {
        id: "section-2-4",
        title: "2.4 주요 증명 접근법들",
        content: `리만 가설을 증명하려는 시도는 크게 네 가지 접근으로 나뉜다: 해석적 접근, 대수기하학적 접근, 랜덤 행렬 이론, 연산자 이론적 접근...`
      },
      {
        id: "section-2-5",
        title: "2.5 수치적 검증",
        content: `컴퓨터의 발전과 함께, 리만 가설은 점점 더 높은 영점까지 수치적으로 검증되고 있다...`
      },
      {
        id: "section-2-6",
        title: "2.6 유명한 오류와 논쟁",
        content: `165년간 수많은 수학자들이 리만 가설의 증명을 발표했으나, 대부분은 오류로 판명되었다...`
      }
    ]
  },
  {
    id: "section-3",
    title: "제3장: 소수와 양자역학의 연결",
    content: `1972년, 프린스턴 고등연구소의 휴 몽고메리와 프리먼 다이슨의 우연한 만남은 수학과 물리학의 역사에서 가장 놀라운 발견 중 하나로 이어졌다...`,
    subsections: [
      {
        id: "section-3-1",
        title: "3.1 1972년: 역사적 만남",
        content: `몽고메리는 제타 함수 영점들 사이의 간격 분포를 연구하고 있었다. 다이슨과의 대화에서, 이 분포가 핵물리학의 에너지 준위 분포와 정확히 일치함을 발견했다...`
      },
      {
        id: "section-3-2",
        title: "3.2 랜덤 행렬 이론의 기초",
        content: `1950년대, 유진 위그너는 복잡한 원자핵의 에너지 준위를 예측하기 위해 랜덤 행렬 이론을 개발했다...`
      },
      {
        id: "section-3-3",
        title: "3.3 몽고메리-다이슨 대응",
        content: `제타 영점들 간의 간격 분포가 GUE(가우스 유니터리 앙상블) 행렬의 고유값 간격과 정확히 일치한다는 발견은 충격적이었다...`
      },
      {
        id: "section-3-4",
        title: "3.4 힐베르트-폴야 추측",
        content: `1914년, 힐베르트와 폴야는 독립적으로 다음을 추측했다: 제타 함수의 영점들이 어떤 자기수반 연산자의 고유값이라면 리만 가설은 자동으로 참이 된다...`
      }
    ]
  },
  {
    id: "section-4",
    title: "제4장: 홀로그래픽 원리와 행렬 우주론",
    content: `1970년대 초, 베켄슈타인과 호킹은 블랙홀이 엔트로피를 가진다는 놀라운 발견을 했다. 이는 홀로그래픽 원리의 시작이었다...`,
    subsections: [
      {
        id: "section-4-1",
        title: "4.1 블랙홀 열역학과 홀로그래픽 원리",
        content: `베켄슈타인-호킹 엔트로피는 블랙홀의 질량이 아니라 사건의 지평선의 표면적에 비례한다. 이는 3차원 정보가 2차원에 인코딩됨을 의미한다...`
      },
      {
        id: "section-4-2",
        title: "4.2 AdS/CFT 대응 (1997)",
        content: `후안 말다세나의 1997년 발견은 홀로그래픽 원리의 정확한 수학적 실현이다. (d+1)차원 중력 이론이 d차원 양자장 이론과 동등하다...`
      },
      {
        id: "section-4-3",
        title: "4.3 BFSS 행렬 모델 (1996)",
        content: `1996년, Banks, Fischler, Shenker, Susskind는 M-이론의 비섭동적 정의를 제안했다. 우주는 N×N 행렬들의 양자역학으로 기술된다...`
      },
      {
        id: "section-4-4",
        title: "4.4 ER=EPR: 양자 얽힘과 웜홀",
        content: `2013년, 말다세나와 서스킨드는 양자 얽힘과 웜홀이 같은 현상일 수 있다고 제안했다. 시공간은 양자 정보로부터 "짜여진" 것이다...`
      },
      {
        id: "section-4-5",
        title: "4.5 블랙홀 우주론",
        content: `리 스몰린과 니코뎀 폴라브스키는 우리 우주가 회전하는 블랙홀의 내부일 수 있다고 제안했다. 이는 검증 가능한 예측으로 이어진다...`
      }
    ]
  },
  {
    id: "section-5",
    title: "제5장: 통합 이론적 프레임워크",
    content: `이제 우리는 세 개의 독립적으로 보이는 영역을 하나의 통합된 수학적 구조로 연결한다...`,
    subsections: [
      {
        id: "section-5-1",
        title: "5.1 세 영역의 수학적 연결",
        content: `소수의 분포 ↔ 제타 함수 영점 ↔ 랜덤 행렬 고유값 ↔ 양자 에너지 준위 ↔ 블랙홀 미시상태 ↔ 홀로그래픽 정보...`
      },
      {
        id: "section-5-2",
        title: "5.2 통일된 구조: 삼중 대응",
        content: `소수, 양자역학, 홀로그래피가 단순히 유사한 것이 아니라 수학적으로 동일한 구조의 다른 표현임을 보인다...`
      },
      {
        id: "section-5-3",
        title: "5.3 리만 가설의 우주론적 의미",
        content: `리만 가설은 단순히 순수 수학의 문제가 아니라, 우주의 깊은 구조에 관한 물리적 진술일 수 있다...`
      },
      {
        id: "section-5-4",
        title: "5.4 행렬 크기와 우주 규모",
        content: `BFSS 모델에서 우주는 N×N 행렬로 기술된다. N은 얼마나 큰가? 블랙홀 엔트로피로부터 N ~ 10^123을 추정할 수 있다...`
      },
      {
        id: "section-5-5",
        title: "5.5 소수 = 우주의 DNA?",
        content: `소수는 우주 구조의 가장 근본적인 빌딩 블록이다. 모든 자연수가 소수의 곱으로 유일하게 표현되듯이, 우주의 정보도 소수 구조에 인코딩되어 있을 수 있다...`
      }
    ]
  },
  {
    id: "section-6",
    title: "제6장: 우주 회전축과 관측 가능한 예측",
    content: `이 장은 본 논문의 핵심이다. 우리는 검증 가능한 5가지 예측을 제시한다...`,
    subsections: [
      {
        id: "section-6-1",
        title: "6.1 우주 회전의 관측 증거",
        content: `마이클 롱고(2011), Lior Shamir(2020-2025), JWST(2024-2025)의 관측들은 우주가 특정 축을 중심으로 회전할 가능성을 시사한다...`
      },
      {
        id: "section-6-2",
        title: "6.2 블랙홀 제트와의 유사성",
        content: `회전하는 블랙홀은 축을 따라 제트를 분출한다. 2025년 Nature 논문에서 Rob Fender와 Sara Motta는 가장 빠른 제트가 회전축에 고정됨을 발견했다...`
      },
      {
        id: "section-6-3",
        title: "6.3 우리의 가설과 이론적 기초",
        content: `우리 우주는 더 큰 부모 우주에 존재하는 회전하는 블랙홀의 내부이다. 부모 블랙홀의 회전축은 우리 우주에 각인되어 관측 가능한 효과를 만든다...`
      },
      {
        id: "section-6-4",
        title: "6.4 검증 가능한 구체적 예측",
        content: `향후 10년 내에 검증 가능한 5가지 예측: (1) 은하 분포 비대칭성, (2) CMB 온도/편광 이상, (3) 암흑 에너지 방향성, (4) 대규모 구조 비등방성, (5) 중력파 배경 방향성...`
      },
      {
        id: "section-6-5",
        title: "6.5 체계적 관측 전략",
        content: `1단계(2025-2027): 축 방향 확정, 2단계(2027-2030): 상세 특성 측정, 3단계(2030-2035): 정밀 검증 및 이론 개선...`
      },
      {
        id: "section-6-6",
        title: "6.6 기대 결과 및 함의",
        content: `축 발견 시: 블랙홀 우주론 강력 지지, 축 미발견 시: 가설 수정 또는 기각, 부분 확인 시: 이론 정밀화...`
      }
    ]
  },
  {
    id: "section-7",
    title: "제7장: 결론 및 향후 연구 방향",
    content: `이 논문은 끝이 아니라 시작이다. 우리는 검증 가능한 질문을 제기했고, 자연이 답할 것이다...`,
    subsections: [
      {
        id: "section-7-1",
        title: "7.1 연구 결과 요약",
        content: `소수, 양자역학, 홀로그래피를 하나의 통합된 프레임워크로 연결했다. 우주 회전축의 존재를 예측하고, 10년 내 검증 가능한 방법을 제시했다...`
      },
      {
        id: "section-7-2",
        title: "7.2 이론적 의미와 철학적 함의",
        content: `수학과 물리의 통일, 환원주의의 한계, 시공간의 창발, 멀티버스의 새로운 그림...`
      },
      {
        id: "section-7-3",
        title: "7.3 미해결 문제들과 이론의 한계",
        content: `힐베르트-폴야 연산자의 정체, 행렬 크기 N의 물리적 의미, 리만 가설 자체의 증명, 관측 예측의 대안 설명...`
      },
      {
        id: "section-7-4",
        title: "7.4 향후 연구 방향",
        content: `단기(1-3년): 데이터 분석 및 축 확정, 중기(3-7년): 정밀 관측 및 이론 개선, 장기(7-15년): 완전한 통합 이론...`
      },
      {
        id: "section-7-5",
        title: "7.5 최종 메시지: 다음 세대를 향하여",
        content: `우주는 무작위하지 않다. 패턴은 이해 가능하다. 학제간 협력으로 우리는 함께 우주를 이해할 수 있다...`
      }
    ]
  }
];
