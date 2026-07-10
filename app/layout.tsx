import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css"; 

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: 'Startup Idea VC Evaluator',
  description: 'An AI-powered diagnostic framework that evaluates startup pitches with real Venture Capital decision quality.',
  openGraph: {
    title: 'Startup Idea VC Evaluator',
    description: 'Evidence over confidence. Real VC decision quality.',
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        {children}
      </body>
    </html>
  );
}