import { Suspense } from "react";
import { Metadata } from "next";
import { StatusContainer } from "@/components/status/StatusContainer";

export const metadata: Metadata = {
  title: "ตรวจสอบสถานะการสมัคร & พิมพ์บัตรสอบ | โรงเรียนท่าศาลาประสิทธิ์ศึกษา",
  description: "ตรวจสอบผลการยื่นใบสมัคร นัดสอบสัมภาษณ์ และพิมพ์บัตรประจำตัวผู้เข้าสอบ (PDF Exam Pass)",
};

export default function StatusPage() {
  return (
    <div className="py-10 sm:py-16 px-4 sm:px-6 lg:px-8">
      <Suspense
        fallback={
          <div className="max-w-xl mx-auto text-center py-20 text-brand-gray-500">
            <span className="inline-block h-6 w-6 animate-spin rounded-full border-2 border-brand-gold-500 border-t-transparent mb-2"></span>
            <p className="text-xs">กำลังโหลดระบบตรวจสอบสถานะ...</p>
          </div>
        }
      >
        <StatusContainer />
      </Suspense>
    </div>
  );
}
