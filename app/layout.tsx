import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Navbar from "@/components/layout/Navbar";
import { ThemeProvider } from "@/components/ThemeProvider"; // 경로 확인 필요
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "MyeongHoon Lee | Data Scientist & Engineer",
  description: "Portfolio of MyeongHoon Lee",
  icons: {
    icon: '/favicon.ico',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    // suppressHydrationWarning은 테마 깜빡임 경고 방지용
    <html lang="ko" className="scroll-smooth" suppressHydrationWarning>
      <body className={`${inter.className} antialiased bg-fixed bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-blue-100 via-blue-50/50 to-white dark:from-blue-950/50 dark:via-slate-950 dark:to-black text-slate-900 dark:text-slate-100 transition-colors duration-300`}>

        {/* ★ 여기가 핵심입니다! attribute="class"가 꼭 있어야 합니다 ★ */}
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {/* Global Background Blobs */}
          <div className="fixed top-0 right-0 w-[600px] h-[600px] bg-gradient-to-br from-blue-200/30 to-indigo-200/30 dark:from-blue-800/20 dark:to-indigo-800/20 rounded-full blur-3xl -z-50 translate-x-1/3 -translate-y-1/4 pointer-events-none" />
          <div className="fixed bottom-0 left-0 w-[500px] h-[500px] bg-gradient-to-tr from-purple-200/30 to-pink-200/30 dark:from-purple-800/20 dark:to-pink-800/20 rounded-full blur-3xl -z-50 -translate-x-1/3 translate-y-1/4 pointer-events-none" />

          <Navbar />
          {children}
        </ThemeProvider>

      </body>
    </html>
  );
}