"use client";

import { useState, useEffect } from "react";
import { SubmittedApplication } from "@/types/admission";
import { SUBMITTED_STORAGE_KEY } from "@/lib/constants";
import { AdminStatsOverview } from "./AdminStatsOverview";
import { ApplicantTable } from "./ApplicantTable";
import { VerificationModal } from "./VerificationModal";
import { Download, RefreshCw, ShieldCheck } from "lucide-react";

const INITIAL_MOCK_APPLICANTS: SubmittedApplication[] = [
  {
    applicationNo: "TS69-1001",
    submittedAt: "2026-02-10T09:30:00Z",
    status: "approved",
    persona: "student",
    level: "m1",
    primaryProgram: "m1-smtp",
    secondaryProgram: "m1-regular",
    gpax: "3.92",
    gpaxMathSci: "3.95",
    citizenId: "1809901234567",
    title: "เด็กหญิง",
    firstNameTh: "กัญญาณัฐ",
    lastNameTh: "เพชรรัตน์",
    firstNameEn: "Kanyanat",
    lastNameEn: "Phetcharat",
    birthDate: "2013-04-12",
    gender: "female",
    religion: "พุทธ",
    bloodType: "O",
    phone: "081-111-2222",
    parentRelation: "มารดา",
    parentFullName: "นางรัตนา เพชรรัตน์",
    parentPhone: "089-222-3333",
    parentOccupation: "พยาบาลวิชาชีพ",
    previousSchool: "โรงเรียนอนุบาลนครศรีธรรมราช",
    previousSchoolProvince: "นครศรีธรรมราช",
    addressHouseNo: "45 หมู่ 1",
    addressSubdistrict: "ในเมือง",
    addressDistrict: "เมืองนครศรีธรรมราช",
    addressProvince: "นครศรีธรรมราช",
    photoFileName: "photo-kanyanat.jpg",
    transcriptFrontFileName: "praphor1-front.pdf",
    transcriptBackFileName: "praphor1-back.pdf",
    houseRegFileName: "house-reg.pdf",
    confirmedAccuracy: true,
  },
  {
    applicationNo: "TS69-1002",
    submittedAt: "2026-02-11T14:15:00Z",
    status: "pending",
    persona: "parent",
    level: "m4",
    primaryProgram: "m4-smtp",
    secondaryProgram: "m4-sci-math",
    gpax: "3.78",
    gpaxMathSci: "3.80",
    citizenId: "1809902345678",
    title: "นาย",
    firstNameTh: "ธนกฤต",
    lastNameTh: "สุขเกษม",
    firstNameEn: "Thanakrit",
    lastNameEn: "Sukkasem",
    birthDate: "2010-08-20",
    gender: "male",
    religion: "พุทธ",
    bloodType: "A",
    phone: "082-333-4444",
    parentRelation: "บิดา",
    parentFullName: "นายวิชาญ สุขเกษม",
    parentPhone: "088-555-6666",
    parentOccupation: "ค้าขาย",
    previousSchool: "โรงเรียนท่าศาลาประสิทธิ์ศึกษา",
    previousSchoolProvince: "นครศรีธรรมราช",
    addressHouseNo: "88/12 หมู่ 3",
    addressSubdistrict: "ท่าศาลา",
    addressDistrict: "ท่าศาลา",
    addressProvince: "นครศรีธรรมราช",
    photoFileName: "thanakrit-photo.jpg",
    transcriptFrontFileName: "praphor1-thanakrit.pdf",
    confirmedAccuracy: true,
  },
  {
    applicationNo: "TS69-1003",
    submittedAt: "2026-02-12T11:00:00Z",
    status: "action_required",
    persona: "student",
    level: "m1",
    primaryProgram: "m1-ep",
    secondaryProgram: "m1-regular",
    gpax: "3.45",
    citizenId: "1809903456789",
    title: "เด็กชาย",
    firstNameTh: "มูฮัมหมัด",
    lastNameTh: "ดอเลาะ",
    firstNameEn: "Muhammad",
    lastNameEn: "Dolah",
    birthDate: "2013-11-05",
    gender: "male",
    religion: "อิสลาม",
    bloodType: "B",
    phone: "083-444-5555",
    parentRelation: "บิดา",
    parentFullName: "นายอับดุลเลาะ ดอเลาะ",
    parentPhone: "087-777-8888",
    parentOccupation: "ชาวประมง",
    previousSchool: "โรงเรียนชุมชนบ้านสระบัว",
    previousSchoolProvince: "นครศรีธรรมราช",
    addressHouseNo: "12 หมู่ 2",
    addressSubdistrict: "ท่าขึ้น",
    addressDistrict: "ท่าศาลา",
    addressProvince: "นครศรีธรรมราช",
    photoFileName: "photo-bad-angle.jpg",
    confirmedAccuracy: true,
  },
  {
    applicationNo: "TS69-1004",
    submittedAt: "2026-02-13T16:45:00Z",
    status: "approved",
    persona: "student",
    level: "m4",
    primaryProgram: "m4-ep",
    secondaryProgram: "m4-arts-lang",
    gpax: "3.60",
    citizenId: "1809904567890",
    title: "นางสาว",
    firstNameTh: "ณัชชา",
    lastNameTh: "เจริญสุข",
    firstNameEn: "Natcha",
    lastNameEn: "Charoensuk",
    birthDate: "2010-03-15",
    gender: "female",
    religion: "พุทธ",
    bloodType: "AB",
    phone: "084-555-6666",
    parentRelation: "มารดา",
    parentFullName: "นางสาวศิริพร เจริญสุข",
    parentPhone: "086-666-7777",
    parentOccupation: "พนักงานบริษัท",
    previousSchool: "โรงเรียนโมคลานประชาสรรค์",
    previousSchoolProvince: "นครศรีธรรมราช",
    addressHouseNo: "99 หมู่ 4",
    addressSubdistrict: "โมคลาน",
    addressDistrict: "ท่าศาลา",
    addressProvince: "นครศรีธรรมราช",
    photoFileName: "natcha-photo.jpg",
    transcriptFrontFileName: "praphor1.pdf",
    confirmedAccuracy: true,
  },
];

