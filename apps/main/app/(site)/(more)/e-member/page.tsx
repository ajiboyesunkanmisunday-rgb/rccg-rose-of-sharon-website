"use client";

import { useState } from "react";
import { post } from "@ros/shared/api";
import PhoneField from "@ros/shared/kit/PhoneField";
import { CountryState, DateParts, R_BUTTON, R_INPUT, R_SELECT, RError, RField, RPage, RSpinner, RSuccess } from "@ros/shared/kit/RosmsForm";

// the same lists the ROSMS e-member form offers
const OCCUPATIONS = [
  "Student", "Engineer", "Doctor", "Teacher", "Lawyer", "Business Owner", "Civil Servant", "Banker", "Nurse", "Accountant",
  "Pastor/Minister", "IT Professional", "Trader", "Artisan", "Unemployed", "Retired", "Other",
];

const EMPTY = {
  firstName: "", middleName: "", lastName: "", email: "",
  countryCode: "+234", phoneNumber: "", sex: "",
  country: "Nigeria", state: "", maritalStatus: "", occupation: "",
  dobDay: "", dobMonth: "", dobYear: "",
  weddingDay: "", weddingMonth: "", weddingYear: "",
};

export default function EMemberPage() {
  const [form, setForm] = useState(EMPTY);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  const set = (k: keyof typeof EMPTY) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => setForm((p) => ({ ...p, [k]: e.target.value }));
  const put = (k: keyof typeof EMPTY) => (v: string) => setForm((p) => ({ ...p, [k]: v }));
  const num = (v: string) => (v ? parseInt(v) : undefined);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    if (!form.country) { setError("Please select your country."); return; }
    setLoading(true);
    try {
      const married = form.maritalStatus === "MARRIED";
      await post("/users/e-member", {
        firstName: form.firstName.trim(),
        middleName: form.middleName.trim() || undefined,
        lastName: form.lastName.trim(),
        email: form.email.trim(),
        countryCode: form.countryCode.replace(/^\+/, ""),
        phoneNumber: form.phoneNumber || undefined,
        sex: form.sex || undefined,
        country: form.country,
        state: form.state || undefined,
        maritalStatus: form.maritalStatus || undefined,
        occupation: form.occupation || undefined,
        dayOfBirth: num(form.dobDay),
        monthOfBirth: num(form.dobMonth),
        yearOfBirth: num(form.dobYear),
        dayOfWedding: married ? num(form.weddingDay) : undefined,
        monthOfWedding: married ? num(form.weddingMonth) : undefined,
        yearOfWedding: married ? num(form.weddingYear) : undefined,
      });
      setSuccess(true);
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  if (success) {
    return (
      <div className="ros:min-h-[70vh] ros:bg-white ros:pt-[72px]">
        <RSuccess
          title="Registration Successful!"
          text="Thank you for registering as an e-member of RCCG Rose of Sharon. We look forward to worshipping with you."
          again="Register Another"
          onAgain={() => { setForm(EMPTY); setSuccess(false); }}
        />
      </div>
    );
  }

  return (
    <RPage title="E-Member Registration" subtitle="Join our online community and stay connected with RCCG Rose of Sharon">
      <div className="ros:mt-6"><RError message={error} /></div>
      <p className="ros:mt-6 ros:text-sm ros:font-semibold ros:text-[#374151]">Enter Your Details</p>

      <form onSubmit={handleSubmit} className="ros:mt-4">
        <div className="ros:grid ros:grid-cols-1 ros:gap-6 ros:md:grid-cols-2">
          <RField label="First Name" required><input type="text" name="firstName" value={form.firstName} onChange={set("firstName")} placeholder="Enter first name" className={R_INPUT} required /></RField>
          <RField label="Last Name" required><input type="text" name="lastName" value={form.lastName} onChange={set("lastName")} placeholder="Enter last name" className={R_INPUT} required /></RField>
          <RField label="Middle Name" optional><input type="text" name="middleName" value={form.middleName} onChange={set("middleName")} placeholder="Enter middle name" className={R_INPUT} /></RField>
          <RField label="Email" required><input type="email" name="email" value={form.email} onChange={set("email")} placeholder="Enter email address" className={R_INPUT} required /></RField>

          <PhoneField code={form.countryCode} number={form.phoneNumber} onCodeChange={put("countryCode")} onNumberChange={put("phoneNumber")} />
          <RField label="Gender">
            <select name="gender" value={form.sex} onChange={set("sex")} className={R_SELECT}>
              <option value="">Select gender</option>
              <option value="MALE">Male</option>
              <option value="FEMALE">Female</option>
            </select>
          </RField>

          <RField label="Date of Birth" optional wide>
            <DateParts day={form.dobDay} month={form.dobMonth} year={form.dobYear} onDay={put("dobDay")} onMonth={put("dobMonth")} onYear={put("dobYear")} />
          </RField>

          <CountryState country={form.country} state={form.state} onCountry={put("country")} onState={put("state")} countryRequired />

          <RField label="Marital Status">
            <select name="maritalStatus" value={form.maritalStatus} onChange={set("maritalStatus")} className={R_SELECT}>
              <option value="">Select marital status</option>
              <option value="SINGLE">Single</option>
              <option value="MARRIED">Married</option>
              <option value="DIVORCED">Divorced</option>
              <option value="WIDOWED">Widowed</option>
            </select>
          </RField>
          <RField label="Occupation" optional>
            <select name="occupation" value={form.occupation} onChange={set("occupation")} className={R_SELECT}>
              <option value="">Select occupation</option>
              {OCCUPATIONS.map((o) => <option key={o} value={o}>{o}</option>)}
            </select>
          </RField>

          {form.maritalStatus === "MARRIED" && (
            <RField label="Wedding Anniversary" optional wide>
              <DateParts day={form.weddingDay} month={form.weddingMonth} year={form.weddingYear} onDay={put("weddingDay")} onMonth={put("weddingMonth")} onYear={put("weddingYear")} back={80} />
            </RField>
          )}
        </div>

        <div className="ros:flex ros:justify-end ros:pb-10 ros:pt-8">
          <button type="submit" disabled={loading} className={R_BUTTON}>
            {loading && <RSpinner />}
            {loading ? "Submitting..." : "Register"}
          </button>
        </div>
      </form>
    </RPage>
  );
}
