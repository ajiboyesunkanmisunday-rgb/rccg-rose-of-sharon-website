"use client";

import { useEffect, useState } from "react";

type Nominee = { id: string; name: string; sex: "MALE" | "FEMALE" | string; photo: string | null; votes: number };
type EventInfo = { id: string; title?: string; start?: string; end?: string; status: "upcoming" | "open" | "closed"; totalVotes: number };
type Payload = { available: boolean; reason?: string; event?: EventInfo | null; nominees?: Nominee[] };

const fmt = (s?: string) => (s ? new Date(s).toLocaleString("en-NG", { dateStyle: "medium", timeStyle: "short" }) : "");
const GROUPS: { sex: string; title: string }[] = [
  { sex: "MALE", title: "The brothers" },
  { sex: "FEMALE", title: "The sisters" },
];

function initials(name: string) {
  return name.split(" ").filter(Boolean).slice(0, 2).map((p) => p[0]?.toUpperCase()).join("");
}

export default function FaceOfTheMonth() {
  const [data, setData] = useState<Payload | null>(null);
  const [picked, setPicked] = useState<Nominee | null>(null);
  const [phone, setPhone] = useState("");
  const [state, setState] = useState<"idle" | "sending" | "done" | "error">("idle");
  const [message, setMessage] = useState("");

  const load = () => fetch("/api/face-of-the-month", { cache: "no-store" }).then((r) => r.json()).then(setData).catch(() => setData({ available: false, reason: "api" }));
  useEffect(() => { load(); }, []);

  async function vote(e: React.FormEvent) {
    e.preventDefault();
    if (!picked || !data?.event) return;
    setState("sending");
    setMessage("");
    try {
      const res = await fetch("/api/face-of-the-month/vote", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ eventId: data.event.id, nomineeId: picked.id, category: picked.sex, phone }),
      });
      const json = await res.json().catch(() => ({}));
      setMessage(json.message || (res.ok ? "Thank you, your vote has been recorded." : "Your vote could not be recorded."));
      setState(res.ok ? "done" : "error");
      if (res.ok) load();
    } catch {
      setMessage("Something went wrong. Please try again.");
      setState("error");
    }
  }

  const close = () => { setPicked(null); setPhone(""); setState("idle"); setMessage(""); };

  if (!data) return <p className="ros:py-20 ros:text-center ros:text-[#00000099]">Loading…</p>;
  if (!data.available || !data.event) {
    return (
      <div className="ros:mx-auto ros:max-w-xl ros:rounded-lg ros:border ros:border-[#00000014] ros:bg-[#FAFAFA8F] ros:p-8 ros:text-center">
        <p className="ros:text-lg ros:font-bold">{data.available ? "No voting is open right now" : "Voting isn't available right now"}</p>
        <p className="ros:mt-2 ros:text-[#00000099]">When the church opens the next Face of the Month, the nominees will appear here.</p>
      </div>
    );
  }

  const { event, nominees = [] } = data;
  const closed = event.status === "closed";
  const open = event.status === "open";
  const statusLabel = open ? "Voting is open" : closed ? "Voting has closed" : "Voting opens soon";

  return (
    <div className="ros:flex ros:flex-col ros:gap-10">
      <div className="ros:flex ros:flex-col ros:items-center ros:gap-3 ros:text-center">
        <span className={`ros:rounded-full ros:px-4 ros:py-1.5 ros:text-[11px] ros:font-bold ros:uppercase ros:tracking-[0.2em] ${open ? "ros:bg-[#16A34A] ros:text-white" : "ros:bg-[#1F1F1F] ros:text-white"}`}>{statusLabel}</span>
        <h2 className="ros-anton ros:text-3xl ros:uppercase ros:md:text-5xl">{event.title || "Face of the Month"}</h2>
        <p className="ros:text-sm ros:text-[#00000099]">{fmt(event.start)} to {fmt(event.end)}</p>
        <p className="ros:text-sm ros:font-bold">{event.totalVotes} {event.totalVotes === 1 ? "vote" : "votes"} so far</p>
      </div>

      {GROUPS.map((g) => {
        const list = nominees.filter((n) => n.sex === g.sex);
        if (!list.length) return null;
        const top = closed ? Math.max(...list.map((n) => n.votes)) : -1;
        return (
          <section key={g.sex}>
            <h3 className="ros:mb-4 ros:text-xs ros:font-bold ros:uppercase ros:tracking-[0.25em] ros:text-[#DF4E4E]">{g.title}</h3>
            <div className="ros:grid ros:grid-cols-2 ros:gap-4 ros:md:grid-cols-3 ros:lg:grid-cols-4">
              {list.map((n) => (
                <div key={n.id} className={`ros:flex ros:flex-col ros:items-center ros:gap-3 ros:rounded-lg ros:border ros:p-4 ros:text-center ${closed && n.votes === top && top > 0 ? "ros:border-[#DF4E4E] ros:bg-[#FFF5F5]" : "ros:border-[#00000014] ros:bg-[#FAFAFA8F]"}`}>
                  {n.photo ? (
                    <img src={n.photo} alt={n.name} loading="lazy" className="ros:size-28 ros:rounded-full ros:object-cover ros:object-top" />
                  ) : (
                    <span className="ros:flex ros:size-28 ros:items-center ros:justify-center ros:rounded-full ros:bg-black ros:text-3xl ros:font-bold ros:text-white">{initials(n.name)}</span>
                  )}
                  <p className="ros:font-bold">{n.name}</p>
                  {closed && <p className="ros:text-sm ros:text-[#00000099]">{n.votes} {n.votes === 1 ? "vote" : "votes"}{n.votes === top && top > 0 ? " · Face of the Month" : ""}</p>}
                  {open && (
                    <button type="button" onClick={() => { setPicked(n); setState("idle"); setMessage(""); }} className="ros:w-full ros:rounded-full ros:border ros:border-[#DF4E4E] ros:bg-[#DF4E4E] ros:px-4 ros:py-2.5 ros:text-[11px] ros:font-extrabold ros:uppercase ros:tracking-[0.2em] ros:text-white ros:transition ros:hover:border-black ros:hover:bg-white ros:hover:text-black">Vote</button>
                  )}
                </div>
              ))}
            </div>
          </section>
        );
      })}

      {picked && (
        <div className="ros:fixed ros:inset-0 ros:z-[60] ros:flex ros:items-end ros:justify-center ros:bg-black/60 ros:p-4 ros:md:items-center" role="dialog" aria-modal="true" onClick={close}>
          <div className="ros:w-full ros:max-w-md ros:rounded-2xl ros:bg-white ros:p-6" onClick={(e) => e.stopPropagation()}>
            {state === "done" ? (
              <div className="ros:flex ros:flex-col ros:items-center ros:gap-4 ros:text-center">
                <p className="ros:text-xl ros:font-bold">Thank you!</p>
                <p className="ros:text-[#00000099]">{message}</p>
                <button type="button" onClick={close} className="ros:rounded-full ros:bg-black ros:px-6 ros:py-2.5 ros:text-xs ros:font-bold ros:uppercase ros:tracking-[0.2em] ros:text-white">Close</button>
              </div>
            ) : (
              <form onSubmit={vote} className="ros:flex ros:flex-col ros:gap-4">
                <p className="ros:text-lg ros:font-bold">Vote for {picked.name}</p>
                <label className="ros:flex ros:flex-col ros:gap-1.5 ros:text-sm ros:font-semibold">
                  Phone number on your membership record
                  <input type="tel" required value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="080 0000 0000" className="ros:w-full ros:rounded-lg ros:border ros:border-[#D0D5DD] ros:px-4 ros:py-3 ros:text-sm ros:outline-none ros:focus:border-[#DF4E4E]" />
                </label>
                <p className="ros:text-xs ros:text-[#00000099]">Only church members can vote. We use your number to find your membership and never show it.</p>
                {state === "error" && <p className="ros:text-sm ros:text-[#DC2626]">{message}</p>}
                <div className="ros:flex ros:justify-end ros:gap-3">
                  <button type="button" onClick={close} className="ros:rounded-full ros:border ros:border-black ros:px-5 ros:py-2.5 ros:text-xs ros:font-bold ros:uppercase ros:tracking-[0.2em]">Cancel</button>
                  <button type="submit" disabled={state === "sending"} className="ros:rounded-full ros:bg-[#DF4E4E] ros:px-5 ros:py-2.5 ros:text-xs ros:font-bold ros:uppercase ros:tracking-[0.2em] ros:text-white ros:disabled:opacity-60">{state === "sending" ? "Sending…" : "Cast vote"}</button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
