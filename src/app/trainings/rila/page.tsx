"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { FormField, inputCls, wrapCls, selectCls, SectionHeading } from "@/components/ui/FormField";
import { post } from "@/lib/api";

const vs = { fontVariationSettings: '"wdth" 100' };

export default function RilaPage() {
  const [form, setForm] = useState({
    title: "", firstName: "", middleName: "", lastName: "", maidenName: "",
    countryCode: "+234", phoneNumber: "", email: "", sex: "", maritalStatus: "",
    dateOfBirth: "", noOfChildren: "", spouseName: "",
    street: "", city: "", state: "", country: "Nigeria",
    nationality: "", stateOfOrigin: "", placeOfBirth: "", lga: "",
    occupation: "", employer: "", position: "", officeFullAddress: "", officePhoneNumber: "",
    salvationDate: "", salvationLocation: "",
    waterBaptismDate: "", waterBaptismLocation: "",
    holySpiritBaptismDate: "", holySpiritBaptismLocation: "",
    believerClassDate: "", believerClassLocation: "",
    workersInTrainingDate: "", workersInTrainingLocation: "",
    currentChurchName: "", currentChurchAddress: "", currentPastorName: "", currentPastorPhoneNumber: "",
    yourMinistry: "", reasonForApplying: "",
    nextOfKinName: "", nextOfKinRelationship: "", nextOfKinPhoneNumber: "", nextOfKinFullAddress: "",
    selfSponsored: "true",
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
      await post("/rilas", {
        title: form.title || undefined, firstName: form.firstName,
        middleName: form.middleName || undefined, lastName: form.lastName,
        maidenName: form.maidenName || undefined, countryCode: form.countryCode,
        phoneNumber: form.phoneNumber, email: form.email || undefined,
        sex: form.sex, maritalStatus: form.maritalStatus || undefined,
        dateOfBirth: form.dateOfBirth || undefined,
        noOfChildren: form.noOfChildren ? parseInt(form.noOfChildren) : undefined,
        spouseName: form.spouseName || undefined,
        street: form.street || undefined, city: form.city || undefined,
        state: form.state || undefined, country: form.country || undefined,
        nationality: form.nationality || undefined,
        stateOfOrigin: form.stateOfOrigin || undefined,
        placeOfBirth: form.placeOfBirth || undefined, lga: form.lga || undefined,
        occupation: form.occupation || undefined, employer: form.employer || undefined,
        position: form.position || undefined,
        officeFullAddress: form.officeFullAddress || undefined,
        officePhoneNumber: form.officePhoneNumber || undefined,
        salvationDate: form.salvationDate || undefined,
        salvationLocation: form.salvationLocation || undefined,
        waterBaptismDate: form.waterBaptismDate || undefined,
        waterBaptismLocation: form.waterBaptismLocation || undefined,
        holySpiritBaptismDate: form.holySpiritBaptismDate || undefined,
        holySpiritBaptismLocation: form.holySpiritBaptismLocation || undefined,
        believerClassDate: form.believerClassDate || undefined,
        believerClassLocation: form.believerClassLocation || undefined,
        workersInTrainingDate: form.workersInTrainingDate || undefined,
        workersInTrainingLocation: form.workersInTrainingLocation || undefined,
        currentChurchName: form.currentChurchName || undefined,
        currentChurchAddress: form.currentChurchAddress || undefined,
        currentPastorName: form.currentPastorName || undefined,
        currentPastorPhoneNumber: form.currentPastorPhoneNumber || undefined,
        yourMinistry: form.yourMinistry || undefined,
        reasonForApplying: form.reasonForApplying || undefined,
        nextOfKinName: form.nextOfKinName || undefined,
        nextOfKinRelationship: form.nextOfKinRelationship || undefined,
        nextOfKinPhoneNumber: form.nextOfKinPhoneNumber || undefined,
        nextOfKinFullAddress: form.nextOfKinFullAddress || undefined,
        selfSponsored: form.selfSponsored === "true",
        consent: true,
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
          <div className="absolute inset-0 bg-[rgba(0,0,128,0.8)]" />
        </div>
        <Navbar activePage="trainings" />
        <div className="absolute left-1/2 top-[calc(50%+48px)] -translate-x-1/2 -translate-y-1/2 flex flex-col gap-[16px] items-center w-[1148px] z-10 text-center">
          <p className="text-[#B5B5F3] text-[16px] font-normal uppercase tracking-[0.15em]" style={vs}>Training Program</p>
          <h1 className="text-[#FFFDFD] text-[72px] font-medium leading-normal w-full" style={vs}>RILA</h1>
          <p className="text-[#FFFDFD] text-[20px] font-normal leading-[32px]" style={vs}>Redeemed International Leadership Academy — advanced formation for leaders in ministry.</p>
        </div>
      </section>

      <section className="bg-[#100E1A] px-[120px] py-[84px] flex flex-col gap-[32px] items-center w-full">
        <div className="flex items-center gap-[8px]">
          <Link href="/trainings" className="text-[#B5B5F3] text-[16px] hover:underline" style={vs}>Training Programs</Link>
          <span className="text-[#A3A1AF]">/</span>
          <span className="text-[#FFFDFD] text-[16px]" style={vs}>RILA</span>
        </div>
        <h2 className="text-[#FFFDFD] text-[48px] font-bold text-center" style={vs}>RILA Application Form</h2>

        {status === "success" ? (
          <div className="flex flex-col gap-[24px] items-center max-w-[600px] text-center">
            <div className="size-[80px] rounded-full bg-[#000080] flex items-center justify-center text-[36px] text-white">✓</div>
            <p className="text-[#FFFDFD] text-[25px] font-medium" style={vs}>Application Submitted!</p>
            <p className="text-[#A3A1AF] text-[16px]" style={vs}>Your RILA application has been received. Our admissions team will review and contact you.</p>
            <Link href="/trainings" className="text-[#B5B5F3] text-[16px] hover:underline" style={vs}>← Back to Training Programs</Link>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="flex flex-col gap-[16px] w-full max-w-[900px]">
            <SectionHeading>Personal Information</SectionHeading>
            <div className="grid grid-cols-4 gap-[16px] w-full">
              <FormField label="Title">
                <div className={wrapCls}><select value={form.title} onChange={set("title")} className={selectCls}><option value="">Select</option><option value="Mr">Mr</option><option value="Mrs">Mrs</option><option value="Miss">Miss</option><option value="Dr">Dr</option><option value="Rev">Rev</option><option value="Pastor">Pastor</option></select></div>
              </FormField>
              <FormField label="First Name" required><div className={wrapCls}><input type="text" required value={form.firstName} onChange={set("firstName")} className={inputCls} /></div></FormField>
              <FormField label="Middle Name"><div className={wrapCls}><input type="text" value={form.middleName} onChange={set("middleName")} className={inputCls} /></div></FormField>
              <FormField label="Last Name" required><div className={wrapCls}><input type="text" required value={form.lastName} onChange={set("lastName")} className={inputCls} /></div></FormField>
            </div>
            <div className="grid grid-cols-2 gap-[16px] w-full">
              <FormField label="Maiden Name"><div className={wrapCls}><input type="text" value={form.maidenName} onChange={set("maidenName")} className={inputCls} /></div></FormField>
              <FormField label="Gender" required>
                <div className={wrapCls}><select required value={form.sex} onChange={set("sex")} className={selectCls}><option value="">Select</option><option value="MALE">Male</option><option value="FEMALE">Female</option></select></div>
              </FormField>
            </div>
            <div className="grid grid-cols-3 gap-[16px] w-full">
              <FormField label="Date of Birth"><div className={wrapCls}><input type="date" value={form.dateOfBirth} onChange={set("dateOfBirth")} className={inputCls} /></div></FormField>
              <FormField label="Marital Status">
                <div className={wrapCls}><select value={form.maritalStatus} onChange={set("maritalStatus")} className={selectCls}><option value="">Select</option><option value="SINGLE">Single</option><option value="MARRIED">Married</option><option value="DIVORCED">Divorced</option><option value="WIDOWED">Widowed</option></select></div>
              </FormField>
              <FormField label="Number of Children"><div className={wrapCls}><input type="number" min={0} value={form.noOfChildren} onChange={set("noOfChildren")} className={inputCls} placeholder="0" /></div></FormField>
            </div>
            <div className="grid grid-cols-2 gap-[16px] w-full">
              <FormField label="Spouse Name"><div className={wrapCls}><input type="text" value={form.spouseName} onChange={set("spouseName")} className={inputCls} /></div></FormField>
              <FormField label="Nationality"><div className={wrapCls}><input type="text" value={form.nationality} onChange={set("nationality")} className={inputCls} /></div></FormField>
            </div>
            <div className="grid grid-cols-3 gap-[16px] w-full">
              <FormField label="Place of Birth"><div className={wrapCls}><input type="text" value={form.placeOfBirth} onChange={set("placeOfBirth")} className={inputCls} /></div></FormField>
              <FormField label="State of Origin"><div className={wrapCls}><input type="text" value={form.stateOfOrigin} onChange={set("stateOfOrigin")} className={inputCls} /></div></FormField>
              <FormField label="LGA"><div className={wrapCls}><input type="text" value={form.lga} onChange={set("lga")} className={inputCls} /></div></FormField>
            </div>

            <SectionHeading>Contact & Address</SectionHeading>
            <div className="grid grid-cols-2 gap-[16px] w-full">
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
            <div className="grid grid-cols-3 gap-[16px] w-full">
              <FormField label="City"><div className={wrapCls}><input type="text" value={form.city} onChange={set("city")} className={inputCls} /></div></FormField>
              <FormField label="State"><div className={wrapCls}><input type="text" value={form.state} onChange={set("state")} className={inputCls} /></div></FormField>
              <FormField label="Country"><div className={wrapCls}><input type="text" value={form.country} onChange={set("country")} className={inputCls} /></div></FormField>
            </div>

            <SectionHeading>Employment</SectionHeading>
            <div className="grid grid-cols-3 gap-[16px] w-full">
              <FormField label="Occupation"><div className={wrapCls}><input type="text" value={form.occupation} onChange={set("occupation")} className={inputCls} /></div></FormField>
              <FormField label="Employer"><div className={wrapCls}><input type="text" value={form.employer} onChange={set("employer")} className={inputCls} /></div></FormField>
              <FormField label="Position"><div className={wrapCls}><input type="text" value={form.position} onChange={set("position")} className={inputCls} /></div></FormField>
            </div>
            <div className="grid grid-cols-2 gap-[16px] w-full">
              <FormField label="Office Address"><div className={wrapCls}><input type="text" value={form.officeFullAddress} onChange={set("officeFullAddress")} className={inputCls} /></div></FormField>
              <FormField label="Office Phone"><div className={wrapCls}><input type="tel" value={form.officePhoneNumber} onChange={set("officePhoneNumber")} className={inputCls} /></div></FormField>
            </div>

            <SectionHeading>Next of Kin</SectionHeading>
            <div className="grid grid-cols-2 gap-[16px] w-full">
              <FormField label="Full Name"><div className={wrapCls}><input type="text" value={form.nextOfKinName} onChange={set("nextOfKinName")} className={inputCls} /></div></FormField>
              <FormField label="Relationship"><div className={wrapCls}><input type="text" value={form.nextOfKinRelationship} onChange={set("nextOfKinRelationship")} className={inputCls} /></div></FormField>
            </div>
            <div className="grid grid-cols-2 gap-[16px] w-full">
              <FormField label="Phone Number"><div className={wrapCls}><input type="tel" value={form.nextOfKinPhoneNumber} onChange={set("nextOfKinPhoneNumber")} className={inputCls} /></div></FormField>
              <FormField label="Full Address"><div className={wrapCls}><input type="text" value={form.nextOfKinFullAddress} onChange={set("nextOfKinFullAddress")} className={inputCls} /></div></FormField>
            </div>

            <SectionHeading>Spiritual Journey</SectionHeading>
            <div className="grid grid-cols-2 gap-[16px] w-full">
              <FormField label="Date of Salvation"><div className={wrapCls}><input type="text" value={form.salvationDate} onChange={set("salvationDate")} className={inputCls} placeholder="e.g. January 2020" /></div></FormField>
              <FormField label="Location"><div className={wrapCls}><input type="text" value={form.salvationLocation} onChange={set("salvationLocation")} className={inputCls} /></div></FormField>
            </div>
            <div className="grid grid-cols-2 gap-[16px] w-full">
              <FormField label="Date of Water Baptism"><div className={wrapCls}><input type="text" value={form.waterBaptismDate} onChange={set("waterBaptismDate")} className={inputCls} placeholder="e.g. March 2020" /></div></FormField>
              <FormField label="Location"><div className={wrapCls}><input type="text" value={form.waterBaptismLocation} onChange={set("waterBaptismLocation")} className={inputCls} /></div></FormField>
            </div>
            <div className="grid grid-cols-2 gap-[16px] w-full">
              <FormField label="Date of Holy Spirit Baptism"><div className={wrapCls}><input type="text" value={form.holySpiritBaptismDate} onChange={set("holySpiritBaptismDate")} className={inputCls} placeholder="e.g. June 2020" /></div></FormField>
              <FormField label="Location"><div className={wrapCls}><input type="text" value={form.holySpiritBaptismLocation} onChange={set("holySpiritBaptismLocation")} className={inputCls} /></div></FormField>
            </div>
            <div className="grid grid-cols-2 gap-[16px] w-full">
              <FormField label="Believer&apos;s Class Date"><div className={wrapCls}><input type="text" value={form.believerClassDate} onChange={set("believerClassDate")} className={inputCls} placeholder="e.g. July 2020" /></div></FormField>
              <FormField label="Location"><div className={wrapCls}><input type="text" value={form.believerClassLocation} onChange={set("believerClassLocation")} className={inputCls} /></div></FormField>
            </div>
            <div className="grid grid-cols-2 gap-[16px] w-full">
              <FormField label="WIT Date"><div className={wrapCls}><input type="text" value={form.workersInTrainingDate} onChange={set("workersInTrainingDate")} className={inputCls} placeholder="e.g. 2021" /></div></FormField>
              <FormField label="WIT Location"><div className={wrapCls}><input type="text" value={form.workersInTrainingLocation} onChange={set("workersInTrainingLocation")} className={inputCls} /></div></FormField>
            </div>

            <SectionHeading>Current Church</SectionHeading>
            <div className="grid grid-cols-2 gap-[16px] w-full">
              <FormField label="Church Name"><div className={wrapCls}><input type="text" value={form.currentChurchName} onChange={set("currentChurchName")} className={inputCls} /></div></FormField>
              <FormField label="Church Address"><div className={wrapCls}><input type="text" value={form.currentChurchAddress} onChange={set("currentChurchAddress")} className={inputCls} /></div></FormField>
            </div>
            <div className="grid grid-cols-2 gap-[16px] w-full">
              <FormField label="Pastor&apos;s Name"><div className={wrapCls}><input type="text" value={form.currentPastorName} onChange={set("currentPastorName")} className={inputCls} /></div></FormField>
              <FormField label="Pastor&apos;s Phone"><div className={wrapCls}><input type="tel" value={form.currentPastorPhoneNumber} onChange={set("currentPastorPhoneNumber")} className={inputCls} /></div></FormField>
            </div>

            <SectionHeading>Application Details</SectionHeading>
            <FormField label="Your Ministry / Gifts">
              <div className="bg-[#FFFDFD] border border-[#A3A1AF] rounded-[10px] w-full min-h-[80px]"><textarea value={form.yourMinistry} onChange={set("yourMinistry")} className="w-full h-full min-h-[80px] px-3 py-2 bg-transparent text-[#100E1A] text-sm focus:outline-none rounded-[10px] resize-none" /></div>
            </FormField>
            <FormField label="Reason for Applying" required>
              <div className="bg-[#FFFDFD] border border-[#A3A1AF] rounded-[10px] w-full min-h-[120px]"><textarea required value={form.reasonForApplying} onChange={set("reasonForApplying")} className="w-full h-full min-h-[120px] px-3 py-2 bg-transparent text-[#100E1A] text-sm focus:outline-none rounded-[10px] resize-none" /></div>
            </FormField>
            <FormField label="Sponsorship" required>
              <div className={wrapCls}><select required value={form.selfSponsored} onChange={set("selfSponsored")} className={selectCls}><option value="true">Self-Sponsored</option><option value="false">Church/Organization Sponsored</option></select></div>
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
