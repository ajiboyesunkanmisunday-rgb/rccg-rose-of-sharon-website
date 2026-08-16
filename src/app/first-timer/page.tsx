"use client";

import { useState } from "react";
import Image from "next/image";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { FormField, inputCls, wrapCls, selectCls, SectionHeading } from "@/components/ui/FormField";
import { post } from "@/lib/api";

const vs = { fontVariationSettings: '"wdth" 100' };

const mediumOptions = [
  "Friend / Family", "Social Media", "Flyer / Poster", "Online Search", "TV / Radio", "Walk-in", "Other",
];

const serviceRatings = [
  { value: 5, label: "5 — Excellent" },
  { value: 4, label: "4 — Very Good" },
  { value: 3, label: "3 — Good" },
  { value: 2, label: "2 — Fair" },
  { value: 1, label: "1 — Poor" },
];

export default function FirstTimerPage() {
  const [form, setForm] = useState({
    firstName: "", middleName: "", lastName: "",
    countryCode: "+234", phoneNumber: "",
    email: "", sex: "", maritalStatus: "",
    dayOfBirth: "", monthOfBirth: "", yearOfBirth: "",
    street: "", city: "", state: "", country: "Nigeria",
    mediumOfInvitation: "", occupation: "",
    serviceRating: "", favouritePartOfService: "",
    isVisiting: "false",
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
      await post("/users/first-timer", {
        firstName: form.firstName,
        middleName: form.middleName || undefined,
        lastName: form.lastName,
        countryCode: form.countryCode,
        phoneNumber: form.phoneNumber,
        email: form.email || undefined,
        sex: form.sex,
        maritalStatus: form.maritalStatus || undefined,
        dayOfBirth: form.dayOfBirth ? parseInt(form.dayOfBirth) : undefined,
        monthOfBirth: form.monthOfBirth ? parseInt(form.monthOfBirth) : undefined,
        yearOfBirth: form.yearOfBirth ? parseInt(form.yearOfBirth) : undefined,
        street: form.street || undefined,
        city: form.city || undefined,
        state: form.state || undefined,
        country: form.country || undefined,
        mediumOfInvitation: form.mediumOfInvitation || undefined,
        occupation: form.occupation || undefined,
        serviceRating: form.serviceRating ? parseInt(form.serviceRating) : undefined,
        favouritePartOfService: form.favouritePartOfService || undefined,
        isVisiting: form.isVisiting === "true",
        fromOnline: false,
      });
      setStatus("success");
    } catch (err: unknown) {
      setStatus("error");
      setError(err instanceof Error ? err.message : "Submission failed. Please try again.");
    }
  }

  return (
    <main>
      <section className="relative h-[500px] w-full overflow-hidden flex items-center justify-center">
        <div className="absolute inset-0">
          <Image src="/assets/hero-bg.png" alt="" fill className="object-cover pointer-events-none" priority />
          <div className="absolute inset-0 bg-[rgba(16,14,26,0.72)]" />
        </div>
        <Navbar />
        <div className="absolute left-1/2 top-[calc(50%+48px)] -translate-x-1/2 -translate-y-1/2 flex flex-col gap-[24px] items-center w-[1148px] z-10 text-center">
          <h1 className="text-[#FFFDFD] text-[72px] font-medium leading-normal w-full" style={vs}>
            First-Timer Registration
          </h1>
          <p className="text-[#FFFDFD] text-[20px] font-normal leading-[32px] w-full" style={vs}>
            Welcome! We are so glad you joined us today. Please fill out this form so we can stay connected with you.
          </p>
        </div>
      </section>

      <section className="bg-[#100E1A] px-[120px] py-[84px] flex flex-col gap-[32px] items-center w-full">
        <h2 className="text-[#FFFDFD] text-[48px] font-bold leading-normal text-center" style={vs}>
          Tell Us About Yourself
        </h2>

        {status === "success" ? (
          <div className="flex flex-col gap-[16px] items-center max-w-[600px] text-center">
            <div className="size-[80px] rounded-full bg-[#000080] flex items-center justify-center text-[36px] text-white">✓</div>
            <p className="text-[#FFFDFD] text-[25px] font-medium" style={vs}>Welcome to the Family!</p>
            <p className="text-[#A3A1AF] text-[16px] font-normal" style={vs}>
              Your registration has been received. A member of our team will be in touch soon to warmly welcome you into our church family.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="flex flex-col gap-[16px] w-full max-w-[800px]">
            <SectionHeading>Personal Information</SectionHeading>

            <div className="grid grid-cols-3 gap-[16px] w-full">
              <FormField label="First Name" required>
                <div className={wrapCls}>
                  <input type="text" required value={form.firstName} onChange={set("firstName")} className={inputCls} placeholder="First name" />
                </div>
              </FormField>
              <FormField label="Middle Name">
                <div className={wrapCls}>
                  <input type="text" value={form.middleName} onChange={set("middleName")} className={inputCls} placeholder="Middle name" />
                </div>
              </FormField>
              <FormField label="Last Name" required>
                <div className={wrapCls}>
                  <input type="text" required value={form.lastName} onChange={set("lastName")} className={inputCls} placeholder="Last name" />
                </div>
              </FormField>
            </div>

            <div className="grid grid-cols-2 gap-[16px] w-full">
              <FormField label="Gender" required>
                <div className={wrapCls}>
                  <select required value={form.sex} onChange={set("sex")} className={selectCls}>
                    <option value="">Select gender</option>
                    <option value="MALE">Male</option>
                    <option value="FEMALE">Female</option>
                  </select>
                </div>
              </FormField>
              <FormField label="Marital Status">
                <div className={wrapCls}>
                  <select value={form.maritalStatus} onChange={set("maritalStatus")} className={selectCls}>
                    <option value="">Select status</option>
                    <option value="SINGLE">Single</option>
                    <option value="MARRIED">Married</option>
                    <option value="DIVORCED">Divorced</option>
                    <option value="WIDOWED">Widowed</option>
                  </select>
                </div>
              </FormField>
            </div>

            <div className="grid grid-cols-3 gap-[16px] w-full">
              <FormField label="Day of Birth">
                <div className={wrapCls}>
                  <input type="number" min={1} max={31} value={form.dayOfBirth} onChange={set("dayOfBirth")} className={inputCls} placeholder="DD" />
                </div>
              </FormField>
              <FormField label="Month of Birth">
                <div className={wrapCls}>
                  <select value={form.monthOfBirth} onChange={set("monthOfBirth")} className={selectCls}>
                    <option value="">Month</option>
                    {["January","February","March","April","May","June","July","August","September","October","November","December"].map((m, i) => (
                      <option key={m} value={i + 1}>{m}</option>
                    ))}
                  </select>
                </div>
              </FormField>
              <FormField label="Year of Birth">
                <div className={wrapCls}>
                  <input type="number" min={1920} max={new Date().getFullYear()} value={form.yearOfBirth} onChange={set("yearOfBirth")} className={inputCls} placeholder="YYYY" />
                </div>
              </FormField>
            </div>

            <SectionHeading>Contact Details</SectionHeading>

            <div className="grid grid-cols-2 gap-[16px] w-full">
              <FormField label="Phone Number" required>
                <div className="flex gap-[8px] w-full h-[40px]">
                  <div className="bg-[#FFFDFD] border border-[#A3A1AF] rounded-[4px] flex-shrink-0 w-[90px] flex items-center">
                    <select value={form.countryCode} onChange={set("countryCode")} className="w-full h-full px-2 bg-transparent text-[#100E1A] text-sm focus:outline-none">
                      <option value="+234">+234</option>
                      <option value="+1">+1</option>
                      <option value="+44">+44</option>
                      <option value="+33">+33</option>
                    </select>
                  </div>
                  <div className={`${wrapCls} flex-1`}>
                    <input type="tel" required value={form.phoneNumber} onChange={set("phoneNumber")} className={inputCls} placeholder="080 0000 0000" />
                  </div>
                </div>
              </FormField>
              <FormField label="Email Address">
                <div className={wrapCls}>
                  <input type="email" value={form.email} onChange={set("email")} className={inputCls} placeholder="your@email.com" />
                </div>
              </FormField>
            </div>

            <FormField label="Home Address">
              <div className={wrapCls}>
                <input type="text" value={form.street} onChange={set("street")} className={inputCls} placeholder="Street address" />
              </div>
            </FormField>

            <div className="grid grid-cols-3 gap-[16px] w-full">
              <FormField label="City">
                <div className={wrapCls}>
                  <input type="text" value={form.city} onChange={set("city")} className={inputCls} placeholder="City" />
                </div>
              </FormField>
              <FormField label="State">
                <div className={wrapCls}>
                  <input type="text" value={form.state} onChange={set("state")} className={inputCls} placeholder="State" />
                </div>
              </FormField>
              <FormField label="Country">
                <div className={wrapCls}>
                  <input type="text" value={form.country} onChange={set("country")} className={inputCls} placeholder="Country" />
                </div>
              </FormField>
            </div>

            <SectionHeading>About Your Visit</SectionHeading>

            <div className="grid grid-cols-2 gap-[16px] w-full">
              <FormField label="Occupation">
                <div className={wrapCls}>
                  <input type="text" value={form.occupation} onChange={set("occupation")} className={inputCls} placeholder="Your occupation" />
                </div>
              </FormField>
              <FormField label="How Did You Hear About Us?">
                <div className={wrapCls}>
                  <select value={form.mediumOfInvitation} onChange={set("mediumOfInvitation")} className={selectCls}>
                    <option value="">Select option</option>
                    {mediumOptions.map((m) => <option key={m} value={m}>{m}</option>)}
                  </select>
                </div>
              </FormField>
            </div>

            <div className="grid grid-cols-2 gap-[16px] w-full">
              <FormField label="Service Rating">
                <div className={wrapCls}>
                  <select value={form.serviceRating} onChange={set("serviceRating")} className={selectCls}>
                    <option value="">Rate today&apos;s service</option>
                    {serviceRatings.map((r) => <option key={r.value} value={r.value}>{r.label}</option>)}
                  </select>
                </div>
              </FormField>
              <FormField label="Are You Visiting?">
                <div className={wrapCls}>
                  <select value={form.isVisiting} onChange={set("isVisiting")} className={selectCls}>
                    <option value="false">No — looking for a church home</option>
                    <option value="true">Yes — just visiting</option>
                  </select>
                </div>
              </FormField>
            </div>

            <FormField label="Favourite Part of the Service">
              <div className="bg-[#FFFDFD] border border-[#A3A1AF] rounded-[10px] w-full min-h-[100px]">
                <textarea
                  value={form.favouritePartOfService}
                  onChange={set("favouritePartOfService")}
                  className="w-full h-full min-h-[100px] px-3 py-2 bg-transparent text-[#100E1A] text-sm focus:outline-none rounded-[10px] resize-none"
                  placeholder="What did you enjoy most about today's service?"
                />
              </div>
            </FormField>

            {status === "error" && (
              <p className="text-[#FF383C] text-[14px] font-normal text-center" style={vs}>{error}</p>
            )}

            <div className="flex justify-center mt-[8px]">
              <button
                type="submit"
                disabled={status === "loading"}
                className="bg-[#000080] drop-shadow-[19px_19px_20px_rgba(0,0,0,0.1)] px-[32px] py-[16px] rounded-[33px] text-[#FFFDFD] text-[25px] font-medium hover:bg-[#0000a0] transition-colors disabled:opacity-60"
                style={vs}
              >
                {status === "loading" ? "Submitting..." : "REGISTER"}
              </button>
            </div>
          </form>
        )}
      </section>

      <Footer />
    </main>
  );
}
