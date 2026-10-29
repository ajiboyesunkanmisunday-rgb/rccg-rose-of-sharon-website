import MinistryPage from "@/components/MinistryPage";

export const metadata = {
  title: "Oaks of Righteousness (Women) | RCCG Rose of Sharon",
  description: "The women's ministry of RCCG Rose of Sharon: women growing in faith, fellowship and service.",
};

export default function OaksOfRighteousnessPage() {
  return (
    <MinistryPage
      president={{}}
      group="women"
      pill="🌳 OAKS OF RIGHTEOUSNESS · WOMEN'S MINISTRY"
      title={<>Oaks of <span className="text-textRed">Righteousness</span></>}
      intro="The women's ministry of RCCG Rose of Sharon: women growing in faith, friendship and service."
      image="/ministries-women.jpg"
      imagePosition="50% 28%"
      imageAlt="Pastor Chinyere Obiagwu at worship"
      about="Oaks of Righteousness is the women's ministry of RCCG Rose of Sharon. It is a fellowship where women pray together, study the Word, encourage one another and serve the church and the community with joy."
      points={[
        { title: "Prayer and the Word", text: "Women coming together to pray, study the Word and grow in their walk with God." },
        { title: "Sisterhood", text: "Real friendships where women support, encourage and stand with one another." },
        { title: "Strong homes", text: "Encouragement for women as wives, mothers, daughters and leaders in every season of life." },
        { title: "Serving together", text: "Women serving the church family and reaching out to the community." },
      ]}
      joinText="Join the Women's WhatsApp group to hear about meetings and programmes, or speak to the church office to get involved."
      others={[{ label: "Join a WhatsApp group", href: "/join" }, { label: "Hearts of David (Men)", href: "/ministries/hearts-of-david" }, { label: "Youth", href: "/youth" }, { label: "All ministries", href: "/ministries" }]}
    />
  );
}
