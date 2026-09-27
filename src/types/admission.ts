export type PersonaMode = "student" | "parent";

export type EducationLevel = "m1" | "m4";

export interface ProgramOption {
  id: string;
  name: string;
  level: EducationLevel;
  type: "special" | "regular";
  minGpax: number;
}

export interface ApplicationFormData {
  // Persona
  persona: PersonaMode;

  // Step 1: Program Selection
  level: EducationLevel;
  primaryProgram: string;
  secondaryProgram: string;
  gpax: string;
  gpaxMathSci?: string;

  // Step 2: Personal Information
  citizenId: string;
  title: string;
  firstNameTh: string;
  lastNameTh: string;
  firstNameEn: string;
  lastNameEn: string;
  birthDate: string; // YYYY-MM-DD
  gender: "male" | "female";
  religion: string;
  bloodType: string;
  phone: string;
  email?: string;

  // Parent Information
  parentRelation: string;
  parentFullName: string;
  parentPhone: string;
  parentOccupation: string;

  // Origin School & Address
  previousSchool: string;
  previousSchoolProvince: string;
  addressHouseNo: string;
  addressMoo?: string;
  addressSubdistrict: string;
  addressDistrict: string;
  addressProvince: string;

  // Step 3: Document uploads (Base64 or preview URLs for demo/prototype)
  photoFile?: string;
  photoFileName?: string;
  transcriptFrontFile?: string;
  transcriptFrontFileName?: string;
  transcriptBackFile?: string;
  transcriptBackFileName?: string;
  houseRegFile?: string;
  houseRegFileName?: string;

  // Step 4: Submission
  confirmedAccuracy: boolean;
}

export interface SubmittedApplication extends ApplicationFormData {
  applicationNo: string;
  submittedAt: string;
  status: "pending" | "approved" | "action_required";
}
