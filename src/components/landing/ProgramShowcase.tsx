"use client";

import { useState } from "react";
import Link from "next/link";
import { Sparkles, Users, Award, BookOpen, ArrowRight, CheckCircle2 } from "lucide-react";

interface Program {
  id: string;
  name: string;
  type: "special" | "regular";
  typeLabel: string;
  seats: number;
  gpaxRequirement: string;
  highlights: string[];
  recommendedFor: string;
}

const programsM1: Program[] = [
  {
    id: "m1-smtp",
    name: "โครงการห้องเรียนพิเศษ SMTP",
    type: "special",
    typeLabel: "ห้องเรียนพิเศษ",
    seats: 36,
    gpaxRequirement: "เกรดเฉลี่ย ป.4-ป.5 (5 ภาคเรียน) รวม ≥ 3.00 และ วิทย์/คณิต ≥ 3.00",
    highlights: [
      "เน้นการทดลองวิทยาศาสตร์ในห้องปฏิบัติการขั้นสูง",
      "พัฒนาทักษะการเขียนโค้ดและโครงงานเทคโนโลยี",
      "ค่ายวิชาการและทัศนศึกษาดูงานมหาวิทยาลัยชั้นนำ",
    ],
    recommendedFor: "นักเรียนที่รักการคำนวณ วิทยาศาสตร์ และนวัตกรรมเทคโนโลยี",
  },
  {
    id: "m1-ep",
    name: "โครงการ English Program (EP)",
    type: "special",
    typeLabel: "ห้องเรียนพิเศษ",
    seats: 30,
    gpaxRequirement: "เกรดเฉลี่ย ป.4-ป.5 (5 ภาคเรียน) รวม ≥ 2.75 และ ภาษาอังกฤษ ≥ 3.00",
    highlights: [
      "จัดการเรียนการสอนเป็นภาษาอังกฤษโดยครูต่างชาติเจ้าของภาษา",
      "เน้นการสื่อสารและการคิดวิเคราะห์ในระดับสากล",
      "กิจกรรมพัฒนาทักษะภาษานอกห้องเรียนและค่ายภาษาอังกฤษ",
    ],
    recommendedFor: "นักเรียนที่ต้องการปูพื้นฐานภาษาอังกฤษเพื่อการศึกษาระดับนานาชาติ",
  },
  {
    id: "m1-regular",
    name: "ห้องเรียนปกติ (ทั่วไป)",
    type: "regular",
    typeLabel: "ห้องเรียนปกติ",
    seats: 240,
    gpaxRequirement: "สำเร็จการศึกษาระดับประถมศึกษาปีที่ 6 (ป.6) หรือเทียบเท่า",
    highlights: [
      "หลักสูตรแกนกลางการศึกษาขั้นพื้นฐานตามมาตรฐาน สพฐ.",
      "เปิดกว้างกิจกรรมชุมนุม ดนตรี กีฬา และศิลปวัฒนธรรม",
      "ส่งเสริมการเรียนรู้ตามความสนใจและศักยภาพของผู้เรียน",
    ],
    recommendedFor: "นักเรียนทั่วไปที่ต้องการบรรยากาศการเรียนรู้ที่สมดุลและรอบด้าน",
  },
];

