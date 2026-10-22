"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { post } from "@/lib/api";
import { FormField, inputCls, textareaCls } from "@/components/ui/FormField";

export interface FormConfig {
  heroTitleHtml: string;
  heroSubtitle?: string;
  /** Subject line the church team sees for this form's submissions. */
  subject: string;
  formHeaderText?: string;
  formHeaderItems?: string[];
  /** When set, the slug is an alias for an existing dedicated page. */
  redirectTo?: string;
}

export default function FormFields({ config }: { config: FormConfig }) {
  const { heroTitleHtml, heroSubtitle, formHeaderText, formHeaderItems, subject, redirectTo } = config;
  const router = useRouter();
  const [form, setForm] = useState({ name: "", phone: "", email: "", message: "" });
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [error, setError] = useState("");

  useEffect(() => {
    if (redirectTo) router.replace(redirectTo);
  }, [redirectTo, router]);

  function set(k: string) {
    return (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
      setForm((p) => ({ ...p, [k]: e.target.value }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("loading");
    setError("");
    try {
      const content = [
        `Name: ${form.name}`,
        `Phone: ${form.phone}`,
        form.email ? `Email: ${form.email}` : null,
        form.message ? `Message: ${form.message}` : null,
      ]
        .filter(Boolean)
        .join("\n");
      await post("/requests/suggestion", { subject, content });
      setStatus("success");
    } catch (err: unknown) {
      setStatus("error");
      setError(err instanceof Error ? err.message : "Submission failed. Please try again.");
    }
  }

  if (redirectTo) {
    return <div className="flex min-h-[60vh] items-center justify-center text-[#00000099]">Redirecting…</div>;
  }

  return (
    <div className="mb-16 md:mb-32">
      {/* Hero */}
      <div className="flex h-[500px] items-center justify-center bg-black lg:h-[700px]">
        <div className="flex w-full max-w-2xl flex-col items-center gap-6 px-4">
          <h5 className="text-xs font-extrabold tracking-widest text-[#FFFFFFCC]">FORMS</h5>
          <h1
            className="text-center font-anton text-2xl uppercase text-white md:text-[46px] md:leading-[55px]"
            dangerouslySetInnerHTML={{ __html: heroTitleHtml }}
          />
          {heroSubtitle && (
            <p className="w-full max-w-lg text-center text-base text-[#FFFFFFB2] md:text-lg lg:text-xl">
              {heroSubtitle}
            </p>
          )}
        </div>
      </div>

      {/* Form card */}
      <div className="mx-auto -mt-24 max-w-2xl rounded-2xl bg-white">
        <div className="form-container mx-auto min-h-[500px] px-2 py-7">
          <div className="w-full">
            <header className="mb-[0.625rem] bg-[#f9f9f9] p-5">
              <h1 className="mb-1 text-xl font-semibold text-gray-800">
                {formHeaderText ?? "Please provide your details"}
              </h1>
              {formHeaderItems?.map((item, i) => (
                <p key={i} className="mt-1 text-sm font-normal text-gray-600">
                  {item}
                </p>
              ))}
            </header>
          </div>

          {status === "success" ? (
            <div className="flex flex-col items-center gap-4 px-4 py-16 text-center">
              <svg width="64" height="64" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
                <circle cx="32" cy="32" r="32" fill="#16A34A" fillOpacity="0.12" />
                <circle cx="32" cy="32" r="24" fill="#16A34A" fillOpacity="0.2" />
                <path d="M20 32L28 40L44 24" stroke="#16A34A" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              <p className="text-xl font-bold">Thank you!</p>
              <p className="text-[#00000099]">We have received your submission and will be in touch. God bless you!</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="flex flex-col gap-4 px-4 py-4">
              <FormField label="Full Name" required>
                <input type="text" required value={form.name} onChange={set("name")} className={inputCls} />
              </FormField>
              <FormField label="Phone Number" required>
                <input type="tel" required value={form.phone} onChange={set("phone")} className={inputCls} />
              </FormField>
              <FormField label="Email">
                <input type="email" value={form.email} onChange={set("email")} className={inputCls} />
              </FormField>
              <FormField label="Message">
                <textarea rows={4} value={form.message} onChange={set("message")} className={textareaCls} />
              </FormField>
              {status === "error" && <p className="text-[13px] text-[#FF383C]">{error}</p>}
              <button
                type="submit"
                disabled={status === "loading"}
                className="mt-2 h-12 rounded-full border border-textRed bg-textRed px-8 text-[0.75rem] font-extrabold uppercase tracking-[.25em] text-white transition duration-300 hover:border-black hover:bg-white hover:text-black disabled:opacity-60"
              >
                {status === "loading" ? "Submitting..." : "Submit"}
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
