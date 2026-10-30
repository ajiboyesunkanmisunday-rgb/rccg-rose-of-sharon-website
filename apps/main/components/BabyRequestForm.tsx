"use client";

import { useEffect, useState } from "react";
import Link from "@ros/shared/link";
import { post } from "@ros/shared/api";

/*
 * The ROSMS "Baby Dedication Form" and "Baby Christening Form" as one-page paper forms: filled in on screen,
 * submitted to the church, and printable / downloadable (as a blank copy with ?download=1, or as filled in).
 */

type Kind = "dedication" | "christening";

type Field = { key: string; label: string; type?: "text" | "tel" | "date" | "select"; lines?: number; options?: string[]; required?: boolean; name?: boolean };

const NAME_PATTERN = "[A-Za-z\\u00C0-\\u024F][A-Za-z\\u00C0-\\u024F .'\\-]*";

const FORMS: Record<Kind, {
  endpoint: string;
  heading: string[];
  intro: string;
  introItalic: boolean;
  fields: Field[];
  note: React.ReactNode;
  subject: (v: Record<string, string>) => string;
  successText: string;
  title: string;
}> = {
  dedication: {
    endpoint: "/requests/baby-dedication",
    title: "Baby Dedication Form",
    heading: ["BABY DEDICATION FORM"],
    intro: "PLEASE NOTE: YOU ARE TO WRITE ALL IN BLOCK LETTERS",
    introItalic: true,
    fields: [
      { key: "father", label: "Name of Father", required: true, name: true },
      { key: "mother", label: "Name of Mother", required: true, name: true },
      { key: "child", label: "Full name of Child", required: true, name: true },
      { key: "dob", label: "Date of Birth", type: "date", required: true },
      { key: "placeOfBirth", label: "Place of Birth" },
      { key: "meaning", label: "Meaning of names", lines: 2 },
      { key: "phone", label: "Phone number", type: "tel", required: true },
      { key: "centre", label: "House Fellowship Centre" },
      { key: "leader", label: "House Leader & Signature" },
    ],
    note: (
      <>
        <p>Please note that the 2nd Sunday of the month is baby dedication Sunday.</p>
        <p>On the day of dedication, Parents should endeavor to get to church very early and intimate the Pastor in Charge through the head usher that they are around.</p>
        <p style={{ fontStyle: "italic" }}>God bless you and remain blessed.</p>
      </>
    ),
    subject: (v) => `Baby Dedication Request — ${v.child}`,
    successText: "Your baby dedication form has been received. Our team will contact you shortly to confirm the date and details.",
  },
  christening: {
    endpoint: "/requests/baby-christening",
    title: "Baby Christening Form",
    heading: ["NOTIFICATION OF BIRTH AND REQUEST FOR CHURCH TO", "CONDUCT BABY'S CHRISTENING"],
    intro: "PLEASE FILL ALL IN BLOCK LETTERS",
    introItalic: false,
    fields: [
      { key: "parent", label: "Name of Parent", required: true, name: true },
      { key: "address", label: "Parents' Address", lines: 2 },
      { key: "sex", label: "Sex", type: "select", options: ["Male", "Female"] },
      { key: "dob", label: "Date of birth", type: "date", required: true },
      { key: "namingDate", label: "Naming ceremony date", type: "date" },
      { key: "phone", label: "Phone number of Parent", type: "tel", required: true },
    ],
    note: (
      <p><b>Note:</b> <i>The second Sunday of the month is Baby Dedication Sunday: please notify the Church as soon as you are ready to dedicate the baby.</i></p>
    ),
    subject: (v) => `Baby Christening Request — ${v.parent}`,
    successText: "Your baby christening form has been received. Our team will contact you shortly to confirm the date and details.",
  },
};

const line: React.CSSProperties = { border: "none", borderBottom: "1px solid #000", outline: "none", background: "transparent", font: "inherit", fontSize: 14, padding: "4px 2px", flex: 1, minWidth: 0, borderRadius: 0 };
const labelCss: React.CSSProperties = { fontWeight: 700, fontSize: 14, whiteSpace: "nowrap" };

