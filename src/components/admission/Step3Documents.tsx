"use client";

import { ApplicationFormData } from "@/types/admission";
import { UploadCloud, FileText, Image as ImageIcon, Trash2, CheckCircle2, ArrowLeft, ArrowRight, AlertCircle } from "lucide-react";
import Image from "next/image";

interface Step3DocumentsProps {
  data: ApplicationFormData;
  updateData: (fields: Partial<ApplicationFormData>) => void;
  onNext: () => void;
  onBack: () => void;
}

export function Step3Documents({
  data,
  updateData,
  onNext,
  onBack,
}: Step3DocumentsProps) {
  const handleFileUpload = (
    e: React.ChangeEvent<HTMLInputElement>,
    fieldKey: "photoFile" | "transcriptFrontFile" | "transcriptBackFile" | "houseRegFile",
    nameKey: "photoFileName" | "transcriptFrontFileName" | "transcriptBackFileName" | "houseRegFileName"
  ) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > 5 * 1024 * 1024) {
      alert("ขนาดไฟล์เกิน 5MB กรุณาเลือกไฟล์ที่มีขนาดไม่เกิน 5MB");
      return;
    }

    const reader = new FileReader();
    reader.onload = () => {
      updateData({
        [fieldKey]: reader.result as string,
        [nameKey]: file.name,
      });
    };
    reader.readAsDataURL(file);
  };

  const removeFile = (
    fieldKey: "photoFile" | "transcriptFrontFile" | "transcriptBackFile" | "houseRegFile",
    nameKey: "photoFileName" | "transcriptFrontFileName" | "transcriptBackFileName" | "houseRegFileName"
  ) => {
    updateData({
      [fieldKey]: undefined,
      [nameKey]: undefined,
    });
  };

  const handleNext = () => {
    // For demo/prototype, allow proceeding with a gentle warning if files not uploaded yet
    if (!data.photoFile || !data.transcriptFrontFile) {
      if (
        !confirm(
          "คุณยังไม่ได้แนบรูปถ่าย หรือระเบียน ปพ.1 ครบถ้วน ต้องการดำเนินการต่อไปยังหน้าสรุปหรือไม่? (สามารถกลับมาอัปโหลดได้)"
        )
      ) {
        return;
      }
    }
    onNext();
  };

  return (
    <div className="space-y-8">
      {/* Upload Header Note */}
      <div className="rounded-2xl bg-white p-6 border border-brand-gray-200/90 shadow-xs">
        <h3 className="text-base font-bold text-brand-gray-900">
          อัปโหลดเอกสารหลักฐานประกอบการสมัคร
        </h3>
        <p className="text-xs text-brand-gray-500 mt-1 leading-relaxed">
          รองรับไฟล์รูปภาพ (JPG, PNG) หรือไฟล์ PDF ขนาดไม่เกิน 5MB ต่อไฟล์ เอกสารต้องชัดเจน ตัวอักษรและคะแนนอ่านออกได้ง่าย
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* 1. Student Photo */}
        <div className="rounded-2xl bg-white p-5 border border-brand-gray-200/90 shadow-xs space-y-4 flex flex-col justify-between">
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-sm font-bold text-brand-gray-900">
                1. รูปถ่ายหน้าตรงชุดนักเรียน <span className="text-rose-500">*</span>
              </span>
              {data.photoFile && (
                <span className="inline-flex items-center gap-1 text-[11px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-md">
                  <CheckCircle2 className="h-3 w-3" />
                  แนบแล้ว
                </span>
              )}
            </div>
            <p className="text-xs text-brand-gray-500">
              ขนาด 1.5 นิ้ว หน้าตรง ไม่สวมหมวก ไม่ใส่แว่นตาดำ ถ่ายไว้ไม่เกิน 6 เดือน
            </p>
          </div>

          {data.photoFile ? (
            <div className="flex items-center gap-4 rounded-xl bg-brand-gray-50 p-3.5 border border-brand-gray-200">
              <div className="relative h-20 w-16 shrink-0 overflow-hidden rounded-lg border border-brand-gray-300 bg-white">
                <Image
                  src={data.photoFile}
                  alt="Student Photo"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-xs font-bold text-brand-gray-800 truncate">
                  {data.photoFileName || "student-photo.jpg"}
                </p>
                <p className="text-[11px] text-emerald-600 mt-0.5">พร้อมใช้งาน</p>
              </div>
              <button
                type="button"
                onClick={() => removeFile("photoFile", "photoFileName")}
                className="p-2 text-rose-500 hover:bg-rose-50 rounded-lg transition-colors"
                title="ลบไฟล์"
              >
                <Trash2 className="h-4 w-4" />
              </button>
            </div>
          ) : (
            <label className="flex flex-col items-center justify-center rounded-xl border-2 border-dashed border-brand-gray-300 bg-brand-gray-50/60 p-6 text-center hover:bg-brand-gold-50/30 hover:border-brand-gold-400 cursor-pointer transition-all">
              <ImageIcon className="h-8 w-8 text-brand-gray-400 mb-2" />
              <span className="text-xs font-bold text-brand-gray-800">
                คลิกเพื่อเลือกรูปถ่าย หรือลากไฟล์มาวาง
              </span>
              <span className="text-[11px] text-brand-gray-400 mt-1">
                PNG, JPG ขนาดไม่เกิน 5MB
              </span>
              <input
                type="file"
                accept="image/png, image/jpeg, image/jpg"
                className="hidden"
                onChange={(e) => handleFileUpload(e, "photoFile", "photoFileName")}
              />
            </label>
          )}
        </div>

        {/* 2. Transcript Front (ปพ.1 หน้า) */}
        <div className="rounded-2xl bg-white p-5 border border-brand-gray-200/90 shadow-xs space-y-4 flex flex-col justify-between">
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-sm font-bold text-brand-gray-900">
                2. ระเบียนแสดงผลการเรียน (ปพ.1 ด้านหน้า) <span className="text-rose-500">*</span>
              </span>
              {data.transcriptFrontFile && (
                <span className="inline-flex items-center gap-1 text-[11px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-md">
                  <CheckCircle2 className="h-3 w-3" />
                  แนบแล้ว
                </span>
              )}
            </div>
            <p className="text-xs text-brand-gray-500">
              เอกสาร ปพ.1 หรือใบรับรองผลการเรียนรวม 5 ภาคเรียน ด้านหน้า
            </p>
          </div>

          {data.transcriptFrontFile ? (
            <div className="flex items-center gap-3.5 rounded-xl bg-brand-gray-50 p-3.5 border border-brand-gray-200">
              <FileText className="h-8 w-8 text-brand-gold-600 shrink-0" />
              <div className="flex-1 min-w-0">
                <p className="text-xs font-bold text-brand-gray-800 truncate">
                  {data.transcriptFrontFileName || "transcript-front.pdf"}
                </p>
                <p className="text-[11px] text-emerald-600 mt-0.5">พร้อมตรวจสอบ</p>
              </div>
              <button
                type="button"
                onClick={() =>
                  removeFile("transcriptFrontFile", "transcriptFrontFileName")
                }
                className="p-2 text-rose-500 hover:bg-rose-50 rounded-lg transition-colors"
                title="ลบไฟล์"
              >
                <Trash2 className="h-4 w-4" />
              </button>
            </div>
          ) : (
            <label className="flex flex-col items-center justify-center rounded-xl border-2 border-dashed border-brand-gray-300 bg-brand-gray-50/60 p-6 text-center hover:bg-brand-gold-50/30 hover:border-brand-gold-400 cursor-pointer transition-all">
              <UploadCloud className="h-8 w-8 text-brand-gray-400 mb-2" />
              <span className="text-xs font-bold text-brand-gray-800">
                คลิกเพื่อแนบ ปพ.1 ด้านหน้า
              </span>
              <span className="text-[11px] text-brand-gray-400 mt-1">
                PDF, JPG, PNG ขนาดไม่เกิน 5MB
              </span>
              <input
                type="file"
                accept="application/pdf, image/png, image/jpeg"
                className="hidden"
                onChange={(e) =>
                  handleFileUpload(e, "transcriptFrontFile", "transcriptFrontFileName")
                }
              />
            </label>
          )}
        </div>

        {/* 3. Transcript Back (ปพ.1 หลัง) */}
        <div className="rounded-2xl bg-white p-5 border border-brand-gray-200/90 shadow-xs space-y-4 flex flex-col justify-between">
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-sm font-bold text-brand-gray-900">
                3. ระเบียนแสดงผลการเรียน (ปพ.1 ด้านหลัง)
              </span>
              {data.transcriptBackFile && (
                <span className="inline-flex items-center gap-1 text-[11px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-md">
                  <CheckCircle2 className="h-3 w-3" />
                  แนบแล้ว
                </span>
              )}
            </div>
            <p className="text-xs text-brand-gray-500">
              ด้านหลังที่มีเกณฑ์การตัดสินและลายมือชื่อนายทะเบียน
            </p>
          </div>

          {data.transcriptBackFile ? (
            <div className="flex items-center gap-3.5 rounded-xl bg-brand-gray-50 p-3.5 border border-brand-gray-200">
              <FileText className="h-8 w-8 text-brand-gold-600 shrink-0" />
              <div className="flex-1 min-w-0">
                <p className="text-xs font-bold text-brand-gray-800 truncate">
                  {data.transcriptBackFileName || "transcript-back.pdf"}
                </p>
                <p className="text-[11px] text-emerald-600 mt-0.5">พร้อมตรวจสอบ</p>
              </div>
              <button
                type="button"
                onClick={() =>
                  removeFile("transcriptBackFile", "transcriptBackFileName")
                }
                className="p-2 text-rose-500 hover:bg-rose-50 rounded-lg transition-colors"
                title="ลบไฟล์"
              >
                <Trash2 className="h-4 w-4" />
              </button>
            </div>
          ) : (
            <label className="flex flex-col items-center justify-center rounded-xl border-2 border-dashed border-brand-gray-300 bg-brand-gray-50/60 p-6 text-center hover:bg-brand-gold-50/30 hover:border-brand-gold-400 cursor-pointer transition-all">
              <UploadCloud className="h-8 w-8 text-brand-gray-400 mb-2" />
              <span className="text-xs font-bold text-brand-gray-800">
                คลิกเพื่อแนบ ปพ.1 ด้านหลัง
              </span>
              <span className="text-[11px] text-brand-gray-400 mt-1">
                PDF, JPG, PNG ขนาดไม่เกิน 5MB
              </span>
              <input
                type="file"
                accept="application/pdf, image/png, image/jpeg"
                className="hidden"
                onChange={(e) =>
                  handleFileUpload(e, "transcriptBackFile", "transcriptBackFileName")
                }
              />
            </label>
          )}
        </div>

        {/* 4. House Registration */}
        <div className="rounded-2xl bg-white p-5 border border-brand-gray-200/90 shadow-xs space-y-4 flex flex-col justify-between">
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-sm font-bold text-brand-gray-900">
                4. สำเนาทะเบียนบ้านของผู้สมัคร
              </span>
              {data.houseRegFile && (
                <span className="inline-flex items-center gap-1 text-[11px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-md">
                  <CheckCircle2 className="h-3 w-3" />
                  แนบแล้ว
                </span>
              )}
            </div>
            <p className="text-xs text-brand-gray-500">
              หน้าที่มีชื่อผู้สมัครและหน้าเจ้าบ้านชัดเจน
            </p>
          </div>

          {data.houseRegFile ? (
            <div className="flex items-center gap-3.5 rounded-xl bg-brand-gray-50 p-3.5 border border-brand-gray-200">
              <FileText className="h-8 w-8 text-brand-gold-600 shrink-0" />
              <div className="flex-1 min-w-0">
                <p className="text-xs font-bold text-brand-gray-800 truncate">
                  {data.houseRegFileName || "house-reg.pdf"}
                </p>
                <p className="text-[11px] text-emerald-600 mt-0.5">พร้อมตรวจสอบ</p>
              </div>
              <button
                type="button"
                onClick={() => removeFile("houseRegFile", "houseRegFileName")}
                className="p-2 text-rose-500 hover:bg-rose-50 rounded-lg transition-colors"
                title="ลบไฟล์"
              >
                <Trash2 className="h-4 w-4" />
              </button>
            </div>
          ) : (
            <label className="flex flex-col items-center justify-center rounded-xl border-2 border-dashed border-brand-gray-300 bg-brand-gray-50/60 p-6 text-center hover:bg-brand-gold-50/30 hover:border-brand-gold-400 cursor-pointer transition-all">
              <UploadCloud className="h-8 w-8 text-brand-gray-400 mb-2" />
              <span className="text-xs font-bold text-brand-gray-800">
                คลิกเพื่อแนบสำเนาทะเบียนบ้าน
              </span>
              <span className="text-[11px] text-brand-gray-400 mt-1">
                PDF, JPG, PNG ขนาดไม่เกิน 5MB
              </span>
              <input
                type="file"
                accept="application/pdf, image/png, image/jpeg"
                className="hidden"
                onChange={(e) => handleFileUpload(e, "houseRegFile", "houseRegFileName")}
              />
            </label>
          )}
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
          type="button"
          onClick={handleNext}
          className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-brand-gold-500 to-brand-gold-600 px-7 py-3.5 text-sm font-bold text-brand-gray-950 shadow-md hover:from-brand-gold-400 hover:to-brand-gold-500 transition-all hover:-translate-y-0.5 active:translate-y-0"
        >
          <span>ถัดไป: สรุปและยืนยันข้อมูล</span>
          <ArrowRight className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
}
