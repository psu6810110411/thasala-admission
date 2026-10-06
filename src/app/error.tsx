"use client";

import { useEffect } from "react";
import { AlertTriangle, RotateCcw } from "lucide-react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("Application error:", error);
  }, [error]);

  return (
    <main className="min-h-[60vh] flex items-center justify-center px-4">
      <div className="max-w-md w-full text-center space-y-6">
        <div className="mx-auto w-16 h-16 rounded-full bg-red-100 flex items-center justify-center">
          <AlertTriangle className="w-8 h-8 text-red-600" />
        </div>
        <div className="space-y-2">
          <h2 className="text-xl font-bold text-brand-gray-900 font-prompt">
            เกิดข้อผิดพลาด
          </h2>
          <p className="text-sm text-brand-gray-500 font-sarabun">
            ระบบพบข้อผิดพลาดที่ไม่คาดคิด กรุณาลองใหม่อีกครั้ง
          </p>
        </div>
        <button
          onClick={reset}
          className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-brand-gold-500 text-white font-semibold text-sm hover:bg-brand-gold-600 transition-colors shadow-md"
        >
          <RotateCcw className="w-4 h-4" />
          ลองใหม่อีกครั้ง
        </button>
      </div>
    </main>
  );
}
