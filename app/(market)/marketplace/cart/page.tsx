"use client";

import Link from "next/link";
import { useState } from "react";
import { DELIVERY_ZONES, PROMOS, naira } from "../_lib/catalog";
import { applyPromo, clearCart, findProduct, removeFromCart, saveProfile, setQty, toggleWishlist, totals, unitPrice, useMarket } from "../_lib/store";
import { Shell } from "../_components/Shell";
import { BASE, Crumbs, Empty, vs } from "../_components/ui";

export default function CartPage() {
  const m = useMarket();
  const [code, setCode] = useState("");
  const [err, setErr] = useState("");
  const [method, setMethod] = useState<"pickup" | "delivery">("pickup");
  const t = totals(m, method);
  const lines = m.cart.map((l) => ({ l, p: findProduct(l.id, m) })).filter((x) => x.p);

  return (
    <Shell>
      <Crumbs items={[{ label: "Marketplace", href: BASE }, { label: "Cart" }]} />
      <h1 className="mb-6 text-[28px] font-black text-[#100E1A]" style={vs}>Your cart</h1>
      {!m.hydrated ? <div className="h-[260px] animate-pulse rounded-[20px] bg-[#EEE]" /> : lines.length === 0 ? (
        <Empty title="Your cart is empty" text="Browse the marketplace and add something you like." cta="Start shopping" href={BASE} />
      ) : (
        <div className="grid gap-8 lg:grid-cols-[1fr_380px]" style={vs}>
          <div className="flex flex-col gap-4">
            {lines.map(({ l, p }) => p && (
              <article key={`${l.id}-${l.size}`} className="flex gap-4 rounded-[18px] border border-[#EBEBEB] bg-white p-4">
                <Link href={`${BASE}/product/${p.id}`} className="size-[96px] flex-shrink-0 overflow-hidden rounded-[12px] bg-[#F3F4F6]"><img src={p.image} alt={p.name} className="h-full w-full object-cover" /></Link>
                <div className="flex min-w-0 flex-1 flex-col gap-1">
                  <div className="flex items-start justify-between gap-3">
                    <Link href={`${BASE}/product/${p.id}`} className="text-[15px] font-bold text-[#100E1A] hover:text-[#000080]">{p.name}</Link>
                    <span className="text-[15px] font-black">{naira(unitPrice(p) * l.qty)}</span>
                  </div>
                  <p className="text-[12px] text-[#6B7280]">{p.seller}{l.size && ` · Size ${l.size}`} · {naira(unitPrice(p))} each</p>
                  <div className="mt-auto flex flex-wrap items-center gap-4 pt-2">
                    <div className="flex items-center overflow-hidden rounded-full border border-[#D1D5DB]">
                      <button onClick={() => setQty(l.id, l.qty - 1, l.size)} className="size-[34px] font-bold hover:bg-[#F3F4F6]" aria-label="Decrease">−</button>
                      <span className="w-[30px] text-center text-[13px] font-bold">{l.qty}</span>
                      <button onClick={() => setQty(l.id, l.qty + 1, l.size)} className="size-[34px] font-bold hover:bg-[#F3F4F6]" aria-label="Increase">+</button>
                    </div>
                    <button onClick={() => { toggleWishlist(p.id); removeFromCart(l.id, l.size); }} className="text-[12px] font-semibold text-[#000080] hover:underline">Save for later</button>
                    <button onClick={() => removeFromCart(l.id, l.size)} className="text-[12px] font-semibold text-rose-600 hover:underline">Remove</button>
                  </div>
                </div>
              </article>
            ))}
            <button onClick={() => { if (confirm("Remove everything from your cart?")) clearCart(); }} className="self-start text-[12px] font-semibold text-[#6B7280] hover:text-rose-600">Clear cart</button>
          </div>

          <aside className="flex h-fit flex-col gap-4 rounded-[20px] border border-[#EBEBEB] bg-white p-5 lg:sticky lg:top-[84px]">
            <h2 className="text-[16px] font-black">Order summary</h2>
            <div className="grid grid-cols-2 gap-2 rounded-full bg-[#F3F4F6] p-1">
              {(["pickup", "delivery"] as const).map((k) => <button key={k} onClick={() => setMethod(k)} className={`rounded-full py-2 text-[13px] font-bold ${method === k ? "bg-white shadow text-[#000080]" : "text-[#6B7280]"}`}>{k === "pickup" ? "Pickup" : "Delivery"}</button>)}
            </div>
            {method === "delivery" && (
              <select value={m.profile.zone} onChange={(e) => saveProfile({ zone: e.target.value })} className="rounded-lg border border-[#E5E7EB] bg-white px-3 py-[10px] text-[13px] outline-none focus:border-[#000080]">
                {DELIVERY_ZONES.map((z) => <option key={z.id} value={z.id}>{z.label} — {naira(z.fee)} ({z.eta})</option>)}
              </select>
            )}
            <form onSubmit={(e) => { e.preventDefault(); setErr(applyPromo(code) || ""); setCode(""); }} className="flex gap-2">
              <input value={code} onChange={(e) => setCode(e.target.value)} placeholder="Promo code" className="min-w-0 flex-1 rounded-lg border border-[#E5E7EB] px-3 py-[10px] text-[13px] uppercase outline-none focus:border-[#000080]" />
              <button className="rounded-lg bg-[#100E1A] px-4 text-[13px] font-bold text-white">Apply</button>
            </form>
            {err && <p className="text-[12px] text-rose-600">{err}</p>}
            {m.promo && PROMOS[m.promo] && <p className="flex items-center justify-between rounded-lg bg-emerald-50 px-3 py-2 text-[12px] font-semibold text-emerald-700">{m.promo}: {PROMOS[m.promo].label}<button onClick={() => applyPromo("")} className="underline">remove</button></p>}
            {t.promoNote && <p className="text-[12px] text-amber-700">{t.promoNote}</p>}
            <dl className="grid gap-2 border-t border-[#F3F4F6] pt-4 text-[14px]">
              <div className="flex justify-between"><dt className="text-[#6B7280]">Subtotal</dt><dd className="font-semibold">{naira(t.subtotal)}</dd></div>
              {t.discount > 0 && <div className="flex justify-between text-emerald-700"><dt>Discount</dt><dd className="font-semibold">−{naira(t.discount)}</dd></div>}
              <div className="flex justify-between"><dt className="text-[#6B7280]">{method === "pickup" ? "Pickup" : "Delivery"}</dt><dd className="font-semibold">{t.delivery === 0 ? "Free" : naira(t.delivery)}</dd></div>
              <div className="flex justify-between border-t border-[#F3F4F6] pt-3 text-[18px] font-black"><dt>Total</dt><dd>{naira(t.total)}</dd></div>
            </dl>
            <Link href={`${BASE}/checkout`} className="rounded-full bg-[#000080] py-[14px] text-center text-[14px] font-black text-white hover:bg-[#0000a0]">Checkout</Link>
            <Link href={BASE} className="text-center text-[12px] font-semibold text-[#6B7280] hover:text-[#000080]">Continue shopping</Link>
          </aside>
        </div>
      )}
    </Shell>
  );
}
