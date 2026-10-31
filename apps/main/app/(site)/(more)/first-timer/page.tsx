"use client";

import { useState } from "react";
import { post } from "@ros/shared/api";

/*
 * The First-Timer registration form, laid out like the ROSMS public "Getting To Know You Better (First Timer)"
 * form: same heading, field order, labels, placeholders, option lists, navy accents and Save button.
 * Wrong input is flagged inline by the shared FormChecks (same rules as the ROSMS forms).
 */

const DAYS = Array.from({ length: 31 }, (_, i) => String(i + 1));
const MONTHS = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
const THIS_YEAR = new Date().getFullYear();
const YEARS = Array.from({ length: 100 }, (_, i) => String(THIS_YEAR - i));

const COUNTRY_CODES = ["+234", "+44", "+1", "+233", "+27"];
const STATES = [
  "Abia", "Adamawa", "Akwa Ibom", "Anambra", "Bauchi", "Bayelsa", "Benue", "Borno", "Cross River", "Delta", "Ebonyi", "Edo", "Ekiti", "Enugu", "FCT", "Gombe", "Imo", "Jigawa", "Kaduna", "Kano", "Katsina", "Kebbi", "Kogi", "Kwara", "Lagos", "Nasarawa", "Niger", "Ogun", "Ondo", "Osun", "Oyo", "Plateau", "Rivers", "Sokoto", "Taraba", "Yobe", "Zamfara",
];
const COUNTRIES = ["Nigeria", "United Kingdom", "United States", "Canada", "Ghana", "South Africa", "Germany", "France", "Australia", "Other"];
// the labels are what ROSMS shows; the value is what the API accepts (it has no "Single Parent", so that is recorded as single)
const MARITAL: { label: string; value: string }[] = [
  { label: "Single", value: "SINGLE" },
  { label: "Married", value: "MARRIED" },
  { label: "Separated", value: "SEPARATED" },
  { label: "Divorced", value: "DIVORCED" },
  { label: "Single Parent", value: "SINGLE" },
  { label: "Widowed", value: "WIDOWED" },
];
const OCCUPATIONS = ["Student", "Engineer", "Doctor", "Teacher", "Lawyer", "Business Owner", "Civil Servant", "Banker", "Nurse", "Accountant", "Pastor/Minister", "IT Professional", "Trader", "Artisan", "Unemployed", "Retired", "Other"];
const HEAR = ["Friends & Family", "Billboard", "Flyer", "Crusade", "TV & Radio", "Social Media", "Others"];
const RATINGS: Record<string, number> = { Average: 2, Good: 3, "Very Good": 4, Excellent: 5 };
const FAVOURITE = ["Music", "Media", "Sermon", "Ambience", "Hospitality", "Friendliness"];

const labelCls = "ros:mb-1 ros:block ros:text-sm ros:font-medium ros:text-[#374151]";
const inputCls =
  "ros:w-full ros:rounded-lg ros:border ros:border-[#E5E7EB] ros:bg-white ros:px-4 ros:py-3 ros:text-sm ros:text-[#374151] ros:outline-none ros:focus:border-[#000080] ros:focus:ring-1 ros:focus:ring-[#000080]";
const selectCls = `${inputCls} ros:appearance-none ros:bg-[url('data:image/svg+xml;charset=UTF-8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2216%22%20height%3D%2216%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22%236B7280%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%3E%3Cpolyline%20points%3D%226%209%2012%2015%2018%209%22%3E%3C%2Fpolyline%3E%3C%2Fsvg%3E')] ros:bg-[length:16px] ros:bg-[right_12px_center] ros:bg-no-repeat ros:pr-10 ros:cursor-pointer`;
const row = "ros:grid ros:grid-cols-1 ros:gap-6 ros:md:grid-cols-2";

const EMPTY = {
  firstName: "", lastName: "", email: "",
  dobDay: "", dobMonth: "", dobYear: "",
  countryCode: "+234", mobileNumber: "",
  street: "", city: "", state: "", country: "",
  maritalStatus: "", occupation: "",
  howDidYouHear: "", serviceRating: "", favouriteParts: "", worshippedOnline: "", attendRegularly: "", preferredContact: "",
  prayerRequest: "",
};

function Field({ label, required, children }: { label: string; required?: boolean; children: React.ReactNode }) {
  return (
    <div>
      <label className={labelCls}>
        {label}
        {required && <> <span className="ros:text-red-500">*</span></>}
      </label>
      {children}
    </div>
  );
}

