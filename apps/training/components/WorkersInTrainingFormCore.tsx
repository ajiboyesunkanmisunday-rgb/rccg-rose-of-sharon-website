"use client";

import { useState, useRef } from "react";
import { useRouter } from "next/navigation";
import { Printer, Send, CheckCircle, XCircle, ChevronLeft, ChevronRight } from "lucide-react";
import { post, uploadProfilePicture } from "@ros/shared/api";
import { resolveHref } from "@ros/shared/sites";
import { usePaperScale } from "./usePaperScale";

/*
 * Workers in Training registration — the paper "Workers Registration Form" laid out as A4 sheets, the same way
 * the ROSMS web form and the RILA form are. Typed answers are sent to POST /workers-in-training.
 */

export type WitMode = "blank" | "fill";

const FONT = "Arial, Helvetica, sans-serif";

const PAPER: React.CSSProperties = {
  background: "#fff",
  width: 794,
  minHeight: 1123,
  margin: "0 auto",
  padding: "28px 44px 36px",
  boxShadow: "0 6px 32px rgba(0,0,0,0.22)",
  fontFamily: FONT,
  fontSize: 11,
  color: "#000",
  boxSizing: "border-box",
  position: "relative",
};

const TB: React.CSSProperties = { borderCollapse: "collapse", width: "100%", marginBottom: 10 };
const C: React.CSSProperties = { border: "1px solid #000", padding: "3px 6px", verticalAlign: "middle", fontSize: 11 };
const CH: React.CSSProperties = { ...C, fontWeight: 700, textAlign: "center" };
const LAB: React.CSSProperties = { ...C, fontWeight: 700, verticalAlign: "top" };

const GIFTS = [
  "Word of Wisdom", "Interpretation of Tongues", "Discerning of Spirits", "Practical Service",
  "Diverse Kinds of Tongues", "Leadership", "Working of Miracles", "Administration",
  "Faith", "Giving/Prophecy", "Teaching", "Healing",
  "Exhortation", "Word of Knowledge", "Helps",
];

const inputBase: React.CSSProperties = {
  border: "none", outline: "none", background: "transparent",
  fontFamily: FONT, fontSize: 11, color: "#000", width: "100%", padding: "1px 2px", resize: "none",
};

function Req() {
  return <span style={{ color: "#DC2626" }}> *</span>;
}

function Lab({ label, req, sub, width, colSpan, rowSpan }: { label: string; req?: boolean; sub?: string; width?: string | number; colSpan?: number; rowSpan?: number }) {
  return (
    <td style={{ ...LAB, width }} colSpan={colSpan} rowSpan={rowSpan}>
      {label}{req && <Req />}
      {sub && <div style={{ fontWeight: 400, fontSize: 10, color: "#6B7280" }}>{sub}</div>}
    </td>
  );
}

function Inp({ value, onChange, ro, colSpan, placeholder, multiline, rows = 2, type = "text", style }: {
  value: string; onChange: (v: string) => void; ro: boolean; colSpan?: number; placeholder?: string;
  multiline?: boolean; rows?: number; type?: string; style?: React.CSSProperties;
}) {
  return (
    <td style={C} colSpan={colSpan}>
      {multiline ? (
        <textarea value={value} readOnly={ro} rows={rows} onChange={ro ? undefined : (e) => onChange(e.target.value)}
          style={{ ...inputBase, ...style }} placeholder={ro ? undefined : placeholder} />
      ) : (
        <input type={type} value={value} readOnly={ro} onChange={ro ? undefined : (e) => onChange(e.target.value)}
          style={{ ...inputBase, ...style }} placeholder={ro ? undefined : placeholder} />
      )}
    </td>
  );
}

function Sel({ value, onChange, ro, options }: { value: string; onChange: (v: string) => void; ro: boolean; options: { v: string; l: string }[] }) {
  return (
    <td style={C}>
      <select value={value} disabled={ro} onChange={(e) => onChange(e.target.value)}
        style={{ ...inputBase, appearance: "none", cursor: ro ? "default" : "pointer" }}>
        <option value="">{ro ? "" : "Select"}</option>
        {options.map((o) => <option key={o.v} value={o.v}>{o.l}</option>)}
      </select>
    </td>
  );
}

function SH({ children }: { children: React.ReactNode }) {
  return <div style={{ fontWeight: 700, fontSize: 12, textTransform: "uppercase", marginTop: 14, marginBottom: 5 }}>{children}</div>;
}

