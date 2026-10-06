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
import { Sparkles } from "lucide-react";
import { ProgramSelector } from "./ProgramSelector";
import { GradeInputs } from "./GradeInputs";
import { ReadinessDashboard } from "./ReadinessDashboard";

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
          <ProgramSelector
            level={level}
            selectedProgram={selectedProgram}
            onLevelChange={handleLevelChange}
            onProgramChange={setSelectedProgram}
          />

          <GradeInputs
            grades={grades}
            onGradeChange={handleGradeChange}
            onQuickPreset={handleQuickPreset}
            formulaWeights={currentFormula.weights}
          />
        </div>

        {/* Right Column: Result & Readiness Dashboard (5 cols) */}
        <div className="lg:col-span-5 space-y-6">
          <ReadinessDashboard
            result={result}
            onApplyWithScore={handleApplyWithScore}
          />
        </div>
      </div>
    </div>
  );
}
