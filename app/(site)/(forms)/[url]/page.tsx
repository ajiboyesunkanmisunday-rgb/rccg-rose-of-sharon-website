import { notFound } from "next/navigation";
import FormFields, { FormConfig } from "@/components/FormFields";

const formConfigs: Record<string, FormConfig> = {
  "ft": {
    heroTitleHtml: "Welcome to <span class=\"text-textRed\">Rose of Sharon</span>",
    heroSubtitle: "Fill the form below to help us get to know you better…📝",
    formId: 3,
    formHeaderText: " ",
    iframeHeight: 1704,
  },
  "prayer-request": {
    heroTitleHtml: "PRAYER REQUEST",
    formId: 6,
    iframeHeight: 818,
  },
  "membership": {
    heroTitleHtml: "MEMBERSHIP FORM",
    formId: 15,
    iframeHeight: 818,
  },
  "online-community": {
    heroTitleHtml: "Online <span class=\"text-textRed\">Community</span> Form",
    formId: 2,
    iframeHeight: 818,
  },
  "celebrations": {
    heroTitleHtml: "celebrate life&apos;s <br/> special <span class=\"text-textRed\">moments</span>",
    heroSubtitle: "We are just excited as you are about your happy day.",
    formId: 11,
    formHeaderText: "Kindly adhere to the instructions below when choosing a date",
    formHeaderItems: [
      "Wedding Thanksgiving – Select a Sunday that is at least two(2) weeks from today.",
      "Baby Dedication – Select a Sunday that is at least two (2) weeks from today.",
      "Naming Ceremony – Select a day that is at least three (3) days from today.",
    ],
    iframeHeight: 1154,
  },
  "pre-marital-counselling": {
    heroTitleHtml: "PRE MARITAL COUNSELLING",
    formId: 12,
    iframeHeight: 818,
  },
  "post-marital-counselling": {
    heroTitleHtml: "POST MARITAL COUNSELLING",
    formId: 14,
    iframeHeight: 818,
  },
  "welfare": {
    heroTitleHtml: "<span class=\"text-textRed\">Welfare</span> Form",
    formId: 5,
    iframeHeight: 1697,
  },
  "newcampusvolunteers": {
    heroTitleHtml: "NEW CAMPUS <br/> VOLUNTEERS",
    formId: 26,
    iframeHeight: 818,
  },
  "discipleship": {
    heroTitleHtml: "DISCIPLESHIP",
    formId: 0,
    iframeHeight: 818,
  },
  "ccilegacyfellowsprogram": {
    heroTitleHtml: "ROS LEGACY FELLOWS PROGRAM",
    formId: 0,
    iframeHeight: 818,
  },
  "ccilegacyprojectspotlight": {
    heroTitleHtml: "ROS LEGACY PROJECT SPOTLIGHT",
    formId: 0,
    iframeHeight: 818,
  },
  "feedback-survey": {
    heroTitleHtml: "FEEDBACK SURVEY",
    formId: 0,
    iframeHeight: 818,
  },
  "ftabj": {
    heroTitleHtml: "FIRST TIMER REGISTRATION (BRANCH)",
    formId: 0,
    iframeHeight: 818,
  },
  "gpa": {
    heroTitleHtml: "GPA",
    formId: 0,
    iframeHeight: 818,
  },
  "helpline-volunteers": {
    heroTitleHtml: "HELPLINE VOLUNTEERS",
    formId: 0,
    iframeHeight: 818,
  },
  "pfl": {
    heroTitleHtml: "PFL",
    formId: 0,
    iframeHeight: 818,
  },
  "rbcuk": {
    heroTitleHtml: "STREAMING EXPERIENCE",
    formId: 0,
    iframeHeight: 818,
  },
  "st": {
    heroTitleHtml: "ST",
    formId: 0,
    iframeHeight: 818,
  },
  "seniors-connect": {
    heroTitleHtml: "SENIORS CONNECT",
    formId: 0,
    iframeHeight: 818,
  },
  "testimony": {
    heroTitleHtml: "SHARE YOUR TESTIMONY",
    formId: 0,
    iframeHeight: 818,
  },
  "yaf-feedback": {
    heroTitleHtml: "YAF FEEDBACK",
    formId: 0,
    iframeHeight: 818,
  },
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
