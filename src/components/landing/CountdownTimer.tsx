"use client";

import { useEffect, useState } from "react";
import { Clock } from "lucide-react";

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

export function CountdownTimer() {
  const [timeLeft, setTimeLeft] = useState<TimeLeft>({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    // Target admission deadline: End of admission period (approx. 20 days ahead)
    const targetDate = new Date();
    targetDate.setDate(targetDate.getDate() + 18);
    targetDate.setHours(16, 30, 0, 0);

    const calculateTime = () => {
      const now = new Date().getTime();
      const difference = targetDate.getTime() - now;

      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / 1000 / 60) % 60),
          seconds: Math.floor((difference / 1000) % 60),
        });
      }
    };

    calculateTime();
    const interval = setInterval(calculateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  if (!mounted) {
    return (
      <div className="flex items-center justify-center gap-2 rounded-2xl bg-white/80 p-4 border border-brand-gray-200/80 shadow-xs max-w-md mx-auto">
        <Clock className="h-5 w-5 text-brand-gold-600 animate-spin" />
        <span className="text-xs text-brand-gray-500">กำลังโหลดเวลานับถอยหลัง...</span>
      </div>
    );
  }

  const items = [
    { label: "วัน", value: timeLeft.days },
    { label: "ชั่วโมง", value: timeLeft.hours },
    { label: "นาที", value: timeLeft.minutes },
    { label: "วินาที", value: timeLeft.seconds },
  ];

  return (
    <div className="rounded-2xl bg-white/90 backdrop-blur-md p-4 sm:p-5 border border-brand-gray-200/90 shadow-md max-w-lg mx-auto">
      <div className="flex items-center justify-between pb-3 border-b border-brand-gray-100 mb-3">
        <div className="flex items-center gap-2">
          <span className="relative flex h-2.5 w-2.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-brand-gold-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-brand-gold-500"></span>
          </span>
          <span className="text-xs font-bold text-brand-gray-800 uppercase tracking-wider">
            นับถอยหลังปิดรับสมัครออนไลน์
          </span>
        </div>
        <span className="text-[11px] font-medium text-brand-gray-500 bg-brand-gray-100 px-2 py-0.5 rounded-md">
          รอบห้องเรียนพิเศษ
        </span>
      </div>

      <div className="grid grid-cols-4 gap-2.5 text-center">
        {items.map((item, idx) => (
          <div
            key={idx}
            className="flex flex-col items-center justify-center rounded-xl bg-gradient-to-b from-brand-gray-50 to-brand-gray-100/70 p-2.5 sm:p-3 border border-brand-gray-200/60"
          >
            <span className="text-xl sm:text-2xl font-black text-brand-gray-900 tracking-tight">
              {String(item.value).padStart(2, "0")}
            </span>
            <span className="text-[11px] font-medium text-brand-gray-500 mt-0.5">
              {item.label}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
