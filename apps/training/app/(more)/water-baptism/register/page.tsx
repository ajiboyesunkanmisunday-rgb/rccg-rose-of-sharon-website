"use client";

import { FormHero } from "@ros/shared/kit/ui";
import ProgramTabs from "@/components/ProgramTabs";

import { useState } from "react";
import Image from "next/image";
import Link from "@ros/shared/link";
import { FormField, inputCls, wrapCls, selectCls, SectionHeading, FormSheet, submitCls, inputClsNoW, selectClsNoW, textareaClsNoW } from "@ros/shared/kit/form";
import { post } from "@ros/shared/api";


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
    <div>
      <FormHero pill="TRAINING PROGRAM" title={<>Water <span className="text-textRed">Baptism</span></>} subtitle="A public declaration of your faith — buried with Christ, raised to walk in newness of life." />

      <FormSheet>
        <ProgramTabs slug="water-baptism" />
        <div className="ros:flex ros:items-center ros:gap-[8px]">
          <Link href="/trainings" className="ros:text-[#DF4E4E] ros:text-[16px] ros:font-normal ros:hover:underline">Training Programs</Link>
          <span className="ros:text-[#6B7280]">/</span>
          <span className="ros:text-[#111827] ros:text-[16px] ros:font-normal">Water Baptism</span>
        </div>

        <h2 className="ros-anton ros:uppercase ros:text-[#DF4E4E] ros:text-[28px] ros:md:text-[40px] ros:lg:text-[48px] ros:leading-normal ros:text-center">
          Water Baptism Application
        </h2>

        {status === "success" ? (
          <div className="ros:flex ros:flex-col ros:gap-[24px] ros:items-center ros:max-w-[600px] ros:text-center">
            <div className="ros:size-[80px] ros:rounded-full ros:bg-[#DF4E4E] ros:flex ros:items-center ros:justify-center ros:text-[36px] ros:text-white">✓</div>
            <p className="ros:text-[#111827] ros:text-[25px] ros:font-medium">Application Submitted!</p>
            <p className="ros:text-[#6B7280] ros:text-[16px] ros:font-normal">
              Your water baptism application has been received. Our team will contact you with next steps and the scheduled baptism date.
            </p>
            <Link href="/trainings" className="ros:text-[#DF4E4E] ros:text-[16px] ros:font-normal ros:hover:underline">
              ← Back to Training Programs
            </Link>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="ros:flex ros:flex-col ros:gap-[16px] ros:w-full ros:max-w-[900px]">
            <SectionHeading>Personal Information</SectionHeading>
            <div className="ros:grid ros:grid-cols-1 ros:sm:grid-cols-2 ros:lg:grid-cols-3 ros:gap-[16px] ros:w-full">
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
            <div className="ros:grid ros:grid-cols-1 ros:sm:grid-cols-2 ros:lg:grid-cols-3 ros:gap-[16px] ros:w-full">
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
            <div className="ros:grid ros:grid-cols-1 ros:sm:grid-cols-2 ros:gap-[16px] ros:w-full">
              <FormField label="Number of Children">
                <div className={wrapCls}><input type="number" min={0} value={form.noOfChildren} onChange={set("noOfChildren")} className={inputCls} placeholder="0" /></div>
              </FormField>
              <FormField label="Spouse Name">
                <div className={wrapCls}><input type="text" value={form.spouseName} onChange={set("spouseName")} className={inputCls} /></div>
              </FormField>
            </div>

            <SectionHeading>Contact & Address</SectionHeading>
            <div className="ros:grid ros:grid-cols-1 ros:sm:grid-cols-2 ros:gap-[16px] ros:w-full">
              <FormField label="Phone Number" required>
                <div className="ros:flex ros:gap-[8px] ros:w-full ros:h-[40px]">
                  <div className="ros:bg-[#FFFDFD] ros:border ros:border-[#A3A1AF] ros:rounded-[4px] ros:flex-shrink-0 ros:w-[90px] ros:flex ros:items-center">
                    <select value={form.countryCode} onChange={set("countryCode")} className="ros:w-full ros:h-full ros:px-2 ros:bg-transparent ros:text-[#000000] ros:text-sm ros:focus:outline-none">
                      <option value="+234">+234</option><option value="+1">+1</option><option value="+44">+44</option>
                    </select>
                  </div>
                  <div className={`${wrapCls} ros:flex-1`}><input type="tel" required value={form.phoneNumber} onChange={set("phoneNumber")} className={inputCls} /></div>
                </div>
              </FormField>
              <FormField label="Occupation">
                <div className={wrapCls}><input type="text" value={form.occupation} onChange={set("occupation")} className={inputCls} /></div>
              </FormField>
            </div>
            <FormField label="Home Address">
              <div className={wrapCls}><input type="text" value={form.street} onChange={set("street")} className={inputCls} placeholder="Street address" /></div>
            </FormField>
            <div className="ros:grid ros:grid-cols-2 ros:sm:grid-cols-3 ros:lg:grid-cols-4 ros:gap-[16px] ros:w-full">
              <FormField label="City"><div className={wrapCls}><input type="text" value={form.city} onChange={set("city")} className={inputCls} /></div></FormField>
              <FormField label="State"><div className={wrapCls}><input type="text" value={form.state} onChange={set("state")} className={inputCls} /></div></FormField>
              <FormField label="State of Origin"><div className={wrapCls}><input type="text" value={form.stateOfOrigin} onChange={set("stateOfOrigin")} className={inputCls} /></div></FormField>
              <FormField label="Country"><div className={wrapCls}><input type="text" value={form.country} onChange={set("country")} className={inputCls} /></div></FormField>
            </div>

            <SectionHeading>Spiritual Journey</SectionHeading>
            <div className="ros:grid ros:grid-cols-1 ros:sm:grid-cols-2 ros:gap-[16px] ros:w-full">
              <FormField label="Date of Salvation">
                <div className={wrapCls}><input type="text" value={form.salvationDate} onChange={set("salvationDate")} className={inputCls} placeholder="e.g. January 2020" /></div>
              </FormField>
              <FormField label="Location of Salvation">
                <div className={wrapCls}><input type="text" value={form.salvationLocation} onChange={set("salvationLocation")} className={inputCls} /></div>
              </FormField>
            </div>
            <div className="ros:grid ros:grid-cols-1 ros:sm:grid-cols-2 ros:gap-[16px] ros:w-full">
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
              <div className="ros:bg-[#FFFDFD] ros:border ros:border-[#A3A1AF] ros:rounded-[10px] ros:w-full ros:min-h-[120px]">
                <textarea required value={form.reasonForApplying} onChange={set("reasonForApplying")} className="ros:w-full ros:h-full ros:min-h-[120px] ros:px-3 ros:py-2 ros:bg-transparent ros:text-[#000000] ros:text-sm ros:focus:outline-none ros:rounded-[10px] ros:resize-none" />
              </div>
            </FormField>
            <FormField label="Other Information">
              <div className="ros:bg-[#FFFDFD] ros:border ros:border-[#A3A1AF] ros:rounded-[10px] ros:w-full ros:min-h-[80px]">
                <textarea value={form.otherInformation} onChange={set("otherInformation")} className="ros:w-full ros:h-full ros:min-h-[80px] ros:px-3 ros:py-2 ros:bg-transparent ros:text-[#000000] ros:text-sm ros:focus:outline-none ros:rounded-[10px] ros:resize-none" />
              </div>
            </FormField>

            {status === "error" && <p className="ros:text-[#FF383C] ros:text-[14px] ros:text-center">{error}</p>}
            <div className="ros:flex ros:justify-center ros:mt-[8px]">
              <button type="submit" disabled={status === "loading"} className={submitCls}>
                {status === "loading" ? "Submitting..." : "SUBMIT APPLICATION"}
              </button>
            </div>
          </form>
        )}
      </FormSheet>
    </div>
  );
}
