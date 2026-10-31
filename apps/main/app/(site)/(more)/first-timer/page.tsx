"use client";

import { useState } from "react";
import { FormHero } from "@ros/shared/kit/ui";
import { FormField, FormCard, inputCls, selectCls, textareaCls, FormSheet, submitCls, inputClsNoW, selectClsNoW } from "@ros/shared/kit/form";
import PhotoField from "@ros/shared/kit/PhotoField";
import { post, uploadProfilePicture } from "@ros/shared/api";
import { COUNTRY_CODES, COUNTRIES, statesForCountry } from "@ros/shared/kit/geo";

// "How was our service?" as the ROSMS form offers it, turned into the 1-5 rating the API stores.
const RATINGS: Record<string, number> = { Average: 2, Good: 3, "Very Good": 4, Excellent: 5 };
// Labels are what ROSMS shows; the API has no "Single Parent", so that one is recorded as single.
const MARITAL: { label: string; value: string }[] = [
  { label: "Single", value: "SINGLE" }, { label: "Married", value: "MARRIED" }, { label: "Separated", value: "SEPARATED" },
  { label: "Divorced", value: "DIVORCED" }, { label: "Single Parent", value: "SINGLE" }, { label: "Widowed", value: "WIDOWED" },
];
const OCCUPATIONS = ["Student", "Engineer", "Doctor", "Teacher", "Lawyer", "Business Owner", "Civil Servant", "Banker", "Nurse", "Accountant", "Pastor/Minister", "IT Professional", "Trader", "Artisan", "Unemployed", "Retired", "Other"];
const HEAR = ["Friends & Family", "Billboard", "Flyer", "Crusade", "TV & Radio", "Social Media", "Others"];
const FAVOURITE = ["Music", "Media", "Sermon", "Ambience", "Hospitality", "Friendliness"];

const MONTHS = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

