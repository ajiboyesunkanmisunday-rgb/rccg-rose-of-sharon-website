import { Hero, Section } from "@ros/shared/kit/ui";
import FaceOfTheMonth from "@/components/FaceOfTheMonth";

export const metadata = {
  title: "Face of the Month | RCCG Rose of Sharon",
  description: "Vote for the Rose of Sharon Face of the Month.",
};

export default function FaceOfTheMonthPage() {
  return (
    <>
      <Hero
        pill="🏆 FACE OF THE MONTH"
        title={<>Vote for the <span className="text-textRed">Face of the Month</span></>}
        subtitle="The church picks the nominees. Members vote, and the results are shown here as soon as voting closes."
        bg="/home/celebrations-banner.jpg"
      />
      <Section>
        <FaceOfTheMonth />
      </Section>
    </>
  );
}
