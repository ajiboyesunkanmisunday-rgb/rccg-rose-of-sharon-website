"use client";

import { useState, useRef } from "react";
import { useRouter } from "next/navigation";
import { Printer, Send, CheckCircle, XCircle, ChevronLeft, ChevronRight } from "lucide-react";
import { post, uploadProfilePicture } from "@ros/shared/api";
import { resolveHref } from "@ros/shared/sites";
import { usePaperScale } from "./usePaperScale";

export type WaterBaptismMode = "blank" | "fill";

/* The Foundation and Water Baptism Course application, laid out exactly like the ROSMS paper form
   (two A4 sheets) and filled in on screen. Same approach as the RILA form. */

const FONT = '"Times New Roman", Times, serif';

const PAPER: React.CSSProperties = {
  background: "#fff",
  width: 794,
  minHeight: 1123,
  margin: "0 auto",
  padding: "40px 52px 36px",
  boxShadow: "0 6px 32px rgba(0,0,0,0.22)",
  fontFamily: FONT,
  fontSize: 13,
  color: "#000",
  boxSizing: "border-box",
  position: "relative",
};

const TB: React.CSSProperties = { borderCollapse: "collapse", width: "100%", marginBottom: 14, tableLayout: "fixed" };
const C: React.CSSProperties = { border: "1px solid #000", padding: "2px 6px", verticalAlign: "middle", fontSize: 13, height: 36 };
const L: React.CSSProperties = { ...C, fontWeight: 700, textTransform: "uppercase" };

function CI({
  value, onChange, readOnly, type = "text", style,
}: {
  value: string; onChange?: (v: string) => void; readOnly?: boolean; type?: string; style?: React.CSSProperties;
}) {
  return (
    <input
      type={type} value={value} readOnly={readOnly}
      onChange={readOnly ? undefined : (e) => onChange?.(e.target.value)}
      style={{ border: "none", outline: "none", background: "transparent", fontFamily: FONT, fontSize: 13, color: "#000", width: "100%", padding: "2px 2px", ...style }}
    />
  );
}

function CS({
  value, onChange, readOnly, options,
}: {
  value: string; onChange?: (v: string) => void; readOnly?: boolean; options: { v: string; l: string }[];
}) {
  return (
    <select
      value={value} disabled={readOnly}
      onChange={(e) => onChange?.(e.target.value)}
      style={{ border: "none", outline: "none", background: "transparent", fontFamily: FONT, fontSize: 13, width: "100%", padding: "2px 0", appearance: "none", WebkitAppearance: "none", cursor: readOnly ? "default" : "pointer" }}
    >
      <option value=""></option>
      {options.map((o) => <option key={o.v} value={o.v}>{o.l}</option>)}
    </select>
  );
}

/** A dotted answer line, as printed on the paper form. */
function DL({ value, onChange, readOnly, style }: { value: string; onChange?: (v: string) => void; readOnly?: boolean; style?: React.CSSProperties }) {
  return (
    <input
      type="text" value={value} readOnly={readOnly}
      onChange={readOnly ? undefined : (e) => onChange?.(e.target.value)}
      style={{ border: "none", borderBottom: "1px dotted #000", outline: "none", background: "transparent", fontFamily: FONT, fontSize: 13, color: "#000", width: "100%", padding: "2px 2px", ...style }}
    />
  );
}

function SH({ letter, children }: { letter?: string; children: React.ReactNode }) {
  return (
    <div style={{ display: "flex", fontWeight: 700, fontSize: 13, textTransform: "uppercase", margin: "18px 0 10px" }}>
      <span style={{ width: 60, flexShrink: 0 }}>{letter ? `${letter}:` : ""}</span>
      <span>{children}</span>
    </div>
  );
}

function YesNo({ value, onChange, readOnly }: { value: string; onChange?: (v: string) => void; readOnly?: boolean }) {
  const box = (opt: "YES" | "NO") => (
    <label style={{ display: "inline-flex", alignItems: "center", gap: 6, marginRight: 22, fontWeight: 700, fontSize: 13, cursor: readOnly ? "default" : "pointer" }}>
      <input type="checkbox" checked={value === opt} disabled={readOnly} onChange={() => onChange?.(value === opt ? "" : opt)} style={{ width: 14, height: 14 }} />
      {opt}
    </label>
  );
  return <div style={{ margin: "6px 0 10px" }}>{box("YES")}{box("NO")}</div>;
}

