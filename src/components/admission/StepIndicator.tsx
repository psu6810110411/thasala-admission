"use client";

import { Check } from "lucide-react";

interface StepIndicatorProps {
  currentStep: number; // 1 to 4
  onStepClick?: (step: number) => void;
}

const steps = [
  { number: 1, title: "แผนการเรียน", subtitle: "เลือกหลักสูตรที่ต้องการ" },
  { number: 2, title: "ข้อมูลส่วนตัว", subtitle: "ประวัติผู้สมัครและครอบครัว" },
  { number: 3, title: "แนบเอกสาร", subtitle: "ปพ.1 และรูปถ่าย" },
  { number: 4, title: "ยืนยันข้อมูล", subtitle: "ตรวจสอบและส่งใบสมัคร" },
];

export function StepIndicator({ currentStep, onStepClick }: StepIndicatorProps) {
  return (
    <div className="mb-8">
      {/* Mobile Progress Bar */}
      <div className="sm:hidden mb-4">
        <div className="flex items-center justify-between text-xs font-bold text-brand-gray-700 mb-1.5">
          <span>ขั้นตอนที่ {currentStep} จาก 4</span>
          <span className="text-brand-gold-700">{steps[currentStep - 1].title}</span>
        </div>
        <div className="h-2 w-full rounded-full bg-brand-gray-200 overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-brand-gold-500 to-brand-gold-600 transition-all duration-300 rounded-full"
            style={{ width: `${(currentStep / 4) * 100}%` }}
          ></div>
        </div>
      </div>

      {/* Desktop Step Indicator */}
      <div className="hidden sm:grid grid-cols-4 gap-4">
        {steps.map((step) => {
          const isCompleted = step.number < currentStep;
          const isCurrent = step.number === currentStep;

          return (
            <div
              key={step.number}
              onClick={() => {
                if (isCompleted && onStepClick) onStepClick(step.number);
              }}
              className={`flex items-center gap-3 rounded-2xl p-3 border transition-all duration-200 ${
                isCompleted ? "cursor-pointer" : ""
              } ${
                isCurrent
                  ? "bg-white border-brand-gold-500 shadow-sm ring-2 ring-brand-gold-400/20"
                  : isCompleted
                  ? "bg-brand-gray-50 border-brand-gray-200 hover:bg-white"
                  : "bg-brand-gray-50/50 border-brand-gray-200/60 opacity-60"
              }`}
            >
              <div
                className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-xl font-bold text-xs transition-colors ${
                  isCompleted
                    ? "bg-emerald-600 text-white"
                    : isCurrent
                    ? "bg-brand-gold-500 text-brand-gray-950 shadow-xs"
                    : "bg-brand-gray-200 text-brand-gray-600"
                }`}
              >
                {isCompleted ? <Check className="h-4 w-4 stroke-[3]" /> : step.number}
              </div>
              <div className="min-w-0">
                <p
                  className={`text-xs font-bold truncate ${
                    isCurrent ? "text-brand-gray-950" : "text-brand-gray-700"
                  }`}
                >
                  {step.title}
                </p>
                <p className="text-[11px] text-brand-gray-400 truncate mt-0.5">
                  {step.subtitle}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
