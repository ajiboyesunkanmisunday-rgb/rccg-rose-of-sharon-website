"use client";

import { FormHero } from "@ros/shared/kit/ui";

import { useEffect, useState } from "react";
import { FormField, FormCard, inputCls, selectCls, FormSheet, submitCls, selectClsNoW, inputClsNoW } from "@ros/shared/kit/form";
import { COUNTRIES, COUNTRY_CODES, NIGERIAN_STATES } from "@ros/shared/kit/geo";
import PhotoField from "@ros/shared/kit/PhotoField";
import { getGroups, post, uploadProfilePicture, type GroupResponse } from "@ros/shared/api";

const months = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December",
];

const EMPTY = {
  firstName: "", lastName: "", middleName: "", email: "",
  countryCode: "+234", phoneNumber: "", sex: "",
  dobDay: "", dobMonth: "", dobYear: "",
  country: "Nigeria", state: "", maritalStatus: "",
  weddingDay: "", weddingMonth: "", weddingYear: "",
};

export default function EMemberPage() {
  const [form, setForm] = useState(EMPTY);
  const [groups, setGroups] = useState<GroupResponse[]>([]);
  const [groupsLoaded, setGroupsLoaded] = useState(false);
  const [groupIds, setGroupIds] = useState<string[]>([]);
  const [pick, setPick] = useState("");
  const [photo, setPhoto] = useState<File | null>(null);
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [error, setError] = useState("");

  function set(k: keyof typeof EMPTY) {
    return (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) =>
      setForm((p) => ({ ...p, [k]: e.target.value }));
  }
  // ROSMS phone box: digits only, a leading 0 is dropped, +234 numbers are capped at 10 digits
  function setPhone(e: React.ChangeEvent<HTMLInputElement>) {
    let digits = e.target.value.replace(/\D/g, "").replace(/^0+/, "");
    if (form.countryCode === "+234") digits = digits.slice(0, 10);
    setForm((p) => ({ ...p, phoneNumber: digits }));
  }
  const num = (v: string) => (v ? parseInt(v) : undefined);

  useEffect(() => {
    getGroups().then((g) => setGroups([...g].sort((a, b) => a.name.localeCompare(b.name)))).catch(() => setGroups([])).finally(() => setGroupsLoaded(true));
  }, []);
  const nameOf = (id: string) => groups.find((g) => g.id === id)?.name ?? id;

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setStatus("loading");
    try {
      let profilePictureUrl: string | undefined;
      if (photo) {
        try { profilePictureUrl = await uploadProfilePicture(photo); } catch { /* the registration still goes through without the picture */ }
      }
      const married = form.maritalStatus === "MARRIED";
      await post("/users/e-member", {
        firstName: form.firstName.trim(),
        middleName: form.middleName.trim() || undefined,
        lastName: form.lastName.trim(),
        email: form.email.trim() || undefined,
        countryCode: form.countryCode.replace(/^\+/, ""),
        phoneNumber: form.phoneNumber || undefined,
        sex: form.sex || undefined,
        country: form.country || undefined,
        state: form.state || undefined,
        maritalStatus: form.maritalStatus || undefined,
        groupIds: groupIds.length ? groupIds : undefined,
        profilePictureUrl,
        dayOfBirth: num(form.dobDay),
        monthOfBirth: num(form.dobMonth),
        yearOfBirth: num(form.dobYear),
        dayOfWedding: married ? num(form.weddingDay) : undefined,
        monthOfWedding: married ? num(form.weddingMonth) : undefined,
        yearOfWedding: married ? num(form.weddingYear) : undefined,
      });
      setStatus("success");
    } catch (err: unknown) {
      setStatus("error");
      setError(err instanceof Error ? err.message : "Submission failed. Please try again.");
    }
  }

  const dateRow = (d: keyof typeof EMPTY, m: keyof typeof EMPTY, y: keyof typeof EMPTY, back: number) => (
    <div className="ros:grid ros:grid-cols-3 ros:gap-3">
      <select value={form[d]} onChange={set(d)} className={selectCls}>
        <option value="">Day</option>
        {Array.from({ length: 31 }, (_, i) => i + 1).map((n) => <option key={n} value={n}>{n}</option>)}
      </select>
      <select value={form[m]} onChange={set(m)} className={selectCls}>
        <option value="">Month</option>
        {months.map((mo, i) => <option key={mo} value={i + 1}>{mo}</option>)}
      </select>
      <select value={form[y]} onChange={set(y)} className={selectCls}>
        <option value="">Year</option>
        {Array.from({ length: back }, (_, i) => new Date().getFullYear() - i).map((yr) => <option key={yr} value={yr}>{yr}</option>)}
      </select>
    </div>
  );

  return (
    <div>
      <FormHero pill="ONLINE MEMBERSHIP" title={<>Become an <span className="text-textRed">E-Member</span></>} subtitle="Register as an online member of RCCG Rose of Sharon and stay connected with your church family." />

      {/* Form Section */}
      <FormSheet>

        <div className="ros:w-full ros:max-w-[860px] ros:flex ros:flex-col ros:gap-[4px] ros:items-center ros:text-center">
          <h2 className="ros-anton ros:uppercase ros:text-[#DF4E4E] ros:text-[26px] ros:md:text-[32px]">E-Member Registration Form</h2>
          <p className="ros:text-[#6B7280] ros:text-[14px]">All fields marked * are required</p>
        </div>

        {status === "success" ? (
          <div className="ros:flex ros:flex-col ros:gap-[16px] ros:items-center ros:max-w-[500px] ros:text-center ros:bg-white ros:rounded-2xl ros:p-10 ros:shadow-sm">
            <div className="ros:size-[72px] ros:rounded-full ros:bg-green-100 ros:flex ros:items-center ros:justify-center">
              <svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="#16a34a" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="20 6 9 17 4 12" />
              </svg>
            </div>
            <p className="ros:text-[#DF4E4E] ros:text-[22px] ros:font-bold">Welcome to the Family!</p>
            <p className="ros:text-[#6B7280] ros:text-[15px]">
              Your e-member registration has been received. You are now part of the RCCG Rose of Sharon online community.
            </p>
            <button
              onClick={() => { setForm(EMPTY); setStatus("idle"); }}
              className="ros:text-[#DF4E4E] ros:text-[14px] ros:font-medium ros:hover:underline"
            >
              Submit another registration
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="ros:flex ros:flex-col ros:gap-[16px] ros:w-full ros:max-w-[860px]">

            {/* the live ROSMS "Add E-Member" form: First Name* | Middle Name, Last Name* | Gender*, Phone Number* | Email, Date of Birth | Marital Status, Country | State / Province, Groups, Profile Photo.
                "Service Attended" is not on this form because the e-member API has no field for it. */}
            <FormCard title="Enter Details">
              <div className="ros:grid ros:grid-cols-1 ros:sm:grid-cols-2 ros:gap-4">
                <FormField label="First Name" required>
                  <input type="text" required value={form.firstName} onChange={set("firstName")} className={inputCls} placeholder="Enter first name" />
                </FormField>
                <FormField label="Middle Name">
                  <input type="text" value={form.middleName} onChange={set("middleName")} className={inputCls} placeholder="Enter middle name (optional)" />
                </FormField>
                <FormField label="Last Name" required>
                  <input type="text" required value={form.lastName} onChange={set("lastName")} className={inputCls} placeholder="Enter last name" />
                </FormField>
                <FormField label="Gender" required>
                  <select required value={form.sex} onChange={set("sex")} className={selectCls}>
                    <option value="">Select Gender</option>
                    <option value="MALE">Male</option>
                    <option value="FEMALE">Female</option>
                  </select>
                </FormField>
                <FormField label="Phone Number" required>
                  <div className="ros:flex ros:gap-2">
                    <select value={form.countryCode} onChange={(e) => setForm((p) => ({ ...p, countryCode: e.target.value }))} className={`${selectClsNoW} ros:w-[110px] ros:flex-shrink-0`}>
                      {COUNTRY_CODES.map((c) => <option key={c.name} value={c.code}>{c.code} {c.name}</option>)}
                    </select>
                    <input type="tel" required value={form.phoneNumber} onChange={setPhone} className={`${inputClsNoW} ros:min-w-0 ros:flex-1`} placeholder="Enter phone number" />
                  </div>
                  <p className="ros:mt-1 ros:text-[12px] ros:text-[#6B7280]">Digits only — dashes, spaces &amp; leading 0 are stripped automatically</p>
                </FormField>
                <FormField label="Email">
                  <input type="email" value={form.email} onChange={set("email")} className={inputCls} placeholder="Enter email address" />
                </FormField>
                <FormField label="Date of Birth">{dateRow("dobDay", "dobMonth", "dobYear", 100)}</FormField>
                <FormField label="Marital Status">
                  <select value={form.maritalStatus} onChange={set("maritalStatus")} className={selectCls}>
                    <option value="">Select Marital Status</option>
                    <option value="SINGLE">Single</option>
                    <option value="MARRIED">Married</option>
                    <option value="WIDOWED">Widowed</option>
                    <option value="DIVORCED">Divorced</option>
                  </select>
                </FormField>
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
                <FormField label="Groups">
                  <select value={pick} disabled={!groups.length} onChange={(e) => { const v = e.target.value; if (v && !groupIds.includes(v)) setGroupIds((g) => [...g, v]); setPick(""); }} className={selectCls}>
                    <option value="">{!groupsLoaded ? "Loading groups…" : groups.length ? "Select Groups" : "No groups available right now"}</option>
                    {groups.filter((g) => !groupIds.includes(g.id)).map((g) => <option key={g.id} value={g.id}>{g.name}</option>)}
                  </select>
                  {groupIds.length > 0 && (
                    <div className="ros:mt-2 ros:flex ros:flex-wrap ros:gap-2">
                      {groupIds.map((id) => (
                        <span key={id} className="ros:flex ros:items-center ros:gap-2 ros:rounded-full ros:bg-black ros:px-3 ros:py-1 ros:text-[12px] ros:font-bold ros:text-white">
                          {nameOf(id)}
                          <button type="button" aria-label={`Remove ${nameOf(id)}`} onClick={() => setGroupIds((g) => g.filter((x) => x !== id))} className="ros:text-[14px] ros:leading-none ros:text-[#FFFFFF99] ros:hover:text-white">×</button>
                        </span>
                      ))}
                    </div>
                  )}
                </FormField>
              </div>

              {form.maritalStatus === "MARRIED" && (
                <div className="ros:mt-4">
                  <label className="ros:block ros:text-[14px] ros:font-semibold ros:text-[#111827] ros:mb-2">Wedding Anniversary</label>
                  {dateRow("weddingDay", "weddingMonth", "weddingYear", 80)}
                </div>
              )}
            </FormCard>

            <FormCard title="Profile Photo">
              <PhotoField file={photo} onChange={setPhoto} label="Profile Photo" />
            </FormCard>

            {status === "error" && (
              <p className="ros:text-red-500 ros:text-[14px] ros:text-center">{error}</p>
            )}

            <div className="ros:flex ros:justify-center ros:mt-[8px]">
              <button
                type="submit"
                disabled={status === "loading"}
                className={submitCls}
              >
                {status === "loading" ? "REGISTERING..." : "REGISTER AS E-MEMBER"}
              </button>
            </div>
          </form>
        )}
      </FormSheet>
    </div>
  );
}
