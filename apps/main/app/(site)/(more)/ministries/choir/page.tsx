import MinistryPage from "@/components/MinistryPage";

export const metadata = {
  title: "Rose of Sharon Choir (Hearts of David) | RCCG Rose of Sharon",
  description: "The Rose of Sharon Choir is the music ministry of RCCG Rose of Sharon, dedicated to creating inspiring music with a strong foundation in faith.",
};

export default function ChoirPage() {
  return (
    <MinistryPage
      pill="🎵 HEARTS OF DAVID · MUSIC MINISTRY"
      title={<>Rose of Sharon <span className="text-textRed">Choir</span></>}
      intro="The music ministry of RCCG Rose of Sharon, dedicated to creating inspiring music with a strong foundation in faith."
      image="/ccw.jpg"
      imageAlt="The Rose of Sharon Choir ministering"
      about="The Rose of Sharon Choir is the music ministry of RCCG Rose of Sharon, dedicated to creating inspiring music with a strong foundation in faith. Our mission is to produce songs that deepen individuals' relationship with Christ and spread a message of hope and joy through music."
      points={[
        { title: "Music with a foundation in faith", text: "Everything we sing is rooted in the Word and in a living relationship with Christ." },
        { title: "Deepening your walk with Christ", text: "We produce songs that draw individuals closer to Jesus and strengthen their faith." },
        { title: "Hope and joy", text: "Through music we spread a message of hope and joy to our church, our community and beyond." },
      ]}
      joinText="If God has given you a voice or an instrument, we would love to have you serve with the choir. Become a member and speak to the church office to find out how to join."
      others={[{ label: "Kids & Teens Ministry", href: "/ministries/kids-and-teens" }, { label: "Youth", href: "/youth" }, { label: "All ministries", href: "/ministries" }]}
    />
  );
}
