interface FormFieldProps {
  label: string;
  required?: boolean;
  children: React.ReactNode;
}

export function FormField({ label, required, children }: FormFieldProps) {
  return (
    <div className="flex flex-col gap-[4px] w-full">
      <label className="block text-sm font-medium text-[#374151]">
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      {children}
    </div>
  );
}

export const inputCls =
  "w-full rounded-lg border border-[#E5E7EB] px-4 py-3 text-sm text-[#374151] outline-none placeholder:text-[#9CA3AF] focus:border-[#000080] focus:ring-1 focus:ring-[#000080]";

export const wrapCls = "";

export const selectCls =
  "w-full rounded-lg border border-[#E5E7EB] px-4 py-3 text-sm text-[#374151] outline-none focus:border-[#000080] focus:ring-1 focus:ring-[#000080] appearance-none bg-[url('data:image/svg+xml;charset=UTF-8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2220%22%20height%3D%2220%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22%239CA3AF%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%3E%3Cpolyline%20points%3D%226%209%2012%2015%2018%209%22%3E%3C%2Fpolyline%3E%3C%2Fsvg%3E')] bg-[length:20px] bg-[right_12px_center] bg-no-repeat pr-10 bg-white cursor-pointer";

export const textareaCls =
  "w-full rounded-lg border border-[#E5E7EB] px-4 py-3 text-sm text-[#374151] outline-none placeholder:text-[#9CA3AF] focus:border-[#000080] focus:ring-1 focus:ring-[#000080] resize-none";

export function SectionHeading({ children }: { children: React.ReactNode }) {
  return (
    <h3 className="text-[#000080] text-[15px] font-bold uppercase tracking-[0.08em] border-b-2 border-[#000080]/20 pb-[8px] w-full mt-[8px]">
      {children}
    </h3>
  );
}

export function FormCard({ children, title }: { children: React.ReactNode; title?: string }) {
  return (
    <div className="rounded-xl border border-[#E5E7EB] bg-white p-4 sm:p-6 w-full">
      {title && (
        <h2 className="text-[16px] font-bold text-[#000080] mb-5">{title}</h2>
      )}
      {children}
    </div>
  );
}
