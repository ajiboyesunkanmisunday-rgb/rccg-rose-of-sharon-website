import RequestForm from "@/components/RequestForm";

export const metadata = { title: "Welfare Request | RCCG Rose of Sharon" };

export default function WelfarePage() {
  return (
    <RequestForm
      title={<><span className="text-textRed">Welfare</span> Request</>}
      subtitle="If you are going through a difficult time, tell us how we can help. Your request is handled with care and in confidence."
      cardTitle="Tell us what you need"
      subject="Welfare Request"
      subjectField="type"
      successTitle="Request received"
      successText="Thank you for reaching out. Our welfare team will contact you soon."
      fields={[
        { key: "name", label: "Full name", required: true, half: true },
        { key: "phone", label: "Phone number", type: "tel", required: true, half: true },
        { key: "email", label: "Email", type: "email", half: true },
        { key: "address", label: "Address / area", half: true },
        { key: "type", label: "Type of help needed", type: "select", options: ["Food", "Rent / accommodation", "Medical", "School fees", "Counselling support", "Other"] },
        { key: "details", label: "Tell us more", type: "textarea", required: true, placeholder: "Describe your situation and what would help" },
      ]}
    />
  );
}
