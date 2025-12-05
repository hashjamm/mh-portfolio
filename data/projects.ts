export interface Project {
    id: string;
    title: string;
    category: string;
    highlight: boolean;
    oneLiner: string;
    tags: string[];
    image: string; // public 폴더 내 실제 파일명 매핑
    type?: 'engineering' | 'research';
    stats?: { label: string; value: string }[];
    period?: string;
    role?: string;
    links?: {
        github?: string;
        demo?: string;
        paper?: string;
    };
    techStack?: {
        category: string;
        skills: string[];
    }[];
    detail: {
        problem: string;
        solution: string;
        architecture: {
            diagram: string; // Mermaid code
            description: string;
        };
        features: string[];
        impact: string;
        challenges?: string; // Technical challenges & overcoming
    };
}

export const projects: Project[] = [
    {
        id: "cotdex",
        title: "CoTDeX: Dynamic Disease Network",
        category: "Data Engineering",
        highlight: true,
        oneLiner: "100만 명 코호트, 4,800만 건 관계 데이터를 처리하는 결함 허용(Fault-Tolerant) 분산 분석 엔진.",
        image: "/images/cotdex-thumb.png",
        tags: ["R", "DuckDB", "Bash", "Django", "Cytoscape.js"],
        period: "2024.01 - 2024.06",
        role: "Lead Data Engineer",
        links: {
            github: "https://github.com/hashjamm/CoTDeX-Core"
        },
        stats: [
            { label: "Cohort Size", value: "1M+" },
            { label: "Relations", value: "48M+" },
            { label: "Reliability", value: "Fault-Tolerant" }
        ],
        techStack: [
            { category: "Core Engine", skills: ["R (Parallel)", "DuckDB (Embedded OLAP)"] },
            { category: "Orchestration", skills: ["Bash", "Systemd", "Tmux"] },
            { category: "Backend/Web", skills: ["Django", "MariaDB", "Cytoscape.js"] }
        ],
        detail: {
            problem: "기존 정적(Static) 네트워크 분석으로는 시간 흐름에 따른 질병 관계 변화를 포착할 수 없었으며, 1TB급 데이터를 인메모리(R)로 처리 시 OOM 발생.",
            solution: "청크(Chunk) 단위 분산 처리 및 트랜잭션 기반의 결함 허용 아키텍처 설계. DuckDB를 로컬 스토리지 엔진으로 활용하여 메모리 부하 최소화 및 Django/Cytoscape.js로 동적 시각화 구현.",
            architecture: {
                diagram: `graph TD
    A[Raw Cohort Data] -->|Split| B(Chunk Generator)
    B --> C{Distributed Workers}
    C -->|Parallel Processing| D[R Engine + DuckDB]
    D -->|Transaction| E[Local Chunk DB]
    E -->|Aggregator| F["Central Mart DB (MariaDB)"]
    F --> G[Django API Server]
    G --> H[Cytoscape.js Frontend]
    subgraph Fault Tolerance
    I[Watcher Script] -.->|Monitor| C
    I -.->|Auto-Restart| C
    end`,
                description: "Bash 기반의 Watcher가 R 프로세스를 감시하며, 실패 시 마지막 체크포인트부터 자동 복구(Auto-Recovery)를 수행합니다. 분석 결과는 MariaDB로 적재되어 웹에서 동적으로 탐색 가능합니다."
            },
            features: [
                "100만 명 코호트, 4,800만 건 엣지(Edge) 데이터 처리",
                "RR(Relative Risk) 및 HR(Hazard Ratio) 이종 모델 간 데이터 정합성 검증 (Root Cause Analysis)",
                "Systemd-run을 활용한 프로세스 별 메모리 격리 및 제한 (Cgroups)",
                "동적 네트워크 시각화 (Dynamic Network Visualization)"
            ],
            impact: "기존 1주일 소요되던 분석을 12시간으로 단축(14배 가속) 및 학회 구연 발표 선정.",
            challenges: "서로 다른 통계 모델(RR vs HR)의 데이터 정합성이 0.17% 불일치하는 문제 발견. SAS PROC SORT의 비결정적 특성을 규명하고, Key Sequence 기반 매핑으로 무결성 입증."
        }
    },
    {
        id: "medinavi",
        title: "MEDINAVI: Automated ETL Pipeline",
        category: "Automation",
        highlight: true,
        oneLiner: "비정형 약제 데이터를 수집·정제하여 연구용 DB로 구축하는 고성능 크롤링 파이프라인.",
        image: "/images/medinavi-thumb.jpg",
        tags: ["Python", "Multiprocessing", "Regex", "ETL", "BeautifulSoup"],
        period: "2023.07 - 2023.12",
        role: "Data Engineer",
        links: {
            github: "https://github.com/hashjamm/MEDINAVI-DB-Project"
        },
        stats: [
            { label: "Records", value: "92,799" },
            { label: "Efficiency", value: "10x Faster" }
        ],
        techStack: [
            { category: "Collection", skills: ["Python Requests", "Multiprocessing", "BeautifulSoup"] },
            { category: "Processing", skills: ["Pandas", "Regex"] },
            { category: "Database", skills: ["PostgreSQL"] }
        ],
        detail: {
            problem: "약물 코드 표준의 잦은 변경으로 과거 이력 추적이 불가능하며, 연구자가 수동으로 데이터를 확보하는 데 과도한 시간 소요.",
            solution: "병렬 크롤러(Multiprocessing)를 도입하여 수집 속도를 극대화하고, Regex 기반 파서로 비정형 텍스트를 구조화된 데이터로 변환.",
            architecture: {
                diagram: `graph LR
    A[Web Sources] -->|Async Crawl| B(Raw HTML)
    B -->|Regex Parsing| C[Structured Data]
    C -->|Validation| D{Quality Check}
    D -->|Pass| E[Master DB]
    D -->|Fail| F[Error Log]
    E --> G[Research API]`,
                description: "다수의 웹 소스에서 비동기/병렬 방식으로 데이터를 수집하고, 정규표현식 엔진을 통해 약품명, 성분, 용법 등을 정밀하게 추출합니다."
            },
            features: [
                "9만 2천 건 이상의 약제 정보 DB화",
                "약품명/성분명 기반 퍼지 검색(Fuzzy Search) 지원",
                "데이터 변경 이력 관리(History Tracking)"
            ],
            impact: "연구 데이터 신청 업무 자동화로 소요 시간 90% 단축 및 심평원 데이터 대비 100% 정합성 확보."
        }
    },
    {
        id: "mental-health-api",
        title: "AI-Powered Mental Health API",
        category: "Backend & GenAI",
        highlight: true,
        oneLiner: "설문 분석부터 LLM 상담, PDF 리포트 생성까지 수행하는 Dockerized API 서버.",
        image: "/images/crowdworker-thumb.jpg",
        tags: ["Django DRF", "Docker", "OpenAI API", "Playwright"],
        period: "2023.01 - 2023.06",
        role: "Backend Developer",
        links: {
            github: "https://github.com/hashjamm/MentalCrowdWorkerProject"
        },
        stats: [
            { label: "Report", value: "Auto-PDF" },
            { label: "Deploy", value: "Docker" }
        ],
        techStack: [
            { category: "Backend", skills: ["Django REST Framework", "Celery"] },
            { category: "AI/ML", skills: ["OpenAI GPT-4", "Scikit-learn"] },
            { category: "DevOps", skills: ["Docker", "Nginx"] }
        ],
        detail: {
            problem: "단순 점수 산출을 넘어선 개인화 해석이 필요했으나, 전문 상담 인력 부족으로 대규모 서비스 불가.",
            solution: "GPT-4o를 연동하여 개인화된 심리 상담 코멘트를 생성하고, Playwright를 활용해 고품질 PDF 리포트를 실시간 렌더링.",
            architecture: {
                diagram: `sequenceDiagram
    participant User
    participant API
    participant LLM
    participant PDF
    User->>API: Submit Survey
    API->>API: Calculate Score
    API->>LLM: Request Analysis
    LLM-->>API: Return Insight
    API->>PDF: Render HTML to PDF
    PDF-->>User: Download Report`,
                description: "사용자 응답을 분석하여 점수를 산출하고, LLM이 문맥에 맞는 조언을 생성하면, 이를 시각화된 리포트로 변환하여 제공합니다."
            },
            features: [
                "우울/불안 척도 자동 채점 및 위험군 분류",
                "LLM 기반 개인 맞춤형 심리 조언 생성",
                "HTML/CSS 기반의 고해상도 PDF 리포트 자동 생성",
                "Docker 기반의 컨테이너화 된 배포 환경"
            ],
            impact: "연구 기관 서버 탑재 및 특허 출원 추진, 상담 대기 시간 0초로 단축."
        }
    },
    {
        id: "health-recsys",
        title: "Hybrid Health RecSys Engine",
        category: "ML & Business",
        highlight: true,
        oneLiner: "건강검진 데이터 기반 16가지 페르소나 분류 및 영양제 추천 상용 AI 모델.",
        image: "/images/mbti-thumb.jpg",
        tags: ["XGBoost", "K-Prototypes", "SHAP", "Optuna"],
        period: "2022.06 - 2022.12",
        role: "AI Researcher",
        links: {
            github: "https://github.com/hashjamm/personalized_supplement_recommender"
        },
        stats: [
            { label: "Users", value: "49,599" },
            { label: "Type", value: "16 Class" }
        ],
        techStack: [
            { category: "ML Model", skills: ["XGBoost", "K-Prototypes"] },
            { category: "XAI", skills: ["SHAP"] },
            { category: "Optimization", skills: ["Optuna"] }
        ],
        detail: {
            problem: "구매 이력이 없는 Cold-Start 유저에게 개인화된 영양제를 추천해야 하는 난제.",
            solution: "건강검진 데이터(수치형)와 라이프스타일(범주형)을 혼합 군집화(K-Prototypes)하여 페르소나를 정의하고, XGBoost로 분류 모델 구축.",
            architecture: {
                diagram: `graph TD
    A[Health Data] --> B{"Clustering (K-Prototypes)"}
    B --> C[16 Personas]
    D[New User] --> E["Classification (XGBoost)"]
    E --> C
    C --> F[Rule-based Filtering]
    F --> G[Product Recommendation]`,
                description: "수치형/범주형 데이터가 혼재된 건강 데이터를 효과적으로 군집화하고, SHAP를 통해 추천 근거(XAI)를 제시합니다."
            },
            features: [
                "49,599명 데이터 기반 16가지 건강 페르소나 도출",
                "SHAP Value를 활용한 '왜 이 제품인가요?' 설명 가능성 확보",
                "Hyperparameter Tuning (Optuna)을 통한 모델 성능 최적화"
            ],
            impact: "CJ WELLCARE 기술 이전 및 특허 출원, 개인화 추천 정확도 85% 달성."
        }
    },
    // --- Archive Projects (Highlight: false) ---
    {
        id: "infectious-system",
        title: "National Infectious Disease System",
        category: "System Design",
        highlight: false,
        oneLiner: "통합 환경 지표 개발 및 '코로나 신호등' 서비스 기획.",
        image: "/images/traffic-light-thumb.jpg",
        tags: ["Service Planning", "R", "SAS", "Time-Series"],
        links: {
            github: "https://github.com/hashjamm/NIPA_infection"
        },
        detail: {
            problem: "기존 감염병 예측 모델의 환경 변수 반영 부족.",
            solution: "Time-stratified Case-Crossover Design 적용 및 통합 환경 지표 개발.",
            architecture: { diagram: "", description: "" },
            features: ["통합 대기 환경 지수 개발", "코로나 신호등 서비스 기획"],
            impact: "국책 과제 수행 및 데이터 기반 방역 정책 제언."
        }
    },
    {
        id: "cgm-efficacy",
        title: "CGM Efficacy Analysis",
        category: "IoT Data",
        highlight: false,
        oneLiner: "웨어러블 기기 로그와 임상 데이터 결합 분석.",
        image: "/images/cgm-thumb.jpg",
        tags: ["IoT Data", "Python", "R", "PSM"],
        links: {
            github: "https://github.com/hashjamm/CGM-FRIEND-LibreView"
        },
        detail: {
            problem: "CGM 단독 사용의 임상적 효과성 입증 필요.",
            solution: "전향/후향 연구 설계 및 PSM(Propensity Score Matching) 분석.",
            architecture: { diagram: "", description: "" },
            features: ["CGM 데이터 전처리 파이프라인", "통계적 가설 검증 (ANOVA, PSM)"],
            impact: "SCI급 논문 게재 및 디지털 헬스케어 효용성 입증."
        }
    },
    {
        id: "adhd-cohort",
        title: "ADHD Cohort Study & Tech Mentoring",
        category: "Research",
        highlight: false,
        oneLiner: "대용량 코호트 파이프라인 최적화 및 팀 기술 멘토링.",
        image: "/images/neonates-adhd-thumb.jpg",
        tags: ["SAS", "SQL", "Team Leading"],
        detail: { problem: "", solution: "", architecture: { diagram: "", description: "" }, features: [], impact: "" }
    },
    {
        id: "hunomind-proto",
        title: "HUNOMIND: Full-Stack Prototype",
        category: "App Dev",
        highlight: false,
        type: 'engineering',
        oneLiner: "기획부터 앱, 서버 배포까지 1인 개발 헬스케어 MVP.",
        image: "/images/hunomind-thumb.jpg",
        tags: ["Kotlin", "Django", "AWS"],
        detail: {
            problem: "비대면 정신건강 관리 수요 증가에 따라, 환자(앱)-의료진(Web)-데이터(DB)가 유기적으로 연동되는 통합 플랫폼 부재.",
            solution: "Android(Kotlin) 앱과 Django REST API 서버를 구축하고, AWS EC2에 배포하여 End-to-End 데이터 파이프라인 완성.",
            architecture: {
                diagram: `graph LR
    User["Patient (Android App)"] -->|REST API| LB["Nginx / Load Balancer"]
    LB --> Server["Django API Server"]
    Server --> DB[("MySQL Database")]
    Server -->|Log| S3["AWS S3 (Data Lake)"]
    Doctor["Medical Staff (Web)"] -->|Dashboard| Server`,
                description: "환자의 설문 및 감정 데이터가 실시간으로 서버에 전송되고, 의료진이 이를 모니터링할 수 있는 양방향 구조입니다."
            },
            features: [
                "Kotlin 기반 안드로이드 앱 (로그인, 설문, 감정 다이어리)",
                "Django REST Framework (DRF) 기반 API 서버 구축",
                "AWS EC2 및 Nginx를 활용한 배포 및 운영",
                "학회 부스 시연을 위한 프로토타입 완성 및 투자 유치 활용"
            ],
            impact: "기획, 디자인, 개발, 배포 전 과정을 1인 수행하여 풀스택 역량 확보 및 학회 시연 성공."
        }
    },
    {
        id: "neonatal-allergy",
        title: "Neonatal Allergy & Air Pollution",
        category: "Analytics",
        highlight: false,
        oneLiner: "공공 데이터 융합 및 비선형 모델링(RCS) 연구.",
        image: "/images/nj-allergy-thumb.jpg",
        tags: ["R", "Advanced Stat"],
        detail: { problem: "", solution: "", architecture: { diagram: "", description: "" }, features: [], impact: "" }
    },
    {
        id: "covid-longitudinal",
        title: "Longitudinal COVID-19 Analysis",
        category: "Analytics",
        highlight: false,
        oneLiner: "건강 상태 '변화량(Delta)' 기반 위험도 분석.",
        image: "/images/covid-delta-thumb.jpg",
        tags: ["Feature Engineering", "SQL"],
        detail: { problem: "", solution: "", architecture: { diagram: "", description: "" }, features: [], impact: "" }
    },
    {
        id: "covid-pollution",
        title: "Short-term Pollution & COVID-19",
        category: "Causal Inference",
        highlight: false,
        type: 'research',
        oneLiner: "Case-Crossover 설계로 미세먼지 인과성 규명.",
        image: "/images/covid-short-thumb.jpg",
        tags: ["Causal Inference", "SAS"],
        detail: {
            problem: "기존 시계열 연구는 계절성 및 장기 추세의 교란 요인을 완벽히 통제하기 어려운 한계 존재.",
            solution: "개인 자체를 대조군으로 설정하는 Time-Stratified Case-Crossover 설계를 적용하여 교란 요인(성별, 나이, 흡연력 등)을 원천 배제.",
            architecture: {
                diagram: `graph TD
    A[Patient Case Day] -->|Match| B(Control Days)
    B -->|Same Month/Year| C{Time Stratified}
    C -->|Compare| D[Meteorological Data]
    D -->|Conditional Logistic| E[Odds Ratio Calculation]`,
                description: "환자의 감염일(Case)과 같은 달/요일의 다른 날(Control)을 매칭하여 외부 변수를 통제하고, 조건부 로지스틱 회귀분석을 수행합니다."
            },
            features: [
                "Time-Stratified Case-Crossover Design 적용",
                "SAS `proc logistic strata` 활용 조건부 로지스틱 회귀분석",
                "Lag 0-7일 기상 변수(기온, 습도, 일조량 등)의 지연 효과 분석",
                "개인 단위 교란 요인(Time-invariant Confounders) 완전 통제"
            ],
            impact: "미세먼지 및 기상 요인이 호흡기 감염에 미치는 단기적 인과성을 통계적으로 규명."
        }
    },
    {
        id: "thyroid-bidirectional",
        title: "Bidirectional Cancer Risk Study",
        category: "Analytics",
        highlight: false,
        oneLiner: "양방향 코호트 설계와 PSM 매칭 분석.",
        image: "/images/bidirection-cancer-thumb.jpg",
        tags: ["PSM", "SAS"],
        detail: { problem: "", solution: "", architecture: { diagram: "", description: "" }, features: [], impact: "" }
    },
    {
        id: "healthcare-kpi",
        title: "Healthcare Service KPI",
        category: "BI & Strategy",
        highlight: false,
        oneLiner: "Dask 활용 로그 처리 및 '종합 건강 점수' 개발.",
        image: "/images/mobile-healthcare-thumb.jpg",
        tags: ["Dask", "Power BI"],
        detail: { problem: "", solution: "", architecture: { diagram: "", description: "" }, features: [], impact: "" }
    }
];