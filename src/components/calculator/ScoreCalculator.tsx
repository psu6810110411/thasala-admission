"use client";

import { useState, useMemo } from "react";
import { useRouter } from "next/navigation";
import {
  PROGRAMS_M1,
  PROGRAMS_M4,
  DRAFT_STORAGE_KEY,
  INITIAL_FORM_DATA,
} from "@/lib/constants";
import {
  PROGRAM_FORMULAS,
  calculateReadiness,
  SubjectGrades,
} from "@/lib/calculator";
import { EducationLevel } from "@/types/admission";
import {
  Calculator,
  CheckCircle2,
  AlertTriangle,
  ArrowRight,
  Sparkles,
  BarChart3,
  HelpCircle,
  RotateCcw,
} from "lucide-react";

export function ScoreCalculator() {
  const router = useRouter();
  const [level, setLevel] = useState<EducationLevel>("m1");
  const [selectedProgram, setSelectedProgram] = useState<string>("m1-smtp");

  // Subject Grades State
  const [grades, setGrades] = useState<SubjectGrades>({
    gpax: 3.5,
    science: 3.5,
    math: 3.5,
    english: 3.5,
    thai: 3.5,
  });

  // Available programs for current level
  const availablePrograms = level === "m1" ? PROGRAMS_M1 : PROGRAMS_M4;
  const currentFormula = PROGRAM_FORMULAS[selectedProgram] || PROGRAM_FORMULAS["m1-smtp"];

  // Handle Level Switch
  const handleLevelChange = (newLevel: EducationLevel) => {
    setLevel(newLevel);
    if (newLevel === "m1") {
      setSelectedProgram("m1-smtp");
    } else {
      setSelectedProgram("m4-smtp");
    }
  };

  // Grade Input Handler
  const handleGradeChange = (field: keyof SubjectGrades, value: string) => {
    const num = parseFloat(value);
    if (isNaN(num)) {
      setGrades((prev) => ({ ...prev, [field]: 0 }));
    } else {
      const clamped = Math.min(4.0, Math.max(0, num));
      setGrades((prev) => ({ ...prev, [field]: clamped }));
    }
  };

  // Preset quick fill
  const handleQuickPreset = (presetGrade: number) => {
    setGrades({
      gpax: presetGrade,
      science: presetGrade,
      math: presetGrade,
      english: presetGrade,
      thai: presetGrade,
    });
  };

  // Calculation Result
  const result = useMemo(() => {
    return calculateReadiness(selectedProgram, grades);
  }, [selectedProgram, grades]);

  // Transfer grade to Application Form
  const handleApplyWithScore = () => {
    try {
      const existingDraft = localStorage.getItem(DRAFT_STORAGE_KEY);
      let draft = existingDraft ? JSON.parse(existingDraft) : { ...INITIAL_FORM_DATA };

      draft = {
        ...draft,
        level,
        primaryProgram: selectedProgram,
        gpax: grades.gpax.toFixed(2),
        gpaxMathSci: ((grades.math + grades.science) / 2).toFixed(2),
      };

      localStorage.setItem(DRAFT_STORAGE_KEY, JSON.stringify(draft));
      router.push(`/apply?level=${level}&program=${selectedProgram}`);
    } catch {
      router.push(`/apply?level=${level}&program=${selectedProgram}`);
    }
  };

  return (
    <div className="mx-auto max-w-5xl">
      {/* Header */}
      <div className="text-center mb-8 sm:mb-12">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-brand-gold-50 border border-brand-gold-200 text-brand-gold-800 text-xs font-semibold mb-3">
          <Sparkles className="h-3.5 w-3.5 text-brand-gold-600" />
          ระบบจำลองคะแนน & ประเมินความพร้อม
        </div>
        <h1 className="text-2xl sm:text-4xl font-bold text-brand-gray-900 tracking-tight">
          คำนวณคะแนน & ประเมินโอกาสสอบติด
        </h1>
        <p className="mt-2.5 text-sm sm:text-base text-brand-gray-600 max-w-2xl mx-auto">
          ทดลองใส่ผลการเรียนเฉลี่ยรายวิชาเพื่อจำลองคะแนนถ่วงน้ำหนักตามสูตรจริงของแต่ละโครงการโรงเรียนท่าศาลาประสิทธิ์ศึกษา
        </p>
      </div>

      {/* Level Selection Tabs */}
      <div className="flex justify-center mb-8">
        <div className="inline-flex p-1.5 rounded-2xl bg-brand-gray-100 border border-brand-gray-200">
          <button
            type="button"
            onClick={() => handleLevelChange("m1")}
            className={`px-6 py-2.5 rounded-xl text-sm font-bold transition-all ${
              level === "m1"
                ? "bg-white text-brand-gray-900 shadow-sm"
                : "text-brand-gray-600 hover:text-brand-gray-900"
            }`}
          >
            ระดับชั้น มัธยมศึกษาปีที่ 1 (ม.1)
          </button>
          <button
            type="button"
            onClick={() => handleLevelChange("m4")}
            className={`px-6 py-2.5 rounded-xl text-sm font-bold transition-all ${
              level === "m4"
                ? "bg-white text-brand-gray-900 shadow-sm"
                : "text-brand-gray-600 hover:text-brand-gray-900"
            }`}
          >
            ระดับชั้น มัธยมศึกษาปีที่ 4 (ม.4)
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Form & Inputs (7 cols) */}
        <div className="lg:col-span-7 bg-white rounded-3xl border border-brand-gray-200 p-6 sm:p-8 shadow-sm space-y-6">
          {/* Program Select */}
          <div>
            <label className="block text-sm font-bold text-brand-gray-900 mb-2">
              1. เลือกแผนการเรียนที่สนใจคำนวณ
            </label>
            <div className="space-y-2.5">
              {availablePrograms.map((p) => {
                const isSelected = selectedProgram === p.id;
                return (
                  <div
                    key={p.id}
                    onClick={() => setSelectedProgram(p.id)}
                    className={`cursor-pointer rounded-xl border p-3.5 transition-all flex items-center justify-between ${
                      isSelected
                        ? "border-brand-gold-500 bg-brand-gold-50/40 ring-1 ring-brand-gold-400"
                        : "border-brand-gray-200 hover:border-brand-gray-300 bg-white"
                    }`}
                  >
                    <div>
                      <div className="text-sm font-bold text-brand-gray-900">
                        {p.name}
                      </div>
                      <div className="text-xs text-brand-gray-500 mt-0.5">
                        เกณฑ์ GPAX ขั้นต่ำ:{" "}
                        <span className="font-semibold text-brand-gray-700">
                          {p.minGpax.toFixed(2)}
                        </span>
                      </div>
                    </div>
                    <span
                      className={`text-xs px-2.5 py-1 rounded-md font-medium ${
                        p.type === "special"
                          ? "bg-brand-gold-100 text-brand-gold-800"
                          : "bg-brand-gray-100 text-brand-gray-700"
                      }`}
                    >
                      {p.type === "special" ? "ห้องเรียนพิเศษ" : "ห้องเรียนปกติ"}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Quick Presets */}
          <div className="pt-2 border-t border-brand-gray-100">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-semibold text-brand-gray-500">
                ทางลัดทดลองเกรด:
              </span>
              <button
                type="button"
                onClick={() => handleQuickPreset(3.5)}
                className="text-xs text-brand-gold-700 hover:underline flex items-center gap-1"
              >
                <RotateCcw className="h-3 w-3" /> รีเซ็ตเป็น 3.50
              </button>
            </div>
            <div className="flex flex-wrap gap-2">
              {[4.0, 3.75, 3.5, 3.25, 3.0, 2.75].map((preset) => (
                <button
                  key={preset}
                  type="button"
                  onClick={() => handleQuickPreset(preset)}
                  className="px-3 py-1 rounded-lg text-xs font-semibold bg-brand-gray-100 hover:bg-brand-gold-100 hover:text-brand-gold-800 transition-colors text-brand-gray-700"
                >
                  {preset.toFixed(2)}
                </button>
              ))}
            </div>
          </div>

          {/* Subject Grade Inputs */}
          <div className="space-y-4 pt-2 border-t border-brand-gray-100">
            <label className="block text-sm font-bold text-brand-gray-900">
              2. กรอกผลการเรียนเฉลี่ยรายกลุ่มสาระ (0.00 - 4.00)
            </label>

            {/* GPAX Total */}
            <div className="bg-brand-gray-50/80 p-3.5 rounded-xl border border-brand-gray-200 flex items-center justify-between">
              <div>
                <span className="text-sm font-bold text-brand-gray-900 block">
                  เกรดเฉลี่ยสะสม (GPAX)
                </span>
                <span className="text-xs text-brand-gray-500">
                  รวมทุกกลุ่มสาระการเรียนรู้
                </span>
              </div>
              <div className="w-28">
                <input
                  type="number"
                  step="0.01"
                  min="0"
                  max="4.00"
                  value={grades.gpax || ""}
                  onChange={(e) => handleGradeChange("gpax", e.target.value)}
                  className="w-full text-right font-bold text-base bg-white border border-brand-gray-300 rounded-lg px-2.5 py-1.5 focus:border-brand-gold-500 focus:ring-1 focus:ring-brand-gold-500 outline-none"
                />
              </div>
            </div>

            {/* Individual Subjects */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
              {/* Science */}
              <div className="p-3 rounded-xl border border-brand-gray-200 bg-white">
                <div className="flex justify-between items-center mb-1.5">
                  <span className="text-xs font-bold text-brand-gray-800">
                    วิทยาศาสตร์
                  </span>
                  <span className="text-[11px] font-medium text-brand-gold-700 bg-brand-gold-50 px-1.5 py-0.5 rounded">
                    น้ำหนัก {currentFormula.weights.science}%
                  </span>
                </div>
                <input
                  type="number"
                  step="0.01"
                  min="0"
                  max="4.00"
                  value={grades.science || ""}
                  onChange={(e) => handleGradeChange("science", e.target.value)}
                  className="w-full text-right font-bold text-sm border border-brand-gray-200 rounded-lg px-2 py-1.5 focus:border-brand-gold-500 focus:ring-1 focus:ring-brand-gold-500 outline-none"
                />
              </div>

              {/* Math */}
              <div className="p-3 rounded-xl border border-brand-gray-200 bg-white">
                <div className="flex justify-between items-center mb-1.5">
                  <span className="text-xs font-bold text-brand-gray-800">
                    คณิตศาสตร์
                  </span>
                  <span className="text-[11px] font-medium text-brand-gold-700 bg-brand-gold-50 px-1.5 py-0.5 rounded">
                    น้ำหนัก {currentFormula.weights.math}%
                  </span>
                </div>
                <input
                  type="number"
                  step="0.01"
                  min="0"
                  max="4.00"
                  value={grades.math || ""}
                  onChange={(e) => handleGradeChange("math", e.target.value)}
                  className="w-full text-right font-bold text-sm border border-brand-gray-200 rounded-lg px-2 py-1.5 focus:border-brand-gold-500 focus:ring-1 focus:ring-brand-gold-500 outline-none"
                />
              </div>

              {/* English */}
              <div className="p-3 rounded-xl border border-brand-gray-200 bg-white">
                <div className="flex justify-between items-center mb-1.5">
                  <span className="text-xs font-bold text-brand-gray-800">
                    ภาษาอังกฤษ
                  </span>
                  <span className="text-[11px] font-medium text-brand-gold-700 bg-brand-gold-50 px-1.5 py-0.5 rounded">
                    น้ำหนัก {currentFormula.weights.english}%
                  </span>
                </div>
                <input
                  type="number"
                  step="0.01"
                  min="0"
                  max="4.00"
                  value={grades.english || ""}
                  onChange={(e) => handleGradeChange("english", e.target.value)}
                  className="w-full text-right font-bold text-sm border border-brand-gray-200 rounded-lg px-2 py-1.5 focus:border-brand-gold-500 focus:ring-1 focus:ring-brand-gold-500 outline-none"
                />
              </div>

              {/* Thai */}
              <div className="p-3 rounded-xl border border-brand-gray-200 bg-white">
                <div className="flex justify-between items-center mb-1.5">
                  <span className="text-xs font-bold text-brand-gray-800">
                    ภาษาไทย
                  </span>
                  <span className="text-[11px] font-medium text-brand-gold-700 bg-brand-gold-50 px-1.5 py-0.5 rounded">
                    น้ำหนัก {currentFormula.weights.thai}%
                  </span>
                </div>
                <input
                  type="number"
                  step="0.01"
                  min="0"
                  max="4.00"
                  value={grades.thai || ""}
                  onChange={(e) => handleGradeChange("thai", e.target.value)}
                  className="w-full text-right font-bold text-sm border border-brand-gray-200 rounded-lg px-2 py-1.5 focus:border-brand-gold-500 focus:ring-1 focus:ring-brand-gold-500 outline-none"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Result & Readiness Dashboard (5 cols) */}
        <div className="lg:col-span-5 space-y-6">
          {/* Main Score Card */}
          <div className="bg-white rounded-3xl border border-brand-gray-200 p-6 sm:p-8 shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <span className="text-xs font-bold text-brand-gray-500 uppercase tracking-wider">
                คะแนนถ่วงน้ำหนักรวม
              </span>
              <span className="inline-flex items-center gap-1 text-xs text-brand-gray-500">
                <BarChart3 className="h-3.5 w-3.5" />
                เต็ม 100 คะแนน
              </span>
            </div>

            {/* Score Big Display */}
            <div className="flex items-baseline gap-2 mb-4">
              <span className="text-5xl sm:text-6xl font-black text-brand-gray-900 tracking-tight">
                {result.score.toFixed(1)}
              </span>
              <span className="text-lg font-bold text-brand-gray-400">/ 100</span>
            </div>

            {/* Readiness Bar */}
            <div className="mb-4">
              <div className="h-3.5 w-full bg-brand-gray-100 rounded-full overflow-hidden p-0.5">
                <div
                  className={`h-full rounded-full transition-all duration-500 ${
                    result.score >= 80
                      ? "bg-emerald-500"
                      : result.score >= 65
                      ? "bg-brand-gold-500"
                      : result.score >= 50
                      ? "bg-amber-500"
                      : "bg-rose-500"
                  }`}
                  style={{ width: `${Math.max(5, result.score)}%` }}
                />
              </div>
            </div>

            {/* Readiness Badge */}
            <div
              className={`p-3 rounded-xl border text-xs sm:text-sm font-semibold flex items-center gap-2 mb-5 ${result.readinessColor}`}
            >
              {result.isEligible ? (
                <CheckCircle2 className="h-4 w-4 shrink-0" />
              ) : (
                <AlertTriangle className="h-4 w-4 shrink-0" />
              )}
              <span>{result.readinessLabel}</span>
            </div>

            {/* Criteria Check Box */}
            <div className="border-t border-brand-gray-100 pt-4 space-y-2 mb-6">
              <span className="text-xs font-bold text-brand-gray-800 block">
                การตรวจสอบคุณสมบัติเบื้องต้น:
              </span>
              {result.isEligible ? (
                <div className="text-xs text-emerald-700 bg-emerald-50 border border-emerald-100 p-2.5 rounded-lg flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 shrink-0 text-emerald-600" />
                  <span>ผ่านเกณฑ์คุณสมบัติขั้นต่ำของโครงการนี้แล้ว</span>
                </div>
              ) : (
                <div className="text-xs text-rose-700 bg-rose-50 border border-rose-100 p-2.5 rounded-lg space-y-1">
                  <div className="font-semibold flex items-center gap-1.5 text-rose-800">
                    <AlertTriangle className="h-3.5 w-3.5 shrink-0" />
                    <span>ไม่ผ่านเกณฑ์บางข้อ:</span>
                  </div>
                  <ul className="list-disc list-inside space-y-0.5 text-[11px]">
                    {result.eligibilityIssues.map((issue, idx) => (
                      <li key={idx}>{issue}</li>
                    ))}
                  </ul>
                </div>
              )}
            </div>

            {/* Advice & Tips */}
            <div className="bg-brand-gray-50 rounded-2xl p-4 border border-brand-gray-200/80 mb-6">
              <span className="text-xs font-bold text-brand-gray-700 flex items-center gap-1.5 mb-2">
                <HelpCircle className="h-3.5 w-3.5 text-brand-gold-600" />
                คำแนะนำและแนวทางพัฒนา
              </span>
              <ul className="space-y-1.5 text-xs text-brand-gray-600">
                {result.advice.map((item, idx) => (
                  <li key={idx} className="flex items-start gap-1.5">
                    <span className="text-brand-gold-600 font-bold">•</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* 1-Click CTA to Apply */}
            <button
              type="button"
              onClick={handleApplyWithScore}
              className="w-full inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-brand-gold-500 to-brand-gold-600 px-5 py-3.5 text-sm font-bold text-brand-gray-950 shadow-sm hover:from-brand-gold-400 hover:to-brand-gold-500 transition-all hover:shadow-md hover:-translate-y-0.5"
            >
              <span>นำคะแนนนี้ไปใช้ในใบสมัครทันที</span>
              <ArrowRight className="h-4 w-4" />
            </button>
            <p className="text-[11px] text-center text-brand-gray-400 mt-2">
              ระบบจะบันทึกเกรดนี้ลงในใบสมัครอัตโนมัติ ไม่ต้องกรอกซ้ำ
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
