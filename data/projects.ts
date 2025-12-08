export interface Project {
    id: string;
    title: string;
    category: string;
    highlight: boolean;
    oneLiner: string;
    tags: string[];
    image: string; // public 폴더 내 실제 파일명 매핑
    gallery?: string[]; // Additional project images
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
        background?: string; // Project background/context
        problem: string;
        solution: string;
        architecture: {
            diagram: string; // Mermaid code
            description: string;
        };
        features: string[];
        impact: string;
        review?: string; // Personal review/learnings
        challenges?: string; // Technical challenges & overcoming
        deepDives?: {
            title: string;
            content: string;
            codeSnippet?: string;
        }[];
    };
}

export const projects: Project[] = [
    {
        id: "cotdex",
        title: "CoTDeX: Dynamic Disease Network",
        category: "Data Engineering",
        highlight: true,
        oneLiner: "100만 명 코호트, 4,800만 건 관계 데이터를 처리하는 결함 허용(Fault-Tolerant) 분산 분석 엔진.",
        image: "/images/cotdex-thumb.jpg",
        tags: ["R (Parallel)", "Python (Multiprocessing)", "DuckDB", "Django", "Cytoscape.js"],
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
            { category: "Visualization", skills: ["Cytoscape.js", "Django REST API"] }
        ],
        gallery: [
            "/images/cotdex-notion-1.png",
            "/images/cotdex-notion-3.png",
            "/images/cotdex-notion-5.png"
        ],
        detail: {
            background: "이 프로젝트는 100만 명 규모의 코호트 데이터와 4,800만 건의 관계 데이터를 분석해야 하는 대규모 연구 과제였습니다. 기존 SAS 기반 시스템의 한계로 인해 분석이 불가능한 상황에서, 새로운 분산 처리 파이프라인을 구축하여 연구를 성공적으로 수행하는 것이 목표였습니다.",
            problem: "100만 명 코호트, 4,800만 건의 관계 데이터를 분석해야 했으나, 기존 SAS 기반 시스템은 메모리 초과(OOM)와 비효율적인 재작업 문제로 인해 분석이 불가능했습니다.",
            solution: "Python의 Multiprocessing을 활용한 스트리밍 파이프라인과 R의 병렬 연산 엔진을 결합한 하이브리드 아키텍처를 구축했습니다. DuckDB를 임베디드 OLAP 저장소로 활용하여 I/O 병목을 해결하고, 결함 허용(Fault-Tolerant) 설계를 적용했습니다.",
            architecture: {
                diagram: `graph TD
    A["Raw Cohort Data (SAS/CSV)"] -->|"Chunking"| B("Python Generator")
    B --> C{"Distributed Workers"}
    C -->|"Parallel Processing"| D["R Engine + DuckDB"]
    D -->|"Transaction"| E["Local Chunk DB"]
    E -->|"Aggregator"| F["Central Mart DB (MariaDB)"]
    F --> G["Django API Server"]
    G --> H["Cytoscape.js Frontend"]
    subgraph Fault Tolerance
    I["Watcher Script"] -.->|"Monitor"| C
    I -.->|"Auto-Restart"| C
    end`,
                description: "Python Generator가 데이터를 마이크로 청크로 분할하여 Distributed Workers에 전달하면, R Engine이 병렬로 통계 연산을 수행합니다. 결과는 DuckDB에 즉시 저장되고, 최종적으로 MariaDB와 Cytoscape.js를 통해 시각화됩니다."
            },
            features: [
                "100만 명 규모 대용량 코호트 병렬 처리",
                "결함 허용(Fault-Tolerant) 및 자동 복구 시스템",
                "이종 언어(Python-R-SAS) 간 데이터 정합성 보장",
                "DuckDB 기반 고성능 OLAP 파이프라인"
            ],
            impact: "기존 1주일 소요되던 분석을 12시간으로 단축(14배 가속) 및 학회 구연 발표 선정.",
            review: "이 프로젝트를 통해 대용량 데이터 처리에서의 메모리 관리와 이종 언어 간 데이터 정합성 유지의 중요성을 깊이 깨달았습니다. 특히, 단순한 성능 개선을 넘어 결함 허용(Fault-Tolerant) 설계를 통해 시스템의 안정성을 확보한 경험은 데이터 엔지니어로서 큰 성장이었습니다.",
            challenges: "서로 다른 통계 모델(RR vs HR)의 데이터 정합성이 0.17% 불일치하는 문제 발견. SAS PROC SORT의 비결정적 특성을 규명하고, Key Sequence 기반 매핑으로 무결성 입증.",
            deepDives: [
                {
                    title: "Deep Dive 1: 32GB RAM으로 1TB 처리하기 (Python)",
                    content: "전체 인접 행렬을 한 번에 로드하는 것은 불가능했습니다. 이를 해결하기 위해 전체 데이터를 10,000개의 마이크로 청크(Micro-Chunk)로 분할하고, `ProcessPoolExecutor`를 사용하여 병렬로 처리했습니다. 핵심은 'Streaming' 방식이었습니다. 처리 완료된 청크는 즉시 디스크(DuckDB)로 직렬화하고, `gc.collect()`를 명시적으로 호출하여 메모리에서 해제함으로써, 전체 파이프라인의 메모리 점유율을 일정 수준 이하로 유지했습니다.",
                    codeSnippet: `python
# node_edge_info_generator.ipynb snippet
with ProcessPoolExecutor(max_workers=4) as executor:
    for chunk in chunks:
        executor.submit(process_chunk, chunk)
        # Explicit GC to prevent memory leak
        del chunk
        gc.collect()`
                },
                {
                    title: "Deep Dive 2: 0.17%의 오차를 잡아라 (SAS vs R)",
                    content: "의학 통계의 'Gold Standard'인 SAS 결과와 R 엔진의 결과가 0.17% 불일치하는 심각한 문제가 발생했습니다. 수주 간의 디버깅 끝에, SAS의 `PROC SORT`가 동일한 값에 대해 비결정적(Non-deterministic) 순서를 반환한다는 사실을 발견했습니다. 이를 해결하기 위해 모든 데이터 파이프라인에 고유 식별자(Unique Key) 기반의 강제 정렬 로직을 추가하여, 이종 언어 간 100% 데이터 정합성을 확보했습니다."
                }
            ]
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
            { category: "Processing", skills: ["Pandas", "Regex"] }
        ],
        gallery: [
            "/images/medinavi-notion-1.png",
            "/images/medinavi-notion-2.png"
        ],
        detail: {
            background: "국내에는 연구용으로 즉시 활용 가능한 표준 약제 데이터베이스가 부재하여, 연구자들이 매번 수작업으로 데이터를 구축해야 하는 비효율이 존재했습니다. 특히 약물 코드가 시점에 따라 변경되는 문제로 인해, 과거 이력을 포함한 정확한 DB 구축이 필수적이었습니다.",
            problem: "약학정보원 등에서 제공하는 데이터는 HTML 내 비정형 텍스트 형태로 산재되어 있어 대규모 분석에 활용하기 어려웠으며, 단일 스레드 방식의 수집은 속도가 너무 느려 전체 데이터 확보에 수일이 소요되는 문제가 있었습니다.",
            solution: "Python `multiprocessing`을 활용한 병렬 크롤링 아키텍처를 도입하여 수집 속도를 획기적으로 개선하고, 정규표현식(Regex) 기반의 정교한 파서를 개발하여 비정형 텍스트를 구조화된 RDB 스키마로 변환하는 자동화된 ETL 파이프라인을 구축했습니다.",
            architecture: {
                diagram: `graph TD
    A[Target Site] -->|Partitioning| B(Job Queue)
    B -->|Distribute| C{Worker Pool}
    C -->|Parallel Request| D[Raw HTML]
    D -->|Regex Parsing| E[Structured Data]
    E -->|Validation| F[Cleaned DB]
    F -->|Export| G[Research Dataset]`,
                description: "전체 수집 대상을 청크로 분할하여 다수의 워커 프로세스에 분배하고, 수집된 비정형 HTML을 정규식 파서가 즉시 구조화하여 DB에 적재하는 파이프라인입니다."
            },
            features: [
                "92,799건의 방대한 약제 데이터 완전 수집 및 DB화",
                "Multiprocessing 기반 병렬 처리로 수집 속도 10배 가속 (수일 -> 수시간)",
                "복잡한 텍스트 패턴 정규화(Regex)를 통한 데이터 무결성 확보",
                "연구 데이터 신청 업무 자동화로 행정 소요 시간 단축"
            ],
            impact: "수작업 대비 데이터 구축 시간을 90% 이상 단축하고, 연구소 내 핵심 자산으로 활용되는 고품질 약제 데이터베이스를 확보했습니다.",
            review: "비정형 데이터의 패턴을 분석하여 정규식으로 일반화하는 과정에서 데이터 전처리의 중요성을 깊이 배웠습니다. 또한, 단순히 데이터를 긁어오는 것을 넘어, 병렬 처리를 통해 시스템의 효율성을 극대화하는 엔지니어링적 접근의 가치를 체감한 프로젝트였습니다.",
            deepDives: [
                {
                    title: "Deep Dive 1: Sync to Async (10배 더 빠른 수집)",
                    content: "단일 프로세스로 9만 건 이상의 페이지를 순차 탐색하는 것은 I/O 대기 시간으로 인해 매우 비효율적이었습니다. 이를 해결하기 위해 `multiprocessing.Pool`을 도입하여 CPU 코어 수에 최적화된 병렬 크롤러를 구현했습니다. 전체 URL 리스트를 N개의 청크로 나누어 워커들에게 할당함으로써, 네트워크 대기 시간을 상쇄하고 수집 속도를 10배 이상 향상시켰습니다.",
                    codeSnippet: `python
# Parallel Crawler Snippet
from multiprocessing import Pool

def crawl_worker(url_chunk):
    results = []
    for url in url_chunk:
        html = requests.get(url).text
        data = parse_html(html) # Regex parsing
        results.append(data)
    return results

if __name__ == '__main__':
    chunks = np.array_split(all_urls, cpu_count() * 2)
    with Pool(processes=cpu_count()) as pool:
        data = pool.map(crawl_worker, chunks)`
                },
                {
                    title: "Deep Dive 2: Chaos to Order (Regex ETL)",
                    content: "수집된 데이터는 '성분: 아세트아미노펜 500mg', '성분명(함량): 500밀리그램' 등 표기법이 제각각인 비정형 텍스트였습니다. 이를 통계 분석 가능한 형태로 만들기 위해, 다양한 케이스를 커버하는 정규표현식(Regex) 패턴을 설계했습니다. 특히 숫자, 단위, 성분명을 분리하는 계층적 패턴 매칭을 적용하여 데이터 파싱의 정확도를 99% 이상으로 끌어올렸습니다."
                }
            ]
        }
    },
    {
        id: "health-recsys",
        title: "Personalized Supplement Recommender",
        category: "AI Model",
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
        gallery: [
            "/images/mbti-notion-1.png",
            "/images/mbti-notion-2.png",
            "/images/mbti-notion-3.png"
        ],
        detail: {
            background: "건강기능식품 시장은 빠르게 성장하고 있지만, 소비자들은 자신의 건강 상태에 맞는 제품을 고르는 데 어려움을 겪고 있었습니다. 단순한 설문 기반 추천을 넘어, 실제 건강검진 데이터를 활용한 과학적인 맞춤형 추천 알고리즘이 필요했습니다.",
            problem: "건강검진 데이터(수치형)와 라이프스타일 설문(범주형)이 혼재된 데이터를 효과적으로 군집화해야 했으며, AI의 추천 결과를 사용자가 신뢰할 수 있도록 '설명 가능성(Explainability)'을 확보하는 것이 핵심 과제였습니다.",
            solution: "수치형과 범주형 데이터를 동시에 처리할 수 있는 K-Prototypes 클러스터링을 도입하여 16가지 '건강 MBTI' 페르소나를 정의했습니다. 이후 XGBoost로 신규 유저를 분류하고, SHAP Value를 통해 추천의 근거를 시각적으로 제시하는 XAI(Explainable AI) 시스템을 구축했습니다.",
            architecture: {
                diagram: `graph TD
    A[Health Checkup Data] -->|Preprocessing| B(Mixed Data Vector)
    B -->|K-Prototypes| C{16 Personas}
    D[New User Input] -->|XGBoost| E[Persona Classification]
    E -->|Rule Engine| F[Product Matching]
    E -->|SHAP Analysis| G[Explanation]`,
                description: "복합 데이터를 K-Prototypes로 군집화하여 페르소나를 도출하고, XGBoost와 SHAP를 결합하여 정확도와 설명력을 모두 갖춘 추천 엔진을 구현했습니다."
            },
            features: [
                "49,599명 대규모 데이터 기반 16가지 건강 페르소나 도출",
                "수치형(검진) + 범주형(설문) 하이브리드 클러스터링 엔진",
                "SHAP Value 기반의 '추천 사유' 시각화 (XAI)",
                "Optuna를 활용한 하이퍼파라미터 자동 최적화"
            ],
            impact: "CJ WELLCARE에 기술 이전 완료 및 특허 출원. 개인화 추천 정확도 85% 달성으로 서비스 상용화 기여.",
            review: "데이터 분석이 단순히 모델링에서 끝나는 것이 아니라, '건강 MBTI'라는 마케팅 용어로 치환되어 비즈니스 가치를 창출하는 과정을 경험했습니다. 특히, 블랙박스 모델의 한계를 SHAP로 극복하여 사용자 신뢰를 얻어낸 점이 가장 큰 성과였습니다.",
            deepDives: [
                {
                    title: "Deep Dive 1: Beyond K-Means (Hybrid Clustering)",
                    content: "일반적인 K-Means는 유클리드 거리 기반이라 범주형 데이터(성별, 음주 여부 등) 처리에 한계가 있었습니다. 이를 극복하기 위해 수치형 데이터는 유클리드 거리로, 범주형 데이터는 해밍 거리(Hamming Distance)로 계산하여 가중 합산하는 K-Prototypes 알고리즘을 적용했습니다. 이를 통해 49,599명의 이질적인 데이터를 16개의 뚜렷한 페르소나로 효과적으로 군집화할 수 있었습니다.",
                    codeSnippet: `python
# K-Prototypes Clustering Snippet
from kmodes.kprototypes import KPrototypes

# Categorical columns index
cat_idx = [1, 3, 5, ...] 

kproto = KPrototypes(n_clusters=16, init='Cao', verbose=2)
clusters = kproto.fit_predict(mixed_data, categorical=cat_idx)

# Cost function optimization check
print(kproto.cost_)`
                },
                {
                    title: "Deep Dive 2: Why this recommendation? (XAI)",
                    content: "단순히 '이 제품을 드세요'라고 하는 것보다, '간 수치가 높고 음주가 잦아 밀크씨슬을 추천합니다'라고 설명할 때 구매 전환율이 높습니다. 이를 위해 Tree 기반 모델(XGBoost)에 최적화된 TreeSHAP을 도입했습니다. 각 유저의 페르소나 분류에 가장 큰 영향을 미친 상위 3개 특성(Feature)을 추출하여, 추천 결과와 함께 자연어 문장으로 변환해 제공했습니다."
                }
            ]
        }
    },
    {
        id: "mental-health-api",
        title: "CrowdWorker Mental Health Managing API",
        category: "Backend API",
        highlight: true,
        oneLiner: "크라우드워커의 정신건강을 위한 맞춤형 리포트 생성 및 관리 시스템 백엔드.",
        image: "/images/crowdworker-thumb.jpg",
        tags: ["Django REST Framework", "Docker", "Playwright", "AWS"],
        period: "2023.01 - 2023.06",
        role: "Backend Lead",
        links: {
            github: "https://github.com/hashjamm/MentalCrowdWorkerProject"
        },
        techStack: [
            { category: "Framework", skills: ["Django REST Framework", "Python"] },
            { category: "Infrastructure", skills: ["Docker", "AWS EC2"] },
            { category: "Reporting", skills: ["Playwright", "Pandas"] }
        ],
        gallery: [
            "/images/crowdworker-notion-1.jpg",
            "/images/crowdworker-notion-3.png"
        ],
        detail: {
            background: "크라우드워커들은 반복적이고 고립된 작업 환경으로 인해 높은 수준의 직무 스트레스를 겪고 있었으나, 이를 체계적으로 관리해주는 시스템은 전무했습니다. 단순한 설문 조사를 넘어, 실제 정신건강 상태를 진단하고 개인화된 피드백을 제공하는 플랫폼이 필요했습니다.",
            problem: "수천 명의 워커에게 개별적인 심리 상담을 제공하는 것은 비용적으로 불가능했습니다. 또한, 웹상에서 동적으로 생성되는 진단 결과를 고품질의 PDF 리포트로 변환하여 소장할 수 있게 해달라는 요구사항이 있었으나, 한글 폰트 깨짐 등의 기술적 난관이 있었습니다.",
            solution: "Django REST Framework로 확장 가능한 API 서버를 구축하고, Playwright를 활용한 'Headless Browser' 기반의 PDF 생성 파이프라인을 개발했습니다. 또한, 전체 시스템을 Docker로 컨테이너화하여 배포 편의성과 환경 일관성을 확보했습니다.",
            architecture: {
                diagram: `graph LR
    Client[Web Client] -->|REST API| Nginx[Nginx Proxy]
    Nginx --> Gunicorn[Gunicorn WSGI]
    Gunicorn --> Django[Django API Server]
    Django -->|ORM| DB[(Database)]
    Django -->|Task| Playwright[Playwright PDF Engine]
    Playwright -->|Generate| Report[PDF Report]`,
                description: "Nginx와 Gunicorn을 앞단에 배치하여 안정적인 요청 처리를 보장하고, Django 내부에서 Playwright를 호출하여 HTML 템플릿을 고해상도 PDF로 렌더링하는 구조입니다."
            },
            features: [
                "Django REST Framework 기반의 RESTful API 설계 및 구현",
                "Playwright를 활용한 동적 HTML -> PDF 변환 자동화 (한글 폰트 최적화)",
                "Docker Compose를 이용한 원클릭 배포 환경 구축",
                "Pandas를 활용한 대규모 설문 데이터 전처리 및 분석 로직 구현"
            ],
            impact: "크라우드워커 500명 대상 시범 운영을 성공적으로 마쳤으며, 자동화된 리포트 발송 시스템을 통해 상담 인력 투입 없이도 개인화된 정신건강 관리가 가능함을 입증했습니다.",
            review: "단순한 CRUD API를 넘어, 브라우저 자동화(Playwright)와 같은 외부 도구를 백엔드 파이프라인에 통합하는 경험을 했습니다. 특히 Docker를 통해 복잡한 의존성(브라우저 바이너리, 폰트 등)을 패키징하여 배포 문제를 해결하면서 'Infrastructure as Code'의 중요성을 체감했습니다.",
            deepDives: [
                {
                    title: "Deep Dive 1: Pixel-Perfect PDF Generation (Playwright)",
                    content: "일반적인 PDF 라이브러리(ReportLab 등)는 복잡한 CSS 스타일링과 한글 폰트 처리에 한계가 있었습니다. 이를 해결하기 위해 Headless Browser인 Playwright를 도입했습니다. Django 템플릿으로 렌더링된 HTML을 브라우저에 띄우고, 이를 PDF로 '인쇄'하는 방식을 통해 화면에 보이는 그대로의 고품질 리포트를 생성했습니다. 특히 Docker 환경 내에서 한글 폰트(Noto Sans KR)를 마운트하여 폰트 깨짐 문제를 완벽하게 해결했습니다.",
                    codeSnippet: `python
# PDF Generation Service
from playwright.sync_api import sync_playwright

def generate_pdf(html_content, output_path):
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        page = browser.new_page()
        # Load HTML content
        page.set_content(html_content)
        # Wait for fonts/images to load
        page.wait_for_load_state('networkidle')
        # Print to PDF
        page.pdf(path=output_path, format='A4', print_background=True)
        browser.close()`
                },
                {
                    title: "Deep Dive 2: Write Once, Run Anywhere (Docker)",
                    content: "Playwright와 같은 브라우저 의존성이 있는 애플리케이션은 배포 환경(OS, 라이브러리 버전)에 매우 민감합니다. 이를 해결하기 위해 Dockerfile에 브라우저 실행에 필요한 모든 시스템 의존성과 폰트 설치 과정을 정의했습니다. 이를 통해 로컬 개발 환경과 AWS 운영 환경 간의 차이를 없애고, '원클릭 배포'가 가능한 CI/CD의 기초를 마련했습니다."
                }
            ]
        }
    },
    // --- Archive Projects (Highlight: false) ---
    {
        id: "infectious-system",
        title: "National Infectious Disease Response System",
        category: "System Design",
        highlight: false,
        oneLiner: "통합 환경 지표 개발 및 '코로나 신호등' 서비스 기획.",
        image: "/images/traffic-light-thumb.jpg",
        tags: ["Service Planning", "R", "SAS", "Time-Series"],
        period: "2022.11 - 2023.01",
        role: "Data Analyst & Planner",
        links: {
            github: "https://github.com/hashjamm/NIPA_infection"
        },
        techStack: [
            { category: "Analysis", skills: ["R (data.table)", "SAS (Conditional Logistic)"] },
            { category: "Methodology", skills: ["Case-Crossover Design", "Time-Series Analysis"] }
        ],
        gallery: [
            "/images/traffic-notion-1.png",
            "/images/traffic-notion-2.png"
        ],
        detail: {
            background: "코로나19 팬데믹 상황에서 단순한 확진자 수 예측을 넘어, 기상 및 대기 환경 요인이 감염 확산에 미치는 영향을 규명하고 이를 대국민 서비스로 연결하고자 하는 국책 과제였습니다.",
            problem: "기존 감염병 예측 모델은 환경 변수(기온, 습도, 미세먼지 등)의 복합적인 상호작용을 반영하지 못했습니다. 또한, 개인의 고유한 특성(나이, 성별, 기저질환 등)이 교란 변수로 작용하여 순수한 환경 요인의 영향을 분리해내기 어려웠습니다.",
            solution: "개인 자체를 대조군으로 설정하는 'Time-Stratified Case-Crossover Design'을 적용하여 개인적 교란 요인을 원천적으로 통제했습니다. 이를 바탕으로 환경 위험도를 종합한 '통합 대기 환경 지수'를 개발하고, 이를 직관적인 '코로나 신호등' 서비스로 기획했습니다.",
            architecture: {
                diagram: `graph TD
    A[Patient Case Day] -->|Match| B(Control Days)
    B -->|Same Month/Year| C{Time Stratified}
    C -->|Compare| D[Meteorological Data]
    D -->|Conditional Logistic| E[Odds Ratio Calculation]
    E -->|Risk Scoring| F[Corona Traffic Light]`,
                description: "환자의 감염일(Case)과 같은 달/요일의 다른 날(Control)을 매칭하여 외부 변수를 통제하고, 조건부 로지스틱 회귀분석을 통해 산출된 위험도(Odds Ratio)를 기반으로 신호등 서비스를 구현하는 로직입니다."
            },
            features: [
                "Time-Stratified Case-Crossover Design을 통한 인과성 규명",
                "SAS `proc logistic` 기반의 조건부 로지스틱 회귀분석 모델링",
                "R을 활용한 대규모 기상/환경 데이터 전처리 및 통합 지표 산출",
                "대국민 알림 서비스 '코로나 신호등' 기획 및 프로토타입 설계"
            ],
            impact: "환경 요인과 감염병 간의 통계적 유의성을 입증하여 국책 과제를 성공적으로 수행했으며, 데이터 기반의 방역 정책 수립에 기여했습니다.",
            review: "복잡한 통계적 방법론을 실제 서비스 기획으로 연결하는 과정을 통해 'Data-to-Action'의 가치를 실현했습니다. 특히, R과 SAS의 장점을 결합하여 분석 파이프라인을 최적화한 경험은 이후 대규모 데이터 처리 역량의 밑거름이 되었습니다.",
            deepDives: [
                {
                    title: "Deep Dive 1: Perfect Control (Case-Crossover Design)",
                    content: "일반적인 회귀분석으로는 개인의 생활 습관이나 유전적 요인 같은 '관찰되지 않는 교란 변수'를 통제하기 어렵습니다. 이를 해결하기 위해 환자 본인의 과거 시점(감염되지 않은 날)을 대조군으로 삼는 Case-Crossover 설계를 적용했습니다. R을 사용하여 각 환자별로 감염일과 동일한 요일, 동일한 달의 날짜들을 매칭(Matching)하는 알고리즘을 구현함으로써, 개인 고유의 특성을 완벽하게 통제하고 순수한 환경 요인의 영향력만을 추출해냈습니다.",
                    codeSnippet: `r
# Time-Stratified Control Selection (R Snippet)
case_data <- data_influ %>% filter(influ == 1)
control_data <- data_influ %>% 
  filter(influ == 0 & 
         id == case_id & 
         month(date) == month(case_date) & 
         wday(date) == wday(case_date))
# 1:M Matching for Conditional Logistic Regression`
                },
                {
                    title: "Deep Dive 2: Statistical Rigor (Conditional Logistic)",
                    content: "매칭된 데이터셋(Case-Control Set)의 특성을 반영하기 위해 일반적인 로지스틱 회귀가 아닌 '조건부 로지스틱 회귀(Conditional Logistic Regression)'를 사용했습니다. SAS의 `proc logistic`에 `strata` 옵션을 사용하여 각 매칭 그룹(Strata) 내에서의 확률 차이를 분석했습니다. 이를 통해 기온이 1도 오를 때, 혹은 미세먼지가 10µg/m³ 증가할 때의 감염 위험도(Odds Ratio)를 신뢰 수준 95% 구간에서 정량적으로 산출했습니다.",
                    codeSnippet: `sas
/* Conditional Logistic Regression Snippet */
proc logistic data=matched_set;
    strata id; /* Stratified by individual */
    class lag0_7_temperature_g (ref="0") / param=reference;
    model influ(event="1") = lag0_7_temperature_g;
    run;`
                }
            ]
        }
    },
    {
        id: "cgm-efficacy",
        title: "CGM Efficacy Analysis",
        category: "IoT Data",
        highlight: false,
        oneLiner: "CGM 단독 사용과 의료진 원격 개입이 혈당 관리에 미치는 영향을 분석하는 전향/후향 융합 연구.",
        image: "/images/cgm-thumb.jpg",
        tags: ["IoT Data", "Python", "R", "PSM", "ANOVA"],
        links: {
            github: "https://github.com/hashjamm/CGM-FRIEND-LibreView",
            paper: "https://pubmed.ncbi.nlm.nih.gov/36506077/"
        },
        stats: [
            { label: "Outcome", value: "SCI Paper" },
            { label: "Method", value: "RCT + Retro" }
        ],
        techStack: [
            { category: "Analysis", skills: ["Python (Pandas)", "R (ggplot2)"] },
            { category: "Statistics", skills: ["ANOVA", "PSM (Propensity Score Matching)"] }
        ],
        gallery: [
            "/images/cgm-notion-1.png",
            "/images/cgm-notion-2.png"
        ],
        detail: {
            background: "제1형 당뇨병 환자에게 연속혈당측정기(CGM)는 필수적인 도구이지만, 단순히 기기를 착용하는 것만으로 혈당이 개선되는지, 혹은 의료진의 적극적인 개입이 동반되어야 하는지에 대한 임상적 근거가 부족했습니다. 이에 대한 명확한 해답을 찾기 위해 전향적 연구와 후향적 연구를 병행했습니다.",
            problem: "일상생활 속에서 수집되는 CGM 데이터는 결측치와 이상치가 많아 분석에 바로 활용하기 어려웠습니다. 또한, 환자의 기저 특성(나이, 유병 기간 등)이 그룹 간에 상이하여, 단순 비교 시 순수한 중재 효과를 파악하기 어려운 통계적 난관이 있었습니다.",
            solution: "전향 연구(RCT)를 통해 무작위 배정된 그룹 간의 효과를 비교하고, 후향 연구에서는 병원 EMR 데이터와 클라우드 CGM 데이터를 결합한 후 PSM(성향점수매칭)을 적용하여 교란 변수를 엄격하게 통제했습니다. 이를 통해 CGM 단독 사용과 원격 중재의 효과를 각각 정량적으로 산출했습니다.",
            architecture: {
                diagram: `graph TD
    subgraph Prospective["Prospective RCT"]
    direction TB
    A[Patient Recruitment] -->|Randomization| B{Group Assignment}
    B -->|Intervention| C[CGM + Remote Care]
    B -->|Control| D[CGM Alone]
    C & D -->|Compare| E[HbA1c & TIR Analysis]
    end

    %% Invisible link for vertical stacking
    E ~~~ F

    subgraph Retrospective["Retrospective Study"]
    direction TB
    F[Hospital EMR] & G[LibreView Cloud] -->|Merge| H[Integrated Dataset]
    H -->|PSM| I[Matched Cohort]
    I -->|Analysis| J[Clinical Outcomes]
    end`,
                description: "무작위 대조군 연구(RCT)와 리얼월드 데이터(RWD) 기반의 후향적 연구를 상호 보완적으로 수행하여, 임상적 근거의 수준(Level of Evidence)을 극대화한 하이브리드 연구 설계입니다."
            },
            features: [
                "전향적 무작위 대조군 연구(RCT) 및 후향적 코호트 연구 병행 수행",
                "병원 EMR 데이터와 LibreView 클라우드 로그 데이터 통합 파이프라인 구축",
                "PSM(Propensity Score Matching)을 활용한 환자 특성 밸런싱 및 교란 통제",
                "ANOVA 및 시계열 분석을 통한 혈당 변동성(TIR, CV) 개선 효과 검증"
            ],
            impact: "SCI급 논문 게재를 통해 디지털 헬스케어의 임상적 효용성을 입증했으며, 데이터 기반의 당뇨병 관리 가이드라인 수립에 기여했습니다.",
            review: "실사용 데이터(RWD)의 거친 특성을 다루며 견고한 전처리 역량을 길렀습니다. 특히, 통계적 방법론(PSM)이 단순한 숫자 놀음이 아니라, 데이터의 편향을 제거하고 진실에 다가가기 위한 강력한 도구임을 깨달은 프로젝트였습니다.",
            deepDives: [
                {
                    title: "Deep Dive 1: Cleaning Real-World Data",
                    content: "CGM 센서는 15분마다 혈당을 기록하지만, 센서 오류나 탈착으로 인한 결측 구간이 빈번했습니다. 이를 해결하기 위해 선형 보간법(Linear Interpolation)과 이동 평균(Moving Average)을 결합한 전처리 로직을 구현했습니다. 또한, 식사나 운동 이벤트와 같은 외부 요인을 타임스탬프 기준으로 정렬(Alignment)하여, 혈당 변동의 원인을 다각도로 분석할 수 있는 기반을 마련했습니다."
                },
                {
                    title: "Deep Dive 2: Statistical Fairness (PSM)",
                    content: "후향적 연구에서는 CGM 사용군과 비사용군 간의 환자 특성(나이, 당화혈색소 등) 차이가 뚜렷했습니다. 이를 보정하지 않으면 결과가 왜곡될 수 있었기에, Python `pymatch`와 R `MatchIt` 패키지를 활용하여 성향 점수 매칭(PSM)을 수행했습니다. 매칭 후 Standardized Mean Difference(SMD)가 0.1 미만으로 감소함을 확인하여, 두 그룹이 통계적으로 동등한 조건에서 비교되었음을 입증했습니다."
                }
            ]
        }
    },
    {
        id: "adhd-cohort",
        title: "ADHD Cohort Study & Tech Mentoring",
        category: "Research & Eng",
        highlight: false,
        oneLiner: "대용량 코호트 파이프라인 최적화 및 연구팀 기술 멘토링 주도.",
        image: "/images/neonates-adhd-thumb.jpg",
        tags: ["SAS", "SQL", "Team Leading", "Optimization"],
        stats: [
            { label: "Cohort", value: "3M+ Rows" },
            { label: "Perf", value: "20x Faster" }
        ],
        techStack: [
            { category: "Data Engineering", skills: ["SAS Macro", "SQL Optimization"] },
            { category: "Analysis", skills: ["Cox Proportional Hazard", "Survival Analysis"] }
        ],
        gallery: [
            "/images/adhd-notion-1.png",
            "/images/adhd-notion-2.png",
            "/images/adhd-notion-3.png"
        ],
        detail: {
            background: "영유아기(5세 미만)의 전신 마취 노출이 향후 ADHD 발병에 영향을 미치는지에 대한 논란은 의학계의 오랜 난제였습니다. 국민건강보험공단(NHIS)의 10년 치 추적 데이터를 분석해야 하는 이 과제는 단순한 통계 분석을 넘어, 대용량 의료 데이터를 효율적으로 처리하는 엔지니어링 역량이 필수적이었습니다.",
            problem: "수백만 건의 청구 명세서 테이블을 그대로 조인(JOIN)하려다 보니 서버 메모리 초과 문제가 빈번했고, 팀원들이 작성한 비효율적인 SQL 쿼리('Spaghetti Code')로 인해 분석 소요 시간이 기하급수적으로 늘어났습니다. 또한, 통계 배경이 부족한 연구원들과의 협업에서 기술적 병목이 발생했습니다.",
            solution: "SQL 쿼리 최적화(인덱싱, 서브쿼리 제거)와 파티셔닝 전략을 도입하여 데이터 추출 속도를 20배 이상 향상시켰습니다. 또한, 반복되는 전처리 로직을 SAS Macro로 모듈화하여 팀원들이 손쉽게 사용할 수 있도록 배포하고, 정기적인 코드 리뷰와 멘토링 세션을 통해 연구팀 전체의 엔지니어링 수준을 상향 평준화했습니다.",
            architecture: {
                diagram: `graph TD
    subgraph Data Pipeline
    A[NHIS Raw DB] -->|Optimized SQL| B(Cohort Selection)
    B -->|Preprocessing| C[Variable Definition]
    C -->|SAS Macro| D{Propensity Score Matching}
    D -->|Cox Analysis| E[Hazard Ratio Calculation]
    end
    subgraph Mentoring System
    F[Junior Researcher] -->|Inefficient Code| G(Code Review Session)
    G -->|Feedback & Refactoring| H[Standardized Module]
    H -->|Re-use| C
    end`,
                description: "비효율적인 데이터 처리 과정을 최적화된 SQL과 SAS Macro로 표준화하고, 코드 리뷰 시스템을 통해 검증된 로직만이 마스터 데이터셋에 반영되도록 설계했습니다."
            },
            features: [
                "300만 건 이상의 국민건강보험공단 표본 코호트(NHIS-NSC) 분석",
                "Nested Query 최적화 및 인덱싱을 통한 쿼리 성능 2,000% 개선",
                "반복되는 전처리/분석 로직의 SAS Macro 라이브러리화",
                "비전공 연구원 대상 SQL/SAS 교육 및 코드 리뷰 문화 정착"
            ],
            impact: "쿼리 실행 시간을 수 시간에서 수 분 단위로 단축하여 연구 주기를 획기적으로 앞당겼으며, 해당 연구 결과는 소아마취학회 포스터 발표로 선정되었습니다.",
            review: "개인의 기술적 성취보다 '팀의 생산성'을 높이는 것이 더 큰 임팩트를 만든다는 것을 배웠습니다. '나만 잘하는 개발자'가 아니라, '동료를 성장시키는 엔지니어'로서의 정체성을 확립하게 된 계기였습니다.",
            deepDives: [
                {
                    title: "Deep Dive 1: 24시간 걸리던 쿼리를 5분으로 (Query Tuning)",
                    content: "팀원들이 작성한 쿼리는 불필요한 `DISTINCT`, `OUTER JOIN`, 그리고 인덱스를 타지 않는 `WHERE` 절 조건들로 가득 차 있었습니다. 실행 계획(Execution Plan)을 분석하여 Full Table Scan이 발생하는 지점을 찾아내고, 필요한 컬럼만 추출하는 서브쿼리 방식과 해시 조인(Hash Join)을 유도하는 힌트를 적용했습니다. 그 결과, 하루 종일 돌아가던 코호트 추출 작업이 단 5분 만에 완료되는 성과를 거두었습니다."
                },
                {
                    title: "Deep Dive 2: 연구실의 CTO가 되어 (Technical Mentoring)",
                    content: "의학/보건학 배경의 연구원들은 통계적 지식은 뛰어나지만 데이터 처리 효율성에 대한 고민은 부족했습니다. 저는 '연구실의 CTO'라는 마인드셋으로, 공통적으로 사용되는 질병 정의 코드나 약물 분류 로직을 함수화(Macro)하여 배포했습니다. 또한, 깃(Git)과 유사한 버전 관리 규칙을 도입하여, 누가 어떤 로직으로 데이터를 추출했는지 추적 가능하게 만듦으로써 연구의 재현성(Reproducibility)을 확보했습니다."
                }
            ]
        }
    },
    {
        id: "hunomind-proto",
        title: "HUNOMIND: Full-Stack Prototype",
        category: "App Dev",
        highlight: false,
        type: 'engineering',
        oneLiner: "기획부터 앱 구현, 서버 배포까지 1인 개발로 완성한 정신건강 케어 플랫폼.",
        image: "/images/hunomind-thumb.jpg",
        tags: ["Kotlin", "Django", "AWS", "Full-Stack"],
        stats: [
            { label: "Role", value: "Solo Dev" },
            { label: "Platform", value: "App + Web" }
        ],
        links: {
            github: "https://github.com/hashjamm/HanDtx_DjangoServer"
        },
        techStack: [
            { category: "Frontend", skills: ["Android (Kotlin)", "Retrofit2"] },
            { category: "Backend", skills: ["Django REST API", "MySQL"] },
            { category: "DevOps", skills: ["AWS EC2", "Nginx", "Gunicorn"] }
        ],
        gallery: [
            "/images/hunomind-notion-1.png",
            "/images/hunomind-notion-2.png"
        ],
        detail: {
            background: "정신건강 문제의 증가로 비대면 관리 서비스에 대한 수요가 급증했으나, 기존 서비스들은 단순한 설문(Web)이나 일기장(App)에 그쳐 의료진과의 유기적인 연결이 부족했습니다. 환자는 모보일 앱으로 매일 상태를 기록하고, 의료진은 웹 대시보드로 이를 모니터링하여 적시에 개입할 수 있는 통합 플랫폼이 필요했습니다.",
            problem: "프론트엔드(Android)와 백엔드(Django)를 모두 혼자 구축해야 했기에, 데이터 통신 규약(Protocol) 설계부터 서버 인프라 구축까지의 기술적 범위(Scope)가 매우 넓었습니다. 특히, 민감한 개인 의료 데이터를 다루는 만큼 보안성(JWT 인증)과 데이터 무결성을 보장하는 것이 핵심 과제였습니다.",
            solution: "MVVM 패턴을 적용한 Kotlin 앱과 RESTful 원칙을 준수한 Django 서버를 구축하여 유지보수성을 확보했습니다. AWS EC2에 Nginx와 Gunicorn을 연동하여 상용 수준의 배포 환경을 구성하고, JWT 기반의 인증 시스템을 도입하여 보안성을 강화했습니다.",
            architecture: {
                diagram: `graph LR
    subgraph ClientSide["Client Side"]
    A["Patient App (Kotlin)"] -->|Retrofit2| B["API Gateway"]
    end
    subgraph ServerSide["Server Side"]
    B -->|Nginx| C["Gunicorn WSGI"]
    C -->|Django| D["API Views"]
    D -->|ORM| E[("MySQL DB")]
    D -->|Auth| F["JWT System"]
    end`,
                description: "클라이언트(Android)는 Retrofit2를 통해 서버와 통신하며, 서버(AWS EC2)는 Nginx-Gunicorn-Django 구조로 요청을 안정적으로 처리합니다. 모든 통신은 JWT 토큰으로 보호됩니다."
            },
            features: [
                "Kotlin & MVVM 아키텍처 기반의 안드로이드 헬스케어 앱 개발",
                "Django REST Framework를 활용한 확장 가능한 백엔드 API 구축",
                "AWS EC2, RDS, S3를 활용한 클라우드 인프라 풀스택 구성",
                "JWT(Access/Refresh Token) 기반의 보안 로그인 구현"
            ],
            impact: "기획서 한 장으로 시작하여 실제 작동하는 앱과 관리자 웹, 서버 인프라까지 100% 자체 기술로 구현했습니다. 해당 프로토타입은 학회 부스 시연을 통해 서비스를 구체화하는 데 기여했습니다.",
            review: "진정한 풀스택 개발이란 단순히 언어를 많이 아는 것이 아니라, '하나의 서비스를 온전히 책임지는 경험'임을 깨달았습니다. 네트워크 지연 처리, DB 트랜잭션 등 파편화되어 있던 지식들이 하나의 파이프라인으로 연결되는 유의미한 경험이었습니다.",
            deepDives: [
                {
                    title: "Deep Dive 1: Secure & Seamless (JWT Auth)",
                    content: "사용자가 매번 로그인하는 불편함을 없애면서도 보안을 유지하기 위해 JWT(JSON Web Token) 방식을 도입했습니다. Access Token이 만료되면 앱 내부의 Interceptor가 자동으로 Refresh Token을 서버로 보내 재발급받는 로직을 구현하여, 사용자가 끊김 없이 서비스를 이용할 수 있도록 UX를 최적화했습니다."
                },
                {
                    title: "Deep Dive 2: From Local to Cloud (AWS Deployment)",
                    content: "로컬호스트(127.0.0.1)를 넘어 실제 인터넷 상에서 서비스가 동작하도록 만들기 위해 AWS 인프라를 구축했습니다. EC2 인스턴스에 Linux 환경을 세팅하고, Nginx를 리버스 프록시로 설정하여 정적 파일(Static Files) 처리 효율을 높였습니다. 또한 Gunicorn을 통해 Django를 멀티 프로세스로 구동시킴으로써 동시 접속 상황에서의 안정성을 확보했습니다."
                }
            ]
        }
    },
    {
        id: "neonatal-allergy",
        title: "Neonatal Allergy & Air Pollution",
        category: "Analytics",
        highlight: false,
        oneLiner: "공공 데이터 융합 및 비선형 모델링(RCS)을 통한 대기오염 위험도 규명.",
        image: "/images/nj-allergy-thumb.jpg",
        tags: ["R", "Advanced Stat", "RCS", "GIS"],
        stats: [
            { label: "Subject", value: "Newborns" },
            { label: "Data", value: "Birth Cohort" }
        ],
        techStack: [
            { category: "Statistics", skills: ["RCS (Non-linear)", "Survival Analysis"] },
            { category: "Data", skills: ["GIS Mapping", "KNHIS Cohort"] }
        ],
        gallery: [
            "/images/nj-notion-1.png",
            "/images/nj-notion-2.png"
        ],
        detail: {
            problem: "기존 연구들은 대기오염 농도와 질병 간의 관계를 단순 선형(Linear)으로 가정하는 경우가 많았습니다. 그러나 실제 생체 반응은 특정 임계치 이상에서 급격히 나빠지거나 완만해지는 비선형적(Non-linear) 패턴을 보일 가능성이 높으며, 이를 간과할 경우 위험도를 과소/과대 평가할 우려가 있었습니다.",
            solution: "출생 후 초기(생후 1개월)의 주차별(Weekly) 미세먼지 노출량을 산출하고, Restricted Cubic Spline(RCS) 모델을 적용하여 대기오염 농도에 따른 알레르기 질환(아토피, 비염, 천식) 발병 위험의 비선형적 곡선을 그려냈습니다. 이를 통해 '안전 구간'과 '위험 급증 구간'을 정밀하게 식별했습니다.",
            architecture: {
                diagram: `graph TD
    A["Birth Cohort (KNHIS)"] -->|Merge| B("Air Pollution Data")
    B -->|GIS Mapping| C{"Exposure Calculation"}
    C -->|Survival Analysis| D["Cox Proportional Hazard"]
    D -->|Non-linearity| E["RCS Visualization"]`,
                description: "거주지 기반의 대기오염 데이터를 신생아 코호트와 결합하고, RCS 기법을 통해 농도 변화에 따른 위험도(Hazard Ratio)의 비선형적 패턴을 시각화하는 분석 흐름입니다."
            },
            features: [
                "국민건강보험공단 영유아 검진 코호트와 대기오염 측정망 데이터 융합",
                "출생 후 4주간의 주차별(Weekly) 미세먼지 노출 영향력 분석",
                "Restricted Cubic Spline(RCS)을 활용한 비선형적 용량-반응 관계 규명",
                "성별, 소득 수준, 거주 지역 등 사회경제적 교란 요인 보정"
            ],
            impact: "단순히 '나쁘다'를 넘어 '어느 수준부터 얼마나 위험한지'를 시각적으로 제시하여, 학회 포스터 발표 및 환경 보건 분야 논문 작성의 근거 자료로 활용되었습니다.",
            review: "데이터 분석이 단순히 P-value를 찾는 숨바꼭질이 아니라, 현상의 본질적인 패턴(비선형성)을 설명하는 스토리텔링임을 깨달았습니다. GIS 데이터와 임상 데이터를 결합하는 과정에서 이종 데이터 융합의 노하우를 쌓을 수 있었습니다.",
            deepDives: [
                {
                    title: "Deep Dive 1: Hidden curve of danger (RCS)",
                    content: "대기오염이 1만큼 증가할 때 위험도가 항상 k만큼 증가하지 않습니다. 저농도 구간에서는 영향이 미미하다가 특정 농도를 넘어서면 위험이 급증하는 'J-shape' 또는 'S-shape' 패턴을 파악하기 위해 RCS(Restricted Cubic Spline)를 도입했습니다. R의 `rms` 패키지를 활용하여 3~5개의 매듭(Knot)을 설정하고, 각 구간별 3차 함수를 부드럽게 연결함으로써 데이터가 가진 실제 위험 패턴을 있는 그대로 드러냈습니다."
                },
                {
                    title: "Deep Dive 2: Mapping the invisible (GIS)",
                    content: "신생아의 거주지 주소와 가장 가까운 대기오염 측정소의 데이터를 매칭하는 것이 관건이었습니다. 단순 행정구역 매칭의 오차를 줄이기 위해, GIS 좌표 기반의 최단 거리 매칭 알고리즘을 적용했습니다. 이를 통해 전국 250여 개 측정소의 데이터를 개별 환자의 '개인화된 노출량'으로 정밀하게 변환하여 분석의 신뢰도를 높였습니다."
                }
            ]
        }
    },
    {
        id: "covid-longitudinal",
        title: "Longitudinal COVID-19 Analysis",
        category: "Analytics",
        highlight: false,
        oneLiner: "코로나 유행 전후의 신체/행동 변화량(Delta)이 감염 중증도에 미치는 영향 분석.",
        image: "/images/covid-delta-thumb.jpg",
        tags: ["Python", "Pandas", "Mixed Effect Model"],
        stats: [
            { label: "Data", value: "UK Biobank" },
            { label: "Impact", value: "SCI Published" }
        ],
        techStack: [
            { category: "Analysis", skills: ["Mixed Effect Model", "Logistic Regression"] },
            { category: "Data Processing", skills: ["Pandas (Python)", "Large-scale Cohort"] }
        ],
        gallery: [
            "/images/covid19-notion-1.png",
            "/images/covid19-notion-2.png",
            "/images/covid19-notion-3.png"
        ],
        detail: {
            problem: "대부분의 코로나19 연구는 감염 시점의 건강 상태(Static Point)와 중증도와의 연관성만을 분석했습니다. 하지만 실제로는 팬데믹 기간 동안 사람들의 활동량, 음주 습관, 체질량지수(BMI) 등이 변했으며, 이러한 '변화(Delta)'가 감염 위험에 미치는 역학적 영향은 규명되지 않았습니다.",
            solution: "영국 바이오뱅크(UK Biobank)와 한국 NHIS 데이터를 활용하여, 팬데믹 이전과 이후의 건강 검진 데이터를 연계했습니다. 개인별 생활 습관 및 신체 지표의 변화량을 정량화한 'Delta 변수'를 파생하였고, 이를 다변량 로지스틱 회귀분석 및 혼합 효과 모델(Mixed Effect Model)에 투입하여 변화 자체가 미치는 독립적인 영향력을 입증했습니다.",
            architecture: {
                diagram: `graph TD
    A["Baseline Data (Pre-Pandemic)"] -->|Linkage| B["Follow-up Data (Pandemic-Era)"]
    B -->|Calculate| C["Delta Variable (Change Amount)"]
    C -->|Feature Engineering| D["Confounder Adjustment"]
    D -->|Modeling| E["Logistic Regression / Mixed Model"]
    E -->|Validation| F["Risk Factor Identification"]`,
                description: "두 시점의 코호트 데이터를 연계(Linkage)하여 변화량(Delta)을 산출하고, 이를 핵심 변수로 사용하여 중증도 예측 모델을 구축하는 종단적 분석 파이프라인입니다."
            },
            features: [
                "UK Biobank 및 NHIS 대규모 코호트 데이터 전처리 및 연계",
                "건강 행동 변화(음주, 흡연, 신체활동)의 'Delta 값' 파생 변수 생성",
                "코로나19 감염 및 중증 악화에 미치는 변화량의 기여도 분석",
                "Time-varying covariate를 고려한 정교한 통계적 검정 수행"
            ],
            impact: "단순히 '건강한 사람이 덜 아프다'를 넘어, '습관을 개선한 사람이 변화하지 않은 사람보다 얼마나 더 안전한가'를 수치로 증명했습니다. 해당 연구 결과는 다수의 SCI급 저널에 게재되어 공중보건학적 중재 전략의 근거가 되었습니다.",
            review: "정적인 데이터(Static Data)의 한계를 넘어 시간의 흐름을 반영한 종단 연구(Longitudinal Study)의 매력을 느꼈습니다. 특히 '변화량'이라는 새로운 차원의 변수를 설계하는 과정에서 데이터 사이언티스트의 창의성이 중요함을 깨달았습니다.",
            deepDives: [
                {
                    title: "Deep Dive 1: The Power of Delta (Variable Design)",
                    content: "단면 연구(Cross-sectional)의 한계를 극복하기 위해 $Delta = Value_{follow-up} - Value_{baseline}$ 공식을 적용한 파생 변수를 설계했습니다. 예를 들어, 단순히 '음주자'로 분류하는 것이 아니라 '음주를 하다가 끊은 그룹', '새로 시작한 그룹', '유지한 그룹'으로 세분화하여 각 그룹별 코로나 감염 Odds Ratio를 산출함으로써 더욱 입체적인 결과를 도출했습니다."
                },
                {
                    title: "Deep Dive 2: Handling Missingness (Data Imputation)",
                    content: "종단 연구의 고질적인 문제인 '추적 소실(Loss to follow-up)'과 결측치 문제를 해결하기 위해 MICE(Multiple Imputation by Chained Equations) 기법을 일부 도입하여 데이터의 완전성을 보완했습니다. 또한, 민감도 분석(Sensitivity Analysis)을 통해 결측 대체 방식에 따른 결과의 견고성(Robustness)을 검증했습니다."
                }
            ]
        }
    },
    {
        id: "covid-pollution",
        title: "Short-term Pollution & COVID-19",
        category: "Causal Inference",
        highlight: false,
        type: 'research',
        oneLiner: "Case-Crossover 설계로 미세먼지-코로나 인과성 규명.",
        image: "/images/covid-short-thumb.jpg",
        tags: ["Causal Inference", "SAS"],
        gallery: [
            "/images/covid19-ap-notion-1.png",
            "/images/covid19-ap-notion-2.png"
        ],
        detail: {
            problem: "감염병 발생과 대기오염 사이의 관계를 분석할 때, 계절성(Seasonality)이나 장기적인 추세(Trend), 그리고 개인의 흡연력이나 유전적 요인 등 수많은 교란 변수(Confounder)를 통제하는 것이 가장 큰 난관이었습니다. 일반적인 시계열 분석으로는 '오비이락' 같은 거짓 상관관계를 걸러내기 어려웠습니다.",
            solution: "개인 그 자신을 대조군으로 삼는 'Time-Stratified Case-Crossover Design'을 적용하여, 개인 고유의 특성(불변 교란 요인)을 원천적으로 제거했습니다. 환자가 확진된 날(Case Day)과 같은 달, 같은 요일의 다른 날(Control Days)의 대기오염 농도를 비교함으로써, 오직 '그 날의 공기질' 차이가 감염에 미친 영향만을 순수하게 분리해냈습니다.",
            architecture: {
                diagram: `graph TD
    A["Patient Case Day (Infection)"] -->|Match| B["Control Days (Same Month/Day)"]
    B -->|Compare| C{"Meteorological Data"}
    C -->|Construct| D["Conditional Logistic Regression"]
    D -->|Analyze| E["Odds Ratio (Lag 0-7 days)"]`,
                description: "확진일(Case)과 대조일(Control)들을 1:M으로 매칭하는 Case-Crossover 데이터셋을 구축하고, 조건부 로지스틱 회귀분석(Conditional Logistic Regression)을 통해 기상 요인을 통제한 상태에서의 오즈비(OR)를 산출합니다."
            },
            features: [
                "역학 연구의 표준인 Time-Stratified Case-Crossover Design 적용",
                "SAS `proc logistic`의 `strata` 구문을 활용한 조건부 로지스틱 회귀분석",
                "미세먼지(PM2.5, PM10) 노출 후 0~7일 간의 지연 효과(Lag Effect) 추정",
                "기온, 습도, 일조량 등 기상 변수의 비선형적 효과 보정"
            ],
            impact: "단순한 상관관계를 넘어 통계적으로 엄밀한 인과 추론을 시도했으며, 미세먼지 고농도 시기의 사회적 거리두기 정책 강화에 대한 과학적 근거를 제공했습니다. 해당 방법론은 이후 감염병 역학 연구의 중요한 레퍼런스가 되었습니다.",
            review: "데이터 분석에서 가장 중요한 것은 '화려한 알고리즘'이 아니라 '견고한 설계(Design)'임을 뼈저리게 느꼈습니다. 올바른 연구 설계가 선행되지 않으면 아무리 좋은 모델을 돌려도 쓰레기 값(GIGO)만 나온다는 원칙을 체화한 프로젝트였습니다.",
            deepDives: [
                {
                    title: "Deep Dive 1: My own control (Study Design)",
                    content: "Case-Crossover 설계의 핵심은 '나와의 비교'입니다. A라는 사람이 확진된 날 공기가 나빴고, 확진되지 않은 다른 날 공기가 좋았다면, A씨의 나이, 성별, 직업이 무엇이든 상관없이 '나쁜 공기가 확진에 기여했다'고 추론할 수 있습니다. 이를 통해 관찰되지 않은(Unobserved) 수많은 개인적 교란 요인을 완벽하게 통제했습니다."
                },
                {
                    title: "Deep Dive 2: Lag Effect (Delayed Impact)",
                    content: "대기오염에 노출되자마자 바로 감염되는 것이 아닙니다. 바이러스가 체내에 침투하고 증상이 나타나기까지의 잠복기를 고려하여, 노출 후 0일부터 7일까지의 지연 효과(Lag Effect)를 분석했습니다. 그 결과, 미세먼지 노출 후 약 3~5일 뒤에 감염 위험이 가장 높게 나타나는 패턴을 발견하고 이를 생물학적 기전과 연결하여 해석했습니다."
                }
            ]
        }
    },
    {
        id: "thyroid-bidirectional",
        title: "Bidirectional Cancer Risk Study",
        category: "Analytics",
        highlight: false,
        oneLiner: "갑상선암과 유방암의 상호 발병 위험도에 관한 양방향 코호트 분석.",
        image: "/images/bidirection-cancer-thumb.jpg",
        tags: ["PSM", "SAS", "Cohort Design"],
        stats: [
            { label: "Subjects", value: "300,000+" },
            { label: "Method", value: "PSM Matching" }
        ],
        techStack: [
            { category: "Statistics", skills: ["Propensity Score Matching", "Cox Regression"] },
            { category: "Data", skills: ["Large-scale Cohort", "SAS Macro"] }
        ],
        gallery: [
            "/images/bidirection-cancer-notion-1.png",
            "/images/bidirection-cancer-notion-2.png",
            "/images/bidirection-cancer-notion-3.png"
        ],
        detail: {
            problem: "갑상선암 환자에서 유방암 발병률이 높다는 보고가 있었으나, 이것이 생물학적 연관성 때문인지 아니면 병원을 자주 방문하여 검진을 많이 받았기 때문(Screening Effect)인지 불분명했습니다. 또한, 선행 연구들은 대조군 설정이 자의적이거나 표본 수가 적어 일반화하기 어렵다는 한계가 있었습니다.",
            solution: "국민건강보험공단 표본 코호트를 활용하여 '갑상선암 환자군'과 '일반 대조군'을 1:1로 성향 점수 매칭(PSM)하여 1차 분석을 수행하고, 반대로 '유방암 환자군'을 기준으로도 동일한 분석을 수행하는 '양방향(Bidirectional) 설계'를 적용했습니다. 이를 통해 검진 편향을 최소화하고 생물학적 공통 위험 인자의 존재 가능성을 탐구했습니다.",
            architecture: {
                diagram: `graph TD
    subgraph Study 1
    A["Thyroid Cancer Group"] <-->|PSM Matching| B["Non-Cancer Control"]
    A -->|Follow-up| C["Risk of Breast Cancer"]
    B -->|Follow-up| C
    end
    subgraph Study 2
    D["Breast Cancer Group"] <-->|PSM Matching| E["Non-Cancer Control"]
    D -->|Follow-up| F["Risk of Thyroid Cancer"]
    E -->|Follow-up| F
    end`,
                description: "갑상선암 진단 후 유방암 발병 위험(Study 1)과 유방암 진단 후 갑상선암 발병 위험(Study 2)을 각각 독립적인 코호트로 구축하여 분석하는 양방향 설계입니다."
            },
            features: [
                "30만 명 규모의 대규모 코호트 데이터 핸들링 및 정제",
                "성향 점수 매칭(Propensity Score Matching)으로 교란 요인 완벽 통제",
                "Cox Proportional Hazard Model을 이용한 다변량 생존 분석",
                "검진 효과(Surveillance Bias)를 배제하기 위한 민감도 분석 수행"
            ],
            impact: "갑상선암과 유방암 사이의 상호 연관성이 단순한 검진 효과 이상의 생물학적 연결고리가 있을 수 있음을 시사하여, 암 생존자의 2차 암 검진 가이드라인 수립에 기여할 근거를 마련했습니다.",
            review: "대규모 데이터라도 편향(Bias)이 존재하면 잘못된 결론을 내릴 수 있음을 깊이 이해했습니다. '데이터의 양'보다 '비교의 공정성'이 더 중요하며, PSM과 같은 통계적 기법이 이를 어떻게 보정해주는지 실전에서 체득하는 계기였습니다.",
            deepDives: [
                {
                    title: "Deep Dive 1: Fair Comparison (PSM)",
                    content: "암 환자군은 일반인에 비해 고령이거나 기저질환이 많을 확률이 높습니다. 단순 비교 시 발생할 수 있는 이러한 선택 편향(Selection Bias)을 줄이기 위해 나이, 소득, 거주지, 동반 질환 점수(CCI) 등을 기반으로 성항 점수(Propensity Score)를 산출하고, 가장 유사한 대조군을 1:1로 매칭(Greedy Matching)하여 '마치 무작위 배정된 임상시험'과 유사한 분석 환경을 조성했습니다."
                },
                {
                    title: "Deep Dive 2: Two-way Street (Bidirectional Design)",
                    content: "A가 B의 원인일 수도 있지만, B가 A의 원인일 수도 있고, 혹은 제3의 요인 C가 둘 다에 영향을 미쳤을 수도 있습니다. 단방향 분석만으로는 이러한 인과 관계의 방향성을 파악하기 어렵습니다. 본 연구에서는 양방향 설계를 통해 두 암종이 서로의 발병 위험을 높이는지 교차 검증함으로써, 공통된 유전적/환경적 위험 인자의 존재 가능성을 더욱 강력하게 뒷받침했습니다."
                }
            ]
        }
    },
    {
        id: "healthcare-kpi",
        title: "Healthcare Service KPI",
        category: "BI & Strategy",
        highlight: false,
        oneLiner: "Dask 활용 로그 처리 및 '종합 건강 점수' 알고리즘 개발.",
        image: "/images/mobile-healthcare-thumb.jpg",
        tags: ["Dask", "Python", "Power BI"],
        stats: [
            { label: "Data Size", value: "280 GB" },
            { label: "Processing", value: "Dask" }
        ],
        techStack: [
            { category: "Data Engineering", skills: ["Dask (Python)", "JSON Parsing"] },
            { category: "Visualization", skills: ["Power BI", "Tableau"] }
        ],
        gallery: [
            "/images/mobile-healthcare-notion-1.png",
            "/images/mobile-healthcare-notion-2.png",
            "/images/mobile-healthcare-notion-3.png",
            "/images/mobile-healthcare-notion-4.png"
        ],
        detail: {
            problem: "보건소 모바일 헬스케어 사업에서 참여자들의 앱 사용 로그(Log) 파일이 280GB에 달하는 비정형 JSON 형태로 쌓여만 있었습니다. 사업 담당자들은 단순 접속 횟수 외에 참여자들의 건강 실천도가 실제로 개선되고 있는지 파악할 수 있는 정량적 지표(KPI)가 부재하여 사업 효과성을 입증하는 데 어려움을 겪고 있었습니다.",
            solution: "Python의 Dask 라이브러리를 활용하여 로컬 메모리 한계를 극복하는 대용량 로그 처리 파이프라인을 구축했습니다. 활동량(걸음 수), 영양 섭취(칼로리), 신체 지표(혈압/혈당) 데이터를 통합하여 '종합 건강 실천 점수' 알고리즘을 독자적으로 개발하고, 이를 시군구 담당자가 직관적으로 모니터링할 수 있는 대시보드(Power BI)로 시각화했습니다.",
            architecture: {
                diagram: `graph TD
    A["Raw Log Data (280GB JSON)"] -->|Chunk Read| B("Dask Processing Engine")
    B -->|Flatten & Parse| C["Structured DataFrame"]
    C -->|Calculate| D{"Scoring Algorithm"}
    D -->|Aggregated KPI| E["Comprehensive Health Score"]
    E -->|Visualize| F["Power BI Dashboard"]`,
                description: "메모리보다 큰 대용량 JSON 로그 파일을 Dask로 청크(Chunk) 단위로 로드하여 파싱하고, 건강 점수 알고리즘을 적용하여 최종 KPI를 산출하는 ETL 파이프라인입니다."
            },
            features: [
                "Dask를 활용한 Out-of-Core 데이터 처리로 280GB 로그 분석 성공",
                "비정형 JSON 데이터의 다중 레벨 Flattening 및 정형화",
                "걸음 수, 식단 기록 빈도, 건강 미션 달성률 등을 가중 평균한 '건강 점수' 개발",
                "지역 보건소별 사업 성과 비교를 위한 인터랙티브 대시보드 구축"
            ],
            impact: "개발된 건강 점수 알고리즘은 특허 출원으로 이어졌으며, 단순한 데이터 정리를 넘어 '건강 증진 효과'를 수치로 증명함으로써 차년도 사업 예산 확보의 핵심 근거 자료로 활용되었습니다.",
            review: "기술적인 '빅데이터 처리' 역량만큼이나, 도메인 지식을 바탕으로 데이터를 '해석'하고 '가치 있는 지표'로 가공하는 기획력이 중요함을 깨달았습니다. 개발자와 데이터 분석가 사이의 가교 역할을 수행하며 비즈니스 임팩트를 창출한 경험이었습니다.",
            deepDives: [
                {
                    title: "Deep Dive 1: Taming the Beast (Dask)",
                    content: "일반적인 Pandas로는 수십 GB가 넘는 데이터를 한 번에 로드하다가 Memory Error가 발생했습니다. 이를 해결하기 위해 병렬 컴퓨팅 라이브러리인 Dask를 도입하여, 데이터를 작은 파티션으로 나누어 처리(Lazy Evaluation)했습니다. 복잡한 중첩 구조의 JSON을 평탄화(Flatten)하는 과정에서도 Dask Bag을 활용하여 효율성을 극대화했습니다."
                },
                {
                    title: "Deep Dive 2: From Data to Score (Algorithm)",
                    content: "단순히 '많이 걸었다'가 아니라 '권장량을 얼마나 꾸준히 달성했는가'를 평가하기 위해, 보건학적 가이드라인을 기반으로 각 항목별 가중치를 설정했습니다. 매일 7천보 이상 걷기(30점), 아침 식사 챙겨 먹기(20점) 등 구체적인 행동 목표 달성 여부를 점수화하여 '보건소 이용자들의 노력'을 한 눈에 보여주는 지표를 설계했습니다."
                }
            ]
        }
    }
];