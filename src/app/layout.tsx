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

const siteUrl = process.env.NEXT_PUBLIC_APP_URL || "https://thasala-admission.vercel.app";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "ระบบรับสมัครนักเรียนออนไลน์ | โรงเรียนท่าศาลาประสิทธิ์ศึกษา (ท.ศ.)",
    template: "%s | โรงเรียนท่าศาลาประสิทธิ์ศึกษา",
  },
  description:
    "ระบบรับสมัครนักเรียนออนไลน์ โรงเรียนท่าศาลาประสิทธิ์ศึกษา ต.ท่าศาลา อ.ท่าศาลา จ.นครศรีธรรมราช ประจำปีการศึกษา 2569 ระดับชั้น ม.1 และ ม.4 (SMTP, EP, CNP, DEP และห้องเรียนปกติ)",
  keywords: [
    "ท่าศาลาประสิทธิ์ศึกษา",
    "รับสมัครนักเรียน 2569",
    "ท.ศ.",
    "มัธยมศึกษา",
    "นครศรีธรรมราช",
    "SMTP",
    "EP",
    "CNP",
    "DEP",
    "โรงเรียนท่าศาลา",
  ],
  authors: [{ name: "Arinchxi___", url: "https://www.instagram.com/arinchxi___/" }],
  creator: "Arinchxi___",
  openGraph: {
    title: "ระบบรับสมัครนักเรียนออนไลน์ | โรงเรียนท่าศาลาประสิทธิ์ศึกษา (ท.ศ.)",
    description:
      "ก้าวสู่อนาคตการศึกษาอย่างมั่นใจ ณ โรงเรียนท่าศาลาประสิทธิ์ศึกษา สมัครเรียนออนไลน์ ม.1 และ ม.4 พร้อมตรวจสอบสถานะแบบเรียลไทม์",
    url: siteUrl,
    siteName: "โรงเรียนท่าศาลาประสิทธิ์ศึกษา Admission Portal",
    locale: "th_TH",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "ระบบรับสมัครนักเรียนออนไลน์ | โรงเรียนท่าศาลาประสิทธิ์ศึกษา",
    description:
      "ระบบรับสมัครนักเรียนออนไลน์ ระดับชั้น ม.1 และ ม.4 ประจำปีการศึกษา 2569 โรงเรียนท่าศาลาประสิทธิ์ศึกษา",
  },
  alternates: {
    canonical: siteUrl,
  },
  robots: {
    index: true,
    follow: true,
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "EducationalOrganization",
  name: "โรงเรียนท่าศาลาประสิทธิ์ศึกษา",
  alternateName: ["ท.ศ.", "Thasala Prasitsuksa School"],
  url: "https://thasala.ac.th",
  description:
    "ระบบรับสมัครนักเรียนออนไลน์ โรงเรียนท่าศาลาประสิทธิ์ศึกษา อ.ท่าศาลา จ.นครศรีธรรมราช ประจำปีการศึกษา 2569",
  telephone: "+66-75-521052",
  address: {
    "@type": "PostalAddress",
    streetAddress: "155/35 หมู่ 3",
    addressLocality: "ท่าศาลา",
    addressRegion: "นครศรีธรรมราช",
    postalCode: "80160",
    addressCountry: "TH",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="th" className={`${prompt.variable} ${sarabun.variable} scroll-smooth`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="flex min-h-screen flex-col bg-brand-gray-50 text-brand-gray-900 antialiased font-sans">
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
