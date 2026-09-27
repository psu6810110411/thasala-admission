"use client";

import Link from "next/link";
import { useState } from "react";
import { Menu, X, GraduationCap, Search, FileText } from "lucide-react";

export function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-brand-gray-200/80 bg-white/95 backdrop-blur-md transition-all">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6 lg:px-8">
        {/* Brand / Logo */}
        <Link href="/" className="group flex items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br from-brand-gray-900 to-brand-gray-800 text-brand-gold-400 font-bold shadow-md transition-transform duration-200 group-hover:scale-105 border border-brand-gold-500/30">
            <span className="text-base tracking-wider">ท.ศ.</span>
          </div>
          <div className="flex flex-col">
            <span className="text-sm font-semibold tracking-tight text-brand-gray-900 sm:text-base">
              โรงเรียนท่าศาลาประสิทธิ์ศึกษา
            </span>
            <span className="text-xs text-brand-gray-500">
              ระบบรับสมัครนักเรียนออนไลน์ (Admission Portal)
            </span>
          </div>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden items-center gap-7 md:flex">
          <Link
            href="/"
            className="text-sm font-medium text-brand-gray-600 transition-colors hover:text-brand-gray-900"
          >
            หน้าแรก
          </Link>
          <Link
            href="/#programs"
            className="text-sm font-medium text-brand-gray-600 transition-colors hover:text-brand-gray-900"
          >
            แผนการเรียน
          </Link>
          <Link
            href="/#timeline"
            className="text-sm font-medium text-brand-gray-600 transition-colors hover:text-brand-gray-900"
          >
            กำหนดการ
          </Link>
          <Link
            href="/status"
            className="flex items-center gap-1.5 text-sm font-medium text-brand-gray-700 hover:text-brand-gray-950 transition-colors"
          >
            <Search className="h-4 w-4 text-brand-gold-600" />
            ตรวจสอบสถานะ
          </Link>
        </nav>

        {/* Desktop CTA */}
        <div className="hidden items-center gap-3 md:flex">
          <Link
            href="/apply"
            className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-brand-gold-500 to-brand-gold-600 px-4 py-2.5 text-sm font-semibold text-brand-gray-950 shadow-sm transition-all duration-200 hover:from-brand-gold-400 hover:to-brand-gold-500 hover:shadow-md hover:-translate-y-0.5 active:translate-y-0"
          >
            <GraduationCap className="h-4 w-4" />
            สมัครเรียนออนไลน์
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <div className="flex md:hidden">
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="inline-flex items-center justify-center rounded-lg p-2 text-brand-gray-600 hover:bg-brand-gray-100 focus:outline-none focus:ring-2 focus:ring-brand-gold-500"
            aria-expanded={mobileMenuOpen}
          >
            <span className="sr-only">เปิดเมนูหลัก</span>
            {mobileMenuOpen ? (
              <X className="h-6 w-6" aria-hidden="true" />
            ) : (
              <Menu className="h-6 w-6" aria-hidden="true" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="border-b border-brand-gray-200 bg-white px-4 pt-3 pb-5 md:hidden space-y-3 shadow-lg">
          <div className="space-y-1">
            <Link
              href="/"
              onClick={() => setMobileMenuOpen(false)}
              className="block rounded-lg px-3 py-2 text-base font-medium text-brand-gray-800 hover:bg-brand-gray-100"
            >
              หน้าแรก
            </Link>
            <Link
              href="/#programs"
              onClick={() => setMobileMenuOpen(false)}
              className="block rounded-lg px-3 py-2 text-base font-medium text-brand-gray-800 hover:bg-brand-gray-100"
            >
              แผนการเรียน
            </Link>
            <Link
              href="/#timeline"
              onClick={() => setMobileMenuOpen(false)}
              className="block rounded-lg px-3 py-2 text-base font-medium text-brand-gray-800 hover:bg-brand-gray-100"
            >
              กำหนดการรับสมัคร
            </Link>
            <Link
              href="/status"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center gap-2 rounded-lg px-3 py-2 text-base font-medium text-brand-gray-800 hover:bg-brand-gray-100"
            >
              <Search className="h-4 w-4 text-brand-gold-600" />
              ตรวจสอบสถานะการสมัคร
            </Link>
          </div>
          <div className="pt-2">
            <Link
              href="/apply"
              onClick={() => setMobileMenuOpen(false)}
              className="flex w-full items-center justify-center gap-2 rounded-xl bg-brand-gold-500 py-3 text-center text-base font-semibold text-brand-gray-950 shadow-sm hover:bg-brand-gold-400"
            >
              <FileText className="h-4 w-4" />
              สมัครเรียนออนไลน์
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
