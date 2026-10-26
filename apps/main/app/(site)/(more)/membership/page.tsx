"use client";

import { useEffect, useState } from "react";
import { FormHero } from "@ros/shared/kit/ui";
import { FormField, FormCard, inputCls, selectCls, FormSheet, submitCls, inputClsNoW, selectClsNoW } from "@ros/shared/kit/form";
import PhotoField from "@ros/shared/kit/PhotoField";
import { getGroups, post, uploadProfilePicture, type GroupResponse } from "@ros/shared/api";

const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

export default function BecomeAMemberPage() {
  const [form, setForm] = useState({
    firstName: "", middleName: "", lastName: "", sex: "", maritalStatus: "",
    dobDay: "", dobMonth: "", dobYear: "",
    countryCode: "+234", phoneNumber: "", email: "",
    street: "", city: "", state: "", country: "Nigeria",
  });
  const [departments, setDepartments] = useState<string[]>([]);
  const [pick, setPick] = useState("");
  const [groups, setGroups] = useState<GroupResponse[]>([]);
  const [photo, setPhoto] = useState<File | null>(null);
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [error, setError] = useState("");
  const [photoWarning, setPhotoWarning] = useState(false);

  useEffect(() => {
    getGroups().then((g) => setGroups([...g].sort((a, b) => a.name.localeCompare(b.name)))).catch(() => setGroups([]));
  }, []);

  const set = (k: string) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => setForm((p) => ({ ...p, [k]: e.target.value }));

  function addDepartment(id: string) {
    if (id && !departments.includes(id)) setDepartments((d) => [...d, id]);
    setPick("");
  }

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
      await post("/users/member", {
        firstName: form.firstName,
        middleName: form.middleName || undefined,
        lastName: form.lastName,
        sex: form.sex || undefined,
        maritalStatus: form.maritalStatus || undefined,
        dayOfBirth: form.dobDay ? parseInt(form.dobDay) : undefined,
        monthOfBirth: form.dobMonth ? parseInt(form.dobMonth) : undefined,
        yearOfBirth: form.dobYear ? parseInt(form.dobYear) : undefined,
        countryCode: form.countryCode.replace(/^\+/, ""),
        phoneNumber: form.phoneNumber,
        email: form.email || undefined,
        street: form.street || undefined,
        city: form.city || undefined,
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
    setForm({ firstName: "", middleName: "", lastName: "", sex: "", maritalStatus: "", dobDay: "", dobMonth: "", dobYear: "", countryCode: "+234", phoneNumber: "", email: "", street: "", city: "", state: "", country: "Nigeria" });
    setDepartments([]); setPhoto(null); setStatus("idle");
  }

  const nameOf = (id: string) => groups.find((g) => g.id === id)?.name ?? id;

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
            <FormCard title="Profile picture">
              <PhotoField file={photo} onChange={setPhoto} />
            </FormCard>

            <FormCard title="Personal Information">
              <div className="ros:grid ros:grid-cols-1 ros:gap-4 ros:sm:grid-cols-2 ros:lg:grid-cols-3">
                <FormField label="First Name" required><input type="text" required value={form.firstName} onChange={set("firstName")} className={inputCls} placeholder="Enter first name" /></FormField>
                <FormField label="Middle Name"><input type="text" value={form.middleName} onChange={set("middleName")} className={inputCls} placeholder="Enter middle name" /></FormField>
                <FormField label="Last Name" required><input type="text" required value={form.lastName} onChange={set("lastName")} className={inputCls} placeholder="Enter last name" /></FormField>
              </div>
              <div className="ros:mt-4 ros:grid ros:grid-cols-1 ros:gap-4 ros:sm:grid-cols-2">
                <FormField label="Gender" required>
                  <select required value={form.sex} onChange={set("sex")} className={selectCls}>
                    <option value="">Select gender</option><option value="MALE">Male</option><option value="FEMALE">Female</option>
                  </select>
                </FormField>
                <FormField label="Marital Status">
                  <select value={form.maritalStatus} onChange={set("maritalStatus")} className={selectCls}>
                    <option value="">Select status</option>
                    <option value="SINGLE">Single</option><option value="MARRIED">Married</option><option value="SEPARATED">Separated</option>
                    <option value="DIVORCED">Divorced</option><option value="SINGLE_PARENT">Single Parent</option><option value="WIDOWED">Widowed</option>
                  </select>
                </FormField>
              </div>
              <div className="ros:mt-4">
                <FormField label="Date of Birth">
                  <div className="ros:grid ros:grid-cols-3 ros:gap-3">
                    <select value={form.dobDay} onChange={set("dobDay")} className={selectCls}><option value="">Day</option>{Array.from({ length: 31 }, (_, i) => i + 1).map((d) => <option key={d} value={d}>{d}</option>)}</select>
                    <select value={form.dobMonth} onChange={set("dobMonth")} className={selectCls}><option value="">Month</option>{months.map((m, i) => <option key={m} value={i + 1}>{m}</option>)}</select>
                    <select value={form.dobYear} onChange={set("dobYear")} className={selectCls}><option value="">Year</option>{Array.from({ length: 100 }, (_, i) => new Date().getFullYear() - i).map((y) => <option key={y} value={y}>{y}</option>)}</select>
                  </div>
                </FormField>
              </div>
            </FormCard>

            <FormCard title="Contact Details">
              <div className="ros:grid ros:grid-cols-1 ros:gap-4 ros:sm:grid-cols-2">
                <FormField label="Phone Number" required>
                  <div className="ros:flex ros:gap-2">
                    <select value={form.countryCode} onChange={set("countryCode")} className={`${selectClsNoW} ros:w-[100px] ros:flex-shrink-0`}>
                      <option value="+234">+234</option><option value="+1">+1</option><option value="+44">+44</option><option value="+27">+27</option><option value="+33">+33</option>
                    </select>
                    <input type="tel" required value={form.phoneNumber} onChange={set("phoneNumber")} className={`${inputClsNoW} ros:min-w-0 ros:flex-1`} placeholder="080 0000 0000" />
                  </div>
                </FormField>
                <FormField label="Email Address"><input type="email" value={form.email} onChange={set("email")} className={inputCls} placeholder="your@email.com" /></FormField>
              </div>
            </FormCard>

            <FormCard title="Address">
              <FormField label="Street"><input type="text" value={form.street} onChange={set("street")} className={inputCls} placeholder="House number and street" /></FormField>
              <div className="ros:mt-4 ros:grid ros:grid-cols-1 ros:gap-4 ros:sm:grid-cols-3">
                <FormField label="City"><input type="text" value={form.city} onChange={set("city")} className={inputCls} placeholder="City" /></FormField>
                <FormField label="State / Province"><input type="text" value={form.state} onChange={set("state")} className={inputCls} placeholder="State or province" /></FormField>
                <FormField label="Country"><input type="text" value={form.country} onChange={set("country")} className={inputCls} placeholder="Country" /></FormField>
              </div>
            </FormCard>

            <FormCard title="Department">
              <FormField label="What department are you in?">
                <select value={pick} onChange={(e) => addDepartment(e.target.value)} className={selectCls}>
                  <option value="">{groups.length ? "Select a department" : "Loading departments…"}</option>
                  {groups.filter((g) => !departments.includes(g.id)).map((g) => <option key={g.id} value={g.id}>{g.name}</option>)}
                </select>
              </FormField>
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
