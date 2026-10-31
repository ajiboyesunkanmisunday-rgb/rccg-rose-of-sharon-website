"use client";

import { useEffect, useRef, useState } from "react";
import { ChevronDown, Search, X } from "lucide-react";
import { COUNTRY_CODES } from "./geo";

/* The phone box the ROSMS forms use: a searchable country-code picker beside the number. Digits only; dashes, spaces
   and a leading 0 are stripped as you type, and the number is capped at 10 digits for +234 (15 otherwise). */

export { COUNTRY_CODES };

export function normalisePhone(raw: string, countryCode: string): string {
  let digits = raw.replace(/[\s\-.()+]/g, "").replace(/\D/g, "");
  const bare = countryCode.replace(/^\+/, "");
  if (digits.startsWith(bare) && digits.length > bare.length) digits = digits.slice(bare.length);
  if (digits.startsWith("0")) digits = digits.slice(1);
  return digits.slice(0, countryCode === "+234" ? 10 : 15);
}

function CodePicker({ value, onChange }: { value: string; onChange: (c: string) => void }) {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const box = useRef<HTMLDivElement>(null);
  const search = useRef<HTMLInputElement>(null);
  const selected = COUNTRY_CODES.find((c) => c.code === value) ?? COUNTRY_CODES[0];
  const filtered = query.trim() ? COUNTRY_CODES.filter((c) => c.name.toLowerCase().includes(query.toLowerCase()) || c.code.includes(query)) : COUNTRY_CODES;

  useEffect(() => {
    if (!open) return;
    const down = (e: MouseEvent) => { if (box.current && !box.current.contains(e.target as Node)) { setOpen(false); setQuery(""); } };
    const key = (e: KeyboardEvent) => { if (e.key === "Escape") { setOpen(false); setQuery(""); } };
    document.addEventListener("mousedown", down);
    document.addEventListener("keydown", key);
    const t = setTimeout(() => search.current?.focus(), 50);
    return () => { document.removeEventListener("mousedown", down); document.removeEventListener("keydown", key); clearTimeout(t); };
  }, [open]);

  return (
    <div className="ros:relative" ref={box}>
      <button type="button" onClick={() => setOpen((s) => !s)} aria-label="Select country code" aria-expanded={open}
        className={`ros:flex ros:h-[46px] ros:w-full ros:items-center ros:justify-between ros:gap-1 ros:rounded-lg ros:border ros:bg-white ros:px-2 ros:text-sm ros:text-[#374151] ros:outline-none ros:transition-colors ${open ? "ros:border-[#000080] ros:ring-1 ros:ring-[#000080]" : "ros:border-[#E5E7EB] ros:hover:border-[#9CA3AF]"}`}>
        <span className="ros:truncate ros:text-sm ros:font-medium">{selected.flag} {selected.code}</span>
        <ChevronDown className={`ros:h-3.5 ros:w-3.5 ros:shrink-0 ros:text-[#9CA3AF] ros:transition-transform ${open ? "ros:rotate-180" : ""}`} />
      </button>
      {open && (
        <div className="ros:absolute ros:left-0 ros:top-full ros:z-50 ros:mt-1 ros:w-72 ros:rounded-xl ros:border ros:border-[#E5E7EB] ros:bg-white ros:shadow-xl">
          <div className="ros:flex ros:items-center ros:gap-2 ros:border-b ros:border-[#F3F4F6] ros:px-3 ros:py-2">
            <Search className="ros:h-4 ros:w-4 ros:shrink-0 ros:text-[#9CA3AF]" />
            <input ref={search} type="text" data-no-check value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search country or code…" className="ros:flex-1 ros:bg-transparent ros:text-sm ros:text-[#374151] ros:outline-none ros:placeholder:text-[#9CA3AF]" />
            {query && <button type="button" onClick={() => setQuery("")}><X className="ros:h-3.5 ros:w-3.5 ros:text-[#9CA3AF] ros:hover:text-[#374151]" /></button>}
          </div>
          <ul className="ros:max-h-56 ros:overflow-y-auto ros:py-1">
            {filtered.length === 0 ? (
              <li className="ros:px-4 ros:py-3 ros:text-center ros:text-xs ros:text-[#9CA3AF]">No results for &ldquo;{query}&rdquo;</li>
            ) : (
              filtered.map((c) => (
                <li key={`${c.name}-${c.code}`} role="option" aria-selected={c.code === value} onClick={() => { onChange(c.code); setOpen(false); setQuery(""); }}
                  className={`ros:flex ros:cursor-pointer ros:items-center ros:gap-3 ros:px-4 ros:py-2 ros:text-sm ros:transition-colors ${c.code === value ? "ros:bg-[#EFF6FF] ros:font-medium ros:text-[#000080]" : "ros:text-[#374151] ros:hover:bg-[#F9FAFB]"}`}>
                  <span className="ros:text-base ros:leading-none">{c.flag}</span>
                  <span className="ros:flex-1 ros:truncate">{c.name}</span>
                  <span className="ros:shrink-0 ros:text-xs ros:text-[#9CA3AF]">{c.code}</span>
                </li>
              ))
            )}
          </ul>
          <div className="ros:border-t ros:border-[#F3F4F6] ros:px-3 ros:py-1.5 ros:text-center ros:text-[10px] ros:text-[#9CA3AF]">{filtered.length} of {COUNTRY_CODES.length} countries</div>
        </div>
      )}
    </div>
  );
}

export default function PhoneField({
  label = "Phone Number",
  required,
  code,
  number,
  onCodeChange,
  onNumberChange,
  placeholder = "Enter phone number",
}: {
  label?: string;
  required?: boolean;
  code: string;
  number: string;
  onCodeChange: (c: string) => void;
  onNumberChange: (n: string) => void;
  placeholder?: string;
}) {
  return (
    <div>
      <label className="ros:mb-1 ros:block ros:text-sm ros:font-medium ros:text-[#374151]">
        {label}{required && <span className="ros:text-red-500"> *</span>}
      </label>
      <div className="ros:grid ros:items-stretch ros:gap-2" style={{ gridTemplateColumns: "120px minmax(0, 1fr)" }}>
        <CodePicker value={code} onChange={onCodeChange} />
        <input
          type="tel"
          name="phone"
          value={number}
          onChange={(e) => onNumberChange(normalisePhone(e.target.value, code))}
          onPaste={(e) => { e.preventDefault(); onNumberChange(normalisePhone(e.clipboardData.getData("text"), code)); }}
          placeholder={placeholder}
          required={required}
          maxLength={code === "+234" ? 10 : 15}
          className="ros:h-[46px] ros:w-full ros:rounded-lg ros:border ros:border-[#E5E7EB] ros:bg-white ros:px-4 ros:text-sm ros:text-[#374151] ros:outline-none ros:placeholder:text-[#9CA3AF] ros:focus:border-[#000080] ros:focus:ring-1 ros:focus:ring-[#000080]"
        />
        <p className="ros:col-span-full ros:mt-1 ros:text-xs ros:text-[#9CA3AF]">Digits only. Dashes, spaces and a leading 0 are stripped automatically</p>
      </div>
    </div>
  );
}
