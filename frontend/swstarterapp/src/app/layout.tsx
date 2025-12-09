import type { Metadata } from "next";
import { Geist, Geist_Mono, Montserrat } from "next/font/google";
import "./globals.css";
import { NuqsAdapterProvider } from "@/components/providers/NuqsAdapterProvider";
import { ReactQueryProvider } from "@/components/providers/ReactQueryProvider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const montserrat = Montserrat({
  variable: "--font-montserrat",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "SW Starter App",
  description: "A starter app for Next.js + Laravel projects.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${montserrat.variable} antialiased`}
      >
        <ReactQueryProvider>
          <NuqsAdapterProvider>{children}</NuqsAdapterProvider>
        </ReactQueryProvider>
      </body>
    </html>
  );
}
