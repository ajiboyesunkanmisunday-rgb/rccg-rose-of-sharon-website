"use client";

import { useState } from "react";
import { FormHero } from "@ros/shared/kit/ui";
import { FormField, FormCard, inputCls, selectCls, textareaCls, FormSheet, submitCls, inputClsNoW, selectClsNoW } from "@ros/shared/kit/form";
import PhotoField from "@ros/shared/kit/PhotoField";
import { post, uploadProfilePicture } from "@ros/shared/api";

// Same mapping the admin web uses to turn "How was our service?" into a 1–5 rating.
const SERVICE_RATING: Record<string, number> = { Excellent: 5, Good: 4, Fair: 3, Poor: 2 };

// The services a first-timer can say they attended. (The live list of services needs a login on the API,
// so this is a fixed list until the backend exposes it publicly.)
const SERVICES = ["Sunday Service", "Midweek Service", "Special Service / Program", "Online Service"];

export default function FirstTimerPage() {
  const [form, setForm] = useState({
    firstName: "", middleName: "", lastName: "", sex: "", maritalStatus: "", occupation: "",
    countryCode: "+234", phoneNumber: "", email: "",
    isVisiting: false,
    mediumOfInvitation: "", serviceAttended: "", worshippedOnline: false,
    howWasService: "", favouritePartOfService: "", attendRegularly: "", preferredContact: "",
    prayerRequest: "",
  });
  const [photo, setPhoto] = useState<File | null>(null);
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [error, setError] = useState("");
  const [photoWarning, setPhotoWarning] = useState(false);

  const set = (k: string) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => setForm((p) => ({ ...p, [k]: e.target.value }));
  const tick = (k: string) => (e: React.ChangeEvent<HTMLInputElement>) => setForm((p) => ({ ...p, [k]: e.target.checked }));

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("loading");
    setError("");
    setPhotoWarning(false);
    try {
      let profilePictureUrl: string | undefined;
      if (photo) {
        try {
          profilePictureUrl = await uploadProfilePicture(photo);
        } catch {
          setPhotoWarning(true); // the registration still goes through without the picture
        }
      }
      await post("/users/first-timer", {
        firstName: form.firstName,
        middleName: form.middleName || undefined,
        lastName: form.lastName,
        sex: form.sex || undefined,
        maritalStatus: form.maritalStatus || undefined,
        occupation: form.occupation || undefined,
        countryCode: form.countryCode.replace(/^\+/, ""),
        phoneNumber: form.phoneNumber,
        email: form.email || undefined,
        isVisiting: form.isVisiting,
        mediumOfInvitation: form.mediumOfInvitation || undefined,
        fromOnline: form.worshippedOnline,
        serviceRating: form.howWasService ? SERVICE_RATING[form.howWasService] : undefined,
        favouritePartOfService: form.favouritePartOfService || undefined,
        profilePictureUrl,
        // not stored by the API yet; sent so they are kept as soon as the backend adds them
        serviceAttended: form.serviceAttended || undefined,
        attendRegularly: form.attendRegularly || undefined,
        preferredContact: form.preferredContact || undefined,
      });
      if (form.prayerRequest.trim()) {
        // a prayer request is its own record in the admin web, so it is sent as one
        const lines = [`From: ${[form.firstName, form.middleName, form.lastName].filter(Boolean).join(" ")} (first-timer)`, `Phone: ${form.countryCode} ${form.phoneNumber}`];
        if (form.preferredContact) lines.push(`Preferred contact: ${form.preferredContact}`);
        await post("/requests/prayer", { subject: "Prayer Request — First Timer", content: `${lines.join("\n")}\n\n${form.prayerRequest.trim()}` }).catch(() => undefined);
      }
      setStatus("success");
    } catch (err: unknown) {
      setStatus("error");
      setError(err instanceof Error ? err.message : "Submission failed. Please try again.");
    }
  }

  const tickCls = "ros:h-4 ros:w-4 ros:rounded ros:border-[#E5E7EB] ros:accent-[#DF4E4E]";
  const tickLabel = "ros:flex ros:cursor-pointer ros:items-center ros:gap-2 ros:text-[14px] ros:font-semibold ros:text-[#111827]";

  return (
    <div>
      <FormHero pill="FORMS" title={<>First-Timer <span className="text-textRed">Registration</span></>} subtitle="Welcome! We are so glad you joined us. Please fill out this form so we can stay connected with you." />

      <FormSheet>
        <div className="ros:mb-2 ros:flex ros:w-full ros:max-w-[860px] ros:flex-col ros:items-center ros:gap-[8px] ros:text-center">
          <h2 className="ros-anton ros:text-[28px] ros:uppercase ros:text-[#DF4E4E] ros:md:text-[36px]">Tell Us About Yourself</h2>
          <p className="ros:text-[15px] ros:text-[#6B7280]">All fields marked * are required</p>
        </div>

        {status === "success" ? (
          <div className="ros:flex ros:max-w-[500px] ros:flex-col ros:items-center ros:gap-[16px] ros:rounded-2xl ros:bg-white ros:p-10 ros:text-center ros:shadow-sm">
            <div className="ros:flex ros:size-[72px] ros:items-center ros:justify-center ros:rounded-full ros:bg-green-100">
              <svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="#16a34a" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12" /></svg>
            </div>
            <p className="ros:text-[22px] ros:font-bold ros:text-[#DF4E4E]">Welcome to the Family!</p>
            <p className="ros:text-[15px] ros:text-[#6B7280]">Your registration has been received. A member of our team will be in touch soon to warmly welcome you into our church family.</p>
            {photoWarning && <p className="ros:text-[13px] ros:text-[#B45309]">Your picture could not be uploaded this time. You can send it to the church office later.</p>}
            <button onClick={() => { setStatus("idle"); setPhoto(null); }} className="ros:text-[14px] ros:font-medium ros:text-[#DF4E4E] ros:hover:underline">Submit another registration</button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="ros:flex ros:w-full ros:max-w-[860px] ros:flex-col ros:gap-[16px]">
            <FormCard title="Profile picture">
              <PhotoField file={photo} onChange={setPhoto} />
            </FormCard>

            <FormCard title="Personal Information">
              <div className="ros:grid ros:grid-cols-1 ros:gap-4 ros:sm:grid-cols-2 ros:lg:grid-cols-3">
                <FormField label="First Name" required><input type="text" required value={form.firstName} onChange={set("firstName")} className={inputCls} placeholder="Enter first name" /></FormField>
                <FormField label="Middle Name"><input type="text" value={form.middleName} onChange={set("middleName")} className={inputCls} placeholder="Enter middle name" /></FormField>
                <FormField label="Last Name" required><input type="text" required value={form.lastName} onChange={set("lastName")} className={inputCls} placeholder="Enter last name" /></FormField>
              </div>
              <div className="ros:mt-4 ros:grid ros:grid-cols-1 ros:gap-4 ros:sm:grid-cols-3">
                <FormField label="Gender" required>
                  <select required value={form.sex} onChange={set("sex")} className={selectCls}>
                    <option value="">Select gender</option><option value="MALE">Male</option><option value="FEMALE">Female</option>
                  </select>
                </FormField>
                <FormField label="Marital Status">
                  <select value={form.maritalStatus} onChange={set("maritalStatus")} className={selectCls}>
                    <option value="">Select status</option>
                    <option value="SINGLE">Single</option><option value="MARRIED">Married</option><option value="SEPARATED">Separated</option>
                    <option value="DIVORCED">Divorced</option><option value="SINGLE_PARENT">Single Parent</option><option value="WIDOWED">Widowed</option>
                  </select>
                </FormField>
                <FormField label="Occupation"><input type="text" value={form.occupation} onChange={set("occupation")} className={inputCls} placeholder="Your occupation" /></FormField>
              </div>
              <div className="ros:mt-4 ros:grid ros:grid-cols-1 ros:gap-4 ros:sm:grid-cols-2">
                <FormField label="Phone Number" required>
                  <div className="ros:flex ros:gap-2">
                    <select value={form.countryCode} onChange={set("countryCode")} className={`${selectClsNoW} ros:w-[100px] ros:flex-shrink-0`}>
                      <option value="+234">+234</option><option value="+1">+1</option><option value="+44">+44</option><option value="+27">+27</option><option value="+33">+33</option>
                    </select>
                    <input type="tel" required value={form.phoneNumber} onChange={set("phoneNumber")} className={`${inputClsNoW} ros:min-w-0 ros:flex-1`} placeholder="080 0000 0000" />
                  </div>
                </FormField>
                <FormField label="Email Address"><input type="email" value={form.email} onChange={set("email")} className={inputCls} placeholder="your@email.com" /></FormField>
              </div>
              <div className="ros:mt-4">
                <label className={tickLabel}>
                  <input type="checkbox" checked={form.isVisiting} onChange={tick("isVisiting")} className={tickCls} />
                  I am just visiting
                </label>
              </div>
            </FormCard>

            <FormCard title="About Your Visit">
              <div className="ros:grid ros:grid-cols-1 ros:gap-4 ros:sm:grid-cols-2">
                <FormField label="How did you hear about RCCG ROS?">
                  <select value={form.mediumOfInvitation} onChange={set("mediumOfInvitation")} className={selectCls}>
                    <option value="">Select option</option>
                    <option value="Friends & Family">Friends &amp; Family</option><option value="Billboard">Billboard</option><option value="Flyer">Flyer</option>
                    <option value="Crusade">Crusade</option><option value="TV & Radio">TV &amp; Radio</option><option value="Social Media">Social Media</option><option value="Others">Others</option>
                  </select>
                </FormField>
                <FormField label="Which service did you attend?">
                  <select value={form.serviceAttended} onChange={set("serviceAttended")} className={selectCls}>
                    <option value="">Select service</option>
                    {SERVICES.map((s) => <option key={s} value={s}>{s}</option>)}
                  </select>
                </FormField>
              </div>
              <div className="ros:mt-4">
                <label className={tickLabel}>
                  <input type="checkbox" checked={form.worshippedOnline} onChange={tick("worshippedOnline")} className={tickCls} />
                  Have you worshipped with us online before?
                </label>
              </div>
              <div className="ros:mt-4 ros:grid ros:grid-cols-1 ros:gap-4 ros:sm:grid-cols-2">
                <FormField label="How was our service?">
                  <select value={form.howWasService} onChange={set("howWasService")} className={selectCls}>
                    <option value="">Select</option><option value="Excellent">Excellent</option><option value="Good">Good</option><option value="Fair">Fair</option><option value="Poor">Poor</option>
                  </select>
                </FormField>
                <FormField label="What was your favourite part of the service?">
                  <select value={form.favouritePartOfService} onChange={set("favouritePartOfService")} className={selectCls}>
                    <option value="">Select</option>
                    <option value="Music">Music</option><option value="Media">Media</option><option value="Sermon">Sermon</option>
                    <option value="Ambience">Ambience</option><option value="Hospitality">Hospitality</option><option value="Friendliness">Friendliness</option>
                  </select>
                </FormField>
                <FormField label="Would you like to attend RCCG Rose of Sharon regularly?">
                  <select value={form.attendRegularly} onChange={set("attendRegularly")} className={selectCls}>
                    <option value="">Select option</option><option value="Yes">Yes</option><option value="No">No</option><option value="Maybe">Maybe</option>
                  </select>
                </FormField>
                <FormField label="Preferred means of contact">
                  <select value={form.preferredContact} onChange={set("preferredContact")} className={selectCls}>
                    <option value="">Select option</option><option value="Call">Call</option><option value="WhatsApp">WhatsApp</option><option value="Email">Email</option><option value="SMS">SMS</option>
                  </select>
                </FormField>
              </div>
            </FormCard>

            <FormCard title="Prayer Request (Optional)">
              <FormField label="Share your prayer request with us">
                <textarea value={form.prayerRequest} onChange={set("prayerRequest")} rows={4} className={textareaCls} placeholder="Enter your prayer request (optional)" />
              </FormField>
            </FormCard>

            {status === "error" && <p role="alert" className="ros:text-center ros:text-[14px] ros:text-red-500">{error}</p>}
            <div className="ros:mt-[8px] ros:flex ros:justify-center">
              <button type="submit" disabled={status === "loading"} className={submitCls}>{status === "loading" ? "Submitting..." : "REGISTER"}</button>
            </div>
          </form>
        )}
      </FormSheet>
    </div>
  );
}
