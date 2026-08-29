"use client";

import { useState } from "react";
import Image from "next/image";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { FormField, FormCard, inputCls, selectCls, textareaCls } from "@/components/ui/FormField";
import { post } from "@/lib/api";

const vs = { fontVariationSettings: '"wdth" 100' };

const months = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December",
];

export default function FirstTimerPage() {
  const [form, setForm] = useState({
    firstName: "", middleName: "", lastName: "",
    countryCode: "+234", phoneNumber: "",
    email: "", sex: "", maritalStatus: "",
    dobDay: "", dobMonth: "", dobYear: "",
    street: "", city: "", state: "", country: "Nigeria",
    mediumOfInvitation: "", occupation: "",
    howWasService: "", favouritePartOfService: "",
    worshippedOnline: false,
    attendRegularly: "", preferredContact: "",
    prayerRequest: "",
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
        dayOfBirth: form.dobDay ? parseInt(form.dobDay) : undefined,
        monthOfBirth: form.dobMonth ? parseInt(form.dobMonth) : undefined,
        yearOfBirth: form.dobYear ? parseInt(form.dobYear) : undefined,
        street: form.street || undefined,
        city: form.city || undefined,
        state: form.state || undefined,
        country: form.country || undefined,
        mediumOfInvitation: form.mediumOfInvitation || undefined,
        occupation: form.occupation || undefined,
        howWasService: form.howWasService || undefined,
        favouritePartOfService: form.favouritePartOfService || undefined,
        fromOnline: form.worshippedOnline,
        attendRegularly: form.attendRegularly || undefined,
        preferredContact: form.preferredContact || undefined,
        isVisiting: form.isVisiting === "true",
      });
      setStatus("success");
    } catch (err: unknown) {
      setStatus("error");
      setError(err instanceof Error ? err.message : "Submission failed. Please try again.");
    }
  }

  return (
    <main>
      {/* Hero */}
      <section className="relative min-h-[400px] md:h-[500px] w-full overflow-hidden flex items-center justify-center">
        <div className="absolute inset-0">
          <Image src="/assets/hero-bg.png" alt="" fill className="object-cover pointer-events-none" priority />
          <div className="absolute inset-0 bg-[rgba(16,14,26,0.72)]" />
        </div>
        <Navbar />
        <div className="relative z-10 w-full max-w-[900px] px-6 mt-16 md:mt-[48px] flex flex-col gap-[16px] items-center text-center">
          <h1 className="text-[#FFFDFD] text-[36px] md:text-[56px] lg:text-[72px] font-medium leading-tight" style={vs}>
            First-Timer Registration
          </h1>
          <p className="text-[#FFFDFD] text-[16px] md:text-[18px] font-normal leading-[1.6]" style={vs}>
            Welcome! We are so glad you joined us today. Please fill out this form so we can stay connected with you.
          </p>
        </div>
      </section>

      {/* Form Section */}
      <section className="bg-[#F3F4F6] px-4 md:px-[60px] lg:px-[120px] py-[48px] md:py-[72px] flex flex-col gap-[24px] items-center w-full">
        <div className="w-full max-w-[860px] flex flex-col gap-[8px] items-center text-center mb-2">
          <h2 className="text-[#000080] text-[28px] md:text-[36px] font-bold" style={vs}>Tell Us About Yourself</h2>
          <p className="text-[#6B7280] text-[15px]" style={vs}>All fields marked * are required</p>
        </div>

        {status === "success" ? (
          <div className="flex flex-col gap-[16px] items-center max-w-[500px] text-center bg-white rounded-2xl p-10 shadow-sm">
            <div className="size-[72px] rounded-full bg-green-100 flex items-center justify-center">
              <svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="#16a34a" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="20 6 9 17 4 12" />
              </svg>
            </div>
            <p className="text-[#000080] text-[22px] font-bold" style={vs}>Welcome to the Family!</p>
            <p className="text-[#6B7280] text-[15px]" style={vs}>
              Your registration has been received. A member of our team will be in touch soon to warmly welcome you into our church family.
            </p>
            <button
              onClick={() => setStatus("idle")}
              className="text-[#000080] text-[14px] font-medium hover:underline"
              style={vs}
            >
              Submit another registration
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="flex flex-col gap-[16px] w-full max-w-[860px]">

            {/* Personal Information */}
            <FormCard title="Personal Information">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
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

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
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

              <div className="mt-4">
                <label className="block text-[14px] font-semibold text-[#111827] mb-2">Date of Birth</label>
                <div className="grid grid-cols-3 gap-3">
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

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
                <FormField label="Occupation">
                  <input type="text" value={form.occupation} onChange={set("occupation")} className={inputCls} placeholder="Your occupation" />
                </FormField>
                <FormField label="Visiting today?">
                  <select value={form.isVisiting} onChange={set("isVisiting")} className={selectCls}>
                    <option value="false">No — looking for a church home</option>
                    <option value="true">Yes — just visiting</option>
                  </select>
                </FormField>
              </div>
            </FormCard>

            {/* Contact Details */}
            <FormCard title="Contact Details">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <FormField label="Phone Number" required>
                  <div className="flex gap-2">
                    <select value={form.countryCode} onChange={set("countryCode")} className={`${selectCls} w-[100px] flex-shrink-0`}>
                      <option value="+234">+234</option>
                      <option value="+1">+1</option>
                      <option value="+44">+44</option>
                      <option value="+27">+27</option>
                      <option value="+33">+33</option>
                    </select>
                    <input type="tel" required value={form.phoneNumber} onChange={set("phoneNumber")} className={`${inputCls} flex-1`} placeholder="080 0000 0000" />
                  </div>
                </FormField>
                <FormField label="Email Address">
                  <input type="email" value={form.email} onChange={set("email")} className={inputCls} placeholder="your@email.com" />
                </FormField>
              </div>

              <div className="mt-4">
                <FormField label="Street Address">
                  <input type="text" value={form.street} onChange={set("street")} className={inputCls} placeholder="Street address" />
                </FormField>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-4">
                <FormField label="City">
                  <input type="text" value={form.city} onChange={set("city")} className={inputCls} placeholder="City" />
                </FormField>
                <FormField label="State">
                  <input type="text" value={form.state} onChange={set("state")} className={inputCls} placeholder="State" />
                </FormField>
                <FormField label="Country">
                  <input type="text" value={form.country} onChange={set("country")} className={inputCls} placeholder="Country" />
                </FormField>
              </div>
            </FormCard>

            {/* About Your Visit */}
            <FormCard title="About Your Visit">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <FormField label="How did you hear about us?">
                  <select value={form.mediumOfInvitation} onChange={set("mediumOfInvitation")} className={selectCls}>
                    <option value="">Select option</option>
                    <option value="Friends & Family">Friends &amp; Family</option>
                    <option value="Billboard">Billboard</option>
                    <option value="Flyer">Flyer</option>
                    <option value="Crusade">Crusade</option>
                    <option value="TV & Radio">TV &amp; Radio</option>
                    <option value="Social Media">Social Media</option>
                    <option value="Others">Others</option>
                  </select>
                </FormField>
                <FormField label="How was our service?">
                  <select value={form.howWasService} onChange={set("howWasService")} className={selectCls}>
                    <option value="">Select</option>
                    <option value="Average">Average</option>
                    <option value="Good">Good</option>
                    <option value="Very Good">Very Good</option>
                    <option value="Excellent">Excellent</option>
                  </select>
                </FormField>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
                <FormField label="Favourite part of the service">
                  <select value={form.favouritePartOfService} onChange={set("favouritePartOfService")} className={selectCls}>
                    <option value="">Select</option>
                    <option value="Music">Music</option>
                    <option value="Media">Media</option>
                    <option value="Sermon">Sermon</option>
                    <option value="Ambience">Ambience</option>
                    <option value="Hospitality">Hospitality</option>
                    <option value="Friendliness">Friendliness</option>
                  </select>
                </FormField>
                <FormField label="Would you consider attending regularly?">
                  <select value={form.attendRegularly} onChange={set("attendRegularly")} className={selectCls}>
                    <option value="">Select option</option>
                    <option value="Yes">Yes</option>
                    <option value="No">No</option>
                    <option value="Maybe">Maybe</option>
                  </select>
                </FormField>
              </div>

              <div className="mt-4">
                <FormField label="Preferred means of contact">
                  <select value={form.preferredContact} onChange={set("preferredContact")} className={selectCls}>
                    <option value="">Select option</option>
                    <option value="Call">Call</option>
                    <option value="WhatsApp">WhatsApp</option>
                    <option value="Email">Email</option>
                    <option value="SMS">SMS</option>
                  </select>
                </FormField>
              </div>

              <div className="mt-4">
                <label className="flex items-center gap-2 text-[14px] font-semibold text-[#111827] cursor-pointer">
                  <input
                    type="checkbox"
                    checked={form.worshippedOnline}
                    onChange={(e) => setForm((p) => ({ ...p, worshippedOnline: e.target.checked }))}
                    className="h-4 w-4 rounded border-[#E5E7EB] text-[#000080] focus:ring-[#000080]"
                  />
                  Have you worshipped with us online before?
                </label>
              </div>
            </FormCard>

            {/* Prayer Request */}
            <FormCard title="Prayer Request (Optional)">
              <FormField label="Share your prayer request with us">
                <textarea
                  value={form.prayerRequest}
                  onChange={set("prayerRequest")}
                  rows={4}
                  className={textareaCls}
                  placeholder="Enter your prayer request (optional)"
                />
              </FormField>
            </FormCard>

            {status === "error" && (
              <p className="text-red-500 text-[14px] text-center" style={vs}>{error}</p>
            )}

            <div className="flex justify-center mt-[8px]">
              <button
                type="submit"
                disabled={status === "loading"}
                className="bg-[#000080] px-[40px] py-[16px] rounded-[33px] text-[#FFFDFD] text-[18px] md:text-[22px] font-medium hover:bg-[#0000a0] transition-colors disabled:opacity-60"
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
