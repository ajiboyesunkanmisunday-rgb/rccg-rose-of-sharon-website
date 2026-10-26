import RequestForm from "@/components/RequestForm";

export const metadata = { title: "Believers Class — Completed Class | RCCG Rose of Sharon" };

export default function BelieversClassCompletedPage() {
  return (
    <RequestForm
      title={<>Believers <span className="text-textRed">Class</span></>}
      subtitle="Completed Class"
      cardTitle="Please provide your details"
      subject="Believers Class — Completed Class"
      successTitle="Thank you!"
      successText="Thank you. Your completion has been noted."
      fields={[
        { key: "name", label: "Full name", required: true, half: true },
        { key: "phone", label: "Phone number", type: "tel", required: true, half: true },
        { key: "email", label: "Email", type: "email", half: true },
        { key: "gender", label: "Gender", type: "select", options: ["Male", "Female"], half: true },
        { key: "when", label: "When did you complete the class?", type: "date", required: true },
        { key: "where", label: "Where did you attend it?", placeholder: "e.g. Rose of Sharon, Ikeja" },
      ]}
    />
  );
}
