import { ProgramShowcase } from "@/components/landing/ProgramShowcase";

export const metadata = {
  title: "แผนการเรียนและห้องเรียนพิเศษ",
  description: "ข้อมูลแผนการเรียน ห้องเรียนพิเศษ (SMTP, EP, CNP, DEP) และห้องเรียนปกติ โรงเรียนท่าศาลาประสิทธิ์ศึกษา",
};

export default function ProgramsPage() {
  return (
    <div className="flex flex-col pt-10">
      <ProgramShowcase />
    </div>
  );
}
