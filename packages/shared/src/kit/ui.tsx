import Link from "../link";
import Reveal from "./Reveal";

/* ───────── cci-web look: black hero, small pill, Anton uppercase title with a red word ───────── */

export function Red({ children }: { children: React.ReactNode }) {
  return <span className="text-textRed">{children}</span>;
}

export function Hero({
  pill,
  title,
  subtitle,
  bg,
  bgPosition,
  logo,
  children,
}: {
  pill: string;
  title: React.ReactNode;
  subtitle?: string;
  bg?: string;
  /** CSS background-position for the hero photo (default: centred) */
  bgPosition?: string;
  /** a round logo shown above the pill (for a ministry or fellowship with its own logo) */
  logo?: string;
  children?: React.ReactNode;
}) {
  return (
    <div
      className="ros:flex ros:h-[500px] ros:items-center ros:justify-center ros:bg-black ros:bg-cover ros:bg-center ros:bg-no-repeat ros:lg:h-[700px]"
      style={bg ? { backgroundImage: `linear-gradient(rgba(0,0,0,0.55), rgba(0,0,0,0.55)), url('${bg}')`, ...(bgPosition ? { backgroundPosition: bgPosition } : {}) } : undefined}
    >
      <div className="ros:mx-auto ros:w-full ros:max-w-7xl ros:px-4 ros:md:px-8">
      <Reveal className={`ros:flex ros:w-full ros:max-w-3xl ros:flex-col ros:gap-6 ${bg ? "ros:items-start ros:text-left" : "ros:mx-auto ros:items-center ros:text-center"}`}>
        {logo && <img src={logo} alt="" width={96} height={96} className="ros:size-20 ros:rounded-full ros:bg-white ros:object-cover ros:md:size-24" />}
        <h3 className="ros:rounded-full ros:bg-[#00000078] ros:p-2 ros:text-[10px] ros:font-bold ros:uppercase ros:tracking-wider ros:text-[#FFFFFFCC]">
          {pill}
        </h3>
        <h1 className={`ros-anton ros:my-3 ros:max-w-[900px] ${bg ? "ros:text-left" : "ros:text-center"} ros:text-[3rem] ros:font-medium ros:uppercase ros:text-white ros:md:text-7xl ros:md:leading-[1.2]`}>
          {title}
        </h1>
        {subtitle && (
          <p className={`ros:w-full ros:max-w-2xl ${bg ? "ros:text-left" : "ros:text-center"} ros:text-base ros:text-[#FFFFFFB2] ros:md:text-lg ros:lg:text-xl`}>{subtitle}</p>
        )}
        {children}
      </Reveal>
      </div>
    </div>
  );
}

export function Pill({ children, dark = false }: { children: React.ReactNode; dark?: boolean }) {
  return (
    <h6
      className={`ros:w-fit ros:rounded-full ros:px-3 ros:py-1 ros:text-xs ros:font-bold ${
        dark ? "ros:bg-[#1F1F1F] ros:text-white" : "ros:bg-[#F4F4F4]"
      }`}
    >
      {children}
    </h6>
  );
}

export function SectionTitle({
  pill,
  title,
  sub,
  center = false,
  dark = false,
}: {
  pill?: string;
  title: React.ReactNode;
  sub?: string;
  center?: boolean;
  dark?: boolean;
}) {
  return (
    <div className={`ros:flex ros:flex-col ros:gap-3 ${center ? "ros:items-center ros:text-center" : ""}`}>
      {pill && <Pill dark={dark}>{pill}</Pill>}
      <h2 className={`ros-anton ros:text-3xl ros:font-normal ros:uppercase ros:leading-[120%] ros:md:text-5xl ${dark ? "ros:text-white" : "ros:text-black"}`}>
        {title}
      </h2>
      {sub && <p className={`ros:max-w-2xl ros:md:text-lg ${dark ? "ros:text-[#FFFFFFB2]" : "ros:text-[#00000099]"}`}>{sub}</p>}
    </div>
  );
}

