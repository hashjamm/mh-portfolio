import React from 'react';


const Footer = () => {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="w-full bg-slate-900 text-white py-20 mt-20">
            <div className="max-w-7xl mx-auto px-6 md:px-12">

                {/* CTA Section */}
                <div className="flex flex-col items-center text-center mb-20">
                    <h2 className="text-4xl md:text-5xl font-bold mb-8 leading-tight">
                        Let&apos;s Build <br />
                        Something Great.
                    </h2>
                    <p className="text-slate-400 text-lg md:text-xl max-w-2xl mb-10 leading-relaxed break-keep">
                        데이터 속에서 가치를 발견하고, <br className="hidden md:block" />
                        이를 견고한 시스템으로 구현할 준비가 되어 있습니다. <br />
                        새로운 기회에 대해 논의하고 싶으시다면 언제든 연락주세요.
                    </p>

                    <div className="flex flex-col md:flex-row gap-4 w-full md:w-auto">
                        <a
                            href="mailto:contact@example.com"
                            className="px-8 py-4 bg-blue-600 hover:bg-blue-700 text-white rounded-full font-bold text-lg transition-colors w-full md:w-auto"
                        >
                            Contact Me
                        </a>
                        <a
                            href="https://github.com/HashJam"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="px-8 py-4 bg-slate-800 hover:bg-slate-700 text-white border border-slate-700 rounded-full font-bold text-lg transition-colors w-full md:w-auto"
                        >
                            GitHub Profile
                        </a>
                    </div>
                </div>

                {/* Bottom Section */}
                <div className="pt-8 border-t border-slate-800 flex flex-col md:flex-row justify-center items-center gap-4">

                    {/* Copyright */}
                    <div className="text-sm text-slate-500">
                        © {currentYear} MyeongHoon Lee. All rights reserved.
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
