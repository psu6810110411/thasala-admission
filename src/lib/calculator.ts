import { EducationLevel } from "@/types/admission";

export interface SubjectGrades {
  gpax: number;
  science: number;
  math: number;
  english: number;
  thai: number;
}

export interface CalculationResult {
  score: number; // 0 - 100
  isEligible: boolean;
  minGpaxRequired: number;
  eligibilityIssues: string[];
  readinessLevel: "excellent" | "good" | "moderate" | "needs_improvement";
  readinessLabel: string;
  readinessColor: string; // Tailwind color class
  advice: string[];
}

export interface ProgramFormula {
  id: string;
  name: string;
  level: EducationLevel;
  minGpax: number;
  minMathSci?: number;
  weights: {
    science: number;
    math: number;
    english: number;
    thai: number;
  };
}

export const PROGRAM_FORMULAS: Record<string, ProgramFormula> = {
  // M.1
  "m1-smtp": {
    id: "m1-smtp",
    name: "โครงการพิเศษ SMTP (วิทย์-คณิต-เทคโนโลยี)",
    level: "m1",
    minGpax: 3.0,
    minMathSci: 3.0,
    weights: { science: 40, math: 40, english: 20, thai: 0 },
  },
  "m1-ep": {
    id: "m1-ep",
    name: "โครงการ English Program (EP)",
    level: "m1",
    minGpax: 2.75,
    weights: { english: 50, math: 25, science: 25, thai: 0 },
  },
  "m1-regular": {
    id: "m1-regular",
    name: "ห้องเรียนปกติ (ทั่วไป)",
    level: "m1",
    minGpax: 2.0,
    weights: { science: 25, math: 25, english: 25, thai: 25 },
  },

  // M.4
  "m4-smtp": {
    id: "m4-smtp",
    name: "โครงการพิเศษ SMTP (วิทย์-คณิต-เทคโนโลยีเข้มข้น)",
    level: "m4",
    minGpax: 3.0,
    minMathSci: 3.0,
    weights: { science: 40, math: 40, english: 20, thai: 0 },
  },
  "m4-ep": {
    id: "m4-ep",
    name: "โครงการ English Program (EP) ม.4",
    level: "m4",
    minGpax: 2.75,
    weights: { english: 50, math: 25, science: 25, thai: 0 },
  },
  "m4-innov": {
    id: "m4-innov",
    name: "ห้องเรียนพิเศษภาษาและนวัตกรรม (CNP/DEP)",
    level: "m4",
    minGpax: 2.5,
    weights: { english: 40, thai: 30, math: 15, science: 15 },
  },
  "m4-sci-math": {
    id: "m4-sci-math",
    name: "แผนการเรียน วิทยาศาสตร์ - คณิตศาสตร์ (ปกติ)",
    level: "m4",
    minGpax: 2.5,
    minMathSci: 2.5,
    weights: { science: 35, math: 35, english: 15, thai: 15 },
  },
  "m4-arts-math": {
    id: "m4-arts-math",
    name: "แผนการเรียน ศิลป์ - คำนวณ (ปกติ)",
    level: "m4",
    minGpax: 2.0,
    weights: { math: 35, english: 35, thai: 20, science: 10 },
  },
  "m4-arts-lang": {
    id: "m4-arts-lang",
    name: "แผนการเรียน ศิลป์ - ภาษา (จีน/มลายู/ญี่ปุ่น)",
    level: "m4",
    minGpax: 2.0,
    weights: { english: 45, thai: 35, math: 10, science: 10 },
  },
};

