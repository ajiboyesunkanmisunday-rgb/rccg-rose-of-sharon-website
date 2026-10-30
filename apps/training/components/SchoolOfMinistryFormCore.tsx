"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Printer, Send, CheckCircle, XCircle, ChevronLeft, ChevronRight } from "lucide-react";
import { post } from "@ros/shared/api";
import { resolveHref } from "@ros/shared/sites";
import { usePaperScale } from "./usePaperScale";

/* School of Ministry application: the same two-sheet paper form as the ROSMS admin web, filled in online. */

export type SomMode = "blank" | "fill";

const FONT = "'Times New Roman', Times, serif";

const PAPER: React.CSSProperties = {
  background: "#fff",
  width: 794,
  minHeight: 1123,
  margin: "0 auto",
  padding: "40px 44px 36px",
  boxShadow: "0 6px 32px rgba(0,0,0,0.22)",
  fontFamily: FONT,
  fontSize: 13,
  color: "#000",
  boxSizing: "border-box",
  position: "relative",
};

const TB: React.CSSProperties = { borderCollapse: "collapse", width: "100%", marginBottom: 14 };
const C: React.CSSProperties = { border: "1px solid #000", padding: "3px 8px", verticalAlign: "middle", fontSize: 13 };
const LBL: React.CSSProperties = { ...C, whiteSpace: "nowrap" };
const CH: React.CSSProperties = { ...C, fontWeight: 700, textAlign: "center" };
const NUM: React.CSSProperties = { ...C, fontWeight: 700, width: 38, textAlign: "center" };

const MONTHS = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
void MONTHS;

function CI({
  value, onChange, readOnly, placeholder, type = "text", required, style,
}: {
  value: string; onChange?: (v: string) => void; readOnly?: boolean; placeholder?: string;
  type?: string; required?: boolean; style?: React.CSSProperties;
}) {
  return (
    <input
      type={type} value={value} readOnly={readOnly} required={required}
      onChange={readOnly ? undefined : (e) => onChange?.(e.target.value)}
      placeholder={readOnly ? undefined : placeholder}
      style={{ border: "none", outline: "none", background: "transparent", fontFamily: FONT, fontSize: 13, color: "#000", width: "100%", padding: "2px 2px", ...style }}
    />
  );
}

function CS({
  value, onChange, readOnly, options, placeholder,
}: {
  value: string; onChange?: (v: string) => void; readOnly?: boolean;
  options: { v: string; l: string }[]; placeholder: string;
}) {
  return (
    <select
      value={value} disabled={readOnly}
      onChange={(e) => onChange?.(e.target.value)}
      style={{ border: "none", outline: "none", background: "transparent", fontFamily: FONT, fontSize: 13, color: value ? "#000" : "#6b7280", width: "100%", padding: "2px 0", appearance: "none", cursor: readOnly ? "default" : "pointer" }}
    >
      <option value="">{placeholder}</option>
      {options.map((o) => <option key={o.v} value={o.v}>{o.l}</option>)}
    </select>
  );
}

function Req() {
  return <span style={{ color: "#dc2626", marginLeft: 2 }}>*</span>;
}

function SH({ letter, children }: { letter: string; children?: React.ReactNode }) {
  return (
    <div style={{ display: "flex", fontWeight: 700, fontSize: 14, textTransform: "uppercase", margin: "20px 0 8px" }}>
      <span style={{ width: 60 }}>{letter}:</span>
      <span>{children}</span>
    </div>
  );
}

function Title() {
  return (
    <div style={{ textAlign: "center", marginBottom: 14 }}>
      <div style={{ fontWeight: 700, fontSize: 16, textTransform: "uppercase", marginBottom: 4 }}>The Redeemed Christian Church of God</div>
      <div style={{ fontFamily: "'Brush Script MT', 'Segoe Script', cursive", fontStyle: "italic", fontWeight: 700, fontSize: 26, margin: "2px 0 6px" }}>Rose of Sharon Parish</div>
      <div style={{ fontWeight: 700, fontSize: 16, textTransform: "uppercase", marginBottom: 6 }}>School of Ministry Programme</div>
      <div style={{ fontStyle: "italic", fontSize: 13 }}>(Please answer every question)</div>
    </div>
  );
}

