import { AdmissionTimeline } from "@/components/landing/AdmissionTimeline";

export const metadata = {
  title: "กำหนดการรับสมัคร",
  description: "กำหนดการรับสมัครนักเรียนชั้น ม.1 และ ม.4 ประจำปีการศึกษา 2569 โรงเรียนท่าศาลาประสิทธิ์ศึกษา",
};

export default function TimelinePage() {
  return (
    <div className="flex flex-col pt-10">
      <AdmissionTimeline />
    </div>
  );
}
