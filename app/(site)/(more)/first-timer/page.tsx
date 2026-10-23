"use client";

import { FormHero } from "@/app/(site)/(more)/_kit/ui";

import { useState } from "react";
import Image from "next/image";
import { FormField, FormCard, inputCls, selectCls, textareaCls, FormSheet, submitCls, inputClsNoW, selectClsNoW, textareaClsNoW } from "@/app/(site)/(more)/_kit/form";
import { post } from "@/lib/api";


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
    <div>
      <FormHero pill="FORMS" title={<>First-Timer <span className="text-textRed">Registration</span></>} subtitle="Welcome! We are so glad you joined us today. Please fill out this form so we can stay connected with you." />

      {/* Form Section */}
      <FormSheet>
        <div className="ros:w-full ros:max-w-[860px] ros:flex ros:flex-col ros:gap-[8px] ros:items-center ros:text-center ros:mb-2">
          <h2 className="ros-anton ros:uppercase ros:text-[#DF4E4E] ros:text-[28px] ros:md:text-[36px]">Tell Us About Yourself</h2>
          <p className="ros:text-[#6B7280] ros:text-[15px]">All fields marked * are required</p>
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
              Your registration has been received. A member of our team will be in touch soon to warmly welcome you into our church family.
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

              <div className="ros:grid ros:grid-cols-1 ros:sm:grid-cols-2 ros:gap-4 ros:mt-4">
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

              <div className="ros:mt-4">
                <FormField label="Street Address">
                  <input type="text" value={form.street} onChange={set("street")} className={inputCls} placeholder="Street address" />
                </FormField>
              </div>

              <div className="ros:grid ros:grid-cols-1 ros:sm:grid-cols-3 ros:gap-4 ros:mt-4">
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
              <div className="ros:grid ros:grid-cols-1 ros:sm:grid-cols-2 ros:gap-4">
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

              <div className="ros:grid ros:grid-cols-1 ros:sm:grid-cols-2 ros:gap-4 ros:mt-4">
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

              <div className="ros:mt-4">
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

              <div className="ros:mt-4">
                <label className="ros:flex ros:items-center ros:gap-2 ros:text-[14px] ros:font-semibold ros:text-[#111827] ros:cursor-pointer">
                  <input
                    type="checkbox"
                    checked={form.worshippedOnline}
                    onChange={(e) => setForm((p) => ({ ...p, worshippedOnline: e.target.checked }))}
                    className="ros:h-4 ros:w-4 ros:rounded ros:border-[#E5E7EB] ros:text-[#DF4E4E] ros:focus:ring-[#DF4E4E]"
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
              <p className="ros:text-red-500 ros:text-[14px] ros:text-center">{error}</p>
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
