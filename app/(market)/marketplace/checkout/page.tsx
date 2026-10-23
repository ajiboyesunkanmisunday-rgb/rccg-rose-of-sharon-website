"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { DELIVERY_ZONES, PAYMENT_METHODS, PICKUP_POINTS, naira } from "../_lib/catalog";
import { findProduct, placeOrder, saveProfile, totals, unitPrice, useMarket } from "../_lib/store";
import { Shell } from "../_components/Shell";
import { BASE, Crumbs, Empty, vs } from "../_components/ui";

const input = "w-full rounded-lg border border-[#E5E7EB] bg-white px-4 py-3 text-[14px] text-[#374151] outline-none focus:border-[#000080] focus:ring-1 focus:ring-[#000080]";
const STEPS = ["Your details", "Delivery", "Payment", "Review"];

export default function CheckoutPage() {
  const m = useMarket();
  const router = useRouter();
  const [step, setStep] = useState(0);
  const [method, setMethod] = useState<"pickup" | "delivery">("pickup");
  const [pickup, setPickup] = useState(PICKUP_POINTS[0]);
  const [payment, setPayment] = useState<"transfer" | "pickup">("transfer");
  const [ref, setRef] = useState("");
  const [note, setNote] = useState("");
  const [err, setErr] = useState("");
  const [busy, setBusy] = useState(false);
  const pf = m.profile;
  const t = totals(m, method);

  if (!m.hydrated) return <Shell><div className="h-[300px] animate-pulse rounded-[20px] bg-[#EEE]" /></Shell>;
  if (m.cart.length === 0) return <Shell><Empty title="Nothing to check out" text="Your cart is empty." cta="Browse the marketplace" href={BASE} /></Shell>;

  function next() {
    setErr("");
    if (step === 0) {
      if (pf.name.trim().length < 2) return setErr("Please enter your full name.");
      if (!/^[+0-9 ()-]{7,}$/.test(pf.phone.trim())) return setErr("Please enter a valid phone number.");
      if (pf.email.trim() && !/^\S+@\S+\.\S+$/.test(pf.email.trim())) return setErr("That email address does not look right.");
    }
    if (step === 1 && method === "delivery" && pf.address.trim().length < 8) return setErr("Please enter your full delivery address.");
    if (step === 2 && payment === "pickup" && method === "delivery") return setErr("Pay on pickup is only available when you collect from the church.");
    setStep(step + 1);
  }
  function place() {
    setBusy(true);
    const o = placeOrder({ method, payment, paymentRef: ref.trim() || undefined, pickupPoint: method === "pickup" ? pickup : undefined, note: note.trim() || undefined });
    if (o) router.push(`${BASE}/orders/${o.id}?new=1`); else setBusy(false);
  }

  return (
    <Shell>
      <Crumbs items={[{ label: "Marketplace", href: BASE }, { label: "Cart", href: `${BASE}/cart` }, { label: "Checkout" }]} />
      <h1 className="mb-6 text-[28px] font-black text-[#100E1A]" style={vs}>Checkout</h1>
      <ol className="mb-8 flex items-center gap-2 overflow-x-auto" style={vs}>
        {STEPS.map((s, i) => (
          <li key={s} className="flex items-center gap-2">
            <button disabled={i > step} onClick={() => setStep(i)} className={`flex items-center gap-2 rounded-full px-3 py-[6px] text-[13px] font-bold ${i === step ? "bg-[#000080] text-white" : i < step ? "bg-[#000080]/10 text-[#000080]" : "bg-[#F3F4F6] text-[#9CA3AF]"}`}><span>{i < step ? "✓" : i + 1}</span>{s}</button>
            {i < STEPS.length - 1 && <span className="h-px w-5 bg-[#D1D5DB]" />}
          </li>
        ))}
      </ol>

      <div className="grid gap-8 lg:grid-cols-[1fr_360px]" style={vs}>
        <div className="flex flex-col gap-5 rounded-[20px] border border-[#EBEBEB] bg-white p-5 md:p-7">
          {step === 0 && (<>
            <h2 className="text-[18px] font-black">Your details</h2>
            <label className="grid gap-1 text-[13px] font-semibold">Full name *<input className={input} value={pf.name} onChange={(e) => saveProfile({ name: e.target.value })} autoComplete="name" /></label>
            <label className="grid gap-1 text-[13px] font-semibold">Phone number *<input className={input} value={pf.phone} onChange={(e) => saveProfile({ phone: e.target.value })} autoComplete="tel" inputMode="tel" /></label>
            <label className="grid gap-1 text-[13px] font-semibold">Email (for your receipt)<input className={input} value={pf.email} onChange={(e) => saveProfile({ email: e.target.value })} autoComplete="email" inputMode="email" /></label>
            <p className="text-[12px] text-[#9CA3AF]">Saved on this device so you do not have to type it again.</p>
          </>)}
          {step === 1 && (<>
            <h2 className="text-[18px] font-black">How would you like to receive it?</h2>
            <div className="grid gap-3 md:grid-cols-2">
              {(["pickup", "delivery"] as const).map((k) => (
                <button key={k} onClick={() => setMethod(k)} className={`rounded-[14px] border-2 p-4 text-left ${method === k ? "border-[#000080] bg-[#000080]/5" : "border-[#E5E7EB]"}`}>
                  <p className="text-[14px] font-black">{k === "pickup" ? "📍 Pick up at church" : "🚚 Delivery"}</p>
                  <p className="mt-1 text-[12px] text-[#6B7280]">{k === "pickup" ? "Free — collect after service or at the office" : `From ${naira(DELIVERY_ZONES[0].fee)}, free above ₦100,000`}</p>
                </button>
              ))}
            </div>
            {method === "pickup" ? (
              <div className="grid gap-2">{PICKUP_POINTS.map((pp) => <label key={pp} className="flex cursor-pointer items-center gap-3 rounded-lg border border-[#E5E7EB] p-3 text-[13px]"><input type="radio" name="pp" checked={pickup === pp} onChange={() => setPickup(pp)} className="accent-[#000080]" />{pp}</label>)}</div>
            ) : (<>
              <label className="grid gap-1 text-[13px] font-semibold">Delivery area<select className={input} value={pf.zone} onChange={(e) => saveProfile({ zone: e.target.value })}>{DELIVERY_ZONES.map((z) => <option key={z.id} value={z.id}>{z.label} — {naira(z.fee)} ({z.eta})</option>)}</select></label>
              <label className="grid gap-1 text-[13px] font-semibold">Full address *<textarea rows={3} className={input} value={pf.address} onChange={(e) => saveProfile({ address: e.target.value })} autoComplete="street-address" /></label>
            </>)}
            <label className="grid gap-1 text-[13px] font-semibold">Note to seller (optional)<input className={input} value={note} onChange={(e) => setNote(e.target.value)} maxLength={200} /></label>
          </>)}
          {step === 2 && (<>
            <h2 className="text-[18px] font-black">Payment</h2>
            <div className="grid gap-3">
              {PAYMENT_METHODS.map((pm) => (
                <label key={pm.id} className={`flex items-start gap-3 rounded-[14px] border-2 p-4 ${pm.disabled ? "cursor-not-allowed opacity-50" : "cursor-pointer"} ${payment === pm.id ? "border-[#000080] bg-[#000080]/5" : "border-[#E5E7EB]"}`}>
                  <input type="radio" name="pay" disabled={pm.disabled} checked={payment === pm.id} onChange={() => setPayment(pm.id as "transfer" | "pickup")} className="mt-1 accent-[#000080]" />
                  <span><span className="text-[14px] font-black">{pm.label}</span><span className="mt-1 block text-[12px] text-[#6B7280]">{pm.note}</span></span>
                </label>
              ))}
            </div>
            {payment === "transfer" && (
              <div className="grid gap-3 rounded-[14px] bg-[#F9FAFB] p-4 text-[13px]">
                <p className="font-bold">Transfer details</p>
                <p className="text-[#6B7280]">Account name, number and bank will be shown here once the church finance office confirms them. After paying, add your transfer reference below (you can also add it later from your order page).</p>
                <input className={input} value={ref} onChange={(e) => setRef(e.target.value)} placeholder="Transfer reference (optional now)" />
              </div>
            )}
          </>)}
          {step === 3 && (<>
            <h2 className="text-[18px] font-black">Review your order</h2>
            <ul className="grid gap-3">
              {m.cart.map((l) => { const p = findProduct(l.id, m); return p && (<li key={`${l.id}-${l.size}`} className="flex items-center gap-3"><img src={p.image} alt="" className="size-[52px] rounded-lg object-cover" /><span className="min-w-0 flex-1 text-[13px]"><b className="block truncate">{p.name}</b><span className="text-[#6B7280]">{l.qty} × {naira(unitPrice(p))}{l.size && ` · Size ${l.size}`}</span></span><b className="text-[13px]">{naira(unitPrice(p) * l.qty)}</b></li>); })}
            </ul>
            <div className="grid gap-1 rounded-[14px] bg-[#F9FAFB] p-4 text-[13px] text-[#374151]">
              <p><b>{pf.name}</b> · {pf.phone}{pf.email && ` · ${pf.email}`}</p>
              <p>{method === "pickup" ? `Pickup: ${pickup}` : `Deliver to: ${pf.address} (${t.zone.label})`}</p>
              <p>Payment: {PAYMENT_METHODS.find((x) => x.id === payment)?.label}</p>
              {note && <p>Note: {note}</p>}
            </div>
            <p className="text-[12px] text-[#6B7280]">By placing this order you agree to collect and pay for the items as described. Orders are held for 24 hours.</p>
          </>)}

          {err && <p role="alert" className="rounded-lg bg-rose-50 px-4 py-3 text-[13px] font-semibold text-rose-700">{err}</p>}
          <div className="mt-2 flex items-center justify-between gap-3">
            {step > 0 ? <button onClick={() => { setErr(""); setStep(step - 1); }} className="rounded-full px-5 py-[11px] text-[13px] font-bold text-[#374151] hover:bg-[#F3F4F6]">← Back</button> : <Link href={`${BASE}/cart`} className="rounded-full px-5 py-[11px] text-[13px] font-bold text-[#374151] hover:bg-[#F3F4F6]">← Cart</Link>}
            {step < 3 ? <button onClick={next} className="rounded-full bg-[#000080] px-8 py-[12px] text-[14px] font-black text-white hover:bg-[#0000a0]">Continue</button> : <button disabled={busy} onClick={place} className="rounded-full bg-[#000080] px-8 py-[12px] text-[14px] font-black text-white hover:bg-[#0000a0] disabled:opacity-50">{busy ? "Placing…" : `Place order · ${naira(t.total)}`}</button>}
          </div>
        </div>

        <aside className="h-fit rounded-[20px] border border-[#EBEBEB] bg-white p-5 lg:sticky lg:top-[84px]">
          <h2 className="mb-3 text-[16px] font-black">Summary</h2>
          <dl className="grid gap-2 text-[14px]">
            <div className="flex justify-between"><dt className="text-[#6B7280]">Items ({m.cart.reduce((n, l) => n + l.qty, 0)})</dt><dd className="font-semibold">{naira(t.subtotal)}</dd></div>
            {t.discount > 0 && <div className="flex justify-between text-emerald-700"><dt>Discount ({m.promo})</dt><dd className="font-semibold">−{naira(t.discount)}</dd></div>}
            <div className="flex justify-between"><dt className="text-[#6B7280]">{method === "pickup" ? "Pickup" : "Delivery"}</dt><dd className="font-semibold">{t.delivery === 0 ? "Free" : naira(t.delivery)}</dd></div>
            <div className="flex justify-between border-t border-[#F3F4F6] pt-3 text-[18px] font-black"><dt>Total</dt><dd>{naira(t.total)}</dd></div>
          </dl>
        </aside>
      </div>
    </Shell>
  );
}