function Note({ children }: { children: React.ReactNode }) {
  return <div style={{ fontSize: 11, margin: "8px 0 4px" }}>{children}</div>;
}

type Rows = Record<string, string>[];
const blankRows = (keys: string[], n: number): Rows => Array.from({ length: n }, () => Object.fromEntries(keys.map((k) => [k, ""])));

/** DD/MM/YYYY (or YYYY-MM-DD) to the YYYY-MM-DD the API wants; "" when it cannot be read. */
function toIsoDate(v: string): string {
  const t = v.trim();
  let m = t.match(/^(\d{1,2})[/.-](\d{1,2})[/.-](\d{4})$/);
  if (m) return `${m[3]}-${m[2].padStart(2, "0")}-${m[1].padStart(2, "0")}`;
  m = t.match(/^(\d{4})-(\d{2})-(\d{2})$/);
  return m ? t : "";
}

const initial = {
  surname: "", firstName: "", otherNames: "", sex: "", dob: "", marital: "", children: "", spouse: "", maiden: "",
  nokName: "", nokRel: "", nokPhone: "", nokAddress: "",
  street: "", city: "", state: "", country: "Nigeria", phone: "", fax: "", mobile: "",
  occupation: "", employer: "", officeAddress: "", officePhone: "", officeFax: "", email: "",
  salvDate: "", salvWhere: "", waterDate: "", waterChurch: "", hgDate: "", hgWhere: "",
  leaving: "", lifeCenter: "", ministry: "", why: "", signature: "", signDate: "",
};