const programsM4: Program[] = [
  {
    id: "m4-smtp",
    name: "โครงการห้องเรียนพิเศษ SMTP ม.4",
    type: "special",
    typeLabel: "ห้องเรียนพิเศษ",
    seats: 36,
    gpaxRequirement: "เกรดเฉลี่ย ม.1-ม.3 (5 ภาคเรียน) รวม ≥ 3.00 และ วิทย์/คณิต ≥ 3.00",
    highlights: [
      "เตรียมความพร้อมเข้มข้นเพื่อเข้าสู่คณะแพทยศาสตร์ วิศวกรรมศาสตร์ และวิทยาศาสตร์",
      "ทำโครงงานวิจัยร่วมกับอาจารย์มหาวิทยาลัย (ม.วลัยลักษณ์ และ ม.อ.)",
      "อบรมเข้มเตรียมสอบ สอวน. โอลิมปิกวิชาการ",
    ],
    recommendedFor: "นักเรียนที่มุ่งมั่นเข้าศึกษาต่อสายวิทยาศาสตร์สุขภาพและเทคโนโลยีชั้นนำ",
  },
  {
    id: "m4-ep",
    name: "โครงการ English Program (EP) ม.4",
    type: "special",
    typeLabel: "ห้องเรียนพิเศษ",
    seats: 30,
    gpaxRequirement: "เกรดเฉลี่ย ม.1-ม.3 (5 ภาคเรียน) รวม ≥ 2.75 และ ภาษาอังกฤษ ≥ 3.00",
    highlights: [
      "เรียนรายวิชาวิทยาศาสตร์และคณิตศาสตร์เป็นภาษาอังกฤษ (Bilingual/EP)",
      "เตรียมสอบวัดระดับมาตรฐานภาษาอังกฤษสากล (IELTS / TOEFL)",
      "เปิดโอกาสศึกษาต่อหลักสูตรนานาชาติทั้งในและต่างประเทศ",
    ],
    recommendedFor: "นักเรียนที่ต้องการความเป็นเลิศทางวิชาการร่วมกับทักษะภาษาอังกฤษระดับสูง",
  },
  {
    id: "m4-special-innov",
    name: "โครงการห้องเรียนพิเศษภาษาและนวัตกรรม (CNP/DEP)",
    type: "special",
    typeLabel: "ห้องเรียนพิเศษ",
    seats: 35,
    gpaxRequirement: "เกรดเฉลี่ย ม.1-ม.3 รวม ≥ 2.50",
    highlights: [
      "เน้นภาษาต่างประเทศที่สอง (ภาษาจีน / ภาษาอังกฤษธุรกิจ)",
      "ทักษะดิจิทัล นวัตกรรมสื่อสร้างสรรค์ และการเป็นผู้ประกอบการ",
      "เครือข่ายความร่วมมือกับสถาบันภาษาและวัฒนธรรม",
    ],
    recommendedFor: "นักเรียนที่สนใจด้านภาษาศาสตร์ สื่อดิจิทัล และธุรกิจระหว่างประเทศ",
  },
  {
    id: "m4-regular-sci",
    name: "แผนการเรียน วิทยาศาสตร์ - คณิตศาสตร์ (ปกติ)",
    type: "regular",
    typeLabel: "แผนการเรียนปกติ",
    seats: 120,
    gpaxRequirement: "เกรดเฉลี่ย ม.1-ม.3 รวม ≥ 2.50",
    highlights: [
      "ปูพื้นฐานฟิสิกส์ เคมี ชีววิทยา และคณิตศาสตร์เข้มข้น",
      "มีคุณสมบัติสมัครได้ทุกคณะในระดับอุดมศึกษา (TCAS)",
      "เสริมกิจกรรมโครงงานวิทยาศาสตร์และสะเต็มศึกษา (STEM)",
    ],
    recommendedFor: "นักเรียนสายวิทย์-คณิต ที่ต้องการความยืดหยุ่นในการเลือกเส้นทางเข้ามหาวิทยาลัย",
  },
  {
    id: "m4-regular-arts",
    name: "แผนการเรียน ศิลป์-คำนวณ / ศิลป์-ภาษา (ปกติ)",
    type: "regular",
    typeLabel: "แผนการเรียนปกติ",
    seats: 160,
    gpaxRequirement: "สำเร็จการศึกษาระดับชั้นมัธยมศึกษาปีที่ 3 (ม.3) หรือเทียบเท่า",
    highlights: [
      "เลือกเรียนวิชาเอกภาษาต่างประเทศ: ภาษาจีน, ภาษาญี่ปุ่น หรือภาษามลายู",
      "เสริมทักษะสังคมศาสตร์ รัฐศาสตร์ บริหารธุรกิจ และศิลปกรรม",
      "กิจกรรมส่งเสริมภาวะผู้นำและการสื่อสารข้ามวัฒนธรรม",
    ],
    recommendedFor: "นักเรียนที่ชื่นชอบภาษา วรรณกรรม มนุษยศาสตร์ และการบริหารจัดการ",
  },
];

