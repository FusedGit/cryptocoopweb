import type { Metadata } from "next";
import { Geist, Geist_Mono, IBM_Plex_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: 'swap',
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: 'swap',
});

const ibmPlexMono = IBM_Plex_Mono({
  variable: "--font-ibm-plex-mono",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  display: 'swap',
});

export const metadata: Metadata = {
  title: "Cryptocoop - The Private Crypto Exchange on Telegram",
  description: "The premier non-KYC crypto exchange on Telegram. Trade BTC, XMR, TON and more with no limits, no funds checks, and zero discrimination. Support for multiple payment methods.",
  keywords: ["crypto exchange", "monero exchange", "xmr", "telegram exchange", "no kyc exchange", "private trading", "cryptocoop"],
  authors: [{ name: "Cryptocoop" }],
  openGraph: {
    title: "Cryptocoop - Trade Crypto Freely on Telegram",
    description: "Trade crypto on and off ramp without KYC, AML, or limits. #1 trader on LocalCoinSwap.",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Cryptocoop - Trade Crypto Freely on Telegram",
    description: "Trade crypto on and off ramp without KYC, AML, or limits.",
  },
};

import { ThemeProvider } from '@/components/theme-provider'

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${ibmPlexMono.variable} antialiased`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