export function AdminContainer() {
  const [applicants, setApplicants] = useState<SubmittedApplication[]>(INITIAL_MOCK_APPLICANTS);
  const [selectedApplicant, setSelectedApplicant] = useState<SubmittedApplication | null>(null);

  // Sync with localStorage newly submitted applicants
  useEffect(() => {
    try {
      const stored = JSON.parse(localStorage.getItem(SUBMITTED_STORAGE_KEY) || "[]");
      if (stored.length > 0) {
        // Merge stored applications that aren't already in mock
        const existingNos = new Set(INITIAL_MOCK_APPLICANTS.map((a) => a.applicationNo));
        const custom = stored.filter((a: SubmittedApplication) => !existingNos.has(a.applicationNo));
        setApplicants([...custom, ...INITIAL_MOCK_APPLICANTS]);
      }
    } catch (e) {
      console.error("Storage read error", e);
    }
  }, []);

  const handleApprove = (appNo: string) => {
    setApplicants((prev) => {
      const next = prev.map((a) => (a.applicationNo === appNo ? { ...a, status: "approved" as const } : a));
      syncStorage(next);
      return next;
    });
    setSelectedApplicant(null);
  };

  const handleReject = (appNo: string, reason: string) => {
    setApplicants((prev) => {
      const next = prev.map((a) =>
        a.applicationNo === appNo ? { ...a, status: "action_required" as const } : a
      );
      syncStorage(next);
      return next;
    });
    setSelectedApplicant(null);
  };

  const syncStorage = (list: SubmittedApplication[]) => {
    try {
      localStorage.setItem(SUBMITTED_STORAGE_KEY, JSON.stringify(list));
    } catch (e) {
      console.error("Storage sync error", e);
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

        {/* Export Button */}
        <button
          type="button"
          onClick={handleExportCSV}
          className="inline-flex items-center gap-2 rounded-xl bg-brand-gray-900 px-5 py-3 text-xs sm:text-sm font-bold text-brand-gold-400 hover:bg-brand-gray-800 transition-all shadow-sm w-fit"
        >
          <Download className="h-4 w-4" />
          <span>ส่งออกรายงาน Excel (CSV)</span>
        </button>
      </div>

      {/* Stats Overview */}
      <AdminStatsOverview applicants={applicants} />

      {/* Candidate List Table */}
      <ApplicantTable
        applicants={applicants}
        onSelectApplicant={(app) => setSelectedApplicant(app)}
      />

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
