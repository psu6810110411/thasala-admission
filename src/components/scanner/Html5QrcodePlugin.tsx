"use client";

import { Html5QrcodeScanner } from "html5-qrcode";
import { useEffect, useRef } from "react";

const qrcodeRegionId = "html5qr-code-full-region";

interface Html5QrcodePluginProps {
  fps?: number;
  qrbox?: number;
  aspectRatio?: number;
  disableFlip?: boolean;
  qrCodeSuccessCallback: (decodedText: string, decodedResult: any) => void;
  qrCodeErrorCallback?: (errorMessage: string) => void;
}

export default function Html5QrcodePlugin({
  fps = 10,
  qrbox = 250,
  aspectRatio = 1.0,
  disableFlip = false,
  qrCodeSuccessCallback,
  qrCodeErrorCallback,
}: Html5QrcodePluginProps) {
  const scannerRef = useRef<Html5QrcodeScanner | null>(null);

  useEffect(() => {
    // Check if the container is already initialized to prevent duplicate rendering in Strict Mode
    if (!document.getElementById(qrcodeRegionId)?.innerHTML) {
      const config = {
        fps,
        qrbox,
        aspectRatio,
        disableFlip,
      };
      
      const scanner = new Html5QrcodeScanner(qrcodeRegionId, config, false);
      scannerRef.current = scanner;
      
      scanner.render(
        (decodedText, decodedResult) => {
          qrCodeSuccessCallback(decodedText, decodedResult);
          // Optional: pause after scan to prevent multiple fires
          // scanner.pause();
        },
        (errorMessage) => {
          if (qrCodeErrorCallback) {
            qrCodeErrorCallback(errorMessage);
          }
        }
      );
    }

    return () => {
      if (scannerRef.current) {
        scannerRef.current.clear().catch((error) => {
          console.error("Failed to clear html5QrcodeScanner. ", error);
        });
      }
    };
  }, []); // Empty dependency array ensures this runs once

  return <div id={qrcodeRegionId} className="w-full overflow-hidden rounded-2xl border-2 border-brand-gray-200" />;
}
