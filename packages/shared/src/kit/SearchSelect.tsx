"use client";

import { useEffect, useRef, useState } from "react";
import { ChevronDown, Search, X } from "lucide-react";

/* The searchable dropdown the ROSMS forms use for country, state and year: a button that opens a panel with a search box. */

type Option = string | { label: string; value: string };
const lbl = (o: Option) => (typeof o === "string" ? o : o.label);
const val = (o: Option) => (typeof o === "string" ? o : o.value);

export default function SearchSelect({
  placeholder = "Select…",
  searchPlaceholder = "Search…",
  options,
  value,
  onChange,
  disabled = false,
  name,
  required = false,
}: {
  placeholder?: string;
  searchPlaceholder?: string;
  options: Option[];
  value: string;
  onChange: (v: string) => void;
  disabled?: boolean;
  name?: string;
  required?: boolean;
}) {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const box = useRef<HTMLDivElement>(null);
  const search = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (!open) return;
    const down = (e: MouseEvent) => { if (box.current && !box.current.contains(e.target as Node)) { setOpen(false); setQuery(""); } };
    const key = (e: KeyboardEvent) => { if (e.key === "Escape") { setOpen(false); setQuery(""); } };
    document.addEventListener("mousedown", down);
    document.addEventListener("keydown", key);
    const t = setTimeout(() => search.current?.focus(), 50);
    return () => { document.removeEventListener("mousedown", down); document.removeEventListener("keydown", key); clearTimeout(t); };
  }, [open]);

  const filtered = query.trim() ? options.filter((o) => lbl(o).toLowerCase().includes(query.trim().toLowerCase())) : options;
  const current = options.find((o) => val(o) === value);
  const display = value ? (current ? lbl(current) : value) : "";

  return (
    <div className="ros:relative" ref={box}>
      {name && <input type="text" name={name} value={value} required={required} readOnly tabIndex={-1} aria-hidden="true" data-no-check className="ros:pointer-events-none ros:absolute ros:left-0 ros:top-0 ros:h-px ros:w-full ros:opacity-0" />}
      <button
        type="button"
        disabled={disabled}
        onClick={() => { if (!disabled) setOpen((s) => !s); }}
        className={`ros:flex ros:w-full ros:items-center ros:justify-between ros:rounded-lg ros:border ros:bg-white ros:px-4 ros:py-3 ros:text-left ros:text-sm ros:outline-none ros:transition-colors ${
          disabled ? "ros:cursor-not-allowed ros:border-[#E5E7EB] ros:bg-gray-50 ros:text-gray-400" : open ? "ros:border-[#000080] ros:ring-1 ros:ring-[#000080]" : "ros:border-[#E5E7EB] ros:hover:border-[#9CA3AF]"
        }`}
      >
        <span className={display ? "ros:text-[#374151]" : "ros:text-[#9CA3AF]"}>{display || placeholder}</span>
        <span className="ros:flex ros:shrink-0 ros:items-center ros:gap-1">
          {value && !disabled && (
            <span role="button" tabIndex={0} onClick={(e) => { e.stopPropagation(); onChange(""); setQuery(""); }} className="ros:rounded ros:p-0.5 ros:text-[#9CA3AF] ros:hover:text-[#374151]"><X className="ros:h-3.5 ros:w-3.5" /></span>
          )}
          <ChevronDown className={`ros:h-4 ros:w-4 ros:text-[#9CA3AF] ros:transition-transform ros:duration-200 ${open ? "ros:rotate-180" : ""}`} />
        </span>
      </button>

      {open && (
        <div className="ros:absolute ros:left-0 ros:right-0 ros:top-full ros:z-50 ros:mt-1 ros:rounded-xl ros:border ros:border-[#E5E7EB] ros:bg-white ros:shadow-xl">
          <div className="ros:flex ros:items-center ros:gap-2 ros:border-b ros:border-[#F3F4F6] ros:px-3 ros:py-2">
            <Search className="ros:h-4 ros:w-4 ros:shrink-0 ros:text-[#9CA3AF]" />
            <input ref={search} type="text" data-no-check value={query} onChange={(e) => setQuery(e.target.value)} placeholder={searchPlaceholder} className="ros:flex-1 ros:bg-transparent ros:text-sm ros:text-[#374151] ros:outline-none ros:placeholder:text-[#9CA3AF]" />
            {query && <button type="button" onClick={() => setQuery("")} className="ros:text-[#9CA3AF] ros:hover:text-[#374151]"><X className="ros:h-3.5 ros:w-3.5" /></button>}
          </div>
          <ul className="ros:max-h-[220px] ros:overflow-y-auto ros:py-1" role="listbox">
            {filtered.length === 0 ? (
              <li className="ros:px-4 ros:py-3 ros:text-center ros:text-xs ros:text-[#9CA3AF]">No results for &ldquo;{query}&rdquo;</li>
            ) : (
              filtered.map((o) => (
                <li key={val(o)} role="option" aria-selected={value === val(o)} onClick={() => { onChange(val(o)); setOpen(false); setQuery(""); }}
                  className={`ros:cursor-pointer ros:px-4 ros:py-2.5 ros:text-sm ros:transition-colors ${value === val(o) ? "ros:bg-[#EFF6FF] ros:font-medium ros:text-[#000080]" : "ros:text-[#374151] ros:hover:bg-[#F9FAFB]"}`}>
                  {lbl(o)}
                </li>
              ))
            )}
          </ul>
          <div className="ros:border-t ros:border-[#F3F4F6] ros:px-3 ros:py-1.5 ros:text-center ros:text-[10px] ros:text-[#9CA3AF]">{filtered.length} of {options.length} options</div>
        </div>
      )}
    </div>
  );
}
