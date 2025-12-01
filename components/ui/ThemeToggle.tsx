"use client";

import * as React from "react";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";

export function ThemeToggle() {
    // resolvedTheme: 시스템 설정을 포함하여 실제 현재 보여지는 테마(light/dark)를 알려줌
    const { setTheme, resolvedTheme } = useTheme();
    const [mounted, setMounted] = React.useState(false);

    // 하이드레이션 불일치 방지
    React.useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) {
        return <div className="w-9 h-9" />; // 로딩 중 공간 확보
    }

    return (
        <button
            // ★ 핵심 수정: 현재 눈에 보이는 게 dark라면 light로, 아니면 dark로 전환
            onClick={() => setTheme(resolvedTheme === "dark" ? "light" : "dark")}
            className="p-2 rounded-full hover:bg-slate-200 dark:hover:bg-slate-800 transition-colors focus:outline-none focus:ring-2 focus:ring-slate-400 dark:focus:ring-slate-600"
            aria-label="Toggle Theme"
        >
            {resolvedTheme === "dark" ? (
                <Sun className="h-5 w-5 text-yellow-500 transition-all hover:rotate-90" />
            ) : (
                <Moon className="h-5 w-5 text-slate-600 transition-all hover:-rotate-12" />
            )}
        </button>
    );
}