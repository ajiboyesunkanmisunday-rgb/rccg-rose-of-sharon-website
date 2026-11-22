"use client";

import { useEffect, useState } from "react";
import { FormHero } from "@ros/shared/kit/ui";
import { FormField, FormCard, FormSheet, inputCls as baseInputCls, selectCls as baseSelectCls, submitCls } from "@ros/shared/kit/form";
import PhoneField, { normalisePhone } from "@ros/shared/kit/PhoneField";
import PhotoField from "@ros/shared/kit/PhotoField";
import { uploadProfilePicture } from "@ros/shared/api";

const MONTHS = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const MAX_PICTURE_BYTES = 15 * 1024 * 1024;
// 16px text in the fields so phones do not zoom in when one is tapped
const inputCls = baseInputCls.replace("ros:text-sm", "ros:text-base");
const selectCls = baseSelectCls.replace("ros:text-sm", "ros:text-base");

type Step = "find" | "photos" | "done";

/** A wide picture box for the family photo: preview, a button and Remove. */
function FamilyPhotoField({ file, onChange }: { file: File | null; onChange: (f: File | null) => void }) {
  const [preview, setPreview] = useState<string | null>(null);
  useEffect(() => {
    if (!file) { setPreview(null); return; }
    const url = URL.createObjectURL(file);
    setPreview(url);
    return () => URL.revokeObjectURL(url);
  }, [file]);

  return (
    <div className="ros:flex ros:flex-col ros:gap-3">
      <div className="ros:flex ros:aspect-[4/3] ros:w-full ros:max-w-[420px] ros:items-center ros:justify-center ros:overflow-hidden ros:rounded-xl ros:border ros:border-dashed ros:border-[#D0D5DD] ros:bg-white">
        {preview ? (
          <img src={preview} alt="Your family picture" className="ros:h-full ros:w-full ros:object-cover" />
        ) : (
          <svg viewBox="0 0 24 24" fill="none" stroke="#9CA3AF" strokeWidth="1.5" className="ros:size-14" aria-hidden="true">
            <circle cx="8" cy="8" r="2.6" /><circle cx="16.5" cy="9" r="2.2" /><path d="M2.5 19c0-3 2.4-5 5.5-5s5.5 2 5.5 5M13.5 19c0-2.4 1.6-4 3.6-4s3.4 1.6 3.4 4" />
          </svg>
        )}
      </div>
      <div className="ros:flex ros:flex-wrap ros:items-center ros:gap-4">
        <label className="ros:w-fit ros:cursor-pointer ros:rounded-full ros:border ros:border-black ros:px-5 ros:py-3 ros:text-[11px] ros:font-bold ros:uppercase ros:tracking-[0.15em] ros:transition ros:hover:bg-black ros:hover:text-white">
          {file ? "Change family picture" : "Add family picture"}
          <input type="file" accept="image/*" className="ros:hidden" onChange={(e) => onChange(e.target.files?.[0] ?? null)} />
        </label>
        {file && <button type="button" onClick={() => onChange(null)} className="ros:text-[13px] ros:text-[#6B7280] ros:underline">Remove</button>}
      </div>
      <p className="ros:text-[12px] ros:text-[#9CA3AF]">A picture of you with your spouse and children. JPG or PNG.</p>
    </div>
  );
}

