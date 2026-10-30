"use client";

import { FormHero } from "@ros/shared/kit/ui";
import ProgramTabs from "@/components/ProgramTabs";

import { useState } from "react";
import Image from "next/image";
import Link from "@ros/shared/link";
import { FormField, inputCls, wrapCls, selectCls, SectionHeading, FormSheet, submitCls, inputClsNoW, selectClsNoW, textareaClsNoW } from "@ros/shared/kit/form";
import { post } from "@ros/shared/api";
import { RepeatRows, emptyRow, cleanRows, type Row, type RowField } from "@ros/shared/kit/rows";

const PLACE_FIELDS: RowField[] = [
  { key: "date", label: "Date", type: "date" },
  { key: "name", label: "Name of Church" },
  { key: "address", label: "Address" },
  { key: "phoneNumber", label: "Phone Number", type: "tel" },
  { key: "pastorName", label: "Pastor's Name" },
  { key: "pastorPhoneNumber", label: "Pastor's Phone Number", type: "tel" },
  { key: "yourMinistry", label: "Your Ministry There" },
];
const POSITION_FIELDS: RowField[] = [
  { key: "worshipPlace", label: "Place of Worship" },
  { key: "positionHeld", label: "Position Held" },
];
const QUAL_FIELDS: RowField[] = [
  { key: "date", label: "Date", type: "date" },
  { key: "institution", label: "Institution" },
  { key: "qualificationReceived", label: "Qualification Received" },
  { key: "fieldOfStudy", label: "Field of Study" },
  { key: "isProfessional", label: "This is a professional qualification", type: "checkbox" },
];
const GIFTS = ["Teaching", "Preaching", "Prophecy", "Healing", "Helps", "Hospitality", "Music / Worship", "Evangelism", "Administration", "Counselling", "Intercession", "Giving"];


