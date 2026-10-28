"use client";

import { useEffect, useState } from "react";
import QRCode from "qrcode";

/** A QR code for a WhatsApp group: a ready-made picture when given, otherwise made on the page from the invite link. */
export default function WhatsappQr({ link, qr, label }: { link: string; qr?: string; label: string }) {
  const [src, setSrc] = useState(qr ?? "");
  useEffect(() => {
    if (qr || !link) return;
    QRCode.toDataURL(link, { width: 360, margin: 2, errorCorrectionLevel: "M" }).then(setSrc).catch(() => setSrc(""));
  }, [link, qr]);

  if (!link && !qr) {
    return (
      <div className="ros:flex ros:aspect-square ros:w-full ros:max-w-[260px] ros:flex-col ros:items-center ros:justify-center ros:gap-2 ros:rounded-xl ros:border ros:border-dashed ros:border-[#00000033] ros:bg-[#FAFAFA] ros:p-6 ros:text-center">
        <span className="ros:text-[34px]">⏳</span>
        <p className="ros:text-sm ros:font-bold">QR code coming soon</p>
      </div>
    );
  }
  return src ? (
    <img src={src} alt={`QR code to join the ${label} WhatsApp group`} width={260} height={260} className="ros:aspect-square ros:w-full ros:max-w-[260px] ros:rounded-xl ros:border ros:border-[#00000014] ros:bg-white ros:p-2" />
  ) : (
    <div className="ros:aspect-square ros:w-full ros:max-w-[260px] ros:animate-pulse ros:rounded-xl ros:bg-[#F4F4F4]" />
  );
}