export default function FirstTimerPage() {
  const [form, setForm] = useState({
    firstName: "", middleName: "", lastName: "", sex: "", maritalStatus: "", occupation: "",
    dobDay: "", dobMonth: "", dobYear: "",
    street: "", city: "", state: "", country: "Nigeria",
    countryCode: "+234", phoneNumber: "", email: "",
    isVisiting: false,
    mediumOfInvitation: "", worshippedOnline: "",
    howWasService: "", favouritePartOfService: "", attendRegularly: "", preferredContact: "",
    prayerRequest: "",
  });
  const [photo, setPhoto] = useState<File | null>(null);
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [error, setError] = useState("");
  const [photoWarning, setPhotoWarning] = useState(false);

  const set = (k: string) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => setForm((p) => ({ ...p, [k]: e.target.value }));
  const tick = (k: string) => (e: React.ChangeEvent<HTMLInputElement>) => setForm((p) => ({ ...p, [k]: e.target.checked }));

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("loading");
    setError("");
    setPhotoWarning(false);
    try {
      let profilePictureUrl: string | undefined;
      if (photo) {
        try {
          profilePictureUrl = await uploadProfilePicture(photo);
        } catch {
          setPhotoWarning(true); // the registration still goes through without the picture
        }
      }
      await post("/users/first-timer", {
        firstName: form.firstName,
        middleName: form.middleName || undefined,
        lastName: form.lastName,
        sex: form.sex || undefined,
        maritalStatus: MARITAL.find((m) => m.label === form.maritalStatus)?.value,
        occupation: form.occupation || undefined,
        dayOfBirth: form.dobDay ? parseInt(form.dobDay) : undefined,
        monthOfBirth: form.dobMonth ? parseInt(form.dobMonth) : undefined,
        yearOfBirth: form.dobYear ? parseInt(form.dobYear) : undefined,
        street: form.street || undefined,
        city: form.city || undefined,
        state: form.state || undefined,
        country: form.country || undefined,
        countryCode: form.countryCode.replace(/^\+/, ""),
        phoneNumber: form.phoneNumber,
        email: form.email || undefined,
        isVisiting: form.isVisiting,
        mediumOfInvitation: form.mediumOfInvitation || undefined,
        fromOnline: form.worshippedOnline ? form.worshippedOnline === "Yes" : undefined,
        serviceRating: form.howWasService ? RATINGS[form.howWasService] : undefined,
        favouritePartOfService: form.favouritePartOfService || undefined,
        profilePictureUrl,
      });
      if (form.prayerRequest.trim()) {
        // a prayer request is its own record in the admin web, so it is sent as one
        const lines = [`From: ${[form.firstName, form.middleName, form.lastName].filter(Boolean).join(" ")} (first-timer)`, `Phone: ${form.countryCode} ${form.phoneNumber}`];
        if (form.preferredContact) lines.push(`Preferred means of contact: ${form.preferredContact}`);
        if (form.attendRegularly) lines.push(`Would consider attending regularly: ${form.attendRegularly}`);
        await post("/requests/prayer", { subject: "Prayer Request — First Timer", content: `${lines.join("\n")}\n\n${form.prayerRequest.trim()}` }).catch(() => undefined);
      }
      setStatus("success");
    } catch (err: unknown) {
      setStatus("error");
      setError(err instanceof Error ? err.message : "Submission failed. Please try again.");
    }
  }

  const tickCls = "ros:h-4 ros:w-4 ros:rounded ros:border-[#E5E7EB] ros:accent-[#DF4E4E]";
  const tickLabel = "ros:flex ros:cursor-pointer ros:items-center ros:gap-2 ros:text-[14px] ros:font-semibold ros:text-[#111827]";

  return (
    <div>
      <FormHero pill="FORMS" title={<>First-Timer <span className="text-textRed">Registration</span></>} subtitle="Welcome! We are so glad you joined us. Please fill out this form so we can stay connected with you." />

      <FormSheet>
        <div className="ros:mb-2 ros:flex ros:w-full ros:max-w-[860px] ros:flex-col ros:items-center ros:gap-[8px] ros:text-center">
          <h2 className="ros-anton ros:text-[28px] ros:uppercase ros:text-[#DF4E4E] ros:md:text-[36px]">Tell Us About Yourself</h2>
          <p className="ros:text-[15px] ros:text-[#6B7280]">All fields marked * are required</p>
        </div>

        {status === "success" ? (
          <div className="ros:flex ros:max-w-[500px] ros:flex-col ros:items-center ros:gap-[16px] ros:rounded-2xl ros:bg-white ros:p-10 ros:text-center ros:shadow-sm">
            <div className="ros:flex ros:size-[72px] ros:items-center ros:justify-center ros:rounded-full ros:bg-green-100">
              <svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="#16a34a" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12" /></svg>
            </div>
            <p className="ros:text-[22px] ros:font-bold ros:text-[#DF4E4E]">Welcome to the Family!</p>
            <p className="ros:text-[15px] ros:text-[#6B7280]">Your registration has been received. A member of our team will be in touch soon to warmly welcome you into our church family.</p>
            {photoWarning && <p className="ros:text-[13px] ros:text-[#B45309]">Your picture could not be uploaded this time. You can send it to the church office later.</p>}
            <button onClick={() => { setStatus("idle"); setPhoto(null); }} className="ros:text-[14px] ros:font-medium ros:text-[#DF4E4E] ros:hover:underline">Submit another registration</button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="ros:flex ros:w-full ros:max-w-[860px] ros:flex-col ros:gap-[16px]">
            <FormCard title="Profile picture">
              <PhotoField file={photo} onChange={setPhoto} />
            </FormCard>

            {/* the ROSMS order and wording: First Name, Email, Last Name, Date of Birth, Mobile Number; Middle Name, Gender and 'just visiting' are optional extras the API takes */}
            <FormCard title="Enter Your Details">
              <div className="ros:grid ros:grid-cols-1 ros:gap-4 ros:sm:grid-cols-2">
                <FormField label="First Name" required><input type="text" required value={form.firstName} onChange={set("firstName")} className={inputCls} placeholder="Enter first name" /></FormField>
                <FormField label="Email"><input type="email" value={form.email} onChange={set("email")} className={inputCls} placeholder="Enter email address" /></FormField>
                <FormField label="Last Name" required><input type="text" required value={form.lastName} onChange={set("lastName")} className={inputCls} placeholder="Enter last name" /></FormField>
                <FormField label="Date of Birth">
                  <div className="ros:grid ros:grid-cols-3 ros:gap-3">
                    <select value={form.dobDay} onChange={set("dobDay")} className={selectCls}><option value="">Day</option>{Array.from({ length: 31 }, (_, i) => i + 1).map((d) => <option key={d} value={d}>{d}</option>)}</select>
                    <select value={form.dobMonth} onChange={set("dobMonth")} className={selectCls}><option value="">Month</option>{MONTHS.map((m, i) => <option key={m} value={i + 1}>{m}</option>)}</select>
                    <select value={form.dobYear} onChange={set("dobYear")} className={selectCls}><option value="">Year</option>{Array.from({ length: 100 }, (_, i) => new Date().getFullYear() - i).map((y) => <option key={y} value={y}>{y}</option>)}</select>
                  </div>
                </FormField>
                <FormField label="Mobile Number" required>
                  <div className="ros:flex ros:gap-2">
                    <select value={form.countryCode} onChange={set("countryCode")} className={`${selectClsNoW} ros:w-[110px] ros:flex-shrink-0`}>
                      {COUNTRY_CODES.map((c) => <option key={c.name} value={c.code}>{c.code}</option>)}
                    </select>
                    <input type="tel" required value={form.phoneNumber} onChange={set("phoneNumber")} className={`${inputClsNoW} ros:min-w-0 ros:flex-1`} placeholder="Enter mobile number" />
                  </div>
                </FormField>
                <FormField label="Middle Name (optional)"><input type="text" value={form.middleName} onChange={set("middleName")} className={inputCls} placeholder="Enter middle name" /></FormField>
                <FormField label="Gender (optional)">
                  <select value={form.sex} onChange={set("sex")} className={selectCls}>
                    <option value="">Select gender</option><option value="MALE">Male</option><option value="FEMALE">Female</option>
                  </select>
                </FormField>
              </div>
              <div className="ros:mt-4">
                <label className={tickLabel}>
                  <input type="checkbox" checked={form.isVisiting} onChange={tick("isVisiting")} className={tickCls} />
                  I am just visiting
                </label>
              </div>
            </FormCard>

            <FormCard title="Address">
              <FormField label="Street"><input type="text" value={form.street} onChange={set("street")} className={inputCls} placeholder="Enter street address" /></FormField>
              <div className="ros:mt-4 ros:grid ros:grid-cols-1 ros:gap-4 ros:sm:grid-cols-3">
                <FormField label="City"><input type="text" value={form.city} onChange={set("city")} className={inputCls} placeholder="Enter city" /></FormField>
                <FormField label="State">
                  {statesForCountry(form.country).length ? (
                    <select value={form.state} onChange={set("state")} className={selectCls}>
                      <option value="">Select state</option>
                      {statesForCountry(form.country).map((st) => <option key={st} value={st}>{st}</option>)}
                    </select>
                  ) : (
                    <input type="text" value={form.state} onChange={set("state")} className={inputCls} placeholder="Enter state or province" />
                  )}
                </FormField>
                <FormField label="Country">
                  <select value={form.country} onChange={(e) => setForm((p) => ({ ...p, country: e.target.value, state: "" }))} className={selectCls}>
                    <option value="">Select country</option>
                    {COUNTRIES.map((c) => <option key={c} value={c}>{c}</option>)}
                  </select>
                </FormField>
              </div>
            </FormCard>

            <FormCard>
              <div className="ros:grid ros:grid-cols-1 ros:gap-4 ros:sm:grid-cols-2">
                <FormField label="Marital Status">
                  <select value={form.maritalStatus} onChange={set("maritalStatus")} className={selectCls}>
                    <option value="">Select marital status</option>
                    {MARITAL.map((m) => <option key={m.label} value={m.label}>{m.label}</option>)}
                  </select>
                </FormField>
                <FormField label="Occupation">
                  <select value={form.occupation} onChange={set("occupation")} className={selectCls}>
                    <option value="">Select occupation</option>
                    {OCCUPATIONS.map((o) => <option key={o} value={o}>{o}</option>)}
                  </select>
                </FormField>
              </div>
            </FormCard>

            <FormCard>
              <div className="ros:grid ros:grid-cols-1 ros:gap-4 ros:sm:grid-cols-2">
                <FormField label="How did you hear about our church?">
                  <select value={form.mediumOfInvitation} onChange={set("mediumOfInvitation")} className={selectCls}>
                    <option value="">Select option</option>
                    {HEAR.map((h) => <option key={h} value={h}>{h}</option>)}
                  </select>
                </FormField>
                <FormField label="How was our service?">
                  <select value={form.howWasService} onChange={set("howWasService")} className={selectCls}>
                    <option value="">Select rating</option>
                    {Object.keys(RATINGS).map((r) => <option key={r} value={r}>{r}</option>)}
                  </select>
                </FormField>
                <FormField label="What were your favourite parts of the service?">
                  <select value={form.favouritePartOfService} onChange={set("favouritePartOfService")} className={selectCls}>
                    <option value="">Select option</option>
                    {FAVOURITE.map((f) => <option key={f} value={f}>{f}</option>)}
                  </select>
                </FormField>
                <FormField label="Have you worshipped with us online before?">
                  <select value={form.worshippedOnline} onChange={set("worshippedOnline")} className={selectCls}>
                    <option value="">Select option</option><option value="Yes">Yes</option><option value="No">No</option>
                  </select>
                </FormField>
                <FormField label="Would you consider attending RCCG Rose of Sharon regularly?">
                  <select value={form.attendRegularly} onChange={set("attendRegularly")} className={selectCls}>
                    <option value="">Select option</option><option value="Yes">Yes</option><option value="No">No</option><option value="Maybe">Maybe</option>
                  </select>
                </FormField>
                <FormField label="Preferred means of contact">
                  <select value={form.preferredContact} onChange={set("preferredContact")} className={selectCls}>
                    <option value="">Select option</option><option value="Call">Call</option><option value="WhatsApp">WhatsApp</option><option value="Email">Email</option>
                  </select>
                </FormField>
              </div>
            </FormCard>

            <FormCard>
              <FormField label="Prayer Request">
                <textarea value={form.prayerRequest} onChange={set("prayerRequest")} rows={4} className={textareaCls} placeholder="Enter your prayer request" />
              </FormField>
            </FormCard>

            {status === "error" && <p role="alert" className="ros:text-center ros:text-[14px] ros:text-red-500">{error}</p>}
            <div className="ros:mt-[8px] ros:flex ros:justify-center">
              <button type="submit" disabled={status === "loading"} className={submitCls}>{status === "loading" ? "Submitting..." : "REGISTER"}</button>
            </div>
          </form>
        )}
      </FormSheet>
    </div>
  );
}
