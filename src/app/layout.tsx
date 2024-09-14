import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { Component } from "@shared/Component";
import GlobalStyle from "@/styles/GlobalStyle";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "bank-account",
  description: "banks account application",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        <Component> 안녕ㅋㅋ </Component>
        <div className="hi">씨바루</div>
        <GlobalStyle />
        {children}
      </body>
    </html>
  );
}
