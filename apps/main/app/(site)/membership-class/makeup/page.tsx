import RequestForm from "@/components/RequestForm";

export const metadata = { title: "Believers Class — Makeup Class | RCCG Rose of Sharon" };

export default function BelieversClassMakeupPage() {
  return (
    <RequestForm
      title={<>Believers <span className="text-textRed">Class</span></>}
      subtitle="Makeup Class"
      cardTitle="Please provide your details"
      subject="Believers Class — Makeup Class"
      successTitle="Thank you!"
      successText="Your makeup request has been received. We will contact you to arrange it."
      fields={[
        { key: "name", label: "Full name", required: true, half: true },
        { key: "phone", label: "Phone number", type: "tel", required: true, half: true },
        { key: "email", label: "Email", type: "email", half: true },
        { key: "gender", label: "Gender", type: "select", options: ["Male", "Female"], half: true },
        { key: "missed", label: "Which class did you miss?", placeholder: "e.g. Week 3", required: true },
        { key: "reason", label: "Reason for missing", type: "textarea" },
      ]}
    />
  );
}
