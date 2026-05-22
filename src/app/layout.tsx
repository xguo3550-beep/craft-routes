import type { Metadata } from "next";
import { Inter, Lora } from "next/font/google";
import { Suspense } from "react";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import "./globals.css";

const inter = Inter({
  variable: "--font-sans",
  subsets: ["latin"],
});

const lora = Lora({
  variable: "--font-display",
  subsets: ["latin"],
  weight: ["600", "700"],
});

export const metadata: Metadata = {
  title: {
    default: "Craft Routes | Workshops in Dali & Sichuan",
    template: "%s | Craft Routes",
  },
  description:
    "Book authentic cultural workshops in Dali, Yunnan and Sichuan — tie-dye, pottery, hotpot cooking, tea ceremonies, and more. English-friendly hosts.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${inter.variable} ${lora.variable} font-sans min-h-screen flex flex-col`}
      >
        <Suspense fallback={<div className="h-[65px] border-b border-line bg-white" />}>
          <Header />
        </Suspense>
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
