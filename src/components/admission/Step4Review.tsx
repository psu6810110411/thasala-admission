"use client";

import { ApplicationFormData } from "@/types/admission";
import { PROGRAMS_M1, PROGRAMS_M4 } from "@/lib/constants";
import { step4Schema } from "@/lib/schemas";
import { CheckSquare, ArrowLeft, Send, FileCheck, CheckCircle2, ShieldAlert } from "lucide-react";
import Image from "next/image";

interface Step4ReviewProps {
  data: ApplicationFormData;
  updateData: (fields: Partial<ApplicationFormData>) => void;
  onSubmit: () => void;
  onBack: () => void;
  isSubmitting: boolean;
}

export function Step4Review({
  data,
  updateData,
  onSubmit,
  onBack,
  isSubmitting,
}: Step4ReviewProps) {
  const allPrograms = [...PROGRAMS_M1, ...PROGRAMS_M4];
  const primaryProg = allPrograms.find((p) => p.id === data.primaryProgram);
  const secondaryProg = allPrograms.find((p) => p.id === data.secondaryProgram);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const result = step4Schema.safeParse(data);
    if (!result.success) {
      alert(result.error.issues[0].message);
      return;
    }
    onSubmit();
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      {/* Review Header Banner */}
      <div className="rounded-2xl bg-white p-6 border border-brand-gray-200/90 shadow-xs">
        <h3 className="text-base font-bold text-brand-gray-900">
          ตรวจสอบข้อมูลและยืนยันการส่งใบสมัคร
        </h3>
        <p className="text-xs text-brand-gray-500 mt-1 leading-relaxed">
          กรุณาตรวจสอบความถูกต้องของข้อมูลทุกส่วนก่อนกดยืนยัน หากส่งใบสมัครแล้ว ระบบจะออกรหัสใบสมัครเพื่อใช้ติดตามผล
        </p>
      </div>

      {/* Summary Cards */}
      <div className="space-y-4">
        {/* 1. Track Summary */}
        <div className="rounded-2xl bg-white p-5 border border-brand-gray-200/90 shadow-xs space-y-3">
          <div className="flex items-center justify-between pb-2 border-b border-brand-gray-100">
            <span className="text-xs font-bold text-brand-gold-700 uppercase tracking-wider">
              1. ข้อมูลการสมัครและแผนการเรียน
            </span>
            <span className="text-xs font-bold text-brand-gray-900 bg-brand-gray-100 px-2.5 py-0.5 rounded-full">
              {data.level === "m1" ? "มัธยมศึกษาปีที่ 1" : "มัธยมศึกษาปีที่ 4"}
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
            <div>
              <p className="text-brand-gray-500">แผนการเรียนอันดับ 1 (หลัก):</p>
              <p className="font-bold text-brand-gray-900 mt-0.5">
                {primaryProg?.name || "-"}
              </p>
            </div>
            <div>
              <p className="text-brand-gray-500">แผนการเรียนอันดับ 2 (สำรอง):</p>
              <p className="font-bold text-brand-gray-900 mt-0.5">
                {secondaryProg?.name || "ไม่ประสงค์เลือก"}
              </p>
            </div>
            <div>
              <p className="text-brand-gray-500">เกรดเฉลี่ยสะสม (GPAX 5 ภาคเรียน):</p>
              <p className="font-bold text-brand-gold-700 text-sm mt-0.5">
                {data.gpax || "-"}
              </p>
            </div>
            {data.gpaxMathSci && (
              <div>
                <p className="text-brand-gray-500">เกรดเฉลี่ยกลุ่มสาระวิทย์-คณิต:</p>
                <p className="font-bold text-brand-gray-900 text-sm mt-0.5">
                  {data.gpaxMathSci}
                </p>
              </div>
            )}
          </div>
        </div>

        {/* 2. Personal & Parent Summary */}
        <div className="rounded-2xl bg-white p-5 border border-brand-gray-200/90 shadow-xs space-y-3">
          <div className="flex items-center justify-between pb-2 border-b border-brand-gray-100">
            <span className="text-xs font-bold text-brand-gold-700 uppercase tracking-wider">
              2. ข้อมูลส่วนตัวและครอบครัว
            </span>
            <span className="text-xs text-brand-gray-500 font-medium">
              โหมด: {data.persona === "student" ? "นักเรียนสมัครเอง" : "ผู้ปกครองสมัครให้"}
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
            <div>
              <p className="text-brand-gray-500">ชื่อ - สกุล ผู้สมัคร (ไทย):</p>
              <p className="font-bold text-brand-gray-900 mt-0.5">
                {data.title} {data.firstNameTh} {data.lastNameTh}
              </p>
            </div>
            <div>
              <p className="text-brand-gray-500">เลขประจำตัวประชาชน:</p>
              <p className="font-bold text-brand-gray-900 tracking-wider mt-0.5">
                {data.citizenId}
              </p>
            </div>
            <div>
              <p className="text-brand-gray-500">วัน/เดือน/ปีเกิด:</p>
              <p className="font-bold text-brand-gray-900 mt-0.5">{data.birthDate}</p>
            </div>
            <div>
              <p className="text-brand-gray-500">เบอร์โทรศัพท์ผู้สมัคร:</p>
              <p className="font-bold text-brand-gray-900 mt-0.5">{data.phone}</p>
            </div>
            <div>
              <p className="text-brand-gray-500">
                ผู้ปกครอง ({data.parentRelation}):
              </p>
              <p className="font-bold text-brand-gray-900 mt-0.5">
                {data.parentFullName || "-"}
              </p>
            </div>
            <div>
              <p className="text-brand-gray-500">เบอร์โทรศัพท์ผู้ปกครอง:</p>
              <p className="font-bold text-brand-gray-900 mt-0.5">
                {data.parentPhone || "-"}
              </p>
            </div>
            <div className="sm:col-span-2">
              <p className="text-brand-gray-500">โรงเรียนเดิม:</p>
              <p className="font-bold text-brand-gray-900 mt-0.5">
                {data.previousSchool} ({data.previousSchoolProvince})
              </p>
            </div>
            <div>
              <p className="text-brand-gray-500">ที่อยู่ตามทะเบียนบ้าน:</p>
              <p className="font-bold text-brand-gray-900 mt-0.5">
                {data.addressHouseNo}
              </p>
            </div>
          </div>
        </div>

        {/* 3. Document Summary */}
        <div className="rounded-2xl bg-white p-5 border border-brand-gray-200/90 shadow-xs space-y-3">
          <div className="pb-2 border-b border-brand-gray-100">
            <span className="text-xs font-bold text-brand-gold-700 uppercase tracking-wider">
              3. รายการเอกสารที่แนบ
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
            <div className="flex items-center gap-2 p-2.5 rounded-xl bg-brand-gray-50">
              <CheckCircle2
                className={`h-4 w-4 ${
                  data.photoFile ? "text-emerald-600" : "text-brand-gray-300"
                }`}
              />
              <span className="font-medium text-brand-gray-800 truncate">
                รูปถ่าย 1.5 นิ้ว: {data.photoFileName || "ยังไม่ได้แนบ"}
              </span>
            </div>

            <div className="flex items-center gap-2 p-2.5 rounded-xl bg-brand-gray-50">
              <CheckCircle2
                className={`h-4 w-4 ${
                  data.transcriptFrontFile ? "text-emerald-600" : "text-brand-gray-300"
                }`}
              />
              <span className="font-medium text-brand-gray-800 truncate">
                ปพ.1 ด้านหน้า: {data.transcriptFrontFileName || "ยังไม่ได้แนบ"}
              </span>
            </div>

            <div className="flex items-center gap-2 p-2.5 rounded-xl bg-brand-gray-50">
              <CheckCircle2
                className={`h-4 w-4 ${
                  data.transcriptBackFile ? "text-emerald-600" : "text-brand-gray-300"
                }`}
              />
              <span className="font-medium text-brand-gray-800 truncate">
                ปพ.1 ด้านหลัง: {data.transcriptBackFileName || "ยังไม่ได้แนบ"}
              </span>
            </div>

            <div className="flex items-center gap-2 p-2.5 rounded-xl bg-brand-gray-50">
              <CheckCircle2
                className={`h-4 w-4 ${
                  data.houseRegFile ? "text-emerald-600" : "text-brand-gray-300"
                }`}
              />
              <span className="font-medium text-brand-gray-800 truncate">
                สำเนาทะเบียนบ้าน: {data.houseRegFileName || "ยังไม่ได้แนบ"}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Confirmation Checkbox */}
      <div className="rounded-2xl bg-brand-gold-50/70 p-5 border border-brand-gold-300 shadow-xs">
        <label className="flex items-start gap-3 cursor-pointer">
          <input
            type="checkbox"
            required
            checked={data.confirmedAccuracy}
            onChange={(e) => updateData({ confirmedAccuracy: e.target.checked })}
            className="mt-1 h-4 w-4 rounded border-brand-gray-300 text-brand-gold-600 focus:ring-brand-gold-500"
          />
          <div className="text-xs text-brand-gray-800 leading-relaxed">
            <span className="font-bold text-brand-gray-900 block mb-0.5">
              การรับรองความถูกต้องของข้อมูล (Declaration)
            </span>
            ข้าพเจ้าขอรับรองว่า ข้อมูลและเอกสารหลักฐานทั้งหมดที่ได้ระบุในการสมัครนี้
            เป็นความจริงทุกประการ หากตรวจสอบในภายหลังพบว่ามีข้อความหรือเอกสารเป็นเท็จ
            ข้าพเจ้ายินยอมให้โรงเรียนตัดสิทธิ์ในการเข้าศึกษาต่อทันทีโดยไม่มีเงื่อนไข
          </div>
        </label>
      </div>

      {/* Action Buttons */}
      <div className="flex items-center justify-between pt-4">
        <button
          type="button"
          onClick={onBack}
          disabled={isSubmitting}
          className="inline-flex items-center gap-2 rounded-xl border border-brand-gray-300 bg-white px-5 py-3 text-sm font-semibold text-brand-gray-700 hover:bg-brand-gray-50 transition-colors disabled:opacity-50"
        >
          <ArrowLeft className="h-4 w-4" />
          <span>ย้อนกลับ</span>
        </button>

        <button
          type="submit"
          disabled={isSubmitting || !data.confirmedAccuracy}
          className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-brand-gold-500 to-brand-gold-600 px-8 py-3.5 text-sm font-bold text-brand-gray-950 shadow-md hover:from-brand-gold-400 hover:to-brand-gold-500 transition-all hover:scale-105 active:scale-100 disabled:opacity-50 disabled:hover:scale-100"
        >
          {isSubmitting ? (
            <>
              <span className="h-4 w-4 animate-spin rounded-full border-2 border-brand-gray-950 border-t-transparent"></span>
              <span>กำลังบันทึกข้อมูล...</span>
            </>
          ) : (
            <>
              <Send className="h-4 w-4" />
              <span>ยืนยันและส่งใบสมัคร</span>
            </>
          )}
        </button>
      </div>
    </form>
  );
}
