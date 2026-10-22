import FormFields from "@/components/FormFields";

export default function MembershipClassMakeupPage() {
  return (
    <FormFields
      config={{
        heroTitleHtml: 'Membership <span class="text-textRed">Class</span>',
        heroSubtitle: "Make-up Request Form",
        subject: "Membership Class — Make-up Request",
      }}
    />
  );
}
