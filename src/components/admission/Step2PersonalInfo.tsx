"use client";

import { ApplicationFormData } from "@/types/admission";
import { step2Schema } from "@/lib/schemas";
import { User, Phone, MapPin, School, ArrowLeft, ArrowRight, Shield } from "lucide-react";

interface Step2PersonalInfoProps {
  data: ApplicationFormData;
  updateData: (fields: Partial<ApplicationFormData>) => void;
  onNext: () => void;
  onBack: () => void;
}

export function Step2PersonalInfo({
  data,
  updateData,
  onNext,
  onBack,
}: Step2PersonalInfoProps) {
  const isParent = data.persona === "parent";

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const result = step2Schema.safeParse(data);
    if (!result.success) {
      alert(result.error.issues[0].message);
      return;
    }
    onNext();
  };

  const handleCitizenIdChange = (val: string) => {
    // Keep only numbers and max 13 digits
    const cleaned = val.replace(/[^0-9]/g, "").slice(0, 13);
    updateData({ citizenId: cleaned });
  };

  return (
    <form onSubmit={handleFormSubmit} className="space-y-8">
      {/* 1. Student Personal Information */}
      <div className="rounded-2xl bg-white p-6 border border-brand-gray-200/90 shadow-xs space-y-5">
        <div className="flex items-center gap-2">
          <User className="h-5 w-5 text-brand-gold-600" />
          <h3 className="text-base font-bold text-brand-gray-900">
            {isParent ? "1. ข้อมูลส่วนตัวของนักเรียน (ผู้สมัคร)" : "1. ข้อมูลส่วนตัวของผู้สมัคร"}
          </h3>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {/* Citizen ID */}
          <div className="sm:col-span-3 space-y-1.5">
            <label className="block text-xs font-semibold text-brand-gray-700">
              เลขประจำตัวประชาชน (13 หลัก) <span className="text-rose-500">*</span>
            </label>
            <div className="relative">
              <input
                type="text"
                required
                maxLength={13}
                placeholder="x-xxxx-xxxxx-xx-x (กรอกเฉพาะตัวเลข)"
                value={data.citizenId}
                onChange={(e) => handleCitizenIdChange(e.target.value)}
                className="w-full rounded-xl border border-brand-gray-300 p-3 text-sm font-medium tracking-wider text-brand-gray-900 focus:border-brand-gold-500 focus:ring-2 focus:ring-brand-gold-400 focus:outline-none"
              />
              <span className="absolute right-3 top-3 text-xs text-brand-gray-400">
                {data.citizenId.length}/13
              </span>
            </div>
            <p className="text-[11px] text-brand-gray-500">
              * ใช้สำหรับตรวจสอบสถานะการสมัครและพิมพ์บัตรประจำตัวสอบ
            </p>
          </div>

          {/* Title */}
          <div className="space-y-1.5">
            <label className="block text-xs font-semibold text-brand-gray-700">
              คำนำหน้าชื่อ <span className="text-rose-500">*</span>
            </label>
            <select
              value={data.title}
              onChange={(e) => updateData({ title: e.target.value })}
              className="w-full rounded-xl border border-brand-gray-300 p-3 text-sm text-brand-gray-900 focus:border-brand-gold-500 focus:outline-none"
            >
              <option value="เด็กชาย">เด็กชาย</option>
              <option value="เด็กหญิง">เด็กหญิง</option>
              <option value="นาย">นาย</option>
              <option value="นางสาว">นางสาว</option>
            </select>
          </div>

          {/* First Name TH */}
          <div className="space-y-1.5">
            <label className="block text-xs font-semibold text-brand-gray-700">
              ชื่อ (ภาษาไทย) <span className="text-rose-500">*</span>
            </label>
            <input
              type="text"
              required
              placeholder="เช่น สมชาย"
              value={data.firstNameTh}
              onChange={(e) => updateData({ firstNameTh: e.target.value })}
              className="w-full rounded-xl border border-brand-gray-300 p-3 text-sm text-brand-gray-900 focus:border-brand-gold-500 focus:outline-none"
            />
          </div>

          {/* Last Name TH */}
          <div className="space-y-1.5">
            <label className="block text-xs font-semibold text-brand-gray-700">
              นามสกุล (ภาษาไทย) <span className="text-rose-500">*</span>
            </label>
            <input
              type="text"
              required
              placeholder="เช่น รักเรียน"
              value={data.lastNameTh}
              onChange={(e) => updateData({ lastNameTh: e.target.value })}
              className="w-full rounded-xl border border-brand-gray-300 p-3 text-sm text-brand-gray-900 focus:border-brand-gold-500 focus:outline-none"
            />
          </div>

          {/* First Name EN */}
          <div className="space-y-1.5">
            <label className="block text-xs font-semibold text-brand-gray-700">
              First Name (English)
            </label>
            <input
              type="text"
              placeholder="e.g. Somchai"
              value={data.firstNameEn}
              onChange={(e) => updateData({ firstNameEn: e.target.value })}
              className="w-full rounded-xl border border-brand-gray-300 p-3 text-sm text-brand-gray-900 focus:border-brand-gold-500 focus:outline-none"
            />
          </div>

          {/* Last Name EN */}
          <div className="space-y-1.5">
            <label className="block text-xs font-semibold text-brand-gray-700">
              Last Name (English)
            </label>
            <input
              type="text"
              placeholder="e.g. Rakrian"
              value={data.lastNameEn}
              onChange={(e) => updateData({ lastNameEn: e.target.value })}
              className="w-full rounded-xl border border-brand-gray-300 p-3 text-sm text-brand-gray-900 focus:border-brand-gold-500 focus:outline-none"
            />
          </div>

          {/* Birth Date */}
          <div className="space-y-1.5">
            <label className="block text-xs font-semibold text-brand-gray-700">
              วัน/เดือน/ปีเกิด <span className="text-rose-500">*</span>
            </label>
            <input
              type="date"
              required
              value={data.birthDate}
              onChange={(e) => updateData({ birthDate: e.target.value })}
              className="w-full rounded-xl border border-brand-gray-300 p-3 text-sm text-brand-gray-900 focus:border-brand-gold-500 focus:outline-none"
            />
          </div>

          {/* Gender */}
          <div className="space-y-1.5">
            <label className="block text-xs font-semibold text-brand-gray-700">
              เพศ <span className="text-rose-500">*</span>
            </label>
            <select
              value={data.gender}
              onChange={(e) => updateData({ gender: e.target.value as "male" | "female" })}
              className="w-full rounded-xl border border-brand-gray-300 p-3 text-sm text-brand-gray-900 focus:border-brand-gold-500 focus:outline-none"
            >
              <option value="male">ชาย</option>
              <option value="female">หญิง</option>
            </select>
          </div>

          {/* Religion */}
          <div className="space-y-1.5">
            <label className="block text-xs font-semibold text-brand-gray-700">
              ศาสนา
            </label>
            <input
              type="text"
              placeholder="เช่น พุทธ, อิสลาม, คริสต์"
              value={data.religion}
              onChange={(e) => updateData({ religion: e.target.value })}
              className="w-full rounded-xl border border-brand-gray-300 p-3 text-sm text-brand-gray-900 focus:border-brand-gold-500 focus:outline-none"
            />
          </div>

          {/* Phone */}
          <div className="space-y-1.5">
            <label className="block text-xs font-semibold text-brand-gray-700">
              เบอร์โทรศัพท์ติดต่อ (นักเรียน) <span className="text-rose-500">*</span>
            </label>
            <input
              type="tel"
              required
              placeholder="08x-xxx-xxxx"
              value={data.phone}
              onChange={(e) => updateData({ phone: e.target.value })}
              className="w-full rounded-xl border border-brand-gray-300 p-3 text-sm text-brand-gray-900 focus:border-brand-gold-500 focus:outline-none"
            />
          </div>
        </div>
      </div>

      {/* 2. Parent / Guardian Information */}
      <div className="rounded-2xl bg-white p-6 border border-brand-gray-200/90 shadow-xs space-y-4">
        <div className="flex items-center gap-2">
          <Phone className="h-5 w-5 text-brand-gold-600" />
          <h3 className="text-base font-bold text-brand-gray-900">
            {isParent ? "2. ข้อมูลผู้ปกครอง (ผู้ให้ข้อมูล)" : "2. ข้อมูลผู้ปกครองที่ติดต่อได้"}
          </h3>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="space-y-1.5">
            <label className="block text-xs font-semibold text-brand-gray-700">
              ความสัมพันธ์กับผู้สมัคร <span className="text-rose-500">*</span>
            </label>
            <select
              value={data.parentRelation}
              onChange={(e) => updateData({ parentRelation: e.target.value })}
              className="w-full rounded-xl border border-brand-gray-300 p-3 text-sm text-brand-gray-900 focus:border-brand-gold-500 focus:outline-none"
            >
              <option value="บิดา">บิดา</option>
              <option value="มารดา">มารดา</option>
              <option value="ผู้ปกครองตามกฎหมาย">ผู้ปกครองตามกฎหมาย</option>
              <option value="ญาติ">ญาติ (ปู่ ย่า ตา ยาย ลุง ป้า น้า อา)</option>
            </select>
          </div>

          <div className="space-y-1.5">
            <label className="block text-xs font-semibold text-brand-gray-700">
              ชื่อ - สกุล ผู้ปกครอง <span className="text-rose-500">*</span>
            </label>
            <input
              type="text"
              required
              placeholder="เช่น นายประสิทธิ์ รักเรียน"
              value={data.parentFullName}
              onChange={(e) => updateData({ parentFullName: e.target.value })}
              className="w-full rounded-xl border border-brand-gray-300 p-3 text-sm text-brand-gray-900 focus:border-brand-gold-500 focus:outline-none"
            />
          </div>

          <div className="space-y-1.5">
            <label className="block text-xs font-semibold text-brand-gray-700">
              เบอร์โทรศัพท์ผู้ปกครอง <span className="text-rose-500">*</span>
            </label>
            <input
              type="tel"
              required
              placeholder="08x-xxx-xxxx"
              value={data.parentPhone}
              onChange={(e) => updateData({ parentPhone: e.target.value })}
              className="w-full rounded-xl border border-brand-gray-300 p-3 text-sm text-brand-gray-900 focus:border-brand-gold-500 focus:outline-none"
            />
          </div>
        </div>
      </div>

      {/* 3. Origin School & House Address */}
      <div className="rounded-2xl bg-white p-6 border border-brand-gray-200/90 shadow-xs space-y-4">
        <div className="flex items-center gap-2">
          <School className="h-5 w-5 text-brand-gold-600" />
          <h3 className="text-base font-bold text-brand-gray-900">
            3. โรงเรียนเดิม และที่อยู่ตามทะเบียนบ้าน
          </h3>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="space-y-1.5">
            <label className="block text-xs font-semibold text-brand-gray-700">
              โรงเรียนเดิมที่กำลังศึกษา/สำเร็จการศึกษา <span className="text-rose-500">*</span>
            </label>
            <input
              type="text"
              required
              placeholder="เช่น โรงเรียนเทศบาลท่าศาลา"
              value={data.previousSchool}
              onChange={(e) => updateData({ previousSchool: e.target.value })}
              className="w-full rounded-xl border border-brand-gray-300 p-3 text-sm text-brand-gray-900 focus:border-brand-gold-500 focus:outline-none"
            />
          </div>

          <div className="space-y-1.5">
            <label className="block text-xs font-semibold text-brand-gray-700">
              จังหวัดของโรงเรียนเดิม
            </label>
            <input
              type="text"
              value={data.previousSchoolProvince}
              onChange={(e) => updateData({ previousSchoolProvince: e.target.value })}
              className="w-full rounded-xl border border-brand-gray-300 p-3 text-sm text-brand-gray-900 focus:border-brand-gold-500 focus:outline-none"
            />
          </div>

          <div className="sm:col-span-2 space-y-1.5">
            <label className="block text-xs font-semibold text-brand-gray-700">
              ที่อยู่ตามทะเบียนบ้าน (บ้านเลขที่, หมู่, ตำบล, อำเภอ, จังหวัด) <span className="text-rose-500">*</span>
            </label>
            <input
              type="text"
              required
              placeholder="เช่น 123/4 หมู่ 5 ต.ท่าศาลา อ.ท่าศาลา จ.นครศรีธรรมราช 80160"
              value={data.addressHouseNo}
              onChange={(e) => updateData({ addressHouseNo: e.target.value })}
              className="w-full rounded-xl border border-brand-gray-300 p-3 text-sm text-brand-gray-900 focus:border-brand-gold-500 focus:outline-none"
            />
          </div>
        </div>
      </div>

      {/* Navigation Buttons */}
      <div className="flex items-center justify-between pt-4">
        <button
          type="button"
          onClick={onBack}
          className="inline-flex items-center gap-2 rounded-xl border border-brand-gray-300 bg-white px-5 py-3 text-sm font-semibold text-brand-gray-700 hover:bg-brand-gray-50 transition-colors"
        >
          <ArrowLeft className="h-4 w-4" />
          <span>ย้อนกลับ</span>
        </button>

        <button
          type="submit"
          className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-brand-gold-500 to-brand-gold-600 px-7 py-3.5 text-sm font-bold text-brand-gray-950 shadow-md hover:from-brand-gold-400 hover:to-brand-gold-500 transition-all hover:-translate-y-0.5 active:translate-y-0"
        >
          <span>ถัดไป: แนบเอกสารหลักฐาน</span>
          <ArrowRight className="h-4 w-4" />
        </button>
      </div>
    </form>
  );
}
