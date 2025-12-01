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
      <body className={`${inter.className} antialiased bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 transition-colors duration-300`}>

        {/* ★ 여기가 핵심입니다! attribute="class"가 꼭 있어야 합니다 ★ */}
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <Navbar />
          {children}
        </ThemeProvider>

      </body>
    </html>
  );
}