import type { Config } from "tailwindcss";

const config: Config = {
    // 1. 다크 모드 설정 (class 방식)
    darkMode: 'class',

    // 2. Tailwind를 적용할 파일 경로들
    content: [
        "./pages/**/*.{js,ts,jsx,tsx,mdx}",
        "./components/**/*.{js,ts,jsx,tsx,mdx}",
        "./app/**/*.{js,ts,jsx,tsx,mdx}",
    ],

    // 3. 테마 확장 (애니메이션 등 커스텀 설정)
    theme: {
        extend: {
            colors: {
                neon: '#00f0ff',
                royal: '#2563eb',
            },
            backgroundImage: {
                "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
                "gradient-conic":
                    "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
            },
            // 커스텀 애니메이션 (Hero 섹션 등에서 사용)
            animation: {
                'fade-in-up': 'fadeInUp 0.8s ease-out forwards',
                'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
            },
            keyframes: {
                fadeInUp: {
                    '0%': { opacity: '0', transform: 'translateY(20px)' },
                    '100%': { opacity: '1', transform: 'translateY(0)' },
                }
            }
        },
    },
    plugins: [],
};
export default config;