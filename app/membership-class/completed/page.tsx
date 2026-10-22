import FormFields from "@/components/FormFields";

export default function MembershipClassCompletedPage() {
  return (
    <FormFields
      config={{
        heroTitleHtml: 'Membership <span class="text-textRed">Class</span>',
        heroSubtitle: "Membership Class Certification Form",
        subject: "Membership Class — Certificate Request",
      }}
    />
  );
}
