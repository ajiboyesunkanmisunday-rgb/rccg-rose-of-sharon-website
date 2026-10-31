"use client";

import { useEffect, useRef, useState } from "react";
import { getGroups, post, uploadProfilePicture, type GroupResponse } from "@ros/shared/api";
import PhoneField from "@ros/shared/kit/PhoneField";
import { CountryState, DateParts, R_BUTTON, R_INPUT, R_SELECT, RError, RField, RPage, RSpinner, RSuccess } from "@ros/shared/kit/RosmsForm";

const EMPTY = {
  firstName: "", middleName: "", lastName: "", email: "",
  countryCode: "+234", phoneNumber: "", sex: "",
  dobDay: "", dobMonth: "", dobYear: "",
  street: "", city: "", country: "Nigeria", state: "",
  maritalStatus: "",
  weddingDay: "", weddingMonth: "", weddingYear: "",
};

/** The Groups drop-down of the ROSMS member form: a closed box that opens a list with a tick box for each group. */
function GroupPicker({ groups, loaded, value, onChange }: { groups: GroupResponse[]; loaded: boolean; value: string[]; onChange: (v: string[]) => void }) {
  const [open, setOpen] = useState(false);
  const box = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (!open) return;
    const down = (e: MouseEvent) => { if (box.current && !box.current.contains(e.target as Node)) setOpen(false); };
    document.addEventListener("mousedown", down);
    return () => document.removeEventListener("mousedown", down);
  }, [open]);
  const names = value.map((id) => groups.find((g) => g.id === id)?.name ?? id);
  const placeholder = !loaded ? "Loading groups…" : groups.length ? "Select Groups" : "No groups available right now";
  return (
    <div className="ros:relative" ref={box}>
      <button type="button" disabled={!groups.length} onClick={() => setOpen((o) => !o)} className={`${R_INPUT} ros:flex ros:items-center ros:justify-between ros:text-left ros:disabled:cursor-not-allowed ros:disabled:bg-gray-50`}>
        <span className={names.length ? "ros:text-[#374151]" : "ros:text-[#9CA3AF]"}>{names.length ? names.join(", ") : placeholder}</span>
        <span aria-hidden="true" className="ros:text-[#9CA3AF]">▾</span>
      </button>
      {open && (
        <ul className="ros:absolute ros:left-0 ros:right-0 ros:top-full ros:z-50 ros:mt-1 ros:max-h-[220px] ros:overflow-y-auto ros:rounded-xl ros:border ros:border-[#E5E7EB] ros:bg-white ros:py-1 ros:shadow-xl">
          {groups.map((g) => (
            <li key={g.id}>
              <label className="ros:flex ros:cursor-pointer ros:items-center ros:gap-3 ros:px-4 ros:py-2.5 ros:text-sm ros:text-[#374151] ros:hover:bg-[#F9FAFB]">
                <input type="checkbox" data-no-check checked={value.includes(g.id)} onChange={() => onChange(value.includes(g.id) ? value.filter((x) => x !== g.id) : [...value, g.id])} className="ros:size-4 ros:accent-[#000080]" />
                {g.name}
              </label>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default function BecomeAMemberPage() {
  const [form, setForm] = useState(EMPTY);
  const [groupIds, setGroupIds] = useState<string[]>([]);
  const [groups, setGroups] = useState<GroupResponse[]>([]);
  const [groupsLoaded, setGroupsLoaded] = useState(false);
  const [photo, setPhoto] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");
  const [photoWarning, setPhotoWarning] = useState(false);

  useEffect(() => {
    getGroups().then((g) => setGroups([...g].sort((a, b) => a.name.localeCompare(b.name)))).catch(() => setGroups([])).finally(() => setGroupsLoaded(true));
  }, []);
  useEffect(() => {
    if (!photo) { setPreview(null); return; }
    const url = URL.createObjectURL(photo);
    setPreview(url);
    return () => URL.revokeObjectURL(url);
  }, [photo]);

  const set = (k: keyof typeof EMPTY) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => setForm((p) => ({ ...p, [k]: e.target.value }));
  const put = (k: keyof typeof EMPTY) => (v: string) => setForm((p) => ({ ...p, [k]: v }));
  const num = (v: string) => (v ? parseInt(v) : undefined);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setPhotoWarning(false);
    if (!form.sex) { setError("Please select your gender."); return; }
    setLoading(true);
    try {
      let profilePictureUrl: string | undefined;
      if (photo) {
        try { profilePictureUrl = await uploadProfilePicture(photo); } catch { setPhotoWarning(true); } // the registration still goes through without the picture
      }
      const married = form.maritalStatus === "MARRIED";
      await post("/users/member", {
        firstName: form.firstName.trim(),
        middleName: form.middleName.trim() || undefined,
        lastName: form.lastName.trim(),
        sex: form.sex,
        maritalStatus: form.maritalStatus || undefined,
        dayOfBirth: num(form.dobDay),
        monthOfBirth: num(form.dobMonth),
        yearOfBirth: num(form.dobYear),
        dayOfWedding: married ? num(form.weddingDay) : undefined,
        monthOfWedding: married ? num(form.weddingMonth) : undefined,
        yearOfWedding: married ? num(form.weddingYear) : undefined,
        countryCode: form.countryCode.replace(/^\+/, ""),
        phoneNumber: form.phoneNumber,
        email: form.email.trim(),
        street: form.street.trim() || undefined,
        city: form.city.trim() || undefined,
        state: form.state || undefined,
        country: form.country || undefined,
        groupIds: groupIds.length ? groupIds : undefined,
        profilePictureUrl,
      });
      setSuccess(true);
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Submission failed. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  if (success) {
    return (
      <div className="ros:min-h-[70vh] ros:bg-white ros:pt-[72px]">
        <RSuccess
          title="Submission Successful!"
          text="Thank you! Your membership details have been recorded. A member of our team will be in touch."
          again="Submit Another"
          onAgain={() => { setForm(EMPTY); setGroupIds([]); setPhoto(null); setPhotoWarning(false); setSuccess(false); }}
        >
          {photoWarning && <p className="ros:mt-3 ros:text-xs ros:text-[#B45309]">Your photo could not be uploaded this time. You can send it to the church office later.</p>}
        </RSuccess>
      </div>
    );
  }

  return (
    <RPage title="Become a Member" subtitle="Join the Rose of Sharon family. Tell us a little about yourself so we can record you as a member.">
      <form onSubmit={handleSubmit} className="ros:mt-8">
        <div className="ros:flex ros:flex-col ros:gap-6 ros:lg:flex-row">
          {/* Profile photo (right, 30%) */}
          <div className="ros:w-full ros:lg:order-2 ros:lg:w-[30%]">
            <div className="ros:rounded-xl ros:border ros:border-[#E5E7EB] ros:bg-white ros:p-4 ros:sm:p-6">
              <h2 className="ros:mb-6 ros:text-[18px] ros:font-bold ros:text-black">Profile Photo</h2>
              <label className="ros:group ros:flex ros:cursor-pointer ros:flex-col ros:items-center">
                <span className="ros:flex ros:h-40 ros:w-40 ros:items-center ros:justify-center ros:overflow-hidden ros:rounded-full ros:border-2 ros:border-dashed ros:border-[#D1D5DB] ros:transition-colors ros:group-hover:border-[#000080]">
                  {preview ? (
                    <img src={preview} alt="Profile preview" className="ros:h-full ros:w-full ros:object-cover" />
                  ) : (
                    <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="#9CA3AF" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" /><circle cx="12" cy="7" r="4" /></svg>
                  )}
                </span>
                <input type="file" accept="image/*" className="ros:hidden" onChange={(e) => setPhoto(e.target.files?.[0] ?? null)} />
                <span className="ros:mt-4 ros:text-sm ros:font-medium ros:text-[#000080] ros:transition-colors ros:group-hover:text-[#000066]">{photo ? "Change Photo" : "Upload Photo"}</span>
              </label>
              {photo && <button type="button" onClick={() => setPhoto(null)} className="ros:mx-auto ros:mt-2 ros:block ros:text-xs ros:text-[#6B7280] ros:underline">Remove</button>}
            </div>
          </div>

          {/* Details (left, 70%) */}
          <div className="ros:w-full ros:lg:order-1 ros:lg:w-[70%]">
            <div className="ros:rounded-xl ros:border ros:border-[#E5E7EB] ros:bg-white ros:p-4 ros:sm:p-6">
              <h2 className="ros:mb-6 ros:text-[18px] ros:font-bold ros:text-black">Enter Details</h2>
              <div className="ros:grid ros:grid-cols-1 ros:gap-x-6 ros:gap-y-4 ros:md:grid-cols-2">
                <RField label="First Name" required><input type="text" value={form.firstName} onChange={set("firstName")} placeholder="Enter First Name" className={R_INPUT} required /></RField>
                <RField label="Middle Name"><input type="text" value={form.middleName} onChange={set("middleName")} placeholder="Enter Middle Name (optional)" className={R_INPUT} /></RField>
                <RField label="Last Name" required><input type="text" value={form.lastName} onChange={set("lastName")} placeholder="Enter Last Name" className={R_INPUT} required /></RField>
                <PhoneField label="Phone Number" required code={form.countryCode} number={form.phoneNumber} onCodeChange={put("countryCode")} onNumberChange={put("phoneNumber")} placeholder="Enter Phone Number" />
                <RField label="Email" required><input type="email" value={form.email} onChange={set("email")} placeholder="Enter Email" className={R_INPUT} required /></RField>
                <RField label="Gender" required>
                  <select value={form.sex} onChange={set("sex")} className={R_SELECT} required>
                    <option value="">Select Gender</option>
                    <option value="MALE">Male</option>
                    <option value="FEMALE">Female</option>
                  </select>
                </RField>
              </div>

              <div className="ros:mt-4">
                <label className="ros:mb-1 ros:block ros:text-sm ros:font-medium ros:text-[#374151]">Date of Birth</label>
                <DateParts day={form.dobDay} month={form.dobMonth} year={form.dobYear} onDay={put("dobDay")} onMonth={put("dobMonth")} onYear={put("dobYear")} />
              </div>

              <h3 className="ros:mb-4 ros:mt-6 ros:text-[16px] ros:font-bold ros:text-black">Address</h3>
              <div className="ros:grid ros:grid-cols-1 ros:gap-x-6 ros:gap-y-4 ros:md:grid-cols-2">
                <RField label="Street"><input type="text" value={form.street} onChange={set("street")} placeholder="Enter Street" className={R_INPUT} /></RField>
                <RField label="City"><input type="text" value={form.city} onChange={set("city")} placeholder="Enter City" className={R_INPUT} /></RField>
                <CountryState country={form.country} state={form.state} onCountry={put("country")} onState={put("state")} />
                <RField label="Marital Status">
                  <select value={form.maritalStatus} onChange={set("maritalStatus")} className={R_SELECT}>
                    <option value="">Select Marital Status</option>
                    <option value="SINGLE">Single</option>
                    <option value="MARRIED">Married</option>
                    <option value="WIDOWED">Widowed</option>
                    <option value="DIVORCED">Divorced</option>
                  </select>
                </RField>
                <RField label="Groups"><GroupPicker groups={groups} loaded={groupsLoaded} value={groupIds} onChange={setGroupIds} /></RField>
                {form.maritalStatus === "MARRIED" && (
                  <RField label="Wedding Anniversary" wide>
                    <DateParts day={form.weddingDay} month={form.weddingMonth} year={form.weddingYear} onDay={put("weddingDay")} onMonth={put("weddingMonth")} onYear={put("weddingYear")} back={80} />
                  </RField>
                )}
              </div>

              {error && <div className="ros:mt-4"><RError message={error} /></div>}
              <div className="ros:mt-6 ros:flex ros:justify-end">
                <button type="submit" disabled={loading} className={`${R_BUTTON} ros:w-full ros:sm:w-auto`}>
                  {loading && <RSpinner />}
                  {loading ? "Saving…" : "Save Member"}
                </button>
              </div>
            </div>
          </div>
        </div>
      </form>
    </RPage>
  );
}
