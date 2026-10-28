import type { ReactNode } from "react";

/* Form building blocks (same API the Rose of Sharon pages use), styled in the cci-web look. */

export function FormField({ label, required, children }: { label: string; required?: boolean; children: ReactNode }) {
  return (
    <div className="ros:flex ros:w-full ros:flex-col ros:gap-[6px]">
      <label className="ros:block ros:text-sm ros:font-semibold ros:text-[#111827]">
        {label}
        {required && <span className="ros:ml-[3px] ros:text-[#DF4E4E]">*</span>}
      </label>
      {children}
    </div>
  );
}

export const inputCls =
  "ros:w-full ros:rounded-lg ros:border ros:border-[#D0D5DD] ros:bg-white ros:px-4 ros:py-3 ros:text-sm ros:text-[#111827] ros:outline-none ros:placeholder:text-[#9CA3AF] ros:focus:border-[#DF4E4E] ros:focus:ring-1 ros:focus:ring-[#DF4E4E] ros:transition-colors";

export const wrapCls = "";

export const selectCls =
  "ros:w-full ros:rounded-lg ros:border ros:border-[#D0D5DD] ros:bg-white ros:px-4 ros:py-3 ros:pr-10 ros:text-sm ros:text-[#111827] ros:outline-none ros:focus:border-[#DF4E4E] ros:focus:ring-1 ros:focus:ring-[#DF4E4E] ros:transition-colors ros:appearance-none ros:cursor-pointer ros:bg-[url('data:image/svg+xml;charset=UTF-8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2220%22%20height%3D%2220%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22%236B7280%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%3E%3Cpolyline%20points%3D%226%209%2012%2015%2018%209%22%3E%3C%2Fpolyline%3E%3C%2Fsvg%3E')] ros:bg-[length:20px] ros:bg-[right_12px_center] ros:bg-no-repeat";

export const textareaCls =
  "ros:w-full ros:resize-none ros:rounded-lg ros:border ros:border-[#D0D5DD] ros:bg-white ros:px-4 ros:py-3 ros:text-sm ros:text-[#111827] ros:outline-none ros:placeholder:text-[#9CA3AF] ros:focus:border-[#DF4E4E] ros:focus:ring-1 ros:focus:ring-[#DF4E4E] ros:transition-colors";

export function SectionHeading({ children }: { children: ReactNode }) {
  return (
    <h3 className="ros:mt-2 ros:w-full ros:border-b-2 ros:border-[#DF4E4E]/20 ros:pb-2 ros:text-sm ros:font-bold ros:uppercase ros:tracking-[0.08em] ros:text-[#DF4E4E]">
      {children}
    </h3>
  );
}

export function FormCard({ children, title }: { children: ReactNode; title?: string }) {
  return (
    <div className="ros:w-full ros:rounded-xl ros:border ros:border-[#E5E7EB] ros:bg-[#FAFAFA] ros:p-5 ros:sm:p-6">
      {title && <h2 className="ros:mb-5 ros:border-b ros:border-[#E5E7EB] ros:pb-3 ros:text-lg ros:font-bold ros:text-black">{title}</h2>}
      {children}
    </div>
  );
}

/** The white form card that overlaps the black hero — same arrangement as the original cci-web form pages. */
/** `flat` sits the sheet on the page below other content, instead of pulling it up over a banner. */
export function FormSheet({ children, wide = false, flat = false }: { children: ReactNode; wide?: boolean; flat?: boolean }) {
  return (
    <div className="ros:mb-16 ros:md:mb-32">
      <div
        className={`ros:relative ros:mx-auto ${flat ? "ros:mt-4" : "ros:-mt-24"} ros:w-[calc(100%-1.5rem)] ros:rounded-2xl ros:bg-white ros:px-3 ros:py-7 ros:shadow-[0_8px_40px_rgba(0,0,0,0.12)] ros:md:px-8 ${
          wide ? "ros:max-w-4xl" : "ros:max-w-2xl"
        }`}
      >
        {children}
      </div>
    </div>
  );
}

export const submitCls =
  "ros:h-12 ros:rounded-full ros:border ros:border-[#DF4E4E] ros:bg-[#DF4E4E] ros:px-8 ros:text-[0.75rem] ros:font-extrabold ros:uppercase ros:tracking-[.25em] ros:text-white ros:transition ros:duration-300 ros:hover:border-black ros:hover:bg-white ros:hover:text-black ros:disabled:opacity-60";

/* Variants without the full-width class, for fields that set their own width. */
export const inputClsNoW = inputCls.replace("ros:w-full ", "");
export const selectClsNoW = selectCls.replace("ros:w-full ", "");
export const textareaClsNoW = textareaCls.replace("ros:w-full ", "");
