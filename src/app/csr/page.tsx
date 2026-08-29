"use client";

import { useState } from "react";
import Image from "next/image";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { post } from "@/lib/api";

const vs = { fontVariationSettings: '"wdth" 100' };

const skills = [
  { icon: "📱", title: "Digital Marketing", desc: "Learn SEO, social media strategy, content creation, paid advertising, and how to build a brand online." },
  { icon: "📸", title: "Photography & Videography", desc: "Master professional photography, photo editing, video production, and visual storytelling techniques." },
  { icon: "🧵", title: "Fashion & Tailoring", desc: "From fabric selection to pattern making and sewing — create beautiful garments from scratch." },
  { icon: "💻", title: "Graphic Design", desc: "Design logos, flyers, presentations, and brand materials using industry-standard tools." },
  { icon: "🍳", title: "Catering & Food Business", desc: "Professional cooking, food hygiene, catering management, and starting a food business." },
  { icon: "💇", title: "Beauty & Wellness", desc: "Hair styling, skincare, makeup artistry, and building a professional beauty practice." },
  { icon: "🔧", title: "Electrical & Technical Skills", desc: "Practical electrical installation, appliance repair, and basic electronics for everyday use." },
  { icon: "📊", title: "Business & Entrepreneurship", desc: "Business planning, financial literacy, record-keeping, and strategies to start and grow your business." },
];

