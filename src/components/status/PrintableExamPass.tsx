"use client";

import { SubmittedApplication } from "@/types/admission";
import { PROGRAMS_M1, PROGRAMS_M4 } from "@/lib/constants";
import { Printer, ArrowLeft, QrCode } from "lucide-react";
import Image from "next/image";

interface PrintableExamPassProps {
  application: SubmittedApplication;
  onBack: () => void;
}

export function PrintableExamPass({ application, onBack }: PrintableExamPassProps) {
  const allPrograms = [...PROGRAMS_M1, ...PROGRAMS_M4];
  const prog = allPrograms.find((p) => p.id === application.primaryProgram);

  const handlePrint = () => {
    window.print();
  };

  // Deterministic seat number and room based on citizen ID
  const lastFour = application.citizenId.slice(-4) || "0101";
  const seatNumber = `S-${lastFour}`;
  const examRoom = `ห้อง 2${lastFour.slice(-2)} (อาคารเฉลิมพระเกียรติ ชั้น 2)`;

  return (
    <div className="space-y-6">
      {/* Top Action Bar (Hidden when printing) */}
      <div className="print:hidden flex flex-col sm:flex-row items-center justify-between gap-4 rounded-2xl bg-white p-4 sm:p-5 border border-brand-gray-200/90 shadow-xs">
        <button
          type="button"
          onClick={onBack}
          className="inline-flex items-center gap-2 rounded-xl border border-brand-gray-300 bg-white px-4 py-2.5 text-xs sm:text-sm font-semibold text-brand-gray-700 hover:bg-brand-gray-50 transition-colors"
        >
          <ArrowLeft className="h-4 w-4" />
          <span>ย้อนกลับไปหน้าสถานะ</span>
        </button>

        <div className="flex items-center gap-3">
          <span className="text-xs text-brand-gray-500 hidden sm:inline">
            แนะนำให้ใช้ขนาดกระดาษ A4 ในการพิมพ์
          </span>
          <button
            type="button"
            onClick={handlePrint}
            className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-brand-gold-500 to-brand-gold-600 px-6 py-2.5 text-xs sm:text-sm font-bold text-brand-gray-950 shadow-md hover:from-brand-gold-400 hover:to-brand-gold-500 transition-all"
          >
            <Printer className="h-4 w-4" />
            <span>พิมพ์บัตรประจำตัวผู้เข้าสอบ (Print / PDF)</span>
          </button>
        </div>
      </div>

      {/* Printable Sheet (Standard A4 format) */}
      <div
        id="printable-area"
        className="mx-auto max-w-3xl bg-white p-8 sm:p-12 border border-brand-gray-300 shadow-lg rounded-2xl print:m-0 print:p-6 print:border-none print:shadow-none print:rounded-none"
      >
        {/* Document Header */}
        <div className="flex items-start justify-between border-b-2 border-brand-gray-900 pb-5">
          <div className="flex items-center gap-4">
            <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-brand-gray-900 text-brand-gold-400 font-bold border-2 border-brand-gold-500 text-xl print:text-black print:border-black">
              ท.ศ.
            </div>
            <div>
              <h2 className="text-lg sm:text-xl font-extrabold text-brand-gray-900 tracking-tight">
                โรงเรียนท่าศาลาประสิทธิ์ศึกษา
              </h2>
              <p className="text-xs sm:text-sm font-bold text-brand-gray-700 mt-0.5">
                บัตรประจำตัวผู้เข้าสอบคัดเลือก ประจำปีการศึกษา 2569
              </p>
              <p className="text-[11px] text-brand-gray-500 mt-0.5">
                ระดับชั้น {application.level === "m1" ? "มัธยมศึกษาปีที่ 1 (ม.1)" : "มัธยมศึกษาปีที่ 4 (ม.4)"}
              </p>
            </div>
          </div>

          <div className="text-right">
            <span className="text-[11px] font-bold text-brand-gray-400 uppercase tracking-wider block">
              Application ID
            </span>
            <span className="text-lg sm:text-xl font-mono font-black text-brand-gray-900">
              {application.applicationNo}
            </span>
          </div>
        </div>

        {/* Candidate Details & Photo */}
        <div className="mt-6 grid grid-cols-1 sm:grid-cols-4 gap-6 items-start">
          {/* Photo Box */}
          <div className="flex flex-col items-center">
            <div className="relative h-36 w-28 overflow-hidden rounded-xl border-2 border-brand-gray-300 bg-brand-gray-100 flex items-center justify-center">
              {application.photoFile ? (
                <Image
                  src={application.photoFile}
                  alt="Student Photo"
                  fill
                  className="object-cover"
                />
              ) : (
                <div className="text-center p-2 text-brand-gray-400">
                  <span className="text-xs block font-bold">รูปถ่าย 1.5 นิ้ว</span>
                  <span className="text-[10px] block mt-1">(ติดรูปถ่ายหน้าตรง)</span>
                </div>
              )}
            </div>
            <span className="text-[10px] text-brand-gray-400 mt-1">
              รูปถ่ายผู้สมัคร
            </span>
          </div>

          {/* Info Columns */}
          <div className="sm:col-span-3 space-y-3.5">
            <div className="grid grid-cols-2 gap-3 text-xs">
              <div>
                <span className="text-brand-gray-500 block">ชื่อ - นามสกุล:</span>
                <span className="text-sm font-bold text-brand-gray-900 block mt-0.5">
                  {application.title} {application.firstNameTh} {application.lastNameTh}
                </span>
              </div>
              <div>
                <span className="text-brand-gray-500 block">เลขประจำตัวประชาชน:</span>
                <span className="text-sm font-mono font-bold text-brand-gray-900 tracking-wider block mt-0.5">
                  {application.citizenId}
                </span>
              </div>
              <div>
                <span className="text-brand-gray-500 block">แผนการเรียนที่สมัคร:</span>
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

            {/* Exam Seat Highlight Box */}
            <div className="rounded-xl bg-brand-gray-100 p-3.5 border border-brand-gray-300 grid grid-cols-2 gap-3">
              <div>
                <span className="text-[11px] font-bold text-brand-gray-600 block uppercase">
                  เลขที่นั่งสอบ
                </span>
                <span className="text-xl font-mono font-black text-brand-gray-950">
                  {seatNumber}
                </span>
              </div>
              <div>
                <span className="text-[11px] font-bold text-brand-gray-600 block uppercase">
                  ห้องสอบ / สถานที่สอบ
                </span>
                <span className="text-xs font-bold text-brand-gray-900 leading-tight block mt-0.5">
                  {examRoom}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Exam Schedule Table */}
        <div className="mt-8 space-y-2">
          <h4 className="text-xs font-bold uppercase tracking-wider text-brand-gray-900">
            ตารางสอบคัดเลือก (วันเสาร์ที่ 1 มีนาคม 2569)
          </h4>
          <table className="w-full text-left text-xs border border-brand-gray-300 border-collapse">
            <thead>
              <tr className="bg-brand-gray-100 border-b border-brand-gray-300">
                <th className="p-2.5 font-bold text-brand-gray-900">เวลาสอบ</th>
                <th className="p-2.5 font-bold text-brand-gray-900">วิชาสอบ</th>
                <th className="p-2.5 font-bold text-brand-gray-900">คะแนนเต็ม</th>
                <th className="p-2.5 font-bold text-brand-gray-900">หมายเหตุ</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-brand-gray-200">
              <tr>
                <td className="p-2.5 font-mono">08:30 - 10:00 น.</td>
                <td className="p-2.5 font-semibold text-brand-gray-900">คณิตศาสตร์</td>
                <td className="p-2.5 font-mono">100 คะแนน</td>
                <td className="p-2.5 text-brand-gray-600">ข้อสอบปรนัยและอัตนัย</td>
              </tr>
              <tr>
                <td className="p-2.5 font-mono">10:30 - 12:00 น.</td>
                <td className="p-2.5 font-semibold text-brand-gray-900">วิทยาศาสตร์และเทคโนโลยี</td>
                <td className="p-2.5 font-mono">100 คะแนน</td>
                <td className="p-2.5 text-brand-gray-600">เน้นคิดวิเคราะห์</td>
              </tr>
              <tr>
                <td className="p-2.5 font-mono">13:00 - 14:30 น.</td>
                <td className="p-2.5 font-semibold text-brand-gray-900">ภาษาอังกฤษ</td>
                <td className="p-2.5 font-mono">100 คะแนน</td>
                <td className="p-2.5 text-brand-gray-600">การอ่านและไวยากรณ์</td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* Instructions & QR Code Verification */}
        <div className="mt-6 pt-5 border-t border-brand-gray-200 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="space-y-1 text-[11px] text-brand-gray-600 leading-relaxed max-w-lg">
            <p className="font-bold text-brand-gray-900">ข้อปฏิบัติสำหรับผู้เข้าสอบ:</p>
            <p>1. ต้องนำบัตรประจำตัวผู้เข้าสอบฉบับนี้คู่กับบัตรประจำตัวประชาชนตัวจริงมาแสดง</p>
            <p>2. แต่งกายด้วยชุดนักเรียนของโรงเรียนเดิมให้เรียบร้อย</p>
            <p>3. ห้ามนำเครื่องมือสื่อสาร อุปกรณ์อิเล็กทรอนิกส์ หรือนาฬิกาอัจฉริยะเข้าห้องสอบ</p>
          </div>

          {/* QR Code Verification Simulation */}
          <div className="flex flex-col items-center p-3 rounded-xl border border-brand-gray-200 bg-brand-gray-50 text-center">
            <div className="flex h-20 w-20 items-center justify-center bg-white border border-brand-gray-300 rounded-lg p-1.5 shadow-xs">
              <QrCode className="h-full w-full text-brand-gray-900" />
            </div>
            <span className="text-[10px] font-mono text-brand-gray-500 mt-1">
              SCAN TO VERIFY
            </span>
          </div>
        </div>

        {/* Signature Area */}
        <div className="mt-8 pt-4 border-t border-brand-gray-200 grid grid-cols-2 text-center text-xs text-brand-gray-600">
          <div>
            <p className="mb-8">ลงชื่อ......................................................ผู้สมัคร</p>
            <p>({application.title} {application.firstNameTh} {application.lastNameTh})</p>
          </div>
          <div>
            <p className="mb-8">ลงชื่อ......................................................นายทะเบียน</p>
            <p>(งานรับนักเรียน โรงเรียนท่าศาลาประสิทธิ์ศึกษา)</p>
          </div>
        </div>
      </div>
    </div>
  );
}
