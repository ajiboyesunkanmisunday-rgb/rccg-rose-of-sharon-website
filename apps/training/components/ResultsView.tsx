"use client";

import { useEffect, useState } from "react";
import { Hero, Section, Btn } from "@ros/shared/kit/ui";
import ProgramTabs from "./ProgramTabs";
import { getProgram } from "@ros/shared/kit/programs";

interface Saved { name: string; id: string; score: number; total: number; percent: number; passMark: number; passed: boolean; at: number }

/** "View results": the latest exam result taken on this device. */
export default function ResultsView({ slug }: { slug: string }) {
  const p = getProgram(slug);
  const [saved, setSaved] = useState<Saved | null | undefined>(undefined);
  useEffect(() => {
    try { setSaved(JSON.parse(localStorage.getItem("ros-exam-results") || "{}")[slug] ?? null); } catch { setSaved(null); }
  }, [slug]);

  return (
    <>
      <Hero pill="📊 YOUR RESULTS" title={<>{p.short} <span className="text-textRed">Results</span></>} subtitle={`${p.name} — online exam`} bg="/assets/hero-bg.png" />
      <Section>
        <div className="ros:mx-auto ros:max-w-3xl">
          <ProgramTabs slug={slug} />
          {saved === undefined ? (
            <div className="ros:h-[200px] ros:animate-pulse ros:rounded-xl ros:bg-[#F4F4F4]" />
          ) : saved ? (
            <div className="ros:flex ros:flex-col ros:items-center ros:gap-4 ros:rounded-xl ros:border ros:border-[#E5E7EB] ros:bg-[#FAFAFA] ros:p-8 ros:text-center">
              <span className={`ros:rounded-full ros:px-4 ros:py-1 ros:text-xs ros:font-extrabold ros:uppercase ros:tracking-[0.2em] ${saved.passed ? "ros:bg-green-100 ros:text-green-700" : "ros:bg-red-100 ros:text-red-700"}`}>{saved.passed ? "Passed" : "Not passed"}</span>
              <p className="ros-anton ros:text-6xl">{saved.percent}%</p>
              <p className="ros:text-[#00000099]">{saved.name ? `${saved.name}, you` : "You"} scored <b className="ros:text-black">{saved.score} / {saved.total}</b>. The pass mark is {saved.passMark}%.</p>
              <p className="ros:text-sm ros:text-[#00000066]">Taken {new Date(saved.at).toLocaleString("en-GB", { dateStyle: "long", timeStyle: "short" })}</p>
              <div className="ros:mt-2 ros:flex ros:flex-wrap ros:justify-center ros:gap-3">
                <Btn href={`${p.base}/exam`} variant="outline">Retake the exam</Btn>
                <Btn href={p.base} variant="red">Back to {p.short}</Btn>
              </div>
              <p className="ros:text-xs ros:text-[#00000066]">This result is saved on this device only. Official results are recorded by the training office.</p>
            </div>
          ) : (
            <div className="ros:flex ros:flex-col ros:items-center ros:gap-4 ros:rounded-xl ros:border ros:border-dashed ros:border-[#D1D5DB] ros:p-10 ros:text-center">
              <span className="ros:text-[40px]">📝</span>
              <h2 className="ros:text-xl ros:font-bold">No results yet</h2>
              <p className="ros:max-w-md ros:text-[#00000099]">You have not taken the {p.short} exam on this device. Take it now and your result will appear here.</p>
              <Btn href={`${p.base}/exam`} variant="red">Take the exam</Btn>
            </div>
          )}
        </div>
      </Section>
    </>
  );
}
