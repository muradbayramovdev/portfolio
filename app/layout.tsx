import type { Metadata } from "next";
import { Manrope } from "next/font/google";
import "./globals.css";
import { ToastProvider } from "@/components/admin/toast-provider";

const manrope = Manrope({ subsets: ["latin"], weight: ["400", "500", "600", "700", "800"] });

export const metadata: Metadata = {
  title: "Murad | Portfolio",
  description: "Murad - AI-focused product builder and full stack developer."
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="az" suppressHydrationWarning>
      <body className={`${manrope.className} bg-noise min-h-screen transition-colors duration-300`}>
        <ToastProvider>{children}</ToastProvider>
      </body>
    </html>
  );
}
