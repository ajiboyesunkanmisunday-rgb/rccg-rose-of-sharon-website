"use client";

import { useState } from "react";
import { CheckCircle } from "lucide-react";

export type VerifiedMember = { id: string; firstName: string } | null;

/**
 * "Verify your membership" strip above a paper form. The backend wants to know which member is applying, so the
 * visitor gives the email or phone number on their membership record and the server finds the member
 * (/api/member/verify); only the member's id and first name come back. It sits outside the printable sheet.
 */
export default function MemberVerifyBar({
  member, onChange, noPrintClass, optional = false,
}: {
  member: VerifiedMember;
  onChange: (m: VerifiedMember) => void;
  noPrintClass: string;
  optional?: boolean;
}) {
  const [identifier, setIdentifier] = useState("");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");

  async function verify() {
    setBusy(true);
    setError("");
    try {
      const res = await fetch("/api/member/verify", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ identifier }) });
      const json = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(json.message || "We could not check your membership. Please try again.");
      onChange({ id: json.id, firstName: json.firstName || "" });
    } catch (e) {
      setError(e instanceof Error ? e.message : "We could not check your membership. Please try again.");
    } finally {
      setBusy(false);
    }
  }

  const box: React.CSSProperties = { maxWidth: 794, margin: "8px auto 0", padding: "10px 14px", borderRadius: 8, border: "1px solid #d1d5db", background: "#fff", fontFamily: "Arial, Helvetica, sans-serif", fontSize: 13, color: "#374151" };

  return (
    <div className={noPrintClass} style={box} data-no-check>
      {member ? (
        <div style={{ display: "flex", alignItems: "center", gap: 8, flexWrap: "wrap" }}>
          <CheckCircle size={16} color="#16A34A" />
          <strong style={{ color: "#16A34A" }}>Verified{member.firstName ? `: ${member.firstName}` : ""}</strong>
          <button type="button" onClick={() => onChange(null)} style={{ marginLeft: "auto", color: "#6b7280", textDecoration: "underline", cursor: "pointer", fontSize: 12 }}>Change</button>
        </div>
      ) : (
        <>
          <div style={{ display: "flex", gap: 8, alignItems: "center", flexWrap: "wrap" }}>
            <label htmlFor="member-verify" style={{ fontWeight: 700 }}>Verify your membership{optional ? " (optional)" : ""}:</label>
            <input
              id="member-verify" type="text" value={identifier} data-no-check autoComplete="off"
              onChange={(e) => setIdentifier(e.target.value)}
              onKeyDown={(e) => { if (e.key === "Enter") { e.preventDefault(); if (identifier.trim().length >= 5 && !busy) verify(); } }}
              placeholder="Membership email or phone number"
              style={{ flex: 1, minWidth: 200, border: "1px solid #d1d5db", borderRadius: 6, padding: "7px 10px", fontSize: 13 }}
            />
            <button type="button" onClick={verify} disabled={busy || identifier.trim().length < 5}
              style={{ border: "none", borderRadius: 6, padding: "8px 16px", fontWeight: 700, fontSize: 13, color: "#fff", background: busy || identifier.trim().length < 5 ? "#9ca3af" : "#000080", cursor: busy ? "wait" : "pointer" }}>
              {busy ? "Checking…" : "Verify"}
            </button>
          </div>
          {error && <div style={{ color: "#DC2626", marginTop: 6 }}>{error}</div>}
        </>
      )}
    </div>
  );
}
