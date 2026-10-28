import { Suspense } from "react";
import LayoutWrapper from "@ros/shared/chrome/LayoutWrapper";
import "./more.css";

/*
 * Events, announcements, testimonies and the photo gallery keep the church website's header and footer.
 * (The sermons pages next to this folder use their own app-style layout.)
 */
export default function ClassicLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="fade-in">
      <Suspense>
        <LayoutWrapper>
          <div className="ros:bg-white ros:pb-16">{children}</div>
        </LayoutWrapper>
      </Suspense>
    </div>
  );
}
