import MinistryPage from "@/components/MinistryPage";

export const metadata = {
  title: "Graceful Oaks (Widows) | RCCG Rose of Sharon",
  description: "The widows' fellowship of RCCG Rose of Sharon: care, comfort and community for widows.",
};

export default function GracefulOaksPage() {
  return (
    <MinistryPage
      pill="🌿 GRACEFUL OAKS · WIDOWS"
      title={<>Graceful <span className="text-textRed">Oaks</span></>}
      intro="The widows' fellowship of RCCG Rose of Sharon: care, comfort and community for widows."
      image="/about-open-view.jpg"
      imagePosition="50% 70%"
      imageAlt="Women of RCCG Rose of Sharon at worship"
      about="Graceful Oaks is the fellowship for the widows of RCCG Rose of Sharon. It is a family that walks with widows in prayer, friendship and practical help, so that no widow in the church stands alone."
      points={[
        { title: "Comfort and prayer", text: "Prayer, encouragement and the Word of God for every season of grief and recovery." },
        { title: "Community", text: "A circle of sisters who understand, listen and stand together." },
        { title: "Practical care", text: "Support, visits and help with real needs, led with dignity and discretion." },
        { title: "Strength to serve", text: "Opportunities to use gifts and experience to bless the church and others." },
      ]}
      joinText="To join Graceful Oaks, or to let us know of a widow who needs care, speak to the church office or send a welfare request."
      others={[{ label: "Send a welfare request", href: "/welfare" }, { label: "Wisdom Group (Elders)", href: "/ministries/wisdom-group" }, { label: "Oaks of Righteousness (Women)", href: "/ministries/oaks-of-righteousness" }, { label: "All ministries", href: "/ministries" }]}
    />
  );
}
