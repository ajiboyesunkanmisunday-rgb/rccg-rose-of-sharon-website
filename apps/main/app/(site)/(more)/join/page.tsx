import { Hero, Section, SectionTitle } from "@ros/shared/kit/ui";
import { WHATSAPP_GROUPS } from "@ros/shared/links";
import WhatsappQr from "@/components/WhatsappQr";

export const metadata = {
  title: "Join Us | RCCG Rose of Sharon",
  description: "Scan the QR code to join the Men, Women or Youth WhatsApp group of RCCG Rose of Sharon.",
};

export default function JoinPage() {
  return (
    <>
      <Hero
        pill="🤝 JOIN US"
        title={<>Join our <span className="text-textRed">community</span></>}
        subtitle="Scan the QR code with your phone to join the WhatsApp group for you."
        bg="/home/welcome-connect.jpg"
        bgPosition="62% 50%"
      />
      <Section>
        <SectionTitle center pill="💬 WHATSAPP GROUPS" title={<>Find your <span className="text-textRed">group</span></>} sub="Open your phone camera or WhatsApp, scan the code and tap to join. On a phone, use the button under the code." />
        <div className="ros:mt-10 ros:grid ros:grid-cols-1 ros:gap-6 ros:md:grid-cols-3">
          {WHATSAPP_GROUPS.map((g) => (
            <div key={g.key} id={g.key} className="ros:flex ros:flex-col ros:items-center ros:gap-4 ros:rounded-lg ros:border ros:border-[#00000014] ros:bg-[#FAFAFA8F] ros:p-6 ros:text-center" style={{ scrollMarginTop: 90 }}>
              <h3 className="ros-anton ros:text-2xl ros:uppercase">{g.name}</h3>
              <p className="ros:text-[#00000099] ros:md:min-h-[3.3rem]">{g.text}</p>
              <WhatsappQr link={g.link} qr={g.qr} label={g.name} />
              {g.link ? (
                <a href={g.link} target="_blank" rel="noopener noreferrer" className="ros:rounded-full ros:bg-black ros:px-5 ros:py-3 ros:text-[0.75rem] ros:font-extrabold ros:uppercase ros:tracking-[.25em] ros:text-white ros:transition ros:hover:bg-[#DF4E4E]">Join the {g.name} group</a>
              ) : (
                <span className="ros:rounded-full ros:border ros:border-[#00000022] ros:px-5 ros:py-3 ros:text-[0.75rem] ros:font-extrabold ros:uppercase ros:tracking-[.25em] ros:text-[#00000066]">Link coming soon</span>
              )}
            </div>
          ))}
        </div>
      </Section>
    </>
  );
}
