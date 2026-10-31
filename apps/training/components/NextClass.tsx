"use client";

import { useEffect, useState } from "react";

type Next = { name: string; date: string; teacher: string; location: string } | null;

/** The next class from the training schedule (set up in the management app); the program's own wording until one exists. */
export default function NextClass({ program, fallback }: { program: string; fallback: string }) {
  const [next, setNext] = useState<Next>(null);
  useEffect(() => {
    fetch(`/api/next-class?program=${encodeURIComponent(program)}`, { cache: "no-store" })
      .then((r) => (r.ok ? r.json() : { next: null }))
      .then((d) => setNext(d.next ?? null))
      .catch(() => setNext(null));
  }, [program]);

  if (!next) return <p className="ros:text-[22px] ros:font-bold ros:leading-snug">{fallback}</p>;
  const when = new Date(`${next.date}T00:00:00`).toLocaleDateString("en-GB", { weekday: "long", day: "numeric", month: "long", year: "numeric" });
  return (
    <>
      <p className="ros:text-[22px] ros:font-bold ros:leading-snug">{when}</p>
      <p className="ros:text-sm ros:text-[#00000099]">{[next.name, next.location, next.teacher && `Taught by ${next.teacher}`].filter(Boolean).join(" · ")}</p>
    </>
  );
}
