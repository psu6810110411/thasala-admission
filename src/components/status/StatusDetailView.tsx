"use client";

import { SubmittedApplication } from "@/types/admission";
import { PROGRAMS_M1, PROGRAMS_M4 } from "@/lib/constants";
import {
  CheckCircle2,
  Clock,
  AlertCircle,
  Printer,
  ArrowLeft,
  Calendar,
  MapPin,
  FileCheck2,
  User,
} from "lucide-react";

interface StatusDetailViewProps {
  application: SubmittedApplication;
  onPrintPass: () => void;
  onBackToSearch: () => void;
}

export function StatusDetailView({
  application,
  onPrintPass,
  onBackToSearch,
}: StatusDetailViewProps) {
  const allPrograms = [...PROGRAMS_M1, ...PROGRAMS_M4];
  const prog = allPrograms.find((p) => p.id === application.primaryProgram);

  const statusConfig = {
    approved: {
      badgeBg: "bg-emerald-100 text-emerald-800 border-emerald-300",
      icon: <CheckCircle2 className="h-5 w-5 text-emerald-600" />,
      title: "เอกสารสมบูรณ์ — มีสิทธิ์เข้าสอบคัดเลือก",
      description:
        "คณะกรรมการได้รับและตรวจสอบเอกสารหลักฐานของท่านเรียบร้อยแล้ว ท่านสามารถพิมพ์บัตรประจำตัวผู้เข้าสอบได้ทันที",
      step: 3,
    },
    pending: {
      badgeBg: "bg-amber-100 text-amber-800 border-amber-300",
      icon: <Clock className="h-5 w-5 text-amber-600" />,
      title: "ยื่นใบสมัครแล้ว — อยู่ระหว่างการตรวจสอบเอกสาร",
      description:
        "ระบบได้รับข้อมูลของท่านแล้ว คณะกรรมการกำลังตรวจสอบความถูกต้องของเอกสาร ปพ.1 และรูปถ่าย จะอัปเดตผลภายใน 1-2 วันทำการ",
      step: 2,
    },
    action_required: {
      badgeBg: "bg-rose-100 text-rose-800 border-rose-300",
      icon: <AlertCircle className="h-5 w-5 text-rose-600" />,
      title: "เอกสารไม่สมบูรณ์ — ต้องดำเนินการแก้ไข",
      description:
        "เอกสาร ปพ.1 หรือรูปถ่ายไม่ชัดเจน กรุณาติดต่อห้องวิชาการ หรืออัปโหลดเอกสารใหม่",
      step: 2,
    },
  };

  const currentStatus = statusConfig[application.status] || statusConfig.approved;

  const milestones = [
    { title: "ยื่นใบสมัคร", desc: "บันทึกข้อมูลสำเร็จ", done: true },
    { title: "ตรวจเอกสาร", desc: "คณะกรรมการตรวจสอบ", done: true },
    {
      title: "อนุมัติสิทธิ์สอบ",
      desc: application.status === "approved" ? "ผ่านการคัดเลือก" : "รอดำเนินการ",
      done: application.status === "approved",
    },
    { title: "ประกาศผลสอบ", desc: "5 มี.ค. 2569", done: false },
  ];

  return (
    <div className="space-y-6">
      {/* Top Search Back Button */}
      <button
        type="button"
        onClick={onBackToSearch}
        className="inline-flex items-center gap-2 text-xs sm:text-sm font-semibold text-brand-gray-600 hover:text-brand-gray-950 transition-colors"
      >
        <ArrowLeft className="h-4 w-4" />
        <span>ค้นหารายการอื่น</span>
      </button>

      {/* Main Status Hero Card */}
      <div className="rounded-3xl bg-white p-6 sm:p-8 border border-brand-gray-200/90 shadow-sm space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-brand-gray-100">
          <div>
            <span className="text-[11px] font-bold text-brand-gray-400 uppercase tracking-wider block">
              รหัสประจำตัวผู้สมัคร (Application ID)
            </span>
            <span className="text-2xl sm:text-3xl font-mono font-black text-brand-gray-900 mt-0.5 block">
              {application.applicationNo}
            </span>
          </div>

          <div
            className={`inline-flex items-center gap-2 rounded-2xl px-4 py-2 text-xs font-bold border ${currentStatus.badgeBg}`}
          >
            {currentStatus.icon}
            <span>{currentStatus.title}</span>
          </div>
        </div>

        <p className="text-xs sm:text-sm text-brand-gray-600 leading-relaxed">
          {currentStatus.description}
        </p>

        {/* Milestone Tracker */}
        <div className="pt-2">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {milestones.map((m, idx) => (
              <div
                key={idx}
                className={`p-3.5 rounded-xl border text-center transition-all ${
                  m.done
                    ? "bg-emerald-50/70 border-emerald-300 text-emerald-950"
                    : "bg-brand-gray-50 border-brand-gray-200 text-brand-gray-400"
                }`}
              >
                <div
                  className={`mx-auto mb-1.5 flex h-6 w-6 items-center justify-center rounded-full text-xs font-bold ${
                    m.done
                      ? "bg-emerald-600 text-white"
                      : "bg-brand-gray-200 text-brand-gray-500"
                  }`}
                >
                  {m.done ? <CheckCircle2 className="h-4 w-4" /> : idx + 1}
                </div>
                <p className="text-xs font-bold">{m.title}</p>
                <p className="text-[10px] mt-0.5 opacity-80">{m.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Action Button: Print Exam Pass */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4 border-t border-brand-gray-100">
          <div className="flex items-center gap-2 text-xs text-brand-gray-500">
            <Calendar className="h-4 w-4 text-brand-gold-600 shrink-0" />
            <span>วันสอบคัดเลือก: เสาร์ที่ 1 มีนาคม 2569 (08:30 น.)</span>
          </div>

          <button
            type="button"
            onClick={onPrintPass}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-brand-gold-500 to-brand-gold-600 px-6 py-3.5 text-sm font-bold text-brand-gray-950 shadow-md hover:from-brand-gold-400 hover:to-brand-gold-500 transition-all hover:scale-105 active:scale-100"
          >
            <Printer className="h-4 w-4" />
            <span>พิมพ์บัตรประจำตัวผู้เข้าสอบ (PDF Exam Pass)</span>
          </button>
        </div>
      </div>

      {/* Candidate Data Overview */}
      <div className="rounded-2xl bg-white p-6 border border-brand-gray-200/90 shadow-xs space-y-4">
        <div className="flex items-center gap-2 pb-3 border-b border-brand-gray-100">
          <User className="h-5 w-5 text-brand-gold-600" />
          <h3 className="text-base font-bold text-brand-gray-900">
            รายละเอียดข้อมูลผู้สมัคร
          </h3>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
          <div>
            <span className="text-brand-gray-500 block">ชื่อ - สกุล:</span>
            <span className="font-bold text-brand-gray-900 text-sm block mt-0.5">
              {application.title} {application.firstNameTh} {application.lastNameTh}
            </span>
          </div>
          <div>
            <span className="text-brand-gray-500 block">เลขบัตรประชาชน:</span>
            <span className="font-mono font-bold text-brand-gray-900 block mt-0.5">
              {application.citizenId}
            </span>
          </div>
          <div>
            <span className="text-brand-gray-500 block">ระดับชั้นที่สมัคร:</span>
            <span className="font-bold text-brand-gray-900 block mt-0.5">
              {application.level === "m1" ? "มัธยมศึกษาปีที่ 1" : "มัธยมศึกษาปีที่ 4"}
            </span>
          </div>
          <div className="sm:col-span-2">
            <span className="text-brand-gray-500 block">แผนการเรียนอันดับ 1:</span>
            <span className="font-bold text-brand-gold-800 block mt-0.5">
              {prog?.name || "-"}
            </span>
          </div>
          <div>
            <span className="text-brand-gray-500 block">โรงเรียนเดิม:</span>
            <span className="font-semibold text-brand-gray-800 block mt-0.5">
              {application.previousSchool} ({application.previousSchoolProvince})
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
