"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { FormField, inputCls, wrapCls, selectCls } from "@/components/ui/FormField";
import { post } from "@/lib/api";

const vs = { fontVariationSettings: '"wdth" 100' };

export default function NewBelieverPage() {
  const [form, setForm] = useState({
    firstName: "", middleName: "", lastName: "",
    countryCode: "+234", phoneNumber: "", email: "",
    sex: "", street: "", city: "", state: "", country: "Nigeria",
  });
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [error, setError] = useState("");

  function set(k: string) {
    return (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) =>
      setForm((p) => ({ ...p, [k]: e.target.value }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("loading");
    setError("");
    try {
      await post("/new-converts", {
        firstName: form.firstName,
        middleName: form.middleName || undefined,
        lastName: form.lastName,
        countryCode: form.countryCode,
        phoneNumber: form.phoneNumber,
        email: form.email || undefined,
        sex: form.sex,
        street: form.street || undefined,
        city: form.city || undefined,
        state: form.state || undefined,
        country: form.country || undefined,
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
          <Image src="/assets/thanksgiving-bg.png" alt="" fill className="object-cover pointer-events-none" priority />
          <div className="absolute inset-0 bg-[rgba(0,0,128,0.75)]" />
        </div>
        <Navbar />
        <div className="absolute left-1/2 top-[calc(50%+48px)] -translate-x-1/2 -translate-y-1/2 flex flex-col gap-[24px] items-center w-[1148px] z-10 text-center">
          <h1 className="text-[#FFFDFD] text-[72px] font-medium leading-normal w-full" style={vs}>
            I&apos;m a New Believer
          </h1>
          <p className="text-[#FFFDFD] text-[20px] font-normal leading-[32px] w-full" style={vs}>
            Congratulations on your decision to follow Jesus! Register below and we will connect you to resources and people to help you grow in faith.
          </p>
        </div>
      </section>

      {/* What to Expect */}
      <section className="bg-[#D2D2E2] px-[120px] py-[84px] flex flex-col gap-[48px] items-center w-full">
        <h2 className="text-[#100E1A] text-[48px] font-bold leading-normal text-center" style={vs}>
          What Happens Next?
        </h2>
        <div className="grid gap-[24px] w-full" style={{ gridTemplateColumns: "repeat(3, 1fr)" }}>
          {[
            { step: "01", title: "Believer's Class", desc: "Join our free believer's class to understand your new faith, the church, and how to live as a Christian." },
            { step: "02", title: "Personal Follow-up", desc: "A dedicated team member will reach out to welcome you and answer any questions you may have." },
            { step: "03", title: "Join a Group", desc: "Get connected to a small group or ministry within the church where you can grow and build relationships." },
          ].map((item) => (
            <div key={item.step} className="bg-white rounded-[16px] flex flex-col gap-[16px] p-[32px] shadow-[0px_4px_20px_rgba(0,0,0,0.08)]">
              <span className="text-[#000080] text-[48px] font-bold leading-none" style={vs}>{item.step}</span>
              <h3 className="text-[#100E1A] text-[20px] font-bold leading-normal" style={vs}>{item.title}</h3>
              <p className="text-[#A3A1AF] text-[16px] font-normal leading-[1.6]" style={vs}>{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Registration Form */}
      <section className="bg-[#100E1A] px-[120px] py-[84px] flex flex-col gap-[32px] items-center w-full">
        <h2 className="text-[#FFFDFD] text-[48px] font-bold leading-normal text-center" style={vs}>
          Register as a New Believer
        </h2>
        <p className="text-[#A3A1AF] text-[20px] font-normal leading-normal text-center max-w-[700px]" style={vs}>
          Fill out the form below and a member of our New Converts team will reach out to you.
        </p>

        {status === "success" ? (
          <div className="flex flex-col gap-[24px] items-center max-w-[600px] text-center">
            <div className="size-[80px] rounded-full bg-[#000080] flex items-center justify-center text-[36px] text-white">✓</div>
            <p className="text-[#FFFDFD] text-[25px] font-medium" style={vs}>Welcome to the Kingdom!</p>
            <p className="text-[#A3A1AF] text-[20px] font-normal" style={vs}>
              Your registration has been received. Our New Converts team will contact you shortly. Heaven is rejoicing over your decision!
            </p>
            <Link
              href="/trainings/water-baptism"
              className="bg-[#000080] px-[32px] py-[16px] rounded-[33px] text-[#FFFDFD] text-[20px] font-medium hover:bg-[#0000a0] transition-colors"
              style={vs}
            >
              Register for Water Baptism →
            </Link>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="flex flex-col gap-[16px] w-full max-w-[700px]">
            <div className="grid grid-cols-3 gap-[16px] w-full">
              <FormField label="First Name" required>
                <div className={wrapCls}>
                  <input type="text" required value={form.firstName} onChange={set("firstName")} className={inputCls} placeholder="First name" />
                </div>
              </FormField>
              <FormField label="Middle Name">
                <div className={wrapCls}>
                  <input type="text" value={form.middleName} onChange={set("middleName")} className={inputCls} placeholder="Middle name" />
                </div>
              </FormField>
              <FormField label="Last Name" required>
                <div className={wrapCls}>
                  <input type="text" required value={form.lastName} onChange={set("lastName")} className={inputCls} placeholder="Last name" />
                </div>
              </FormField>
            </div>

            <FormField label="Gender" required>
              <div className={wrapCls}>
                <select required value={form.sex} onChange={set("sex")} className={selectCls}>
                  <option value="">Select gender</option>
                  <option value="MALE">Male</option>
                  <option value="FEMALE">Female</option>
                </select>
              </div>
            </FormField>

            <div className="grid grid-cols-2 gap-[16px] w-full">
              <FormField label="Phone Number" required>
                <div className="flex gap-[8px] w-full h-[40px]">
                  <div className="bg-[#FFFDFD] border border-[#A3A1AF] rounded-[4px] flex-shrink-0 w-[90px] flex items-center">
                    <select value={form.countryCode} onChange={set("countryCode")} className="w-full h-full px-2 bg-transparent text-[#100E1A] text-sm focus:outline-none">
                      <option value="+234">+234</option>
                      <option value="+1">+1</option>
                      <option value="+44">+44</option>
                    </select>
                  </div>
                  <div className={`${wrapCls} flex-1`}>
                    <input type="tel" required value={form.phoneNumber} onChange={set("phoneNumber")} className={inputCls} placeholder="080 0000 0000" />
                  </div>
                </div>
              </FormField>
              <FormField label="Email Address">
                <div className={wrapCls}>
                  <input type="email" value={form.email} onChange={set("email")} className={inputCls} placeholder="your@email.com" />
                </div>
              </FormField>
            </div>

            <FormField label="Home Address">
              <div className={wrapCls}>
                <input type="text" value={form.street} onChange={set("street")} className={inputCls} placeholder="Street address" />
              </div>
            </FormField>

            <div className="grid grid-cols-3 gap-[16px] w-full">
              <FormField label="City">
                <div className={wrapCls}>
                  <input type="text" value={form.city} onChange={set("city")} className={inputCls} placeholder="City" />
                </div>
              </FormField>
              <FormField label="State">
                <div className={wrapCls}>
                  <input type="text" value={form.state} onChange={set("state")} className={inputCls} placeholder="State" />
                </div>
              </FormField>
              <FormField label="Country">
                <div className={wrapCls}>
                  <input type="text" value={form.country} onChange={set("country")} className={inputCls} />
                </div>
              </FormField>
            </div>

            {status === "error" && (
              <p className="text-[#FF383C] text-[14px] font-normal text-center" style={vs}>{error}</p>
            )}

            <div className="flex justify-center mt-[8px]">
              <button
                type="submit"
                disabled={status === "loading"}
                className="bg-[#000080] drop-shadow-[19px_19px_20px_rgba(0,0,0,0.1)] px-[32px] py-[16px] rounded-[33px] text-[#FFFDFD] text-[25px] font-medium hover:bg-[#0000a0] transition-colors disabled:opacity-60"
                style={vs}
              >
                {status === "loading" ? "Submitting..." : "REGISTER"}
              </button>
            </div>
          </form>
        )}
      </section>

      <Footer />
    </main>
  );
}
