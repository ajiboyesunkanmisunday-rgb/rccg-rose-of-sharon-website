"use client";

import { FormField, inputCls } from "./form";

/* A repeatable group of rows (qualifications, past places of worship, positions held ...), like the
   "add another" tables on the ROSMS forms. The parent keeps the rows in state; `cleanRows` drops empty ones. */

export type RowField = { key: string; label: string; type?: "text" | "date" | "tel" | "checkbox"; placeholder?: string };
export type Row = Record<string, string | boolean>;

export function emptyRow(fields: RowField[]): Row {
  return Object.fromEntries(fields.map((f) => [f.key, f.type === "checkbox" ? false : ""]));
}

/** Rows with at least one filled-in value, ready to send to the API. */
export function cleanRows(rows: Row[], fields: RowField[]): Row[] {
  return rows
    .filter((r) => fields.some((f) => (f.type === "checkbox" ? false : String(r[f.key] ?? "").trim() !== "")))
    .map((r) => Object.fromEntries(fields.map((f) => [f.key, f.type === "checkbox" ? Boolean(r[f.key]) : (String(r[f.key] ?? "").trim() || undefined)])));
}

export function RepeatRows({
  title,
  fields,
  rows,
  onChange,
  addLabel = "Add another",
}: {
  title: string;
  fields: RowField[];
  rows: Row[];
  onChange: (rows: Row[]) => void;
  addLabel?: string;
}) {
  const update = (i: number, key: string, value: string | boolean) =>
    onChange(rows.map((r, idx) => (idx === i ? { ...r, [key]: value } : r)));
  return (
    <div className="ros:flex ros:w-full ros:flex-col ros:gap-[12px]">
      <p className="ros:text-sm ros:font-semibold ros:text-[#111827]">{title}</p>
      {rows.map((row, i) => (
        <div key={i} className="ros:flex ros:flex-col ros:gap-[12px] ros:rounded-lg ros:border ros:border-[#E5E7EB] ros:bg-white ros:p-[14px]">
          <div className="ros:grid ros:grid-cols-1 ros:gap-[12px] ros:sm:grid-cols-2">
            {fields.map((f) =>
              f.type === "checkbox" ? (
                <label key={f.key} className="ros:flex ros:items-center ros:gap-[8px] ros:text-sm ros:text-[#374151]">
                  <input type="checkbox" checked={Boolean(row[f.key])} onChange={(e) => update(i, f.key, e.target.checked)} className="ros:size-[16px] ros:accent-[#DF4E4E]" />
                  {f.label}
                </label>
              ) : (
                <FormField key={f.key} label={f.label}>
                  <input type={f.type ?? "text"} value={String(row[f.key] ?? "")} onChange={(e) => update(i, f.key, e.target.value)} className={inputCls} placeholder={f.placeholder} />
                </FormField>
              ),
            )}
          </div>
          {rows.length > 1 && (
            <button type="button" onClick={() => onChange(rows.filter((_, idx) => idx !== i))} className="ros:self-start ros:text-xs ros:font-bold ros:uppercase ros:tracking-[0.15em] ros:text-[#DF4E4E] ros:hover:underline">
              Remove
            </button>
          )}
        </div>
      ))}
      <button type="button" onClick={() => onChange([...rows, emptyRow(fields)])} className="ros:self-start ros:rounded-full ros:border ros:border-black ros:px-4 ros:py-2 ros:text-xs ros:font-extrabold ros:uppercase ros:tracking-[0.15em] ros:transition ros:hover:bg-black ros:hover:text-white">
        + {addLabel}
      </button>
    </div>
  );
}
