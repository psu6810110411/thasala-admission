"use client";

import Link from "next/link";
import { SubmittedApplication } from "@/types/admission";
import { CheckCircle2, Copy, ArrowRight, Printer, Home } from "lucide-react";
import { useState } from "react";

interface SuccessModalProps {
  application: SubmittedApplication;
}

export function SuccessModal({ application }: SuccessModalProps) {
  const [copied, setCopied] = useState(false);

  const copyAppId = () => {
    navigator.clipboard.writeText(application.applicationNo);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="rounded-3xl bg-white p-6 sm:p-10 border border-brand-gray-200/90 shadow-xl max-w-2xl mx-auto text-center space-y-6">
      {/* Success Icon */}
      <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-emerald-100 text-emerald-600 ring-8 ring-emerald-50">
        <CheckCircle2 className="h-10 w-10 stroke-[2.5]" />
      </div>

      <div className="space-y-2">
        <span className="inline-flex items-center gap-1.5 rounded-full bg-brand-gold-100 px-3.5 py-1 text-xs font-bold text-brand-gold-800">
          ยื่นใบสมัครสำเร็จเรียบร้อย
        </span>
        <h2 className="text-2xl sm:text-3xl font-extrabold text-brand-gray-900">
          ยินดีต้อนรับสู่ครอบครัว ท.ศ.!
        </h2>
        <p className="text-xs sm:text-sm text-brand-gray-600 max-w-md mx-auto leading-relaxed">
          ระบบได้บันทึกข้อมูลการสมัครของ{" "}
          <span className="font-bold text-brand-gray-900">
            {application.title} {application.firstNameTh} {application.lastNameTh}
          </span>{" "}
          เรียบร้อยแล้ว
        </p>
      </div>

      {/* Application No Badge Box */}
      <div className="rounded-2xl bg-brand-gray-50 p-5 border border-brand-gray-200 max-w-md mx-auto space-y-2">
        <p className="text-xs font-bold text-brand-gray-500 uppercase tracking-wider">
          รหัสประจำตัวผู้สมัคร (Application ID)
        </p>
        <div className="flex items-center justify-center gap-2">
          <span className="text-2xl sm:text-3xl font-black text-brand-gray-900 tracking-wider">
            {application.applicationNo}
          </span>
          <button
            type="button"
            onClick={copyAppId}
            className="p-1.5 text-brand-gray-500 hover:text-brand-gray-900 rounded-lg hover:bg-brand-gray-200 transition-colors"
            title="คัดลอกรหัส"
          >
            <Copy className="h-4 w-4" />
          </button>
        </div>
        {copied && (
          <p className="text-[11px] font-bold text-emerald-600">
            คัดลอกรหัสใบสมัครแล้ว!
          </p>
        )}
        <p className="text-[11px] text-brand-gray-500">
          * โปรดบันทึกภาพหน้าจอหรือจดรหัสนี้ไว้ เพื่อใช้ติดตามสถานะและพิมพ์บัตรสอบ
        </p>
      </div>

      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
        <Link
          href={`/status?id=${application.citizenId}`}
          className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-brand-gold-500 to-brand-gold-600 px-6 py-3.5 text-sm font-bold text-brand-gray-950 shadow-md hover:from-brand-gold-400 hover:to-brand-gold-500 transition-all hover:scale-105 active:scale-100"
        >
          <Printer className="h-4 w-4" />
          <span>ตรวจสอบสถานะ / พิมพ์ใบสมัคร</span>
        </Link>
        <Link
          href="/"
          className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-xl border border-brand-gray-300 bg-white px-5 py-3.5 text-sm font-semibold text-brand-gray-700 hover:bg-brand-gray-50 transition-colors"
        >
          <Home className="h-4 w-4" />
          <span>กลับสู่หน้าแรก</span>
        </Link>
      </div>
    </div>
  );
}
