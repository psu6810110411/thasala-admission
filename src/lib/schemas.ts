import { z } from "zod";

// ─── Reusable patterns ───
const thaiName = z
  .string()
  .min(2, "กรุณากรอกอย่างน้อย 2 ตัวอักษร")
  .max(100);

const engName = z
  .string()
  .min(2, "กรุณากรอกอย่างน้อย 2 ตัวอักษร")
  .max(100)
  .regex(/^[a-zA-Z\s'-]+$/, "กรุณากรอกเป็นภาษาอังกฤษเท่านั้น");

const citizenId = z
  .string()
  .length(13, "เลขบัตรประชาชนต้องมี 13 หลัก")
  .regex(/^\d{13}$/, "กรุณากรอกเฉพาะตัวเลข");

const thaiPhone = z
  .string()
  .regex(/^0\d{8,9}$/, "เบอร์โทรศัพท์ไม่ถูกต้อง (เช่น 0812345678)");

const gpaxValue = z.coerce
  .number()
  .min(0, "เกรดเฉลี่ยต้องไม่น้อยกว่า 0")
  .max(4, "เกรดเฉลี่ยต้องไม่เกิน 4.00");

// ─── Step 1: Program Selection ───
export const step1Schema = z.object({
  level: z.enum(["m1", "m4"], { message: "กรุณาเลือกระดับชั้น" }),
  primaryProgram: z.string().min(1, "กรุณาเลือกโครงการหลัก"),
  secondaryProgram: z.string().optional().default(""),
  gpax: z
    .string()
    .min(1, "กรุณากรอกเกรดเฉลี่ย")
    .refine((v) => !isNaN(Number(v)) && Number(v) >= 0 && Number(v) <= 4, {
      message: "เกรดเฉลี่ยต้องอยู่ระหว่าง 0.00 - 4.00",
    }),
  gpaxMathSci: z.string().optional().default(""),
});

// ─── Step 2: Personal Information ───
export const step2Schema = z.object({
  citizenId,
  title: z.string().min(1, "กรุณาเลือกคำนำหน้า"),
  firstNameTh: thaiName,
  lastNameTh: thaiName,
  firstNameEn: engName,
  lastNameEn: engName,
  birthDate: z.string().min(1, "กรุณาเลือกวันเกิด"),
  gender: z.enum(["male", "female"], {
    message: "กรุณาเลือกเพศ",
  }),
  religion: z.string().min(1, "กรุณากรอกศาสนา"),
  bloodType: z.string().min(1, "กรุณาเลือกกรุ๊ปเลือด"),
  phone: thaiPhone,
  email: z.string().email("อีเมลไม่ถูกต้อง").optional().or(z.literal("")),

  // Parent info
  parentRelation: z.string().min(1, "กรุณาระบุความสัมพันธ์"),
  parentFullName: thaiName,
  parentPhone: thaiPhone,
  parentOccupation: z.string().min(1, "กรุณากรอกอาชีพผู้ปกครอง"),

  // Origin school & address
  previousSchool: z.string().min(1, "กรุณากรอกชื่อโรงเรียนเดิม"),
  previousSchoolProvince: z.string().min(1, "กรุณากรอกจังหวัดของโรงเรียนเดิม"),
  addressHouseNo: z.string().min(1, "กรุณากรอกบ้านเลขที่"),
  addressMoo: z.string().optional().default(""),
  addressSubdistrict: z.string().min(1, "กรุณากรอกตำบล"),
  addressDistrict: z.string().min(1, "กรุณากรอกอำเภอ"),
  addressProvince: z.string().min(1, "กรุณากรอกจังหวัด"),
});

// ─── Step 3: Documents ───
export const step3Schema = z.object({
  photoFile: z.string().min(1, "กรุณาอัปโหลดรูปถ่าย"),
  photoFileName: z.string().optional(),
  transcriptFrontFile: z.string().min(1, "กรุณาอัปโหลด ปพ.1 ด้านหน้า"),
  transcriptFrontFileName: z.string().optional(),
  transcriptBackFile: z.string().min(1, "กรุณาอัปโหลด ปพ.1 ด้านหลัง"),
  transcriptBackFileName: z.string().optional(),
  houseRegFile: z.string().min(1, "กรุณาอัปโหลดสำเนาทะเบียนบ้าน"),
  houseRegFileName: z.string().optional(),
});

// ─── Step 4: Confirmation ───
export const step4Schema = z.object({
  confirmedAccuracy: z.literal(true, {
    message: "กรุณายืนยันว่าข้อมูลถูกต้อง",
  }),
});

// ─── Full Application Schema ───
export const applicationSchema = z.object({
  persona: z.enum(["student", "parent"]),
  ...step1Schema.shape,
  ...step2Schema.shape,
  ...step3Schema.shape,
  ...step4Schema.shape,
});

// ─── Draft Schema (partial, for localStorage validation) ───
export const draftSchema = applicationSchema.partial();

// ─── Status Lookup Schema ───
export const statusLookupSchema = z.object({
  citizenId,
  birthDate: z.string().min(1, "กรุณาเลือกวันเกิด"),
});

// ─── Type exports ───
export type Step1Data = z.infer<typeof step1Schema>;
export type Step2Data = z.infer<typeof step2Schema>;
export type Step3Data = z.infer<typeof step3Schema>;
export type Step4Data = z.infer<typeof step4Schema>;
export type ApplicationData = z.infer<typeof applicationSchema>;
export type DraftData = z.infer<typeof draftSchema>;
export type StatusLookupData = z.infer<typeof statusLookupSchema>;
