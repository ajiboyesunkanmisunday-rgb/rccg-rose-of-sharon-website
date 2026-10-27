"use client";

import { useState } from "react";
import { FormHero } from "@ros/shared/kit/ui";
import YouthTabs from "@/components/YouthTabs";
import { FormCard, FormField, FormSheet, inputCls, selectCls, textareaCls, submitCls } from "@ros/shared/kit/form";
import { DEPARTMENTS } from "@ros/shared/kit/youth";
import { post } from "@ros/shared/api";

export default function YouthJoin() {
  const [f, setF] = useState({ name: "", phone: "", email: "", gender: "", age: "", interest: "just-visiting", dept: "", message: "" });
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [error, setError] = useState("");
  const set = (k: string) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => setF((p) => ({ ...p, [k]: e.target.value }));

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("loading"); setError("");
    const content = [
      `Name: ${f.name}`, `Phone: ${f.phone}`, f.email && `Email: ${f.email}`, f.gender && `Gender: ${f.gender}`, f.age && `Age group: ${f.age}`,
      `Interest: ${f.interest === "serve" ? "Serve in a department" : f.interest === "member" ? "Become a youth member" : "Just visiting"}`,
      f.dept && `Department: ${f.dept}`, f.message && `Message: ${f.message}`,
    ].filter(Boolean).join("\n");
    try {
      await post("/requests/suggestion", { subject: "Youth Fellowship — Join Request", content });
      setStatus("success");
    } catch (err) {
      setStatus("error"); setError(err instanceof Error ? err.message : "Something went wrong. Please try again.");
    }
  }

  return (
    <>
      <FormHero pill="🤝 JOIN THE YOUTH" title={<>Join the <span className="text-textRed">Youth</span> Fellowship</>} subtitle="Tell us a little about yourself and the youth team will reach out." />
      <FormSheet wide>
        <YouthTabs />
        {status === "success" ? (
          <div className="ros:mx-auto ros:flex ros:max-w-[500px] ros:flex-col ros:items-center ros:gap-4 ros:rounded-2xl ros:p-8 ros:text-center">
            <div className="ros:flex ros:size-[72px] ros:items-center ros:justify-center ros:rounded-full ros:bg-green-100">
              <svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="#16a34a" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12" /></svg>
            </div>
            <p className="ros:text-[22px] ros:font-bold ros:text-[#DF4E4E]">Welcome to the youth!</p>
            <p className="ros:text-[15px] ros:text-[#6B7280]">We have received your details. Someone from the youth team will be in touch soon.</p>
            <button onClick={() => { setStatus("idle"); setF({ name: "", phone: "", email: "", gender: "", age: "", interest: "just-visiting", dept: "", message: "" }); }} className="ros:text-[14px] ros:font-medium ros:text-[#DF4E4E] hover:ros:underline">Send another</button>
          </div>
        ) : (
          <form onSubmit={submit} className="ros:mx-auto ros:flex ros:w-full ros:max-w-[860px] ros:flex-col ros:gap-4">
            <FormCard title="About you">
              <div className="ros:grid ros:grid-cols-1 ros:gap-4 ros:sm:grid-cols-2">
                <FormField label="Full name" required><input required className={inputCls} value={f.name} onChange={set("name")} placeholder="Your full name" /></FormField>
                <FormField label="Phone number" required><input required className={inputCls} value={f.phone} onChange={set("phone")} inputMode="tel" placeholder="e.g. 0801 234 5678" /></FormField>
                <FormField label="Email"><input type="email" className={inputCls} value={f.email} onChange={set("email")} placeholder="you@example.com" /></FormField>
                <FormField label="Gender">
                  <select className={selectCls} value={f.gender} onChange={set("gender")}><option value="">Select</option><option value="Male">Male</option><option value="Female">Female</option></select>
                </FormField>
                <FormField label="Age group">
                  <select className={selectCls} value={f.age} onChange={set("age")}><option value="">Select</option><option>Under 16</option><option>16 – 20</option><option>21 – 25</option><option>26 – 30</option><option>31 – 35</option></select>
                </FormField>
              </div>
            </FormCard>
            <FormCard title="How would you like to be involved?">
              <div className="ros:grid ros:grid-cols-1 ros:gap-4 ros:sm:grid-cols-2">
                <FormField label="I would like to">
                  <select className={selectCls} value={f.interest} onChange={set("interest")}><option value="just-visiting">Visit the youth fellowship</option><option value="member">Become a youth member</option><option value="serve">Serve in a department</option></select>
                </FormField>
                {f.interest === "serve" && (
                  <FormField label="Department">
                    <select className={selectCls} value={f.dept} onChange={set("dept")}><option value="">Choose a department</option>{DEPARTMENTS.map((d) => <option key={d.slug}>{d.name}</option>)}</select>
                  </FormField>
                )}
              </div>
              <div className="ros:mt-4"><FormField label="Anything else you would like us to know?"><textarea rows={4} className={textareaCls} value={f.message} onChange={set("message")} /></FormField></div>
            </FormCard>
            {status === "error" && <p role="alert" className="ros:rounded-lg ros:bg-red-50 ros:px-4 ros:py-3 ros:text-sm ros:font-semibold ros:text-red-700">{error}</p>}
            <button type="submit" disabled={status === "loading"} className={submitCls + " ros:self-center"}>{status === "loading" ? "Sending…" : "Send"}</button>
          </form>
        )}
      </FormSheet>
    </>
  );
}