const SEX = [{ v: "MALE", l: "Male" }, { v: "FEMALE", l: "Female" }];
const MARITAL = [
  { v: "SINGLE", l: "Single" }, { v: "MARRIED", l: "Married" }, { v: "SEPARATED", l: "Separated" },
  { v: "DIVORCED", l: "Divorced" }, { v: "WIDOWED", l: "Widowed" },
];
const YESNO = [{ v: "yes", l: "Yes" }, { v: "no", l: "No" }];

type School = { school: string; dates: string; qualification: string };
type Dept = { name: string; date: string };

export default function SchoolOfMinistryFormCore({ mode = "fill" }: { mode?: SomMode }) {
  const ro = mode !== "fill";
  const router = useRouter();
  const zoom = usePaperScale();
  const [currentPage, setCurrentPage] = useState(1);

  const [surname, setSurname] = useState("");
  const [firstName, setFirstName] = useState("");
  const [otherNames, setOtherNames] = useState("");
  const [sex, setSex] = useState("");
  const [dob, setDob] = useState("");
  const [marital, setMarital] = useState("");
  const [children, setChildren] = useState("");
  const [spouse, setSpouse] = useState("");

  const [street, setStreet] = useState("");
  const [countryCode, setCountryCode] = useState("234");
  const [phone, setPhone] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [country, setCountry] = useState("Nigeria");
  const [occupation, setOccupation] = useState("");
  const [placeOfWork, setPlaceOfWork] = useState("");
  const [officePhone, setOfficePhone] = useState("");
  const [officeAddress, setOfficeAddress] = useState("");

  const [schools, setSchools] = useState<School[]>(Array.from({ length: 4 }, () => ({ school: "", dates: "", qualification: "" })));
  const [worship, setWorship] = useState(["", ""]);
  const [salvDate, setSalvDate] = useState("");
  const [salvWhere, setSalvWhere] = useState("");
  const [waterDate, setWaterDate] = useState("");
  const [waterChurch, setWaterChurch] = useState("");
  const [spiritDate, setSpiritDate] = useState("");
  const [spiritChurch, setSpiritChurch] = useState("");

  const [depts, setDepts] = useState<Dept[]>(Array.from({ length: 3 }, () => ({ name: "", date: "" })));
  const [newConverts, setNewConverts] = useState("");
  const [waterClass, setWaterClass] = useState("");
  const [reasons, setReasons] = useState(["", "", "", "", ""]);
  const [other, setOther] = useState(["", "", ""]);
  const [signature, setSignature] = useState("");
  const [signDate, setSignDate] = useState("");

  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const setAt = <T,>(list: T[], setList: (l: T[]) => void, i: number, patch: Partial<T> | T) =>
    setList(list.map((x, idx) => (idx === i ? (typeof x === "object" ? { ...x, ...(patch as object) } : (patch as T)) : x)));

  const handleSubmit = async () => {
    const missing: string[] = [];
    if (!surname.trim()) missing.push("Surname");
    if (!firstName.trim()) missing.push("First name");
    if (!phone.trim()) missing.push("Phone no.");
    if (!city.trim()) missing.push("City");
    if (!state.trim()) missing.push("State");
    if (!signature.trim()) missing.push("Signature (type your full name)");
    if (missing.length) {
      setSubmitError(`Please fill in: ${missing.join(", ")}.`);
      return;
    }
    setSubmitError("");
    setSubmitting(true);
    try {
      const otherLines = other.map((x) => x.trim()).filter(Boolean);
      if (waterClass) otherLines.push(`Gone through the water baptismal class: ${waterClass === "yes" ? "Yes" : "No"}`);
      await post("/school-of-ministries", {
        firstName: firstName.trim(),
        middleName: otherNames.trim() || undefined,
        lastName: surname.trim(),
        countryCode: countryCode.replace(/^\+/, "") || "234",
        phoneNumber: phone.trim(),
        sex: sex || undefined,
        maritalStatus: marital || undefined,
        dateOfBirth: dob || undefined,
        noOfChildren: children ? parseInt(children, 10) : undefined,
        spouseName: spouse.trim() || undefined,
        street: street.trim() || undefined,
        city: city.trim(),
        state: state.trim(),
        country: country.trim() || undefined,
        occupation: occupation.trim() || undefined,
        placeOfWork: placeOfWork.trim() || undefined,
        officePhoneNumber: officePhone.trim() || undefined,
        officeFullAddress: officeAddress.trim() || undefined,
        salvationDate: salvDate.trim() || undefined,
        salvationLocation: salvWhere.trim() || undefined,
        waterBaptismDate: waterDate.trim() || undefined,
        waterBaptismLocation: waterChurch.trim() || undefined,
        holySpiritBaptismDate: spiritDate.trim() || undefined,
        holySpiritBaptismLocation: spiritChurch.trim() || undefined,
        goneThroughNewConverts: newConverts === "yes",
        reasonsForApplying: reasons.map((x) => x.trim()).filter(Boolean),
        otherInformation: otherLines.length ? otherLines.join("\n") : undefined,
        qualificationRequests: schools
          .filter((s) => s.school.trim() || s.dates.trim() || s.qualification.trim())
          .map((s) => ({ institution: s.school.trim() || undefined, date: s.dates.trim() || undefined, qualificationReceived: s.qualification.trim() || undefined })),
        createPastPlaceOfWorshipRequests: worship.map((x) => x.trim()).filter(Boolean).map((name) => ({ name })),
        createStudentDepartmentRequests: depts
          .filter((d) => d.name.trim() || d.date.trim())
          .map((d) => ({ name: d.name.trim() || undefined, date: d.date.trim() || undefined })),
        consent: true,
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
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", minHeight: "60vh", gap: 20, fontFamily: "Arial, Helvetica, sans-serif", padding: "24px 16px" }}>
        <CheckCircle size={56} color="#16A34A" />
        <h2 style={{ fontSize: 22, fontWeight: 700, color: "#111", textAlign: "center" }}>Application Submitted</h2>
        <p style={{ color: "#555", textAlign: "center", maxWidth: 460, fontSize: 14, margin: 0 }}>
          Your School of Ministry application has been received. Our team will be in touch.
        </p>
        <button
          onClick={() => router.push(resolveHref("/trainings/school-of-ministry"))}
          style={{ padding: "9px 22px", borderRadius: 8, border: "none", background: "#DC2626", color: "#fff", fontWeight: 700, cursor: "pointer", fontSize: 14 }}
        >
          Back to School of Ministry
        </button>
      </div>
    );
  }

  const pageNo = (n: number) => <div style={{ textAlign: "center", marginTop: 18, fontSize: 13 }}>{n}</div>;

  const page1 = (
    <div id="som-sheet-1" className="som-paper" style={PAPER}>
      <Title />
      <SH letter="A">Biographical Data</SH>
      <table style={TB}>
        <tbody>
          <tr>
            <td style={{ ...LBL, width: 130 }}>Surname:<Req /></td>
            <td style={{ ...C, width: 150 }}><CI value={surname} onChange={setSurname} readOnly={ro} /></td>
            <td style={{ ...LBL, width: 150 }}>First name:<Req /></td>
            <td style={C}><CI value={firstName} onChange={setFirstName} readOnly={ro} /></td>
          </tr>
          <tr>
            <td style={LBL}>Other Names:</td>
            <td style={C}><CI value={otherNames} onChange={setOtherNames} readOnly={ro} /></td>
            <td style={LBL}>Sex:</td>
            <td style={C}><CS value={sex} onChange={setSex} readOnly={ro} options={SEX} placeholder="Male / Female" /></td>
          </tr>
          <tr>
            <td style={LBL}>Date of Birth:</td>
            <td style={C}><CI type="date" value={dob} onChange={setDob} readOnly={ro} /></td>
            <td style={LBL}>Marital Status:</td>
            <td style={C}><CS value={marital} onChange={setMarital} readOnly={ro} options={MARITAL} placeholder="Single / Married…" /></td>
          </tr>
          <tr>
            <td style={{ ...LBL, height: 44 }}>No. of Children:</td>
            <td style={C}><CI type="number" value={children} onChange={setChildren} readOnly={ro} /></td>
            <td style={C} colSpan={2}>
              <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                <span style={{ whiteSpace: "nowrap" }}>Name of Spouse:</span>
                <CI value={spouse} onChange={setSpouse} readOnly={ro} />
              </div>
            </td>
          </tr>
        </tbody>
      </table>

      <SH letter="B">Address</SH>
      <table style={TB}>
        <tbody>
          <tr>
            <td style={{ ...LBL, width: 130 }}>Home Address:</td>
            <td style={C}><CI value={street} onChange={setStreet} readOnly={ro} placeholder="Street" /></td>
            <td style={{ ...LBL, width: 110 }}>Phone no.:<Req /></td>
            <td style={{ ...C, width: 230 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 4 }}>
                <CI value={countryCode} onChange={setCountryCode} readOnly={ro} style={{ width: 44 }} />
                <span>-</span>
                <CI type="tel" value={phone} onChange={setPhone} readOnly={ro} placeholder="08012345678" />
              </div>
            </td>
          </tr>
          <tr>
            <td style={LBL}>City:<Req /></td>
            <td style={C}><CI value={city} onChange={setCity} readOnly={ro} placeholder="City" /></td>
            <td style={LBL}>State:<Req /></td>
            <td style={C}><CI value={state} onChange={setState} readOnly={ro} placeholder="State" /></td>
          </tr>
          <tr>
            <td style={LBL}>Country:</td>
            <td style={C} colSpan={3}><CI value={country} onChange={setCountry} readOnly={ro} placeholder="Country" /></td>
          </tr>
          <tr>
            <td style={LBL}>Occupation:</td>
            <td style={C} colSpan={3}><CI value={occupation} onChange={setOccupation} readOnly={ro} /></td>
          </tr>
          <tr>
            <td style={LBL}>Place of Work:</td>
            <td style={C}><CI value={placeOfWork} onChange={setPlaceOfWork} readOnly={ro} /></td>
            <td style={LBL}>Phone no.:</td>
            <td style={C}><CI type="tel" value={officePhone} onChange={setOfficePhone} readOnly={ro} /></td>
          </tr>
          <tr>
            <td style={LBL}>Office Address:</td>
            <td style={C} colSpan={3}><CI value={officeAddress} onChange={setOfficeAddress} readOnly={ro} /></td>
          </tr>
        </tbody>
      </table>

      <SH letter="C">Educational &amp; Professional Qualification/Schools</SH>
      <table style={TB}>
        <thead>
          <tr>
            <th style={{ ...CH, width: "42%" }}>Schools Attended</th>
            <th style={{ ...CH, width: "18%" }}>Dates</th>
            <th style={CH}>Qualification Received</th>
          </tr>
        </thead>
        <tbody>
          {schools.map((s, i) => (
            <tr key={i}>
              <td style={C}><CI value={s.school} onChange={(v) => setAt(schools, setSchools, i, { school: v })} readOnly={ro} /></td>
              <td style={C}><CI value={s.dates} onChange={(v) => setAt(schools, setSchools, i, { dates: v })} readOnly={ro} /></td>
              <td style={C}><CI value={s.qualification} onChange={(v) => setAt(schools, setSchools, i, { qualification: v })} readOnly={ro} /></td>
            </tr>
          ))}
        </tbody>
      </table>

      <SH letter="D">Christian History</SH>
      <div style={{ fontStyle: "italic", marginBottom: 8 }}>List your 2 most recent places of worship apart from Rose of Sharon Parish (including non-Christian)</div>
      <table style={TB}>
        <tbody>
          {worship.map((w, i) => (
            <tr key={i}>
              <td style={NUM}>{i + 1}.</td>
              <td style={C}><CI value={w} onChange={(v) => setAt(worship, setWorship, i, v)} readOnly={ro} /></td>
            </tr>
          ))}
        </tbody>
      </table>

      <table style={TB}>
        <tbody>
          <tr>
            <td style={{ ...C, fontWeight: 700, width: "42%" }}>Date of Salvation:</td>
            <td style={{ ...LBL, width: 120 }}>Where?</td>
            <td style={C}><CI value={salvWhere} onChange={setSalvWhere} readOnly={ro} /></td>
          </tr>
          <tr>
            <td style={C}><CI value={salvDate} onChange={setSalvDate} readOnly={ro} placeholder="e.g. 15 March 2010" /></td>
            <td style={C} colSpan={2} />
          </tr>
          <tr>
            <td style={C}>Date of water Baptism by immersion:</td>
            <td style={LBL}>Church?</td>
            <td style={C}><CI value={waterChurch} onChange={setWaterChurch} readOnly={ro} /></td>
          </tr>
          <tr>
            <td style={{ ...C, height: 34 }}><CI value={waterDate} onChange={setWaterDate} readOnly={ro} /></td>
            <td style={C} colSpan={2} />
          </tr>
          <tr>
            <td style={C}>Date of Baptism of the Holy Spirit<br />(with the evidence of speaking in tongues):</td>
            <td style={LBL}>Church?</td>
            <td style={C}><CI value={spiritChurch} onChange={setSpiritChurch} readOnly={ro} /></td>
          </tr>
          <tr>
            <td style={{ ...C, height: 34 }}><CI value={spiritDate} onChange={setSpiritDate} readOnly={ro} /></td>
            <td style={C} colSpan={2} />
          </tr>
        </tbody>
      </table>
      {pageNo(1)}
    </div>
  );

  const numberedRows = (list: string[], setList: (l: string[]) => void) => (
    <table style={TB}>
      <tbody>
        {list.map((v, i) => (
          <tr key={i}>
            <td style={NUM}>{i + 1}.</td>
            <td style={C}><CI value={v} onChange={(x) => setAt(list, setList, i, x)} readOnly={ro} /></td>
          </tr>
        ))}
      </tbody>
    </table>
  );

  const page2 = (
    <div id="som-sheet-2" className="som-paper som-page2" style={PAPER}>
      <SH letter="E">Do you belong to any department in the church? (If yes, please list)</SH>
      <table style={TB}>
        <tbody>
          {depts.map((d, i) => (
            <tr key={i}>
              <td style={NUM}>{i + 1}.</td>
              <td style={C}><CI value={d.name} onChange={(v) => setAt(depts, setDepts, i, { name: v })} readOnly={ro} placeholder="Department name" /></td>
              <td style={{ ...LBL, width: 58 }}>Date:</td>
              <td style={{ ...C, width: 180 }}><CI value={d.date} onChange={(v) => setAt(depts, setDepts, i, { date: v })} readOnly={ro} placeholder="e.g. Jan 2020" /></td>
            </tr>
          ))}
        </tbody>
      </table>

      <SH letter="F">Have you gone through New Converts' class?</SH>
      <table style={TB}>
        <tbody>
          <tr><td style={C}><CS value={newConverts} onChange={setNewConverts} readOnly={ro} options={YESNO} placeholder="Yes / No" /></td></tr>
          <tr><td style={{ ...C, height: 34 }} /></tr>
        </tbody>
      </table>

      <SH letter="G">Have you gone through the Water Baptismal class?</SH>
      <table style={TB}>
        <tbody>
          <tr><td style={C}><CS value={waterClass} onChange={setWaterClass} readOnly={ro} options={YESNO} placeholder="Yes / No" /></td></tr>
          <tr><td style={{ ...C, height: 34 }} /></tr>
        </tbody>
      </table>

      <SH letter="H">List reasons why you would like to go through the School of Ministry classes</SH>
      {numberedRows(reasons, setReasons)}

      <SH letter="I">Other Information</SH>
      {numberedRows(other, setOther)}

      <SH letter="J" />
      <table style={TB}>
        <tbody>
          <tr>
            <td style={{ ...C, width: "50%", padding: "8px 10px" }}>
              <div style={{ fontWeight: 700 }}>SIGNATURE: <span style={{ fontWeight: 400, fontSize: 9, color: "#9ca3af" }}>(type full name)</span></div>
              <CI value={signature} onChange={setSignature} readOnly={ro} placeholder="Type your full name" style={{ borderBottom: "1px solid #000", marginTop: 14, fontWeight: 700 }} />
            </td>
            <td style={{ ...C, padding: "8px 10px" }}>
              <div style={{ fontWeight: 700 }}>DATE: <span style={{ fontWeight: 400, fontSize: 9, color: "#9ca3af" }}>(DD/MM/YYYY)</span></div>
              <CI value={signDate} onChange={setSignDate} readOnly={ro} placeholder="DD/MM/YYYY" style={{ borderBottom: "1px solid #000", marginTop: 14, fontWeight: 700 }} />
            </td>
          </tr>
        </tbody>
      </table>

      <SH letter="K">Official Remarks</SH>
      <div style={{ border: "1px solid #d1d5db", borderRadius: 4, padding: "6px 10px", fontStyle: "italic", fontSize: 12, color: "#9ca3af", marginBottom: 10 }}>
        ℹ This section is for official use only and will be completed by church administrators after your application is reviewed.
      </div>
      <table style={TB}>
        <tbody>
          {[1, 2, 3].map((n) => (
            <tr key={n}><td style={NUM}>{n}.</td><td style={{ ...C, height: 30 }} /></tr>
          ))}
        </tbody>
      </table>
      <table style={TB}>
        <tbody>
          <tr>
            <td style={{ ...C, width: "50%", padding: "8px 10px", height: 70, verticalAlign: "top" }}><div style={{ fontWeight: 700 }}>SIGNATURE (Admin):</div></td>
            <td style={{ ...C, padding: "8px 10px", verticalAlign: "top" }}><div style={{ fontWeight: 700 }}>DATE:</div></td>
          </tr>
        </tbody>
      </table>
      {pageNo(2)}
    </div>
  );

  const pages = [page1, page2];
  const total = pages.length;

  return (
    <>
      <style>{`
        @media print {
          body * { visibility: hidden !important; }
          #som-print-area, #som-print-area * { visibility: visible !important; }
          #som-print-area { position: absolute; left: 0; top: 0; width: 100%; zoom: 1 !important; }
          .som-paper { box-shadow: none !important; }
          .som-no-print { display: none !important; }
        }
        #som-print-area select { background-image: none; }
      `}</style>

      <div className="som-no-print" style={{ display: "flex", gap: 10, justifyContent: "center", alignItems: "center", padding: "14px 8px 8px", flexWrap: "wrap", background: "#f9fafb", borderBottom: "1px solid #e5e7eb", position: "sticky", top: 0, zIndex: 10, fontFamily: "Arial, Helvetica, sans-serif" }}>
        <button onClick={() => router.push(resolveHref("/trainings/school-of-ministry"))}
          style={{ padding: "7px 16px", borderRadius: 8, border: "1px solid #d1d5db", background: "#fff", color: "#374151", fontWeight: 600, cursor: "pointer", fontSize: 13 }}>
          ← Back
        </button>
        <button onClick={() => window.print()}
          style={{ display: "flex", alignItems: "center", gap: 6, padding: "7px 16px", borderRadius: 8, border: "1px solid #000080", background: "#fff", color: "#000080", fontWeight: 600, cursor: "pointer", fontSize: 13 }}>
          <Printer size={14} /> Print Page {currentPage}
        </button>
        {mode === "fill" && (
          <button onClick={handleSubmit} disabled={submitting}
            style={{ display: "flex", alignItems: "center", gap: 6, padding: "7px 20px", borderRadius: 8, border: "none", background: submitting ? "#9ca3af" : "#DC2626", color: "#fff", fontWeight: 700, cursor: submitting ? "not-allowed" : "pointer", fontSize: 13 }}>
            {submitting ? "Submitting…" : <><Send size={14} /> Submit Application</>}
          </button>
        )}
      </div>

      {submitError && (
        <div className="som-no-print" style={{ display: "flex", alignItems: "center", gap: 8, maxWidth: 794, margin: "6px auto", padding: "9px 14px", borderRadius: 8, border: "1px solid #fecaca", background: "#fef2f2", color: "#991b1b", fontSize: 13, fontFamily: "Arial, Helvetica, sans-serif" }}>
          <XCircle size={16} /> {submitError}
        </div>
      )}

      <div className="som-no-print" style={{ textAlign: "center", padding: "10px 0 6px", fontSize: 13, color: "#6b7280", fontFamily: "Arial, Helvetica, sans-serif" }}>
        Page {currentPage} of {total}
      </div>

      <div id="som-print-area" style={{ padding: "0 0 24px", zoom }}>
        {pages[currentPage - 1]}
      </div>

      <div className="som-no-print" style={{ display: "flex", justifyContent: "center", alignItems: "center", gap: 12, padding: "16px 8px 32px", flexWrap: "wrap", fontFamily: "Arial, Helvetica, sans-serif" }}>
        <button
          onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
          disabled={currentPage === 1}
          style={{ display: "flex", alignItems: "center", gap: 5, padding: "9px 22px", borderRadius: 8, border: "1px solid #d1d5db", background: currentPage === 1 ? "#f9fafb" : "#fff", color: currentPage === 1 ? "#9ca3af" : "#374151", fontWeight: 600, cursor: currentPage === 1 ? "not-allowed" : "pointer", fontSize: 14 }}
        >
          <ChevronLeft size={16} /> Previous
        </button>
        <div style={{ display: "flex", gap: 8 }}>
          {pages.map((_, i) => (
            <button key={i} onClick={() => setCurrentPage(i + 1)}
              style={{ width: 32, height: 32, borderRadius: "50%", border: "2px solid", borderColor: i + 1 === currentPage ? "#DC2626" : "#d1d5db", background: i + 1 === currentPage ? "#DC2626" : "#fff", color: i + 1 === currentPage ? "#fff" : "#6b7280", fontWeight: 700, cursor: "pointer", fontSize: 13 }}>
              {i + 1}
            </button>
          ))}
        </div>
        {currentPage < total ? (
          <button onClick={() => setCurrentPage((p) => Math.min(total, p + 1))}
            style={{ display: "flex", alignItems: "center", gap: 5, padding: "9px 22px", borderRadius: 8, border: "none", background: "#DC2626", color: "#fff", fontWeight: 700, cursor: "pointer", fontSize: 14 }}>
            Next <ChevronRight size={16} />
          </button>
        ) : mode === "fill" ? (
          <button onClick={handleSubmit} disabled={submitting}
            style={{ display: "flex", alignItems: "center", gap: 6, padding: "9px 24px", borderRadius: 8, border: "none", background: submitting ? "#9ca3af" : "#16a34a", color: "#fff", fontWeight: 700, cursor: submitting ? "not-allowed" : "pointer", fontSize: 14 }}>
            {submitting ? "Submitting…" : <><Send size={16} /> Submit Application</>}
          </button>
        ) : null}
      </div>
    </>
  );
}
