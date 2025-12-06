import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "FundLab",
  description: "Premium Investor Matching Platform",
  icons: {
    icon: "/images/fundlab-icon.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={cn(inter.className, "min-h-screen bg-background font-sans antialiased text-gray-400 selection:bg-indigo-500/30 selection:text-indigo-200")}>
        {/* Background Gradients */}
        <div className="fixed top-0 left-0 w-full h-full overflow-hidden -z-10 pointer-events-none">
          <div className="absolute top-[-10%] left-[20%] w-[300px] h-[300px] bg-[radial-gradient(circle,rgba(99,102,241,0.15)_0%,rgba(0,0,0,0)_70%)] pointer-events-none z-0" />
          <div className="absolute bottom-[-10%] right-[20%] w-[300px] h-[300px] bg-[radial-gradient(circle,rgba(99,102,241,0.15)_0%,rgba(0,0,0,0)_70%)] pointer-events-none z-0" />
          <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 brightness-100 contrast-150"></div>
        </div>
        {children}
      </body>
    </html>
  );
}
