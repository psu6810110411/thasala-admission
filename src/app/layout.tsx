import type { Metadata } from "next";
import { Prompt, Sarabun } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/shared/Navbar";
import { Footer } from "@/components/shared/Footer";

const prompt = Prompt({
  weight: ["300", "400", "500", "600", "700"],
  subsets: ["thai", "latin"],
  variable: "--font-prompt",
  display: "swap",
});

const sarabun = Sarabun({
  weight: ["300", "400", "500", "600"],
  subsets: ["thai", "latin"],
  variable: "--font-sarabun",
  display: "swap",
});

export const metadata: Metadata = {
  title: "ระบบรับสมัครนักเรียนออนไลน์ | โรงเรียนท่าศาลาประสิทธิ์ศึกษา (ท.ศ.)",
  description:
    "ระบบรับสมัครนักเรียนออนไลน์ โรงเรียนท่าศาลาประสิทธิ์ศึกษา ต.ท่าศาลา อ.ท่าศาลา จ.นครศรีธรรมราช ประจำปีการศึกษา 2569 ระดับชั้น ม.1 และ ม.4",
  keywords: [
    "ท่าศาลาประสิทธิ์ศึกษา",
    "รับสมัครนักเรียน",
    "ท.ศ.",
    "มัธยมศึกษา",
    "นครศรีธรรมราช",
    "SMTP",
    "EP",
    "CNP",
    "DEP",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="th" className={`${prompt.variable} ${sarabun.variable} scroll-smooth`}>
      <body className="flex min-h-screen flex-col bg-brand-gray-50 text-brand-gray-900 antialiased font-sans">
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
