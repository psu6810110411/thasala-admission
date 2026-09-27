"use client";

import { useState } from "react";
import { ChevronDown, HelpCircle } from "lucide-react";

interface FaqItem {
  question: string;
  answer: string;
}

const faqs: FaqItem[] = [
  {
    question: "เอกสารที่ต้องใช้ในการสมัครออนไลน์มีอะไรบ้าง?",
    answer:
      "ผู้สมัครต้องเตรียมไฟล์ภาพถ่ายหรือ PDF ดังนี้: (1) ระเบียนแสดงผลการเรียน (ปพ.1) ทั้งด้านหน้าและด้านหลัง, (2) สำเนาทะเบียนบ้านของผู้สมัคร, (3) รูปถ่ายหน้าตรงชุดนักเรียนขนาด 1.5 นิ้ว (ถ่ายไม่เกิน 6 เดือน) โดยระบบรองรับไฟล์ JPG, PNG และ PDF ขนาดไม่เกิน 5MB",
  },
  {
    question: "ผู้ปกครองสามารถกรอกข้อมูลสมัครแทนนักเรียนได้หรือไม่?",
    answer:
      "ได้ครับ ระบบออกแบบโหมด 'ผู้ปกครองสมัครให้' โดยเฉพาะ ซึ่งจะมีคำอธิบายและภาษาที่อ่านง่าย พร้อมช่องระบุความสัมพันธ์และเบอร์โทรศัพท์ของผู้ปกครองเพื่อรับการแจ้งเตือน",
  },
  {
    question: "สามารถเลือกสมัครได้กี่แผนการเรียน?",
    answer:
      "ผู้สมัครสามารถเลือกอันดับแผนการเรียนได้สูงสุด 2 อันดับ โดยระบบจะพิจารณาผลการคัดเลือกตามอันดับที่ 1 ก่อน หากคะแนนไม่ผ่านเกณฑ์จะนำไปประมวลผลในอันดับที่ 2 ตามลำดับ",
  },
  {
    question: "หากกรอกข้อมูลผิดพลาดหรือต้องการแก้ไขเอกสาร ต้องทำอย่างไร?",
    answer:
      "หากใบสมัครอยู่ในสถานะ 'รอตรวจสอบ' หรือ 'ส่งกลับแก้ไข' ผู้สมัครสามารถเข้าสู่เมนู 'ตรวจสอบสถานะ' ด้วยเลขบัตรประชาชนและวันเกิด เพื่ออัปโหลดเอกสารใหม่หรือแก้ไขข้อมูลได้ทันทีจนกว่าจะถึงวันปิดรับสมัคร",
  },
  {
    question: "มีค่าธรรมเนียมในการสมัครสอบคัดเลือกหรือไม่?",
    answer:
      "การสมัครสอบห้องเรียนปกติไม่มีค่าธรรมเนียม สำหรับโครงการห้องเรียนพิเศษ (SMTP, EP) มีค่าธรรมเนียมการสอบและการประเมินความพร้อมตามประกาศของโรงเรียน โดยสามารถชำระผ่าน QR Payment ในขั้นตอนยื่นใบสมัครได้โดยตรง",
  },
];

export function FaqSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section id="faq" className="scroll-mt-20 py-16 sm:py-24 bg-white border-t border-brand-gray-200/80">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        <div className="text-center space-y-4">
          <div className="inline-flex items-center gap-1.5 rounded-full bg-brand-gold-100 px-3.5 py-1 text-xs font-semibold text-brand-gold-800">
            <HelpCircle className="h-3.5 w-3.5" />
            คำถามที่พบบ่อย (FAQ)
          </div>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-brand-gray-900 tracking-tight">
            ข้อสงสัยเกี่ยวกับการรับสมัคร
          </h2>
          <p className="text-sm sm:text-base text-brand-gray-600">
            คำตอบสำหรับคำถามยอดนิยมที่นักเรียนและผู้ปกครองสอบถามเข้ามาบ่อยที่สุด
          </p>
        </div>

        <div className="mt-10 space-y-3.5">
          {faqs.map((faq, idx) => {
            const isOpen = openIndex === idx;
            return (
              <div
                key={idx}
                className="overflow-hidden rounded-2xl border border-brand-gray-200/90 bg-brand-gray-50/50 transition-all duration-200 hover:border-brand-gray-300"
              >
                <button
                  type="button"
                  onClick={() => setOpenIndex(isOpen ? null : idx)}
                  className="flex w-full items-center justify-between p-5 text-left font-bold text-brand-gray-900 transition-colors focus:outline-none"
                >
                  <span className="text-sm sm:text-base pr-4">{faq.question}</span>
                  <ChevronDown
                    className={`h-5 w-5 shrink-0 text-brand-gray-500 transition-transform duration-200 ${
                      isOpen ? "rotate-180 text-brand-gold-600" : ""
                    }`}
                  />
                </button>
                {isOpen && (
                  <div className="px-5 pb-5 text-xs sm:text-sm text-brand-gray-600 leading-relaxed border-t border-brand-gray-200/50 pt-3">
                    {faq.answer}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
