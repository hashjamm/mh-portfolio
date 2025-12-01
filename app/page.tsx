import { projects } from '@/data/projects';
import HeroSection from '@/components/home/HeroSection';
import ProjectCard from '@/components/home/ProjectCard';

export default function Home() {
  const featuredProjects = projects.filter((p) => p.featured);
  const otherProjects = projects.filter((p) => !p.featured);

  return (
    // ★ 핵심 수정: dark:bg-slate-950, dark:text-slate-100 추가됨
    <main className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 font-sans transition-colors duration-300">

      <HeroSection />

      {/* Featured Projects Section */}
      <section id="projects" className="py-24 px-6 md:px-12 max-w-7xl mx-auto scroll-mt-20">
        <div className="mb-16">
          <span className="text-blue-600 dark:text-blue-400 font-semibold tracking-wider uppercase text-sm mb-2 block">Selected Work</span>
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-6 text-slate-900 dark:text-white">Featured Projects</h2>
          <p className="text-slate-600 dark:text-slate-400 max-w-2xl text-lg leading-relaxed">
            단순한 데이터 분석을 넘어, <strong>시스템 설계부터 서비스 구현</strong>까지.<br />
            연구(Research)와 엔지니어링(Engineering)의 경계를 허무는 핵심 프로젝트들입니다.
          </p>
        </div>

        <div className="flex flex-col gap-12">
          {featuredProjects.map((project) => (
            <div key={project.id} className="w-full">
              <ProjectCard project={project} isFeatured />
            </div>
          ))}
        </div>
      </section>

      {/* Other Projects Section */}
      {/* ★ 수정: 배경색 흰색 -> 다크모드 시 slate-900 */}
      <section className="py-24 px-6 md:px-12 bg-white dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800 transition-colors duration-300">
        <div className="max-w-7xl mx-auto">
          <div className="mb-12 flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div>
              <h2 className="text-2xl md:text-3xl font-bold tracking-tight mb-2 text-slate-900 dark:text-white">More Projects</h2>
              <p className="text-slate-500 dark:text-slate-400">다양한 도메인에서의 연구 및 개발 경험</p>
            </div>
            <div className="hidden md:flex gap-2">
              {['All', 'Research', 'Service', 'GenAI'].map((filter) => (
                <button key={filter} className="px-4 py-2 rounded-full text-sm font-medium text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors">
                  {filter}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {otherProjects.map((project) => (
              <ProjectCard key={project.id} project={project} />
            ))}
          </div>
        </div>
      </section>

      {/* About Me Section */}
      <section id="about" className="py-24 px-6 md:px-12 bg-slate-50 dark:bg-slate-950 transition-colors duration-300">
        <div className="max-w-4xl mx-auto">
          <span className="text-blue-600 dark:text-blue-400 font-semibold tracking-wider uppercase text-sm mb-2 block">Resume</span>
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-12 text-slate-900 dark:text-white">About Me</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {/* Education & Career */}
            <div className="space-y-10">
              <div>
                <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-6 flex items-center">
                  <span className="w-2 h-2 bg-blue-600 dark:bg-blue-500 rounded-full mr-3"></span>
                  Education
                </h3>
                <div className="space-y-8 border-l-2 border-slate-200 dark:border-slate-800 ml-1 pl-8 relative">
                  <div className="relative">
                    <span className="absolute -left-[37px] top-1.5 w-4 h-4 bg-white dark:bg-slate-950 border-2 border-blue-600 dark:border-blue-500 rounded-full"></span>
                    <h4 className="font-bold text-slate-800 dark:text-slate-100">차의과학대학교 생명과학 의료정보학 (석사)</h4>
                    <span className="text-sm text-slate-500 dark:text-slate-400 block mb-2">2021.03 ~ 2023.08 (졸업)</span>
                    <p className="text-slate-600 dark:text-slate-400 text-sm">의료 데이터 분석 및 인공지능 모델링 전공. 다수의 국책 과제 및 SCI 논문 수행.</p>
                  </div>
                  <div className="relative">
                    <span className="absolute -left-[37px] top-1.5 w-4 h-4 bg-white dark:bg-slate-950 border-2 border-slate-300 dark:border-slate-600 rounded-full"></span>
                    <h4 className="font-bold text-slate-800 dark:text-slate-100">차의과학대학교 바이오공학과 (학사)</h4>
                    <span className="text-sm text-slate-500 dark:text-slate-400 block mb-2">2016.03 ~ 2021.02 (졸업)</span>
                    <p className="text-slate-600 dark:text-slate-400 text-sm">생명과학 기초 및 데이터 분석 입문.</p>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-6 flex items-center">
                  <span className="w-2 h-2 bg-purple-600 dark:bg-purple-500 rounded-full mr-3"></span>
                  Career
                </h3>
                <div className="space-y-8 border-l-2 border-slate-200 dark:border-slate-800 ml-1 pl-8 relative">
                  <div className="relative">
                    <span className="absolute -left-[37px] top-1.5 w-4 h-4 bg-white dark:bg-slate-950 border-2 border-purple-600 dark:border-purple-500 rounded-full"></span>
                    <h4 className="font-bold text-slate-800 dark:text-slate-100">차의과학대학교 정보의학연구소</h4>
                    <span className="text-sm text-slate-500 dark:text-slate-400 block mb-2">2023.08 ~ 현재 (재직 중)</span>
                    <p className="text-slate-600 dark:text-slate-400 text-sm">
                      연구원 / 데이터 사이언티스트<br />
                      - 대규모 의료 코호트 분석 및 파이프라인 구축<br />
                      - 질병 네트워크 분석 시스템(CoTDeX) 개발 리딩
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Technical Skills */}
            <div>
              <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-6">Technical Skills</h3>
              <div className="space-y-6">
                <div>
                  <h4 className="text-sm font-semibold text-slate-700 dark:text-slate-300 mb-3">Languages</h4>
                  <div className="flex flex-wrap gap-2">
                    {['Python', 'R', 'SAS', 'SQL', 'Kotlin', 'TypeScript'].map(skill => (
                      <span key={skill} className="px-3 py-1 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded text-sm text-slate-600 dark:text-slate-300 font-medium">
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>

                <div>
                  <h4 className="text-sm font-semibold text-slate-700 dark:text-slate-300 mb-3">Data Engineering & Backend</h4>
                  <div className="flex flex-wrap gap-2">
                    {['Django', 'FastAPI', 'Docker', 'AWS', 'DuckDB', 'Airflow', 'Spark'].map(skill => (
                      <span key={skill} className="px-3 py-1 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded text-sm text-slate-600 dark:text-slate-300 font-medium">
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>

                <div>
                  <h4 className="text-sm font-semibold text-slate-700 dark:text-slate-300 mb-3">Data Science & AI</h4>
                  <div className="flex flex-wrap gap-2">
                    {['PyTorch', 'Scikit-learn', 'XGBoost', 'NetworkX', 'NLP', 'LLM'].map(skill => (
                      <span key={skill} className="px-3 py-1 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded text-sm text-slate-600 dark:text-slate-300 font-medium">
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-32 bg-slate-900 dark:bg-black text-white text-center px-6 transition-colors duration-300">
        <div className="max-w-3xl mx-auto space-y-8">
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight">Let's Build Something Great.</h2>
          <p className="text-slate-400 text-lg md:text-xl leading-relaxed">
            데이터 속에서 가치를 발견하고,<br className="md:hidden" /> 이를 견고한 시스템으로 구현할 준비가 되어 있습니다.<br />
            새로운 기회에 대해 논의하고 싶으시다면 언제든 연락주세요.
          </p>
          <div className="pt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href="mailto:lmh164231@gmail.com"
              className="px-8 py-4 bg-blue-600 hover:bg-blue-500 text-white rounded-full font-bold text-lg transition-all hover:scale-105 shadow-lg shadow-blue-900/50 w-full sm:w-auto"
            >
              Contact Me
            </a>
            <a
              href="https://github.com/hashjamm"
              target="_blank"
              rel="noopener noreferrer"
              className="px-8 py-4 bg-slate-800 hover:bg-slate-700 text-white rounded-full font-bold text-lg transition-all border border-slate-700 w-full sm:w-auto"
            >
              GitHub Profile
            </a>
          </div>
          <p className="pt-16 text-slate-600 text-sm">
            © {new Date().getFullYear()} MyeongHoon Lee. All rights reserved.
          </p>
        </div>
      </footer>
    </main>
  );
}