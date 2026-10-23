"use client";

import Link from "next/link";
import { useParams, useSearchParams } from "next/navigation";
import { Suspense, useEffect, useState } from "react";
import { PAYMENT_METHODS, naira } from "../../_lib/catalog";
import { cancelOrder, markPaid, orderStatus, useMarket } from "../../_lib/store";
import { Shell } from "../../_components/Shell";
import { BASE, Crumbs, STATUS_META, vs } from "../../_components/ui";

const FLOW = [
  { key: "placed", label: "Order placed", note: "We have received your order." },
  { key: "confirmed", label: "Confirmed", note: "The seller has confirmed availability." },
  { key: "ready", label: "Ready", note: "Ready for collection or on its way." },
  { key: "completed", label: "Completed", note: "Collected / delivered. Thank you!" },
] as const;

function Inner() {
  const { id } = useParams<{ id: string }>();
  const fresh = useSearchParams().get("new") === "1";
  const m = useMarket();
  const [now, setNow] = useState(() => Date.now());
  const [ref, setRef] = useState("");
  useEffect(() => { const t = setInterval(() => setNow(Date.now()), 30000); return () => clearInterval(t); }, []);
  const o = m.orders.find((x) => x.id === id);

  if (!m.hydrated) return <div className="h-[300px] animate-pulse rounded-[20px] bg-[#EEE]" />;
  if (!o) return <div className="py-20 text-center" style={vs}><h1 className="text-[22px] font-black">Order not found</h1><p className="mt-2 text-[#6B7280]">Orders are stored on the device they were placed on.</p><Link href={`${BASE}/orders`} className="mt-6 inline-block rounded-full bg-[#000080] px-6 py-[10px] text-[13px] font-bold text-white">My orders</Link></div>;

  const s = orderStatus(o, now);
  const idx = FLOW.findIndex((f) => f.key === s);
  const pm = PAYMENT_METHODS.find((x) => x.id === o.payment);

  return (
    <div style={vs}>
      <Crumbs items={[{ label: "Marketplace", href: BASE }, { label: "My orders", href: `${BASE}/orders` }, { label: o.id }]} />
      {fresh && (
        <div className="mb-6 rounded-[20px] bg-gradient-to-br from-[#000080] to-[#00003D] p-6 text-white">
          <p className="text-[28px]">🎉</p>
          <h1 className="mt-1 text-[24px] font-black">Thank you, {o.profile.name.split(" ")[0]}!</h1>
          <p className="mt-1 text-[14px] opacity-90">Your order <b>{o.id}</b> has been placed. {o.payment === "transfer" ? "Complete your transfer and add the reference below so we can confirm it." : "Pay when you collect."}</p>
        </div>
      )}
      <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
        <div><h2 className="text-[24px] font-black">Order {o.id}</h2><p className="text-[12px] text-[#6B7280]">Placed {new Date(o.createdAt).toLocaleString("en-GB", { dateStyle: "long", timeStyle: "short" })}</p></div>
        <span className={`rounded-full px-4 py-[6px] text-[13px] font-bold ${STATUS_META[s].cls}`}>{STATUS_META[s].label}</span>
      </div>

      <div className="grid gap-6 lg:grid-cols-[1fr_340px]">
        <div className="flex flex-col gap-6">
          {s !== "cancelled" && (
            <ol className="grid gap-0 rounded-[18px] border border-[#EBEBEB] bg-white p-5">
              {FLOW.map((f, i) => (
                <li key={f.key} className="flex gap-4">
                  <div className="flex flex-col items-center"><span className={`flex size-[26px] items-center justify-center rounded-full text-[12px] font-black ${i <= idx ? "bg-[#000080] text-white" : "bg-[#E5E7EB] text-[#9CA3AF]"}`}>{i <= idx ? "✓" : i + 1}</span>{i < FLOW.length - 1 && <span className={`my-1 w-[2px] flex-1 ${i < idx ? "bg-[#000080]" : "bg-[#E5E7EB]"}`} />}</div>
                  <div className="pb-5"><p className={`text-[14px] font-bold ${i <= idx ? "text-[#100E1A]" : "text-[#9CA3AF]"}`}>{f.label}</p><p className="text-[12px] text-[#6B7280]">{f.note}</p></div>
                </li>
              ))}
            </ol>
          )}
          <div className="rounded-[18px] border border-[#EBEBEB] bg-white p-5">
            <h3 className="mb-3 text-[15px] font-black">Items</h3>
            <ul className="grid gap-3">{o.lines.map((l) => (<li key={l.id + (l.size || "")} className="flex items-center gap-3"><Link href={`${BASE}/product/${l.id}`}><img src={l.image} alt="" className="size-[56px] rounded-lg object-cover" /></Link><span className="min-w-0 flex-1 text-[13px]"><b className="block truncate">{l.name}</b><span className="text-[#6B7280]">{l.qty} × {naira(l.price)}{l.size && ` · Size ${l.size}`}</span></span><b className="text-[14px]">{naira(l.price * l.qty)}</b></li>))}</ul>
          </div>
        </div>

        <aside className="flex flex-col gap-4">
          <div className="rounded-[18px] border border-[#EBEBEB] bg-white p-5 text-[13px]">
            <h3 className="mb-3 text-[15px] font-black">Summary</h3>
            <dl className="grid gap-2"><div className="flex justify-between"><dt className="text-[#6B7280]">Subtotal</dt><dd>{naira(o.subtotal)}</dd></div>{o.discount > 0 && <div className="flex justify-between text-emerald-700"><dt>Discount {o.promo && `(${o.promo})`}</dt><dd>−{naira(o.discount)}</dd></div>}<div className="flex justify-between"><dt className="text-[#6B7280]">{o.method === "pickup" ? "Pickup" : "Delivery"}</dt><dd>{o.delivery === 0 ? "Free" : naira(o.delivery)}</dd></div><div className="flex justify-between border-t border-[#F3F4F6] pt-2 text-[16px] font-black"><dt>Total</dt><dd>{naira(o.total)}</dd></div></dl>
          </div>
          <div className="rounded-[18px] border border-[#EBEBEB] bg-white p-5 text-[13px] leading-[1.7] text-[#374151]">
            <h3 className="mb-2 text-[15px] font-black">{o.method === "pickup" ? "Pickup" : "Delivery"}</h3>
            <p>{o.method === "pickup" ? o.pickupPoint : o.profile.address}</p><p>{o.profile.name} · {o.profile.phone}</p>{o.note && <p className="text-[#6B7280]">Note: {o.note}</p>}
          </div>
          <div className="rounded-[18px] border border-[#EBEBEB] bg-white p-5 text-[13px]">
            <h3 className="mb-2 text-[15px] font-black">Payment</h3>
            <p className="text-[#374151]">{pm?.label} · {o.paid ? <b className="text-emerald-700">Reference received</b> : <b className="text-amber-700">Awaiting payment</b>}</p>
            {o.paymentRef && <p className="mt-1 text-[#6B7280]">Reference: {o.paymentRef}</p>}
            {o.payment === "transfer" && !o.paid && s !== "cancelled" && (
              <form onSubmit={(e) => { e.preventDefault(); if (ref.trim()) markPaid(o.id, ref.trim()); }} className="mt-3 flex gap-2"><input value={ref} onChange={(e) => setRef(e.target.value)} placeholder="Transfer reference" className="min-w-0 flex-1 rounded-lg border border-[#E5E7EB] px-3 py-2 text-[13px] outline-none focus:border-[#000080]" /><button className="rounded-lg bg-[#000080] px-4 text-[12px] font-bold text-white">Save</button></form>
            )}
          </div>
          {(s === "placed" || s === "confirmed") && <button onClick={() => { if (confirm("Cancel this order?")) cancelOrder(o.id); }} className="rounded-full border border-rose-300 py-[11px] text-[13px] font-bold text-rose-600 hover:bg-rose-50">Cancel order</button>}
          <button onClick={() => window.print()} className="rounded-full border border-[#D1D5DB] py-[11px] text-[13px] font-bold text-[#374151] hover:bg-[#F3F4F6]">Print receipt</button>
        </aside>
      </div>
    </div>
  );
}

export default function OrderPage() {
  return <Shell><Suspense fallback={<div className="h-[300px] animate-pulse rounded-[20px] bg-[#EEE]" />}><Inner /></Suspense></Shell>;
}
