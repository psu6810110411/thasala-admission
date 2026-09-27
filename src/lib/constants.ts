import { ProgramOption, ApplicationFormData } from "@/types/admission";

export const PROGRAMS_M1: ProgramOption[] = [
  {
    id: "m1-smtp",
    name: "โครงการห้องเรียนพิเศษ SMTP (วิทย์-คณิต-เทคโนโลยี)",
    level: "m1",
    type: "special",
    minGpax: 3.0,
  },
  {
    id: "m1-ep",
    name: "โครงการ English Program (EP)",
    level: "m1",
    type: "special",
    minGpax: 2.75,
  },
  {
    id: "m1-regular",
    name: "ห้องเรียนปกติ (ทั่วไป)",
    level: "m1",
    type: "regular",
    minGpax: 2.0,
  },
];

export const PROGRAMS_M4: ProgramOption[] = [
  {
    id: "m4-smtp",
    name: "โครงการห้องเรียนพิเศษ SMTP (วิทย์-คณิต-เทคโนโลยีเข้มข้น)",
    level: "m4",
    type: "special",
    minGpax: 3.0,
  },
  {
    id: "m4-ep",
    name: "โครงการ English Program (EP) ม.4",
    level: "m4",
    type: "special",
    minGpax: 2.75,
  },
  {
    id: "m4-innov",
    name: "โครงการห้องเรียนพิเศษภาษาและนวัตกรรม (CNP/DEP)",
    level: "m4",
    type: "special",
    minGpax: 2.5,
  },
  {
    id: "m4-sci-math",
    name: "แผนการเรียน วิทยาศาสตร์ - คณิตศาสตร์ (ปกติ)",
    level: "m4",
    type: "regular",
    minGpax: 2.5,
  },
  {
    id: "m4-arts-math",
    name: "แผนการเรียน ศิลป์ - คำนวณ (ปกติ)",
    level: "m4",
    type: "regular",
    minGpax: 2.0,
  },
  {
    id: "m4-arts-lang",
    name: "แผนการเรียน ศิลป์ - ภาษา (จีน / มลายู / ญี่ปุ่น)",
    level: "m4",
    type: "regular",
    minGpax: 2.0,
  },
];

export const INITIAL_FORM_DATA: ApplicationFormData = {
  persona: "student",
  level: "m1",
  primaryProgram: "m1-smtp",
  secondaryProgram: "m1-regular",
  gpax: "",
  gpaxMathSci: "",

  citizenId: "",
  title: "เด็กชาย",
  firstNameTh: "",
  lastNameTh: "",
  firstNameEn: "",
  lastNameEn: "",
  birthDate: "2013-05-15",
  gender: "male",
  religion: "พุทธ",
  bloodType: "O",
  phone: "",
  email: "",

  parentRelation: "บิดา",
  parentFullName: "",
  parentPhone: "",
  parentOccupation: "",

  previousSchool: "",
  previousSchoolProvince: "นครศรีธรรมราช",
  addressHouseNo: "",
  addressMoo: "",
  addressSubdistrict: "ท่าศาลา",
  addressDistrict: "ท่าศาลา",
  addressProvince: "นครศรีธรรมราช",

  confirmedAccuracy: false,
};

export const DRAFT_STORAGE_KEY = "thasala_admission_draft_v1";
export const SUBMITTED_STORAGE_KEY = "thasala_admission_submitted_v1";
