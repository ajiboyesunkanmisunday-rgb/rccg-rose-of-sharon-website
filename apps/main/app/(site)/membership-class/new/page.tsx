import RequestForm from "@/components/RequestForm";

export const metadata = { title: "Believers Class — New Enrolment | RCCG Rose of Sharon" };

export default function BelieversClassNewPage() {
  return (
    <RequestForm
      title={<>Believers <span className="text-textRed">Class</span></>}
      subtitle="New Enrolment"
      cardTitle="Please provide your details"
      subject="Believers Class — New Enrolment"
      successTitle="Thank you!"
      successText="Your enrolment has been received. We will contact you with the next class date."
      fields={[
        { key: "name", label: "Full name", required: true, half: true },
        { key: "phone", label: "Phone number", type: "tel", required: true, half: true },
        { key: "email", label: "Email", type: "email", half: true },
        { key: "gender", label: "Gender", type: "select", options: ["Male", "Female"], half: true },
        { key: "slot", label: "Preferred class time", type: "select", options: ["Sunday", "Weekday evening", "Online"] },
        { key: "notes", label: "Anything we should know?", type: "textarea" },
      ]}
    />
  );
}
