"use client";

import { useState, useCallback } from "react";
import dynamic from "next/dynamic";
import { SubmittedApplication } from "@/types/admission";
import { fetchApplicantByCitizenIdOrAppNo, updateApplicantStatus } from "@/lib/admin";
import { Scan, CheckCircle2, User, MapPin, Loader2, AlertTriangle, ArrowRight } from "lucide-react";

// Dynamically import the scanner to avoid SSR issues with browser APIs
const Html5QrcodePlugin = dynamic(
  () => import("@/components/scanner/Html5QrcodePlugin"),
  { ssr: false }
);

export default function ScannerPage() {
  const [scannedData, setScannedData] = useState<string>("");
  const [applicant, setApplicant] = useState<SubmittedApplication | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [errorMsg, setErrorMsg] = useState<string>("");
  const [successMsg, setSuccessMsg] = useState<string>("");

  const handleScanSuccess = useCallback(async (decodedText: string) => {
    // Prevent duplicate scans while loading or already showing a result
    if (loading || decodedText === scannedData) return;
    
    setScannedData(decodedText);
    setLoading(true);
    setErrorMsg("");
    setSuccessMsg("");
    setApplicant(null);

    try {
      const data = await fetchApplicantByCitizenIdOrAppNo(decodedText);
      if (data) {
        setApplicant(data);
      } else {
        setErrorMsg(`ไม่พบข้อมูลผู้สมัครสำหรับรหัส: ${decodedText}`);
        setTimeout(() => setScannedData(""), 3000); // Reset after 3s
      }
    } catch (err) {
      console.error(err);
      setErrorMsg("เกิดข้อผิดพลาดในการเชื่อมต่อฐานข้อมูล");
    } finally {
      setLoading(false);
    }
  }, [loading, scannedData]);

  const handleConfirmAttendance = async () => {
    if (!applicant) return;
    
    setLoading(true);
    try {
      // For this prototype, we'll mark them as 'approved' or ideally have an 'attended' status.
      // Assuming 'approved' means they verified and entered the exam room.
      await updateApplicantStatus(applicant.applicationNo, "approved");
      setSuccessMsg(`ยืนยันการเข้าสอบของ ${applicant.firstNameTh} ${applicant.lastNameTh} เรียบร้อยแล้ว`);
      
      // Reset after 3 seconds for the next person
      setTimeout(() => {
        setApplicant(null);
        setScannedData("");
        setSuccessMsg("");
      }, 3000);
    } catch (err) {
      setErrorMsg("ไม่สามารถบันทึกข้อมูลการเข้าสอบได้");
    } finally {
      setLoading(false);
    }
  };

  const handleManualSearch = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const query = formData.get("query") as string;
    if (query) {
      handleScanSuccess(query);
    }
  };

  return (
    <div className="min-h-[80vh] flex flex-col items-center justify-center py-10 px-4">
      <div className="w-full max-w-xl space-y-6">
        
        {/* Header */}
        <div className="text-center space-y-2">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-brand-gold-50 text-brand-gold-700 text-xs font-bold border border-brand-gold-200">
            <Scan className="h-4 w-4" />
            ระบบสแกนบัตรเข้าห้องสอบ
          </div>
          <h1 className="text-2xl font-extrabold text-brand-gray-900">
            จุดลงทะเบียนหน้าห้องสอบ
          </h1>
          <p className="text-sm text-brand-gray-500">
            โรงเรียนท่าศาลาประสิทธิ์ศึกษา
          </p>
        </div>

        {/* Scanner Area */}
        {!applicant && !successMsg && (
          <div className="bg-white rounded-3xl border border-brand-gray-200 p-4 sm:p-6 shadow-sm space-y-6">
            <div className="overflow-hidden rounded-2xl bg-brand-gray-50 flex items-center justify-center min-h-[300px]">
              <Html5QrcodePlugin
                fps={10}
                qrbox={250}
                disableFlip={false}
                qrCodeSuccessCallback={handleScanSuccess}
              />
            </div>
            
            <div className="text-center">
              <span className="text-xs font-bold text-brand-gray-400 uppercase tracking-widest">
                หรือ
              </span>
            </div>

            <form onSubmit={handleManualSearch} className="flex gap-2">
              <input
                type="text"
                name="query"
                placeholder="กรอกรหัสบัตรประชาชน หรือเลขที่ใบสมัคร..."
                className="flex-1 px-4 py-3 rounded-xl border border-brand-gray-300 text-sm focus:outline-none focus:border-brand-gold-500 focus:ring-1 focus:ring-brand-gold-500"
              />
              <button
                type="submit"
                disabled={loading}
                className="px-6 py-3 rounded-xl bg-brand-gray-900 text-white text-sm font-bold hover:bg-brand-gray-800 disabled:opacity-50 flex items-center justify-center"
              >
                {loading ? <Loader2 className="h-5 w-5 animate-spin" /> : "ค้นหา"}
              </button>
            </form>

            {errorMsg && (
              <div className="p-3 bg-rose-50 text-rose-700 text-sm font-medium rounded-xl border border-rose-200 flex items-center gap-2">
                <AlertTriangle className="h-4 w-4 shrink-0" />
                {errorMsg}
              </div>
            )}
          </div>
        )}

        {/* Result Area */}
        {applicant && !successMsg && (
          <div className="bg-white rounded-3xl border border-brand-gray-200 p-6 sm:p-8 shadow-sm space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="flex items-start justify-between">
              <div className="space-y-1">
                <span className="inline-block px-2.5 py-1 rounded-md bg-emerald-50 text-emerald-700 text-[11px] font-bold border border-emerald-100">
                  พบข้อมูลผู้สมัคร
                </span>
                <h2 className="text-xl font-bold text-brand-gray-900">
                  {applicant.title}{applicant.firstNameTh} {applicant.lastNameTh}
                </h2>
                <p className="text-sm text-brand-gray-500 font-mono">
                  {applicant.applicationNo} &bull; {applicant.citizenId}
                </p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 p-4 bg-brand-gray-50 rounded-2xl border border-brand-gray-100">
              <div>
                <span className="text-[11px] font-bold text-brand-gray-500 uppercase block mb-1">
                  ระดับชั้น
                </span>
                <span className="text-sm font-semibold text-brand-gray-900">
                  {applicant.level === "m1" ? "ม.1" : "ม.4"}
                </span>
              </div>
              <div>
                <span className="text-[11px] font-bold text-brand-gray-500 uppercase block mb-1">
                  แผนการเรียน
                </span>
                <span className="text-sm font-semibold text-brand-gray-900">
                  {applicant.primaryProgram}
                </span>
              </div>
              <div className="col-span-2 flex items-center gap-2">
                <MapPin className="h-4 w-4 text-brand-gold-500" />
                <span className="text-sm font-semibold text-brand-gray-900">
                  ห้องสอบ: 401 (อาคารเรียน 4)
                </span>
              </div>
            </div>

            <div className="flex gap-3">
              <button
                type="button"
                onClick={() => {
                  setApplicant(null);
                  setScannedData("");
                }}
                className="flex-1 px-4 py-3 rounded-xl border border-brand-gray-300 text-brand-gray-700 text-sm font-bold hover:bg-brand-gray-50"
              >
                ยกเลิก
              </button>
              <button
                type="button"
                onClick={handleConfirmAttendance}
                disabled={loading}
                className="flex-1 px-4 py-3 rounded-xl bg-gradient-to-r from-brand-gold-500 to-brand-gold-600 text-brand-gray-950 text-sm font-bold hover:from-brand-gold-400 hover:to-brand-gold-500 shadow-sm flex items-center justify-center gap-2 disabled:opacity-50"
              >
                {loading ? (
                  <Loader2 className="h-5 w-5 animate-spin" />
                ) : (
                  <>
                    ยืนยันเข้าห้องสอบ
                    <ArrowRight className="h-4 w-4" />
                  </>
                )}
              </button>
            </div>
          </div>
        )}

        {/* Success Message */}
        {successMsg && (
          <div className="bg-emerald-50 rounded-3xl border border-emerald-200 p-8 shadow-sm text-center space-y-4 animate-in zoom-in-95 duration-500">
            <div className="h-16 w-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-2">
              <CheckCircle2 className="h-8 w-8" />
            </div>
            <h3 className="text-xl font-bold text-emerald-800">
              สำเร็จ!
            </h3>
            <p className="text-sm text-emerald-700">
              {successMsg}
            </p>
            <p className="text-xs text-emerald-600/70 pt-2">
              กำลังเตรียมสแกนคนต่อไป...
            </p>
          </div>
        )}

      </div>
    </div>
  );
}
