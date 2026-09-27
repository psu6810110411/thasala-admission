"use client";

import { Users, Clock, CheckCircle2, AlertCircle } from "lucide-react";
import { SubmittedApplication } from "@/types/admission";

interface AdminStatsOverviewProps {
  applicants: SubmittedApplication[];
}

export function AdminStatsOverview({ applicants }: AdminStatsOverviewProps) {
  const total = applicants.length;
  const approved = applicants.filter((a) => a.status === "approved").length;
  const pending = applicants.filter((a) => a.status === "pending").length;
  const actionRequired = applicants.filter((a) => a.status === "action_required").length;

  const stats = [
    {
      label: "ผู้สมัครทั้งหมด",
      value: total,
      sub: "ม.1 และ ม.4 รวมทุกแผน",
      icon: <Users className="h-5 w-5 text-brand-gray-900" />,
      bg: "bg-brand-gray-100",
    },
    {
      label: "รอตรวจสอบเอกสาร",
      value: pending,
      sub: "รอคุณครูกดอนุมัติ",
      icon: <Clock className="h-5 w-5 text-amber-700" />,
      bg: "bg-amber-100",
    },
    {
      label: "อนุมัติสิทธิ์สอบแล้ว",
      value: approved,
      sub: "พร้อมพิมพ์บัตรสอบ",
      icon: <CheckCircle2 className="h-5 w-5 text-emerald-700" />,
      bg: "bg-emerald-100",
    },
    {
      label: "ต้องแก้ไขเอกสาร",
      value: actionRequired,
      sub: "แจ้งเตือนผู้สมัครแล้ว",
      icon: <AlertCircle className="h-5 w-5 text-rose-700" />,
      bg: "bg-rose-100",
    },
  ];

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
      {stats.map((stat, idx) => (
        <div
          key={idx}
          className="rounded-2xl bg-white p-5 border border-brand-gray-200/90 shadow-xs flex items-center justify-between"
        >
          <div className="space-y-1">
            <p className="text-xs font-bold text-brand-gray-500 uppercase tracking-wider">
              {stat.label}
            </p>
            <p className="text-2xl sm:text-3xl font-black text-brand-gray-950 tracking-tight">
              {stat.value}
            </p>
            <p className="text-[11px] text-brand-gray-400">{stat.sub}</p>
          </div>
          <div className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl ${stat.bg}`}>
            {stat.icon}
          </div>
        </div>
      ))}
    </div>
  );
}
