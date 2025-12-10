import React, { Suspense } from 'react';
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Navbar from "@/components/layout/Navbar";
import { ThemeProvider } from "@/components/ThemeProvider";
import CustomCursor from "@/components/ui/CustomCursor";
import TextureOverlay from "@/components/ui/TextureOverlay";
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
    <html lang="ko" className="scroll-smooth" suppressHydrationWarning>
      <body className={`${inter.className} antialiased bg-white dark:bg-slate-950 text-slate-900 dark:text-white transition-colors duration-300`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <CustomCursor />
          <TextureOverlay />
          {/* Global Background Blobs */}
          <div className="fixed top-0 right-0 w-[300px] h-[300px] md:w-[600px] md:h-[600px] bg-gradient-to-br from-blue-200/20 to-indigo-200/20 md:from-blue-200/30 md:to-indigo-200/30 dark:from-blue-800/10 dark:to-indigo-800/10 dark:md:from-blue-800/20 dark:md:to-indigo-800/20 rounded-full blur-3xl -z-50 translate-x-1/3 -translate-y-1/4 pointer-events-none" />
          <div className="fixed bottom-0 left-0 w-[250px] h-[250px] md:w-[500px] md:h-[500px] bg-gradient-to-tr from-purple-200/20 to-pink-200/20 md:from-purple-200/30 md:to-pink-200/30 dark:from-purple-800/10 dark:to-pink-800/10 dark:md:from-purple-800/20 dark:md:to-pink-800/20 rounded-full blur-3xl -z-50 -translate-x-1/3 translate-y-1/4 pointer-events-none" />

          <Suspense fallback={null}>
            <Navbar />
          </Suspense>
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}