export function ProgramShowcase() {
  const [selectedLevel, setSelectedLevel] = useState<"m1" | "m4">("m1");
  const programs = selectedLevel === "m1" ? programsM1 : programsM4;

  return (
    <section id="programs" className="scroll-mt-20 py-16 sm:py-24 bg-white border-y border-brand-gray-200/80">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-1.5 rounded-full bg-brand-gold-100 px-3.5 py-1 text-xs font-semibold text-brand-gold-800">
            <BookOpen className="h-3.5 w-3.5" />
            หลักสูตรและแผนการเรียน
          </div>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-brand-gray-900 tracking-tight">
            เลือกแผนการเรียนที่ตรงกับเป้าหมายของคุณ
          </h2>
          <p className="text-sm sm:text-base text-brand-gray-600 leading-relaxed">
            โรงเรียนท่าศาลาประสิทธิ์ศึกษามุ่งเน้นพัฒนาศักยภาพผู้เรียนรอบด้าน ด้วยโครงการห้องเรียนพิเศษและแผนการเรียนที่หลากหลาย
          </p>

          {/* Level Switcher Tabs */}
          <div className="pt-4 flex justify-center">
            <div className="inline-flex rounded-2xl bg-brand-gray-100 p-1.5 border border-brand-gray-200">
              <button
                type="button"
                onClick={() => setSelectedLevel("m1")}
                className={`flex items-center gap-2 rounded-xl px-5 py-2.5 text-sm font-bold transition-all duration-200 ${
                  selectedLevel === "m1"
                    ? "bg-brand-gray-900 text-brand-gold-400 shadow-md"
                    : "text-brand-gray-600 hover:text-brand-gray-900"
                }`}
              >
                <span>ระดับชั้น มัธยมศึกษาปีที่ 1</span>
                <span className="text-xs font-normal opacity-80">(ม.1)</span>
              </button>
              <button
                type="button"
                onClick={() => setSelectedLevel("m4")}
                className={`flex items-center gap-2 rounded-xl px-5 py-2.5 text-sm font-bold transition-all duration-200 ${
                  selectedLevel === "m4"
                    ? "bg-brand-gray-900 text-brand-gold-400 shadow-md"
                    : "text-brand-gray-600 hover:text-brand-gray-900"
                }`}
              >
                <span>ระดับชั้น มัธยมศึกษาปีที่ 4</span>
                <span className="text-xs font-normal opacity-80">(ม.4)</span>
              </button>
            </div>
          </div>
        </div>

        {/* Program Cards Grid */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {programs.map((prog) => {
            const isSpecial = prog.type === "special";
            return (
              <div
                key={prog.id}
                className={`flex flex-col justify-between rounded-2xl p-6 transition-all duration-200 card-lift border ${
                  isSpecial
                    ? "bg-gradient-to-b from-white via-white to-brand-gold-50/40 border-brand-gold-500/30 shadow-sm"
                    : "bg-white border-brand-gray-200/90 shadow-xs"
                }`}
              >
                <div className="space-y-4">
                  {/* Badge & Seat Count */}
                  <div className="flex items-center justify-between">
                    <span
                      className={`inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-[11px] font-bold ${
                        isSpecial
                          ? "bg-brand-gold-100 text-brand-gold-800 border border-brand-gold-300"
                          : "bg-brand-gray-100 text-brand-gray-700"
                      }`}
                    >
                      {isSpecial && <Sparkles className="h-3 w-3 text-brand-gold-600" />}
                      {prog.typeLabel}
                    </span>
                    <div className="flex items-center gap-1 text-xs text-brand-gray-500 font-medium">
                      <Users className="h-3.5 w-3.5 text-brand-gray-400" />
                      <span>รับ {prog.seats} คน</span>
                    </div>
                  </div>

                  {/* Program Title */}
                  <h3 className="text-lg font-bold text-brand-gray-900 leading-snug">
                    {prog.name}
                  </h3>

                  {/* GPA Requirement */}
                  <div className="rounded-xl bg-brand-gray-50 p-3 border border-brand-gray-200/70">
                    <div className="flex items-start gap-2">
                      <Award className="h-4 w-4 text-brand-gold-600 shrink-0 mt-0.5" />
                      <div>
                        <p className="text-[11px] font-bold text-brand-gray-700 uppercase">
                          เกณฑ์คุณสมบัติ GPAX
                        </p>
                        <p className="text-xs text-brand-gray-600 mt-0.5 leading-relaxed">
                          {prog.gpaxRequirement}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Highlights */}
                  <div className="space-y-2 pt-1">
                    <p className="text-xs font-semibold text-brand-gray-800">
                      จุดเด่นของหลักสูตร:
                    </p>
                    <ul className="space-y-1.5">
                      {prog.highlights.map((h, i) => (
                        <li key={i} className="flex items-start gap-2 text-xs text-brand-gray-600">
                          <CheckCircle2 className="h-3.5 w-3.5 text-brand-gold-600 shrink-0 mt-0.5" />
                          <span>{h}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Card Action */}
                <div className="pt-6 mt-6 border-t border-brand-gray-100">
                  <Link
                    href={`/apply?level=${selectedLevel}&program=${prog.id}`}
                    className={`flex w-full items-center justify-center gap-2 rounded-xl py-2.5 px-4 text-xs sm:text-sm font-bold transition-all duration-200 ${
                      isSpecial
                        ? "bg-brand-gray-900 text-brand-gold-400 hover:bg-brand-gray-800 hover:shadow-md"
                        : "bg-brand-gray-100 text-brand-gray-800 hover:bg-brand-gray-200"
                    }`}
                  >
                    <span>สมัครแผนการเรียนนี้</span>
                    <ArrowRight className="h-3.5 w-3.5" />
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
