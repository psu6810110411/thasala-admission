import { supabase } from "./supabase";
import { SubmittedApplication } from "@/types/admission";

// Helper to map DB row to SubmittedApplication
// Ensure property names match your DB schema and frontend types
export function mapApplicantFromDB(row: any): SubmittedApplication {
  return {
    applicationNo: row.application_no,
    persona: row.persona,
    level: row.level,
    primaryProgram: row.primary_program,
    secondaryProgram: row.secondary_program,
    gpax: row.gpax?.toString() || "",
    gpaxMathSci: row.gpax_math_sci?.toString() || "",
    citizenId: row.citizen_id,
    title: row.title,
    firstNameTh: row.first_name_th,
    lastNameTh: row.last_name_th,
    firstNameEn: row.first_name_en,
    lastNameEn: row.last_name_en,
    birthDate: row.birth_date,
    gender: row.gender,
    religion: row.religion,
    bloodType: row.blood_type,
    phone: row.phone,
    email: row.email,
    parentRelation: row.parent_relation,
    parentFullName: row.parent_full_name,
    parentPhone: row.parent_phone,
    parentOccupation: row.parent_occupation,
    previousSchool: row.previous_school,
    previousSchoolProvince: row.previous_school_province,
    addressHouseNo: row.address_house_no,
    addressMoo: row.address_moo,
    addressSubdistrict: row.address_subdistrict,
    addressDistrict: row.address_district,
    addressProvince: row.address_province,
    status: row.status,
    submittedAt: row.submitted_at,
    confirmedAccuracy: true,
  };
}

export async function fetchAllApplicants(): Promise<SubmittedApplication[]> {
  const { data, error } = await supabase
    .from("applicants")
    .select("*")
    .order("submitted_at", { ascending: false });

  if (error) {
    console.error("Error fetching applicants:", error);
    return [];
  }

  return data.map(mapApplicantFromDB);
}

export async function updateApplicantStatus(
  appNo: string,
  newStatus: "approved" | "action_required" | "pending"
) {
  const { error } = await supabase
    .from("applicants")
    .update({ status: newStatus })
    .eq("application_no", appNo);

  if (error) {
    console.error("Error updating status:", error);
    throw error;
  }
}

export async function fetchApplicantByCitizenIdOrAppNo(
  query: string
): Promise<SubmittedApplication | null> {
  const cleanQuery = query.trim();
  const isCitizenId = /^[0-9]+$/.test(cleanQuery);

  const { data, error } = await supabase
    .from("applicants")
    .select("*")
    .or(
      isCitizenId
        ? `citizen_id.eq.${cleanQuery}`
        : `application_no.ilike.${cleanQuery}`
    )
    .single();

  if (error || !data) {
    return null;
  }

  return mapApplicantFromDB(data);
}
