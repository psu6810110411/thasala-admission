import Link from "next/link";
import Image from "next/image";
import { Phone, MapPin, Globe, ExternalLink, Heart } from "lucide-react";

export function Footer() {
  return (
    <footer className="border-t border-brand-gray-200 bg-brand-gray-900 text-white">
      {/* Top Banner / Philosophy */}
      <div className="border-b border-brand-gray-800 bg-brand-gray-950/80 py-4 px-4 text-center">
        <p className="text-xs sm:text-sm font-medium tracking-wide text-brand-gold-400">
          ปรัชญาโรงเรียน: &ldquo;ปญฺญา นรนํ รตนํ&rdquo; (ปัญญาเป็นรัตนะของนรชน) &bull; คำขวัญ: &ldquo;มีวินัย ใฝ่เรียนรู้ เชิดชูคุณธรรม สัมพันธ์ชุมชน&rdquo;
        </p>
      </div>

      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-4">
          {/* School Brand */}
          <div className="md:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <div className="relative h-12 w-12 shrink-0">
                <Image
                  src="/images/logo.png"
                  alt="ตราโรงเรียนท่าศาลาประสิทธิ์ศึกษา"
                  fill
                  sizes="48px"
                  className="object-contain"
                />
              </div>
              <div>
                <h3 className="text-base font-bold text-white">
                  โรงเรียนท่าศาลาประสิทธิ์ศึกษา
                </h3>
                <p className="text-xs text-brand-gray-400">
                  สังกัดสำนักงานเขตพื้นที่การศึกษามัธยมศึกษานครศรีธรรมราช
                </p>
              </div>
            </div>
            <p className="text-sm text-brand-gray-300 leading-relaxed max-w-md">
              ระบบรับสมัครนักเรียนออนไลน์ระดับชั้นมัธยมศึกษาปีที่ 1 และมัธยมศึกษาปีที่ 4
              มุ่งมั่นพัฒนาผู้เรียนสู่ความเป็นเลิศทางวิชาการ ควบคู่คุณธรรมและทักษะแห่งอนาคต
            </p>
            <div className="inline-flex items-center gap-2 rounded-full bg-brand-gray-800/80 px-3 py-1 text-xs text-brand-gray-300 border border-brand-gray-700">
              <span className="h-2 w-2 rounded-full bg-brand-gold-500"></span>
              สีประจำโรงเรียน: เทา (ปัญญา) - เหลือง (คุณธรรม)
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-3">
            <h4 className="text-sm font-semibold uppercase tracking-wider text-brand-gold-400">
              ลิงก์ด่วน
            </h4>
            <ul className="space-y-2 text-sm text-brand-gray-300">
              <li>
                <Link href="/apply" className="transition-colors hover:text-brand-gold-400">
                  ยื่นใบสมัครออนไลน์
                </Link>
              </li>
              <li>
                <Link href="/calculator" className="transition-colors hover:text-brand-gold-400">
                  คำนวณคะแนน & ประเมินโอกาส
                </Link>
              </li>
              <li>
                <Link href="/status" className="transition-colors hover:text-brand-gold-400">
                  ตรวจสอบผลและพิมพ์บัตรสอบ
                </Link>
              </li>
              <li>
                <Link href="/admin" className="transition-colors hover:text-brand-gold-400 text-brand-gold-400/90 font-medium">
                  ระบบตรวจเอกสาร (Admin)
                </Link>
              </li>
              <li>
                <Link href="/#programs" className="transition-colors hover:text-brand-gold-400">
                  ข้อมูลแผนการเรียน
                </Link>
              </li>
              <li>
                <Link href="/#timeline" className="transition-colors hover:text-brand-gold-400">
                  กำหนดการรับสมัคร
                </Link>
              </li>
              <li>
                <a
                  href="https://thasala.ac.th"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 transition-colors hover:text-brand-gold-400"
                >
                  เว็บไซต์หลักของโรงเรียน <ExternalLink className="h-3 w-3" />
                </a>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div className="space-y-3">
            <h4 className="text-sm font-semibold uppercase tracking-wider text-brand-gold-400">
              ติดต่อโรงเรียน
            </h4>
            <ul className="space-y-2.5 text-sm text-brand-gray-300">
              <li className="flex items-start gap-2">
                <MapPin className="h-4 w-4 shrink-0 text-brand-gold-400 mt-0.5" />
                <span className="text-xs leading-relaxed">
                  155/35 หมู่ 3 ต.ท่าศาลา อ.ท่าศาลา จ.นครศรีธรรมราช 80160
                </span>
              </li>
              <li className="flex items-center gap-2">
                <Phone className="h-4 w-4 text-brand-gold-400" />
                <span className="text-xs">075-521-052</span>
              </li>
              <li className="flex items-center gap-2">
                <Globe className="h-4 w-4 text-brand-gold-400" />
                <a
                  href="https://thasala.ac.th"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs hover:text-brand-gold-400"
                >
                  www.thasala.ac.th
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Credits & Disclaimer */}
        <div className="mt-12 flex flex-col items-center justify-between border-t border-brand-gray-800 pt-6 sm:flex-row gap-4">
          <div className="flex flex-col sm:flex-row items-center gap-2 text-center sm:text-left">
            <p className="text-xs text-brand-gray-400">
              &copy; 2026 โรงเรียนท่าศาลาประสิทธิ์ศึกษา. สงวนลิขสิทธิ์ทุกประการ.
            </p>
            <span className="hidden sm:inline text-brand-gray-600">&bull;</span>
            <p className="text-[11px] text-brand-gray-500">
              โครงการนี้จัดทำขึ้นเพื่อการศึกษาและพัฒนาทักษะส่วนบุคคล (Personal Portfolio) มิใช่ระบบรับสมัครอย่างเป็นทางการ
            </p>
          </div>
          <div className="flex items-center gap-1 text-xs text-brand-gray-400">
            <span>พัฒนาโดย</span>
            <a
              href="https://www.instagram.com/arinchxi___/"
              target="_blank"
              rel="noopener noreferrer"
              className="font-medium text-brand-gold-400 hover:underline inline-flex items-center gap-1"
            >
              @arinchxi___
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
