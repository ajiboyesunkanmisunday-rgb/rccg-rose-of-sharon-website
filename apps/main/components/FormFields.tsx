"use client";

export interface FormConfig {
  heroTitleHtml: string;
  heroSubtitle?: string;
  formId: number;
  formHeaderText?: string;
  formHeaderItems?: string[];
  iframeHeight?: number;
}

export default function FormFields({ config }: { config: FormConfig }) {
  const {
    heroTitleHtml,
    heroSubtitle,
    formId,
    formHeaderText,
    formHeaderItems,
    iframeHeight = 818,
  } = config;

  return (
    <div className="mb-16 md:mb-32">
      {/* Hero */}
      <div className="flex h-[500px] items-center justify-center bg-black lg:h-[700px]">
        <div className="flex w-full max-w-2xl flex-col items-center gap-6">
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
          <iframe
            src={`//forms.joincci.org/gfembed/?f=${formId}`}
            width="100%"
            height={iframeHeight}
            frameBorder={0}
            title="Gravity Form"
            allow="fullscreen"
            style={{ minHeight: `${iframeHeight}px` }}
          />
        </div>
      </div>
    </div>
  );
}
