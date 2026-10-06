import { SubjectGrades } from "@/lib/calculator";
import { RotateCcw } from "lucide-react";

interface GradeInputsProps {
  grades: SubjectGrades;
  onGradeChange: (field: keyof SubjectGrades, value: string) => void;
  onQuickPreset: (preset: number) => void;
  formulaWeights: {
    science: number;
    math: number;
    english: number;
    thai: number;
  };
}

export function GradeInputs({
  grades,
  onGradeChange,
  onQuickPreset,
  formulaWeights,
}: GradeInputsProps) {
  return (
    <>
      {/* Quick Presets */}
      <div className="pt-2 border-t border-brand-gray-100">
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs font-semibold text-brand-gray-500">
            ทางลัดทดลองเกรด:
          </span>
          <button
            type="button"
            onClick={() => onQuickPreset(3.5)}
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
              onClick={() => onQuickPreset(preset)}
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
              onChange={(e) => onGradeChange("gpax", e.target.value)}
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
                น้ำหนัก {formulaWeights.science}%
              </span>
            </div>
            <input
              type="number"
              step="0.01"
              min="0"
              max="4.00"
              value={grades.science || ""}
              onChange={(e) => onGradeChange("science", e.target.value)}
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
                น้ำหนัก {formulaWeights.math}%
              </span>
            </div>
            <input
              type="number"
              step="0.01"
              min="0"
              max="4.00"
              value={grades.math || ""}
              onChange={(e) => onGradeChange("math", e.target.value)}
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
                น้ำหนัก {formulaWeights.english}%
              </span>
            </div>
            <input
              type="number"
              step="0.01"
              min="0"
              max="4.00"
              value={grades.english || ""}
              onChange={(e) => onGradeChange("english", e.target.value)}
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
                น้ำหนัก {formulaWeights.thai}%
              </span>
            </div>
            <input
              type="number"
              step="0.01"
              min="0"
              max="4.00"
              value={grades.thai || ""}
              onChange={(e) => onGradeChange("thai", e.target.value)}
              className="w-full text-right font-bold text-sm border border-brand-gray-200 rounded-lg px-2 py-1.5 focus:border-brand-gold-500 focus:ring-1 focus:ring-brand-gold-500 outline-none"
            />
          </div>
        </div>
      </div>
    </>
  );
}
