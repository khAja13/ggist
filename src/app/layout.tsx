import type { Metadata } from "next";
import { ThemeProvider } from "@/components/ThemeProvider"
import { Inter } from "next/font/google";
import "./globals.css";
import { Suspense } from "react";
import LoadingSpinner from "./loading";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Simple Gist",
  description: "A simple gist for you...",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    
    <html lang="en">
      <body className={inter.className}>
        <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
        >
          <Suspense fallback={<LoadingSpinner />}>
                {children}
          </Suspense>
        </ThemeProvider>
        </body>
    </html>
  );
}