export function calculateReadiness(
  programId: string,
  grades: SubjectGrades
): CalculationResult {
  const formula = PROGRAM_FORMULAS[programId] || PROGRAM_FORMULAS["m1-smtp"];
  const issues: string[] = [];

  // Check GPAX minimum
  if (grades.gpax < formula.minGpax) {
    issues.push(
      `เกรดเฉลี่ยสะสม (GPAX) ${grades.gpax.toFixed(2)} ต่ำกว่าเกณฑ์ขั้นต่ำของโครงการ (${formula.minGpax.toFixed(2)})`
    );
  }

  // Check Math & Sci minimum if required
  if (formula.minMathSci) {
    if (grades.math < formula.minMathSci) {
      issues.push(
        `เกรดเฉลี่ยกลุ่มสาระคณิตศาสตร์ (${grades.math.toFixed(2)}) ต่ำกว่าเกณฑ์ขั้นต่ำ (${formula.minMathSci.toFixed(2)})`
      );
    }
    if (grades.science < formula.minMathSci) {
      issues.push(
        `เกรดเฉลี่ยกลุ่มสาระวิทยาศาสตร์ (${grades.science.toFixed(2)}) ต่ำกว่าเกณฑ์ขั้นต่ำ (${formula.minMathSci.toFixed(2)})`
      );
    }
  }

  // Calculate weighted score (out of 100)
  // Grade is on 0-4 scale: percentage = (grade / 4.0) * weight
  const sciScore = (grades.science / 4.0) * formula.weights.science;
  const mathScore = (grades.math / 4.0) * formula.weights.math;
  const engScore = (grades.english / 4.0) * formula.weights.english;
  const thaiScore = (grades.thai / 4.0) * formula.weights.thai;

  const totalScore = Math.min(100, Math.max(0, Math.round((sciScore + mathScore + engScore + thaiScore) * 10) / 10));
  const isEligible = issues.length === 0;

  let readinessLevel: CalculationResult["readinessLevel"] = "needs_improvement";
  let readinessLabel = "ควรเตรียมตัวเพิ่มเติม";
  let readinessColor = "text-rose-600 bg-rose-50 border-rose-200";
  const advice: string[] = [];

  if (totalScore >= 80 && isEligible) {
    readinessLevel = "excellent";
    readinessLabel = "ความพร้อมระดับสูงมาก (พร้อมสอบแข่งขัน)";
    readinessColor = "text-emerald-700 bg-emerald-50 border-emerald-200";
    advice.push("คุณมีผลการเรียนวิชาหลักที่โดดเด่นมาก มีโอกาสสอบคัดเลือกผ่านเกณฑ์ในระดับสูง");
    advice.push("แนะนำให้ฝึกทำโจทย์แนวคิดวิเคราะห์และข้อสอบแข่งขันปีก่อนๆ เพื่อรักษาความแม่นยำ");
  } else if (totalScore >= 65 && isEligible) {
    readinessLevel = "good";
    readinessLabel = "ความพร้อมระดับดี (มีลุ้นติดแน่นอน)";
    readinessColor = "text-brand-gold-700 bg-brand-gold-50 border-brand-gold-200";
    advice.push("ผลการเรียนรวมอยู่ในเกณฑ์ดี มีโอกาสผ่านการคัดเลือกสูง");
    if (formula.weights.science >= 30 && grades.science < 3.5) {
      advice.push("โครงการนี้เน้นวิทยาศาสตร์ แนะนำเน้นทบทวนข้อสอบวิชาวิทยาศาสตร์เพิ่มเติม");
    }
    if (formula.weights.math >= 30 && grades.math < 3.5) {
      advice.push("โครงการนี้เน้นคณิตศาสตร์ แนะนำฝึกทำโจทย์คำนวณจับเวลา");
    }
    if (formula.weights.english >= 30 && grades.english < 3.5) {
      advice.push("โครงการนี้เน้นภาษาอังกฤษ แนะนำเน้นคำศัพท์และการอ่านบทความ (Reading)");
    }
  } else if (totalScore >= 50) {
    readinessLevel = "moderate";
    readinessLabel = "ความพร้อมระดับปานกลาง (ต้องฟิตเพิ่ม)";
    readinessColor = "text-amber-700 bg-amber-50 border-amber-200";
    advice.push("คะแนนอยู่ในระดับที่มีโอกาส แต่ต้องเร่งเพิ่มทักษะในวิชาที่มีน้ำหนักคะแนนสูง");
    advice.push("สามารถเลือกแผนการเรียนลำดับรองสำรองไว้เพื่อเพิ่มความมั่นใจในการเข้าศึกษา");
  } else {
    readinessLevel = "needs_improvement";
    readinessLabel = "ต้องพัฒนาและวางแผนอ่านหนังสืออย่างเข้มข้น";
    readinessColor = "text-rose-700 bg-rose-50 border-rose-200";
    advice.push("ผลการเรียนวิชาหลักยังต้องพัฒนาเพิ่มเติมเพื่อให้พร้อมสำหรับการสอบคัดเลือก");
    advice.push("แนะนำให้ทบทวนเนื้อหาพื้นฐานและปรึกษาอาจารย์ประจำวิชาเพื่อเตรียมตัวล่วงหน้า");
  }

  return {
    score: totalScore,
    isEligible,
    minGpaxRequired: formula.minGpax,
    eligibilityIssues: issues,
    readinessLevel,
    readinessLabel,
    readinessColor,
    advice,
  };
}
