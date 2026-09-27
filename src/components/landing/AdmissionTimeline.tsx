import { Calendar, CheckCircle2, Clock, AlertCircle } from "lucide-react";

interface TimelineEvent {
  step: number;
  title: string;
  dates: string;
  description: string;
  status: "active" | "upcoming" | "completed";
  statusText: string;
}

const timelineData: TimelineEvent[] = [
  {
    step: 1,
    title: "ยื่นใบสมัครออนไลน์",
    dates: "วันนี้ - 20 กุมภาพันธ์ 2569",
    description: "กรอกข้อมูลผู้สมัคร เลือกแผนการเรียน และอัปโหลดไฟล์ ปพ.1 ทางเว็บไซต์",
    status: "active",
    statusText: "กำลังเปิดรับสมัคร",
  },
  {
    step: 2,
    title: "ตรวจสอบเอกสาร & ประกาศสิทธิ์สอบ",
    dates: "25 กุมภาพันธ์ 2569",
    description: "ครูตรวจเอกสาร ผู้สมัครตรวจสอบสถานะและพิมพ์บัตรประจำตัวผู้เข้าสอบ (PDF)",
    status: "upcoming",
    statusText: "เร็ว ๆ นี้",
  },
  {
    step: 3,
    title: "สอบคัดเลือก / ประเมินความพร้อม",
    dates: "1 มีนาคม 2569",
    description: "ณ สนามสอบ โรงเรียนท่าศาลาประสิทธิ์ศึกษา (นำบัตรประชาชนและบัตรสอบมาแสดง)",
    status: "upcoming",
    statusText: "เร็ว ๆ นี้",
  },
  {
    step: 4,
    title: "ประกาศผลการคัดเลือก",
    dates: "5 มีนาคม 2569 (09:00 น.)",
    description: "ประกาศผลผ่านเว็บไซต์และเพจประชาสัมพันธ์โรงเรียนท่าศาลาประสิทธิ์ศึกษา",
    status: "upcoming",
    statusText: "เร็ว ๆ นี้",
  },
  {
    step: 5,
    title: "รายงานตัว & มอบตัวนักเรียนใหม่",
    dates: "10 มีนาคม 2569",
    description: "ยื่นเอกสารฉบับจริง รับเอกสารคู่มือนักเรียน และวัดขนาดเครื่องแบบ",
    status: "upcoming",
    statusText: "เร็ว ๆ นี้",
  },
];

export function AdmissionTimeline() {
  return (
    <section id="timeline" className="scroll-mt-20 py-16 sm:py-24 bg-brand-gray-50">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-1.5 rounded-full bg-brand-gray-200/80 px-3.5 py-1 text-xs font-semibold text-brand-gray-800">
            <Calendar className="h-3.5 w-3.5 text-brand-gold-600" />
            กำหนดการสำคัญ
          </div>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-brand-gray-900 tracking-tight">
            ปฏิทินการรับสมัครนักเรียน ปีการศึกษา 2569
          </h2>
          <p className="text-sm sm:text-base text-brand-gray-600 leading-relaxed">
            ติดตามขั้นตอนและวันที่สำคัญเพื่อไม่ให้พลาดสิทธิ์การสอบคัดเลือกและการรายงานตัว
          </p>
        </div>

        {/* Timeline Grid */}
        <div className="mt-14 max-w-4xl mx-auto">
          <div className="relative pl-6 sm:pl-8 border-l-2 border-brand-gray-200 space-y-10">
            {timelineData.map((item) => {
              const isActive = item.status === "active";
              return (
                <div key={item.step} className="relative group">
                  {/* Step Dot */}
                  <div
                    className={`absolute -left-[31px] sm:-left-[39px] flex h-9 w-9 items-center justify-center rounded-full font-bold text-xs transition-all duration-200 ${
                      isActive
                        ? "bg-brand-gold-500 text-brand-gray-950 ring-4 ring-brand-gold-200 shadow-md scale-110"
                        : "bg-white border-2 border-brand-gray-300 text-brand-gray-600"
                    }`}
                  >
                    {item.step}
                  </div>

                  {/* Card Content */}
                  <div
                    className={`rounded-2xl p-5 sm:p-6 transition-all duration-200 border ${
                      isActive
                        ? "bg-white border-brand-gold-500/40 shadow-md"
                        : "bg-white/80 border-brand-gray-200/80 hover:bg-white shadow-xs"
                    }`}
                  >
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-2">
                      <h3 className="text-base sm:text-lg font-bold text-brand-gray-900">
                        {item.title}
                      </h3>
                      <span
                        className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 text-xs font-semibold w-fit ${
                          isActive
                            ? "bg-brand-gold-100 text-brand-gold-800 border border-brand-gold-300"
                            : "bg-brand-gray-100 text-brand-gray-600"
                        }`}
                      >
                        {isActive ? (
                          <>
                            <span className="h-1.5 w-1.5 rounded-full bg-brand-gold-600 animate-pulse"></span>
                            {item.statusText}
                          </>
                        ) : (
                          <>
                            <Clock className="h-3 w-3" />
                            {item.statusText}
                          </>
                        )}
                      </span>
                    </div>

                    <div className="flex items-center gap-1.5 text-xs sm:text-sm font-semibold text-brand-gold-700 mt-1">
                      <Calendar className="h-4 w-4" />
                      <span>{item.dates}</span>
                    </div>

                    <p className="text-xs sm:text-sm text-brand-gray-600 mt-2 leading-relaxed">
                      {item.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
