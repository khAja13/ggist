import type { Metadata } from "next";

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
    <>
      {children}
    </> 
  );
}