const benefits = [
  { label: "Expert Instructors", desc: "Learn from experienced professionals in each field" },
  { label: "Hands-On Training", desc: "Practical sessions — not just theory" },
  { label: "Certification", desc: "Receive a certificate of completion for each course" },
  { label: "Community Network", desc: "Connect with fellow graduates for referrals and opportunities" },
  { label: "Affordable or Free", desc: "Subsidized training for church members and community" },
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
    <main>
      {/* ── Hero ── */}
      <section className="relative min-h-[440px] md:h-[540px] w-full overflow-hidden flex items-center justify-center">
        <div className="absolute inset-0">
          <Image src="/assets/hero-bg.png" alt="" fill className="object-cover pointer-events-none" priority />
          <div className="absolute inset-0 bg-[rgba(0,0,128,0.85)]" />
          <div className="absolute inset-0 opacity-10" style={{
            backgroundImage: "radial-gradient(circle, rgba(181,181,243,0.6) 1px, transparent 1px)",
            backgroundSize: "40px 40px",
          }} />
        </div>
        <Navbar activePage="csr" />
        <div className="relative z-10 flex flex-col gap-4 md:gap-[24px] items-center w-full max-w-[1148px] px-6 md:px-8 text-center mt-16 md:mt-[48px]">
          <div className="flex items-center gap-[10px] px-[16px] py-[8px] rounded-full bg-[#B5B5F3]/15 border border-[#B5B5F3]/30">
            <span className="size-[8px] rounded-full bg-[#B5B5F3] animate-pulse" />
            <p className="text-[#B5B5F3] text-[12px] md:text-[13px] font-medium uppercase tracking-[0.2em]" style={vs}>Church Skills Resource</p>
          </div>
          <h1 className="text-[#FFFDFD] text-[32px] md:text-[52px] lg:text-[72px] font-medium leading-tight" style={vs}>
            Equipping You to<br />
            <span className="italic text-[#B5B5F3]" style={{ fontFamily: "'Playfair Display', serif" }}>Excel &amp; Create</span>
          </h1>
          <p className="text-[#FFFDFD]/80 text-[15px] md:text-[18px] lg:text-[20px] font-normal leading-[1.7] max-w-[680px]" style={vs}>
            CSR is our church&apos;s skills and vocational training program — empowering members of our community with practical skills to build sustainable livelihoods.
          </p>
          <div className="flex flex-wrap gap-3 md:gap-[16px] justify-center mt-[8px]">
            <a href="#skills" className="px-[24px] md:px-[28px] py-[12px] md:py-[14px] bg-[#FFFDFD] text-[#000080] text-[14px] md:text-[15px] font-bold rounded-[30px] hover:bg-[#B5B5F3] transition-colors" style={vs}>
              Explore Skills
            </a>
            <a href="#register" className="px-[24px] md:px-[28px] py-[12px] md:py-[14px] border-2 border-[#B5B5F3]/60 text-[#FFFDFD] text-[14px] md:text-[15px] font-medium rounded-[30px] hover:border-[#B5B5F3] hover:bg-[#B5B5F3]/10 transition-colors" style={vs}>
              Register Interest
            </a>
          </div>
        </div>
      </section>

      {/* ── What is CSR ── */}
      <section className="bg-[#100E1A] px-6 md:px-[60px] lg:px-[120px] py-[60px] md:py-[84px] flex flex-col lg:flex-row gap-8 lg:gap-[80px] items-start lg:items-center w-full">
        <div className="flex flex-col gap-[24px] flex-1 min-w-0">
          <p className="text-[#B5B5F3] text-[14px] font-normal uppercase tracking-[0.2em]" style={vs}>Our Vision</p>
          <h2 className="text-[#FFFDFD] text-[26px] md:text-[38px] lg:text-[48px] font-bold leading-[1.2]" style={vs}>What is CSR?</h2>
          <p className="text-[#A3A1AF] text-[16px] md:text-[18px] font-normal leading-[1.8]" style={vs}>
            The Church Skills Resource (CSR) program is Rose of Sharon&apos;s commitment to the total wellbeing of our community — not just spiritual growth, but economic empowerment and social transformation.
          </p>
          <p className="text-[#A3A1AF] text-[16px] md:text-[18px] font-normal leading-[1.8]" style={vs}>
            We believe that when the church equips its people with practical skills, it multiplies its impact in homes, workplaces, and communities. CSR offers structured, hands-on training in a wide range of vocational and professional skills — all rooted in excellence and godly values.
          </p>
          <div className="flex flex-wrap gap-[12px] mt-[8px]">
            {["Vocational Training", "Professional Skills", "Business Mentoring", "Community Impact"].map(tag => (
              <span key={tag} className="px-[16px] py-[8px] rounded-full bg-[#B5B5F3]/10 border border-[#B5B5F3]/20 text-[#B5B5F3] text-[13px] font-medium" style={vs}>
                {tag}
              </span>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-[16px] w-full lg:w-[480px] lg:flex-shrink-0">
          {benefits.map(b => (
            <div key={b.label} className="bg-[#1A1826] rounded-[16px] p-[20px] flex flex-col gap-[8px] border border-[#B5B5F3]/10">
              <p className="text-[#FFFDFD] text-[15px] font-bold" style={vs}>{b.label}</p>
              <p className="text-[#A3A1AF] text-[13px] leading-[1.6]" style={vs}>{b.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── Skills Offered ── */}
      <section id="skills" className="bg-[#D2D2E2] px-6 md:px-[60px] lg:px-[120px] py-[60px] md:py-[84px] flex flex-col gap-[40px] md:gap-[48px] items-center w-full">
        <div className="flex flex-col gap-[8px] items-center text-center">
          <p className="text-[#000080] text-[14px] font-normal uppercase tracking-[0.2em]" style={vs}>What We Teach</p>
          <h2 className="text-[#100E1A] text-[24px] md:text-[38px] lg:text-[48px] font-bold leading-normal" style={vs}>Skills We Offer</h2>
          <p className="text-[#A3A1AF] text-[16px] md:text-[18px] font-normal max-w-[600px]" style={vs}>
            Our growing catalogue covers a wide range of practical skills to suit different passions and career paths.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-[16px] md:gap-[20px] w-full">
          {skills.map(skill => (
            <div
              key={skill.title}
              className="bg-white rounded-[20px] p-[24px] md:p-[28px] flex flex-col gap-[16px] shadow-[0px_4px_20px_rgba(0,0,0,0.06)] hover:shadow-[0px_8px_32px_rgba(0,0,128,0.12)] hover:-translate-y-[4px] transition-all group"
            >
              <div className="size-[52px] md:size-[56px] rounded-[14px] bg-[#000080]/8 flex items-center justify-center text-[26px] md:text-[28px] group-hover:bg-[#000080]/15 transition-colors">
                {skill.icon}
              </div>
              <div className="flex flex-col gap-[8px]">
                <p className="text-[#100E1A] text-[16px] md:text-[17px] font-bold leading-tight" style={vs}>{skill.title}</p>
                <p className="text-[#A3A1AF] text-[13px] leading-[1.6]" style={vs}>{skill.desc}</p>
              </div>
            </div>
          ))}
        </div>

        <p className="text-[#A3A1AF] text-[15px] text-center italic" style={vs}>
          And many more skills being added each season — check back regularly for new programs.
        </p>
      </section>

      {/* ── How It Works ── */}
      <section className="bg-[#100E1A] px-6 md:px-[60px] lg:px-[120px] py-[60px] md:py-[84px] flex flex-col gap-[40px] md:gap-[48px] items-center w-full">
        <div className="flex flex-col gap-[8px] items-center text-center">
          <p className="text-[#B5B5F3] text-[14px] font-normal uppercase tracking-[0.2em]" style={vs}>Simple Process</p>
          <h2 className="text-[#FFFDFD] text-[24px] md:text-[38px] lg:text-[48px] font-bold leading-normal" style={vs}>How to Join</h2>
        </div>

        {/* Steps — horizontal on lg, vertical on mobile */}
        <div className="flex flex-col md:flex-row flex-wrap items-start justify-center gap-8 w-full">
          {[
            { step: "01", title: "Register Interest", desc: "Fill out the form below to let us know which skill you want to learn." },
            { step: "02", title: "Orientation", desc: "Attend a brief orientation session where we'll share schedule, tools, and expectations." },
            { step: "03", title: "Training Begins", desc: "Join your class and learn from expert instructors in hands-on sessions." },
            { step: "04", title: "Certification", desc: "Complete the course and receive your certificate — plus mentorship to launch your business." },
          ].map((item, i, arr) => (
            <div key={item.step} className="flex md:flex-row items-start gap-4 md:gap-0 w-full md:w-auto">
              <div className="flex flex-col items-center gap-[16px] w-full md:w-[200px] lg:w-[220px]">
                <div className="size-[60px] md:size-[72px] rounded-full bg-[#000080] flex items-center justify-center border-4 border-[#B5B5F3]/20">
                  <span className="text-[#FFFDFD] text-[18px] md:text-[22px] font-bold" style={vs}>{item.step}</span>
                </div>
                <div className="flex flex-col gap-[6px] text-center">
                  <p className="text-[#FFFDFD] text-[15px] md:text-[17px] font-bold" style={vs}>{item.title}</p>
                  <p className="text-[#A3A1AF] text-[13px] leading-[1.6]" style={vs}>{item.desc}</p>
                </div>
              </div>
              {i < arr.length - 1 && (
                <div className="hidden md:block h-[2px] w-[32px] lg:w-[48px] bg-[#B5B5F3]/20 flex-shrink-0 mt-[34px]" />
              )}
            </div>
          ))}
        </div>
      </section>

      {/* ── Register Form ── */}
      <section id="register" className="bg-[#EEF0F7] px-6 md:px-[60px] lg:px-[120px] py-[60px] md:py-[84px] flex flex-col lg:flex-row gap-8 lg:gap-[80px] items-start w-full">
        <div className="flex flex-col gap-[24px] flex-1 min-w-0 lg:max-w-[440px]">
          <div className="flex flex-col gap-[8px]">
            <p className="text-[#000080] text-[14px] font-normal uppercase tracking-[0.2em]" style={vs}>Get Started</p>
            <h2 className="text-[#100E1A] text-[26px] md:text-[36px] lg:text-[40px] font-bold leading-[1.2]" style={vs}>Register Your Interest</h2>
          </div>
          <p className="text-[#A3A1AF] text-[16px] md:text-[17px] leading-[1.7]" style={vs}>
            Tell us which skill excites you — our team will reach out with details about the next available intake, schedule, and how to join.
          </p>
          <div className="flex flex-col gap-[12px]">
            {["Open to church members & community", "No prior experience required", "Subsidized or free for members"].map(item => (
              <div key={item} className="flex items-start gap-[12px]">
                <div className="size-[20px] rounded-full bg-[#000080] flex items-center justify-center flex-shrink-0 mt-[2px]">
                  <span className="text-white text-[11px] font-bold">✓</span>
                </div>
                <p className="text-[#100E1A] text-[15px]" style={vs}>{item}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Form card */}
        <div className="flex-1 min-w-0 bg-white rounded-[24px] p-[28px] md:p-[40px] shadow-[0_8px_40px_rgba(0,0,128,0.10)]">
          {status === "success" ? (
            <div className="flex flex-col gap-[20px] items-center text-center py-[40px]">
              <div className="size-[64px] rounded-full bg-[#000080] flex items-center justify-center">
                <span className="text-white text-[28px]">✓</span>
              </div>
              <h3 className="text-[#100E1A] text-[24px] md:text-[28px] font-bold" style={vs}>Registration Received!</h3>
              <p className="text-[#A3A1AF] text-[16px] leading-[1.7] max-w-[340px]" style={vs}>
                Thank you for your interest in the CSR program. Our team will contact you soon with next steps.
              </p>
              <button
                onClick={() => { setStatus("idle"); setForm({ fullName: "", email: "", phone: "", skill: "", message: "" }); }}
                className="px-[28px] py-[12px] bg-[#000080] text-[#FFFDFD] rounded-[30px] text-[15px] font-medium hover:bg-[#0000a0] transition-colors"
                style={vs}
              >
                Register for Another
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="flex flex-col gap-[18px] md:gap-[20px]">
              <h3 className="text-[#100E1A] text-[20px] md:text-[24px] font-bold" style={vs}>Your Information</h3>

              <div className="flex flex-col gap-[6px]">
                <label className="text-[#100E1A] text-[13px] font-semibold uppercase tracking-wider" style={vs}>Full Name *</label>
                <input
                  required
                  value={form.fullName}
                  onChange={e => setForm(f => ({ ...f, fullName: e.target.value }))}
                  placeholder="Your full name"
                  className="w-full border border-[#D2D2E2] rounded-[12px] px-[16px] py-[12px] text-[#100E1A] text-[15px] placeholder:text-[#C0BFCF] focus:outline-none focus:border-[#000080] focus:ring-2 focus:ring-[#000080]/10 transition-all"
                  style={vs}
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-[16px]">
                <div className="flex flex-col gap-[6px]">
                  <label className="text-[#100E1A] text-[13px] font-semibold uppercase tracking-wider" style={vs}>Email *</label>
                  <input
                    required type="email"
                    value={form.email}
                    onChange={e => setForm(f => ({ ...f, email: e.target.value }))}
                    placeholder="your@email.com"
                    className="w-full border border-[#D2D2E2] rounded-[12px] px-[16px] py-[12px] text-[#100E1A] text-[15px] placeholder:text-[#C0BFCF] focus:outline-none focus:border-[#000080] focus:ring-2 focus:ring-[#000080]/10 transition-all"
                    style={vs}
                  />
                </div>
                <div className="flex flex-col gap-[6px]">
                  <label className="text-[#100E1A] text-[13px] font-semibold uppercase tracking-wider" style={vs}>Phone</label>
                  <input
                    type="tel"
                    value={form.phone}
                    onChange={e => setForm(f => ({ ...f, phone: e.target.value }))}
                    placeholder="+234 xxx xxx xxxx"
                    className="w-full border border-[#D2D2E2] rounded-[12px] px-[16px] py-[12px] text-[#100E1A] text-[15px] placeholder:text-[#C0BFCF] focus:outline-none focus:border-[#000080] focus:ring-2 focus:ring-[#000080]/10 transition-all"
                    style={vs}
                  />
                </div>
              </div>

              <div className="flex flex-col gap-[6px]">
                <label className="text-[#100E1A] text-[13px] font-semibold uppercase tracking-wider" style={vs}>Skill of Interest *</label>
                <select
                  required
                  value={form.skill}
                  onChange={e => setForm(f => ({ ...f, skill: e.target.value }))}
                  className="w-full border border-[#D2D2E2] rounded-[12px] px-[16px] py-[12px] text-[#100E1A] text-[15px] focus:outline-none focus:border-[#000080] focus:ring-2 focus:ring-[#000080]/10 transition-all bg-white"
                  style={vs}
                >
                  <option value="">Select a skill...</option>
                  {skills.map(s => <option key={s.title} value={s.title}>{s.title}</option>)}
                  <option value="Other">Other</option>
                </select>
              </div>

              <div className="flex flex-col gap-[6px]">
                <label className="text-[#100E1A] text-[13px] font-semibold uppercase tracking-wider" style={vs}>Message (Optional)</label>
                <textarea
                  rows={3}
                  value={form.message}
                  onChange={e => setForm(f => ({ ...f, message: e.target.value }))}
                  placeholder="Tell us a bit about yourself or any specific questions..."
                  className="w-full border border-[#D2D2E2] rounded-[12px] px-[16px] py-[12px] text-[#100E1A] text-[15px] placeholder:text-[#C0BFCF] focus:outline-none focus:border-[#000080] focus:ring-2 focus:ring-[#000080]/10 transition-all resize-none"
                  style={vs}
                />
              </div>

              {status === "error" && (
                <p className="text-[#FF383C] text-[14px]" style={vs}>Something went wrong. Please try again.</p>
              )}

              <button
                type="submit"
                disabled={status === "loading"}
                className="w-full py-[16px] bg-[#000080] text-[#FFFDFD] text-[16px] font-bold rounded-[30px] hover:bg-[#0000a0] transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
                style={vs}
              >
                {status === "loading" ? "Submitting..." : "Register My Interest →"}
              </button>
            </form>
          )}
        </div>
      </section>

      {/* ── Scripture CTA ── */}
      <section className="bg-[#000080] px-6 md:px-[60px] lg:px-[120px] py-[48px] md:py-[64px] flex flex-col gap-[16px] items-center w-full text-center">
        <p className="text-[#FFFDFD] text-[18px] md:text-[22px] font-normal italic leading-[1.6] max-w-[700px]" style={{ fontFamily: "'Playfair Display', serif" }}>
          &ldquo;Whatever you do, work heartily, as for the Lord and not for men.&rdquo;
        </p>
        <p className="text-[#B5B5F3] text-[13px] md:text-[14px] font-semibold uppercase tracking-widest" style={vs}>Colossians 3:23</p>
      </section>

      <Footer />
    </main>
  );
}
