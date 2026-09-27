"use client";

import { useState } from "react";
import { Search, ShieldCheck, Sparkles, HelpCircle } from "lucide-react";

interface StatusSearchFormProps {
  onSearch: (idOrCitizen: string, birthDate: string) => void;
  onLoadDemo: () => void;
  isSearching: boolean;
}

export function StatusSearchForm({
  onSearch,
  onLoadDemo,
  isSearching,
}: StatusSearchFormProps) {
  const [query, setQuery] = useState("");
  const [birthDate, setBirthDate] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!query) {
      alert("กรุณากรอกเลขประจำตัวประชาชน หรือรหัสใบสมัคร");
      return;
    }
    onSearch(query.trim(), birthDate);
  };

  return (
    <div className="max-w-xl mx-auto space-y-6">
      {/* Header */}
      <div className="text-center space-y-2">
        <div className="inline-flex items-center gap-1.5 rounded-full bg-brand-gold-100 px-3.5 py-1 text-xs font-semibold text-brand-gold-800">
          <Search className="h-3.5 w-3.5" />
          <span>ระบบติดตามสถานะการสมัคร</span>
        </div>
        <h1 className="text-2xl sm:text-4xl font-extrabold text-brand-gray-900 tracking-tight">
          ตรวจสอบสถานะ &amp; พิมพ์บัตรสอบ
        </h1>
        <p className="text-xs sm:text-sm text-brand-gray-600 leading-relaxed">
          กรอกเลขประจำตัวประชาชน 13 หลัก หรือรหัสใบสมัครเพื่อตรวจสอบผลและพิมพ์บัตรประจำตัวผู้เข้าสอบ
        </p>
      </div>

      {/* Search Box Card */}
      <form
        onSubmit={handleSubmit}
        className="rounded-3xl bg-white p-6 sm:p-8 border border-brand-gray-200/90 shadow-md space-y-5"
      >
        {/* ID / Citizen Input */}
        <div className="space-y-1.5">
          <label className="block text-xs font-bold text-brand-gray-800 uppercase tracking-wide">
            เลขประจำตัวประชาชน (13 หลัก) หรือ รหัสใบสมัคร <span className="text-rose-500">*</span>
          </label>
          <input
            type="text"
            required
            placeholder="เช่น 1809901234567 หรือ TS69-1001"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="w-full rounded-xl border border-brand-gray-300 p-3.5 text-sm font-medium tracking-wide text-brand-gray-900 focus:border-brand-gold-500 focus:ring-2 focus:ring-brand-gold-400 focus:outline-none"
          />
        </div>

        {/* Birth Date Input (Optional security check) */}
        <div className="space-y-1.5">
          <div className="flex items-center justify-between">
            <label className="block text-xs font-bold text-brand-gray-800 uppercase tracking-wide">
              วัน/เดือน/ปีเกิด (ของผู้สมัคร)
            </label>
            <span className="text-[11px] text-brand-gray-400">(ระบุเพื่อยืนยันตัวตน)</span>
          </div>
          <input
            type="date"
            value={birthDate}
            onChange={(e) => setBirthDate(e.target.value)}
            className="w-full rounded-xl border border-brand-gray-300 p-3 text-sm text-brand-gray-900 focus:border-brand-gold-500 focus:outline-none"
          />
        </div>

        {/* Submit Search Button */}
        <button
          type="submit"
          disabled={isSearching}
          className="w-full inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-brand-gold-500 to-brand-gold-600 py-3.5 text-sm font-bold text-brand-gray-950 shadow-md hover:from-brand-gold-400 hover:to-brand-gold-500 transition-all hover:scale-[1.01] active:scale-[0.99] disabled:opacity-50"
        >
          {isSearching ? (
            <>
              <span className="h-4 w-4 animate-spin rounded-full border-2 border-brand-gray-950 border-t-transparent"></span>
              <span>กำลังตรวจสอบข้อมูล...</span>
            </>
          ) : (
            <>
              <Search className="h-4 w-4" />
              <span>ตรวจสอบสถานะ</span>
            </>
          )}
        </button>

        {/* Demo Candidate Shortcut */}
        <div className="pt-2 text-center border-t border-brand-gray-100">
          <button
            type="button"
            onClick={onLoadDemo}
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-brand-gold-700 hover:text-brand-gold-800 bg-brand-gold-50 hover:bg-brand-gold-100 px-3 py-1.5 rounded-lg border border-brand-gold-200 transition-colors"
          >
            <Sparkles className="h-3.5 w-3.5" />
            <span>คลิกเพื่อดูตัวอย่างข้อมูลที่อนุมัติแล้ว (Demo Candidate)</span>
          </button>
        </div>
      </form>

      {/* Security & Help note */}
      <div className="flex items-start gap-3 rounded-2xl bg-brand-gray-100/70 p-4 border border-brand-gray-200 text-xs text-brand-gray-600 leading-relaxed">
        <ShieldCheck className="h-5 w-5 text-brand-gold-600 shrink-0 mt-0.5" />
        <div>
          <p className="font-bold text-brand-gray-800">ระบบรักษาความปลอดภัยข้อมูลผู้สมัคร</p>
          <p className="mt-0.5">
            ข้อมูลส่วนบุคคลจะถูกนำมาแสดงเพื่อการตรวจสอบสิทธิ์และการพิมพ์เอกสารการสอบเท่านั้น
            หากพบปัญหาหรือไม่พบข้อมูล สามารถติดต่อห้องวิชาการ โทร. 075-521052
          </p>
        </div>
      </div>
    </div>
  );
}
