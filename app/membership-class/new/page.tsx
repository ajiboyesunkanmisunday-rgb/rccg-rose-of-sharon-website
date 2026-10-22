import FormFields from "@/components/FormFields";

export default function MembershipClassNewPage() {
  return (
    <FormFields
      config={{
        heroTitleHtml: 'Membership <span class="text-textRed">Class</span>',
        heroSubtitle: "New Enrolment Form",
        subject: "Membership Class — New Enrolment",
      }}
    />
  );
}