export default function FirstTimerPage() {
  const [form, setForm] = useState(EMPTY);
  const [status, setStatus] = useState<"idle" | "loading" | "success">("idle");
  const [error, setError] = useState("");

  const set = (k: keyof typeof EMPTY) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) =>
    setForm((p) => ({ ...p, [k]: e.target.value }));

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setStatus("loading");
    try {
      await post("/users/first-timer", {
        firstName: form.firstName.trim(),
        lastName: form.lastName.trim(),
        email: form.email.trim() || undefined,
        dayOfBirth: form.dobDay ? Number(form.dobDay) : undefined,
        monthOfBirth: form.dobMonth ? Number(form.dobMonth) : undefined,
        yearOfBirth: form.dobYear ? Number(form.dobYear) : undefined,
        countryCode: form.countryCode.replace(/^\+/, ""),
        phoneNumber: form.mobileNumber.trim(),
        street: form.street.trim() || undefined,
        city: form.city.trim() || undefined,
        state: form.state || undefined,
        country: form.country || undefined,
        maritalStatus: MARITAL.find((m) => m.label === form.maritalStatus)?.value,
        occupation: form.occupation || undefined,
        mediumOfInvitation: form.howDidYouHear || undefined,
        serviceRating: form.serviceRating ? RATINGS[form.serviceRating] : undefined,
        favouritePartOfService: form.favouriteParts || undefined,
        fromOnline: form.worshippedOnline ? form.worshippedOnline === "Yes" : undefined,
      });
      // the prayer request is its own record in ROSMS, so it is sent as one (with the contact preferences the API has no field for)
      if (form.prayerRequest.trim()) {
        const lines = [`From: ${form.firstName.trim()} ${form.lastName.trim()} (first-timer)`, `Phone: ${form.countryCode} ${form.mobileNumber.trim()}`];
        if (form.preferredContact) lines.push(`Preferred means of contact: ${form.preferredContact}`);
        if (form.attendRegularly) lines.push(`Would consider attending regularly: ${form.attendRegularly}`);
        await post("/requests/prayer", { subject: "Prayer Request — First Timer", content: `${lines.join("\n")}\n\n${form.prayerRequest.trim()}` }).catch(() => undefined);
      }
      setStatus("success");
    } catch (err: unknown) {
      setStatus("idle");
      setError(err instanceof Error ? err.message : "Submission failed. Please try again.");
    }
  }

  if (status === "success") {
    return (
      <div className="ros:min-h-[70vh] ros:bg-white">
        <div className="ros:mx-auto ros:flex ros:max-w-5xl ros:flex-col ros:items-center ros:px-8 ros:py-24 ros:text-center">
          <div className="ros:flex ros:h-20 ros:w-20 ros:items-center ros:justify-center ros:rounded-full ros:bg-[#000080]">
            <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12" /></svg>
          </div>
          <h2 className="ros:mt-6 ros:text-2xl ros:font-bold ros:text-[#1F2937]">Registration Successful!</h2>
          <p className="ros:mt-3 ros:max-w-md ros:text-sm ros:text-[#6B7280]">
            Thank you for worshipping with us at RCCG Rose of Sharon. A member of our team will be in touch to welcome you.
          </p>
          <button
            type="button"
            onClick={() => { setStatus("idle"); setForm(EMPTY); }}
            className="ros:mt-8 ros:rounded-xl ros:bg-[#000080] ros:px-8 ros:py-3 ros:text-sm ros:font-semibold ros:text-white ros:transition-colors ros:hover:bg-[#000066]"
          >
            Register Another
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="ros:min-h-screen ros:bg-white">
      <div className="ros:mx-auto ros:max-w-5xl ros:px-8 ros:py-10">
        <h1 className="ros:text-center ros:text-[28px] ros:font-bold ros:text-[#1F2937]">Getting To Know You Better (First Timer)</h1>
        <p className="ros:mt-6 ros:text-sm ros:font-semibold ros:text-[#374151]">Enter Your Details</p>

        <form onSubmit={handleSubmit} className="ros:mt-4 ros:space-y-6">
          <div className={row}>
            <Field label="First Name" required>
              <input type="text" name="firstName" required placeholder="Enter first name" value={form.firstName} onChange={set("firstName")} className={inputCls} />
            </Field>
            <Field label="Email">
              <input type="email" name="email" placeholder="Enter email address" value={form.email} onChange={set("email")} className={inputCls} />
            </Field>
          </div>

          <div className={row}>
            <Field label="Last Name" required>
              <input type="text" name="lastName" required placeholder="Enter last name" value={form.lastName} onChange={set("lastName")} className={inputCls} />
            </Field>
            <Field label="Date of Birth">
              <div className="ros:grid ros:grid-cols-3 ros:gap-2">
                <select name="dobDay" aria-label="Day" value={form.dobDay} onChange={set("dobDay")} className={selectCls}>
                  <option value="">Day</option>
                  {DAYS.map((d) => <option key={d} value={d}>{d}</option>)}
                </select>
                <select name="dobMonth" aria-label="Month" value={form.dobMonth} onChange={set("dobMonth")} className={selectCls}>
                  <option value="">Month</option>
                  {MONTHS.map((m, i) => <option key={m} value={i + 1}>{m}</option>)}
                </select>
                <select name="dobYear" aria-label="Year" value={form.dobYear} onChange={set("dobYear")} className={selectCls}>
                  <option value="">Year</option>
                  {YEARS.map((y) => <option key={y} value={y}>{y}</option>)}
                </select>
              </div>
            </Field>
          </div>

          <div className={row}>
            <Field label="Mobile Number" required>
              <div className="ros:flex ros:gap-2">
                <select name="countryCode" aria-label="Country code" value={form.countryCode} onChange={set("countryCode")} className={`${selectCls} ros:w-28 ros:px-2 ros:pr-8`}>
                  {COUNTRY_CODES.map((c) => <option key={c} value={c}>{c}</option>)}
                </select>
                <input type="tel" name="mobileNumber" required placeholder="Enter mobile number" value={form.mobileNumber} onChange={set("mobileNumber")} className={inputCls} />
              </div>
            </Field>
          </div>

          <div className="ros:pt-2">
            <p className="ros:text-sm ros:font-semibold ros:text-[#374151]">Address</p>
          </div>

          <div className={row}>
            <Field label="Street">
              <input type="text" name="street" placeholder="Enter street address" value={form.street} onChange={set("street")} className={inputCls} />
            </Field>
            <Field label="City">
              <input type="text" name="city" placeholder="Enter city" value={form.city} onChange={set("city")} className={inputCls} />
            </Field>
          </div>

          <div className={row}>
            <Field label="State">
              <select name="state" value={form.state} onChange={set("state")} className={selectCls}>
                <option value="">Select state</option>
                {STATES.map((s) => <option key={s} value={s}>{s}</option>)}
              </select>
            </Field>
            <Field label="Country">
              <select name="country" value={form.country} onChange={set("country")} className={selectCls}>
                <option value="">Select country</option>
                {COUNTRIES.map((c) => <option key={c} value={c}>{c}</option>)}
              </select>
            </Field>
          </div>

          <div className={row}>
            <Field label="Marital Status">
              <select name="maritalStatus" value={form.maritalStatus} onChange={set("maritalStatus")} className={selectCls}>
                <option value="">Select marital status</option>
                {MARITAL.map((m) => <option key={m.label} value={m.label}>{m.label}</option>)}
              </select>
            </Field>
            <Field label="Occupation">
              <select name="occupation" value={form.occupation} onChange={set("occupation")} className={selectCls}>
                <option value="">Select occupation</option>
                {OCCUPATIONS.map((o) => <option key={o} value={o}>{o}</option>)}
              </select>
            </Field>
          </div>

          <div className={row}>
            <Field label="How did you hear about our church?">
              <select name="howDidYouHear" value={form.howDidYouHear} onChange={set("howDidYouHear")} className={selectCls}>
                <option value="">Select option</option>
                {HEAR.map((h) => <option key={h} value={h}>{h}</option>)}
              </select>
            </Field>
            <Field label="How was our service?">
              <select name="serviceRating" value={form.serviceRating} onChange={set("serviceRating")} className={selectCls}>
                <option value="">Select rating</option>
                {Object.keys(RATINGS).map((r) => <option key={r} value={r}>{r}</option>)}
              </select>
            </Field>
          </div>

          <div className={row}>
            <Field label="What were your favourite parts of the service?">
              <select name="favouriteParts" value={form.favouriteParts} onChange={set("favouriteParts")} className={selectCls}>
                <option value="">Select option</option>
                {FAVOURITE.map((f) => <option key={f} value={f}>{f}</option>)}
              </select>
            </Field>
            <Field label="Have you worshipped with us online before?">
              <select name="worshippedOnline" value={form.worshippedOnline} onChange={set("worshippedOnline")} className={selectCls}>
                <option value="">Select option</option>
                <option value="Yes">Yes</option>
                <option value="No">No</option>
              </select>
            </Field>
          </div>

          <div className={row}>
            <Field label="Would you consider attending RCCG Rose of Sharon regularly?">
              <select name="attendRegularly" value={form.attendRegularly} onChange={set("attendRegularly")} className={selectCls}>
                <option value="">Select option</option>
                <option value="Yes">Yes</option>
                <option value="No">No</option>
                <option value="Maybe">Maybe</option>
              </select>
            </Field>
            <Field label="Preferred means of contact">
              <select name="preferredContact" value={form.preferredContact} onChange={set("preferredContact")} className={selectCls}>
                <option value="">Select option</option>
                <option value="Call">Call</option>
                <option value="WhatsApp">WhatsApp</option>
                <option value="Email">Email</option>
              </select>
            </Field>
          </div>

          <Field label="Prayer Request">
            <textarea name="prayerRequest" rows={4} placeholder="Enter your prayer request" value={form.prayerRequest} onChange={set("prayerRequest")} className={inputCls} />
          </Field>

          {error && <p className="ros:text-sm ros:text-red-600">{error}</p>}

          <div className="ros:flex ros:justify-end ros:pb-10 ros:pt-4">
            <button
              type="submit"
              disabled={status === "loading"}
              className="ros:rounded-xl ros:bg-[#000080] ros:px-10 ros:py-3 ros:text-sm ros:font-semibold ros:text-white ros:transition-colors ros:hover:bg-[#000066] ros:disabled:cursor-not-allowed ros:disabled:opacity-60"
            >
              {status === "loading" ? "Saving..." : "Save"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
