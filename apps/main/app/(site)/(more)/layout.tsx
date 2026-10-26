import "./more.css";

/*
 * Wraps the additional Rose of Sharon pages: loads their scoped styles and leaves breathing room above
 * the footer, so the footer's "Give" banner (which overlaps upward) never covers page content.
 */
export default function MoreLayout({ children }: { children: React.ReactNode }) {
  return <div className="ros:bg-white ros:pb-16">{children}</div>;
}
