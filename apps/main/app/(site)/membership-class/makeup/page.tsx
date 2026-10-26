export default function MembershipClassMakeupPage() {
  return (
    <div className="mb-16 md:mb-32">
      <div className="flex h-[500px] items-center justify-center bg-black lg:h-[700px]">
        <div className="flex w-full max-w-2xl flex-col items-center gap-6">
          <h5 className="text-xs font-extrabold tracking-widest text-[#FFFFFFCC]">FORMS</h5>
          <h1 className="text-center font-anton text-2xl uppercase text-white md:text-[46px] md:leading-[55px]">
            Membership <span className="text-textRed">Class</span>
          </h1>
          <p className="w-full max-w-lg text-center text-base text-[#FFFFFFB2] md:text-lg lg:text-xl">
            Make-up Request Form
          </p>
        </div>
      </div>
      <div className="mx-auto -mt-24 max-w-2xl rounded-2xl bg-white">
        <div className="form-container mx-auto min-h-[500px] px-2 py-7">
          <div className="w-full">
            <header className="mb-[0.625rem] bg-[#f9f9f9] p-5">
              <h1 className="mb-1 text-xl font-semibold text-gray-800">Please provide your details</h1>
            </header>
          </div>
          <iframe
            src="//forms.joincci.org/gfembed/?f=9"
            width="100%"
            height="818"
            frameBorder={0}
            title="Gravity Form"
            allow="fullscreen"
            style={{ minHeight: "818px" }}
          />
        </div>
      </div>
    </div>
  );
}
