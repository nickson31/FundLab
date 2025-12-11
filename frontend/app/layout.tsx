import type { Metadata } from "next";
import { Outfit, Plus_Jakarta_Sans, Space_Grotesk } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-heading",
  display: "swap",
});

const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-body",
  display: "swap",
});

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-technical", // New font variable
  display: "swap",
});

export const metadata: Metadata = {
  title: "FundLab",
  description: "Premium Investor Matching Platform",
  icons: {
    icon: "/images/fundlab-icon.svg",
  },
};

import { ThemeProvider } from "@/components/theme-provider";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={cn(
        outfit.variable,
        jakarta.variable,
        spaceGrotesk.variable,
        "min-h-screen bg-background font-body antialiased text-foreground selection:bg-indigo-500/30 selection:text-indigo-200"
      )}>
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          {/* Cinematic Background Mesh - Redesigned */}
          <div className="fixed top-0 left-0 w-full h-full overflow-hidden -z-10 pointer-events-none bg-[#F8FAFC] dark:bg-[#020617] transition-colors duration-500">
            <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[50%] bg-blue-600/5 dark:bg-blue-600/10 rounded-full blur-[140px] mix-blend-multiply dark:mix-blend-screen animate-pulse duration-[15s]" />
            <div className="absolute bottom-[-20%] right-[-10%] w-[50%] h-[50%] bg-indigo-600/5 dark:bg-indigo-600/10 rounded-full blur-[140px] mix-blend-multiply dark:mix-blend-screen animate-pulse duration-[15s] delay-1000" />
            <div className="absolute top-[40%] left-[40%] w-[30%] h-[30%] bg-purple-500/5 dark:bg-purple-500/10 rounded-full blur-[100px] mix-blend-multiply dark:mix-blend-screen animate-pulse duration-[20s]" />
            <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 dark:opacity-[0.15] brightness-100 contrast-150 mix-blend-overlay"></div>
          </div>
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
