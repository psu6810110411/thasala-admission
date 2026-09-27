"use client";

import { ApplicationFormData, EducationLevel } from "@/types/admission";
import { PROGRAMS_M1, PROGRAMS_M4 } from "@/lib/constants";
import { BookOpen, Award, AlertCircle, CheckCircle2, ArrowRight } from "lucide-react";

interface Step1ProgramProps {
  data: ApplicationFormData;
  updateData: (fields: Partial<ApplicationFormData>) => void;
  onNext: () => void;
}

export function Step1Program({ data, updateData, onNext }: Step1ProgramProps) {
  const currentPrograms = data.level === "m1" ? PROGRAMS_M1 : PROGRAMS_M4;
  const primarySelected = currentPrograms.find((p) => p.id === data.primaryProgram);

  const parsedGpax = parseFloat(data.gpax);
  const isGpaxValid = !isNaN(parsedGpax) && parsedGpax >= 0 && parsedGpax <= 4.0;
  const meetsMinGpax = primarySelected && isGpaxValid && parsedGpax >= primarySelected.minGpax;

  const handleLevelChange = (level: EducationLevel) => {
    const defaultPrograms = level === "m1" ? PROGRAMS_M1 : PROGRAMS_M4;
    updateData({
      level,
      primaryProgram: defaultPrograms[0].id,
      secondaryProgram: defaultPrograms[defaultPrograms.length - 1].id,
    });
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!data.gpax) {
      alert("กรุณาระบุเกรดเฉลี่ยสะสม (GPAX)");
      return;
    }
    if (!isGpaxValid) {
      alert("เกรดเฉลี่ยสะสมต้องอยู่ระหว่าง 0.00 ถึง 4.00");
      return;
    }
    onNext();
  };

  return (
    <form onSubmit={handleFormSubmit} className="space-y-8">
      {/* 1. Education Level Selection */}
      <div className="rounded-2xl bg-white p-6 border border-brand-gray-200/90 shadow-xs space-y-4">
        <div className="flex items-center gap-2">
          <BookOpen className="h-5 w-5 text-brand-gold-600" />
          <h3 className="text-base font-bold text-brand-gray-900">
            1. เลือกระดับชั้นที่ต้องการสมัคร
          </h3>
        </div>
        <p className="text-xs text-brand-gray-500">
          เปิดรับสมัครนักเรียนใหม่ประจำปีการศึกษา 2569
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 pt-1">
          <button
            type="button"
            onClick={() => handleLevelChange("m1")}
            className={`flex items-center justify-between p-4 rounded-xl border transition-all text-left ${
              data.level === "m1"
                ? "bg-brand-gray-900 text-white border-brand-gray-900 shadow-sm ring-2 ring-brand-gold-400"
                : "bg-white border-brand-gray-200 text-brand-gray-700 hover:bg-brand-gray-50"
            }`}
          >
            <div>
              <p className="font-bold text-sm sm:text-base">มัธยมศึกษาปีที่ 1 (ม.1)</p>
              <p className={`text-xs mt-0.5 ${data.level === "m1" ? "text-brand-gray-300" : "text-brand-gray-500"}`}>
                ผู้สำเร็จการศึกษาชั้น ป.6
              </p>
            </div>
            <span
              className={`text-xs font-bold px-2 py-1 rounded-md ${
                data.level === "m1"
                  ? "bg-brand-gold-500 text-brand-gray-950"
                  : "bg-brand-gray-100 text-brand-gray-600"
              }`}
            >
              3 แผนการเรียน
            </span>
          </button>

          <button
            type="button"
            onClick={() => handleLevelChange("m4")}
            className={`flex items-center justify-between p-4 rounded-xl border transition-all text-left ${
              data.level === "m4"
                ? "bg-brand-gray-900 text-white border-brand-gray-900 shadow-sm ring-2 ring-brand-gold-400"
                : "bg-white border-brand-gray-200 text-brand-gray-700 hover:bg-brand-gray-50"
            }`}
          >
            <div>
              <p className="font-bold text-sm sm:text-base">มัธยมศึกษาปีที่ 4 (ม.4)</p>
              <p className={`text-xs mt-0.5 ${data.level === "m4" ? "text-brand-gray-300" : "text-brand-gray-500"}`}>
                ผู้สำเร็จการศึกษาชั้น ม.3
              </p>
            </div>
            <span
              className={`text-xs font-bold px-2 py-1 rounded-md ${
                data.level === "m4"
                  ? "bg-brand-gold-500 text-brand-gray-950"
                  : "bg-brand-gray-100 text-brand-gray-600"
              }`}
            >
              6 แผนการเรียน
            </span>
          </button>
        </div>
      </div>

      {/* 2. Program Selection (Rank 1 & 2) */}
      <div className="rounded-2xl bg-white p-6 border border-brand-gray-200/90 shadow-xs space-y-6">
        <div className="flex items-center gap-2">
          <Award className="h-5 w-5 text-brand-gold-600" />
          <h3 className="text-base font-bold text-brand-gray-900">
            2. เลือกอันดับแผนการเรียน
          </h3>
        </div>

        {/* Primary Program */}
        <div className="space-y-2">
          <label className="block text-xs font-bold text-brand-gray-800 uppercase tracking-wide">
            แผนการเรียนที่เลือกอันดับที่ 1 (อันดับหลัก) <span className="text-rose-500">*</span>
          </label>
          <select
            value={data.primaryProgram}
            onChange={(e) => updateData({ primaryProgram: e.target.value })}
            className="w-full rounded-xl border border-brand-gray-300 bg-white p-3 text-sm font-medium text-brand-gray-900 focus:border-brand-gold-500 focus:ring-2 focus:ring-brand-gold-400 focus:outline-none"
          >
            {currentPrograms.map((p) => (
              <option key={p.id} value={p.id}>
                {p.name} {p.type === "special" ? "(เกณฑ์ GPAX ≥ " + p.minGpax.toFixed(2) + ")" : ""}
              </option>
            ))}
          </select>
        </div>

        {/* Secondary Program */}
        <div className="space-y-2">
          <label className="block text-xs font-bold text-brand-gray-800 uppercase tracking-wide">
            แผนการเรียนที่เลือกอันดับที่ 2 (สำรอง)
          </label>
          <select
            value={data.secondaryProgram}
            onChange={(e) => updateData({ secondaryProgram: e.target.value })}
            className="w-full rounded-xl border border-brand-gray-300 bg-white p-3 text-sm font-medium text-brand-gray-900 focus:border-brand-gold-500 focus:ring-2 focus:ring-brand-gold-400 focus:outline-none"
          >
            <option value="">-- ไม่ประสงค์เลือกอันดับสำรอง --</option>
            {currentPrograms
              .filter((p) => p.id !== data.primaryProgram)
              .map((p) => (
                <option key={p.id} value={p.id}>
                  {p.name}
                </option>
              ))}
          </select>
        </div>
      </div>

      {/* 3. GPAX Input & Instant Verification */}
      <div className="rounded-2xl bg-white p-6 border border-brand-gray-200/90 shadow-xs space-y-4">
        <h3 className="text-base font-bold text-brand-gray-900">
          3. ผลการเรียนเฉลี่ยสะสม (GPAX)
        </h3>
        <p className="text-xs text-brand-gray-500">
          กรอกเกรดเฉลี่ยตามที่ระบุในระเบียนแสดงผลการเรียน (ปพ.1) รวม 5 ภาคเรียน
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-1">
          <div className="space-y-1.5">
            <label className="block text-xs font-semibold text-brand-gray-700">
              เกรดเฉลี่ยสะสมรวม (GPAX 5 ภาคเรียน) <span className="text-rose-500">*</span>
            </label>
            <input
              type="number"
              step="0.01"
              min="0.00"
              max="4.00"
              required
              placeholder="เช่น 3.65"
              value={data.gpax}
              onChange={(e) => updateData({ gpax: e.target.value })}
              className="w-full rounded-xl border border-brand-gray-300 p-3 text-sm font-medium text-brand-gray-900 focus:border-brand-gold-500 focus:ring-2 focus:ring-brand-gold-400 focus:outline-none"
            />
          </div>

          <div className="space-y-1.5">
            <label className="block text-xs font-semibold text-brand-gray-700">
              เกรดเฉลี่ยกลุ่มสาระวิทย์-คณิต (ถ้ามี)
            </label>
            <input
              type="number"
              step="0.01"
              min="0.00"
              max="4.00"
              placeholder="เช่น 3.50 (ใช้สำหรับ SMTP)"
              value={data.gpaxMathSci || ""}
              onChange={(e) => updateData({ gpaxMathSci: e.target.value })}
              className="w-full rounded-xl border border-brand-gray-300 p-3 text-sm font-medium text-brand-gray-900 focus:border-brand-gold-500 focus:ring-2 focus:ring-brand-gold-400 focus:outline-none"
            />
          </div>
        </div>

        {/* Dynamic Criteria Feedback */}
        {data.gpax && isGpaxValid && primarySelected && (
          <div
            className={`mt-4 flex items-start gap-3 rounded-xl p-3.5 border ${
              meetsMinGpax
                ? "bg-emerald-50 border-emerald-300 text-emerald-900"
                : "bg-amber-50 border-amber-300 text-amber-900"
            }`}
          >
            {meetsMinGpax ? (
              <CheckCircle2 className="h-5 w-5 text-emerald-600 shrink-0 mt-0.5" />
            ) : (
              <AlertCircle className="h-5 w-5 text-amber-600 shrink-0 mt-0.5" />
            )}
            <div className="text-xs leading-relaxed">
              {meetsMinGpax ? (
                <>
                  <p className="font-bold">ผ่านเกณฑ์คุณสมบัติเบื้องต้น!</p>
                  <p className="mt-0.5">
                    เกรดเฉลี่ยของคุณ ({data.gpax}) ผ่านเกณฑ์ขั้นต่ำของ {primarySelected.name}{" "}
                    (เกณฑ์กำหนด ≥ {primarySelected.minGpax.toFixed(2)})
                  </p>
                </>
              ) : (
                <>
                  <p className="font-bold">เกรดเฉลี่ยต่ำกว่าเกณฑ์ขั้นต่ำของแผนการเรียนนี้</p>
                  <p className="mt-0.5">
                    {primarySelected.name} กำหนดเกรดเฉลี่ยขั้นต่ำ ≥{" "}
                    {primarySelected.minGpax.toFixed(2)} แต่เกรดเฉลี่ยของคุณคือ {data.gpax}{" "}
                    คุณยังสามารถยื่นใบสมัครได้ หรือพิจารณาเลือกแผนการเรียนปกติที่มีเกณฑ์รองรับ
                  </p>
                </>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Form Action */}
      <div className="flex justify-end pt-4">
        <button
          type="submit"
          className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-brand-gold-500 to-brand-gold-600 px-7 py-3.5 text-sm font-bold text-brand-gray-950 shadow-md hover:from-brand-gold-400 hover:to-brand-gold-500 transition-all hover:-translate-y-0.5 active:translate-y-0"
        >
          <span>ถัดไป: กรอกข้อมูลส่วนตัว</span>
          <ArrowRight className="h-4 w-4" />
        </button>
      </div>
    </form>
  );
}
