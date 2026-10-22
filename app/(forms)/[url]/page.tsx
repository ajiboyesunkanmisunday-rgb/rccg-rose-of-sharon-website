import { notFound } from "next/navigation";
import FormFields, { FormConfig } from "@/components/FormFields";

// Slugs that already have a dedicated Rose of Sharon page redirect there;
// the rest render the shared form layout and send the submission to the church team.
const formConfigs: Record<string, FormConfig> = {
  "ft": { heroTitleHtml: "First Timer", subject: "First Timer", redirectTo: "/first-timer" },
  "prayer-request": { heroTitleHtml: "PRAYER REQUEST", subject: "Prayer Request", redirectTo: "/requests/prayer" },
  "membership": { heroTitleHtml: "MEMBERSHIP FORM", subject: "Membership", redirectTo: "/e-member" },
  "counselling": { heroTitleHtml: "COUNSELLING", subject: "Counselling", redirectTo: "/requests/counseling" },
  "testimony": { heroTitleHtml: "SHARE YOUR TESTIMONY", subject: "Testimony", redirectTo: "/testimonies" },
  "online-community": {
    heroTitleHtml: 'Online <span class="text-textRed">Community</span> Form',
    subject: "Online Community",
  },
  "pre-marital-counselling": { heroTitleHtml: "PRE MARITAL COUNSELLING", subject: "Pre Marital Counselling" },
  "post-marital-counselling": { heroTitleHtml: "POST MARITAL COUNSELLING", subject: "Post Marital Counselling" },
  "welfare": { heroTitleHtml: '<span class="text-textRed">Welfare</span> Form', subject: "Welfare Request" },
  "newcampusvolunteers": { heroTitleHtml: "NEW CAMPUS <br/> VOLUNTEERS", subject: "New Campus Volunteers" },
  "discipleship": { heroTitleHtml: "DISCIPLESHIP", subject: "Discipleship Experience" },
  "ccilegacyfellowsprogram": { heroTitleHtml: "LEGACY FELLOWS PROGRAM", subject: "Legacy Fellows Program" },
  "ccilegacyprojectspotlight": { heroTitleHtml: "LEGACY PROJECT SPOTLIGHT", subject: "Legacy Project Spotlight" },
  "feedback-survey": { heroTitleHtml: "FEEDBACK SURVEY", subject: "Feedback Survey" },
  "ftabj": { heroTitleHtml: "FIRST TIMER (BRANCH)", subject: "First Timer (Branch)" },
  "gpa": { heroTitleHtml: "GLOBAL PROTOCOL ATTENDANCE", subject: "Global Protocol Attendance" },
  "helpline-volunteers": { heroTitleHtml: "HELPLINE VOLUNTEERS", subject: "Helpline Volunteers" },
  "pfl": { heroTitleHtml: "PFL", subject: "PFL" },
  "rbcuk": { heroTitleHtml: "STREAMING EXPERIENCE", subject: "Streaming Experience" },
  "st": { heroTitleHtml: "SECOND TIMERS", subject: "Second Timers" },
  "seniors-connect": { heroTitleHtml: "SENIORS CONNECT", subject: "Seniors Connect" },
  "yaf-feedback": { heroTitleHtml: "YOUNG AND FREE FEEDBACK", subject: "Young And Free Feedback" },
};

export function generateStaticParams() {
  return Object.keys(formConfigs).map((url) => ({ url }));
}

export default async function FormPage({ params }: { params: Promise<{ url: string }> }) {
  const { url } = await params;
  const config = formConfigs[url];
  if (!config) notFound();

  return <FormFields config={config} />;
}
