import MinistryPage from "@/components/MinistryPage";

export const metadata = {
  title: "Kids & Teens Ministry | RCCG Rose of Sharon",
  description: "The children's and teens' ministry of RCCG Rose of Sharon: helping every child celebrate endless life in Christ.",
};

export default function KidsAndTeensPage() {
  return (
    <MinistryPage
      pill="🧒 CHILDREN MINISTRY · OAKS OF RIGHTEOUSNESS"
      title={<>Kids &amp; Teens <span className="text-textRed">Ministry</span></>}
      intro="The children's and teens' ministry of RCCG Rose of Sharon, helping every child celebrate endless life in Christ."
      image="/gallery/back-to-school/04.jpg"
      imageAlt="Children and teens of RCCG Rose of Sharon"
      about="The Kids & Teens Ministry is the children's and teens' ministry of RCCG Rose of Sharon. Our vision is to see all children celebrating endless life in Christ and training them to disciple others for Christ. We are committed to partnering with you and your child for their progress and joy in the faith."
      points={[
        { title: "Celebrating endless life in Christ", text: "Our vision is to see every child enjoying a joyful, lasting life in Christ." },
        { title: "Training children to disciple others", text: "We teach children not only to follow Christ, but to lead others to Him." },
        { title: "Partnering with parents", text: "We work hand in hand with you and your child for their progress in the faith." },
        { title: "Progress and joy in the faith", text: "We want every child to grow strong in faith and to enjoy doing so." },
      ]}
      joinText="Bring your children and teens along on Sunday. Register as a first-timer or become a member, and our team will welcome your family."
      others={[{ label: "Rose of Sharon Choir", href: "/ministries/choir" }, { label: "Youth", href: "/youth" }, { label: "All ministries", href: "/ministries" }]}
    />
  );
}
