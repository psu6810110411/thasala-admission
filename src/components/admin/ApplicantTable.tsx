"use client";

import { useState } from "react";
import { SubmittedApplication, EducationLevel } from "@/types/admission";
import { PROGRAMS_M1, PROGRAMS_M4 } from "@/lib/constants";
import { Search, Filter, Eye, CheckCircle2, Clock, AlertCircle } from "lucide-react";

interface ApplicantTableProps {
  applicants: SubmittedApplication[];
  onSelectApplicant: (app: SubmittedApplication) => void;
}

export function ApplicantTable({
  applicants,
  onSelectApplicant,
}: ApplicantTableProps) {
  const [search, setSearch] = useState("");
  const [levelFilter, setLevelFilter] = useState<string>("all");
  const [statusFilter, setStatusFilter] = useState<string>("all");

  const allPrograms = [...PROGRAMS_M1, ...PROGRAMS_M4];

  const filtered = applicants.filter((app) => {
    const matchesSearch =
      search === "" ||
      app.firstNameTh.includes(search) ||
      app.lastNameTh.includes(search) ||
      app.citizenId.includes(search) ||
      app.applicationNo.toLowerCase().includes(search.toLowerCase());

    const matchesLevel =
      levelFilter === "all" || app.level === levelFilter;

    const matchesStatus =
      statusFilter === "all" || app.status === statusFilter;

    return matchesSearch && matchesLevel && matchesStatus;
  });

  return (
    <div className="rounded-3xl bg-white border border-brand-gray-200/90 shadow-xs overflow-hidden">
      {/* Table Filter & Search Controls */}
      <div className="p-5 border-b border-brand-gray-200 bg-brand-gray-50/50 flex flex-col sm:flex-row items-center justify-between gap-4">
        {/* Search Input */}
        <div className="relative w-full sm:w-80">
          <Search className="absolute left-3.5 top-3.5 h-4 w-4 text-brand-gray-400" />
          <input
            type="text"
            placeholder="ค้นหาชื่อ, เลขบัตร หรือรหัสใบสมัคร..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full rounded-xl border border-brand-gray-300 bg-white py-2.5 pl-10 pr-4 text-xs sm:text-sm text-brand-gray-900 focus:border-brand-gold-500 focus:outline-none focus:ring-1 focus:ring-brand-gold-500"
          />
        </div>

        {/* Filter Dropdowns */}
        <div className="flex items-center gap-2.5 w-full sm:w-auto">
          {/* Level Filter */}
          <select
            value={levelFilter}
            onChange={(e) => setLevelFilter(e.target.value)}
            className="rounded-xl border border-brand-gray-300 bg-white py-2.5 px-3 text-xs sm:text-sm font-medium text-brand-gray-800 focus:outline-none"
          >
            <option value="all">ทุกระดับชั้น</option>
            <option value="m1">มัธยมศึกษาปีที่ 1 (ม.1)</option>
            <option value="m4">มัธยมศึกษาปีที่ 4 (ม.4)</option>
          </select>

          {/* Status Filter */}
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="rounded-xl border border-brand-gray-300 bg-white py-2.5 px-3 text-xs sm:text-sm font-medium text-brand-gray-800 focus:outline-none"
          >
            <option value="all">ทุกสถานะ</option>
            <option value="pending">รอตรวจสอบ</option>
            <option value="approved">อนุมัติแล้ว</option>
            <option value="action_required">ต้องแก้ไข</option>
          </select>
        </div>
      </div>

      {/* Table Content */}
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse text-xs sm:text-sm">
          <thead>
            <tr className="border-b border-brand-gray-200 bg-brand-gray-100/60 text-[11px] font-bold uppercase tracking-wider text-brand-gray-600">
              <th className="p-4">รหัสใบสมัคร</th>
              <th className="p-4">ชื่อ - นามสกุล</th>
              <th className="p-4">ระดับชั้น &amp; แผนการเรียน</th>
              <th className="p-4">GPAX</th>
              <th className="p-4">สถานะเอกสาร</th>
              <th className="p-4 text-center">จัดการ</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-brand-gray-100">
            {filtered.length > 0 ? (
              filtered.map((app) => {
                const prog = allPrograms.find((p) => p.id === app.primaryProgram);
                return (
                  <tr
                    key={app.applicationNo}
                    className="hover:bg-brand-gold-50/20 transition-colors"
                  >
                    <td className="p-4 font-mono font-bold text-brand-gray-900">
                      {app.applicationNo}
                    </td>
                    <td className="p-4">
                      <p className="font-bold text-brand-gray-900">
                        {app.title} {app.firstNameTh} {app.lastNameTh}
                      </p>
                      <p className="text-[11px] text-brand-gray-400 font-mono">
                        {app.citizenId}
                      </p>
                    </td>
                    <td className="p-4">
                      <span className="font-semibold text-brand-gray-800 block">
                        {app.level === "m1" ? "ม.1" : "ม.4"} - {prog?.name.split(" ")[0]}
                      </span>
                      <span className="text-[11px] text-brand-gray-500 truncate block max-w-xs">
                        {prog?.name}
                      </span>
                    </td>
                    <td className="p-4">
                      <span className="font-bold text-brand-gold-700 bg-brand-gold-50 px-2 py-0.5 rounded-md border border-brand-gold-200">
                        {app.gpax}
                      </span>
                    </td>
                    <td className="p-4">
                      <span
                        className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-semibold ${
                          app.status === "approved"
                            ? "bg-emerald-100 text-emerald-800"
                            : app.status === "action_required"
                            ? "bg-rose-100 text-rose-800"
                            : "bg-amber-100 text-amber-800"
                        }`}
                      >
                        {app.status === "approved" && (
                          <CheckCircle2 className="h-3.5 w-3.5 text-emerald-600" />
                        )}
                        {app.status === "pending" && (
                          <Clock className="h-3.5 w-3.5 text-amber-600" />
                        )}
                        {app.status === "action_required" && (
                          <AlertCircle className="h-3.5 w-3.5 text-rose-600" />
                        )}
                        {app.status === "approved"
                          ? "อนุมัติแล้ว"
                          : app.status === "action_required"
                          ? "ต้องแก้ไข"
                          : "รอตรวจสอบ"}
                      </span>
                    </td>
                    <td className="p-4 text-center">
                      <button
                        type="button"
                        onClick={() => onSelectApplicant(app)}
                        className="inline-flex items-center gap-1.5 rounded-xl bg-brand-gray-900 px-3.5 py-1.5 text-xs font-bold text-brand-gold-400 hover:bg-brand-gray-800 transition-colors shadow-xs"
                      >
                        <Eye className="h-3.5 w-3.5" />
                        <span>ตรวจเอกสาร</span>
                      </button>
                    </td>
                  </tr>
                );
              })
            ) : (
              <tr>
                <td colSpan={6} className="p-8 text-center text-xs text-brand-gray-400">
                  ไม่พบข้อมูลผู้สมัครที่ตรงกับเงื่อนไขการค้นหา
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
