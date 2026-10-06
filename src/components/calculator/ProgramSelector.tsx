import { PROGRAMS_M1, PROGRAMS_M4 } from "@/lib/constants";
import { EducationLevel } from "@/types/admission";

interface ProgramSelectorProps {
  level: EducationLevel;
  selectedProgram: string;
  onLevelChange: (level: EducationLevel) => void;
  onProgramChange: (programId: string) => void;
}

export function ProgramSelector({
  level,
  selectedProgram,
  onLevelChange,
  onProgramChange,
}: ProgramSelectorProps) {
  const availablePrograms = level === "m1" ? PROGRAMS_M1 : PROGRAMS_M4;

  return (
    <div className="space-y-4">
      <label className="block text-sm font-bold text-brand-gray-900">
        1. เลือกระดับชั้นและโครงการที่ต้องการประเมิน
      </label>

      {/* Level Tabs */}
      <div className="flex p-1 bg-brand-gray-100 rounded-xl border border-brand-gray-200/60">
        <button
          type="button"
          onClick={() => onLevelChange("m1")}
          className={`flex-1 py-2 text-sm font-bold rounded-lg transition-all ${
            level === "m1"
              ? "bg-white text-brand-gray-900 shadow-sm"
              : "text-brand-gray-500 hover:text-brand-gray-700"
          }`}
        >
          ม.1 (M.1)
        </button>
        <button
          type="button"
          onClick={() => onLevelChange("m4")}
          className={`flex-1 py-2 text-sm font-bold rounded-lg transition-all ${
            level === "m4"
              ? "bg-white text-brand-gray-900 shadow-sm"
              : "text-brand-gray-500 hover:text-brand-gray-700"
          }`}
        >
          ม.4 (M.4)
        </button>
      </div>

      {/* Program Grid */}
      <div className="grid grid-cols-1 gap-2.5">
        {availablePrograms.map((p) => {
          const isSelected = selectedProgram === p.id;
          return (
            <div
              key={p.id}
              onClick={() => onProgramChange(p.id)}
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
  );
}
