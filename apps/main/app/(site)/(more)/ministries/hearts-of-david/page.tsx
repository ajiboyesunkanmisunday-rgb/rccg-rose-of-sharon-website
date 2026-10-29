import MinistryPage from "@/components/MinistryPage";

export const metadata = {
  title: "Hearts of David (Men) | RCCG Rose of Sharon",
  description: "Hearts of David is the men's ministry of RCCG Rose of Sharon: men growing in faith, fellowship and service.",
};

export default function HeartsOfDavidPage() {
  return (
    <MinistryPage
      pill="🛡️ HEARTS OF DAVID · MEN'S MINISTRY"
      title={<>Hearts of <span className="text-textRed">David</span></>}
      intro="The men's ministry of RCCG Rose of Sharon: men after God's own heart, growing in faith, fellowship and service."
      image="/ministries-men.jpg"
      imagePosition="50% 20%"
      imageAlt="Pastor Emeka Obiagwu at worship"
      about="Hearts of David is the men's ministry of RCCG Rose of Sharon. It is a brotherhood where men pray together, study the Word, encourage one another and serve the church and the community with joy."
      points={[
        { title: "A heart after God", text: "We build men who seek the Lord first, as David did, and who lead their homes with faith." },
        { title: "Brotherhood", text: "Real friendships where men can be honest, pray for one another and stand together." },
        { title: "Growing in the Word", text: "Teaching and conversation that help men understand and live out the Word of God." },
        { title: "Serving together", text: "Men serving the church family and reaching out to the community." },
      ]}
      joinText="Join the Hearts of David WhatsApp group to hear about meetings and programmes, or speak to the church office to get involved."
      others={[{ label: "Join a WhatsApp group", href: "/join" }, { label: "Rose of Sharon Choir", href: "/ministries/choir" }, { label: "Youth", href: "/youth" }, { label: "All ministries", href: "/ministries" }]}
    />
  );
}