const btnBase =
  "ros:flex ros:w-fit ros:items-center ros:justify-center ros:gap-2 ros:rounded-full ros:border ros:px-5 ros:py-3 ros:text-[0.75rem] ros:font-extrabold ros:uppercase ros:tracking-[.25em] ros:transition ros:duration-300";

export function Btn({
  href,
  children,
  variant = "red",
  className = "",
}: {
  href: string;
  children: React.ReactNode;
  variant?: "red" | "white" | "outline" | "outline-white";
  className?: string;
}) {
  const v = {
    red: "ros:border-[#DF4E4E] ros:bg-[#DF4E4E] ros:text-white ros:hover:border-black ros:hover:bg-white ros:hover:text-black",
    white: "ros:border-white ros:bg-white ros:text-black ros:hover:border-[#DF4E4E] ros:hover:bg-[#DF4E4E] ros:hover:text-white",
    outline: "ros:border-black ros:bg-transparent ros:text-black ros:hover:bg-black ros:hover:text-white",
    "outline-white": "ros:border-white ros:bg-transparent ros:text-white ros:hover:border-[#DF4E4E] ros:hover:bg-[#DF4E4E] ros:hover:text-white",
  }[variant];
  return (
    <Link href={href} className={`${btnBase} ${v} ${className}`}>
      {children}
    </Link>
  );
}

export function Card({
  image,
  title,
  text,
  href,
  meta,
}: {
  image?: string;
  title: string;
  text?: string;
  href?: string;
  meta?: string;
}) {
  const body = (
    <div className="ros:flex ros:w-full ros:flex-col ros:gap-3 ros:rounded-lg">
      {image && <img loading="lazy" decoding="async" src={image} alt={title} className="ros:h-[250px] ros:w-full ros:rounded-lg ros:object-cover ros:object-center" />}
      {meta && <span className="ros:text-[10px] ros:font-bold ros:uppercase ros:tracking-[0.2em] ros:text-[#DF4E4E]">{meta}</span>}
      <h3 className="ros:text-lg ros:font-bold ros:underline-offset-8 ros:group-hover:underline">{title}</h3>
      {text && <p className="ros:text-[#00000099]">{text}</p>}
    </div>
  );
  return href ? (
    <Link href={href} className="ros:group">
      {body}
    </Link>
  ) : (
    body
  );
}

/** Responsive centred page section, same width the original sections use. */
export function Section({ children, className = "", id }: { children: React.ReactNode; className?: string; id?: string }) {
  return (
    <section id={id} className={`ros:mx-auto ros:max-w-7xl ros:px-4 ros:py-12 ros:md:py-20 ${className}`}>
      <Reveal>{children}</Reveal>
    </section>
  );
}

/** Hero for the form pages (matches the original cci-web form-page hero). */
export function FormHero({ pill = "FORMS", title, subtitle }: { pill?: string; title: React.ReactNode; subtitle?: string }) {
  return (
    <div className="ros:flex ros:h-[500px] ros:items-center ros:justify-center ros:bg-black ros:lg:h-[700px]">
      <div className="ros:flex ros:w-full ros:max-w-2xl ros:flex-col ros:items-center ros:gap-6 ros:px-4">
        <h5 className="ros:text-xs ros:font-extrabold ros:tracking-widest ros:text-[#FFFFFFCC]">{pill}</h5>
        <h1 className="ros-anton ros:text-center ros:text-2xl ros:uppercase ros:text-white ros:md:text-[46px] ros:md:leading-[55px]">{title}</h1>
        {subtitle && (
          <p className="ros:w-full ros:max-w-lg ros:text-center ros:text-base ros:text-[#FFFFFFB2] ros:md:text-lg ros:lg:text-xl">{subtitle}</p>
        )}
      </div>
    </div>
  );
}
