"use client";

import { Hero } from "@ros/shared/kit/ui";
import ProgramTabs from "@/components/ProgramTabs";
import CsrMedia from "@/components/CsrMedia";

import { useState } from "react";
import Image from "next/image";
import { post } from "@ros/shared/api";


const skills = [
  {
    icon: "💄",
    title: "Make Up & Gele Tying",
    desc: "Professional makeup artistry and the art of gele tying — from bridal to everyday looks and editorial styling.",
  },
  {
    icon: "📱",
    title: "Digital Marketing & AI",
    desc: "Learn SEO, social media strategy, paid advertising, AI-powered tools, and how to grow a business online.",
    highlight: true,
    badge: "14–16 weeks · ₦10,000",
  },
  {
    icon: "✂️",
    title: "Hair Dressing",
    desc: "Hair styling, braiding, colouring, treatments, and building a professional salon practice.",
  },
  {
    icon: "🍳",
    title: "Catering",
    desc: "Professional cooking, food hygiene, event catering management, and starting a food business.",
  },
  {
    icon: "🧵",
    title: "Textile Design",
    desc: "Fabric selection, dyeing, weaving, and creating beautiful textile products from scratch.",
  },
  {
    icon: "👗",
    title: "Fashion Design",
    desc: "Pattern making, garment construction, and building a fashion brand — from sketch to finished piece.",
  },
];

const benefits = [
  { label: "Expert Instructors", desc: "Learn from experienced professionals in each field" },
  { label: "Hands-On Training", desc: "Practical sessions — not just theory" },
  { label: "Certification", desc: "Receive a certificate of completion for each course" },
  { label: "Community Network", desc: "Connect with fellow graduates for referrals and opportunities" },
  { label: "Free Registration", desc: "No registration fee — tuition is only ₦10,000 per course" },
  { label: "Spiritual Foundation", desc: "Skills training grounded in godly values and purpose" },
];

