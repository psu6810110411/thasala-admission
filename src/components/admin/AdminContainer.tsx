"use client";

import { useState, useEffect } from "react";
import { SubmittedApplication } from "@/types/admission";
import { fetchAllApplicants, updateApplicantStatus } from "@/lib/admin";
import { supabase } from "@/lib/supabase";
import { AdminStatsOverview } from "./AdminStatsOverview";
import { ApplicantTable } from "./ApplicantTable";
import { VerificationModal } from "./VerificationModal";
import { Download, RefreshCw, ShieldCheck } from "lucide-react";

export function AdminContainer() {
  const [applicants, setApplicants] = useState<SubmittedApplication[]>([]);
  const [selectedApplicant, setSelectedApplicant] = useState<SubmittedApplication | null>(null);
  const [loading, setLoading] = useState(true);

  const loadApplicants = async () => {
    setLoading(true);
    const data = await fetchAllApplicants();
    setApplicants(data);
    setLoading(false);
  };

  useEffect(() => {
    loadApplicants();

    // Supabase Real-time Subscription
    const channel = supabase
      .channel("public:applicants")
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "applicants" },
        (payload) => {
          console.log("Realtime update:", payload);
          loadApplicants(); // Reload on any change to keep it simple and in sync
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  const handleApprove = async (appNo: string) => {
    try {
      await updateApplicantStatus(appNo, "approved");
      // UI will update automatically via realtime subscription, 
      // but we can also update optimistic UI:
      setApplicants((prev) =>
        prev.map((a) => (a.applicationNo === appNo ? { ...a, status: "approved" as const } : a))
      );
      setSelectedApplicant(null);
    } catch (e) {
      alert("เกิดข้อผิดพลาดในการบันทึกข้อมูล");
    }
  };

  const handleReject = async (appNo: string, reason: string) => {
    try {
      await updateApplicantStatus(appNo, "action_required");
      setApplicants((prev) =>
        prev.map((a) =>
          a.applicationNo === appNo ? { ...a, status: "action_required" as const } : a
        )
      );
      setSelectedApplicant(null);
    } catch (e) {
      alert("เกิดข้อผิดพลาดในการบันทึกข้อมูล");
    }
  };

  // Export to CSV with UTF-8 BOM for Excel in Thai
  const handleExportCSV = () => {
    const headers = [
      "รหัสใบสมัคร",
      "ระดับชั้น",
      "แผนการเรียน",
      "คำนำหน้า",
      "ชื่อ",
      "นามสกุล",
      "เลขประจำตัวประชาชน",
      "GPAX",
      "โรงเรียนเดิม",
      "เบอร์โทรศัพท์",
      "ชื่อผู้ปกครอง",
      "เบอร์โทรผู้ปกครอง",
      "สถานะเอกสาร",
    ];

    const rows = applicants.map((a) => [
      `"${a.applicationNo}"`,
      `"${a.level === "m1" ? "ม.1" : "ม.4"}"`,
      `"${a.primaryProgram}"`,
      `"${a.title}"`,
      `"${a.firstNameTh}"`,
      `"${a.lastNameTh}"`,
      `"'${a.citizenId}"`, // single quote prevents Excel scientific notation
      `"${a.gpax}"`,
      `"${a.previousSchool}"`,
      `"'${a.phone}"`,
      `"${a.parentFullName}"`,
      `"'${a.parentPhone}"`,
      `"${a.status === "approved" ? "อนุมัติแล้ว" : a.status === "action_required" ? "ต้องแก้ไข" : "รอตรวจสอบ"}"`,
    ]);

    const csvContent = "\uFEFF" + [headers.join(","), ...rows.map((r) => r.join(","))].join("\n");
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", `รายชื่อผู้สมัคร_รร.ท่าศาลาประสิทธิ์ศึกษา_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="space-y-8 max-w-7xl mx-auto">
      {/* Admin Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <ShieldCheck className="h-5 w-5 text-brand-gold-600" />
            <span className="text-xs font-bold text-brand-gold-700 uppercase tracking-wider">
              แผงควบคุมฝ่ายรับสมัครและทะเบียน
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-brand-gray-900 tracking-tight mt-1">
            ระบบตรวจสอบเอกสาร &amp; บัญชีรายชื่อผู้สมัคร
          </h1>
          <p className="text-xs sm:text-sm text-brand-gray-500 mt-0.5">
            โรงเรียนท่าศาลาประสิทธิ์ศึกษา &bull; ประจำปีการศึกษา 2569
          </p>
        </div>

        {/* Export & Refresh Buttons */}
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={loadApplicants}
            disabled={loading}
            className="inline-flex items-center gap-2 rounded-xl border border-brand-gray-200 bg-white px-4 py-3 text-xs sm:text-sm font-bold text-brand-gray-700 hover:bg-brand-gray-50 transition-all shadow-sm"
          >
            <RefreshCw className={`h-4 w-4 ${loading ? "animate-spin" : ""}`} />
            <span className="hidden sm:inline">รีเฟรช</span>
          </button>
          
          <button
            type="button"
            onClick={handleExportCSV}
            className="inline-flex items-center gap-2 rounded-xl bg-brand-gray-900 px-5 py-3 text-xs sm:text-sm font-bold text-brand-gold-400 hover:bg-brand-gray-800 transition-all shadow-sm"
          >
            <Download className="h-4 w-4" />
            <span>ส่งออกรายงาน Excel (CSV)</span>
          </button>
        </div>
      </div>

      {/* Stats Overview */}
      <AdminStatsOverview applicants={applicants} />

      {/* Candidate List Table */}
      <div className={loading ? "opacity-50 pointer-events-none transition-opacity" : "transition-opacity"}>
        <ApplicantTable
          applicants={applicants}
          onSelectApplicant={(app) => setSelectedApplicant(app)}
        />
      </div>

      {/* Side-by-Side Verification Modal */}
      {selectedApplicant && (
        <VerificationModal
          application={selectedApplicant}
          onClose={() => setSelectedApplicant(null)}
          onApprove={handleApprove}
          onReject={handleReject}
        />
      )}
    </div>
  );
}
