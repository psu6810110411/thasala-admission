"use client";

import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { SubmittedApplication } from "@/types/admission";
import { SUBMITTED_STORAGE_KEY } from "@/lib/constants";
import { StatusSearchForm } from "./StatusSearchForm";
import { StatusDetailView } from "./StatusDetailView";
import { PrintableExamPass } from "./PrintableExamPass";

const DEMO_APPLICATION: SubmittedApplication = {
  applicationNo: "TS69-2048",
  submittedAt: new Date().toISOString(),
  status: "approved",
  persona: "student",
  level: "m1",
  primaryProgram: "m1-smtp",
  secondaryProgram: "m1-regular",
  gpax: "3.85",
  gpaxMathSci: "3.90",
  citizenId: "1809900123456",
  title: "เด็กชาย",
  firstNameTh: "ปัญญา",
  lastNameTh: "มีคุณธรรม",
  firstNameEn: "Panya",
  lastNameEn: "Meekunatham",
  birthDate: "2013-05-15",
  gender: "male",
  religion: "พุทธ",
  bloodType: "B",
  phone: "081-234-5678",
  parentRelation: "บิดา",
  parentFullName: "นายประสิทธิ์ มีคุณธรรม",
  parentPhone: "089-876-5432",
  parentOccupation: "ข้าราชการ",
  previousSchool: "โรงเรียนเทศบาลท่าศาลา",
  previousSchoolProvince: "นครศรีธรรมราช",
  addressHouseNo: "123 หมู่ 3",
  addressSubdistrict: "ท่าศาลา",
  addressDistrict: "ท่าศาลา",
  addressProvince: "นครศรีธรรมราช",
  photoFileName: "student-photo-demo.jpg",
  transcriptFrontFileName: "praphor1-front.pdf",
  transcriptBackFileName: "praphor1-back.pdf",
  houseRegFileName: "house-registration.pdf",
  confirmedAccuracy: true,
};

export function StatusContainer() {
  const searchParams = useSearchParams();
  const [currentApp, setCurrentApp] = useState<SubmittedApplication | null>(null);
  const [viewMode, setViewMode] = useState<"detail" | "print">("detail");
  const [isSearching, setIsSearching] = useState(false);
  const [notFoundMessage, setNotFoundMessage] = useState("");

  const searchApplication = async (query: string, birthDate?: string) => {
    setIsSearching(true);
    setNotFoundMessage("");

    try {
      // Import the dynamic fetcher
      const { fetchApplicantByCitizenIdOrAppNo } = await import("@/lib/admin");
      const found = await fetchApplicantByCitizenIdOrAppNo(query);

      if (found) {
        // Here we could also verify birthDate if provided
        setCurrentApp(found);
        setViewMode("detail");
      } else {
        setNotFoundMessage(
          `ไม่พบข้อมูลใบสมัครสำหรับ "${query}" กรุณาตรวจสอบเลขประจำตัวประชาชน หรือรหัสใบสมัครอีกครั้ง`
        );
      }
    } catch (e) {
      console.error("Supabase lookup error", e);
      setNotFoundMessage("เกิดข้อผิดพลาดในการค้นหาข้อมูล กรุณาลองใหม่อีกครั้ง");
    } finally {
      setIsSearching(false);
    }
  };

  useEffect(() => {
    const idParam = searchParams.get("id");
    if (idParam) {
      searchApplication(idParam);
    }
  }, [searchParams]);

  if (currentApp) {
    if (viewMode === "print") {
      return (
        <PrintableExamPass
          application={currentApp}
          onBack={() => setViewMode("detail")}
        />
      );
    }

    return (
      <StatusDetailView
        application={currentApp}
        onPrintPass={() => setViewMode("print")}
        onBackToSearch={() => {
          setCurrentApp(null);
          setNotFoundMessage("");
        }}
      />
    );
  }

  return (
    <div className="space-y-6">
      <StatusSearchForm
        onSearch={searchApplication}
        onLoadDemo={() => {
          setCurrentApp(DEMO_APPLICATION);
          setViewMode("detail");
        }}
        isSearching={isSearching}
      />

      {notFoundMessage && (
        <div className="max-w-xl mx-auto rounded-2xl bg-rose-50 p-4 border border-rose-200 text-rose-800 text-xs text-center">
          {notFoundMessage}
        </div>
      )}
    </div>
  );
}
