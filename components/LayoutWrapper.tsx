import Navbar from "./Navbar";
import Footer from "./Footer";
import FloatingRequestButton from "./sections/FloatingRequestButton";

export default function LayoutWrapper({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Navbar />
      <main className="mt-[72px]">{children}</main>
      <Footer />
      <FloatingRequestButton />
    </>
  );
}