export default function ProfilePhotosPage() {
  const [step, setStep] = useState<Step>("find");
  const [email, setEmail] = useState("");
  const [code, setCode] = useState("+234");
  const [number, setNumber] = useState("");
  const [firstName, setFirstName] = useState("");
  const [personal, setPersonal] = useState<File | null>(null);
  const [family, setFamily] = useState<File | null>(null);
  const [day, setDay] = useState("");
  const [month, setMonth] = useState("");
  const [year, setYear] = useState("");
  const [busy, setBusy] = useState(false);
  const [progress, setProgress] = useState("");
  const [error, setError] = useState("");

  const phone = `${code}${number}`;

  async function callApi(payload: Record<string, unknown>) {
    const res = await fetch("/api/member/profile-photos", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ email: email.trim(), phone, ...payload }) });
    const data = await res.json().catch(() => ({}));
    if (!res.ok) throw new Error(data.message || "Something went wrong. Please try again.");
    return data as { firstName?: string };
  }

  async function find(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    if (!EMAIL_RE.test(email.trim())) { setError("Enter a valid email address."); return; }
    if (number.length < 7) { setError("Enter the phone number you registered with."); return; }
    setBusy(true);
    try {
      const { firstName: name } = await callApi({ action: "check" });
      setFirstName(name ?? "");
      setStep("photos");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong. Please try again.");
    } finally {
      setBusy(false);
    }
  }

  async function save(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    const hasAnniversary = Boolean(day || month);
    if (hasAnniversary && !(day && month)) { setError("Choose both the day and the month of your wedding anniversary."); return; }
    if (year && !/^\d{4}$/.test(year)) { setError("Write the year as four digits, for example 2012."); return; }
    if (hasAnniversary) {
      const y = year ? Number(year) : null;
      const daysInMonth = new Date(y ?? 2000, Number(month), 0).getDate();
      if (Number(day) > daysInMonth || (y !== null && (y < 1900 || y > new Date().getFullYear()))) { setError("That wedding anniversary is not a real date. Please check the day, month and year."); return; }
    }
    if (!personal && !family && !hasAnniversary) { setError("Add at least one picture or your wedding anniversary."); return; }
    for (const f of [personal, family]) {
      if (f && !f.type.startsWith("image/")) { setError("Please choose pictures only (JPG or PNG)."); return; }
      if (f && f.size > MAX_PICTURE_BYTES) { setError("One of the pictures is too large. Please choose one under 15 MB."); return; }
    }
    setBusy(true);
    try {
      let profilePictureUrl = "";
      let couplePictureUrl = "";
      const total = [personal, family].filter(Boolean).length;
      let n = 0;
      if (personal) { setProgress(`Uploading picture ${++n} of ${total}...`); profilePictureUrl = await uploadProfilePicture(personal); }
      if (family) { setProgress(`Uploading picture ${++n} of ${total}...`); couplePictureUrl = await uploadProfilePicture(family); }
      setProgress("Sending to the church office...");
      await callApi({
        action: "save",
        profilePictureUrl,
        couplePictureUrl,
        anniversary: hasAnniversary ? { day: Number(day), month: Number(month), year: year ? Number(year) : null } : null,
      });
      setStep("done");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong. Please try again.");
    } finally {
      setBusy(false);
      setProgress("");
    }
  }

  function startOver() {
    setStep("find"); setEmail(""); setNumber(""); setFirstName("");
    setPersonal(null); setFamily(null); setDay(""); setMonth(""); setYear(""); setError("");
  }

  return (
    <div>
      <FormHero
        pill="MY PROFILE"
        title={<>Add your <span className="text-textRed">photos</span></>}
        subtitle="Already a member or e-member? Add your picture, your family picture and your wedding anniversary to your membership profile."
      />

      <FormSheet>
        {step === "done" ? (
          <div className="ros:mx-auto ros:flex ros:max-w-[500px] ros:flex-col ros:items-center ros:gap-4 ros:rounded-2xl ros:bg-white ros:p-6 ros:text-center ros:sm:p-10">
            <div className="ros:flex ros:size-[72px] ros:items-center ros:justify-center ros:rounded-full ros:bg-green-100">
              <svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="#16a34a" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><polyline points="20 6 9 17 4 12" /></svg>
            </div>
            <p className="ros:text-[22px] ros:font-bold ros:text-[#DF4E4E]">Thank you{firstName ? `, ${firstName}` : ""}</p>
            <p className="ros:text-[15px] ros:text-[#6B7280]">
              Your pictures and details have been sent to the church office. A staff member will add them to your profile, and they will show there once that is done.
            </p>
            <button type="button" onClick={startOver} className="ros:text-[14px] ros:font-medium ros:text-[#DF4E4E] ros:hover:underline">Add photos for another member</button>
          </div>
        ) : step === "find" ? (
          <form onSubmit={find} className="ros:mx-auto ros:flex ros:w-full ros:max-w-[560px] ros:flex-col ros:gap-4">
            <div className="ros:flex ros:flex-col ros:items-center ros:gap-1 ros:text-center">
              <h2 className="ros-anton ros:text-[26px] ros:uppercase ros:text-[#DF4E4E] ros:md:text-[32px]">Find your membership</h2>
              <p className="ros:text-[14px] ros:text-[#6B7280]">Enter the email address and phone number on your membership record. Both must match.</p>
            </div>
            <FormCard>
              <div className="ros:flex ros:flex-col ros:gap-4">
                <FormField label="Email address" required>
                  <input type="email" inputMode="email" autoComplete="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="you@example.com" className={inputCls} />
                </FormField>
                <PhoneField label="Phone number" required code={code} number={number} onCodeChange={setCode} onNumberChange={(v) => setNumber(normalisePhone(v, code))} placeholder="Enter phone number" />
              </div>
            </FormCard>
            {error && <p role="alert" className="ros:text-center ros:text-[14px] ros:text-red-500">{error}</p>}
            <div className="ros:flex ros:justify-center">
              <button type="submit" disabled={busy} className={submitCls}>{busy ? "CHECKING..." : "CONTINUE"}</button>
            </div>
          </form>
        ) : (
          <form onSubmit={save} className="ros:mx-auto ros:flex ros:w-full ros:max-w-[640px] ros:flex-col ros:gap-4">
            <div className="ros:flex ros:flex-col ros:items-center ros:gap-1 ros:text-center">
              <h2 className="ros-anton ros:text-[26px] ros:uppercase ros:text-[#DF4E4E] ros:md:text-[32px]">Hello{firstName ? `, ${firstName}` : ""}</h2>
              <p className="ros:text-[14px] ros:text-[#6B7280]">Add whichever of these you like. Everything is optional, but add at least one.</p>
            </div>
            <FormCard title="Your picture">
              <PhotoField file={personal} onChange={setPersonal} label="Add your picture" />
            </FormCard>
            <FormCard title="Family picture">
              <FamilyPhotoField file={family} onChange={setFamily} />
            </FormCard>
            <FormCard title="Wedding anniversary">
              <p className="ros:mb-4 ros:text-[13px] ros:text-[#6B7280]">Only if you are married. The year is optional.</p>
              <div className="ros:grid ros:gap-3" style={{ gridTemplateColumns: "minmax(0,1fr) minmax(0,1.6fr) minmax(0,1.1fr)" }}>
                <FormField label="Day">
                  <select value={day} onChange={(e) => setDay(e.target.value)} className={selectCls} aria-label="Wedding anniversary day">
                    <option value="">Day</option>
                    {Array.from({ length: 31 }, (_, i) => i + 1).map((d) => <option key={d} value={d}>{d}</option>)}
                  </select>
                </FormField>
                <FormField label="Month">
                  <select value={month} onChange={(e) => setMonth(e.target.value)} className={selectCls} aria-label="Wedding anniversary month">
                    <option value="">Month</option>
                    {MONTHS.map((m, i) => <option key={m} value={i + 1}>{m}</option>)}
                  </select>
                </FormField>
                <FormField label="Year">
                  <input type="text" inputMode="numeric" maxLength={4} value={year} onChange={(e) => setYear(e.target.value.replace(/\D/g, ""))} placeholder="2012" className={inputCls} aria-label="Wedding anniversary year" />
                </FormField>
              </div>
            </FormCard>
            {busy && progress && <p aria-live="polite" className="ros:text-center ros:text-[14px] ros:text-[#6B7280]">{progress}</p>}
            {error && <p role="alert" className="ros:text-center ros:text-[14px] ros:text-red-500">{error}</p>}
            <div className="ros:flex ros:flex-col ros:items-center ros:gap-3">
              <button type="submit" disabled={busy} className={submitCls}>{busy ? "SENDING..." : "SEND TO THE CHURCH OFFICE"}</button>
              <button type="button" onClick={startOver} disabled={busy} className="ros:text-[13px] ros:text-[#6B7280] ros:underline">Not {firstName || "you"}? Start again</button>
            </div>
          </form>
        )}
      </FormSheet>
    </div>
  );
}
