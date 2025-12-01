export type ProjectCategory = 'Research' | 'Engineering' | 'Service' | 'GenAI';

export interface Project {
    id: string;
    title: string;
    subtitle: string;
    period: string;
    category: ProjectCategory;
    tags: string[];
    description: string;
    thumbnail?: string; // 이미지 경로 (public 폴더 기준)
    highlights: string[];
    featured?: boolean;
}

export const projects: Project[] = [
    // (13) CoTDeX: 최상위 플래그십 프로젝트 (Engineering + Research)
    {
        id: 'cotdex',
        title: 'CoTDeX (Disease Network)',
        subtitle: 'HPC-Level Disease Network Analysis Engine & Platform',
        period: '2025.02 - Present',
        category: 'Engineering',
        tags: ['R', 'Shell', 'DuckDB', 'HPC', 'Parallel Computing', 'Django'],
        description: '100만 명 코호트 데이터를 활용한 대규모 질병 네트워크 분석 엔진 및 시각화 플랫폼입니다. 60-Core 병렬 처리와 트랜잭션 관리를 통해 결함 내성(Fault Tolerance)을 갖춘 분산 처리 시스템을 구축했습니다.',
        highlights: [
            'Self-Healing Architecture: 자동 재시작 및 체크포인팅 시스템 구현 (Shell Script)',
            'Transaction Management: 데이터 무결성을 위한 ACID 트랜잭션 및 롤백 로직 설계 (R/DuckDB)',
            'Optimization: DuckDB 청크 처리 및 Future 패키지를 활용한 고성능 병렬 파이프라인'
        ],
        thumbnail: '/images/cotdex-thumb.jpg',
        featured: true,
    },

    // (8) HUNOMIND: 풀스택 개발 역량 (Service + Mobile)
    {
        id: 'hunomind',
        title: 'HUNOMIND (Mental Health Platform)',
        subtitle: 'End-to-End Digital Therapeutics(DTx) Platform',
        period: '2023.01 - 2023.06',
        category: 'Service',
        tags: ['Kotlin', 'Django DRF', 'AWS EC2', 'MySQL', 'Docker'],
        description: '우울증 디지털 진단 및 인지행동치료(CBT)를 위한 모바일 앱 및 백엔드 서버 풀스택 개발 프로젝트입니다. 안드로이드 앱부터 서버, DB, 배포까지 전 과정을 주도했습니다.',
        highlights: [
            'Full-Cycle Development: 기획부터 배포까지 서비스 전체 라이프사이클 리딩',
            'Medical Logic Implementation: 의료 진단 로직을 정교한 RESTful API로 구현',
            'Infrastructure: AWS EC2 및 Nginx 환경 구축 및 운영'
        ],
        thumbnail: '/images/hunomind-thumb.jpg',
        featured: true,
    },

    // (12) MEDINAVI: 데이터 엔지니어링 & ETL (Engineering)
    {
        id: 'medinavi',
        title: 'MEDINAVI Database Pipeline',
        subtitle: 'High-Performance Drug Database ETL Pipeline',
        period: '2025.03 - 2025.05',
        category: 'Engineering',
        tags: ['Python', 'Multiprocessing', 'Regex', 'ETL', 'BeautifulSoup'],
        description: '웹상의 비정형 약제 데이터를 수집하여 구조화된 DB로 변환하는 고성능 ETL 파이프라인입니다. 멀티프로세싱을 통해 수집 속도를 극대화했습니다.',
        highlights: [
            'Performance Tuning: 멀티프로세싱 도입으로 데이터 수집 시간 80% 단축',
            'Complex Parsing: 정규표현식을 활용한 비정형 텍스트 정제 자동화',
            'Data Integrity: 외부 공공 데이터와의 교차 검증을 통한 무결성 확보'
        ],
        thumbnail: '/images/medinavi-thumb.jpg',
        featured: true,
    },

    // (11) GenAI Report: 최신 기술 트렌드 (GenAI)
    {
        id: 'genai-report',
        title: 'AI-Powered Mental Health Report',
        subtitle: 'Automated Reporting System for Gig Workers',
        period: '2024.11 - 2025.08',
        category: 'GenAI',
        tags: ['LLM', 'LangChain', 'Prompt Engineering', 'Python', 'Playwright'],
        description: '크라우드 워커의 정신건강 상태를 분석하고, LLM을 활용해 개인 맞춤형 리포트를 자동 생성하는 시스템입니다.',
        highlights: [
            'Generative AI Integration: 진단 결과에 따른 맞춤형 텍스트 생성 파이프라인 구축',
            'Report Automation: 데이터 분석부터 PDF 리포트 생성까지 원클릭 자동화',
            'Trend Adoption: 최신 LLM 기술을 실무 비즈니스 로직에 적용'
        ],
        thumbnail: '/images/crowdworker-thumb.jpg',
        featured: false,
    },

    // (10) Health MBTI: 상업용 AI 모델링 (Service/AI)
    {
        id: 'health-mbti',
        title: 'Commercial AI RecSys: Health MBTI',
        subtitle: 'Personalized Health Supplement Recommendation Engine',
        period: '2023.10 - 2024.03',
        category: 'Service',
        tags: ['XGBoost', 'K-prototype', 'SHAP', 'Optuna', 'Tech Transfer'],
        description: '건강검진 데이터를 기반으로 개인을 16가지 건강 유형(MBTI)으로 분류하고, 맞춤형 영양제를 추천하는 상업용 AI 알고리즘입니다.',
        highlights: [
            'Business Impact: CJ WELLCARE 기술 이전 및 특허 출원 완료',
            'Explainable AI (XAI): SHAP 값을 활용한 추천 근거 시각화',
            'User-Centric Modeling: 복잡한 의료 데이터를 사용자 친화적인 MBTI 개념으로 치환'
        ],
        thumbnail: '/images/mbti-thumb.jpg',
        featured: false,
    },

    // (9) Pediatric Anesthesia: 기술 리더십 (Research/Mentoring)
    {
        id: 'pediatric-adhd',
        title: 'Pediatric Anesthesia & ADHD Study',
        subtitle: 'Technical Lead & Mentoring for Clinical Research',
        period: '2023.05 - 2023.08',
        category: 'Research',
        tags: ['Tech Lead', 'Mentoring', 'Study Design', 'Troubleshooting'],
        description: '영유아 전신마취 노출과 ADHD 발병 간의 연관성을 규명하는 연구에서 기술적 난관을 해결하고 팀원을 멘토링했습니다.',
        highlights: [
            'Technical Leadership: 데이터 편향(Bias) 문제를 해결하기 위한 통계적 보정 기법 제안',
            'Mentoring: 팀원 대상 데이터 핸들링 가이드 및 코드 리뷰 주도',
            'Problem Solving: 복잡한 코호트 설계의 기술적 구현 담당'
        ],
        thumbnail: '/images/neonates-adhd-thumb.jpg',
        featured: false,
    },

    // (7) 신생아: 단기 대기 오염 노출 & 알러지 (RCS 분석)
    {
        id: 'neonatal-allergy',
        title: 'Neonatal Jaundice & Allergy Risk',
        subtitle: 'Environmental Risk Factor Analysis using RCS',
        period: '2023.01 - 2023.06',
        category: 'Research',
        tags: ['R', 'SAS', 'SQL', 'RCS', 'Cox Regression'],
        description: '신생아 황달과 생후 초기 대기오염 노출의 복합적 영향이 이후 알러지 질환 발병에 미치는 영향을 규명한 연구입니다. 비선형 분석 기법(Restricted Cubic Spline)을 적용해 정밀한 위험도 구간을 시각화했습니다.',
        highlights: [
            'Advanced Statistics: RCS를 활용하여 대기오염 농도에 따른 비선형적 위험도(Risk Curve) 규명',
            'Cohort Design: 대기오염 데이터와 임상 데이터를 결합한 대규모 코호트 재구축',
            'Outcome: 학회 포스터 발표 및 데이터 기반 임상 인사이트 도출'
        ],
        featured: false,
    },

    // (6) 신규 감염병 대응 시스템 (조기 경보)
    {
        id: 'infection-ews',
        title: 'Infectious Disease Early Warning System',
        subtitle: 'National Crisis Response System Planning',
        period: '2022.11 - 2023.02',
        category: 'Engineering',
        tags: ['R', 'SAS', 'Time-Series', 'System Architecture'],
        description: '코로나19 및 인플루엔자 유행 예측 모델과 통합 환경 지표(CAI)를 기반으로 한 국가 감염병 조기 경보 시스템(신호등 체계)을 기획하고 아키텍처를 설계했습니다.',
        highlights: [
            'System Planning: 데이터 기반 위기 대응 시스템(Early Warning System) 서비스 기획',
            'Index Development: 기상/대기 데이터를 통합한 새로운 환경 위험 지표 개발',
            'Impact: 국책 과제 수행 및 감염병 대응 정책 제언'
        ],
        featured: false,
    },

    // (5) 개인·사회·환경 요인 변화 & 코로나 (종단 연구)
    {
        id: 'covid-longitudinal',
        title: 'COVID-19 Severity & Longitudinal Changes',
        subtitle: 'Impact of Lifestyle Changes (Delta) on Outcomes',
        period: '2022.09 - 2023.04',
        category: 'Research',
        tags: ['SAS', 'SQL', 'Longitudinal Analysis', 'Feature Engineering'],
        description: '코로나 유행 전후의 개인/사회/환경 요인 변화량(Delta)이 감염 및 중증도에 미치는 영향을 규명한 대규모 종단 연구입니다. 변화를 추적하는 파이프라인을 구축했습니다.',
        highlights: [
            'Feature Engineering: 시계열 데이터의 "변화량(Delta)"을 핵심 피처로 정의 및 추출',
            'Scalability: 동일 코호트 프레임워크로 다수의 SCI 논문을 배출하는 분석 시스템 구축',
            'Outcome: SCI급 논문 다수 게재'
        ],
        featured: false,
    },

    // (4) 코로나 - 단기 대기 오염 노출 (Case-Crossover)
    {
        id: 'covid-air-pollution',
        title: 'COVID-19 & Short-term Air Pollution',
        subtitle: 'Spatial Analysis using Case-Crossover Design',
        period: '2022.02 - 2022.04',
        category: 'Research',
        tags: ['SAS', 'Spatial Analysis', 'Case-Crossover', 'GIS'],
        description: '확진자 데이터(건보공단)와 대기오염 데이터(에어코리아)를 시공간적(Grid)으로 매핑하여, 미세먼지 단기 노출이 감염 위험에 미치는 영향을 규명했습니다.',
        highlights: [
            'Spatial Engineering: 환자 거주지 좌표와 대기오염 측정소 간의 격자(Grid) 매핑 알고리즘 구현',
            'Methodology: Time-stratified Case-Crossover Design 적용으로 통계적 엄밀성 확보',
            'Outcome: 학회 구연 발표 및 환경성 질환 연구 기여'
        ],
        thumbnail: '/images/covid-short-thumb.jpg',
        featured: false,
    },

    // (3) 기타암 ↔ 갑상선암 상호 위험도 (양방향성 연구)
    {
        id: 'cancer-bidirectional',
        title: 'Bidirectional Cancer Risk Study',
        subtitle: 'Thyroid & Other Cancers Association Analysis',
        period: '2022.02 - 2022.09',
        category: 'Research',
        tags: ['SAS', 'R', 'PSM', 'Cox Regression', 'Large Cohort'],
        description: '대규모 코호트 데이터를 활용하여 갑상선암과 타 암종 간의 양방향(Bidirectional) 발생 위험도를 통계적으로 규명했습니다. 암 생존자의 2차 암 발생 위험을 예측하는 중요한 근거를 마련했습니다.',
        highlights: [
            'Study Design: 인과관계의 방향성을 파악하기 위한 양방향 코호트 설계',
            'Bias Control: 성향 점수 매칭(PSM)을 통해 교란 변수를 엄격하게 통제',
            'Outcome: SCI급 논문 게재 및 암 역학 분야 기여'
        ],
        thumbnail: '/images/bidirection-cancer-thumb.jpg',
        featured: false,
    },

    // (2) 연속혈당측정기(CGM) 효과성 입증
    {
        id: 'cgm-study',
        title: 'CGM Effectiveness Study',
        subtitle: 'Prospective & Retrospective Clinical Research',
        period: '2021.01 - 2022.04',
        category: 'Research',
        tags: ['R', 'Python', 'ANOVA', 'Real-World Data', 'Cloud Data'],
        description: '연속혈당측정기(CGM) 사용 및 의료진의 원격 개입이 당뇨 환자의 혈당 관리에 미치는 영향을 전향/후향적으로 분석했습니다. 병원 EMR 데이터와 CGM 클라우드 로그 데이터를 결합하여 분석했습니다.',
        highlights: [
            'Data Engineering: 병원 EMR 데이터와 이종의 CGM 라이프로그 데이터 결합 파이프라인 구축',
            'Evidence Generation: 통계적 방법론(ANOVA, PSM)을 통한 임상적 유효성 검증',
            'Outcome: SCI급 논문 게재로 디지털 헬스케어의 의학적 근거 마련'
        ],
        thumbnail: '/images/cgm-thumb.jpg',
        featured: false,
    },

    // (1) 2020 보건소 모바일 헬스케어 (대용량 로그)
    {
        id: 'mobile-healthcare',
        title: 'Mobile Healthcare Service Index',
        subtitle: 'Effectiveness Analysis & Metric Development',
        period: '2020.10 - 2020.12',
        category: 'Research',
        tags: ['Python', 'Dask', 'Pandas', 'Power BI', 'Log Analysis'],
        description: '60GB 규모의 대용량 라이프로그(JSON) 데이터를 분석하여 보건소 모바일 헬스케어 사업의 효과성을 입증하는 신규 성과 지표를 개발했습니다.',
        highlights: [
            'Big Data Processing: 메모리 한계를 극복하기 위해 Dask 분산 처리 라이브러리 도입',
            'Metric Innovation: "건강관리 습관자 비율" 등 정성적 목표를 정량적 지표로 치환',
            'Visualization: Power BI 대시보드 구축 및 분석 결과 시각화'
        ],
        thumbnail: '/images/mobile-healthcare-thumb.jpg',
        featured: false,
    },
];