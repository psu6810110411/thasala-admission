import { Suspense } from "react";
import { Metadata } from "next";
import { ScoreCalculator } from "@/components/calculator/ScoreCalculator";

export const metadata: Metadata = {
  title: "คำนวณคะแนน & ประเมินโอกาสสอบติด | โรงเรียนท่าศาลาประสิทธิ์ศึกษา",
  description:
    "ระบบจำลองคะแนนถ่วงน้ำหนักและประเมินความพร้อมก่อนสมัครเรียน ม.1 และ ม.4 โรงเรียนท่าศาลาประสิทธิ์ศึกษา",
};

export default function CalculatorPage() {
  return (
    <div className="py-10 sm:py-16 px-4 sm:px-6 lg:px-8">
      <Suspense
        fallback={
          <div className="max-w-4xl mx-auto text-center py-20 text-brand-gray-500">
            <span className="inline-block h-6 w-6 animate-spin rounded-full border-2 border-brand-gold-500 border-t-transparent mb-2"></span>
            <p className="text-xs">กำลังโหลดระบบคำนวณคะแนน...</p>
          </div>
        }
      >
        <ScoreCalculator />
      </Suspense>
    </div>
  );
}