export default function WorkersInTrainingFormCore({ mode = "fill" }: { mode?: WitMode }) {
  const ro = mode !== "fill";
  const router = useRouter();
  const photoRef = useRef<HTMLInputElement>(null);
  const scale = usePaperScale();
  const [currentPage, setCurrentPage] = useState(1);

  const [passportPreview, setPassportPreview] = useState("");
  const [passportFile, setPassportFile] = useState<File | null>(null);
  const [f, setF] = useState(initial);
  const u = (k: keyof typeof initial) => (v: string) => setF((p) => ({ ...p, [k]: v }));

  const QUAL_KEYS = ["institution", "date", "qualification"];
  const PLACE_KEYS = ["name", "address", "date"];
  const POS_KEYS = ["place", "position"];
  const [quals, setQuals] = useState<Rows>(blankRows(QUAL_KEYS, 4));
  const [places, setPlaces] = useState<Rows>(blankRows(PLACE_KEYS, 4));
  const [positions, setPositions] = useState<Rows>(blankRows(POS_KEYS, 4));
  const [groups, setGroups] = useState<string[]>(["", ""]);
  const [gifts, setGifts] = useState<string[]>([]);

  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const setRow = (rows: Rows, set: (r: Rows) => void, i: number, k: string) => (v: string) =>
    set(rows.map((r, idx) => (idx === i ? { ...r, [k]: v } : r)));

  const handlePhoto = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setPassportFile(file);
    const r = new FileReader();
    r.onloadend = () => setPassportPreview(r.result as string);
    r.readAsDataURL(file);
  };

  const handleSubmit = async () => {
    const need: [string, string, number][] = [
      [f.surname, "Surname", 1], [f.firstName, "First Name", 1], [f.sex, "Sex", 1], [f.dob, "Date of Birth", 1],
      [f.marital, "Marital Status", 1], [f.street, "Home Address", 1], [f.city, "City", 1], [f.state, "State", 1],
      [f.country, "Country", 1], [f.phone, "Phone", 1], [f.occupation, "Occupation", 1],
      [f.salvDate, "Date of Salvation", 2], [f.salvWhere, "Where (salvation)", 2],
      [f.waterDate, "Date of Water Baptism", 2], [f.waterChurch, "Church (water baptism)", 2],
      [f.hgDate, "Date of Baptism of the Holy Ghost", 2], [f.hgWhere, "Where (Holy Ghost baptism)", 2],
    ];
    const missing = need.filter(([v]) => !v.trim());
    if (missing.length) {
      setSubmitError(`Please fill in ${missing.slice(0, 4).map(([, l, p]) => `${l} (page ${p})`).join(", ")}${missing.length > 4 ? ` and ${missing.length - 4} more` : ""}.`);
      return;
    }
    const dobIso = toIsoDate(f.dob);
    if (!dobIso) {
      setSubmitError("Please write the Date of Birth as DD/MM/YYYY.");
      return;
    }
    setSubmitError("");
    setSubmitting(true);
    try {
      const profilePictureUrl = passportFile ? await uploadProfilePicture(passportFile) : undefined;

      const names = f.otherNames.trim();
      const qualificationRequests = quals
        .filter((q) => q.institution.trim() || q.qualification.trim())
        .map((q) => ({ institution: q.institution.trim() || undefined, date: q.date.trim() || undefined, qualificationReceived: q.qualification.trim() || undefined, isProfessional: false }));
      const createPastPlaceOfWorshipRequests = places
        .filter((p) => p.name.trim())
        .map((p) => ({ name: p.name.trim(), address: p.address.trim() || undefined, date: p.date.trim() || undefined }));
      const createPositionHeldRequests = positions
        .filter((p) => p.place.trim() || p.position.trim())
        .map((p) => ({ worshipPlace: p.place.trim() || undefined, positionHeld: p.position.trim() || undefined }));
      const nonRCCGChristianGroups = groups.map((g) => g.trim()).filter(Boolean);

      await post("/workers-in-training", {
        firstName: f.firstName.trim(),
        middleName: names || undefined,
        lastName: f.surname.trim(),
        maidenName: f.maiden.trim() || undefined,
        countryCode: "+234",
        phoneNumber: f.phone.trim(),
        otherPhoneNumber: f.mobile.trim() || undefined,
        email: f.email.trim() || undefined,
        profilePictureUrl,
        sex: f.sex,
        maritalStatus: f.marital || undefined,
        dateOfBirth: dobIso,
        noOfChildren: f.children ? parseInt(f.children, 10) : undefined,
        spouseName: f.spouse.trim() || undefined,
        street: f.street.trim(),
        city: f.city.trim(),
        state: f.state.trim(),
        country: f.country.trim(),
        nextOfKinName: f.nokName.trim() || undefined,
        nextOfKinRelationship: f.nokRel.trim() || undefined,
        nextOfKinPhoneNumber: f.nokPhone.trim() || undefined,
        nextOfKinFullAddress: f.nokAddress.trim() || undefined,
        occupation: f.occupation.trim(),
        employer: f.employer.trim() || undefined,
        officeFullAddress: f.officeAddress.trim() || undefined,
        officePhoneNumber: f.officePhone.trim() || undefined,
        salvationDate: f.salvDate.trim(),
        salvationLocation: f.salvWhere.trim(),
        waterBaptismDate: f.waterDate.trim(),
        waterBaptismLocation: f.waterChurch.trim(),
        holySpiritBaptismDate: f.hgDate.trim(),
        holySpiritBaptismLocation: f.hgWhere.trim(),
        reasonForLeavingPastChurch: f.leaving.trim() || undefined,
        lifeCenterAttended: f.lifeCenter.trim() || undefined,
        nonRCCGChristianGroups: nonRCCGChristianGroups.length ? nonRCCGChristianGroups : undefined,
        yourMinistry: f.ministry.trim() || undefined,
        giftsManifesting: gifts.length ? gifts : undefined,
        reasonForApplying: f.why.trim() || undefined,
        qualificationRequests: qualificationRequests.length ? qualificationRequests : undefined,
        createPastPlaceOfWorshipRequests: createPastPlaceOfWorshipRequests.length ? createPastPlaceOfWorshipRequests : undefined,
        createPositionHeldRequests: createPositionHeldRequests.length ? createPositionHeldRequests : undefined,
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
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", minHeight: "60vh", gap: 20, fontFamily: FONT, padding: "24px 16px" }}>
        <CheckCircle size={56} color="#16A34A" />
        <h2 style={{ fontSize: 22, fontWeight: 700, color: "#111", textAlign: "center" }}>Application Submitted</h2>
        <p style={{ color: "#555", textAlign: "center", maxWidth: 460, fontSize: 14, margin: 0 }}>
          Your Workers in Training registration has been received. Our team will contact you with the next steps.
        </p>
        <button onClick={() => router.push(resolveHref("/trainings/workers-in-training"))}
          style={{ padding: "10px 24px", borderRadius: 8, background: "#DC2626", color: "#fff", fontWeight: 700, border: "none", cursor: "pointer", fontSize: 14, marginTop: 8 }}>
          Back to Workers in Training
        </button>
      </div>
    );
  }

  const dotLine: React.CSSProperties = { display: "block", borderBottom: "1px dotted #555", height: 22 };
  const rule: React.CSSProperties = { borderBottom: "1px solid #000", height: 34 };

  /* PAGE 1: A, B, C */
  const page1 = (
    <div style={PAPER}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
        <div style={{ width: 120, flexShrink: 0 }} />
        <div style={{ flex: 1, textAlign: "center" }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/ros-logo.png" alt="The Redeemed Christian Church of God" style={{ width: 66, height: 66, objectFit: "contain" }} />
          <div style={{ fontWeight: 700, fontSize: 15, marginTop: 8, letterSpacing: 0.3 }}>THE REDEEMED CHRISTIAN CHURCH OF GOD</div>
          <div style={{ fontWeight: 700, fontSize: 12, marginTop: 6 }}>ROSE OF SHARON PARISH</div>
          <div style={{ fontWeight: 700, fontSize: 14, marginTop: 6, textDecoration: "underline" }}>WORKERS REGISTRATION FORM</div>
        </div>
        <div
          onClick={() => !ro && photoRef.current?.click()}
          style={{ width: 120, height: 132, border: "1px solid #000", flexShrink: 0, display: "flex", alignItems: "center", justifyContent: "center", cursor: ro ? "default" : "pointer", overflow: "hidden" }}
        >
          {passportPreview ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={passportPreview} alt="Passport photograph" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
          ) : (
            <div style={{ textAlign: "center", fontSize: 10, color: "#555", padding: 6, lineHeight: 1.6 }}>Passport<br />photograph{!ro && <><br /><span style={{ fontSize: 9, color: "#9CA3AF" }}>(click to add)</span></>}</div>
          )}
          {!ro && <input ref={photoRef} type="file" accept="image/*" style={{ display: "none" }} onChange={handlePhoto} />}
        </div>
      </div>

      <SH>A.&nbsp;&nbsp;Biographical Data</SH>
      <table style={TB}>
        <tbody>
          <tr>
            <Lab label="Surname" req width="21%" /><Inp value={f.surname} onChange={u("surname")} ro={ro} />
            <Lab label="First Name" req width="19%" /><Inp value={f.firstName} onChange={u("firstName")} ro={ro} />
          </tr>
          <tr>
            <Lab label="Other Names" /><Inp value={f.otherNames} onChange={u("otherNames")} ro={ro} />
            <Lab label="Sex" req /><Sel value={f.sex} onChange={u("sex")} ro={ro} options={[{ v: "MALE", l: "Male" }, { v: "FEMALE", l: "Female" }]} />
          </tr>
          <tr>
            <Lab label="Date of Birth" req sub="DD/MM/YYYY" /><Inp value={f.dob} onChange={u("dob")} ro={ro} placeholder="DD/MM/YYYY" />
            <Lab label="Marital Status" req /><Sel value={f.marital} onChange={u("marital")} ro={ro} options={[{ v: "SINGLE", l: "Single" }, { v: "MARRIED", l: "Married" }, { v: "DIVORCED", l: "Divorced" }, { v: "WIDOWED", l: "Widowed" }]} />
          </tr>
          <tr>
            <Lab label="No. Of Children" /><Inp value={f.children} onChange={u("children")} ro={ro} type="number" />
            <Lab label="Name of Spouse:" sub="(if ever Married)" /><Inp value={f.spouse} onChange={u("spouse")} ro={ro} />
          </tr>
          <tr>
            <Lab label="Maiden Name:" sub="(for Married Female)" /><Inp value={f.maiden} onChange={u("maiden")} ro={ro} colSpan={3} />
          </tr>
          <tr>
            <Lab label="Adult Next of Kin (excl. Spouse)" /><Inp value={f.nokName} onChange={u("nokName")} ro={ro} colSpan={3} />
          </tr>
          <tr>
            <Lab label="Relationship:" /><Inp value={f.nokRel} onChange={u("nokRel")} ro={ro} />
            <Lab label="Contact Phone Number:" /><Inp value={f.nokPhone} onChange={u("nokPhone")} ro={ro} />
          </tr>
          <tr>
            <Lab label="Contact address:" /><Inp value={f.nokAddress} onChange={u("nokAddress")} ro={ro} colSpan={3} />
          </tr>
        </tbody>
      </table>

      <SH>B.&nbsp;&nbsp;Addresses</SH>
      <table style={TB}>
        <tbody>
          <tr>
            <Lab label="Home Address" req width="16%" /><Inp value={f.street} onChange={u("street")} ro={ro} colSpan={5} />
          </tr>
          <tr>
            <Lab label="City" req /><Inp value={f.city} onChange={u("city")} ro={ro} />
            <Lab label="State" req width="9%" /><Inp value={f.state} onChange={u("state")} ro={ro} />
            <Lab label="Country" req width="11%" /><Inp value={f.country} onChange={u("country")} ro={ro} />
          </tr>
          <tr>
            <Lab label="Phone" req /><Inp value={f.phone} onChange={u("phone")} ro={ro} type="tel" />
            <Lab label="Fax" /><Inp value={f.fax} onChange={u("fax")} ro={ro} />
            <Lab label="Mobile" /><Inp value={f.mobile} onChange={u("mobile")} ro={ro} type="tel" />
          </tr>
          <tr>
            <Lab label="Occupation" req /><Inp value={f.occupation} onChange={u("occupation")} ro={ro} colSpan={5} />
          </tr>
          <tr>
            <Lab label="Employer" /><Inp value={f.employer} onChange={u("employer")} ro={ro} colSpan={5} />
          </tr>
          <tr>
            <Lab label="Office Address" /><Inp value={f.officeAddress} onChange={u("officeAddress")} ro={ro} colSpan={5} />
          </tr>
          <tr>
            <Lab label="Phone (Office)" /><Inp value={f.officePhone} onChange={u("officePhone")} ro={ro} colSpan={3} type="tel" />
            <Lab label="Fax" /><Inp value={f.officeFax} onChange={u("officeFax")} ro={ro} />
          </tr>
          <tr>
            <Lab label="E-mail" /><Inp value={f.email} onChange={u("email")} ro={ro} colSpan={5} type="email" />
          </tr>
        </tbody>
      </table>

      <SH>C.&nbsp;&nbsp;Education and Professional Qualifications</SH>
      <table style={TB}>
        <thead>
          <tr>
            <th style={{ ...CH, width: "46%" }}>Institution:</th>
            <th style={{ ...CH, width: "14%" }}>Dates:</th>
            <th style={CH}>Qualification Received:</th>
          </tr>
        </thead>
        <tbody>
          {quals.map((q, i) => (
            <tr key={i} style={{ height: 52 }}>
              <td style={{ ...C, verticalAlign: "top" }}><b>{i + 1}.</b> <input value={q.institution} readOnly={ro} onChange={(e) => setRow(quals, setQuals, i, "institution")(e.target.value)} style={{ ...inputBase, width: "92%" }} /></td>
              <Inp value={q.date} onChange={setRow(quals, setQuals, i, "date")} ro={ro} multiline rows={2} />
              <Inp value={q.qualification} onChange={setRow(quals, setQuals, i, "qualification")} ro={ro} multiline rows={2} />
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );

  /* PAGE 2: D */
  const page2 = (
    <div style={PAPER}>
      <SH>D.&nbsp;&nbsp;Christian History</SH>
      <table style={TB}>
        <tbody>
          <tr style={{ height: 58 }}>
            <Lab label="Date of Salvation" req sub="e.g. March 2005" width="17%" /><Inp value={f.salvDate} onChange={u("salvDate")} ro={ro} />
            <Lab label="Where" req width="10%" /><Inp value={f.salvWhere} onChange={u("salvWhere")} ro={ro} />
          </tr>
          <tr style={{ height: 70 }}>
            <Lab label="Date of Water Baptism by Immersion" req sub="e.g. June 2006" /><Inp value={f.waterDate} onChange={u("waterDate")} ro={ro} />
            <Lab label="Church" req /><Inp value={f.waterChurch} onChange={u("waterChurch")} ro={ro} />
          </tr>
          <tr style={{ height: 84 }}>
            <Lab label="Date of Baptism of the Holy Ghost" req sub="(with evidence of speaking in tongues) e.g. December 2006" /><Inp value={f.hgDate} onChange={u("hgDate")} ro={ro} />
            <Lab label="Where" req /><Inp value={f.hgWhere} onChange={u("hgWhere")} ro={ro} />
          </tr>
        </tbody>
      </table>

      <Note>List your place(s) of worship in the last five years</Note>
      <table style={TB}>
        <thead>
          <tr>
            <th style={{ ...CH, width: "44%" }}>Name:</th>
            <th style={{ ...CH, width: "40%" }}>Address:</th>
            <th style={CH}>Dates:</th>
          </tr>
        </thead>
        <tbody>
          {places.map((p, i) => (
            <tr key={i} style={{ height: 46 }}>
              <td style={{ ...C, verticalAlign: "top" }}><b>{i + 1}.</b> <input value={p.name} readOnly={ro} onChange={(e) => setRow(places, setPlaces, i, "name")(e.target.value)} style={{ ...inputBase, width: "90%" }} /></td>
              <Inp value={p.address} onChange={setRow(places, setPlaces, i, "address")} ro={ro} multiline rows={2} />
              <Inp value={p.date} onChange={setRow(places, setPlaces, i, "date")} ro={ro} multiline rows={2} />
            </tr>
          ))}
        </tbody>
      </table>

      <Note>What positions/department did you hold/belong to in the above listed place(s)</Note>
      <table style={TB}>
        <thead>
          <tr>
            <th style={{ ...C, width: 28, textAlign: "left" }}>#</th>
            <th style={{ ...C, width: "52%", textAlign: "left" }}>Church / Place of Worship</th>
            <th style={{ ...C, textAlign: "left" }}>Position Held</th>
          </tr>
        </thead>
        <tbody>
          {positions.map((p, i) => (
            <tr key={i} style={{ height: 30 }}>
              <td style={{ ...C, fontWeight: 700 }}>{i + 1}.</td>
              <Inp value={p.place} onChange={setRow(positions, setPositions, i, "place")} ro={ro} />
              <Inp value={p.position} onChange={setRow(positions, setPositions, i, "position")} ro={ro} />
            </tr>
          ))}
        </tbody>
      </table>

      <Note>Reasons for leaving your last church</Note>
      <table style={TB}>
        <tbody>
          <tr><Inp value={f.leaving} onChange={u("leaving")} ro={ro} multiline rows={6} /></tr>
        </tbody>
      </table>
    </div>
  );

  /* PAGE 3: E, F, G, H */
  const page3 = (
    <div style={PAPER}>
      <SH>E.&nbsp;&nbsp;Which Life Center do you attend?</SH>
      <input value={f.lifeCenter} readOnly={ro} onChange={(e) => u("lifeCenter")(e.target.value)} style={{ ...inputBase, borderBottom: "1px dotted #555", height: 26, marginBottom: 6 }} />

      <SH>F.&nbsp;&nbsp;Which Christian groups/associations do you belong to outside RCCG?</SH>
      <table style={TB}>
        <tbody>
          {groups.map((g, i) => (
            <tr key={i} style={{ height: 40 }}>
              <td style={{ ...C, verticalAlign: "top" }}><b>{i + 1}.</b> <input value={g} readOnly={ro} onChange={(e) => setGroups(groups.map((x, idx) => (idx === i ? e.target.value : x)))} style={{ ...inputBase, width: "94%" }} /></td>
            </tr>
          ))}
        </tbody>
      </table>

      <SH>G.&nbsp;&nbsp;Which ministry do you believe you are called to?</SH>
      <input value={f.ministry} readOnly={ro} onChange={(e) => u("ministry")(e.target.value)} style={{ ...inputBase, borderBottom: "1px dotted #555", height: 26, marginBottom: 6 }} />

      <SH>H.&nbsp;&nbsp;Which of these gifts do you manifest? Rom 12:6-8, 1 Cor 12:4-10&amp;28.</SH>
      <div style={{ fontSize: 11, marginBottom: 8 }}>Tick as applicable.</div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "9px 6px" }}>
        {GIFTS.map((g) => (
          <label key={g} style={{ display: "flex", alignItems: "center", gap: 5, fontSize: 11, cursor: ro ? "default" : "pointer" }}>
            <input type="checkbox" checked={gifts.includes(g)} disabled={ro}
              onChange={() => setGifts((cur) => (cur.includes(g) ? cur.filter((x) => x !== g) : [...cur, g]))}
              style={{ width: 12, height: 12, flexShrink: 0 }} />
            *{g}
          </label>
        ))}
      </div>
    </div>
  );

  /* PAGE 4: I, J */
  const page4 = (
    <div style={PAPER}>
      <SH>I.&nbsp;&nbsp;Why do you want to be a worker?</SH>
      <table style={TB}>
        <tbody>
          <tr><Inp value={f.why} onChange={u("why")} ro={ro} multiline rows={8} /></tr>
        </tbody>
      </table>

      <div style={{ display: "flex", gap: 40, marginTop: 34 }}>
        <div style={{ flex: 1 }}>
          <input value={f.signature} readOnly={ro} onChange={(e) => u("signature")(e.target.value)} style={{ ...inputBase, borderBottom: "1px solid #000", height: 26 }} />
          <div style={{ textAlign: "center", fontSize: 12, marginTop: 6 }}>Signature</div>
        </div>
        <div style={{ flex: 1 }}>
          <input value={f.signDate} readOnly={ro} onChange={(e) => u("signDate")(e.target.value)} placeholder={ro ? undefined : "DD/MM/YYYY"} style={{ ...inputBase, borderBottom: "1px solid #000", height: 26 }} />
          <div style={{ textAlign: "center", fontSize: 12, marginTop: 6 }}>Date</div>
        </div>
      </div>

      <SH>J.&nbsp;&nbsp;Official Remarks</SH>
      <div style={{ marginTop: 6 }}>
        {[0, 1, 2, 3, 4].map((i) => <div key={i} style={rule} />)}
      </div>
      <div style={{ textAlign: "center", fontWeight: 700, textDecoration: "underline", fontSize: 12, marginTop: 36 }}>NB: EVERY ITEM MUST BE FILLED.</div>
      <span style={dotLine} />
    </div>
  );

  const pages = [page1, page2, page3, page4];

  return (
    <>
      <style>{`
        @media print {
          body * { visibility: hidden !important; }
          #wit-print-area, #wit-print-area * { visibility: visible !important; }
          #wit-print-area { position: absolute; left: 0; top: 0; width: 100%; zoom: 1 !important; }
          .wit-no-print { display: none !important; }
        }
      `}</style>

      <div className="wit-no-print" style={{ display: "flex", gap: 10, justifyContent: "center", alignItems: "center", padding: "14px 8px 8px", flexWrap: "wrap", background: "#f9fafb", borderBottom: "1px solid #e5e7eb", position: "sticky", top: 0, zIndex: 10 }}>
        <button onClick={() => router.push(resolveHref("/trainings/workers-in-training"))}
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
        <div className="wit-no-print" style={{ display: "flex", alignItems: "center", gap: 8, maxWidth: 794, margin: "6px auto", padding: "9px 14px", borderRadius: 8, border: "1px solid #fecaca", background: "#fef2f2", color: "#991b1b", fontSize: 13 }}>
          <XCircle size={16} style={{ flexShrink: 0 }} /> {submitError}
        </div>
      )}

      <div className="wit-no-print" style={{ textAlign: "center", padding: "10px 0 6px", fontSize: 13, color: "#6b7280", fontFamily: FONT }}>
        Page {currentPage} of 4
      </div>

      <div id="wit-print-area" style={{ padding: "0 0 24px", zoom: scale }}>
        {pages[currentPage - 1]}
      </div>

      <div className="wit-no-print" style={{ display: "flex", justifyContent: "center", alignItems: "center", gap: 12, padding: "16px 8px 32px", flexWrap: "wrap" }}>
        <button
          onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
          disabled={currentPage === 1}
          style={{ display: "flex", alignItems: "center", gap: 5, padding: "9px 22px", borderRadius: 8, border: "1px solid #d1d5db", background: currentPage === 1 ? "#f9fafb" : "#fff", color: currentPage === 1 ? "#9ca3af" : "#374151", fontWeight: 600, cursor: currentPage === 1 ? "not-allowed" : "pointer", fontSize: 14 }}
        >
          <ChevronLeft size={16} /> Previous
        </button>

        <div style={{ display: "flex", gap: 8 }}>
          {[1, 2, 3, 4].map((n) => (
            <button key={n} onClick={() => setCurrentPage(n)}
              style={{ width: 32, height: 32, borderRadius: "50%", border: "2px solid", borderColor: n === currentPage ? "#DC2626" : "#d1d5db", background: n === currentPage ? "#DC2626" : "#fff", color: n === currentPage ? "#fff" : "#6b7280", fontWeight: 700, cursor: "pointer", fontSize: 13 }}>
              {n}
            </button>
          ))}
        </div>

        {currentPage < 4 ? (
          <button onClick={() => setCurrentPage((p) => Math.min(4, p + 1))}
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