export default function WorkersInTrainingPage() {
  const [form, setForm] = useState({
    firstName: "", middleName: "", lastName: "", maidenName: "",
    countryCode: "+234", phoneNumber: "", email: "", sex: "", maritalStatus: "",
    dateOfBirth: "", noOfChildren: "", spouseName: "",
    street: "", city: "", state: "", country: "Nigeria",
    nextOfKinName: "", nextOfKinRelationship: "", nextOfKinPhoneNumber: "", nextOfKinFullAddress: "",
    employer: "", occupation: "", officeFullAddress: "", officePhoneNumber: "", officeEmail: "",
    salvationDate: "", salvationLocation: "",
    waterBaptismDate: "", waterBaptismLocation: "",
    holySpiritBaptismDate: "", holySpiritBaptismLocation: "",
    yourMinistry: "", reasonForApplying: "", otherInformation: "",
    otherPhoneNumber: "", reasonForLeavingPastChurch: "", lifeCenterAttended: "",
  });
  const [gifts, setGifts] = useState<string[]>([]);
  const [groups, setGroups] = useState<string[]>([""]);
  const [places, setPlaces] = useState<Row[]>([emptyRow(PLACE_FIELDS)]);
  const [positions, setPositions] = useState<Row[]>([emptyRow(POSITION_FIELDS)]);
  const [quals, setQuals] = useState<Row[]>([emptyRow(QUAL_FIELDS)]);
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
      await post("/workers-in-training", {
        firstName: form.firstName, middleName: form.middleName || undefined,
        lastName: form.lastName, maidenName: form.maidenName || undefined,
        countryCode: form.countryCode, phoneNumber: form.phoneNumber,
        email: form.email || undefined, sex: form.sex,
        maritalStatus: form.maritalStatus || undefined,
        dateOfBirth: form.dateOfBirth || undefined,
        noOfChildren: form.noOfChildren ? parseInt(form.noOfChildren) : undefined,
        spouseName: form.spouseName || undefined,
        street: form.street || undefined, city: form.city || undefined,
        state: form.state || undefined, country: form.country || undefined,
        nextOfKinName: form.nextOfKinName || undefined,
        nextOfKinRelationship: form.nextOfKinRelationship || undefined,
        nextOfKinPhoneNumber: form.nextOfKinPhoneNumber || undefined,
        nextOfKinFullAddress: form.nextOfKinFullAddress || undefined,
        employer: form.employer || undefined, occupation: form.occupation || undefined,
        officeFullAddress: form.officeFullAddress || undefined,
        officePhoneNumber: form.officePhoneNumber || undefined,
        officeEmail: form.officeEmail || undefined,
        salvationDate: form.salvationDate || undefined,
        salvationLocation: form.salvationLocation || undefined,
        waterBaptismDate: form.waterBaptismDate || undefined,
        waterBaptismLocation: form.waterBaptismLocation || undefined,
        holySpiritBaptismDate: form.holySpiritBaptismDate || undefined,
        holySpiritBaptismLocation: form.holySpiritBaptismLocation || undefined,
        yourMinistry: form.yourMinistry || undefined,
        reasonForApplying: form.reasonForApplying || undefined,
        otherPhoneNumber: form.otherPhoneNumber || undefined,
        reasonForLeavingPastChurch: form.reasonForLeavingPastChurch || undefined,
        lifeCenterAttended: form.lifeCenterAttended || undefined,
        giftsManifesting: gifts.length ? gifts : undefined,
        nonRCCGChristianGroups: groups.map((g) => g.trim()).filter(Boolean).length ? groups.map((g) => g.trim()).filter(Boolean) : undefined,
        createPastPlaceOfWorshipRequests: cleanRows(places, PLACE_FIELDS).length ? cleanRows(places, PLACE_FIELDS) : undefined,
        createPositionHeldRequests: cleanRows(positions, POSITION_FIELDS).length ? cleanRows(positions, POSITION_FIELDS) : undefined,
        qualificationRequests: cleanRows(quals, QUAL_FIELDS).length ? cleanRows(quals, QUAL_FIELDS) : undefined,
        consent: true,
      });
      setStatus("success");
    } catch (err: unknown) {
      setStatus("error");
      setError(err instanceof Error ? err.message : "Submission failed. Please try again.");
    }
  }

  return (
    <div>
      <FormHero pill="TRAINING PROGRAM" title={<>Workers in <span className="text-textRed">Training</span></>} subtitle="Equipping believers for effective ministry service." />

      <FormSheet>
        <ProgramTabs slug="workers-in-training" />
        <div className="ros:flex ros:items-center ros:gap-[8px]">
          <Link href="/trainings" className="ros:text-[#DF4E4E] ros:text-[16px] ros:font-normal ros:hover:underline">Training Programs</Link>
          <span className="ros:text-[#6B7280]">/</span>
          <span className="ros:text-[#111827] ros:text-[16px]">Workers in Training</span>
        </div>
        <h2 className="ros-anton ros:uppercase ros:text-[#DF4E4E] ros:text-[28px] ros:md:text-[40px] ros:lg:text-[48px] ros:text-center">WIT Application Form</h2>

        {status === "success" ? (
          <div className="ros:flex ros:flex-col ros:gap-[24px] ros:items-center ros:max-w-[600px] ros:text-center">
            <div className="ros:size-[80px] ros:rounded-full ros:bg-[#DF4E4E] ros:flex ros:items-center ros:justify-center ros:text-[36px] ros:text-white">✓</div>
            <p className="ros:text-[#111827] ros:text-[25px] ros:font-medium">Application Submitted!</p>
            <p className="ros:text-[#6B7280] ros:text-[16px]">Your WIT application has been received. Our team will contact you with next steps.</p>
            <Link href="/trainings" className="ros:text-[#DF4E4E] ros:text-[16px] ros:hover:underline">← Back to Training Programs</Link>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="ros:flex ros:flex-col ros:gap-[16px] ros:w-full ros:max-w-[900px]">
            <SectionHeading>Personal Information</SectionHeading>
            <div className="ros:grid ros:grid-cols-1 ros:sm:grid-cols-2 ros:gap-[16px] ros:w-full">
              <FormField label="First Name" required><div className={wrapCls}><input type="text" required value={form.firstName} onChange={set("firstName")} className={inputCls} /></div></FormField>
              <FormField label="Middle Name"><div className={wrapCls}><input type="text" value={form.middleName} onChange={set("middleName")} className={inputCls} /></div></FormField>
            </div>
            <div className="ros:grid ros:grid-cols-1 ros:sm:grid-cols-2 ros:gap-[16px] ros:w-full">
              <FormField label="Last Name" required><div className={wrapCls}><input type="text" required value={form.lastName} onChange={set("lastName")} className={inputCls} /></div></FormField>
              <FormField label="Maiden Name"><div className={wrapCls}><input type="text" value={form.maidenName} onChange={set("maidenName")} className={inputCls} /></div></FormField>
            </div>
            <div className="ros:grid ros:grid-cols-1 ros:sm:grid-cols-2 ros:lg:grid-cols-3 ros:gap-[16px] ros:w-full">
              <FormField label="Gender" required>
                <div className={wrapCls}><select required value={form.sex} onChange={set("sex")} className={selectCls}><option value="">Select</option><option value="MALE">Male</option><option value="FEMALE">Female</option></select></div>
              </FormField>
              <FormField label="Date of Birth" required><div className={wrapCls}><input type="date" required value={form.dateOfBirth} onChange={set("dateOfBirth")} className={inputCls} /></div></FormField>
              <FormField label="Marital Status">
                <div className={wrapCls}><select value={form.maritalStatus} onChange={set("maritalStatus")} className={selectCls}><option value="">Select</option><option value="SINGLE">Single</option><option value="MARRIED">Married</option><option value="DIVORCED">Divorced</option><option value="WIDOWED">Widowed</option></select></div>
              </FormField>
            </div>
            <div className="ros:grid ros:grid-cols-1 ros:sm:grid-cols-2 ros:gap-[16px] ros:w-full">
              <FormField label="Number of Children"><div className={wrapCls}><input type="number" min={0} value={form.noOfChildren} onChange={set("noOfChildren")} className={inputCls} placeholder="0" /></div></FormField>
              <FormField label="Spouse Name"><div className={wrapCls}><input type="text" value={form.spouseName} onChange={set("spouseName")} className={inputCls} /></div></FormField>
            </div>

            <SectionHeading>Contact & Address</SectionHeading>
            <div className="ros:grid ros:grid-cols-1 ros:sm:grid-cols-2 ros:gap-[16px] ros:w-full">
              <FormField label="Phone Number" required>
                <div className="ros:flex ros:gap-[8px] ros:w-full ros:h-[40px]">
                  <div className="ros:bg-[#FFFDFD] ros:border ros:border-[#A3A1AF] ros:rounded-[4px] ros:flex-shrink-0 ros:w-[90px] ros:flex ros:items-center">
                    <select value={form.countryCode} onChange={set("countryCode")} className="ros:w-full ros:h-full ros:px-2 ros:bg-transparent ros:text-[#000000] ros:text-sm ros:focus:outline-none"><option value="+234">+234</option><option value="+1">+1</option><option value="+44">+44</option></select>
                  </div>
                  <div className={`${wrapCls} ros:flex-1`}><input type="tel" required value={form.phoneNumber} onChange={set("phoneNumber")} className={inputCls} /></div>
                </div>
              </FormField>
              <FormField label="Email Address"><div className={wrapCls}><input type="email" value={form.email} onChange={set("email")} className={inputCls} /></div></FormField>
            </div>
            <FormField label="Other Phone Number"><div className={wrapCls}><input type="tel" value={form.otherPhoneNumber} onChange={set("otherPhoneNumber")} className={inputCls} /></div></FormField>
            <FormField label="Home Address"><div className={wrapCls}><input type="text" value={form.street} onChange={set("street")} className={inputCls} placeholder="Street address" /></div></FormField>
            <div className="ros:grid ros:grid-cols-1 ros:sm:grid-cols-2 ros:lg:grid-cols-3 ros:gap-[16px] ros:w-full">
              <FormField label="City"><div className={wrapCls}><input type="text" value={form.city} onChange={set("city")} className={inputCls} /></div></FormField>
              <FormField label="State"><div className={wrapCls}><input type="text" value={form.state} onChange={set("state")} className={inputCls} /></div></FormField>
              <FormField label="Country"><div className={wrapCls}><input type="text" value={form.country} onChange={set("country")} className={inputCls} /></div></FormField>
            </div>

            <SectionHeading>Next of Kin</SectionHeading>
            <div className="ros:grid ros:grid-cols-1 ros:sm:grid-cols-2 ros:gap-[16px] ros:w-full">
              <FormField label="Full Name"><div className={wrapCls}><input type="text" value={form.nextOfKinName} onChange={set("nextOfKinName")} className={inputCls} /></div></FormField>
              <FormField label="Relationship"><div className={wrapCls}><input type="text" value={form.nextOfKinRelationship} onChange={set("nextOfKinRelationship")} className={inputCls} /></div></FormField>
            </div>
            <div className="ros:grid ros:grid-cols-1 ros:sm:grid-cols-2 ros:gap-[16px] ros:w-full">
              <FormField label="Phone Number"><div className={wrapCls}><input type="tel" value={form.nextOfKinPhoneNumber} onChange={set("nextOfKinPhoneNumber")} className={inputCls} /></div></FormField>
              <FormField label="Full Address"><div className={wrapCls}><input type="text" value={form.nextOfKinFullAddress} onChange={set("nextOfKinFullAddress")} className={inputCls} /></div></FormField>
            </div>

            <SectionHeading>Employment Information</SectionHeading>
            <div className="ros:grid ros:grid-cols-1 ros:sm:grid-cols-2 ros:gap-[16px] ros:w-full">
              <FormField label="Occupation"><div className={wrapCls}><input type="text" value={form.occupation} onChange={set("occupation")} className={inputCls} /></div></FormField>
              <FormField label="Employer"><div className={wrapCls}><input type="text" value={form.employer} onChange={set("employer")} className={inputCls} /></div></FormField>
            </div>
            <div className="ros:grid ros:grid-cols-1 ros:sm:grid-cols-2 ros:gap-[16px] ros:w-full">
              <FormField label="Office Phone"><div className={wrapCls}><input type="tel" value={form.officePhoneNumber} onChange={set("officePhoneNumber")} className={inputCls} /></div></FormField>
              <FormField label="Office Email"><div className={wrapCls}><input type="email" value={form.officeEmail} onChange={set("officeEmail")} className={inputCls} /></div></FormField>
            </div>
            <FormField label="Office Address"><div className={wrapCls}><input type="text" value={form.officeFullAddress} onChange={set("officeFullAddress")} className={inputCls} /></div></FormField>

            <SectionHeading>Spiritual Journey</SectionHeading>
            <div className="ros:grid ros:grid-cols-1 ros:sm:grid-cols-2 ros:gap-[16px] ros:w-full">
              <FormField label="Date of Salvation"><div className={wrapCls}><input type="text" value={form.salvationDate} onChange={set("salvationDate")} className={inputCls} placeholder="e.g. January 2020" /></div></FormField>
              <FormField label="Location of Salvation"><div className={wrapCls}><input type="text" value={form.salvationLocation} onChange={set("salvationLocation")} className={inputCls} /></div></FormField>
            </div>
            <div className="ros:grid ros:grid-cols-1 ros:sm:grid-cols-2 ros:gap-[16px] ros:w-full">
              <FormField label="Date of Water Baptism"><div className={wrapCls}><input type="text" value={form.waterBaptismDate} onChange={set("waterBaptismDate")} className={inputCls} placeholder="e.g. March 2020" /></div></FormField>
              <FormField label="Location of Water Baptism"><div className={wrapCls}><input type="text" value={form.waterBaptismLocation} onChange={set("waterBaptismLocation")} className={inputCls} /></div></FormField>
            </div>
            <div className="ros:grid ros:grid-cols-1 ros:sm:grid-cols-2 ros:gap-[16px] ros:w-full">
              <FormField label="Date of Holy Spirit Baptism"><div className={wrapCls}><input type="text" value={form.holySpiritBaptismDate} onChange={set("holySpiritBaptismDate")} className={inputCls} placeholder="e.g. June 2020" /></div></FormField>
              <FormField label="Location of Holy Spirit Baptism"><div className={wrapCls}><input type="text" value={form.holySpiritBaptismLocation} onChange={set("holySpiritBaptismLocation")} className={inputCls} /></div></FormField>
            </div>
            <FormField label="Your Ministry / Gift"><div className="ros:bg-[#FFFDFD] ros:border ros:border-[#A3A1AF] ros:rounded-[10px] ros:w-full ros:min-h-[80px]"><textarea value={form.yourMinistry} onChange={set("yourMinistry")} className="ros:w-full ros:h-full ros:min-h-[80px] ros:px-3 ros:py-2 ros:bg-transparent ros:text-[#000000] ros:text-sm ros:focus:outline-none ros:rounded-[10px] ros:resize-none" /></div></FormField>

            <SectionHeading>Gifts & Church Background</SectionHeading>
            <FormField label="Gifts You Are Manifesting">
              <div className="ros:grid ros:grid-cols-2 ros:sm:grid-cols-3 ros:gap-[8px] ros:w-full">
                {GIFTS.map((g) => (
                  <label key={g} className="ros:flex ros:items-center ros:gap-[8px] ros:text-sm ros:text-[#374151]">
                    <input type="checkbox" checked={gifts.includes(g)} onChange={(e) => setGifts((p) => (e.target.checked ? [...p, g] : p.filter((x) => x !== g)))} className="ros:size-[16px] ros:accent-[#DF4E4E]" />
                    {g}
                  </label>
                ))}
              </div>
            </FormField>
            <div className="ros:grid ros:grid-cols-1 ros:sm:grid-cols-2 ros:gap-[16px] ros:w-full">
              <FormField label="Life Centre Attended"><div className={wrapCls}><input type="text" value={form.lifeCenterAttended} onChange={set("lifeCenterAttended")} className={inputCls} /></div></FormField>
              <FormField label="Reason for Leaving Past Church"><div className={wrapCls}><input type="text" value={form.reasonForLeavingPastChurch} onChange={set("reasonForLeavingPastChurch")} className={inputCls} /></div></FormField>
            </div>
            <FormField label="Non-RCCG Christian Groups You Belong To">
              <div className="ros:flex ros:flex-col ros:gap-[8px] ros:w-full">
                {groups.map((g, i) => (
                  <div key={i} className="ros:flex ros:gap-[8px]">
                    <input type="text" value={g} onChange={(e) => setGroups((p) => p.map((x, idx) => (idx === i ? e.target.value : x)))} className={inputCls} placeholder="Group name" />
                    {groups.length > 1 && <button type="button" onClick={() => setGroups((p) => p.filter((_, idx) => idx !== i))} className="ros:text-xs ros:font-bold ros:uppercase ros:text-[#DF4E4E] ros:hover:underline">Remove</button>}
                  </div>
                ))}
                <button type="button" onClick={() => setGroups((p) => [...p, ""])} className="ros:self-start ros:rounded-full ros:border ros:border-black ros:px-4 ros:py-2 ros:text-xs ros:font-extrabold ros:uppercase ros:tracking-[0.15em] ros:transition ros:hover:bg-black ros:hover:text-white">+ Add another group</button>
              </div>
            </FormField>
            <RepeatRows title="Past Places of Worship" fields={PLACE_FIELDS} rows={places} onChange={setPlaces} addLabel="Add another place" />
            <RepeatRows title="Positions Held" fields={POSITION_FIELDS} rows={positions} onChange={setPositions} addLabel="Add another position" />
            <RepeatRows title="Educational & Professional Qualifications" fields={QUAL_FIELDS} rows={quals} onChange={setQuals} addLabel="Add another qualification" />

            <SectionHeading>Application Details</SectionHeading>
            <FormField label="Reason for Applying" required>
              <div className="ros:bg-[#FFFDFD] ros:border ros:border-[#A3A1AF] ros:rounded-[10px] ros:w-full ros:min-h-[120px]">
                <textarea required value={form.reasonForApplying} onChange={set("reasonForApplying")} className="ros:w-full ros:h-full ros:min-h-[120px] ros:px-3 ros:py-2 ros:bg-transparent ros:text-[#000000] ros:text-sm ros:focus:outline-none ros:rounded-[10px] ros:resize-none" />
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
