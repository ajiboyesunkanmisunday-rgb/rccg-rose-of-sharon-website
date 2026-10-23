"use client";

import { useState } from "react";
import { motion } from "framer-motion";

const fadeUp = { hidden: { opacity: 0, y: "10%" }, visible: { opacity: 1, y: 0, transition: { duration: 1 } } };
const fadeIn  = { hidden: { opacity: 0 }, visible: { opacity: 1, transition: { duration: 1.5 } } };

interface Campus {
  name: string;
  country: "Nigeria" | "Canada" | "United Kingdom" | "United States" | "Ireland" | "Australia";
  address: string;
  sunday: string;
  wednesday?: string;
  href: string;
  image?: string;
}

// Placeholder campus list — add the remaining Rose of Sharon campuses here.
const campuses: Campus[] = [
  { name: "RCCG Rose of Sharon", country: "Nigeria", address: "Contact the church for our address and directions", sunday: "7:45am", wednesday: "6:30pm (Digging Deep)", href: "/about" },
];

const countryTabs = [
  { name: "Nigeria",        count: 1, flag: "https://cci-axios-web-cms-assets.s3.eu-north-1.amazonaws.com/web-assets/nigeria_flag_79eb3b42de.svg" },
  { name: "Canada",         count: 0,  flag: "https://cci-axios-web-cms-assets.s3.eu-north-1.amazonaws.com/web-assets/canada_flag_d952051a6d.svg" },
  { name: "United States",  count: 0,  flag: "https://cci-axios-web-cms-assets.s3.eu-north-1.amazonaws.com/web-assets/us_flag_1df2caa85b.svg" },
  { name: "Ireland",        count: 0,  flag: "https://cci-axios-web-cms-assets.s3.eu-north-1.amazonaws.com/web-assets/Flag_of_Ireland_83d5c8c947.svg" },
  { name: "United Kingdom", count: 0,  flag: "https://cci-axios-web-cms-assets.s3.eu-north-1.amazonaws.com/web-assets/uk_flag_647c13d485.svg" },
  { name: "Australia",      count: 0,  flag: "https://cci-axios-web-cms-assets.s3.eu-north-1.amazonaws.com/web-assets/au_img_ad1ba213ae.png" },
];

const INITIAL_VISIBLE = 12;

export default function CampusesPage() {
  const [active, setActive] = useState("");
  const [showAll, setShowAll] = useState(false);

  const filtered = active === "" ? campuses : campuses.filter((c) => c.country === active);
  const visible = showAll ? filtered : filtered.slice(0, INITIAL_VISIBLE);

  return (
    <>
      {/* ── HERO ── */}
      <motion.div
        variants={fadeIn}
        initial="hidden"
        animate="visible"
        className="flex h-[600px] items-center justify-center bg-black lg:h-[700px]"
      >
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="mx-4 flex w-full max-w-5xl flex-col items-center gap-6"
        >
          <h3 className="rounded-full bg-[#00000078] p-2 text-[10px] font-bold uppercase tracking-wider text-[#FFFFFFCC]">
            🌍 <span className="ml-0.5">RCCG ROSE OF SHARON</span>
          </h3>
          <h1 className="my-3 px-4 text-center font-anton text-[2rem] font-medium uppercase text-white sm:text-[3rem] md:px-0 md:text-6xl md:leading-[1.2]">
            We enlist, disciple and redeploy a people{" "}
            <br className="hidden md:block" />
            <span className="text-textRed">in Christ, for Christ, with joy.</span>
          </h1>
          <p className="w-full max-w-lg text-center text-base text-white md:text-lg lg:text-xl">
            Join us at a Rose of Sharon near you
          </p>
          <a
            href="#campuses"
            className="mb-6 flex w-full items-center justify-center gap-2 rounded-full border border-white bg-white px-5 py-3 text-[0.75rem] font-extrabold uppercase tracking-[.25em] text-black transition duration-300 hover:border-textRed hover:bg-textRed hover:text-white md:w-auto"
          >
            See All Campuses
          </a>
        </motion.div>
      </motion.div>

      {/* ── CAMPUSES LIST ── */}
      <section id="campuses" className="scroll-to-plus-nav mx-auto max-w-7xl px-4 py-12">
        <div className="relative mb-8 flex items-center justify-between">
          <h2 className="font-anton text-3xl font-medium uppercase text-black md:text-5xl">
            VISIT ROSE OF SHARON
          </h2>
          {/* decorative hand */}
          <div
            className="absolute right-[-5%] -bottom-[10%] z-0 mx-auto h-[300px] w-full bg-contain bg-right-bottom bg-no-repeat"
            style={{ backgroundImage: "url('/hand.png')" }}
          />
        </div>

        {/* Country filter tabs - updated */}
        <div className="my-12 flex flex-wrap justify-center gap-2 lg:flex-nowrap lg:justify-between">
          {countryTabs.map((tab) => (
            <button
              key={tab.name}
              onClick={() => { setActive(tab.name); setShowAll(false); }}
              className={`flex h-[50px] w-full items-center justify-center rounded-full border text-sm font-medium uppercase tracking-wider transition md:w-[250px] hover:bg-textRed/30 ${
                active === tab.name
                  ? "border-textRed bg-textRed text-white"
                  : "border-[#00000029] bg-white text-black"
              }`}
            >
              <img src={tab.flag} alt={tab.name} className="mr-2 h-5 w-5 rounded-full object-cover" />
              {tab.name} ({tab.count})
            </button>
          ))}
        </div>

        {/* Campus grid */}
        <div className="campuses-grid">
          {visible.map((campus, i) => (
            <a
              key={i}
              href={campus.href}
              target="_blank"
              rel="noopener noreferrer"
              className="group relative flex w-full flex-col items-start gap-2"
            >
              <span className="relative mt-1 block h-[240px] w-full overflow-hidden rounded-lg bg-gray-900">
                {campus.image ? (
                  <img src={campus.image} alt={campus.name} className="absolute inset-0 h-full w-full object-cover" />
                ) : (
                  <div className="absolute inset-0 flex items-center justify-center rounded-lg">
                    <img src="/logo.svg" alt={campus.name} className="h-10 opacity-40" />
                  </div>
                )}
                <div className="absolute inset-0 rounded-xl bg-black opacity-0 transition-opacity duration-300 group-hover:opacity-50" />
              </span>
              <h3 className="font-medium text-base md:text-lg">{campus.name}</h3>
              <div className="w-full text-sm text-[#00000099]">
                <p className="line-clamp-2">{campus.address}</p>
              </div>
              <div className="mt-1 text-xs text-[#00000099]">
                <p className="mb-0.5 text-[10px] font-bold uppercase tracking-widest text-black">Service Times</p>
                <p>Sunday {campus.sunday}</p>
                {campus.wednesday && <p>Wednesday {campus.wednesday}</p>}
              </div>
            </a>
          ))}
        </div>

        {/* See More */}
        {!showAll && filtered.length > INITIAL_VISIBLE && (
          <div className="mt-10 flex justify-center">
            <button
              onClick={() => setShowAll(true)}
              className="rounded-full border border-black bg-transparent px-8 py-3 text-xs font-extrabold uppercase tracking-[.25em] text-black transition hover:bg-black hover:text-white"
            >
              See More
            </button>
          </div>
        )}
      </section>
    </>
  );
}
