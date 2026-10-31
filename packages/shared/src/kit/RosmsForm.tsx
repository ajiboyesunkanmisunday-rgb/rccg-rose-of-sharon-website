"use client";

import type { ReactNode } from "react";
import SearchSelect from "./SearchSelect";
import { COUNTRIES, statesForCountry } from "./geo";

/*
 * Building blocks that give a public form the same look as the ROSMS (user management) registration forms:
 * a plain page with a centred title, white bordered cards with bold section headings, a two-column field grid,
 * rounded inputs with a navy focus ring, and a navy button. Header and footer stay the website's own.
 */

export const R_INPUT =
  "ros:w-full ros:rounded-lg ros:border ros:border-[#E5E7EB] ros:bg-white ros:px-4 ros:py-3 ros:text-sm ros:text-[#374151] ros:outline-none ros:placeholder:text-[#9CA3AF] ros:focus:border-[#000080] ros:focus:ring-1 ros:focus:ring-[#000080]";
export const R_SELECT = `${R_INPUT} ros:cursor-pointer`;
export const R_LABEL = "ros:mb-1 ros:block ros:text-sm ros:font-medium ros:text-[#374151]";
export const R_BUTTON =
  "ros:flex ros:items-center ros:justify-center ros:gap-2 ros:rounded-xl ros:bg-[#000080] ros:px-10 ros:py-3 ros:text-sm ros:font-semibold ros:text-white ros:transition-colors ros:hover:bg-[#000066] ros:disabled:cursor-not-allowed ros:disabled:opacity-60";

export const MONTHS = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
export const DAYS = Array.from({ length: 31 }, (_, i) => String(i + 1));
export const yearOptions = (back = 100) => { const y = new Date().getFullYear(); return Array.from({ length: back + 1 }, (_, i) => String(y - i)); };

export function RPage({ title, subtitle, children }: { title: string; subtitle?: string; children: ReactNode }) {
  return (
    <div className="ros:min-h-[70vh] ros:bg-white ros:pt-[72px]">
      <div className="ros:mx-auto ros:max-w-5xl ros:px-4 ros:py-10 ros:sm:px-8">
        <h1 className="ros:text-center ros:text-[28px] ros:font-bold ros:text-[#1F2937]">{title}</h1>
        {subtitle && <p className="ros:mt-2 ros:text-center ros:text-sm ros:text-[#6B7280]">{subtitle}</p>}
        {children}
      </div>
    </div>
  );
}

export function RCard({ title, children }: { title: string; children: ReactNode }) {
  return (
    <div className="ros:mb-8 ros:rounded-xl ros:border ros:border-[#E5E7EB] ros:bg-white ros:p-4 ros:sm:p-6">
      <h2 className="ros:mb-6 ros:text-[18px] ros:font-bold ros:text-black">{title}</h2>
      <div className="ros:grid ros:grid-cols-1 ros:gap-x-6 ros:gap-y-4 ros:md:grid-cols-2">{children}</div>
    </div>
  );
}

export function RField({ label, required, optional, wide, children }: { label: string; required?: boolean; optional?: boolean; wide?: boolean; children: ReactNode }) {
  return (
    <div className={wide ? "ros:md:col-span-2" : ""}>
      <label className={R_LABEL}>
        {label}
        {required && <span className="ros:text-red-500"> *</span>}
        {optional && <span className="ros:font-normal ros:text-[#9CA3AF]"> (optional)</span>}
      </label>
      {children}
    </div>
  );
}

export function RError({ message }: { message: string }) {
  if (!message) return null;
  return (
    <div className="ros:mb-4 ros:flex ros:items-start ros:gap-3 ros:rounded-lg ros:border ros:border-red-200 ros:bg-red-50 ros:px-4 ros:py-3" role="alert">
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#DC2626" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="ros:mt-0.5 ros:shrink-0"><circle cx="12" cy="12" r="10" /><line x1="12" y1="8" x2="12" y2="12" /><line x1="12" y1="16" x2="12.01" y2="16" /></svg>
      <p className="ros:text-sm ros:text-red-700">{message}</p>
    </div>
  );
}

export function RSpinner() {
  return (
    <svg className="ros:h-4 ros:w-4 ros:animate-spin" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" aria-hidden="true">
      <circle className="ros:opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
      <path className="ros:opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
    </svg>
  );
}

/** The success screen the ROSMS public forms show: a round check, a heading, a line of thanks and a button. */
export function RSuccess({ title, text, children, again, onAgain }: { title: string; text: string; children?: ReactNode; again: string; onAgain: () => void }) {
  return (
    <div className="ros:flex ros:flex-col ros:items-center ros:px-4 ros:py-20 ros:text-center">
      <div className="ros:flex ros:h-20 ros:w-20 ros:items-center ros:justify-center ros:rounded-full ros:bg-[#000080]">
        <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12" /></svg>
      </div>
      <h2 className="ros:mt-6 ros:text-2xl ros:font-bold ros:text-[#1F2937]">{title}</h2>
      <p className="ros:mt-3 ros:max-w-md ros:text-sm ros:text-[#6B7280]">{text}</p>
      {children}
      <button type="button" onClick={onAgain} className="ros:mt-8 ros:rounded-xl ros:bg-[#000080] ros:px-8 ros:py-3 ros:text-sm ros:font-semibold ros:text-white ros:transition-colors ros:hover:bg-[#000066]">{again}</button>
    </div>
  );
}

/** Country and State / Province pickers (Nigeria has a state list; other countries get a text box), as in ROSMS. */
export function CountryState({ country, state, onCountry, onState, countryRequired }: { country: string; state: string; onCountry: (c: string) => void; onState: (s: string) => void; countryRequired?: boolean }) {
  const states = statesForCountry(country);
  return (
    <>
      <RField label="Country" required={countryRequired}>
        <SearchSelect placeholder="Select Country" searchPlaceholder="Search countries..." options={COUNTRIES} value={country} onChange={(c) => { onCountry(c); onState(""); }} name="country" required={countryRequired} />
      </RField>
      <RField label="State / Province">
        {states.length > 0 ? (
          <SearchSelect placeholder={country ? "Select State" : "Select a country first"} searchPlaceholder="Search states..." options={states} value={state} onChange={onState} disabled={!country} />
        ) : (
          <input type="text" value={state} onChange={(e) => onState(e.target.value)} placeholder={country ? "Enter state / province" : "Select a country first"} disabled={!country} className={`${R_INPUT} ros:disabled:cursor-not-allowed ros:disabled:bg-gray-50 ros:disabled:text-gray-400`} />
        )}
      </RField>
    </>
  );
}

/** Day / Month / Year selects (year is a searchable list), as on the ROSMS forms. */
export function DateParts({ day, month, year, onDay, onMonth, onYear, back = 100 }: { day: string; month: string; year: string; onDay: (v: string) => void; onMonth: (v: string) => void; onYear: (v: string) => void; back?: number }) {
  return (
    <div className="ros:grid ros:grid-cols-3 ros:gap-2">
      <select value={day} onChange={(e) => onDay(e.target.value)} className={R_SELECT}><option value="">Day</option>{DAYS.map((d) => <option key={d} value={d}>{d}</option>)}</select>
      <select value={month} onChange={(e) => onMonth(e.target.value)} className={R_SELECT}><option value="">Month</option>{MONTHS.map((m, i) => <option key={m} value={String(i + 1)}>{m}</option>)}</select>
      <SearchSelect placeholder="Year" searchPlaceholder="Search year…" options={yearOptions(back)} value={year} onChange={onYear} />
    </div>
  );
}
