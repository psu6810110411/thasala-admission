import { CalculationResult } from "@/lib/calculator";
import {
  CheckCircle2,
  AlertTriangle,
  ArrowRight,
  BarChart3,
  HelpCircle,
} from "lucide-react";

interface ReadinessDashboardProps {
  result: CalculationResult;
  onApplyWithScore: () => void;
}

export function ReadinessDashboard({
  result,
  onApplyWithScore,
}: ReadinessDashboardProps) {
  return (
    <div className="space-y-6">
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
          onClick={onApplyWithScore}
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
  );
}
