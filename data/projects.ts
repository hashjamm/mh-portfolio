export interface Project {
    id: string;
    title: string;
    category: string;
    highlight: boolean;
    oneLiner: string;
    tags: string[];
    image: string; // public 폴더 내 실제 파일명 매핑
    stats?: { label: string; value: string }[];
    detail: {
        problem: string;
        solution: string;
        architecture: string; // Mermaid 코드 혹은 텍스트 설명
        result: string;
    };
}

export const projects: Project[] = [
    {
        id: "cotdex",
        title: "CoTDeX: Dynamic Disease Network",
        category: "Data Engineering",
        highlight: true,
        oneLiner: "100만 명 코호트, 4,800만 건 관계 데이터를 처리하는 동적 네트워크 분석 플랫폼.",
        image: "/cotdex-thumb.png",
        tags: ["Python", "Django", "Cytoscape.js", "Redis"],
        stats: [
            { label: "Cohort Size", value: "1M+" },
            { label: "Relations", value: "48M+" }
        ],
        detail: {
            problem: "기존 정적 분석으로는 질병 관계의 시계열 변화를 추적 불가, 1TB급 데이터 실시간 시각화 한계.",
            solution: "Multiprocessing 병렬 ETL 파이프라인 및 장애 허용(Fault Tolerance) 스크립트 적용.",
            architecture: "Raw Data -> ETL (R/Python) -> Mart DB -> API (Django) -> Client",
            result: "학회 구연 발표 선정, 실시간 네트워크 탐색 시스템 구축."
        }
    },
    {
        "id": "medinavi",
        "title": "MEDINAVI: Automated ETL Pipeline",
        "category": "Automation",
        "highlight": true,
        "oneLiner": "비정형 약제 데이터를 수집·정제하여 연구용 DB로 구축하는 고성능 크롤링 파이프라인.",
        "image": "/medinavi-thumb.jpg",
        "tags": ["Python", "Multiprocessing", "Regex", "ETL"],
        "stats": [
            { "label": "Records", "value": "92,799" },
            { "label": "Efficiency", "value": "10x Faster" }
        ],
        "detail": {
            "problem": "약물 코드 표준의 잦은 변경으로 과거 이력 추적 불가, 수동 데이터 확보 비효율.",
            "solution": "병렬 크롤러(Multiprocessing) 및 Regex 기반 비정형 텍스트 구조화.",
            "architecture": "Web -> Crawler -> Parser -> Validator -> DB",
            "result": "연구 데이터 신청 업무 자동화 및 심평원 데이터 대비 100% 정합성 확보."
        }
    },
    {
        "id": "mental-health-api",
        "title": "AI-Powered Mental Health API",
        "category": "Backend & GenAI",
        "highlight": true,
        "oneLiner": "설문 분석부터 LLM 상담, PDF 리포트 생성까지 수행하는 Dockerized API 서버.",
        "image": "/crowdworker-thumb.jpg",
        "tags": ["Django DRF", "Docker", "OpenAI API", "Playwright"],
        "stats": [
            { "label": "Report", "value": "Auto-PDF" },
            { "label": "Deploy", "value": "Docker" }
        ],
        "detail": {
            "problem": "단순 점수 산출을 넘어선 개인화 해석 및 시각화 리포트 자동화 필요.",
            "solution": "GPT-4o 연동 상담 로직 및 Playwright 기반 HTML-to-PDF 렌더링 엔진 개발.",
            "architecture": "Client -> API -> Scoring/LLM -> PDF Gen -> Result",
            "result": "연구 기관 서버 탑재 및 특허 출원 추진."
        }
    },
    {
        "id": "health-recsys",
        "title": "Hybrid Health RecSys Engine",
        "category": "ML & Business",
        "highlight": true,
        "oneLiner": "건강검진 데이터 기반 16가지 페르소나 분류 및 영양제 추천 상용 AI 모델.",
        "image": "/mbti-thumb.jpg",
        "tags": ["XGBoost", "K-Prototypes", "SHAP", "Optuna"],
        "stats": [
            { "label": "Users", "value": "49,599" },
            { "label": "Type", "value": "16 Class" }
        ],
        "detail": {
            "problem": "구매 이력이 없는 Cold-Start 유저 대상 개인화 추천 난제.",
            "solution": "수치/범주형 혼합 데이터 군집화(K-Prototypes) 및 XAI(SHAP) 적용.",
            "architecture": "Data -> Clustering -> Classification -> Recommendation",
            "result": "CJ WELLCARE 기술 이전 및 특허 출원."
        }
    },
    // --- Archive Projects (Highlight: false) ---
    {
        id: "adhd-cohort",
        title: "ADHD Cohort Study & Tech Mentoring",
        category: "Research",
        highlight: false,
        oneLiner: "대용량 코호트 파이프라인 최적화 및 팀 기술 멘토링.",
        image: "/neonates-adhd-thumb.jpg",
        tags: ["SAS", "SQL", "Team Leading"],
        detail: { problem: "", solution: "", architecture: "", result: "" }
    },
    {
        id: "hunomind-proto",
        title: "HUNOMIND: Full- Stack Prototype",
        category: "App Dev",
        highlight: false,
        oneLiner: "기획부터 앱, 서버 배포까지 1인 개발 헬스케어 MVP.",
        image: "/hunomind-thumb.jpg",
        tags: ["Kotlin", "Django", "AWS"],
        detail: { problem: "", solution: "", architecture: "", result: "" }
    },
    {
        id: "neonatal-allergy",
        title: "Neonatal Allergy & Air Pollution",
        category: "Analytics",
        highlight: false,
        oneLiner: "공공 데이터 융합 및 비선형 모델링(RCS) 연구.",
        image: "/nj-allergy-thumb.jpg",
        tags: ["R", "Advanced Stat"],
        detail: { problem: "", solution: "", architecture: "", result: "" }
    },
    {
        id: "infectious-system",
        title: "National Infectious Disease System",
        category: "System Design",
        highlight: false,
        oneLiner: "통합 환경 지표 개발 및 '코로나 신호등' 서비스 기획.",
        image: "/traffic-light-thumb.jpg",
        tags: ["Service Planning", "R"],
        detail: { problem: "", solution: "", architecture: "", result: "" }
    },
    {
        id: "covid-longitudinal",
        title: "Longitudinal COVID-19 Analysis",
        category: "Analytics",
        highlight: false,
        oneLiner: "건강 상태 '변화량(Delta)' 기반 위험도 분석.",
        image: "/covid-delta-thumb.jpg",
        tags: ["Feature Engineering", "SQL"],
        detail: { problem: "", solution: "", architecture: "", result: "" }
    },
    {
        id: "covid-pollution",
        title: "Short-term Pollution & COVID-19",
        category: "Causal Inference",
        highlight: false,
        oneLiner: "Case-Crossover 설계로 미세먼지 인과성 규명.",
        image: "/covid-short-thumb.jpg",
        tags: ["Causal Inference", "SAS"],
        detail: { problem: "", solution: "", architecture: "", result: "" }
    },
    {
        id: "thyroid-bidirectional",
        title: "Bidirectional Cancer Risk Study",
        category: "Analytics",
        highlight: false,
        oneLiner: "양방향 코호트 설계와 PSM 매칭 분석.",
        image: "/bidirection-cancer-thumb.jpg",
        tags: ["PSM", "SAS"],
        detail: { problem: "", solution: "", architecture: "", result: "" }
    },
    {
        id: "cgm-efficacy",
        title: "CGM Efficacy Analysis",
        category: "IoT Data",
        highlight: false,
        oneLiner: "웨어러블 기기 로그와 임상 데이터 결합 분석.",
        image: "/cgm-thumb.jpg",
        tags: ["IoT Data", "Python"],
        detail: { problem: "", solution: "", architecture: "", result: "" }
    },
    {
        id: "healthcare-kpi",
        title: "Healthcare Service KPI",
        category: "BI & Strategy",
        highlight: false,
        oneLiner: "Dask 활용 로그 처리 및 '종합 건강 점수' 개발.",
        image: "/mobile-healthcare-thumb.jpg",
        tags: ["Dask", "Power BI"],
        detail: { problem: "", solution: "", architecture: "", result: "" }
    }
];