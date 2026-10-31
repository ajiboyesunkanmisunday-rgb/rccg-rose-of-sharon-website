"use client";

import { useEffect, useState } from "react";
import { FormHero } from "@ros/shared/kit/ui";
import { FormField, FormCard, inputCls, selectCls, FormSheet, submitCls, inputClsNoW, selectClsNoW } from "@ros/shared/kit/form";
import PhotoField from "@ros/shared/kit/PhotoField";
import { COUNTRIES, COUNTRY_CODES, NIGERIAN_STATES } from "@ros/shared/kit/geo";
import { getGroups, post, uploadProfilePicture, type GroupResponse } from "@ros/shared/api";

const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

const EMPTY = {
  firstName: "", middleName: "", lastName: "",
  countryCode: "+234", phoneNumber: "", email: "", sex: "",
  dobDay: "", dobMonth: "", dobYear: "",
  street: "", city: "", country: "Nigeria", state: "",
  maritalStatus: "",
  weddingDay: "", weddingMonth: "", weddingYear: "",
};

export default function BecomeAMemberPage() {
  const [form, setForm] = useState(EMPTY);
  const [departments, setDepartments] = useState<string[]>([]);
  const [pick, setPick] = useState("");
  const [groups, setGroups] = useState<GroupResponse[]>([]);
  const [groupsLoaded, setGroupsLoaded] = useState(false);
  const [photo, setPhoto] = useState<File | null>(null);
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [error, setError] = useState("");
  const [photoWarning, setPhotoWarning] = useState(false);

  useEffect(() => {
    getGroups().then((g) => setGroups([...g].sort((a, b) => a.name.localeCompare(b.name)))).catch(() => setGroups([])).finally(() => setGroupsLoaded(true));
  }, []);

  const set = (k: keyof typeof EMPTY) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => setForm((p) => ({ ...p, [k]: e.target.value }));
  // ROSMS phone box: digits only, a leading 0 is dropped, +234 numbers are capped at 10 digits
  function setPhone(e: React.ChangeEvent<HTMLInputElement>) {
    let digits = e.target.value.replace(/\D/g, "").replace(/^0+/, "");
    if (form.countryCode === "+234") digits = digits.slice(0, 10);
    setForm((p) => ({ ...p, phoneNumber: digits }));
  }
  const num = (v: string) => (v ? parseInt(v) : undefined);

  function addDepartment(id: string) {
    if (id && !departments.includes(id)) setDepartments((d) => [...d, id]);
    setPick("");
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setPhotoWarning(false);
    if (!form.sex) { setError("Please select your gender."); return; }
    setStatus("loading");
    try {
      let profilePictureUrl: string | undefined;
      if (photo) {
        try {
          profilePictureUrl = await uploadProfilePicture(photo);
        } catch {
          setPhotoWarning(true); // the registration still goes through without the picture
        }
      }
      const married = form.maritalStatus === "MARRIED";
      await post("/users/member", {
        firstName: form.firstName.trim(),
        middleName: form.middleName.trim() || undefined,
        lastName: form.lastName.trim(),
        sex: form.sex,
        maritalStatus: form.maritalStatus || undefined,
        dayOfBirth: num(form.dobDay),
        monthOfBirth: num(form.dobMonth),
        yearOfBirth: num(form.dobYear),
        dayOfWedding: married ? num(form.weddingDay) : undefined,
        monthOfWedding: married ? num(form.weddingMonth) : undefined,
        yearOfWedding: married ? num(form.weddingYear) : undefined,
        countryCode: form.countryCode.replace(/^\+/, ""),
        phoneNumber: form.phoneNumber,
        email: form.email.trim() || undefined,
        street: form.street.trim() || undefined,
        city: form.city.trim() || undefined,
        state: form.state || undefined,
        country: form.country || undefined,
        groupIds: departments.length ? departments : undefined,
        profilePictureUrl,
      });
      setStatus("success");
    } catch (err: unknown) {
      setStatus("error");
      setError(err instanceof Error ? err.message : "Submission failed. Please try again.");
    }
  }

  function reset() {
    setForm(EMPTY);
    setDepartments([]); setPhoto(null); setStatus("idle");
  }

  const nameOf = (id: string) => groups.find((g) => g.id === id)?.name ?? id;

  const dateRow = (d: keyof typeof EMPTY, m: keyof typeof EMPTY, y: keyof typeof EMPTY, back: number) => (
    <div className="ros:grid ros:grid-cols-3 ros:gap-3">
      <select value={form[d]} onChange={set(d)} className={selectCls}><option value="">Day</option>{Array.from({ length: 31 }, (_, i) => i + 1).map((n) => <option key={n} value={n}>{n}</option>)}</select>
      <select value={form[m]} onChange={set(m)} className={selectCls}><option value="">Month</option>{months.map((mo, i) => <option key={mo} value={i + 1}>{mo}</option>)}</select>
      <select value={form[y]} onChange={set(y)} className={selectCls}><option value="">Year</option>{Array.from({ length: back }, (_, i) => new Date().getFullYear() - i).map((yr) => <option key={yr} value={yr}>{yr}</option>)}</select>
    </div>
  );

  return (
    <div>
      <FormHero pill="MEMBERSHIP" title={<>Become a <span className="text-textRed">Member</span></>} subtitle="Join the Rose of Sharon family. Tell us a little about yourself so we can record you as a member." />

      <FormSheet>
        <div className="ros:mb-2 ros:flex ros:w-full ros:max-w-[860px] ros:flex-col ros:items-center ros:gap-[8px] ros:text-center">
          <h2 className="ros-anton ros:text-[28px] ros:uppercase ros:text-[#DF4E4E] ros:md:text-[36px]">Membership Form</h2>
          <p className="ros:text-[15px] ros:text-[#6B7280]">All fields marked * are required</p>
        </div>

        {status === "success" ? (
          <div className="ros:flex ros:max-w-[500px] ros:flex-col ros:items-center ros:gap-[16px] ros:rounded-2xl ros:bg-white ros:p-10 ros:text-center ros:shadow-sm">
            <div className="ros:flex ros:size-[72px] ros:items-center ros:justify-center ros:rounded-full ros:bg-green-100">
              <svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="#16a34a" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12" /></svg>
            </div>
            <p className="ros:text-[22px] ros:font-bold ros:text-[#DF4E4E]">Welcome to the family!</p>
            <p className="ros:text-[15px] ros:text-[#6B7280]">Your membership details have been received. A member of our team will be in touch.</p>
            {photoWarning && <p className="ros:text-[13px] ros:text-[#B45309]">Your picture could not be uploaded this time. You can send it to the church office later.</p>}
            <button onClick={reset} className="ros:text-[14px] ros:font-medium ros:text-[#DF4E4E] ros:hover:underline">Submit another registration</button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="ros:flex ros:w-full ros:max-w-[860px] ros:flex-col ros:gap-[16px]">
            <FormCard title="Profile Photo">
              <PhotoField file={photo} onChange={setPhoto} label="Upload Photo" />
            </FormCard>

            {/* the live ROSMS "Add Member" form: Enter Details (First Name*, Middle Name, Last Name*, Phone Number*, Email, Gender*, Date of Birth), Address (Street, City, Country, State / Province), Marital Status, Groups */}
            <FormCard title="Enter Details">
              <div className="ros:grid ros:grid-cols-1 ros:gap-4 ros:sm:grid-cols-2">
                <FormField label="First Name" required><input type="text" required value={form.firstName} onChange={set("firstName")} className={inputCls} placeholder="Enter First Name" /></FormField>
                <FormField label="Middle Name"><input type="text" value={form.middleName} onChange={set("middleName")} className={inputCls} placeholder="Enter Middle Name (optional)" /></FormField>
                <FormField label="Last Name" required><input type="text" required value={form.lastName} onChange={set("lastName")} className={inputCls} placeholder="Enter Last Name" /></FormField>
                <FormField label="Phone Number" required>
                  <div className="ros:flex ros:gap-2">
                    <select value={form.countryCode} onChange={(e) => setForm((p) => ({ ...p, countryCode: e.target.value }))} className={`${selectClsNoW} ros:w-[110px] ros:flex-shrink-0`}>
                      {COUNTRY_CODES.map((c) => <option key={c.name} value={c.code}>{c.code} {c.name}</option>)}
                    </select>
                    <input type="tel" required value={form.phoneNumber} onChange={setPhone} className={`${inputClsNoW} ros:min-w-0 ros:flex-1`} placeholder="Enter Phone Number" />
                  </div>
                  <p className="ros:mt-1 ros:text-[12px] ros:text-[#6B7280]">Digits only — dashes, spaces &amp; leading 0 are stripped automatically</p>
                </FormField>
                <FormField label="Email"><input type="email" value={form.email} onChange={set("email")} className={inputCls} placeholder="Enter Email" /></FormField>
                <FormField label="Gender" required>
                  <select required value={form.sex} onChange={set("sex")} className={selectCls}>
                    <option value="">Select Gender</option><option value="MALE">Male</option><option value="FEMALE">Female</option>
                  </select>
                </FormField>
                <FormField label="Date of Birth">{dateRow("dobDay", "dobMonth", "dobYear", 100)}</FormField>
              </div>
            </FormCard>

            <FormCard title="Address">
              <div className="ros:grid ros:grid-cols-1 ros:gap-4 ros:sm:grid-cols-2">
                <FormField label="Street"><input type="text" value={form.street} onChange={set("street")} className={inputCls} placeholder="Enter Street" /></FormField>
                <FormField label="City"><input type="text" value={form.city} onChange={set("city")} className={inputCls} placeholder="Enter City" /></FormField>
                <FormField label="Country">
                  <select value={form.country} onChange={(e) => setForm((p) => ({ ...p, country: e.target.value, state: "" }))} className={selectCls}>
                    <option value="">Select Country</option>
                    {COUNTRIES.map((c) => <option key={c} value={c}>{c}</option>)}
                  </select>
                </FormField>
                <FormField label="State / Province">
                  {form.country === "Nigeria" ? (
                    <select value={form.state} onChange={set("state")} className={selectCls}>
                      <option value="">Select State</option>
                      {NIGERIAN_STATES.map((st) => <option key={st} value={st}>{st}</option>)}
                    </select>
                  ) : (
                    <input type="text" value={form.state} onChange={set("state")} className={inputCls} placeholder={form.country ? "Enter state / province" : "Select a country first"} />
                  )}
                </FormField>
                <FormField label="Marital Status">
                  <select value={form.maritalStatus} onChange={set("maritalStatus")} className={selectCls}>
                    <option value="">Select Marital Status</option>
                    <option value="SINGLE">Single</option><option value="MARRIED">Married</option>
                    <option value="WIDOWED">Widowed</option><option value="DIVORCED">Divorced</option>
                  </select>
                </FormField>
                <FormField label="Groups">
                  <select value={pick} disabled={!groups.length} onChange={(e) => addDepartment(e.target.value)} className={selectCls}>
                    <option value="">{!groupsLoaded ? "Loading groups…" : groups.length ? "Select Groups" : "No groups available right now"}</option>
                    {groups.filter((g) => !departments.includes(g.id)).map((g) => <option key={g.id} value={g.id}>{g.name}</option>)}
                  </select>
                </FormField>
              </div>
              {departments.length > 0 && (
                <div className="ros:mt-3 ros:flex ros:flex-wrap ros:gap-2">
                  {departments.map((id) => (
                    <span key={id} className="ros:flex ros:items-center ros:gap-2 ros:rounded-full ros:bg-black ros:px-3 ros:py-1 ros:text-[12px] ros:font-bold ros:text-white">
                      {nameOf(id)}
                      <button type="button" aria-label={`Remove ${nameOf(id)}`} onClick={() => setDepartments((d) => d.filter((x) => x !== id))} className="ros:text-[14px] ros:leading-none ros:text-[#FFFFFF99] ros:hover:text-white">×</button>
                    </span>
                  ))}
                </div>
              )}
              {form.maritalStatus === "MARRIED" && (
                <div className="ros:mt-4">
                  <FormField label="Wedding Anniversary">{dateRow("weddingDay", "weddingMonth", "weddingYear", 80)}</FormField>
                </div>
              )}
            </FormCard>

            {status === "error" && <p role="alert" className="ros:text-center ros:text-[14px] ros:text-red-500">{error}</p>}
            <div className="ros:mt-[8px] ros:flex ros:justify-center">
              <button type="submit" disabled={status === "loading"} className={submitCls}>{status === "loading" ? "Submitting..." : "SUBMIT"}</button>
            </div>
          </form>
        )}
      </FormSheet>
    </div>
  );
}
