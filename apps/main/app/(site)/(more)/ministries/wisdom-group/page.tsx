import MinistryPage from "@/components/MinistryPage";

export const metadata = {
  title: "Wisdom Group (Elders) | RCCG Rose of Sharon",
  description: "The elders' fellowship of RCCG Rose of Sharon: seasoned believers sharing wisdom, prayer and fellowship.",
};

export default function WisdomGroupPage() {
  return (
    <MinistryPage
      pill="🦉 WISDOM GROUP · ELDERS"
      title={<>Wisdom <span className="text-textRed">Group</span></>}
      intro="The elders' fellowship of RCCG Rose of Sharon: seasoned believers sharing wisdom, prayer and friendship."
      image="/about-open-view.jpg"
      imagePosition="50% 30%"
      imageAlt="The congregation of RCCG Rose of Sharon at worship"
      about="Wisdom Group is the fellowship of the elders of RCCG Rose of Sharon. It is a place where those who have walked with God for many years pray together, encourage one another and pass on what they have learned to the next generation."
      points={[
        { title: "Prayer and the Word", text: "Elders coming together to pray for the church, its families and its leaders, and to stay rooted in the Word." },
        { title: "Fellowship", text: "Friendship and care for one another through every season of life." },
        { title: "Wisdom for the next generation", text: "Sharing testimonies and counsel with the young people, couples and families of the church." },
        { title: "Care and visitation", text: "Looking out for elders who are unwell or alone, so that nobody is forgotten." },
      ]}
      joinText="To join the Wisdom Group or to ask about its meetings, speak to the church office."
      others={[{ label: "Graceful Oaks (Widows)", href: "/ministries/graceful-oaks" }, { label: "Hearts of David (Men)", href: "/ministries/hearts-of-david" }, { label: "Oaks of Righteousness (Women)", href: "/ministries/oaks-of-righteousness" }, { label: "All ministries", href: "/ministries" }]}
    />
  );
}
