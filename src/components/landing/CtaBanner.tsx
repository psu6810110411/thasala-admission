import Link from "next/link";
import { GraduationCap, PhoneCall, Sparkles } from "lucide-react";

export function CtaBanner() {
  return (
    <section className="relative overflow-hidden bg-brand-gray-900 py-16 sm:py-20 text-white">
      {/* Glow Effects */}
      <div className="pointer-events-none absolute -bottom-24 -left-24 h-72 w-72 rounded-full bg-brand-gold-500/20 blur-3xl"></div>
      <div className="pointer-events-none absolute -top-24 -right-24 h-72 w-72 rounded-full bg-brand-gold-500/15 blur-3xl"></div>

      <div className="relative mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 text-center space-y-6">
        <div className="inline-flex items-center gap-2 rounded-full bg-brand-gray-800 px-3.5 py-1 text-xs font-semibold text-brand-gold-400 border border-brand-gray-700">
          <Sparkles className="h-3.5 w-3.5" />
          <span>อนาคตที่สดใส เริ่มต้นที่การตัดสินใจวันนี้</span>
        </div>

        <h2 className="text-2xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white leading-tight">
          พร้อมก้าวสู่รั้ว <span className="text-brand-gold-400">โรงเรียนท่าศาลาประสิทธิ์ศึกษา</span> แล้วหรือยัง?
        </h2>

        <p className="text-sm sm:text-base text-brand-gray-300 max-w-2xl mx-auto leading-relaxed">
          อย่าพลาดโอกาสเข้าศึกษาในหลักสูตรมาตรฐานสากล สภาพแวดล้อมที่เอื้อต่อการเรียนรู้
          และบุคลากรครูที่พร้อมดูแลอย่างใกล้ชิด
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-3.5 pt-4">
          <Link
            href="/apply"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-brand-gold-500 to-brand-gold-600 px-7 py-3.5 text-base font-bold text-brand-gray-950 shadow-lg transition-all duration-200 hover:from-brand-gold-400 hover:to-brand-gold-500 hover:scale-105 active:scale-100"
          >
            <GraduationCap className="h-5 w-5" />
            ยื่นใบสมัครออนไลน์ทันที
          </Link>
          <a
            href="tel:075521052"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-xl border border-brand-gray-700 bg-brand-gray-800/80 px-6 py-3.5 text-base font-semibold text-white transition-all duration-200 hover:bg-brand-gray-700 hover:border-brand-gray-600"
          >
            <PhoneCall className="h-4 w-4 text-brand-gold-400" />
            โทรสอบถาม: 075-521-052
          </a>
        </div>
      </div>
    </section>
  );
}
