import "./globals.css";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Fert Advice",
  description: "Toprak analizine göre gübre tavsiye prototipi",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="tr">
      <body className="min-h-screen">{children}</body>
    </html>
  );
}
