interface FormFieldProps {
  label: string;
  required?: boolean;
  children: React.ReactNode;
  half?: boolean;
}

export function FormField({ label, required, children, half }: FormFieldProps) {
  return (
    <div className={`flex flex-col gap-[4px] items-start${half ? " min-w-0" : " w-full"}`}>
      <p className="text-[#FFFDFD] text-[13px] font-normal leading-[14px]" style={{ fontVariationSettings: '"wdth" 100' }}>
        {label} {required && <span className="text-[#FF383C]">*</span>}
      </p>
      {children}
    </div>
  );
}

export const inputCls =
  "w-full h-full px-3 bg-transparent text-[#100E1A] text-sm focus:outline-none rounded-[4px]";

export const wrapCls =
  "bg-[#FFFDFD] border border-[#A3A1AF] h-[40px] rounded-[4px] w-full";

export const selectCls =
  "w-full h-full px-3 bg-transparent text-[#100E1A] text-sm focus:outline-none rounded-[4px] cursor-pointer";

export function SectionHeading({ children }: { children: React.ReactNode }) {
  return (
    <p
      className="text-[#B5B5F3] text-[16px] font-bold uppercase tracking-[0.1em] border-b border-[#B5B5F3]/30 pb-[8px] w-full mt-[8px]"
      style={{ fontVariationSettings: '"wdth" 100' }}
    >
      {children}
    </p>
  );
}
