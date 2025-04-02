import "./globals.css";
import type { Metadata } from "next";
import Header from "@/components/header";
import { Footer } from "@/components/footer";
import { HomePage } from "@/data/meta-data";
import LocalFont from "@/lib/local-font";
import Script from "next/script";

export const metadata: Metadata = HomePage.metadata;

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        suppressHydrationWarning
        className={`${LocalFont.className} flex flex-col h-screen bg-slate-50`}
      >
        <Header />
        <main className="flex relative flex-col items-center flex-1 m-auto w-full max-w-6xl p-4">
          {children}
        </main>
        {process.env.NODE_ENV === "production" && (
          <Script
            async
            src={process.env.UMAMI_SCRIPT_URL}
            data-website-id={process.env.UMAMI_DATA_WEBSITE_ID}
          />
        )}
        <Footer />
      </body>
    </html>
  );
}
