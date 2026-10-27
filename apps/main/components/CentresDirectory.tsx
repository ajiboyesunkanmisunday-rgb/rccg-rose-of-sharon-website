"use client";

import { useMemo, useState } from "react";
import { CENTRES, CENTRE_CONTACTS, PARISH_ADDRESS } from "@/app/(site)/cell-church/centres";

const maps = (q: string) => `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(q)}`;
const pill: React.CSSProperties = { display: "inline-flex", alignItems: "center", gap: 6, borderRadius: 999, background: "#000", color: "#fff", padding: "7px 14px", fontSize: 12, fontWeight: 700, textDecoration: "none" };

/** Searchable list of the parish's house fellowship centres, with a one-tap call button for each leader. */
export default function CentresDirectory() {
  const [q, setQ] = useState("");
  const list = useMemo(() => {
    const t = q.trim().toLowerCase();
    return t ? CENTRES.map((c, i) => ({ c, n: i + 1 })).filter(({ c }) => `${c.name} ${c.location} ${c.leader}`.toLowerCase().includes(t)) : CENTRES.map((c, i) => ({ c, n: i + 1 }));
  }, [q]);

  return (
    <section id="centres" className="mx-auto max-w-7xl px-4 py-14 md:py-20" style={{ scrollMarginTop: 90 }}>
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 14, textAlign: "center" }}>
        <h6 className="w-fit rounded-full bg-[#F4F4F4] px-3 py-1 text-xs font-bold">📍 FIND A FELLOWSHIP</h6>
        <h2 className="font-anton uppercase" style={{ fontSize: "clamp(30px, 6vw, 48px)", lineHeight: 1.1 }}>
          House fellowship <span className="text-textRed">centres</span>
        </h2>
        <p className="text-[#00000099]" style={{ maxWidth: 560 }}>
          {CENTRES.length} centres across the Rose of Sharon parish. Find the one nearest you and call the leader to join.
        </p>
        <div style={{ position: "relative", width: "100%", maxWidth: 520 }}>
          <input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Search by centre, area or leader"
            aria-label="Search house fellowship centres"
            style={{ width: "100%", borderRadius: 999, border: "1px solid #D0D5DD", padding: "13px 20px", fontSize: 15, outline: "none", background: "#fff" }}
          />
        </div>
        <p className="text-sm text-[#00000099]" aria-live="polite">{list.length} {list.length === 1 ? "centre" : "centres"}{q ? ` matching “${q}”` : ""}</p>
      </div>

      <div style={{ marginTop: 32, display: "flex", flexWrap: "wrap", justifyContent: "center", gap: 16 }}>
        {list.map(({ c, n }) => (
          <article key={c.name} style={{ flex: "0 1 calc((100% - 32px) / 3)", minWidth: "min(100%, 300px)", border: "1px solid #00000014", borderRadius: 14, background: "#FAFAFA", padding: 20, display: "flex", flexDirection: "column", gap: 12 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
              <span style={{ width: 34, height: 34, borderRadius: 999, background: "#DF4E4E", color: "#fff", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 13, fontWeight: 800, flexShrink: 0 }}>{n}</span>
              <h3 style={{ fontSize: 16, fontWeight: 800, textTransform: "uppercase", letterSpacing: "0.02em", lineHeight: 1.25 }}>{c.name}</h3>
            </div>
            <p style={{ fontSize: 14, color: "#374151", lineHeight: 1.55 }}>
              <span aria-hidden="true">📍 </span>{c.location}{" "}
              <a href={maps(c.location)} target="_blank" rel="noopener noreferrer" style={{ color: "#DF4E4E", fontWeight: 700, whiteSpace: "nowrap" }}>Map ↗</a>
            </p>
            <p style={{ fontSize: 14, color: "#374151" }}><span aria-hidden="true">👤 </span><b>{c.leader.includes("/") ? "Leaders: " : "Leader: "}</b>{c.leader}</p>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginTop: "auto" }}>
              {c.phones.map((p) => (
                <a key={p} href={`tel:${p}`} style={pill}>📞 {p.replace(/^(\d{4})(\d{3})(\d{4})$/, "$1 $2 $3")}</a>
              ))}
            </div>
          </article>
        ))}
      </div>
      {list.length === 0 && <p className="mt-10 text-center text-[#00000099]">No centre matches your search. Try an area name such as “Ikeja” or “Maryland”.</p>}

      {/* who to contact */}
      <div style={{ marginTop: 40, borderRadius: 20, background: "#000", color: "#fff", padding: "32px 24px", display: "flex", flexDirection: "column", gap: 18, alignItems: "center", textAlign: "center" }}>
        <h3 className="font-anton uppercase" style={{ fontSize: "clamp(24px, 4.5vw, 36px)", lineHeight: 1.15 }}>For further <span className="text-textRed">information</span></h3>
        <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", gap: 12 }}>
          {CENTRE_CONTACTS.map((p) => (
            <a key={p.phone} href={`tel:${p.phone}`} style={{ ...pill, background: "#fff", color: "#000", padding: "10px 18px" }}>📞 {p.name}: {p.display}</a>
          ))}
        </div>
        <p style={{ fontSize: 14, color: "#FFFFFFB3" }}>
          <span aria-hidden="true">📍 </span>Parish address: {PARISH_ADDRESS}{" "}
          <a href={maps(PARISH_ADDRESS)} target="_blank" rel="noopener noreferrer" style={{ color: "#DF4E4E", fontWeight: 700 }}>Map ↗</a>
        </p>
      </div>
    </section>
  );
}
