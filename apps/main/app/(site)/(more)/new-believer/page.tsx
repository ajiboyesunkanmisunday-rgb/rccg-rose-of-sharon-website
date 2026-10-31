"use client";

import { useEffect, useState } from "react";
import Link from "@ros/shared/link";
import { FormHero } from "@ros/shared/kit/ui";
import { post } from "@ros/shared/api";
import PhoneField from "@ros/shared/kit/PhoneField";
import SearchSelect from "@ros/shared/kit/SearchSelect";
import { CountryState, R_BUTTON, R_INPUT, R_SELECT, RError, RField, RSpinner } from "@ros/shared/kit/RosmsForm";

type Service = { id: string; title?: string; topic?: string; date?: string; eventCategory?: string };

const EMPTY = {
  firstName: "", middleName: "", lastName: "",
  countryCode: "+234", phoneNumber: "", email: "", sex: "", eventId: "",
  street: "", city: "", country: "Nigeria", state: "",
};

const dayIso = (d: Date) => `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;

export default function NewBelieverPage() {
  const [form, setForm] = useState(EMPTY);
  const [services, setServices] = useState<Service[] | null>(null);
  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState(false);
  const [error, setError] = useState("");

  // "Service Attended": the church's services from the last two months, from the same calendar as the Events page
  useEffect(() => {
    const to = new Date();
    const from = new Date(to.getTime() - 60 * 86400000);
    fetch(`/ros-api/events/calendar?startDay=${dayIso(from)}&endDay=${dayIso(to)}`)
      .then((r) => (r.ok ? r.json() : []))
      .then((list: Service[]) => setServices((Array.isArray(list) ? list : []).filter((e) => !e.eventCategory || ["SERVICE", "SPECIAL_SERVICE"].includes(e.eventCategory)).sort((a, b) => String(b.date).localeCompare(String(a.date)))))
      .catch(() => setServices([]));
  }, []);

  const set = (k: keyof typeof EMPTY) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => setForm((p) => ({ ...p, [k]: e.target.value }));
  const put = (k: keyof typeof EMPTY) => (v: string) => setForm((p) => ({ ...p, [k]: v }));

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      await post("/new-converts", {
        firstName: form.firstName.trim(),
        middleName: form.middleName.trim() || undefined,
        lastName: form.lastName.trim(),
        email: form.email.trim() || undefined,
        phoneNumber: form.phoneNumber,
        countryCode: form.countryCode.replace(/^\+/, ""),
        sex: form.sex || undefined,
        street: form.street.trim() || undefined,
        city: form.city.trim() || undefined,
        state: form.state || undefined,
        country: form.country || undefined,
        eventId: form.eventId || undefined,
      });
      setDone(true);
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Submission failed. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  const serviceOptions = (services ?? []).map((s) => ({
    label: `${s.title ?? s.topic ?? "Service"}${s.date ? " — " + new Date(s.date).toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" }) : ""}`,
    value: s.id,
  }));

  return (
    <div>
      <FormHero pill="FORMS" title={<>I'm a New <span className="text-textRed">Believer</span></>} subtitle="Congratulations on your decision to follow Jesus! Register below and we will connect you to resources and people to help you grow in faith." />

      {/* What to Expect */}
      <section className="ros:bg-[#F4F4F4] ros:px-4 ros:md:px-[60px] ros:lg:px-[120px] ros:py-[84px] ros:flex ros:flex-col ros:gap-[48px] ros:items-center ros:w-full">
        <h2 className="ros-anton ros:uppercase ros:text-[#000000] ros:text-[48px] ros:leading-normal ros:text-center">
          What Happens Next?
        </h2>
        <div className="ros:grid ros:w-full ros:grid-cols-1 ros:gap-[24px] ros:md:grid-cols-3">
          {[
            { step: "01", title: "Believer's Class", desc: "Join our free believer's class to understand your new faith, the church, and how to live as a Christian." },
            { step: "02", title: "Personal Follow-up", desc: "A dedicated team member will reach out to welcome you and answer any questions you may have." },
            { step: "03", title: "Join a Group", desc: "Get connected to a small group or ministry within the church where you can grow and build relationships." },
          ].map((item) => (
            <div key={item.step} className="ros:bg-white ros:rounded-[16px] ros:flex ros:flex-col ros:gap-[16px] ros:p-[32px] ros:shadow-[0px_4px_20px_rgba(0,0,0,0.08)]">
              <span className="ros:text-[#DF4E4E] ros:text-[48px] ros:font-bold ros:leading-none">{item.step}</span>
              <h3 className="ros:text-[#000000] ros:text-[20px] ros:font-bold ros:leading-normal">{item.title}</h3>
              <p className="ros:text-[#A3A1AF] ros:text-[16px] ros:font-normal ros:leading-[1.6]">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Registration form: laid out like the ROSMS New Convert registration */}
      <div className="ros:bg-[#F9FAFB] ros:py-12">
        <div className="ros:mx-auto ros:max-w-2xl ros:px-4">
          {done ? (
            <div className="ros:flex ros:flex-col ros:items-center ros:py-16 ros:text-center">
              <div className="ros:mb-4 ros:flex ros:h-16 ros:w-16 ros:items-center ros:justify-center ros:rounded-full ros:bg-green-100">
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#16a34a" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12" /></svg>
              </div>
              <h2 className="ros:text-2xl ros:font-bold ros:text-[#000080]">Submission Successful!</h2>
              <p className="ros:mt-2 ros:text-gray-600">Thank you! Your information has been recorded. Our New Converts team will contact you shortly. Heaven is rejoicing over your decision!</p>
              <div className="ros:mt-6 ros:flex ros:flex-wrap ros:justify-center ros:gap-3">
                <Link href="/trainings/water-baptism" className="ros:rounded-lg ros:border ros:border-[#000080] ros:px-6 ros:py-3 ros:font-medium ros:text-[#000080]">Register for Water Baptism →</Link>
                <button type="button" onClick={() => { setForm(EMPTY); setDone(false); }} className="ros:rounded-lg ros:bg-[#000080] ros:px-6 ros:py-3 ros:font-medium ros:text-white">Submit Another</button>
              </div>
            </div>
          ) : (
            <>
              <div className="ros:mb-6">
                <h2 className="ros:text-xl ros:font-bold ros:text-[#000080]">New Convert Registration</h2>
                <p className="ros:mt-0.5 ros:text-sm ros:text-gray-500">Welcome to the family of God!</p>
              </div>
              <form onSubmit={handleSubmit}>
                <div className="ros:mb-8 ros:rounded-xl ros:border ros:border-[#E5E7EB] ros:bg-white ros:p-4 ros:sm:p-6">
                  <h2 className="ros:mb-6 ros:text-[18px] ros:font-bold ros:text-black">Enter Details</h2>
                  <div className="ros:grid ros:grid-cols-1 ros:gap-x-6 ros:gap-y-4 ros:md:grid-cols-2">
                    <RField label="First Name" required><input type="text" value={form.firstName} onChange={set("firstName")} placeholder="Enter First Name" className={R_INPUT} required /></RField>
                    <RField label="Middle Name"><input type="text" value={form.middleName} onChange={set("middleName")} placeholder="Enter Middle Name (optional)" className={R_INPUT} /></RField>
                    <RField label="Last Name" required><input type="text" value={form.lastName} onChange={set("lastName")} placeholder="Enter Last Name" className={R_INPUT} required /></RField>
                    <PhoneField label="Phone Number" code={form.countryCode} number={form.phoneNumber} onCodeChange={put("countryCode")} onNumberChange={put("phoneNumber")} placeholder="Enter Phone Number" />
                    <RField label="Email"><input type="email" value={form.email} onChange={set("email")} placeholder="Enter Email" className={R_INPUT} /></RField>
                    <RField label="Gender">
                      <select value={form.sex} onChange={set("sex")} className={R_SELECT}>
                        <option value="">Select Gender</option>
                        <option value="MALE">Male</option>
                        <option value="FEMALE">Female</option>
                      </select>
                    </RField>
                    <RField label="Service Attended">
                      <SearchSelect placeholder={services === null ? "Loading services..." : serviceOptions.length ? "Select Service" : "No recent services found"} searchPlaceholder="Search services..." options={serviceOptions} value={form.eventId} onChange={put("eventId")} disabled={!serviceOptions.length} />
                    </RField>
                  </div>
                </div>

                <div className="ros:mb-8 ros:rounded-xl ros:border ros:border-[#E5E7EB] ros:bg-white ros:p-4 ros:sm:p-6">
                  <h2 className="ros:mb-6 ros:text-[18px] ros:font-bold ros:text-black">Address</h2>
                  <div className="ros:grid ros:grid-cols-1 ros:gap-x-6 ros:gap-y-4 ros:md:grid-cols-2">
                    <RField label="Street"><input type="text" value={form.street} onChange={set("street")} placeholder="Enter Street" className={R_INPUT} /></RField>
                    <RField label="City"><input type="text" value={form.city} onChange={set("city")} placeholder="Enter City" className={R_INPUT} /></RField>
                    <CountryState country={form.country} state={form.state} onCountry={put("country")} onState={put("state")} />
                  </div>
                </div>

                <RError message={error} />
                <div className="ros:flex ros:justify-end">
                  <button type="submit" disabled={loading} className={`${R_BUTTON} ros:w-full ros:sm:w-auto`}>
                    {loading && <RSpinner />}
                    {loading ? "Saving…" : "Save"}
                  </button>
                </div>
              </form>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
