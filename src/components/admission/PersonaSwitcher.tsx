"use client";

import { PersonaMode } from "@/types/admission";
import { GraduationCap, Users, Sparkles } from "lucide-react";

interface PersonaSwitcherProps {
  currentPersona: PersonaMode;
  onSelect: (persona: PersonaMode) => void;
}

export function PersonaSwitcher({ currentPersona, onSelect }: PersonaSwitcherProps) {
  return (
    <div className="rounded-2xl bg-white p-4 sm:p-5 border border-brand-gray-200/90 shadow-xs mb-8">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-brand-gray-100">
        <div>
          <div className="flex items-center gap-1.5 text-xs font-bold text-brand-gold-700">
            <Sparkles className="h-3.5 w-3.5" />
            <span>โหมดการกรอกข้อมูล (Persona)</span>
          </div>
          <p className="text-xs text-brand-gray-500 mt-0.5">
            เลือกโหมดที่ตรงกับตัวคุณเพื่อให้ระบบแสดงคำแนะนำและภาษาที่เหมาะสมที่สุด
          </p>
        </div>
        <span className="text-[11px] font-semibold text-brand-gray-600 bg-brand-gray-100 px-2.5 py-1 rounded-full w-fit">
          {currentPersona === "student" ? "โหมด: นักเรียนสมัครเอง" : "โหมด: ผู้ปกครองสมัครให้"}
        </span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-3">
        <button
          type="button"
          onClick={() => onSelect("student")}
          className={`flex items-start gap-3 rounded-xl p-3.5 text-left transition-all duration-200 border ${
            currentPersona === "student"
              ? "bg-brand-gold-50/80 border-brand-gold-500 text-brand-gray-950 ring-2 ring-brand-gold-400/40 shadow-xs"
              : "bg-white border-brand-gray-200 text-brand-gray-600 hover:bg-brand-gray-50"
          }`}
        >
          <div
            className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-lg ${
              currentPersona === "student"
                ? "bg-brand-gold-500 text-brand-gray-950"
                : "bg-brand-gray-100 text-brand-gray-500"
            }`}
          >
            <GraduationCap className="h-5 w-5" />
          </div>
          <div>
            <p className="text-sm font-bold text-brand-gray-900">ฉันคือนักเรียน</p>
            <p className="text-xs text-brand-gray-500 mt-0.5 leading-relaxed">
              กรอกข้อมูลด้วยตนเอง ขั้นตอนกระชับ รวดเร็ว ตรวจสอบ GPAX ทันใจ
            </p>
          </div>
        </button>

        <button
          type="button"
          onClick={() => onSelect("parent")}
          className={`flex items-start gap-3 rounded-xl p-3.5 text-left transition-all duration-200 border ${
            currentPersona === "parent"
              ? "bg-brand-gold-50/80 border-brand-gold-500 text-brand-gray-950 ring-2 ring-brand-gold-400/40 shadow-xs"
              : "bg-white border-brand-gray-200 text-brand-gray-600 hover:bg-brand-gray-50"
          }`}
        >
          <div
            className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-lg ${
              currentPersona === "parent"
                ? "bg-brand-gold-500 text-brand-gray-950"
                : "bg-brand-gray-100 text-brand-gray-500"
            }`}
          >
            <Users className="h-5 w-5" />
          </div>
          <div>
            <p className="text-sm font-bold text-brand-gray-900">ฉันคือผู้ปกครอง</p>
            <p className="text-xs text-brand-gray-500 mt-0.5 leading-relaxed">
              สมัครแทนบุตรหลาน ฟอนต์อ่านง่าย มีคำอธิบายและระบุความสัมพันธ์ชัดเจน
            </p>
          </div>
        </button>
      </div>
    </div>
  );
}
