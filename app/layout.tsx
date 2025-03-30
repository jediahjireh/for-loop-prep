import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/ui/theme-provider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "For Loop Prep - Technical Interview Preparation Platform",
  description:
    "For Loop Prep helps developers prepare for technical interviews with interactive coding exercises, step-by-step solutions, and progress tracking.",
  keywords: [
    "technical interview",
    "coding challenges",
    "data structures",
    "algorithms",
    "React exercises",
    "interview preparation",
  ],
  authors: [
    { name: "For Loop Prep Team", url: "https://forloopprep.vercel.app" },
  ],
  openGraph: {
    title: "For Loop Prep - Technical Interview Preparation Platform",
    description:
      "Master technical interviews with interactive exercises, explanations, and progress tracking.",
    url: "https://forloopprep.vercel.app",
    siteName: "For Loop Prep",
    images: [
      {
        url: "https://forloopprep.vercel.app/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "For Loop Prep Preview",
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "For Loop Prep - Technical Interview Preparation Platform",
    description:
      "Enhance your coding skills with interactive exercises and real interview simulations.",
    images: ["https://forloopprep.vercel.app/twitter-card.jpg"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
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