export default function BabyRequestForm({ kind }: { kind: Kind }) {
  const cfg = FORMS[kind];
  const [v, setV] = useState<Record<string, string>>({ churchHandles: "", centre: "", leader: "" });
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [error, setError] = useState("");
  const set = (k: string) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => setV((p) => ({ ...p, [k]: e.target.value }));

  // "Download blank form" opens this page with ?download=1: the browser's print dialog offers Save as PDF
  useEffect(() => {
    if (new URLSearchParams(window.location.search).get("download") !== "1") return;
    const t = setTimeout(() => window.print(), 900);
    return () => clearTimeout(t);
  }, []);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("loading");
    setError("");
    try {
      const rows = cfg.fields.map((f) => `${f.label}: ${v[f.key] || ""}`);
      if (kind === "christening") rows.push(`Do you want the Church to handle the naming ceremony?: ${v.churchHandles || ""}`);
      if (kind === "christening") rows.push(`House Fellowship Centre: ${v.centre || ""}`, `House Leader & Signature: ${v.leader || ""}`);
      await post(cfg.endpoint, { subject: cfg.subject(v), content: rows.join("\n") });
      setStatus("success");
    } catch (err: unknown) {
      setStatus("error");
      setError(err instanceof Error ? err.message : "Submission failed. Please try again.");
    }
  }

  const row = (f: Field) => (
    <div key={f.key} style={{ marginBottom: 14 }}>
      <div style={{ display: "flex", alignItems: "flex-end", gap: 8 }}>
        <label htmlFor={`baby-${f.key}`} style={labelCss}>{f.label}:</label>
        {f.type === "select" ? (
          <select id={`baby-${f.key}`} value={v[f.key] || ""} onChange={set(f.key)} style={line}>
            <option value="">—</option>
            {f.options!.map((o) => <option key={o} value={o}>{o}</option>)}
          </select>
        ) : (
          <input id={`baby-${f.key}`} type={f.type ?? "text"} value={v[f.key] || ""} onChange={set(f.key)} style={line} required={f.required} autoComplete="off" {...(f.name ? { pattern: NAME_PATTERN, title: "Use letters only (spaces, hyphens and apostrophes are fine)" } : {})} {...(f.type === "tel" ? { pattern: "[0-9+\\(\\) \\-]{7,20}", title: "Enter a valid phone number" } : {})} />
        )}
      </div>
      {f.lines === 2 && <input aria-label={`${f.label} (line 2)`} type="text" value={v[f.key + "2"] || ""} onChange={set(f.key + "2")} style={{ ...line, display: "block", width: "100%", marginTop: 14 }} />}
    </div>
  );

  return (
    <>
      <style>{`
        @media print {
          body * { visibility: hidden !important; }
          #baby-sheet, #baby-sheet * { visibility: visible !important; }
          #baby-sheet { position: absolute !important; left: 0; top: 0; width: 100% !important; max-width: none !important; border: none !important; box-shadow: none !important; margin: 0 !important; padding: 12mm 14mm !important; }
          .baby-no-print { display: none !important; }
          @page { size: A4; margin: 0; }
        }
      `}</style>
      <div style={{ background: "#F4F5F7", minHeight: "100vh", padding: "96px 12px 56px", fontFamily: "Arial, Helvetica, sans-serif" }}>
        <div className="baby-no-print" style={{ maxWidth: 700, margin: "0 auto 14px", display: "flex", flexWrap: "wrap", gap: 10, alignItems: "center", justifyContent: "space-between" }}>
          <Link href="/celebrations" style={{ color: "#000080", fontWeight: 700, fontSize: 15 }}>← Back</Link>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
            <a href={`?download=1`} target="_blank" rel="noopener noreferrer" style={{ border: "1px solid #000080", color: "#000080", background: "#fff", borderRadius: 8, padding: "8px 14px", fontSize: 13, fontWeight: 700 }}>Download blank form</a>
            <button type="button" onClick={() => window.print()} style={{ border: "1px solid #000080", color: "#000080", background: "#fff", borderRadius: 8, padding: "8px 14px", fontSize: 13, fontWeight: 700, cursor: "pointer" }}>Print this form</button>
          </div>
        </div>

        {status === "success" ? (
          <div className="baby-no-print" style={{ maxWidth: 700, margin: "0 auto", background: "#fff", borderRadius: 16, border: "1px solid #E5E7EB", padding: "48px 24px", textAlign: "center" }}>
            <p style={{ fontSize: 24, fontWeight: 700, color: "#111827", marginBottom: 10 }}>Thank you!</p>
            <p style={{ color: "#6B7280", fontSize: 16, marginBottom: 20 }}>{cfg.successText}</p>
            <button type="button" onClick={() => { setStatus("idle"); setV({ churchHandles: "", centre: "", leader: "" }); }} style={{ color: "#DF4E4E", fontWeight: 700, fontSize: 14, cursor: "pointer" }}>Submit another form</button>
          </div>
        ) : (
          <form id="baby-sheet" onSubmit={submit} style={{ maxWidth: 700, margin: "0 auto", background: "#fff", borderRadius: 16, border: "1px solid #D1D5DB", padding: "28px 36px 30px", color: "#000", boxSizing: "border-box" }}>
            <div style={{ textAlign: "center" }}>
              <img src="/ros-logo.png" alt="RCCG Rose of Sharon" width={84} height={84} style={{ width: 84, height: 84, margin: "0 auto 8px", objectFit: "contain" }} />
              <p style={{ fontWeight: 700, fontSize: 18, letterSpacing: "0.01em" }}>THE REDEEMED CHRISTIAN CHURCH OF GOD</p>
              <p style={{ fontFamily: "Georgia, 'Times New Roman', serif", fontStyle: "italic", fontWeight: 700, fontSize: 24, margin: "4px 0 14px" }}>Rose of Sharon</p>
              {cfg.heading.map((h) => <p key={h} style={{ fontWeight: 700, fontSize: 15, lineHeight: 1.35 }}>{h}</p>)}
            </div>

            <p style={{ fontWeight: 700, fontSize: 14, fontStyle: cfg.introItalic ? "italic" : "normal", margin: "20px 0 14px" }}>{cfg.intro}</p>

            {cfg.fields.map(row)}

            {kind === "christening" && (
              <div style={{ margin: "6px 0 14px" }}>
                <p style={labelCss}>Do you want the Church to handle the naming ceremony?</p>
                <div style={{ display: "flex", gap: 28, margin: "8px 0 6px" }}>
                  {["Yes", "No"].map((o) => (
                    <label key={o} style={{ display: "flex", alignItems: "center", gap: 8, fontWeight: 700, fontSize: 14, cursor: "pointer" }}>
                      <input type="radio" name="churchHandles" value={o} checked={v.churchHandles === o} onChange={set("churchHandles")} /> {o} [ ]
                    </label>
                  ))}
                </div>
              </div>
            )}

            {kind === "christening" && (
              <>
                {row({ key: "centre", label: "House Fellowship Centre" })}
                {row({ key: "leader", label: "House Leader & Signature" })}
              </>
            )}

            <div style={{ fontSize: 13, color: "#4B5563", lineHeight: 1.5, marginTop: 22, display: "grid", gap: 8 }}>{cfg.note}</div>

            {status === "error" && <p className="baby-no-print" style={{ color: "#DC2626", fontSize: 13, marginTop: 14 }}>{error}</p>}

            <div className="baby-no-print" style={{ display: "flex", justifyContent: "flex-end", gap: 10, marginTop: 22 }}>
              <Link href="/celebrations" style={{ background: "#B8B8F0", color: "#000080", borderRadius: 10, padding: "10px 20px", fontSize: 14, fontWeight: 600 }}>Cancel</Link>
              <button type="submit" disabled={status === "loading"} style={{ background: "#000080", color: "#fff", borderRadius: 10, padding: "10px 22px", fontSize: 14, fontWeight: 600, cursor: "pointer", opacity: status === "loading" ? 0.6 : 1 }}>
                {status === "loading" ? "Submitting…" : "Submit Form"}
              </button>
            </div>
          </form>
        )}
      </div>
    </>
  );
}
