"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { API_BASE } from "@/lib/api";
import { naira, priceToNum } from "../_lib/catalog";
import { addListing, removeListing, toast, useMarket } from "../_lib/store";
import { Shell } from "../_components/Shell";
import { BASE, Crumbs, vs } from "../_components/ui";

const CATS = [
  { label: "Books", api: "BOOK" }, { label: "Electronics", api: "ELECTRONICS" }, { label: "Cooking Utensils", api: "COOKING_UTENSILS" },
  { label: "Automobile", api: "AUTOMOBILE" }, { label: "Wears & Clothing", api: "WEARS" },
];
const input = "w-full rounded-lg border border-[#E5E7EB] bg-white px-4 py-3 text-[14px] text-[#374151] outline-none focus:border-[#000080] focus:ring-1 focus:ring-[#000080]";
const SKEY = "ros-market-seller";
interface Seller { id: string; name: string }

export default function SellPage() {
  const m = useMarket();
  const [seller, setSeller] = useState<Seller | null>(null);
  const [q, setQ] = useState("");
  const [vErr, setVErr] = useState("");
  const [busy, setBusy] = useState(false);
  const [f, setF] = useState({ name: "", description: "", price: "", originalPrice: "", category: CATS[0].api, qty: "1", imageUrl: "", tags: "", condition: "new" });
  const [fErr, setFErr] = useState("");
  const [done, setDone] = useState("");

  useEffect(() => { try { const s = localStorage.getItem(SKEY); if (s) setSeller(JSON.parse(s)); } catch {} }, []);

  async function verify(e: React.FormEvent) {
    e.preventDefault();
    if (!q.trim()) return;
    setBusy(true); setVErr("");
    try {
      for (const ep of ["/users/member/search", "/users/e-member/search"]) {
        const res = await fetch(`${API_BASE}${ep}`, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ text: q.trim() }) });
        if (res.ok) {
          const d = await res.json();
          const list = Array.isArray(d) ? d : d.content || d.data || [];
          if (list.length) { const u = list[0]; const s = { id: u.id, name: `${u.firstName} ${u.lastName}` }; setSeller(s); try { localStorage.setItem(SKEY, JSON.stringify(s)); } catch {} setBusy(false); return; }
        }
      }
      setVErr("No church member found with that name, phone or email. Please register as a member first.");
    } catch { setVErr("Could not verify membership right now. Please try again."); }
    setBusy(false);
  }

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    if (!seller) return;
    const price = parseFloat(f.price);
    if (f.name.trim().length < 3) return setFErr("Give your product a clear name.");
    if (!(price > 0)) return setFErr("Enter a valid price.");
    if (f.description.trim().length < 15) return setFErr("Describe the item in at least 15 characters.");
    setFErr(""); setBusy(true);
    const tags = f.tags.split(",").map((t) => t.trim()).filter(Boolean);
    try {
      const body: Record<string, unknown> = { name: f.name.trim(), description: f.description.trim(), owner: seller.id, price, category: f.category, quantityLeft: parseInt(f.qty) || 1 };
      if (f.imageUrl.trim()) body.images = [f.imageUrl.trim()];
      if (tags.length) body.tags = tags;
      await fetch(`${API_BASE}/products`, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(body) });
    } catch { /* kept locally so the seller still sees the listing */ }
    const qty = parseInt(f.qty) || 1;
    const orig = parseFloat(f.originalPrice);
    addListing({
      name: f.name.trim(), description: f.description.trim(), price: naira(price), originalPrice: orig > price ? naira(orig) : undefined, category: CATS.find((c) => c.api === f.category)?.label ?? "Other",
      image: f.imageUrl.trim() || "/marketplace/img1.png", stock: qty <= 0 ? "out" : qty <= 5 ? "limited" : "in_stock", condition: f.condition as "new" | "used" | "refurbished", seller: "Church Members", tags: tags.length ? tags : ["new listing"], onSale: orig > price,
    });
    setDone(f.name.trim());
    setF({ name: "", description: "", price: "", originalPrice: "", category: CATS[0].api, qty: "1", imageUrl: "", tags: "", condition: "new" });
    setBusy(false);
    toast("Listing submitted for approval");
  }

  const mine = m.listings;
  const value = mine.reduce((n, l) => n + priceToNum(l.price), 0);

  return (
    <Shell>
      <Crumbs items={[{ label: "Marketplace", href: BASE }, { label: "Sell" }]} />
      <h1 className="text-[28px] font-black text-[#100E1A]" style={vs}>Sell on ROS Marketplace</h1>
      <p className="mb-8 mt-1 max-w-[620px] text-[14px] text-[#6B7280]" style={vs}>Church members can list items for the Rose of Sharon family. New listings are reviewed by the church office before they go public.</p>

      <div className="grid gap-8 lg:grid-cols-[1fr_380px]" style={vs}>
        <section className="rounded-[20px] border border-[#EBEBEB] bg-white p-5 md:p-7">
          {!seller ? (
            <form onSubmit={verify} className="grid gap-4">
              <h2 className="text-[18px] font-black">Verify your membership</h2>
              <p className="text-[13px] text-[#6B7280]">Enter your name, phone number or email as registered with the church.</p>
              <input className={input} value={q} onChange={(e) => setQ(e.target.value)} placeholder="Name, phone or email" />
              {vErr && <p role="alert" className="rounded-lg bg-rose-50 px-4 py-3 text-[13px] font-semibold text-rose-700">{vErr} <Link href="/e-member" className="underline">Register</Link></p>}
              <button disabled={busy} className="rounded-full bg-[#000080] py-[13px] text-[14px] font-black text-white hover:bg-[#0000a0] disabled:opacity-50">{busy ? "Checking…" : "Verify"}</button>
            </form>
          ) : (
            <form onSubmit={submit} className="grid gap-4">
              <div className="flex items-center justify-between"><h2 className="text-[18px] font-black">New listing</h2><span className="text-[12px] text-[#6B7280]">Selling as <b>{seller.name}</b> · <button type="button" onClick={() => { setSeller(null); try { localStorage.removeItem(SKEY); } catch {} }} className="underline">switch</button></span></div>
              {done && <p className="rounded-lg bg-emerald-50 px-4 py-3 text-[13px] font-semibold text-emerald-700">“{done}” was submitted and appears in your listings below.</p>}
              <label className="grid gap-1 text-[13px] font-semibold">Product name *<input className={input} value={f.name} onChange={(e) => setF({ ...f, name: e.target.value })} maxLength={80} /></label>
              <label className="grid gap-1 text-[13px] font-semibold">Description *<textarea rows={4} className={input} value={f.description} onChange={(e) => setF({ ...f, description: e.target.value })} /></label>
              <div className="grid gap-4 md:grid-cols-2">
                <label className="grid gap-1 text-[13px] font-semibold">Price (₦) *<input className={input} inputMode="decimal" value={f.price} onChange={(e) => setF({ ...f, price: e.target.value })} /></label>
                <label className="grid gap-1 text-[13px] font-semibold">Original price (₦) <span className="font-normal text-[#9CA3AF]">for a sale badge</span><input className={input} inputMode="decimal" value={f.originalPrice} onChange={(e) => setF({ ...f, originalPrice: e.target.value })} /></label>
                <label className="grid gap-1 text-[13px] font-semibold">Category<select className={input} value={f.category} onChange={(e) => setF({ ...f, category: e.target.value })}>{CATS.map((c) => <option key={c.api} value={c.api}>{c.label}</option>)}</select></label>
                <label className="grid gap-1 text-[13px] font-semibold">Quantity available<input className={input} inputMode="numeric" value={f.qty} onChange={(e) => setF({ ...f, qty: e.target.value })} /></label>
                <label className="grid gap-1 text-[13px] font-semibold">Condition<select className={input} value={f.condition} onChange={(e) => setF({ ...f, condition: e.target.value })}><option value="new">New</option><option value="used">Used</option><option value="refurbished">Refurbished</option></select></label>
                <label className="grid gap-1 text-[13px] font-semibold">Tags <span className="font-normal text-[#9CA3AF]">comma separated</span><input className={input} value={f.tags} onChange={(e) => setF({ ...f, tags: e.target.value })} /></label>
              </div>
              <label className="grid gap-1 text-[13px] font-semibold">Image link <span className="font-normal text-[#9CA3AF]">optional</span><input className={input} value={f.imageUrl} onChange={(e) => setF({ ...f, imageUrl: e.target.value })} placeholder="https://…" /></label>
              {fErr && <p role="alert" className="rounded-lg bg-rose-50 px-4 py-3 text-[13px] font-semibold text-rose-700">{fErr}</p>}
              <button disabled={busy} className="rounded-full bg-[#000080] py-[13px] text-[14px] font-black text-white hover:bg-[#0000a0] disabled:opacity-50">{busy ? "Submitting…" : "Submit listing"}</button>
            </form>
          )}
        </section>

        <aside className="flex flex-col gap-4">
          <div className="grid grid-cols-2 gap-3">
            <div className="rounded-[16px] border border-[#EBEBEB] bg-white p-4"><p className="text-[12px] text-[#6B7280]">My listings</p><p className="text-[24px] font-black">{mine.length}</p></div>
            <div className="rounded-[16px] border border-[#EBEBEB] bg-white p-4"><p className="text-[12px] text-[#6B7280]">Listed value</p><p className="text-[24px] font-black">{naira(value)}</p></div>
          </div>
          <div className="rounded-[18px] border border-[#EBEBEB] bg-white p-5">
            <h2 className="mb-3 text-[15px] font-black">My listings</h2>
            {mine.length === 0 ? <p className="text-[13px] text-[#6B7280]">Nothing listed from this device yet.</p> : <ul className="grid gap-3">{mine.map((l) => (<li key={l.id} className="flex items-center gap-3"><img src={l.image} alt="" className="size-[48px] rounded-lg bg-[#F3F4F6] object-cover" /><span className="min-w-0 flex-1 text-[13px]"><Link href={`${BASE}/product/${l.id}`} className="block truncate font-bold hover:text-[#000080]">{l.name}</Link><span className="text-[#6B7280]">{l.price} · pending approval</span></span><button onClick={() => { if (confirm(`Remove “${l.name}”?`)) removeListing(l.id); }} className="text-[12px] font-semibold text-rose-600">Remove</button></li>))}</ul>}
          </div>
          <div className="rounded-[18px] bg-[#000080]/5 p-5 text-[13px] leading-[1.7] text-[#374151]"><b>Selling tips</b><ul className="mt-2 list-disc pl-5"><li>Use a clear photo and honest description.</li><li>Price fairly — members shop within the family.</li><li>Keep your quantity up to date.</li></ul></div>
        </aside>
      </div>
    </Shell>
  );
}
