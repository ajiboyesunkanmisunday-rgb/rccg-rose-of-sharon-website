"use client";

import { useEffect, useState } from "react";

/** "Upload picture" control: round preview, a button, and a Remove link. Hands the chosen file to the form. */
export default function PhotoField({ file, onChange, label = "Upload picture" }: { file: File | null; onChange: (f: File | null) => void; label?: string }) {
  const [preview, setPreview] = useState<string | null>(null);
  useEffect(() => {
    if (!file) { setPreview(null); return; }
    const url = URL.createObjectURL(file);
    setPreview(url);
    return () => URL.revokeObjectURL(url);
  }, [file]);

  return (
    <div className="ros:flex ros:items-center ros:gap-5">
      <div className="ros:flex ros:size-[96px] ros:flex-shrink-0 ros:items-center ros:justify-center ros:overflow-hidden ros:rounded-full ros:border ros:border-[#D0D5DD] ros:bg-[#F4F4F4]">
        {preview ? (
          <img src={preview} alt="Your picture" className="ros:h-full ros:w-full ros:object-cover" />
        ) : (
          <svg viewBox="0 0 24 24" fill="none" stroke="#9CA3AF" strokeWidth="1.6" className="ros:size-10"><circle cx="12" cy="8" r="4" /><path d="M4 21c0-4 3.6-7 8-7s8 3 8 7" strokeLinecap="round" /></svg>
        )}
      </div>
      <div className="ros:flex ros:flex-col ros:gap-2">
        <label className="ros:w-fit ros:cursor-pointer ros:rounded-full ros:border ros:border-black ros:px-5 ros:py-2 ros:text-[11px] ros:font-bold ros:uppercase ros:tracking-[0.15em] ros:transition ros:hover:bg-black ros:hover:text-white">
          {file ? "Change picture" : label}
          <input type="file" accept="image/*" className="ros:hidden" onChange={(e) => onChange(e.target.files?.[0] ?? null)} />
        </label>
        {file && <button type="button" onClick={() => onChange(null)} className="ros:w-fit ros:text-[12px] ros:text-[#6B7280] ros:underline">Remove</button>}
        <p className="ros:text-[12px] ros:text-[#9CA3AF]">A clear photo of your face. JPG or PNG.</p>
      </div>
    </div>
  );
}
