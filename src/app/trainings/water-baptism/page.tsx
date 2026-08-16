"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { FormField, inputCls, wrapCls, selectCls, SectionHeading } from "@/components/ui/FormField";
import { post } from "@/lib/api";

const vs = { fontVariationSettings: '"wdth" 100' };

const months = ["January","February","March","April","May","June","July","August","September","October","November","December"];

export default function WaterBaptismPage() {
  const [form, setForm] = useState({
    firstName: "", middleName: "", lastName: "",
    countryCode: "+234", phoneNumber: "", sex: "",
    street: "", city: "", state: "", country: "Nigeria", stateOfOrigin: "",
    dateOfBirth: "", maritalStatus: "", noOfChildren: "", spouseName: "",
    occupation: "", employer: "",
    salvationDate: "", salvationLocation: "",
    holySpiritBaptismDate: "", holySpiritBaptismLocation: "",
    goneThroughNewConvertClass: "false",
    reasonForApplying: "", otherInformation: "",
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
      await post("/water-baptisms", {
        firstName: form.firstName,
        middleName: form.middleName || undefined,
        lastName: form.lastName,
        countryCode: form.countryCode,
        phoneNumber: form.phoneNumber,
        sex: form.sex,
        street: form.street || undefined,
        city: form.city || undefined,
        state: form.state || undefined,
        country: form.country || undefined,
        stateOfOrigin: form.stateOfOrigin || undefined,
        dateOfBirth: form.dateOfBirth || undefined,
        maritalStatus: form.maritalStatus || undefined,
        noOfChildren: form.noOfChildren ? parseInt(form.noOfChildren) : undefined,
        spouseName: form.spouseName || undefined,
        occupation: form.occupation || undefined,
        employer: form.employer || undefined,
        salvationDate: form.salvationDate || undefined,
        salvationLocation: form.salvationLocation || undefined,
        holySpiritBaptismDate: form.holySpiritBaptismDate || undefined,
        holySpiritBaptismLocation: form.holySpiritBaptismLocation || undefined,
        goneThroughNewConvertClass: form.goneThroughNewConvertClass === "true",
        reasonForApplying: form.reasonForApplying ? [form.reasonForApplying] : [],
        otherInformation: form.otherInformation || undefined,
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
          <div className="absolute inset-0 bg-[rgba(0,0,128,0.75)]" />
        </div>
        <Navbar activePage="trainings" />
        <div className="absolute left-1/2 top-[calc(50%+48px)] -translate-x-1/2 -translate-y-1/2 flex flex-col gap-[16px] items-center w-[1148px] z-10 text-center">
          <p className="text-[#B5B5F3] text-[16px] font-normal uppercase tracking-[0.15em]" style={vs}>Training Program</p>
          <h1 className="text-[#FFFDFD] text-[72px] font-medium leading-normal w-full" style={vs}>Water Baptism</h1>
          <p className="text-[#FFFDFD] text-[20px] font-normal leading-[32px]" style={vs}>
            A public declaration of your faith — buried with Christ, raised to walk in newness of life.
          </p>
        </div>
      </section>

      <section className="bg-[#100E1A] px-[120px] py-[84px] flex flex-col gap-[32px] items-center w-full">
        <div className="flex items-center gap-[8px]">
          <Link href="/trainings" className="text-[#B5B5F3] text-[16px] font-normal hover:underline" style={vs}>Training Programs</Link>
          <span className="text-[#A3A1AF]">/</span>
          <span className="text-[#FFFDFD] text-[16px] font-normal" style={vs}>Water Baptism</span>
        </div>

        <h2 className="text-[#FFFDFD] text-[48px] font-bold leading-normal text-center" style={vs}>
          Water Baptism Application
        </h2>

        {status === "success" ? (
          <div className="flex flex-col gap-[24px] items-center max-w-[600px] text-center">
            <div className="size-[80px] rounded-full bg-[#000080] flex items-center justify-center text-[36px] text-white">✓</div>
            <p className="text-[#FFFDFD] text-[25px] font-medium" style={vs}>Application Submitted!</p>
            <p className="text-[#A3A1AF] text-[16px] font-normal" style={vs}>
              Your water baptism application has been received. Our team will contact you with next steps and the scheduled baptism date.
            </p>
            <Link href="/trainings" className="text-[#B5B5F3] text-[16px] font-normal hover:underline" style={vs}>
              ← Back to Training Programs
            </Link>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="flex flex-col gap-[16px] w-full max-w-[900px]">
            <SectionHeading>Personal Information</SectionHeading>
            <div className="grid grid-cols-3 gap-[16px] w-full">
              <FormField label="First Name" required>
                <div className={wrapCls}><input type="text" required value={form.firstName} onChange={set("firstName")} className={inputCls} /></div>
              </FormField>
              <FormField label="Middle Name">
                <div className={wrapCls}><input type="text" value={form.middleName} onChange={set("middleName")} className={inputCls} /></div>
              </FormField>
              <FormField label="Last Name" required>
                <div className={wrapCls}><input type="text" required value={form.lastName} onChange={set("lastName")} className={inputCls} /></div>
              </FormField>
            </div>
            <div className="grid grid-cols-3 gap-[16px] w-full">
              <FormField label="Gender" required>
                <div className={wrapCls}>
                  <select required value={form.sex} onChange={set("sex")} className={selectCls}>
                    <option value="">Select</option>
                    <option value="MALE">Male</option>
                    <option value="FEMALE">Female</option>
                  </select>
                </div>
              </FormField>
              <FormField label="Date of Birth" required>
                <div className={wrapCls}><input type="date" required value={form.dateOfBirth} onChange={set("dateOfBirth")} className={inputCls} /></div>
              </FormField>
              <FormField label="Marital Status">
                <div className={wrapCls}>
                  <select value={form.maritalStatus} onChange={set("maritalStatus")} className={selectCls}>
                    <option value="">Select</option>
                    <option value="SINGLE">Single</option>
                    <option value="MARRIED">Married</option>
                    <option value="DIVORCED">Divorced</option>
                    <option value="WIDOWED">Widowed</option>
                  </select>
                </div>
              </FormField>
            </div>
            <div className="grid grid-cols-2 gap-[16px] w-full">
              <FormField label="Number of Children">
                <div className={wrapCls}><input type="number" min={0} value={form.noOfChildren} onChange={set("noOfChildren")} className={inputCls} placeholder="0" /></div>
              </FormField>
              <FormField label="Spouse Name">
                <div className={wrapCls}><input type="text" value={form.spouseName} onChange={set("spouseName")} className={inputCls} /></div>
              </FormField>
            </div>

            <SectionHeading>Contact & Address</SectionHeading>
            <div className="grid grid-cols-2 gap-[16px] w-full">
              <FormField label="Phone Number" required>
                <div className="flex gap-[8px] w-full h-[40px]">
                  <div className="bg-[#FFFDFD] border border-[#A3A1AF] rounded-[4px] flex-shrink-0 w-[90px] flex items-center">
                    <select value={form.countryCode} onChange={set("countryCode")} className="w-full h-full px-2 bg-transparent text-[#100E1A] text-sm focus:outline-none">
                      <option value="+234">+234</option><option value="+1">+1</option><option value="+44">+44</option>
                    </select>
                  </div>
                  <div className={`${wrapCls} flex-1`}><input type="tel" required value={form.phoneNumber} onChange={set("phoneNumber")} className={inputCls} /></div>
                </div>
              </FormField>
              <FormField label="Occupation">
                <div className={wrapCls}><input type="text" value={form.occupation} onChange={set("occupation")} className={inputCls} /></div>
              </FormField>
            </div>
            <FormField label="Home Address">
              <div className={wrapCls}><input type="text" value={form.street} onChange={set("street")} className={inputCls} placeholder="Street address" /></div>
            </FormField>
            <div className="grid grid-cols-4 gap-[16px] w-full">
              <FormField label="City"><div className={wrapCls}><input type="text" value={form.city} onChange={set("city")} className={inputCls} /></div></FormField>
              <FormField label="State"><div className={wrapCls}><input type="text" value={form.state} onChange={set("state")} className={inputCls} /></div></FormField>
              <FormField label="State of Origin"><div className={wrapCls}><input type="text" value={form.stateOfOrigin} onChange={set("stateOfOrigin")} className={inputCls} /></div></FormField>
              <FormField label="Country"><div className={wrapCls}><input type="text" value={form.country} onChange={set("country")} className={inputCls} /></div></FormField>
            </div>

            <SectionHeading>Spiritual Journey</SectionHeading>
            <div className="grid grid-cols-2 gap-[16px] w-full">
              <FormField label="Date of Salvation">
                <div className={wrapCls}><input type="text" value={form.salvationDate} onChange={set("salvationDate")} className={inputCls} placeholder="e.g. January 2020" /></div>
              </FormField>
              <FormField label="Location of Salvation">
                <div className={wrapCls}><input type="text" value={form.salvationLocation} onChange={set("salvationLocation")} className={inputCls} /></div>
              </FormField>
            </div>
            <div className="grid grid-cols-2 gap-[16px] w-full">
              <FormField label="Date of Holy Spirit Baptism">
                <div className={wrapCls}><input type="text" value={form.holySpiritBaptismDate} onChange={set("holySpiritBaptismDate")} className={inputCls} placeholder="e.g. March 2020" /></div>
              </FormField>
              <FormField label="Location of Holy Spirit Baptism">
                <div className={wrapCls}><input type="text" value={form.holySpiritBaptismLocation} onChange={set("holySpiritBaptismLocation")} className={inputCls} /></div>
              </FormField>
            </div>
            <FormField label="Have You Gone Through New Convert Class?" required>
              <div className={wrapCls}>
                <select required value={form.goneThroughNewConvertClass} onChange={set("goneThroughNewConvertClass")} className={selectCls}>
                  <option value="false">No</option>
                  <option value="true">Yes</option>
                </select>
              </div>
            </FormField>

            <SectionHeading>Application Details</SectionHeading>
            <FormField label="Reason for Applying" required>
              <div className="bg-[#FFFDFD] border border-[#A3A1AF] rounded-[10px] w-full min-h-[120px]">
                <textarea required value={form.reasonForApplying} onChange={set("reasonForApplying")} className="w-full h-full min-h-[120px] px-3 py-2 bg-transparent text-[#100E1A] text-sm focus:outline-none rounded-[10px] resize-none" />
              </div>
            </FormField>
            <FormField label="Other Information">
              <div className="bg-[#FFFDFD] border border-[#A3A1AF] rounded-[10px] w-full min-h-[80px]">
                <textarea value={form.otherInformation} onChange={set("otherInformation")} className="w-full h-full min-h-[80px] px-3 py-2 bg-transparent text-[#100E1A] text-sm focus:outline-none rounded-[10px] resize-none" />
              </div>
            </FormField>

            {status === "error" && <p className="text-[#FF383C] text-[14px] text-center" style={vs}>{error}</p>}
            <div className="flex justify-center mt-[8px]">
              <button type="submit" disabled={status === "loading"} className="bg-[#000080] px-[32px] py-[16px] rounded-[33px] text-[#FFFDFD] text-[25px] font-medium hover:bg-[#0000a0] transition-colors disabled:opacity-60" style={vs}>
                {status === "loading" ? "Submitting..." : "SUBMIT APPLICATION"}
              </button>
            </div>
          </form>
        )}
      </section>
      <Footer />
    </main>
  );
}
