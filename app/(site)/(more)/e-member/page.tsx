"use client";

import { FormHero } from "@/app/(site)/(more)/_kit/ui";

import { useState } from "react";
import Image from "next/image";
import { FormField, FormCard, inputCls, selectCls, FormSheet, submitCls, inputClsNoW, selectClsNoW, textareaClsNoW } from "@/app/(site)/(more)/_kit/form";
import { post } from "@/lib/api";


const months = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December",
];

export default function EMemberPage() {
  const [form, setForm] = useState({
    firstName: "", middleName: "", lastName: "",
    countryCode: "+234", phoneNumber: "", email: "",
    sex: "", maritalStatus: "",
    dobDay: "", dobMonth: "", dobYear: "",
    weddingDay: "", weddingMonth: "", weddingYear: "",
    state: "", country: "Nigeria",
    occupation: "",
  });
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [error, setError] = useState("");

  function set(k: string) {
    return (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) =>
      setForm((p) => ({ ...p, [k]: e.target.value }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("loading");
    setError("");
    try {
      await post("/users/e-member", {
        firstName: form.firstName,
        middleName: form.middleName || undefined,
        lastName: form.lastName,
        countryCode: form.countryCode,
        phoneNumber: form.phoneNumber,
        email: form.email || undefined,
        sex: form.sex,
        maritalStatus: form.maritalStatus || undefined,
        dayOfBirth: form.dobDay ? parseInt(form.dobDay) : undefined,
        monthOfBirth: form.dobMonth ? parseInt(form.dobMonth) : undefined,
        yearOfBirth: form.dobYear ? parseInt(form.dobYear) : undefined,
        dayOfWedding: form.weddingDay ? parseInt(form.weddingDay) : undefined,
        monthOfWedding: form.weddingMonth ? parseInt(form.weddingMonth) : undefined,
        yearOfWedding: form.weddingYear ? parseInt(form.weddingYear) : undefined,
        state: form.state || undefined,
        country: form.country || undefined,
        occupation: form.occupation || undefined,
      });
      setStatus("success");
    } catch (err: unknown) {
      setStatus("error");
      setError(err instanceof Error ? err.message : "Submission failed. Please try again.");
    }
  }

  return (
    <div>
      <FormHero pill="ONLINE MEMBERSHIP" title={<>Become an <span className="text-textRed">E-Member</span></>} subtitle="Register as an online member of RCCG Rose of Sharon and stay connected with your church family." />

      {/* Form Section */}
      <FormSheet>

        {/* Benefits */}
        <div className="ros:grid ros:grid-cols-1 ros:sm:grid-cols-3 ros:gap-4 ros:w-full ros:max-w-[860px]">
          {[
            { icon: "📋", title: "Church Records", desc: "Your details are securely stored in the church database" },
            { icon: "🔔", title: "Stay Updated", desc: "Receive announcements and church updates directly" },
            { icon: "🤝", title: "Stay Connected", desc: "Remain part of the Rose of Sharon family wherever you are" },
          ].map((b) => (
            <div key={b.title} className="ros:bg-white ros:rounded-xl ros:p-5 ros:flex ros:flex-col ros:gap-[8px] ros:border ros:border-[#E5E7EB] ros:text-center">
              <span className="ros:text-[28px]">{b.icon}</span>
              <p className="ros:text-[#DF4E4E] ros:text-[14px] ros:font-bold">{b.title}</p>
              <p className="ros:text-[#6B7280] ros:text-[13px] ros:leading-[1.5]">{b.desc}</p>
            </div>
          ))}
        </div>

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
              onClick={() => setStatus("idle")}
              className="ros:text-[#DF4E4E] ros:text-[14px] ros:font-medium ros:hover:underline"
             
            >
              Submit another registration
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="ros:flex ros:flex-col ros:gap-[16px] ros:w-full ros:max-w-[860px]">

            {/* Personal Information */}
            <FormCard title="Personal Information">
              <div className="ros:grid ros:grid-cols-1 ros:sm:grid-cols-2 ros:lg:grid-cols-3 ros:gap-4">
                <FormField label="First Name" required>
                  <input type="text" required value={form.firstName} onChange={set("firstName")} className={inputCls} placeholder="Enter first name" />
                </FormField>
                <FormField label="Middle Name">
                  <input type="text" value={form.middleName} onChange={set("middleName")} className={inputCls} placeholder="Enter middle name" />
                </FormField>
                <FormField label="Last Name" required>
                  <input type="text" required value={form.lastName} onChange={set("lastName")} className={inputCls} placeholder="Enter last name" />
                </FormField>
              </div>

              <div className="ros:grid ros:grid-cols-1 ros:sm:grid-cols-2 ros:gap-4 ros:mt-4">
                <FormField label="Gender" required>
                  <select required value={form.sex} onChange={set("sex")} className={selectCls}>
                    <option value="">Select gender</option>
                    <option value="MALE">Male</option>
                    <option value="FEMALE">Female</option>
                  </select>
                </FormField>
                <FormField label="Marital Status">
                  <select value={form.maritalStatus} onChange={set("maritalStatus")} className={selectCls}>
                    <option value="">Select status</option>
                    <option value="SINGLE">Single</option>
                    <option value="MARRIED">Married</option>
                    <option value="SEPARATED">Separated</option>
                    <option value="DIVORCED">Divorced</option>
                    <option value="SINGLE_PARENT">Single Parent</option>
                    <option value="WIDOWED">Widowed</option>
                  </select>
                </FormField>
              </div>

              <div className="ros:mt-4">
                <label className="ros:block ros:text-[14px] ros:font-semibold ros:text-[#111827] ros:mb-2">Date of Birth</label>
                <div className="ros:grid ros:grid-cols-3 ros:gap-3">
                  <select value={form.dobDay} onChange={set("dobDay")} className={selectCls}>
                    <option value="">Day</option>
                    {Array.from({ length: 31 }, (_, i) => i + 1).map((d) => (
                      <option key={d} value={d}>{d}</option>
                    ))}
                  </select>
                  <select value={form.dobMonth} onChange={set("dobMonth")} className={selectCls}>
                    <option value="">Month</option>
                    {months.map((m, i) => <option key={m} value={i + 1}>{m}</option>)}
                  </select>
                  <select value={form.dobYear} onChange={set("dobYear")} className={selectCls}>
                    <option value="">Year</option>
                    {Array.from({ length: 100 }, (_, i) => new Date().getFullYear() - i).map((y) => (
                      <option key={y} value={y}>{y}</option>
                    ))}
                  </select>
                </div>
              </div>

              {form.maritalStatus === "MARRIED" && (
                <div className="ros:mt-4">
                  <label className="ros:block ros:text-[14px] ros:font-semibold ros:text-[#111827] ros:mb-2">Wedding Anniversary</label>
                  <div className="ros:grid ros:grid-cols-3 ros:gap-3">
                    <select value={form.weddingDay} onChange={set("weddingDay")} className={selectCls}>
                      <option value="">Day</option>
                      {Array.from({ length: 31 }, (_, i) => i + 1).map((d) => (
                        <option key={d} value={d}>{d}</option>
                      ))}
                    </select>
                    <select value={form.weddingMonth} onChange={set("weddingMonth")} className={selectCls}>
                      <option value="">Month</option>
                      {months.map((m, i) => <option key={m} value={i + 1}>{m}</option>)}
                    </select>
                    <select value={form.weddingYear} onChange={set("weddingYear")} className={selectCls}>
                      <option value="">Year</option>
                      {Array.from({ length: 80 }, (_, i) => new Date().getFullYear() - i).map((y) => (
                        <option key={y} value={y}>{y}</option>
                      ))}
                    </select>
                  </div>
                </div>
              )}

              <div className="ros:mt-4">
                <FormField label="Occupation / Profession">
                  <input type="text" value={form.occupation} onChange={set("occupation")} className={inputCls} placeholder="Your occupation" />
                </FormField>
              </div>
            </FormCard>

            {/* Contact Details */}
            <FormCard title="Contact &amp; Location">
              <div className="ros:grid ros:grid-cols-1 ros:sm:grid-cols-2 ros:gap-4">
                <FormField label="Phone Number" required>
                  <div className="ros:flex ros:gap-2">
                    <select value={form.countryCode} onChange={set("countryCode")} className={`${selectClsNoW} ros:w-[100px] ros:flex-shrink-0`}>
                      <option value="+234">+234</option>
                      <option value="+1">+1</option>
                      <option value="+44">+44</option>
                      <option value="+27">+27</option>
                      <option value="+33">+33</option>
                    </select>
                    <input type="tel" required value={form.phoneNumber} onChange={set("phoneNumber")} className={`${inputCls} ros:flex-1`} placeholder="080 0000 0000" />
                  </div>
                </FormField>
                <FormField label="Email Address">
                  <input type="email" value={form.email} onChange={set("email")} className={inputCls} placeholder="your@email.com" />
                </FormField>
              </div>

              <div className="ros:grid ros:grid-cols-1 ros:sm:grid-cols-2 ros:gap-4 ros:mt-4">
                <FormField label="State / City">
                  <input type="text" value={form.state} onChange={set("state")} className={inputCls} placeholder="State or city" />
                </FormField>
                <FormField label="Country">
                  <input type="text" value={form.country} onChange={set("country")} className={inputCls} placeholder="Country" />
                </FormField>
              </div>
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
