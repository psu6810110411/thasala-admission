"use client";

import Link from "next/link";
import { motion, type Variants } from "framer-motion";
import {
  GraduationCap,
  ArrowRight,
  ShieldCheck,
  Sparkles,
  BookOpen,
  FileCheck2,
  Users,
} from "lucide-react";
import { CountdownTimer } from "./CountdownTimer";

export function HeroSection() {
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.12,
        delayChildren: 0.05,
      },
    },
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: "easeOut" },
    },
  };

  return (
    <section className="relative overflow-hidden pt-8 pb-14 sm:pt-10 sm:pb-16">
      {/* Decorative Glow Elements */}
      <div className="pointer-events-none absolute -top-40 -right-40 h-[450px] w-[450px] rounded-full bg-brand-gold-400/15 blur-3xl"></div>
      <div className="pointer-events-none absolute top-1/3 -left-40 h-[400px] w-[400px] rounded-full bg-brand-gray-500/10 blur-3xl"></div>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          variants={containerVariants}
          initial={false}
          animate="visible"
          className="mx-auto max-w-4xl text-center space-y-5 sm:space-y-6"
        >
          {/* School Badge Pill */}
          <motion.div variants={itemVariants} className="inline-flex">
            <div className="inline-flex items-center gap-2 rounded-full border border-brand-gold-500/40 bg-brand-gold-100/70 px-3.5 py-1 text-xs font-semibold text-brand-gray-800 shadow-xs backdrop-blur-md">
              <Sparkles className="h-3.5 w-3.5 text-brand-gold-600" />
              <span>เปิดรับสมัครนักเรียนใหม่ ปีการศึกษา 2569</span>
              <span className="h-1 w-1 rounded-full bg-brand-gold-500"></span>
              <span className="text-brand-gold-800">ระดับชั้น ม.1 และ ม.4</span>
            </div>
          </motion.div>

          {/* Main Headline - Balanced typography & partition */}
          <motion.h1
            variants={itemVariants}
            className="text-2xl sm:text-3.5xl lg:text-4xl font-extrabold tracking-tight text-brand-gray-950 leading-snug sm:leading-normal"
          >
            <span className="block sm:inline-block">ก้าวสู่อนาคตการศึกษาอย่างมั่นใจ</span>{" "}
            <span className="block sm:inline-block">
              ณ{" "}
              <span className="bg-gradient-to-r from-brand-gray-900 via-brand-gray-800 to-brand-gold-600 bg-clip-text text-transparent">
                โรงเรียนท่าศาลาประสิทธิ์ศึกษา
              </span>
            </span>
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            variants={itemVariants}
            className="text-xs sm:text-sm md:text-base text-brand-gray-600 leading-relaxed max-w-xl mx-auto"
          >
            ระบบรับสมัครนักเรียนออนไลน์ สะดวกรวดเร็ว ใช้งานง่ายสำหรับทั้งนักเรียนและผู้ปกครอง
            รองรับห้องเรียนพิเศษ (SMTP, EP, CNP, DEP) และห้องเรียนปกติ พร้อมติดตามสถานะแบบเรียลไทม์
          </motion.p>

          {/* Countdown Timer Widget */}
          <motion.div variants={itemVariants} className="pt-0.5">
            <CountdownTimer />
          </motion.div>

          {/* Call to Action Buttons */}
          <motion.div
            variants={itemVariants}
            className="flex flex-col sm:flex-row items-center justify-center gap-3.5 pt-2"
          >
            <Link
              href="/apply"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 rounded-xl bg-gradient-to-r from-brand-gold-500 to-brand-gold-600 px-7 py-4 text-base font-bold text-brand-gray-950 shadow-md transition-all duration-200 hover:from-brand-gold-400 hover:to-brand-gold-500 hover:shadow-xl hover:-translate-y-0.5 active:translate-y-0"
            >
              <GraduationCap className="h-5 w-5" />
              เริ่มต้นกรอกใบสมัคร
            </Link>
            <Link
              href="/status"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-xl border border-brand-gray-300 bg-white px-6 py-4 text-base font-semibold text-brand-gray-800 shadow-xs transition-all duration-200 hover:bg-brand-gray-50 hover:text-brand-gray-950 hover:border-brand-gray-400 hover:-translate-y-0.5 active:translate-y-0"
            >
              ตรวจสอบสถานะ / พิมพ์บัตรสอบ
              <ArrowRight className="h-4 w-4 text-brand-gray-500" />
            </Link>
          </motion.div>

          {/* Quick Shortcuts: M.1 or M.4 */}
          <motion.div
            variants={itemVariants}
            className="flex flex-wrap items-center justify-center gap-2 text-xs text-brand-gray-500 pt-1"
          >
            <span>เลือกระดับชั้นด่วน:</span>
            <Link
              href="/apply?level=m1"
              className="font-semibold text-brand-gold-700 bg-brand-gold-50 px-2.5 py-1 rounded-md border border-brand-gold-200 hover:bg-brand-gold-100 transition-colors"
            >
              สมัคร มัธยมศึกษาปีที่ 1 &rarr;
            </Link>
            <Link
              href="/apply?level=m4"
              className="font-semibold text-brand-gray-800 bg-brand-gray-100 px-2.5 py-1 rounded-md border border-brand-gray-200 hover:bg-brand-gray-200 transition-colors"
            >
              สมัคร มัธยมศึกษาปีที่ 4 &rarr;
            </Link>
          </motion.div>

          {/* Feature Highlights Grid */}
          <motion.div
            variants={itemVariants}
            className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-10 text-left border-t border-brand-gray-200/80"
          >
            <div className="flex items-center gap-3.5 rounded-2xl bg-white p-4 border border-brand-gray-200/80 shadow-xs card-lift">
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-brand-gold-100 text-brand-gold-700">
                <ShieldCheck className="h-5 w-5" />
              </div>
              <div>
                <h4 className="text-sm font-bold text-brand-gray-900">ตรวจเอกสารรวดเร็ว</h4>
                <p className="text-xs text-brand-gray-500 mt-0.5">
                  ตรวจสอบความถูกต้องและแจ้งเตือนทันที
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3.5 rounded-2xl bg-white p-4 border border-brand-gray-200/80 shadow-xs card-lift">
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-brand-gray-100 text-brand-gray-800">
                <Users className="h-5 w-5" />
              </div>
              <div>
                <h4 className="text-sm font-bold text-brand-gray-900">โหมดนักเรียน / ผู้ปกครอง</h4>
                <p className="text-xs text-brand-gray-500 mt-0.5">
                  สลับโหมดฟอร์มให้กรอกง่าย ไม่สับสน
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3.5 rounded-2xl bg-white p-4 border border-brand-gray-200/80 shadow-xs card-lift">
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-brand-gold-100 text-brand-gold-700">
                <FileCheck2 className="h-5 w-5" />
              </div>
              <div>
                <h4 className="text-sm font-bold text-brand-gray-900">พิมพ์บัตรสอบ PDF ทันที</h4>
                <p className="text-xs text-brand-gray-500 mt-0.5">
                  มี Barcode/QR Code สแกนเข้าห้องสอบ
                </p>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
