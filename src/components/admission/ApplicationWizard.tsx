"use client";

import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { ApplicationFormData, SubmittedApplication, EducationLevel } from "@/types/admission";
import { INITIAL_FORM_DATA, DRAFT_STORAGE_KEY, SUBMITTED_STORAGE_KEY } from "@/lib/constants";
import { draftSchema } from "@/lib/schemas";
import { PersonaSwitcher } from "./PersonaSwitcher";
import { StepIndicator } from "./StepIndicator";
import { Step1Program } from "./Step1Program";
import { Step2PersonalInfo } from "./Step2PersonalInfo";
import { Step3Documents } from "./Step3Documents";
import { Step4Review } from "./Step4Review";
import { SuccessModal } from "./SuccessModal";
import { CheckCircle2, RotateCcw } from "lucide-react";

export function ApplicationWizard() {
  const searchParams = useSearchParams();
  const [formData, setFormData] = useState<ApplicationFormData>(INITIAL_FORM_DATA);
  const [currentStep, setCurrentStep] = useState<number>(1);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [submittedData, setSubmittedData] = useState<SubmittedApplication | null>(null);
  const [hasDraft, setHasDraft] = useState<boolean>(false);
  const [draftSavedTime, setDraftSavedTime] = useState<string>("");

  // Initialize from searchParams & load draft if available
  useEffect(() => {
    const levelParam = searchParams.get("level") as EducationLevel | null;
    const programParam = searchParams.get("program");

    const savedDraft = localStorage.getItem(DRAFT_STORAGE_KEY);
    if (savedDraft) {
      try {
        const parsed = JSON.parse(savedDraft);
        const validDraft = draftSchema.safeParse(parsed);
        if (validDraft.success) {
          // Merge with initial just in case fields are missing
          setFormData({ ...INITIAL_FORM_DATA, ...validDraft.data } as ApplicationFormData);
          setHasDraft(true);
          setDraftSavedTime("พบข้อมูลร่างที่บันทึกไว้");
          return;
        }
      } catch (e) {
        console.error("Failed to parse draft", e);
      }
    }

    if (levelParam === "m1" || levelParam === "m4") {
      setFormData((prev) => ({
        ...prev,
        level: levelParam,
        primaryProgram: programParam || prev.primaryProgram,
      }));
    }
  }, [searchParams]);

  // Auto-save draft on form change (except after submission)
  const updateData = (fields: Partial<ApplicationFormData>) => {
    setFormData((prev) => {
      const next = { ...prev, ...fields };
      try {
        localStorage.setItem(DRAFT_STORAGE_KEY, JSON.stringify(next));
        setDraftSavedTime("บันทึกร่างอัตโนมัติแล้ว");
      } catch (err) {
        // localStorage might be full if large base64 files
      }
      return next;
    });
  };

  const handleResetDraft = () => {
    if (confirm("คุณต้องการล้างข้อมูลที่กรอกไว้ทั้งหมดและเริ่มใหม่ใช่หรือไม่?")) {
      localStorage.removeItem(DRAFT_STORAGE_KEY);
      setFormData(INITIAL_FORM_DATA);
      setCurrentStep(1);
      setHasDraft(false);
      setDraftSavedTime("");
    }
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);
    try {
      // Import the submission service dynamically or use it if imported
      const { submitApplication } = await import("@/lib/submission");
      
      const finalSubmission = await submitApplication(formData);

      // Save to local storage list just for quick status lookup prototype if needed
      // (Optional: can be removed if status page fetches purely from Supabase later)
      const existingList = JSON.parse(
        localStorage.getItem(SUBMITTED_STORAGE_KEY) || "[]"
      );
      existingList.push(finalSubmission);
      localStorage.setItem(SUBMITTED_STORAGE_KEY, JSON.stringify(existingList));
      
      localStorage.removeItem(DRAFT_STORAGE_KEY);
      
      setSubmittedData(finalSubmission);
      window.scrollTo({ top: 0, behavior: "smooth" });
    } catch (error) {
      console.error("Submission failed:", error);
      alert("เกิดข้อผิดพลาดในการส่งข้อมูล โปรดลองใหม่อีกครั้ง");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (submittedData) {
    return <SuccessModal application={submittedData} />;
  }

  return (
    <div className="max-w-4xl mx-auto">
      {/* Wizard Header */}
      <div className="text-center space-y-2 mb-8">
        <h1 className="text-2xl sm:text-4xl font-extrabold text-brand-gray-900 tracking-tight">
          ระบบรับสมัครนักเรียนออนไลน์
        </h1>
        <p className="text-xs sm:text-sm text-brand-gray-600">
          โรงเรียนท่าศาลาประสิทธิ์ศึกษา &bull; ประจำปีการศึกษา 2569
        </p>

        {/* Auto-save indicator */}
        <div className="flex items-center justify-center gap-3 pt-2">
          {draftSavedTime && (
            <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200">
              <CheckCircle2 className="h-3 w-3" />
              {draftSavedTime}
            </span>
          )}
          {hasDraft && (
            <button
              type="button"
              onClick={handleResetDraft}
              className="inline-flex items-center gap-1 text-[11px] font-medium text-brand-gray-500 hover:text-rose-600 transition-colors"
            >
              <RotateCcw className="h-3 w-3" />
              ล้างข้อมูลเริ่มใหม่
            </button>
          )}
        </div>
      </div>

      {/* Persona Switcher */}
      <PersonaSwitcher
        currentPersona={formData.persona}
        onSelect={(p) => updateData({ persona: p })}
      />

      {/* Step Indicator */}
      <StepIndicator
        currentStep={currentStep}
        onStepClick={(step) => {
          setCurrentStep(step);
          window.scrollTo({ top: 0, behavior: "smooth" });
        }}
      />

      {/* Step Content */}
      <div className="mt-6">
        {currentStep === 1 && (
          <Step1Program
            data={formData}
            updateData={updateData}
            onNext={() => {
              setCurrentStep(2);
              window.scrollTo({ top: 0, behavior: "smooth" });
            }}
          />
        )}

        {currentStep === 2 && (
          <Step2PersonalInfo
            data={formData}
            updateData={updateData}
            onNext={() => {
              setCurrentStep(3);
              window.scrollTo({ top: 0, behavior: "smooth" });
            }}
            onBack={() => {
              setCurrentStep(1);
              window.scrollTo({ top: 0, behavior: "smooth" });
            }}
          />
        )}

        {currentStep === 3 && (
          <Step3Documents
            data={formData}
            updateData={updateData}
            onNext={() => {
              setCurrentStep(4);
              window.scrollTo({ top: 0, behavior: "smooth" });
            }}
            onBack={() => {
              setCurrentStep(2);
              window.scrollTo({ top: 0, behavior: "smooth" });
            }}
          />
        )}

        {currentStep === 4 && (
          <Step4Review
            data={formData}
            updateData={updateData}
            onSubmit={handleSubmit}
            onBack={() => {
              setCurrentStep(3);
              window.scrollTo({ top: 0, behavior: "smooth" });
            }}
            isSubmitting={isSubmitting}
          />
        )}
      </div>
    </div>
  );
}
