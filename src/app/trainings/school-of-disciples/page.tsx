"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { FormField, inputCls, wrapCls, selectCls, SectionHeading } from "@/components/ui/FormField";
import { post } from "@/lib/api";

const vs = { fontVariationSettings: '"wdth" 100' };

export default function SchoolOfDisciplesPage() {
  const [form, setForm] = useState({
    firstName: "", middleName: "", lastName: "",
    countryCode: "+234", phoneNumber: "", email: "", sex: "", maritalStatus: "",
    dateOfBirth: "", noOfChildren: "", spouseName: "", spousePhoneNumber: "",
    street: "", city: "", state: "", country: "Nigeria",
    nationality: "", homeTown: "", stateOfOrigin: "",
    occupation: "", officeFullAddress: "", spouseOccupation: "",
    salvationDate: "", salvationLocation: "",
    waterBaptismDate: "", waterBaptismLocation: "",
    holySpiritBaptismDate: "", holySpiritBaptismLocation: "",
    currentParishPastorName: "", currentParishPastorPhoneNumber: "", activityInCurrentParish: "",
    otherInformation: "",
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
      await post("/school-of-disciples", {
        firstName: form.firstName, middleName: form.middleName || undefined,
        lastName: form.lastName, countryCode: form.countryCode,
        phoneNumber: form.phoneNumber, email: form.email || undefined,
        sex: form.sex, maritalStatus: form.maritalStatus || undefined,
        dateOfBirth: form.dateOfBirth || undefined,
        noOfChildren: form.noOfChildren ? parseInt(form.noOfChildren) : undefined,
        spouseName: form.spouseName || undefined,
        spousePhoneNumber: form.spousePhoneNumber || undefined,
        street: form.street || undefined, city: form.city || undefined,
        state: form.state || undefined, country: form.country || undefined,
        nationality: form.nationality || undefined,
        homeTown: form.homeTown || undefined,
        stateOfOrigin: form.stateOfOrigin || undefined,
        occupation: form.occupation || undefined,
        officeFullAddress: form.officeFullAddress || undefined,
        spouseOccupation: form.spouseOccupation || undefined,
        salvationDate: form.salvationDate || undefined,
        salvationLocation: form.salvationLocation || undefined,
        waterBaptismDate: form.waterBaptismDate || undefined,
        waterBaptismLocation: form.waterBaptismLocation || undefined,
        holySpiritBaptismDate: form.holySpiritBaptismDate || undefined,
        holySpiritBaptismLocation: form.holySpiritBaptismLocation || undefined,
        currentParishPastorName: form.currentParishPastorName || undefined,
        currentParishPastorPhoneNumber: form.currentParishPastorPhoneNumber || undefined,
        activityInCurrentParish: form.activityInCurrentParish || undefined,
        otherInformation: form.otherInformation || undefined,
        consent: true,
        hasAnotherSimultaneousProgram: false,
      });
      setStatus("success");
    } catch (err: unknown) {
      setStatus("error");
      setError(err instanceof Error ? err.message : "Submission failed. Please try again.");
    }
  }

  return (
    <main>
      <section className="relative min-h-[400px] md:h-[500px] w-full overflow-hidden flex items-center justify-center">
        <div className="absolute inset-0">
          <Image src="/assets/hero-bg.png" alt="" fill className="object-cover pointer-events-none" priority />
          <div className="absolute inset-0 bg-[rgba(0,0,128,0.75)]" />
        </div>
        <Navbar activePage="trainings" />
        <div className="relative z-10 w-full max-w-[860px] px-6 mt-16 md:mt-[48px] flex flex-col gap-[16px] items-center text-center">
          <p className="text-[#B5B5F3] text-[16px] font-normal uppercase tracking-[0.15em]" style={vs}>Training Program</p>
          <h1 className="text-[#FFFDFD] text-[36px] md:text-[56px] lg:text-[72px] font-medium leading-tight w-full" style={vs}>School of Disciples</h1>
          <p className="text-[#FFFDFD] text-[16px] md:text-[20px] font-normal leading-[1.5] md:leading-[32px]" style={vs}>Grounded in the Word. Formed for ministry.</p>
        </div>
      </section>

      <section className="bg-[#F3F4F6] px-4 sm:px-[40px] lg:px-[80px] xl:px-[120px] py-[60px] md:py-[84px] flex flex-col gap-[32px] items-center w-full">
        <div className="flex items-center gap-[8px]">
          <Link href="/trainings" className="text-[#000080] text-[16px] hover:underline" style={vs}>Training Programs</Link>
          <span className="text-[#6B7280]">/</span>
          <span className="text-[#111827] text-[16px]" style={vs}>School of Disciples</span>
        </div>
        <h2 className="text-[#000080] text-[28px] md:text-[40px] lg:text-[48px] font-bold text-center" style={vs}>SOD Application Form</h2>

        {status === "success" ? (
          <div className="flex flex-col gap-[24px] items-center max-w-[600px] text-center">
            <div className="size-[80px] rounded-full bg-[#000080] flex items-center justify-center text-[36px] text-white">✓</div>
            <p className="text-[#111827] text-[25px] font-medium" style={vs}>Application Submitted!</p>
            <p className="text-[#6B7280] text-[16px]" style={vs}>Your School of Disciples application has been received. Our team will contact you shortly.</p>
            <Link href="/trainings" className="text-[#000080] text-[16px] hover:underline" style={vs}>← Back to Training Programs</Link>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="flex flex-col gap-[16px] w-full max-w-[900px]">
            <SectionHeading>Personal Information</SectionHeading>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-[16px] w-full">
              <FormField label="First Name" required><div className={wrapCls}><input type="text" required value={form.firstName} onChange={set("firstName")} className={inputCls} /></div></FormField>
              <FormField label="Middle Name"><div className={wrapCls}><input type="text" value={form.middleName} onChange={set("middleName")} className={inputCls} /></div></FormField>
              <FormField label="Last Name" required><div className={wrapCls}><input type="text" required value={form.lastName} onChange={set("lastName")} className={inputCls} /></div></FormField>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-[16px] w-full">
              <FormField label="Gender" required>
                <div className={wrapCls}><select required value={form.sex} onChange={set("sex")} className={selectCls}><option value="">Select</option><option value="MALE">Male</option><option value="FEMALE">Female</option></select></div>
              </FormField>
              <FormField label="Date of Birth"><div className={wrapCls}><input type="date" value={form.dateOfBirth} onChange={set("dateOfBirth")} className={inputCls} /></div></FormField>
              <FormField label="Marital Status">
                <div className={wrapCls}><select value={form.maritalStatus} onChange={set("maritalStatus")} className={selectCls}><option value="">Select</option><option value="SINGLE">Single</option><option value="MARRIED">Married</option><option value="DIVORCED">Divorced</option><option value="WIDOWED">Widowed</option></select></div>
              </FormField>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-[16px] w-full">
              <FormField label="Number of Children"><div className={wrapCls}><input type="number" min={0} value={form.noOfChildren} onChange={set("noOfChildren")} className={inputCls} placeholder="0" /></div></FormField>
              <FormField label="Spouse Name"><div className={wrapCls}><input type="text" value={form.spouseName} onChange={set("spouseName")} className={inputCls} /></div></FormField>
              <FormField label="Spouse Phone"><div className={wrapCls}><input type="tel" value={form.spousePhoneNumber} onChange={set("spousePhoneNumber")} className={inputCls} /></div></FormField>
            </div>

            <SectionHeading>Contact & Address</SectionHeading>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-[16px] w-full">
              <FormField label="Phone Number" required>
                <div className="flex gap-[8px] w-full h-[40px]">
                  <div className="bg-[#FFFDFD] border border-[#A3A1AF] rounded-[4px] flex-shrink-0 w-[90px] flex items-center">
                    <select value={form.countryCode} onChange={set("countryCode")} className="w-full h-full px-2 bg-transparent text-[#100E1A] text-sm focus:outline-none"><option value="+234">+234</option><option value="+1">+1</option><option value="+44">+44</option></select>
                  </div>
                  <div className={`${wrapCls} flex-1`}><input type="tel" required value={form.phoneNumber} onChange={set("phoneNumber")} className={inputCls} /></div>
                </div>
              </FormField>
              <FormField label="Email"><div className={wrapCls}><input type="email" value={form.email} onChange={set("email")} className={inputCls} /></div></FormField>
            </div>
            <FormField label="Home Address"><div className={wrapCls}><input type="text" value={form.street} onChange={set("street")} className={inputCls} /></div></FormField>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-[16px] w-full">
              <FormField label="City"><div className={wrapCls}><input type="text" value={form.city} onChange={set("city")} className={inputCls} /></div></FormField>
              <FormField label="State"><div className={wrapCls}><input type="text" value={form.state} onChange={set("state")} className={inputCls} /></div></FormField>
              <FormField label="State of Origin"><div className={wrapCls}><input type="text" value={form.stateOfOrigin} onChange={set("stateOfOrigin")} className={inputCls} /></div></FormField>
              <FormField label="Country"><div className={wrapCls}><input type="text" value={form.country} onChange={set("country")} className={inputCls} /></div></FormField>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-[16px] w-full">
              <FormField label="Nationality"><div className={wrapCls}><input type="text" value={form.nationality} onChange={set("nationality")} className={inputCls} /></div></FormField>
              <FormField label="Home Town"><div className={wrapCls}><input type="text" value={form.homeTown} onChange={set("homeTown")} className={inputCls} /></div></FormField>
            </div>

            <SectionHeading>Employment</SectionHeading>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-[16px] w-full">
              <FormField label="Occupation"><div className={wrapCls}><input type="text" value={form.occupation} onChange={set("occupation")} className={inputCls} /></div></FormField>
              <FormField label="Spouse Occupation"><div className={wrapCls}><input type="text" value={form.spouseOccupation} onChange={set("spouseOccupation")} className={inputCls} /></div></FormField>
            </div>
            <FormField label="Office Address"><div className={wrapCls}><input type="text" value={form.officeFullAddress} onChange={set("officeFullAddress")} className={inputCls} /></div></FormField>

            <SectionHeading>Spiritual Journey</SectionHeading>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-[16px] w-full">
              <FormField label="Date of Salvation"><div className={wrapCls}><input type="text" value={form.salvationDate} onChange={set("salvationDate")} className={inputCls} placeholder="e.g. January 2020" /></div></FormField>
              <FormField label="Location"><div className={wrapCls}><input type="text" value={form.salvationLocation} onChange={set("salvationLocation")} className={inputCls} /></div></FormField>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-[16px] w-full">
              <FormField label="Date of Water Baptism"><div className={wrapCls}><input type="text" value={form.waterBaptismDate} onChange={set("waterBaptismDate")} className={inputCls} placeholder="e.g. March 2020" /></div></FormField>
              <FormField label="Location"><div className={wrapCls}><input type="text" value={form.waterBaptismLocation} onChange={set("waterBaptismLocation")} className={inputCls} /></div></FormField>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-[16px] w-full">
              <FormField label="Date of Holy Spirit Baptism"><div className={wrapCls}><input type="text" value={form.holySpiritBaptismDate} onChange={set("holySpiritBaptismDate")} className={inputCls} placeholder="e.g. June 2020" /></div></FormField>
              <FormField label="Location"><div className={wrapCls}><input type="text" value={form.holySpiritBaptismLocation} onChange={set("holySpiritBaptismLocation")} className={inputCls} /></div></FormField>
            </div>

            <SectionHeading>Current Parish Information</SectionHeading>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-[16px] w-full">
              <FormField label="Pastor's Name"><div className={wrapCls}><input type="text" value={form.currentParishPastorName} onChange={set("currentParishPastorName")} className={inputCls} /></div></FormField>
              <FormField label="Pastor's Phone"><div className={wrapCls}><input type="tel" value={form.currentParishPastorPhoneNumber} onChange={set("currentParishPastorPhoneNumber")} className={inputCls} /></div></FormField>
            </div>
            <FormField label="Your Activity in Current Parish">
              <div className="bg-[#FFFDFD] border border-[#A3A1AF] rounded-[10px] w-full min-h-[80px]"><textarea value={form.activityInCurrentParish} onChange={set("activityInCurrentParish")} className="w-full h-full min-h-[80px] px-3 py-2 bg-transparent text-[#100E1A] text-sm focus:outline-none rounded-[10px] resize-none" /></div>
            </FormField>
            <FormField label="Other Information">
              <div className="bg-[#FFFDFD] border border-[#A3A1AF] rounded-[10px] w-full min-h-[80px]"><textarea value={form.otherInformation} onChange={set("otherInformation")} className="w-full h-full min-h-[80px] px-3 py-2 bg-transparent text-[#100E1A] text-sm focus:outline-none rounded-[10px] resize-none" /></div>
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
