"use client";

import { useState } from "react";
import { FormHero } from "@ros/shared/kit/ui";
import { FormField, FormCard, inputCls, selectCls, FormSheet, submitCls } from "@ros/shared/kit/form";
import { post } from "@ros/shared/api";
import ProgramTabs from "@/components/ProgramTabs";

const DAYS = Array.from({ length: 31 }, (_, i) => String(i + 1));
const MONTHS = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

export default function BelieversClassRegisterPage() {
  const [form, setForm] = useState({
    firstName: "", middleName: "", lastName: "", sex: "", maritalStatus: "",
    dobDay: "", dobMonth: "", dobYear: "",
    countryCode: "+234", phoneNumber: "", email: "",
    street: "", city: "", state: "", country: "Nigeria",
    slot: "", notes: "",
  });
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [error, setError] = useState("");

  function set(k: string) {
    return (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) =>
      setForm((p) => ({ ...p, [k]: e.target.value }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("loading");
    setError("");
    try {
      // the New Converts list is where the church team follows up believers class enrolments
      await post("/new-converts", {
        firstName: form.firstName,
        middleName: form.middleName || undefined,
        lastName: form.lastName,
        countryCode: form.countryCode.replace(/^\+/, ""),
        phoneNumber: form.phoneNumber,
        email: form.email || undefined,
        sex: form.sex,
        street: form.street || undefined,
        city: form.city || undefined,
        state: form.state || undefined,
        country: form.country || undefined,
      });
      // the class details have no field on that record yet, so they go in as a note the team can read
      const dob = form.dobDay && form.dobMonth && form.dobYear ? `${form.dobDay} ${MONTHS[parseInt(form.dobMonth) - 1]} ${form.dobYear}` : "";
      const lines = [
        `Name: ${[form.firstName, form.middleName, form.lastName].filter(Boolean).join(" ")}`,
        `Phone: ${form.countryCode} ${form.phoneNumber}`,
        form.email && `Email: ${form.email}`,
        form.maritalStatus && `Marital status: ${form.maritalStatus}`,
        dob && `Date of birth: ${dob}`,
        form.slot && `Preferred class time: ${form.slot}`,
        form.notes && `Notes: ${form.notes}`,
      ].filter(Boolean);
      await post("/requests/suggestion", { subject: "Believers Class — New Enrolment", content: lines.join("\n") }).catch(() => undefined);
      setStatus("success");
    } catch (err: unknown) {
      setStatus("error");
      setError(err instanceof Error ? err.message : "Submission failed. Please try again.");
    }
  }

  return (
    <div>
      <FormHero pill="FORMS" title={<>Believers <span className="text-textRed">Class</span></>} subtitle="Step 1 of the training path. Register below and the training office will confirm the next class date and venue with you." />
      <FormSheet>
        <ProgramTabs slug="believers-class" />
        <h2 className="ros-anton ros:uppercase ros:text-[#DF4E4E] ros:text-[36px] ros:md:text-[48px] ros:leading-normal ros:text-center">New Enrolment</h2>
        <p className="ros:text-[#6B7280] ros:text-[16px] ros:md:text-[20px] ros:font-normal ros:leading-normal ros:text-center ros:max-w-[700px]">Please provide your details.</p>

        {status === "success" ? (
          <div className="ros:bg-white ros:rounded-2xl ros:p-10 ros:shadow-sm ros:flex ros:flex-col ros:gap-[24px] ros:items-center ros:max-w-[600px] ros:text-center">
            <svg width="64" height="64" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
              <circle cx="32" cy="32" r="32" fill="#16A34A" fillOpacity="0.12" />
              <circle cx="32" cy="32" r="24" fill="#16A34A" fillOpacity="0.2" />
              <path d="M20 32L28 40L44 24" stroke="#16A34A" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            <p className="ros:text-[#111827] ros:text-[25px] ros:font-medium">Thank you!</p>
            <p className="ros:text-[#6B7280] ros:text-[18px] ros:font-normal">Your enrolment has been received. We will contact you with the next class date.</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="ros:flex ros:flex-col ros:gap-[16px] ros:w-full ros:max-w-[700px]">
            <FormCard title="Personal Information">
              <div className="ros:flex ros:flex-col ros:gap-[16px]">
                <div className="ros:grid ros:grid-cols-1 ros:sm:grid-cols-3 ros:gap-[16px]">
                  <FormField label="First Name" required><input type="text" required value={form.firstName} onChange={set("firstName")} className={inputCls} placeholder="First name" /></FormField>
                  <FormField label="Middle Name"><input type="text" value={form.middleName} onChange={set("middleName")} className={inputCls} placeholder="Middle name" /></FormField>
                  <FormField label="Last Name" required><input type="text" required value={form.lastName} onChange={set("lastName")} className={inputCls} placeholder="Last name" /></FormField>
                </div>
                <div className="ros:grid ros:grid-cols-1 ros:sm:grid-cols-2 ros:gap-[16px]">
                  <FormField label="Gender" required>
                    <select required value={form.sex} onChange={set("sex")} className={selectCls}>
                      <option value="">Select gender</option>
                      <option value="MALE">Male</option>
                      <option value="FEMALE">Female</option>
                    </select>
                  </FormField>
                  <FormField label="Marital Status">
                    <select value={form.maritalStatus} onChange={set("maritalStatus")} className={selectCls}>
                      <option value="">Select marital status</option>
                      <option value="SINGLE">Single</option>
                      <option value="MARRIED">Married</option>
                      <option value="WIDOWED">Widowed</option>
                      <option value="DIVORCED">Divorced</option>
                    </select>
                  </FormField>
                </div>
                <FormField label="Date of Birth">
                  <div className="ros:grid ros:grid-cols-3 ros:gap-[8px]">
                    <select value={form.dobDay} onChange={set("dobDay")} className={selectCls}><option value="">Day</option>{DAYS.map((d) => <option key={d} value={d}>{d}</option>)}</select>
                    <select value={form.dobMonth} onChange={set("dobMonth")} className={selectCls}><option value="">Month</option>{MONTHS.map((m, i) => <option key={m} value={i + 1}>{m}</option>)}</select>
                    <input type="number" min={1900} max={new Date().getFullYear()} value={form.dobYear} onChange={set("dobYear")} className={inputCls} placeholder="Year" />
                  </div>
                </FormField>
              </div>
            </FormCard>

            <FormCard title="Contact Details">
              <div className="ros:grid ros:grid-cols-1 ros:sm:grid-cols-2 ros:gap-[16px]">
                <FormField label="Phone Number" required>
                  <div className="ros:flex ros:gap-[8px] ros:w-full">
                    <select value={form.countryCode} onChange={set("countryCode")} className="ros:rounded-lg ros:border ros:border-[#E5E7EB] ros:px-2 ros:py-3 ros:text-sm ros:text-[#374151] ros:outline-none ros:focus:border-[#DF4E4E] ros:focus:ring-1 ros:focus:ring-[#DF4E4E] ros:bg-white ros:flex-shrink-0 ros:w-[80px]">
                      <option value="+234">+234</option>
                      <option value="+1">+1</option>
                      <option value="+44">+44</option>
                    </select>
                    <input type="tel" required value={form.phoneNumber} onChange={set("phoneNumber")} className={`${inputCls} ros:flex-1`} placeholder="080 0000 0000" />
                  </div>
                </FormField>
                <FormField label="Email Address"><input type="email" value={form.email} onChange={set("email")} className={inputCls} placeholder="your@email.com" /></FormField>
              </div>
            </FormCard>

            <FormCard title="Home Address">
              <div className="ros:flex ros:flex-col ros:gap-[16px]">
                <FormField label="Street Address"><input type="text" value={form.street} onChange={set("street")} className={inputCls} placeholder="Street address" /></FormField>
                <div className="ros:grid ros:grid-cols-1 ros:sm:grid-cols-3 ros:gap-[16px]">
                  <FormField label="City"><input type="text" value={form.city} onChange={set("city")} className={inputCls} placeholder="City" /></FormField>
                  <FormField label="State"><input type="text" value={form.state} onChange={set("state")} className={inputCls} placeholder="State" /></FormField>
                  <FormField label="Country"><input type="text" value={form.country} onChange={set("country")} className={inputCls} /></FormField>
                </div>
              </div>
            </FormCard>

            <FormCard title="Class Preference">
              <div className="ros:flex ros:flex-col ros:gap-[16px]">
                <FormField label="Preferred class time">
                  <select value={form.slot} onChange={set("slot")} className={selectCls}>
                    <option value="">Select</option>
                    <option value="Sunday">Sunday</option>
                    <option value="Weekday evening">Weekday evening</option>
                    <option value="Online">Online</option>
                  </select>
                </FormField>
                <FormField label="Anything we should know?">
                  <textarea rows={3} value={form.notes} onChange={set("notes")} className={inputCls} />
                </FormField>
              </div>
            </FormCard>

            {status === "error" && <p className="ros:text-[#FF383C] ros:text-[14px] ros:font-normal ros:text-center">{error}</p>}

            <div className="ros:flex ros:justify-center ros:mt-[8px]">
              <button type="submit" disabled={status === "loading"} className={submitCls}>{status === "loading" ? "Submitting..." : "REGISTER"}</button>
            </div>
          </form>
        )}
      </FormSheet>
    </div>
  );
}
