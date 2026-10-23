"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { PAYMENT_METHODS, naira } from "../_lib/catalog";
import { addToCart, orderStatus, useMarket, type OrderStatus } from "../_lib/store";
import { Shell } from "../_components/Shell";
import { BASE, Crumbs, Empty, STATUS_META, vs } from "../_components/ui";

export default function OrdersPage() {
  const m = useMarket();
  const [now, setNow] = useState(() => Date.now());
  const [filter, setFilter] = useState<"all" | OrderStatus>("all");
  useEffect(() => { const t = setInterval(() => setNow(Date.now()), 30000); return () => clearInterval(t); }, []);
  const orders = m.orders.filter((o) => filter === "all" || orderStatus(o, now) === filter);

  return (
    <Shell>
      <Crumbs items={[{ label: "Marketplace", href: BASE }, { label: "My orders" }]} />
      <h1 className="mb-2 text-[28px] font-black text-[#100E1A]" style={vs}>My orders</h1>
      <p className="mb-6 text-[13px] text-[#6B7280]" style={vs}>Orders are saved on this device.</p>
      {!m.hydrated ? <div className="h-[200px] animate-pulse rounded-[20px] bg-[#EEE]" /> : m.orders.length === 0 ? (
        <Empty title="No orders yet" text="When you place an order it will appear here so you can track it." cta="Start shopping" href={BASE} />
      ) : (
        <div style={vs}>
          <div className="mb-5 flex flex-wrap gap-2">
            {(["all", "placed", "confirmed", "ready", "completed", "cancelled"] as const).map((f) => <button key={f} onClick={() => setFilter(f)} className={`rounded-full px-4 py-[6px] text-[12px] font-bold capitalize ${filter === f ? "bg-[#000080] text-white" : "bg-white text-[#374151] border border-[#E5E7EB]"}`}>{f}</button>)}
          </div>
          <div className="grid gap-4">
            {orders.map((o) => {
              const s = orderStatus(o, now);
              return (
                <article key={o.id} className="rounded-[18px] border border-[#EBEBEB] bg-white p-5">
                  <div className="flex flex-wrap items-center justify-between gap-3">
                    <div><Link href={`${BASE}/orders/${o.id}`} className="text-[15px] font-black text-[#000080] hover:underline">{o.id}</Link><p className="text-[12px] text-[#6B7280]">{new Date(o.createdAt).toLocaleString("en-GB", { dateStyle: "medium", timeStyle: "short" })} · {o.method === "pickup" ? "Pickup" : "Delivery"} · {PAYMENT_METHODS.find((x) => x.id === o.payment)?.label}</p></div>
                    <span className={`rounded-full px-3 py-[4px] text-[12px] font-bold ${STATUS_META[s].cls}`}>{STATUS_META[s].label}</span>
                  </div>
                  <div className="mt-4 flex items-center gap-2">{o.lines.slice(0, 5).map((l) => <img key={l.id + (l.size || "")} src={l.image} alt={l.name} title={l.name} className="size-[48px] rounded-lg object-cover" />)}{o.lines.length > 5 && <span className="text-[12px] text-[#6B7280]">+{o.lines.length - 5}</span>}<span className="ml-auto text-[16px] font-black">{naira(o.total)}</span></div>
                  <div className="mt-4 flex gap-3 text-[12px] font-bold"><Link href={`${BASE}/orders/${o.id}`} className="rounded-full border border-[#000080] px-4 py-[7px] text-[#000080] hover:bg-[#000080]/5">Track order</Link><button onClick={() => o.lines.forEach((l) => addToCart(l.id, l.qty, l.size))} className="rounded-full px-4 py-[7px] text-[#374151] hover:bg-[#F3F4F6]">Reorder</button></div>
                </article>
              );
            })}
            {orders.length === 0 && <p className="py-10 text-center text-[14px] text-[#6B7280]">No orders with this status.</p>}
          </div>
        </div>
      )}
    </Shell>
  );
}