function splitPhone(raw: string): { countryCode: string; phoneNumber: string } {
  const t = raw.replace(/[\s()-]/g, "");
  const m = t.match(/^\+(\d{1,3})(\d{7,})$/);
  if (m) return { countryCode: `+${m[1]}`, phoneNumber: m[2] };
  return { countryCode: "+234", phoneNumber: t };
}

export default function WaterBaptismFormCore({ mode = "fill" }: { mode?: WaterBaptismMode }) {
  const ro = mode !== "fill";
  const router = useRouter();
  const scale = usePaperScale();
  const photoRef = useRef<HTMLInputElement>(null);
  const [currentPage, setCurrentPage] = useState(1);

  const [photoPreview, setPhotoPreview] = useState("");
  const [photoFile, setPhotoFile] = useState<File | null>(null);

  const [f, setF] = useState({
    surname: "", firstName: "", middleName: "", sex: "", dob: "", maritalStatus: "",
    stateOfOrigin: "", spouseName: "", noOfChildren: "", religion: "",
    street: "", phone: "", city: "", state: "", country: "Nigeria",
    occupation: "", officeEmail: "", employer: "", socialHandle: "", officeAddress: "", officePhone: "",
    worship1: "", worship2: "",
    salvationDate: "", salvationWhere: "", hgDate: "", hgWhere: "",
    newConvert: "", newConvertNote: "", afraid: "", afraidNote: "",
    reason1: "", reason2: "", reason3: "",
    otherInfo: "", signature: "", signDate: "",
  });
  const set = (k: keyof typeof f) => (v: string) => setF((p) => ({ ...p, [k]: v }));

  const [schools, setSchools] = useState(() => Array.from({ length: 3 }, () => ({ school: "", dates: "", qualification: "" })));
  const setSchool = (i: number, k: "school" | "dates" | "qualification", v: string) =>
    setSchools((p) => p.map((r, idx) => (idx === i ? { ...r, [k]: v } : r)));
  const [depts, setDepts] = useState(() => Array.from({ length: 3 }, () => ({ name: "", dates: "" })));
  const setDept = (i: number, k: "name" | "dates", v: string) =>
    setDepts((p) => p.map((r, idx) => (idx === i ? { ...r, [k]: v } : r)));

  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handlePhoto = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setPhotoFile(file);
    const r = new FileReader();
    r.onloadend = () => setPhotoPreview(r.result as string);
    r.readAsDataURL(file);
  };

  const handleSubmit = async () => {
    const missing: string[] = [];
    if (!f.firstName.trim()) missing.push("First Name");
    if (!f.surname.trim()) missing.push("Surname");
    if (!f.sex) missing.push("Sex");
    if (!f.dob) missing.push("Date of Birth");
    if (!f.phone.trim()) missing.push("Phone");
    if (!f.reason1.trim()) missing.push("a reason for the water baptism classes (H)");
    if (missing.length) {
      setSubmitError(`Please fill in: ${missing.join(", ")}.`);
      return;
    }
    setSubmitError("");
    setSubmitting(true);
    try {
      let profilePictureUrl: string | undefined;
      if (photoFile) {
        try {
          profilePictureUrl = await uploadProfilePicture(photoFile);
        } catch {
          setSubmitError("The passport photograph could not be uploaded. Remove it or try a smaller picture.");
          setSubmitting(false);
          return;
        }
      }
      const { countryCode, phoneNumber } = splitPhone(f.phone);
      const clean = (rows: Record<string, string | undefined>[]) => rows.filter((r) => Object.values(r).some((v) => v && v.trim()));

      const qualificationRequests = clean(
        schools.map((s) => ({ institution: s.school.trim() || undefined, date: s.dates.trim() || undefined, qualificationReceived: s.qualification.trim() || undefined })),
      );
      const createPastPlaceOfWorshipRequests = clean([
        { name: f.worship1.trim() || undefined },
        { name: f.worship2.trim() || undefined },
      ]);
      const studentDepartmentRequests = clean(depts.map((d) => ({ name: d.name.trim() || undefined, date: d.dates.trim() || undefined })));

      // paper-form answers that have no field of their own on the record are kept in "other information"
      const extras = [
        f.religion.trim() && `Formal religion: ${f.religion.trim()}`,
        f.newConvertNote.trim() && `New converts classes: ${f.newConvertNote.trim()}`,
        f.afraidNote.trim() && `Afraid of water: ${f.afraidNote.trim()}`,
        f.signature.trim() && `Signed: ${f.signature.trim()}${f.signDate ? `, ${f.signDate}` : ""}`,
      ].filter(Boolean) as string[];
      const otherInformation = [f.otherInfo.trim(), ...extras].filter(Boolean).join("\n");

      await post("/water-baptisms", {
        firstName: f.firstName.trim(),
        middleName: f.middleName.trim() || undefined,
        lastName: f.surname.trim(),
        countryCode,
        phoneNumber,
        sex: f.sex,
        profilePictureUrl,
        street: f.street || undefined,
        city: f.city || undefined,
        state: f.state || undefined,
        country: f.country || undefined,
        stateOfOrigin: f.stateOfOrigin || undefined,
        dateOfBirth: f.dob || undefined,
        maritalStatus: f.maritalStatus || undefined,
        noOfChildren: f.noOfChildren ? parseInt(f.noOfChildren, 10) : undefined,
        spouseName: f.spouseName || undefined,
        occupation: f.occupation || undefined,
        employer: f.employer || undefined,
        officeFullAddress: f.officeAddress || undefined,
        officePhoneNumber: f.officePhone || undefined,
        officeEmail: f.officeEmail || undefined,
        officeSocialMediaHandle: f.socialHandle || undefined,
        afraidOfWater: f.afraid === "YES",
        studentDepartmentRequests,
        createPastPlaceOfWorshipRequests,
        qualificationRequests,
        salvationDate: f.salvationDate || undefined,
        salvationLocation: f.salvationWhere || undefined,
        holySpiritBaptismDate: f.hgDate || undefined,
        holySpiritBaptismLocation: f.hgWhere || undefined,
        goneThroughNewConvertClass: f.newConvert === "YES",
        reasonForApplying: [f.reason1, f.reason2, f.reason3].map((r) => r.trim()).filter(Boolean),
        otherInformation: otherInformation || undefined,
      });
      setSubmitted(true);
    } catch (e) {
      setSubmitError(e instanceof Error ? e.message : "Submission failed. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  if (submitted) {
    return (
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", minHeight: "60vh", gap: 20, fontFamily: FONT, padding: "24px 16px" }}>
        <CheckCircle size={56} color="#16A34A" />
        <h2 style={{ fontSize: 22, fontWeight: 700, color: "#111", textAlign: "center" }}>Application Submitted</h2>
        <p style={{ color: "#555", textAlign: "center", maxWidth: 460, fontSize: 14, margin: 0 }}>
          Your Foundation and Water Baptism Course application has been received. Our team will contact you with next steps and the scheduled baptism date.
        </p>
        <button onClick={() => router.push(resolveHref("/trainings/water-baptism"))}
          style={{ padding: "10px 24px", borderRadius: 8, background: "#DC2626", color: "#fff", fontWeight: 700, border: "none", cursor: "pointer", fontSize: 14, marginTop: 8 }}>
          Back to Water Baptism
        </button>
      </div>
    );
  }

  const input = (k: keyof typeof f, type = "text") => <CI value={f[k]} onChange={set(k)} readOnly={ro} type={type} />;
  const dateInput = (k: keyof typeof f) => <CI value={f[k]} onChange={set(k)} readOnly={ro} type={ro ? "text" : "date"} />;

  /* SHEET 1 */
  const page1 = (
    <div style={PAPER}>
      <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: 16 }}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/ros-logo.png" alt="RCCG" style={{ width: 80, height: 80, objectFit: "contain", flexShrink: 0 }} />
        <div style={{ flex: 1, textAlign: "center", lineHeight: 1.9 }}>
          <div style={{ fontWeight: 700, fontSize: 15 }}>THE REDEEMED CHRISTIAN CHURCH OF GOD</div>
          <div style={{ fontWeight: 700, fontSize: 15 }}>ROSE OF SHARON PARISH</div>
          <div style={{ fontWeight: 700, fontSize: 15, textDecoration: "underline" }}>FOUNDATION AND WATER BAPTISM COURSE</div>
          <div style={{ fontStyle: "italic", fontSize: 13 }}>(PLEASE ANSWER EVERY QUESTION)</div>
        </div>
        <div
          onClick={() => !ro && photoRef.current?.click()}
          style={{ width: 96, height: 120, border: "1px solid #000", flexShrink: 0, display: "flex", alignItems: "center", justifyContent: "center", cursor: ro ? "default" : "pointer", overflow: "hidden" }}
        >
          {photoPreview ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={photoPreview} alt="Passport" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
          ) : (
            <span style={{ fontSize: 10, color: "#555", textAlign: "center", padding: 4 }}>Passport<br />Photograph</span>
          )}
          {!ro && <input ref={photoRef} type="file" accept="image/*" style={{ display: "none" }} onChange={handlePhoto} />}
        </div>
      </div>

      <SH letter="A">BIOGRAPHICAL DATA</SH>
      <table style={TB}>
        <colgroup><col style={{ width: "25%" }} /><col style={{ width: "21%" }} /><col style={{ width: "27%" }} /><col style={{ width: "27%" }} /></colgroup>
        <tbody>
          <tr><td style={L}>Surname:</td><td style={C}>{input("surname")}</td><td style={L}>First Name:</td><td style={C}>{input("firstName")}</td></tr>
          <tr><td style={L}>Middle Name:</td><td style={C}>{input("middleName")}</td><td style={L}>Sex:</td><td style={C}><CS value={f.sex} onChange={set("sex")} readOnly={ro} options={[{ v: "MALE", l: "Male" }, { v: "FEMALE", l: "Female" }]} /></td></tr>
          <tr><td style={L}>Date of Birth:</td><td style={C}>{dateInput("dob")}</td><td style={L}>Marital Status:</td><td style={C}><CS value={f.maritalStatus} onChange={set("maritalStatus")} readOnly={ro} options={[{ v: "SINGLE", l: "Single" }, { v: "MARRIED", l: "Married" }, { v: "DIVORCED", l: "Divorced" }, { v: "WIDOWED", l: "Widowed" }]} /></td></tr>
          <tr><td style={{ ...L, height: 52 }}>State of Origin:</td><td style={C}>{input("stateOfOrigin")}</td><td style={L}>Name of Spouse: (if married)</td><td style={C}>{input("spouseName")}</td></tr>
          <tr><td style={L}>Number of Children:</td><td style={C}>{input("noOfChildren", "number")}</td><td style={L}>Formal Religion:</td><td style={C}>{input("religion")}</td></tr>
        </tbody>
      </table>

      <SH letter="B">ADDRESSES</SH>
      <table style={TB}>
        <colgroup><col style={{ width: "20%" }} /><col style={{ width: "36%" }} /><col style={{ width: "27%" }} /><col style={{ width: "17%" }} /></colgroup>
        <tbody>
          <tr><td style={L}>Home Address</td><td style={C}>{input("street")}</td><td style={L}>Phone:</td><td style={C}>{input("phone", "tel")}</td></tr>
          <tr><td style={L}>City</td><td style={C}>{input("city")}</td><td style={L}>State:</td><td style={C}>{input("state")}</td></tr>
          <tr><td style={L}>Country</td><td style={C} colSpan={3}>{input("country")}</td></tr>
          <tr><td style={L}>Occupation</td><td style={C}>{input("occupation")}</td><td style={L}>E-mail:</td><td style={C}>{input("officeEmail", "email")}</td></tr>
          <tr><td style={L}>Place of Work</td><td style={C}>{input("employer")}</td><td style={L}>Social Media Handle:</td><td style={C}>{input("socialHandle")}</td></tr>
          <tr><td style={L}>Office Address</td><td style={C}>{input("officeAddress")}</td><td style={L}>Phone:</td><td style={C}>{input("officePhone", "tel")}</td></tr>
        </tbody>
      </table>

      <SH letter="B">EDUCATION &amp; PROFESSIONAL QUALIFICATIONS SCHOOL</SH>
      <table style={TB}>
        <colgroup><col style={{ width: "44%" }} /><col style={{ width: "18%" }} /><col style={{ width: "38%" }} /></colgroup>
        <tbody>
          <tr>
            <td style={{ ...L, textAlign: "center" }}>Schools Attended</td>
            <td style={{ ...L, textAlign: "center" }}>Dates</td>
            <td style={{ ...L, textAlign: "center" }}>Qualification Received</td>
          </tr>
          {schools.map((s, i) => (
            <tr key={i}>
              <td style={C}>
                <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                  <span style={{ fontWeight: 700, width: 16, textAlign: "center" }}>{i + 1}</span>
                  <CI value={s.school} onChange={(v) => setSchool(i, "school", v)} readOnly={ro} />
                </div>
              </td>
              <td style={C}><CI value={s.dates} onChange={(v) => setSchool(i, "dates", v)} readOnly={ro} /></td>
              <td style={C}><CI value={s.qualification} onChange={(v) => setSchool(i, "qualification", v)} readOnly={ro} /></td>
            </tr>
          ))}
        </tbody>
      </table>

      <SH letter="C">CHRISTIAN HISTORY</SH>
      <div style={{ fontWeight: 700, fontSize: 13, textTransform: "uppercase", margin: "0 0 10px", lineHeight: 1.5 }}>
        List your 2 most recent places of worship apart from Rose of Sharon Parish (incl. non-Christian)
      </div>
      <table style={TB}>
        <colgroup><col style={{ width: "5%" }} /><col style={{ width: "95%" }} /></colgroup>
        <tbody>
          <tr><td style={{ ...L, textAlign: "center" }}>1.</td><td style={C}>{input("worship1")}</td></tr>
          <tr><td style={{ ...L, textAlign: "center" }}>2.</td><td style={C}>{input("worship2")}</td></tr>
        </tbody>
      </table>

      <table style={TB}>
        <colgroup><col style={{ width: "55%" }} /><col style={{ width: "15%" }} /><col style={{ width: "30%" }} /></colgroup>
        <tbody>
          <tr>
            <td style={{ ...L, height: 62 }}>Date of Salvation (When did you give your life to Christ?)</td>
            <td style={L}>Where:</td>
            <td style={C}>{input("salvationWhere")}</td>
          </tr>
          <tr><td style={C}>{dateInput("salvationDate")}</td><td style={C} colSpan={2}></td></tr>
        </tbody>
      </table>

      <table style={TB}>
        <colgroup><col style={{ width: "55%" }} /><col style={{ width: "15%" }} /><col style={{ width: "30%" }} /></colgroup>
        <tbody>
          <tr>
            <td style={{ ...L, height: 62 }}>Are you baptized in the Holyghost (with evidence of speaking in tongues)</td>
            <td style={L}>Where:</td>
            <td style={C}>{input("hgWhere")}</td>
          </tr>
          <tr><td style={C}>{dateInput("hgDate")}</td><td style={C} colSpan={2}></td></tr>
        </tbody>
      </table>

      <SH letter="D">DO YOU BELONG TO ANY DEPARTMENT WITHIN THE CHURCH? (IF YES, PLEASE LIST)</SH>
      <table style={TB}>
        <colgroup><col style={{ width: "5%" }} /><col style={{ width: "68%" }} /><col style={{ width: "10%" }} /><col style={{ width: "17%" }} /></colgroup>
        <tbody>
          {depts.map((d, i) => (
            <tr key={i}>
              <td style={{ ...L, textAlign: "center" }}>{i + 1}.</td>
              <td style={C}><CI value={d.name} onChange={(v) => setDept(i, "name", v)} readOnly={ro} /></td>
              <td style={L}>Dates</td>
              <td style={C}><CI value={d.dates} onChange={(v) => setDept(i, "dates", v)} readOnly={ro} /></td>
            </tr>
          ))}
        </tbody>
      </table>

      <div style={{ textAlign: "center", marginTop: 16, fontSize: 13 }}>1</div>
    </div>
  );

  /* SHEET 2 */
  const page2 = (
    <div style={PAPER}>
      <SH letter="F">HAVE YOU GONE THROUGH NEW CONVERTS CLASSES IN ROSE OF SHARON?</SH>
      <YesNo value={f.newConvert} onChange={set("newConvert")} readOnly={ro} />
      <DL value={f.newConvertNote} onChange={set("newConvertNote")} readOnly={ro} />
      <div style={{ height: 24 }} />

      <SH letter="G">ARE YOU AFRAID OF WATER?</SH>
      <YesNo value={f.afraid} onChange={set("afraid")} readOnly={ro} />
      <DL value={f.afraidNote} onChange={set("afraidNote")} readOnly={ro} />
      <div style={{ height: 24 }} />

      <SH letter="H">LIST REASONS WHY YOU WILL LIKE TO GO THROUGH THE WATER BAPTISM CLASSES.</SH>
      <table style={TB}>
        <colgroup><col style={{ width: "5%" }} /><col style={{ width: "95%" }} /></colgroup>
        <tbody>
          {(["reason1", "reason2", "reason3"] as const).map((k, i) => (
            <tr key={k}>
              <td style={{ ...L, textAlign: "center", height: 64 }}>{i + 1}.</td>
              <td style={{ ...C, height: 64 }}>{input(k)}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <SH letter="I">OTHER INFORMATION</SH>
      <DL value={f.otherInfo} onChange={set("otherInfo")} readOnly={ro} />
      <div style={{ height: 28 }} />

      <SH letter="J">&nbsp;</SH>
      <div style={{ display: "flex", gap: 30, alignItems: "flex-end", marginTop: 24 }}>
        <div style={{ flex: 1.7 }}>
          <input type="text" value={f.signature} readOnly={ro} onChange={ro ? undefined : (e) => set("signature")(e.target.value)}
            style={{ border: "none", borderBottom: "1px solid #000", outline: "none", background: "transparent", fontFamily: "cursive", fontSize: 16, width: "100%", padding: "2px 2px" }} />
          <div style={{ textAlign: "center", fontWeight: 700, fontSize: 13, marginTop: 6 }}>SIGNATURE</div>
        </div>
        <div style={{ flex: 1 }}>
          <input type={ro ? "text" : "date"} value={f.signDate} readOnly={ro} onChange={ro ? undefined : (e) => set("signDate")(e.target.value)}
            style={{ border: "none", borderBottom: "1px solid #000", outline: "none", background: "transparent", fontFamily: FONT, fontSize: 13, width: "100%", padding: "2px 2px" }} />
          <div style={{ textAlign: "center", fontWeight: 700, fontSize: 13, marginTop: 6 }}>DATE</div>
        </div>
      </div>

      <SH letter="K">OFFICIAL REMARKS</SH>
      <div title="For office use only" style={{ border: "1px solid #000", height: 130, background: "#fcfcfc" }} />
      <div style={{ fontWeight: 700, fontSize: 13, margin: "22px 0 12px" }}>APPROVED AS FOLLOWS:</div>
      <div style={{ display: "flex", alignItems: "flex-end", gap: 8, fontWeight: 700, fontSize: 13, marginBottom: 14 }}>
        <span style={{ whiteSpace: "nowrap" }}>TO ATTEND NEW CONVERT CLASS:</span>
        <div style={{ flex: 1, borderBottom: "1px dotted #000", height: 16 }} />
      </div>
      <div style={{ display: "flex", alignItems: "flex-end", gap: 8, fontWeight: 700, fontSize: 13 }}>
        <span style={{ whiteSpace: "nowrap" }}>ATTEND BAPTISM CLASS:</span>
        <div style={{ flex: 1, borderBottom: "1px dotted #000", height: 16 }} />
      </div>

      <div style={{ textAlign: "center", marginTop: 40, fontSize: 13 }}>2</div>
    </div>
  );

  const pages = [page1, page2];
  const total = pages.length;

  const btn: React.CSSProperties = { display: "flex", alignItems: "center", gap: 6, padding: "7px 16px", borderRadius: 8, fontWeight: 600, cursor: "pointer", fontSize: 13 };

  return (
    <>
      <style>{`
        @media print {
          body * { visibility: hidden !important; }
          #wb-print-area, #wb-print-area * { visibility: visible !important; }
          #wb-print-area { position: absolute; left: 0; top: 0; width: 100%; zoom: 1 !important; }
          .wb-no-print { display: none !important; }
        }
      `}</style>

      <div className="wb-no-print" style={{ display: "flex", gap: 10, justifyContent: "center", alignItems: "center", padding: "14px 8px 8px", flexWrap: "wrap", background: "#f9fafb", borderBottom: "1px solid #e5e7eb", position: "sticky", top: 0, zIndex: 10 }}>
        <button onClick={() => router.push(resolveHref("/trainings/water-baptism"))} style={{ ...btn, border: "1px solid #d1d5db", background: "#fff", color: "#374151" }}>
          ← Back
        </button>
        <button onClick={() => window.print()} style={{ ...btn, border: "1px solid #000080", background: "#fff", color: "#000080" }}>
          <Printer size={14} /> Print Page {currentPage}
        </button>
        {mode === "fill" && (
          <button onClick={handleSubmit} disabled={submitting} style={{ ...btn, border: "none", background: submitting ? "#9ca3af" : "#DC2626", color: "#fff", fontWeight: 700, cursor: submitting ? "not-allowed" : "pointer" }}>
            {submitting ? "Submitting…" : <><Send size={14} /> Submit Application</>}
          </button>
        )}
      </div>

      {submitError && (
        <div className="wb-no-print" style={{ display: "flex", alignItems: "center", gap: 8, maxWidth: 794, margin: "6px auto", padding: "9px 14px", borderRadius: 8, border: "1px solid #fecaca", background: "#fef2f2", color: "#991b1b", fontSize: 13 }}>
          <XCircle size={16} style={{ flexShrink: 0 }} /> {submitError}
        </div>
      )}

      <div className="wb-no-print" style={{ textAlign: "center", padding: "10px 0 6px", fontSize: 13, color: "#6b7280" }}>
        Page {currentPage} of {total}
      </div>

      <div style={{ overflow: "hidden" }}>
        <div id="wb-print-area" style={{ padding: "0 0 24px", zoom: scale }}>
          {pages[currentPage - 1]}
        </div>
      </div>

      <div className="wb-no-print" style={{ display: "flex", justifyContent: "center", alignItems: "center", gap: 12, padding: "16px 8px 32px", flexWrap: "wrap" }}>
        <button
          onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
          disabled={currentPage === 1}
          style={{ ...btn, padding: "9px 22px", border: "1px solid #d1d5db", background: currentPage === 1 ? "#f9fafb" : "#fff", color: currentPage === 1 ? "#9ca3af" : "#374151", cursor: currentPage === 1 ? "not-allowed" : "pointer", fontSize: 14 }}
        >
          <ChevronLeft size={16} /> Previous
        </button>
        <div style={{ display: "flex", gap: 8 }}>
          {pages.map((_, i) => {
            const n = i + 1;
            return (
              <button key={n} onClick={() => setCurrentPage(n)}
                style={{ width: 32, height: 32, borderRadius: "50%", border: "2px solid", borderColor: n === currentPage ? "#DC2626" : "#d1d5db", background: n === currentPage ? "#DC2626" : "#fff", color: n === currentPage ? "#fff" : "#6b7280", fontWeight: 700, cursor: "pointer", fontSize: 13 }}>
                {n}
              </button>
            );
          })}
        </div>
        {currentPage < total ? (
          <button onClick={() => setCurrentPage((p) => Math.min(total, p + 1))}
            style={{ ...btn, padding: "9px 22px", border: "none", background: "#DC2626", color: "#fff", fontWeight: 700, fontSize: 14 }}>
            Next <ChevronRight size={16} />
          </button>
        ) : mode === "fill" ? (
          <button onClick={handleSubmit} disabled={submitting}
            style={{ ...btn, padding: "9px 24px", border: "none", background: submitting ? "#9ca3af" : "#16a34a", color: "#fff", fontWeight: 700, cursor: submitting ? "not-allowed" : "pointer", fontSize: 14 }}>
            {submitting ? "Submitting…" : <><Send size={16} /> Submit Application</>}
          </button>
        ) : null}
      </div>
    </>
  );
}
