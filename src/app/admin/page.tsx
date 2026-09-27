import { Suspense } from "react";
import { Metadata } from "next";
import { AdminContainer } from "@/components/admin/AdminContainer";

export const metadata: Metadata = {
  title: "ระบบหลังบ้านฝ่ายรับนักเรียน | โรงเรียนท่าศาลาประสิทธิ์ศึกษา",
  description: "แผงควบคุมฝ่ายวิชาการและทะเบียน สำหรับตรวจสอบเอกสาร อนุมัติสิทธิ์สอบ และส่งออกข้อมูลผู้สมัคร",
};

export default function AdminPage() {
  return (
    <div className="py-8 sm:py-12 px-4 sm:px-6 lg:px-8">
      <Suspense
        fallback={
          <div className="max-w-7xl mx-auto text-center py-20 text-brand-gray-500">
            <span className="inline-block h-6 w-6 animate-spin rounded-full border-2 border-brand-gold-500 border-t-transparent mb-2"></span>
            <p className="text-xs">กำลังโหลดแผงควบคุมฝ่ายรับสมัคร...</p>
          </div>
        }
      >
        <AdminContainer />
      </Suspense>
    </div>
  );
}
