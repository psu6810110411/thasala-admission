import Link from "next/link";
import { GraduationCap, ArrowRight, ShieldCheck, Sparkles, BookOpen, Clock } from "lucide-react";

export default function Home() {
  return (
    <div className="relative overflow-hidden">
      {/* Background Subtle Gradient Blobs */}
      <div className="pointer-events-none absolute -top-40 -right-40 h-96 w-96 rounded-full bg-brand-gold-400/10 blur-3xl"></div>
      <div className="pointer-events-none absolute top-1/2 -left-40 h-96 w-96 rounded-full bg-brand-gray-500/10 blur-3xl"></div>

      {/* Hero Container */}
      <section className="mx-auto max-w-7xl px-4 pt-16 pb-20 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto space-y-6">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 rounded-full border border-brand-gold-500/30 bg-brand-gold-100/60 px-4 py-1.5 text-xs font-semibold text-brand-gray-800 shadow-sm backdrop-blur-sm">
            <Sparkles className="h-3.5 w-3.5 text-brand-gold-600" />
            <span>เปิดรับสมัครนักเรียน ปีการศึกษา 2569</span>
            <span className="h-1 w-1 rounded-full bg-brand-gold-500"></span>
            <span className="text-brand-gold-700">รอบห้องเรียนพิเศษ &amp; ปกติ</span>
          </div>

          {/* Main Title */}
          <h1 className="text-3xl font-extrabold tracking-tight text-brand-gray-900 sm:text-5xl sm:leading-tight">
            ก้าวสู่อนาคตการศึกษาอย่างมั่นใจ <br className="hidden sm:inline" />
            ณ <span className="bg-gradient-to-r from-brand-gray-900 via-brand-gray-800 to-brand-gold-600 bg-clip-text text-transparent">โรงเรียนท่าศาลาประสิทธิ์ศึกษา</span>
          </h1>

          {/* Subtitle */}
          <p className="text-base text-brand-gray-600 sm:text-lg leading-relaxed">
            ระบบรับสมัครนักเรียนออนไลน์ระดับชั้น ม.1 และ ม.4 ยื่นใบสมัครสะดวกรวดเร็ว
            ติดตามสถานะได้ทันที พร้อมผลักดันศักยภาพด้วยหลักสูตรมาตรฐานสากล
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3.5 pt-2">
            <Link
              href="/apply"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 rounded-xl bg-gradient-to-r from-brand-gold-500 to-brand-gold-600 px-6 py-3.5 text-base font-semibold text-brand-gray-950 shadow-md transition-all duration-200 hover:from-brand-gold-400 hover:to-brand-gold-500 hover:shadow-lg hover:-translate-y-0.5 active:translate-y-0"
            >
              <GraduationCap className="h-5 w-5" />
              ยื่นใบสมัครออนไลน์
            </Link>
            <Link
              href="/status"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-xl border border-brand-gray-300 bg-white px-6 py-3.5 text-base font-semibold text-brand-gray-700 shadow-sm transition-all duration-200 hover:bg-brand-gray-50 hover:text-brand-gray-950 hover:border-brand-gray-400"
            >
              ตรวจสอบสถานะ / พิมพ์บัตรสอบ
              <ArrowRight className="h-4 w-4 text-brand-gray-500" />
            </Link>
          </div>

          {/* Trust Highlights */}
          <div className="pt-8 grid grid-cols-1 sm:grid-cols-3 gap-4 text-left border-t border-brand-gray-200/80">
            <div className="flex items-center gap-3 rounded-xl bg-white p-3.5 border border-brand-gray-200/80 shadow-xs">
              <div className="p-2 rounded-lg bg-brand-gold-100 text-brand-gold-700">
                <ShieldCheck className="h-5 w-5" />
              </div>
              <div>
                <p className="text-xs font-semibold text-brand-gray-900">ตรวจเอกสารฉับไว</p>
                <p className="text-xs text-brand-gray-500">แจ้งเตือนสถานะทันที</p>
              </div>
            </div>
            <div className="flex items-center gap-3 rounded-xl bg-white p-3.5 border border-brand-gray-200/80 shadow-xs">
              <div className="p-2 rounded-lg bg-brand-gray-100 text-brand-gray-800">
                <BookOpen className="h-5 w-5" />
              </div>
              <div>
                <p className="text-xs font-semibold text-brand-gray-900">หลักสูตรครบครัน</p>
                <p className="text-xs text-brand-gray-500">SMTP, EP, CNP, DEP</p>
              </div>
            </div>
            <div className="flex items-center gap-3 rounded-xl bg-white p-3.5 border border-brand-gray-200/80 shadow-xs">
              <div className="p-2 rounded-lg bg-brand-gold-100 text-brand-gold-700">
                <Clock className="h-5 w-5" />
              </div>
              <div>
                <p className="text-xs font-semibold text-brand-gray-900">บันทึกร่างอัตโนมัติ</p>
                <p className="text-xs text-brand-gray-500">ไม่ต้องกลัวข้อมูลหาย</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
