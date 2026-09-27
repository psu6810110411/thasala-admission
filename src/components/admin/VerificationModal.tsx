"use client";

import { useState } from "react";
import { SubmittedApplication } from "@/types/admission";
import { PROGRAMS_M1, PROGRAMS_M4 } from "@/lib/constants";
import {
  X,
  CheckCircle2,
  AlertCircle,
  FileText,
  User,
  School,
  Phone,
  Eye,
} from "lucide-react";
import Image from "next/image";

interface VerificationModalProps {
  application: SubmittedApplication;
  onClose: () => void;
  onApprove: (appNo: string) => void;
  onReject: (appNo: string, reason: string) => void;
}

export function VerificationModal({
  application,
  onClose,
  onApprove,
  onReject,
}: VerificationModalProps) {
  const [rejectReason, setRejectReason] = useState("");
  const [showRejectInput, setShowRejectInput] = useState(false);

  const allPrograms = [...PROGRAMS_M1, ...PROGRAMS_M4];
  const prog = allPrograms.find((p) => p.id === application.primaryProgram);

  const handleConfirmReject = () => {
    if (!rejectReason.trim()) {
      alert("กรุณาระบุเหตุผลการส่งกลับแก้ไขเอกสาร");
      return;
    }
    onReject(application.applicationNo, rejectReason.trim());
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-brand-gray-950/60 backdrop-blur-xs overflow-y-auto">
      <div className="relative w-full max-w-5xl rounded-3xl bg-white shadow-2xl border border-brand-gray-200 overflow-hidden my-8">
        {/* Modal Header */}
        <div className="flex items-center justify-between border-b border-brand-gray-200 px-6 py-4 bg-brand-gray-50/80">
          <div className="flex items-center gap-3">
            <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-brand-gray-900 text-brand-gold-400 font-bold text-sm">
              ท.ศ.
            </span>
            <div>
              <h3 className="text-base font-bold text-brand-gray-900">
                ตรวจสอบเอกสาร: {application.title} {application.firstNameTh} {application.lastNameTh}
              </h3>
              <p className="text-xs text-brand-gray-500 font-mono">
                {application.applicationNo} &bull; เลขบัตร ปชช. {application.citizenId}
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="rounded-xl p-2 text-brand-gray-400 hover:text-brand-gray-800 hover:bg-brand-gray-200 transition-colors"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Modal Body: Side-by-Side (Left: Data / Right: Docs) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 divide-y lg:divide-y-0 lg:divide-x divide-brand-gray-200 max-h-[75vh] overflow-y-auto">
          {/* Left Column: Candidate Information (5 cols) */}
          <div className="lg:col-span-5 p-6 space-y-6 bg-brand-gray-50/40">
            {/* Track Info */}
            <div className="space-y-3">
              <span className="text-xs font-bold text-brand-gold-700 uppercase tracking-wider block">
                ข้อมูลการสมัคร
              </span>
              <div className="rounded-xl bg-white p-3.5 border border-brand-gray-200 space-y-2 text-xs">
                <div>
                  <span className="text-brand-gray-500 block">ระดับชั้น:</span>
                  <span className="font-bold text-brand-gray-900 text-sm">
                    {application.level === "m1" ? "มัธยมศึกษาปีที่ 1 (ม.1)" : "มัธยมศึกษาปีที่ 4 (ม.4)"}
                  </span>
                </div>
                <div>
                  <span className="text-brand-gray-500 block">แผนการเรียนที่สมัคร:</span>
                  <span className="font-bold text-brand-gray-900">
                    {prog?.name || "-"}
                  </span>
                </div>
                <div className="flex items-center justify-between pt-1 border-t border-brand-gray-100">
                  <span className="text-brand-gray-500">GPAX 5 ภาคเรียน:</span>
                  <span className="font-bold text-sm text-brand-gold-700 bg-brand-gold-50 px-2 py-0.5 rounded-md border border-brand-gold-200">
                    {application.gpax}
                  </span>
                </div>
              </div>
            </div>

            {/* Applicant & School */}
            <div className="space-y-3">
              <span className="text-xs font-bold text-brand-gold-700 uppercase tracking-wider block">
                ข้อมูลส่วนตัว &amp; โรงเรียนเดิม
              </span>
              <div className="rounded-xl bg-white p-3.5 border border-brand-gray-200 space-y-2 text-xs">
                <div>
                  <span className="text-brand-gray-500 block">วันเกิด:</span>
                  <span className="font-semibold text-brand-gray-800">{application.birthDate}</span>
                </div>
                <div>
                  <span className="text-brand-gray-500 block">เบอร์โทรศัพท์:</span>
                  <span className="font-semibold text-brand-gray-800">{application.phone}</span>
                </div>
                <div>
                  <span className="text-brand-gray-500 block">โรงเรียนเดิม:</span>
                  <span className="font-semibold text-brand-gray-800">
                    {application.previousSchool} ({application.previousSchoolProvince})
                  </span>
                </div>
                <div>
                  <span className="text-brand-gray-500 block">ที่อยู่ตามทะเบียนบ้าน:</span>
                  <span className="text-brand-gray-700 leading-relaxed block">
                    {application.addressHouseNo} {application.addressSubdistrict} {application.addressDistrict} {application.addressProvince}
                  </span>
                </div>
              </div>
            </div>

            {/* Parent Info */}
            <div className="space-y-3">
              <span className="text-xs font-bold text-brand-gold-700 uppercase tracking-wider block">
                ข้อมูลผู้ปกครอง ({application.parentRelation})
              </span>
              <div className="rounded-xl bg-white p-3.5 border border-brand-gray-200 space-y-1.5 text-xs">
                <p className="font-semibold text-brand-gray-800">{application.parentFullName}</p>
                <p className="text-brand-gray-600">โทร: {application.parentPhone}</p>
              </div>
            </div>
          </div>

          {/* Right Column: Uploaded Documents Preview (7 cols) */}
          <div className="lg:col-span-7 p-6 space-y-6">
            <div className="flex items-center justify-between pb-2 border-b border-brand-gray-100">
              <span className="text-xs font-bold text-brand-gray-900 uppercase tracking-wider">
                เอกสารแนบประกอบการสมัคร (4 รายการ)
              </span>
              <span className="text-xs text-brand-gray-400">ตรวจสอบความคมชัดและความถูกต้อง</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Photo */}
              <div className="rounded-2xl border border-brand-gray-200 bg-brand-gray-50/50 p-4 space-y-2">
                <span className="text-xs font-bold text-brand-gray-800 block">
                  1. รูปถ่าย 1.5 นิ้ว
                </span>
                <div className="relative h-44 w-full rounded-xl bg-white border border-brand-gray-200 flex items-center justify-center overflow-hidden">
                  {application.photoFile ? (
                    <Image
                      src={application.photoFile}
                      alt="Student Photo"
                      fill
                      className="object-contain"
                    />
                  ) : (
                    <div className="text-center p-3 text-brand-gray-400 text-xs">
                      <User className="h-8 w-8 mx-auto mb-1 opacity-50" />
                      <span>{application.photoFileName || "เอกสารจำลองในระบบ"}</span>
                    </div>
                  )}
                </div>
              </div>

              {/* Transcript Front */}
              <div className="rounded-2xl border border-brand-gray-200 bg-brand-gray-50/50 p-4 space-y-2">
                <span className="text-xs font-bold text-brand-gray-800 block">
                  2. ปพ.1 ด้านหน้า (เกรดรวม)
                </span>
                <div className="relative h-44 w-full rounded-xl bg-white border border-brand-gray-200 flex flex-col items-center justify-center p-4 text-center">
                  <FileText className="h-10 w-10 text-brand-gold-600 mb-2" />
                  <p className="text-xs font-bold text-brand-gray-800 truncate max-w-[180px]">
                    {application.transcriptFrontFileName || "praphor1-front.pdf"}
                  </p>
                  <span className="text-[11px] text-emerald-600 font-semibold mt-1">
                    ตรวจสอบเกรดเฉลี่ย {application.gpax} แล้ว
                  </span>
                </div>
              </div>

              {/* Transcript Back */}
              <div className="rounded-2xl border border-brand-gray-200 bg-brand-gray-50/50 p-4 space-y-2">
                <span className="text-xs font-bold text-brand-gray-800 block">
                  3. ปพ.1 ด้านหลัง
                </span>
                <div className="relative h-44 w-full rounded-xl bg-white border border-brand-gray-200 flex flex-col items-center justify-center p-4 text-center">
                  <FileText className="h-10 w-10 text-brand-gold-600 mb-2" />
                  <p className="text-xs font-bold text-brand-gray-800 truncate max-w-[180px]">
                    {application.transcriptBackFileName || "praphor1-back.pdf"}
                  </p>
                  <span className="text-[11px] text-brand-gray-500 mt-1">มีลายมือชื่อนายทะเบียน</span>
                </div>
              </div>

              {/* House Registration */}
              <div className="rounded-2xl border border-brand-gray-200 bg-brand-gray-50/50 p-4 space-y-2">
                <span className="text-xs font-bold text-brand-gray-800 block">
                  4. สำเนาทะเบียนบ้าน
                </span>
                <div className="relative h-44 w-full rounded-xl bg-white border border-brand-gray-200 flex flex-col items-center justify-center p-4 text-center">
                  <FileText className="h-10 w-10 text-brand-gold-600 mb-2" />
                  <p className="text-xs font-bold text-brand-gray-800 truncate max-w-[180px]">
                    {application.houseRegFileName || "house-registration.pdf"}
                  </p>
                  <span className="text-[11px] text-brand-gray-500 mt-1">ข้อมูลตรงกับบัตร ปชช.</span>
                </div>
              </div>
            </div>

            {/* Reject Reason Input (if toggled) */}
            {showRejectInput && (
              <div className="rounded-2xl bg-rose-50 p-4 border border-rose-200 space-y-3">
                <span className="text-xs font-bold text-rose-900 block">
                  ระบุเหตุผลที่ต้องการให้ผู้สมัครแก้ไข:
                </span>
                <input
                  type="text"
                  placeholder="เช่น ภาพถ่าย ปพ.1 เบลอไม่สามารถอ่านเกรดเฉลี่ยได้, รูปถ่ายไม่ใช่ชุดนักเรียน"
                  value={rejectReason}
                  onChange={(e) => setRejectReason(e.target.value)}
                  className="w-full rounded-xl border border-rose-300 p-2.5 text-xs text-brand-gray-900 bg-white focus:outline-none focus:ring-2 focus:ring-rose-400"
                />
                <div className="flex justify-end gap-2">
                  <button
                    type="button"
                    onClick={() => setShowRejectInput(false)}
                    className="px-3 py-1.5 text-xs font-semibold text-brand-gray-600 hover:text-brand-gray-900"
                  >
                    ยกเลิก
                  </button>
                  <button
                    type="button"
                    onClick={handleConfirmReject}
                    className="rounded-lg bg-rose-600 px-4 py-1.5 text-xs font-bold text-white hover:bg-rose-700 transition-colors"
                  >
                    ยืนยันส่งกลับแก้ไข
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Modal Footer Actions */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 border-t border-brand-gray-200 px-6 py-4 bg-white">
          <div className="flex items-center gap-2">
            <span className="text-xs font-medium text-brand-gray-500">สถานะปัจจุบัน:</span>
            <span
              className={`text-xs font-bold px-2.5 py-0.5 rounded-full ${
                application.status === "approved"
                  ? "bg-emerald-100 text-emerald-800"
                  : application.status === "action_required"
                  ? "bg-rose-100 text-rose-800"
                  : "bg-amber-100 text-amber-800"
              }`}
            >
              {application.status === "approved"
                ? "อนุมัติแล้ว"
                : application.status === "action_required"
                ? "รอผู้สมัครแก้ไข"
                : "รอตรวจสอบ"}
            </span>
          </div>

          <div className="flex items-center gap-3">
            {!showRejectInput && (
              <button
                type="button"
                onClick={() => setShowRejectInput(true)}
                className="inline-flex items-center gap-1.5 rounded-xl border border-rose-200 bg-rose-50 px-4 py-2.5 text-xs sm:text-sm font-bold text-rose-700 hover:bg-rose-100 transition-colors"
              >
                <AlertCircle className="h-4 w-4" />
                <span>ส่งกลับแก้ไข</span>
              </button>
            )}

            <button
              type="button"
              onClick={() => onApprove(application.applicationNo)}
              className="inline-flex items-center gap-1.5 rounded-xl bg-gradient-to-r from-emerald-600 to-emerald-700 px-6 py-2.5 text-xs sm:text-sm font-bold text-white shadow-md hover:from-emerald-500 hover:to-emerald-600 transition-all hover:scale-105 active:scale-100"
            >
              <CheckCircle2 className="h-4 w-4" />
              <span>อนุมัติสิทธิ์สอบ</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
