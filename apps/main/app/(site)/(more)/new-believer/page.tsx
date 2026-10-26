"use client";

import { FormHero } from "@ros/shared/kit/ui";

import { useState } from "react";
import Image from "next/image";
import Link from "@ros/shared/link";
import { FormField, FormCard, inputCls, selectCls, FormSheet, submitCls, inputClsNoW, selectClsNoW, textareaClsNoW } from "@ros/shared/kit/form";
import { post } from "@ros/shared/api";


export default function NewBelieverPage() {
  const [form, setForm] = useState({
    firstName: "", middleName: "", lastName: "",
    countryCode: "+234", phoneNumber: "", email: "",
    sex: "", street: "", city: "", state: "", country: "Nigeria",
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
      await post("/new-converts", {
        firstName: form.firstName,
        middleName: form.middleName || undefined,
        lastName: form.lastName,
        countryCode: form.countryCode,
        phoneNumber: form.phoneNumber,
        email: form.email || undefined,
        sex: form.sex,
        street: form.street || undefined,
        city: form.city || undefined,
        state: form.state || undefined,
        country: form.country || undefined,
      });
      setStatus("success");
    } catch (err: unknown) {
      setStatus("error");
      setError(err instanceof Error ? err.message : "Submission failed. Please try again.");
    }
  }

  return (
    <div>
      <FormHero pill="FORMS" title={<>I'm a New <span className="text-textRed">Believer</span></>} subtitle="Congratulations on your decision to follow Jesus! Register below and we will connect you to resources and people to help you grow in faith." />

      {/* What to Expect */}
      <section className="ros:bg-[#F4F4F4] ros:px-4 ros:md:px-[60px] ros:lg:px-[120px] ros:py-[84px] ros:flex ros:flex-col ros:gap-[48px] ros:items-center ros:w-full">
        <h2 className="ros-anton ros:uppercase ros:text-[#000000] ros:text-[48px] ros:leading-normal ros:text-center">
          What Happens Next?
        </h2>
        <div className="ros:grid ros:gap-[24px] ros:w-full" style={{ gridTemplateColumns: "repeat(3, 1fr)" }}>
          {[
            { step: "01", title: "Believer's Class", desc: "Join our free believer's class to understand your new faith, the church, and how to live as a Christian." },
            { step: "02", title: "Personal Follow-up", desc: "A dedicated team member will reach out to welcome you and answer any questions you may have." },
            { step: "03", title: "Join a Group", desc: "Get connected to a small group or ministry within the church where you can grow and build relationships." },
          ].map((item) => (
            <div key={item.step} className="ros:bg-white ros:rounded-[16px] ros:flex ros:flex-col ros:gap-[16px] ros:p-[32px] ros:shadow-[0px_4px_20px_rgba(0,0,0,0.08)]">
              <span className="ros:text-[#DF4E4E] ros:text-[48px] ros:font-bold ros:leading-none">{item.step}</span>
              <h3 className="ros:text-[#000000] ros:text-[20px] ros:font-bold ros:leading-normal">{item.title}</h3>
              <p className="ros:text-[#A3A1AF] ros:text-[16px] ros:font-normal ros:leading-[1.6]">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Registration Form */}
      <FormSheet>
        <h2 className="ros-anton ros:uppercase ros:text-[#DF4E4E] ros:text-[48px] ros:leading-normal ros:text-center">
          Register as a New Believer
        </h2>
        <p className="ros:text-[#6B7280] ros:text-[20px] ros:font-normal ros:leading-normal ros:text-center ros:max-w-[700px]">
          Fill out the form below and a member of our New Converts team will reach out to you.
        </p>

        {status === "success" ? (
          <div className="ros:bg-white ros:rounded-2xl ros:p-10 ros:shadow-sm ros:flex ros:flex-col ros:gap-[24px] ros:items-center ros:max-w-[600px] ros:text-center">
            <svg width="64" height="64" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
              <circle cx="32" cy="32" r="32" fill="#16A34A" fillOpacity="0.12" />
              <circle cx="32" cy="32" r="24" fill="#16A34A" fillOpacity="0.2" />
              <path d="M20 32L28 40L44 24" stroke="#16A34A" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            <p className="ros:text-[#111827] ros:text-[25px] ros:font-medium">Welcome to the Kingdom!</p>
            <p className="ros:text-[#6B7280] ros:text-[20px] ros:font-normal">
              Your registration has been received. Our New Converts team will contact you shortly. Heaven is rejoicing over your decision!
            </p>
            <Link
              href="/trainings/water-baptism"
              className={submitCls}
             
            >
              Register for Water Baptism →
            </Link>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="ros:flex ros:flex-col ros:gap-[16px] ros:w-full ros:max-w-[700px]">
            <FormCard title="Personal Information">
              <div className="ros:flex ros:flex-col ros:gap-[16px]">
                <div className="ros:grid ros:grid-cols-1 ros:sm:grid-cols-3 ros:gap-[16px]">
                  <FormField label="First Name" required>
                    <input type="text" required value={form.firstName} onChange={set("firstName")} className={inputCls} placeholder="First name" />
                  </FormField>
                  <FormField label="Middle Name">
                    <input type="text" value={form.middleName} onChange={set("middleName")} className={inputCls} placeholder="Middle name" />
                  </FormField>
                  <FormField label="Last Name" required>
                    <input type="text" required value={form.lastName} onChange={set("lastName")} className={inputCls} placeholder="Last name" />
                  </FormField>
                </div>
                <FormField label="Gender" required>
                  <select required value={form.sex} onChange={set("sex")} className={selectCls}>
                    <option value="">Select gender</option>
                    <option value="MALE">Male</option>
                    <option value="FEMALE">Female</option>
                  </select>
                </FormField>
              </div>
            </FormCard>

            <FormCard title="Contact Details">
              <div className="ros:flex ros:flex-col ros:gap-[16px]">
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
                  <FormField label="Email Address">
                    <input type="email" value={form.email} onChange={set("email")} className={inputCls} placeholder="your@email.com" />
                  </FormField>
                </div>
              </div>
            </FormCard>

            <FormCard title="Home Address">
              <div className="ros:flex ros:flex-col ros:gap-[16px]">
                <FormField label="Street Address">
                  <input type="text" value={form.street} onChange={set("street")} className={inputCls} placeholder="Street address" />
                </FormField>
                <div className="ros:grid ros:grid-cols-1 ros:sm:grid-cols-3 ros:gap-[16px]">
                  <FormField label="City">
                    <input type="text" value={form.city} onChange={set("city")} className={inputCls} placeholder="City" />
                  </FormField>
                  <FormField label="State">
                    <input type="text" value={form.state} onChange={set("state")} className={inputCls} placeholder="State" />
                  </FormField>
                  <FormField label="Country">
                    <input type="text" value={form.country} onChange={set("country")} className={inputCls} />
                  </FormField>
                </div>
              </div>
            </FormCard>

            {status === "error" && (
              <p className="ros:text-[#FF383C] ros:text-[14px] ros:font-normal ros:text-center">{error}</p>
            )}

            <div className="ros:flex ros:justify-center ros:mt-[8px]">
              <button
                type="submit"
                disabled={status === "loading"}
                className={submitCls}
               
              >
                {status === "loading" ? "Submitting..." : "REGISTER"}
              </button>
            </div>
          </form>
        )}
      </FormSheet>
    </div>
  );
}