export default function CSRPage() {
  const [form, setForm] = useState({ fullName: "", email: "", phone: "", skill: "", message: "" });
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("loading");
    try {
      await post("/requests/suggestion", {
        fullName: form.fullName,
        email: form.email,
        phone: form.phone,
        subject: `CSR Interest — ${form.skill || "General"}`,
        content: `Name: ${form.fullName}\nEmail: ${form.email}\nPhone: ${form.phone}\nSkill of Interest: ${form.skill}\nMessage: ${form.message}`,
      });
      setStatus("success");
    } catch {
      setStatus("error");
    }
  }

  return (
    <div>
      <Hero pill="🌍 CHRISTIAN SOCIAL RESPONSIBILITY" title={<>Equipping You to Excel & <span className="text-textRed">Create</span></>} subtitle="CSR is our church's vocational training centre — empowering members of our community with practical skills to build sustainable livelihoods." bg="/assets/hero-bg.png" />
      <div className="ros:mx-auto ros:max-w-7xl ros:px-4 ros:pt-10"><ProgramTabs slug="csr" /></div>

      {/* ── What is CSR ── */}
      <section className="ros:bg-[#000000] ros:px-6 ros:md:px-[60px] ros:lg:px-[120px] ros:py-[60px] ros:md:py-[84px] ros:flex ros:flex-col ros:lg:flex-row ros:gap-8 ros:lg:gap-[80px] ros:items-start ros:lg:items-center ros:w-full">
        <div className="ros:flex ros:flex-col ros:gap-[24px] ros:flex-1 ros:min-w-0">
          <p className="ros:text-[#FFFFFFB3] ros:text-[14px] ros:font-normal ros:uppercase ros:tracking-[0.2em]">Our Vision</p>
          <h2 className="ros-anton ros:uppercase ros:text-[#FFFDFD] ros:text-[26px] ros:md:text-[38px] ros:lg:text-[48px] ros:leading-[1.2]">What is CSR?</h2>
          <p className="ros:text-[#A3A1AF] ros:text-[16px] ros:md:text-[18px] ros:font-normal ros:leading-[1.8]">
            The Christian Social Responsibility (CSR) centre is Rose of Sharon&apos;s commitment to the total wellbeing of our community — not just spiritual growth, but economic empowerment and social transformation.
          </p>
          <p className="ros:text-[#A3A1AF] ros:text-[16px] ros:md:text-[18px] ros:font-normal ros:leading-[1.8]">
            We believe that when the church equips its people with practical skills, it multiplies its impact in homes, workplaces, and communities. CSR offers structured, hands-on vocational training — all rooted in excellence and godly values.
          </p>

          {/* Practical info strip */}
          <div className="ros:flex ros:flex-col ros:gap-[14px] ros:mt-[4px] ros:bg-[#111111] ros:rounded-[16px] ros:p-[20px] ros:border ros:border-[#FFFFFFB3]/10">
            <div className="ros:flex ros:items-start ros:gap-[12px]">
              <span className="ros:text-[18px] ros:mt-[1px]">📍</span>
              <div>
                <p className="ros:text-[#FFFDFD] ros:text-[14px] ros:font-semibold">Location</p>
                <p className="ros:text-[#A3A1AF] ros:text-[13px] ros:leading-[1.6]">49B, Ladipo Bateye Street (Street Behind Church), GRA, Ikeja Lagos</p>
              </div>
            </div>
            <div className="ros:flex ros:items-start ros:gap-[12px]">
              <span className="ros:text-[18px] ros:mt-[1px]">🗓️</span>
              <div>
                <p className="ros:text-[#FFFDFD] ros:text-[14px] ros:font-semibold">Days & Hours</p>
                <p className="ros:text-[#A3A1AF] ros:text-[13px] ros:leading-[1.6]">Monday, Tuesday, Thursday &amp; Friday · 9:00 AM – 2:00 PM</p>
              </div>
            </div>
            <div className="ros:flex ros:items-start ros:gap-[12px]">
              <span className="ros:text-[18px] ros:mt-[1px]">💰</span>
              <div>
                <p className="ros:text-[#FFFDFD] ros:text-[14px] ros:font-semibold">Fees</p>
                <p className="ros:text-[#A3A1AF] ros:text-[13px] ros:leading-[1.6]">Registration is <span className="ros:text-[#FFFFFFB3] ros:font-semibold">FREE</span> · Tuition is <span className="ros:text-[#FFFFFFB3] ros:font-semibold">₦10,000</span> per course</p>
              </div>
            </div>
            <div className="ros:flex ros:items-start ros:gap-[12px]">
              <span className="ros:text-[18px] ros:mt-[1px]">📞</span>
              <div>
                <p className="ros:text-[#FFFDFD] ros:text-[14px] ros:font-semibold">Enquiries</p>
                <p className="ros:text-[#A3A1AF] ros:text-[13px] ros:leading-[1.6]">08175856498 · 07061939710 · 08053649231</p>
              </div>
            </div>
          </div>

          <div className="ros:flex ros:flex-wrap ros:gap-[12px] ros:mt-[4px]">
            {["Vocational Training", "Professional Skills", "Business Mentoring", "Community Impact"].map(tag => (
              <span key={tag} className="ros:px-[16px] ros:py-[8px] ros:rounded-full ros:bg-[#FFFFFFB3]/10 ros:border ros:border-[#FFFFFFB3]/20 ros:text-[#FFFFFFB3] ros:text-[13px] ros:font-medium">
                {tag}
              </span>
            ))}
          </div>
        </div>

        <div className="ros:grid ros:grid-cols-1 ros:sm:grid-cols-2 ros:gap-[16px] ros:w-full ros:lg:w-[480px] ros:lg:flex-shrink-0">
          {benefits.map(b => (
            <div key={b.label} className="ros:bg-[#111111] ros:rounded-[16px] ros:p-[20px] ros:flex ros:flex-col ros:gap-[8px] ros:border ros:border-[#FFFFFFB3]/10">
              <p className="ros:text-[#FFFDFD] ros:text-[15px] ros:font-bold">{b.label}</p>
              <p className="ros:text-[#A3A1AF] ros:text-[13px] ros:leading-[1.6]">{b.desc}</p>
            </div>
          ))}
        </div>
      </section>

      <CsrMedia />

      {/* ── Skills Offered ── */}
      <section id="skills" className="ros:bg-[#F4F4F4] ros:px-6 ros:md:px-[60px] ros:lg:px-[120px] ros:py-[60px] ros:md:py-[84px] ros:flex ros:flex-col ros:gap-[40px] ros:md:gap-[48px] ros:items-center ros:w-full">
        <div className="ros:flex ros:flex-col ros:gap-[8px] ros:items-center ros:text-center">
          <p className="ros:text-[#DF4E4E] ros:text-[14px] ros:font-normal ros:uppercase ros:tracking-[0.2em]">What We Teach</p>
          <h2 className="ros-anton ros:uppercase ros:text-[#000000] ros:text-[24px] ros:md:text-[38px] ros:lg:text-[48px] ros:leading-normal">Skills We Offer</h2>
          <p className="ros:text-[#A3A1AF] ros:text-[16px] ros:md:text-[18px] ros:font-normal ros:max-w-[600px]">
            Practical, hands-on courses taught by experienced professionals — each one designed to help you build a real livelihood.
          </p>
        </div>

        <div className="ros:grid ros:grid-cols-1 ros:sm:grid-cols-2 ros:lg:grid-cols-3 ros:gap-[16px] ros:md:gap-[20px] ros:w-full">
          {skills.map(skill => (
            <div
              key={skill.title}
              className={`ros:rounded-[20px] ros:p-[24px] ros:md:p-[28px] ros:flex ros:flex-col ros:gap-[16px] ros:shadow-[0px_4px_20px_rgba(0,0,0,0.06)] ros:hover:shadow-[0px_8px_32px_rgba(0,0,0,0.12)] ros:hover:-translate-y-[4px] ros:transition-all ros:group ros:relative ros:overflow-hidden ${skill.highlight ? "ros:bg-[#DF4E4E]" : "ros:bg-white"}`}
            >
              {skill.highlight && (
                <div className="ros:absolute ros:top-[16px] ros:right-[16px]">
                  <span className="ros:px-[10px] ros:py-[4px] ros:bg-[#FFFFFFB3] ros:text-[#DF4E4E] ros:text-[10px] ros:font-bold ros:rounded-full ros:uppercase ros:tracking-wider">
                    Featured
                  </span>
                </div>
              )}
              <div className={`ros:size-[52px] ros:md:size-[56px] ros:rounded-[14px] ros:flex ros:items-center ros:justify-center ros:text-[26px] ros:md:text-[28px] ros:transition-colors ${skill.highlight ? "ros:bg-white/15" : "ros:bg-[#DF4E4E]/8 ros:group-hover:bg-[#DF4E4E]/15"}`}>
                {skill.icon}
              </div>
              <div className="ros:flex ros:flex-col ros:gap-[8px]">
                <p className={`ros:text-[16px] ros:md:text-[17px] ros:font-bold ros:leading-tight ${skill.highlight ? "ros:text-[#FFFDFD]" : "ros:text-[#000000]"}`}>
                  {skill.title}
                </p>
                <p className={`ros:text-[13px] ros:leading-[1.6] ${skill.highlight ? "ros:text-[#FFFFFFB3]" : "ros:text-[#A3A1AF]"}`}>
                  {skill.desc}
                </p>
                {skill.badge && (
                  <p className="ros:text-[#FFFDFD]/60 ros:text-[11px] ros:font-semibold ros:mt-[4px]">{skill.badge}</p>
                )}
              </div>
            </div>
          ))}
        </div>

        <p className="ros:text-[#A3A1AF] ros:text-[15px] ros:text-center ros:italic">
          New skills added each season — check back regularly or call us to ask about upcoming courses.
        </p>
      </section>

      {/* ── How It Works ── */}
      <section className="ros:bg-[#000000] ros:px-6 ros:md:px-[60px] ros:lg:px-[120px] ros:py-[60px] ros:md:py-[84px] ros:flex ros:flex-col ros:gap-[40px] ros:md:gap-[48px] ros:items-center ros:w-full">
        <div className="ros:flex ros:flex-col ros:gap-[8px] ros:items-center ros:text-center">
          <p className="ros:text-[#FFFFFFB3] ros:text-[14px] ros:font-normal ros:uppercase ros:tracking-[0.2em]">Simple Process</p>
          <h2 className="ros-anton ros:uppercase ros:text-[#FFFDFD] ros:text-[24px] ros:md:text-[38px] ros:lg:text-[48px] ros:leading-normal">How to Join</h2>
        </div>

        <div className="ros:flex ros:flex-col ros:md:flex-row ros:flex-wrap ros:items-start ros:justify-center ros:gap-8 ros:w-full">
          {[
            { step: "01", title: "Register Interest", desc: "Fill out the form below or call us to express interest in a course." },
            { step: "02", title: "Orientation", desc: "Attend a brief orientation — we share the schedule, tools needed, and expectations." },
            { step: "03", title: "Training Begins", desc: "Join your class and learn from expert instructors in hands-on sessions, Mon–Fri." },
            { step: "04", title: "Graduation", desc: "Complete the course, receive your certificate, and join our growing community of graduates." },
          ].map((item, i, arr) => (
            <div key={item.step} className="ros:flex ros:md:flex-row ros:items-start ros:gap-4 ros:md:gap-0 ros:w-full ros:md:w-auto">
              <div className="ros:flex ros:flex-col ros:items-center ros:gap-[16px] ros:w-full ros:md:w-[200px] ros:lg:w-[220px]">
                <div className="ros:size-[60px] ros:md:size-[72px] ros:rounded-full ros:bg-[#DF4E4E] ros:flex ros:items-center ros:justify-center ros:border-4 ros:border-[#FFFFFFB3]/20">
                  <span className="ros:text-[#FFFDFD] ros:text-[18px] ros:md:text-[22px] ros:font-bold">{item.step}</span>
                </div>
                <div className="ros:flex ros:flex-col ros:gap-[6px] ros:text-center">
                  <p className="ros:text-[#FFFDFD] ros:text-[15px] ros:md:text-[17px] ros:font-bold">{item.title}</p>
                  <p className="ros:text-[#A3A1AF] ros:text-[13px] ros:leading-[1.6]">{item.desc}</p>
                </div>
              </div>
              {i < arr.length - 1 && (
                <div className="ros:hidden ros:md:block ros:h-[2px] ros:w-[32px] ros:lg:w-[48px] ros:bg-[#FFFFFFB3]/20 ros:flex-shrink-0 ros:mt-[34px]" />
              )}
            </div>
          ))}
        </div>
      </section>

      {/* ── Register Form ── */}
      <section id="register" className="ros:bg-[#EEF0F7] ros:px-6 ros:md:px-[60px] ros:lg:px-[120px] ros:py-[60px] ros:md:py-[84px] ros:flex ros:flex-col ros:lg:flex-row ros:gap-8 ros:lg:gap-[80px] ros:items-start ros:w-full">
        <div className="ros:flex ros:flex-col ros:gap-[24px] ros:flex-1 ros:min-w-0 ros:lg:max-w-[440px]">
          <div className="ros:flex ros:flex-col ros:gap-[8px]">
            <p className="ros:text-[#DF4E4E] ros:text-[14px] ros:font-normal ros:uppercase ros:tracking-[0.2em]">Get Started</p>
            <h2 className="ros-anton ros:uppercase ros:text-[#000000] ros:text-[26px] ros:md:text-[36px] ros:lg:text-[40px] ros:leading-[1.2]">Register Your Interest</h2>
          </div>
          <p className="ros:text-[#A3A1AF] ros:text-[16px] ros:md:text-[17px] ros:leading-[1.7]">
            Tell us which skill excites you — our team will reach out with details about the next available intake, schedule, and how to join.
          </p>
          <div className="ros:flex ros:flex-col ros:gap-[12px]">
            {["Open to church members & the community", "No prior experience required", "Registration is FREE — tuition only ₦10,000 per course"].map(item => (
              <div key={item} className="ros:flex ros:items-start ros:gap-[12px]">
                <div className="ros:size-[20px] ros:rounded-full ros:bg-[#DF4E4E] ros:flex ros:items-center ros:justify-center ros:flex-shrink-0 ros:mt-[2px]">
                  <span className="ros:text-white ros:text-[11px] ros:font-bold">✓</span>
                </div>
                <p className="ros:text-[#000000] ros:text-[15px]">{item}</p>
              </div>
            ))}
          </div>

          {/* Contact block */}
          <div className="ros:mt-[8px] ros:flex ros:flex-col ros:gap-[10px] ros:bg-white ros:rounded-[16px] ros:p-[20px] ros:border ros:border-[#F4F4F4]">
            <p className="ros:text-[#000000] ros:text-[14px] ros:font-semibold">Prefer to call?</p>
            <p className="ros:text-[#DF4E4E] ros:text-[13px] ros:font-medium">08175856498</p>
            <p className="ros:text-[#DF4E4E] ros:text-[13px] ros:font-medium">07061939710</p>
            <p className="ros:text-[#DF4E4E] ros:text-[13px] ros:font-medium">08053649231</p>
            <p className="ros:text-[#A3A1AF] ros:text-[12px] ros:mt-[2px]">Or visit us at 49B, Ladipo Bateye Street (behind the church), GRA</p>
          </div>
        </div>

        {/* Form card */}
        <div className="ros:flex-1 ros:min-w-0 ros:bg-white ros:rounded-[24px] ros:p-[28px] ros:md:p-[40px] ros:shadow-[0_8px_40px_rgba(0,0,0,0.10)]">
          {status === "success" ? (
            <div className="ros:flex ros:flex-col ros:gap-[20px] ros:items-center ros:text-center ros:py-[40px]">
              <div className="ros:size-[64px] ros:rounded-full ros:bg-[#DF4E4E] ros:flex ros:items-center ros:justify-center">
                <span className="ros:text-white ros:text-[28px]">✓</span>
              </div>
              <h3 className="ros:text-[#000000] ros:text-[24px] ros:md:text-[28px] ros:font-bold">Registration Received!</h3>
              <p className="ros:text-[#A3A1AF] ros:text-[16px] ros:leading-[1.7] ros:max-w-[340px]">
                Thank you for your interest in the CSR programme. Our team will contact you soon with next steps.
              </p>
              <button
                onClick={() => { setStatus("idle"); setForm({ fullName: "", email: "", phone: "", skill: "", message: "" }); }}
                className="ros:px-[28px] ros:py-[12px] ros:bg-[#DF4E4E] ros:text-[#FFFDFD] ros:rounded-[30px] ros:text-[15px] ros:font-medium ros:hover:bg-[#C93D3D] ros:transition-colors"
               
              >
                Register for Another
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="ros:flex ros:flex-col ros:gap-[18px] ros:md:gap-[20px]">
              <h3 className="ros:text-[#000000] ros:text-[20px] ros:md:text-[24px] ros:font-bold">Your Information</h3>

              <div className="ros:flex ros:flex-col ros:gap-[6px]">
                <label className="ros:text-[#000000] ros:text-[13px] ros:font-semibold ros:uppercase ros:tracking-wider">Full Name *</label>
                <input
                  required
                  value={form.fullName}
                  onChange={e => setForm(f => ({ ...f, fullName: e.target.value }))}
                  placeholder="Your full name"
                  className="ros:w-full ros:border ros:border-[#F4F4F4] ros:rounded-[12px] ros:px-[16px] ros:py-[12px] ros:text-[#000000] ros:text-[15px] ros:placeholder:text-[#C0BFCF] ros:focus:outline-none ros:focus:border-[#DF4E4E] ros:focus:ring-2 ros:focus:ring-[#DF4E4E]/10 ros:transition-all"
                 
                />
              </div>

              <div className="ros:grid ros:grid-cols-1 ros:sm:grid-cols-2 ros:gap-[16px]">
                <div className="ros:flex ros:flex-col ros:gap-[6px]">
                  <label className="ros:text-[#000000] ros:text-[13px] ros:font-semibold ros:uppercase ros:tracking-wider">Email *</label>
                  <input
                    required type="email"
                    value={form.email}
                    onChange={e => setForm(f => ({ ...f, email: e.target.value }))}
                    placeholder="your@email.com"
                    className="ros:w-full ros:border ros:border-[#F4F4F4] ros:rounded-[12px] ros:px-[16px] ros:py-[12px] ros:text-[#000000] ros:text-[15px] ros:placeholder:text-[#C0BFCF] ros:focus:outline-none ros:focus:border-[#DF4E4E] ros:focus:ring-2 ros:focus:ring-[#DF4E4E]/10 ros:transition-all"
                   
                  />
                </div>
                <div className="ros:flex ros:flex-col ros:gap-[6px]">
                  <label className="ros:text-[#000000] ros:text-[13px] ros:font-semibold ros:uppercase ros:tracking-wider">Phone *</label>
                  <input
                    required type="tel"
                    value={form.phone}
                    onChange={e => setForm(f => ({ ...f, phone: e.target.value }))}
                    placeholder="08xxxxxxxxx"
                    className="ros:w-full ros:border ros:border-[#F4F4F4] ros:rounded-[12px] ros:px-[16px] ros:py-[12px] ros:text-[#000000] ros:text-[15px] ros:placeholder:text-[#C0BFCF] ros:focus:outline-none ros:focus:border-[#DF4E4E] ros:focus:ring-2 ros:focus:ring-[#DF4E4E]/10 ros:transition-all"
                   
                  />
                </div>
              </div>

              <div className="ros:flex ros:flex-col ros:gap-[6px]">
                <label className="ros:text-[#000000] ros:text-[13px] ros:font-semibold ros:uppercase ros:tracking-wider">Course of Interest *</label>
                <select
                  required
                  value={form.skill}
                  onChange={e => setForm(f => ({ ...f, skill: e.target.value }))}
                  className="ros:w-full ros:border ros:border-[#F4F4F4] ros:rounded-[12px] ros:px-[16px] ros:py-[12px] ros:text-[#000000] ros:text-[15px] ros:focus:outline-none ros:focus:border-[#DF4E4E] ros:focus:ring-2 ros:focus:ring-[#DF4E4E]/10 ros:transition-all ros:bg-white"
                 
                >
                  <option value="">Select a course...</option>
                  {skills.map(s => <option key={s.title} value={s.title}>{s.title}</option>)}
                  <option value="Other">Other / Not sure yet</option>
                </select>
              </div>

              <div className="ros:flex ros:flex-col ros:gap-[6px]">
                <label className="ros:text-[#000000] ros:text-[13px] ros:font-semibold ros:uppercase ros:tracking-wider">Message (Optional)</label>
                <textarea
                  rows={3}
                  value={form.message}
                  onChange={e => setForm(f => ({ ...f, message: e.target.value }))}
                  placeholder="Tell us a bit about yourself or any questions you have..."
                  className="ros:w-full ros:border ros:border-[#F4F4F4] ros:rounded-[12px] ros:px-[16px] ros:py-[12px] ros:text-[#000000] ros:text-[15px] ros:placeholder:text-[#C0BFCF] ros:focus:outline-none ros:focus:border-[#DF4E4E] ros:focus:ring-2 ros:focus:ring-[#DF4E4E]/10 ros:transition-all ros:resize-none"
                 
                />
              </div>

              {status === "error" && (
                <p className="ros:text-[#FF383C] ros:text-[14px]">Something went wrong. Please try again or call us directly.</p>
              )}

              <button
                type="submit"
                disabled={status === "loading"}
                className="ros:w-full ros:py-[16px] ros:bg-[#DF4E4E] ros:text-[#FFFDFD] ros:text-[16px] ros:font-bold ros:rounded-[30px] ros:hover:bg-[#C93D3D] ros:transition-colors ros:disabled:opacity-60 ros:disabled:cursor-not-allowed"
               
              >
                {status === "loading" ? "Submitting..." : "Register My Interest →"}
              </button>
            </form>
          )}
        </div>
      </section>

      {/* ── Scripture CTA ── */}
      <section className="ros:bg-[#DF4E4E] ros:px-6 ros:md:px-[60px] ros:lg:px-[120px] ros:py-[48px] ros:md:py-[64px] ros:flex ros:flex-col ros:gap-[16px] ros:items-center ros:w-full ros:text-center">
        <p className="ros:text-[#FFFDFD] ros:text-[18px] ros:md:text-[22px] ros:font-normal ros:italic ros:leading-[1.6] ros:max-w-[700px]" style={{ fontFamily: "'Playfair Display', serif" }}>
          &ldquo;Whatever you do, work heartily, as for the Lord and not for men.&rdquo;
        </p>
        <p className="ros:text-[#FFFFFFB3] ros:text-[13px] ros:md:text-[14px] ros:font-semibold ros:uppercase ros:tracking-widest">Colossians 3:23</p>
      </section>
    </div>
  );
}
