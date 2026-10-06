import Link from "next/link";
import { Home, Search } from "lucide-react";

export default function NotFound() {
  return (
    <main className="min-h-[60vh] flex items-center justify-center px-4">
      <div className="max-w-md w-full text-center space-y-6">
        <div className="space-y-1">
          <p className="text-6xl font-black text-brand-gold-500 font-prompt">
            404
          </p>
          <h2 className="text-xl font-bold text-brand-gray-900 font-prompt">
            ไม่พบหน้าที่คุณต้องการ
          </h2>
          <p className="text-sm text-brand-gray-500 font-sarabun">
            หน้านี้อาจถูกย้ายหรือลบออกแล้ว กรุณาตรวจสอบ URL อีกครั้ง
          </p>
        </div>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link
            href="/"
            className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-brand-gold-500 text-white font-semibold text-sm hover:bg-brand-gold-600 transition-colors shadow-md"
          >
            <Home className="w-4 h-4" />
            กลับหน้าหลัก
          </Link>
          <Link
            href="/status"
            className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl border border-brand-gray-300 text-brand-gray-700 font-semibold text-sm hover:bg-brand-gray-50 transition-colors"
          >
            <Search className="w-4 h-4" />
            ตรวจสอบสถานะ
          </Link>
        </div>
      </div>
    </main>
  );
}
