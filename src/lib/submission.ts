import { supabase } from "./supabase";
import { ApplicationFormData, SubmittedApplication } from "@/types/admission";

// Helper to convert Base64 to Blob for Storage upload
function base64ToBlob(base64: string): Blob {
  const arr = base64.split(",");
  const mime = arr[0].match(/:(.*?);/)?.[1] || "application/octet-stream";
  const bstr = atob(arr[1]);
  let n = bstr.length;
  const u8arr = new Uint8Array(n);
  while (n--) {
    u8arr[n] = bstr.charCodeAt(n);
  }
  return new Blob([u8arr], { type: mime });
}

async function uploadDocument(
  fileBase64: string,
  fileName: string,
  applicantId: string,
  docType: string
) {
  const blob = base64ToBlob(fileBase64);
  const ext = fileName.split(".").pop() || "jpg";
  const filePath = `${applicantId}/${docType}-${Date.now()}.${ext}`;

  const { data, error } = await supabase.storage
    .from("applicant_docs")
    .upload(filePath, blob, {
      cacheControl: "3600",
      upsert: false,
    });

  if (error) {
    console.error(`Upload error for ${docType}:`, error);
    return null;
  }

  const { data: publicUrlData } = supabase.storage
    .from("applicant_docs")
    .getPublicUrl(filePath);

  return publicUrlData.publicUrl;
}

export async function submitApplication(
  formData: ApplicationFormData
): Promise<SubmittedApplication> {
  const randomId = Math.floor(1000 + Math.random() * 9000);
  const appNo = `TS69-${randomId}`;

  // 1. Insert into applicants table
  const { data: applicant, error: insertError } = await supabase
    .from("applicants")
    .insert([
      {
        application_no: appNo,
        persona: formData.persona,
        level: formData.level,
        primary_program: formData.primaryProgram,
        secondary_program: formData.secondaryProgram,
        gpax: parseFloat(formData.gpax) || null,
        gpax_math_sci: parseFloat(formData.gpaxMathSci || "0") || null,
        citizen_id: formData.citizenId,
        title: formData.title,
        first_name_th: formData.firstNameTh,
        last_name_th: formData.lastNameTh,
        first_name_en: formData.firstNameEn,
        last_name_en: formData.lastNameEn,
        birth_date: formData.birthDate,
        gender: formData.gender,
        religion: formData.religion,
        blood_type: formData.bloodType,
        phone: formData.phone,
        email: formData.email,
        parent_relation: formData.parentRelation,
        parent_full_name: formData.parentFullName,
        parent_phone: formData.parentPhone,
        parent_occupation: formData.parentOccupation,
        previous_school: formData.previousSchool,
        previous_school_province: formData.previousSchoolProvince,
        address_house_no: formData.addressHouseNo,
        address_moo: formData.addressMoo,
        address_subdistrict: formData.addressSubdistrict,
        address_district: formData.addressDistrict,
        address_province: formData.addressProvince,
        status: "pending",
      },
    ])
    .select("id")
    .single();

  if (insertError || !applicant) {
    throw new Error(insertError?.message || "Failed to insert applicant");
  }

  const applicantId = applicant.id;

  // 2. Upload Documents and save to documents table
  const uploadPromises = [];

  const addDoc = async (base64: string | undefined, name: string | undefined, type: string) => {
    if (base64 && name) {
      const url = await uploadDocument(base64, name, applicantId, type);
      if (url) {
        await supabase.from("documents").insert([
          {
            applicant_id: applicantId,
            doc_type: type,
            file_url: url,
          },
        ]);
      }
    }
  };

  uploadPromises.push(addDoc(formData.photoFile, formData.photoFileName, "photo"));
  uploadPromises.push(addDoc(formData.transcriptFrontFile, formData.transcriptFrontFileName, "transcript_front"));
  uploadPromises.push(addDoc(formData.transcriptBackFile, formData.transcriptBackFileName, "transcript_back"));
  uploadPromises.push(addDoc(formData.houseRegFile, formData.houseRegFileName, "house_reg"));

  await Promise.all(uploadPromises);

  return {
    ...formData,
    applicationNo: appNo,
    submittedAt: new Date().toISOString(),
    status: "pending",
  };
}
