"use client";

import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import { DELIVERY_ZONES, PRODUCTS, naira, priceToNum, ratingHistogram, reviewsFor, sellerBySlug, sellerSlug, sizesFor, specsFor, stockCount } from "../../_lib/catalog";
import { addReview, addToCart, findProduct, pushRecent, toggleCompare, toggleWishlist, useMarket } from "../../_lib/store";
import { Shell } from "../../_components/Shell";
import { BASE, Crumbs, Heart, ProductCard, Stars, StockBadge, vs } from "../../_components/ui";

export default function ProductPage() {
  const { id } = useParams<{ id: string }>();
  const router = useRouter();
  const m = useMarket();
  const pid = Number(id);
  const p = findProduct(pid, m);
  const [qty, setQty] = useState(1);
  const [size, setSize] = useState("");
  const [tab, setTab] = useState<"about" | "specs" | "reviews" | "delivery">("about");
  const [img, setImg] = useState(0);
  const [rv, setRv] = useState({ author: "", rating: 5, title: "", body: "" });
  const [rvErr, setRvErr] = useState("");
  const [zoom, setZoom] = useState(false);

  useEffect(() => { if (m.hydrated && p) pushRecent(p.id); }, [m.hydrated, p?.id]); // eslint-disable-line react-hooks/exhaustive-deps

  const reviews = useMemo(() => (p ? [...(m.reviews[p.id] || []), ...reviewsFor(p)] : []), [p, m.reviews]);
  const hist = useMemo(() => (p ? ratingHistogram(p) : [0, 0, 0, 0, 0]), [p]);
  const related = useMemo(() => (p ? [...PRODUCTS, ...m.listings].filter((x) => x.id !== p.id && (x.category === p.category || x.seller === p.seller)).slice(0, 4) : []), [p, m.listings]);
  const recent = m.recent.filter((r) => r !== pid).map((r) => findProduct(r, m)).filter(Boolean).slice(0, 6);

  if (!m.hydrated) return <Shell><div className="h-[400px] animate-pulse rounded-[20px] bg-[#EEE]" /></Shell>;
  if (!p) {
    return (
      <Shell>
        <div className="py-20 text-center" style={vs}>
          <h1 className="text-[22px] font-black">Product not found</h1>
          <p className="mt-2 text-[#6B7280]">It may have been removed or sold out.</p>
          <Link href={BASE} className="mt-6 inline-block rounded-full bg-[#000080] px-6 py-[10px] text-[13px] font-bold text-white">Back to the marketplace</Link>
        </div>
      </Shell>
    );
  }

  const sizes = sizesFor(p);
  const left = stockCount(p);
  const price = priceToNum(p.price);
  const seller = sellerBySlug(sellerSlug(p.seller));
  const saved = m.wishlist.includes(p.id);
  const gallery = [p.image];
  const maxHist = Math.max(...hist, 1);
  const avg = reviews.length ? reviews.reduce((a, r) => a + r.rating, 0) / reviews.length : p.rating;

  function needSize() { if (sizes.length && !size) { setTab("about"); alert("Please choose a size first."); return true; } return false; }
  function submitReview(e: React.FormEvent) {
    e.preventDefault();
    if (!p) return;
    if (!rv.author.trim() || rv.body.trim().length < 10) { setRvErr("Please add your name and a review of at least 10 characters."); return; }
    setRvErr("");
    addReview(p.id, { author: rv.author.trim(), rating: rv.rating, title: rv.title.trim() || "My review", body: rv.body.trim() });
    setRv({ author: "", rating: 5, title: "", body: "" });
  }

  return (
    <Shell>
      <Crumbs items={[{ label: "Marketplace", href: BASE }, { label: p.category, href: `${BASE}?category=${encodeURIComponent(p.category)}` }, { label: p.name }]} />

      <div className="grid gap-8 lg:grid-cols-[1.05fr_1fr]">
        {/* Gallery */}
        <div>
          <button onClick={() => setZoom(true)} className="relative block aspect-[4/4.4] w-full overflow-hidden rounded-[24px] border border-[#EBEBEB] bg-white" aria-label="Zoom image">
            <img src={gallery[img]} alt={p.name} className="h-full w-full object-contain" />
            <span className="absolute bottom-3 right-3 rounded-full bg-black/60 px-3 py-1 text-[11px] font-semibold text-white">Tap to zoom</span>
          </button>
          <div className="mt-3 flex gap-2">
            {gallery.map((g, i) => (
              <button key={i} onClick={() => setImg(i)} className={`size-[64px] overflow-hidden rounded-[10px] border-2 ${i === img ? "border-[#000080]" : "border-transparent"}`}><img src={g} alt="" className="h-full w-full object-cover" /></button>
            ))}
          </div>
        </div>

        {/* Buy box */}
        <div className="flex flex-col gap-4" style={vs}>
          <div className="flex flex-wrap items-center gap-2">
            <StockBadge p={p} />
            {p.isNew && <span className="rounded-full bg-[#000080] px-[10px] py-[3px] text-[11px] font-bold text-white">NEW</span>}
            <span className="rounded-full bg-[#F3F4F6] px-[10px] py-[3px] text-[11px] font-semibold text-[#374151]">{p.category}</span>
          </div>
          <h1 className="text-[26px] font-black leading-tight text-[#100E1A] md:text-[32px]">{p.name}</h1>
          <button onClick={() => setTab("reviews")} className="flex items-center gap-2 self-start">
            <Stars rating={avg} />
            <span className="text-[13px] font-bold text-[#F59E0B]">{avg.toFixed(1)}</span>
            <span className="text-[12px] text-[#6B7280] underline">{Math.max(p.ratingCount, reviews.length)} reviews</span>
          </button>
          <div className="flex items-end gap-3">
            <span className="text-[32px] font-black text-[#100E1A]">{naira(price)}</span>
            {p.originalPrice && <><span className="mb-1 text-[16px] text-[#9CA3AF] line-through">{naira(priceToNum(p.originalPrice))}</span><span className="mb-1 rounded-full bg-[#DC2626] px-2 py-[2px] text-[11px] font-bold text-white">Save {naira(priceToNum(p.originalPrice) - price)}</span></>}
          </div>
          <p className="text-[14px] leading-[1.7] text-[#4B5563]">{p.description}</p>

          {sizes.length > 0 && (
            <div>
              <div className="mb-2 flex items-center justify-between"><span className="text-[13px] font-bold">Size {size && <span className="font-normal text-[#6B7280]">· {size}</span>}</span></div>
              <div className="flex flex-wrap gap-2">
                {sizes.map((s) => (
                  <button key={s} onClick={() => setSize(s)} className={`min-w-[46px] rounded-[10px] border px-3 py-2 text-[13px] font-bold ${size === s ? "border-[#000080] bg-[#000080] text-white" : "border-[#D1D5DB] bg-white text-[#374151] hover:border-[#000080]"}`}>{s}</button>
                ))}
              </div>
            </div>
          )}

          <div className="flex flex-wrap items-center gap-3">
            <div className="flex items-center overflow-hidden rounded-full border border-[#D1D5DB] bg-white">
              <button onClick={() => setQty(Math.max(1, qty - 1))} className="size-[40px] text-[18px] font-bold hover:bg-[#F3F4F6]" aria-label="Decrease">−</button>
              <span className="w-[36px] text-center text-[14px] font-bold">{qty}</span>
              <button onClick={() => setQty(Math.min(Math.min(20, left), qty + 1))} className="size-[40px] text-[18px] font-bold hover:bg-[#F3F4F6]" aria-label="Increase">+</button>
            </div>
            <span className="text-[12px] text-[#6B7280]">{p.stock === "out" ? "Currently unavailable" : p.stock === "limited" ? `Only ${left} left` : `${left}+ available`}</span>
          </div>

          <div className="flex flex-wrap gap-3">
            <button disabled={p.stock === "out"} onClick={() => { if (needSize()) return; addToCart(p.id, qty, size || undefined); }} className="flex-1 rounded-full bg-[#000080] px-6 py-[14px] text-[14px] font-black text-white transition-colors hover:bg-[#0000a0] disabled:opacity-40">Add to cart</button>
            <button disabled={p.stock === "out"} onClick={() => { if (needSize()) return; addToCart(p.id, qty, size || undefined); router.push(`${BASE}/checkout`); }} className="flex-1 rounded-full border-2 border-[#000080] px-6 py-[12px] text-[14px] font-black text-[#000080] hover:bg-[#000080]/5 disabled:opacity-40">Buy now</button>
            <button onClick={() => toggleWishlist(p.id)} aria-label="Wishlist" className="flex size-[50px] items-center justify-center rounded-full border border-[#D1D5DB] bg-white hover:bg-[#F3F4F6]"><Heart on={saved} className="size-[22px]" /></button>
          </div>
          <label className="flex cursor-pointer items-center gap-2 text-[12px] text-[#6B7280]"><input type="checkbox" checked={m.compare.includes(p.id)} onChange={() => toggleCompare(p.id)} className="accent-[#000080]" /> Add to compare</label>

          <div className="grid gap-2 rounded-[16px] border border-[#EBEBEB] bg-white p-4 text-[13px] text-[#374151]">
            <div className="flex items-center gap-3"><span>📍</span><span><b>Free pickup</b> at Rose of Sharon after service or at the church office</span></div>
            <div className="flex items-center gap-3"><span>🚚</span><span>Delivery from {naira(DELIVERY_ZONES[0].fee)} · free on orders above ₦100,000</span></div>
            <div className="flex items-center gap-3"><span>🛡️</span><span>Sold within the church family · members verified before listing</span></div>
          </div>

          {seller && (
            <Link href={`${BASE}/store/${seller.slug}`} className="flex items-center gap-3 rounded-[16px] border border-[#EBEBEB] bg-white p-4 hover:border-[#000080]">
              <span className="flex size-[44px] items-center justify-center rounded-full bg-[#000080]/10 text-[22px]">{seller.emoji}</span>
              <span className="flex flex-col"><span className="text-[14px] font-bold">{seller.name} {seller.verified && <span className="text-[#000080]">✔</span>}</span><span className="text-[12px] text-[#6B7280]">Replies {seller.responseTime.toLowerCase()} · View store</span></span>
            </Link>
          )}
        </div>
      </div>

      {/* Tabs */}
      <section className="mt-12" style={vs}>
        <div className="flex gap-1 overflow-x-auto border-b border-[#E5E7EB]">
          {([["about", "About"], ["specs", "Specifications"], ["reviews", `Reviews (${reviews.length})`], ["delivery", "Delivery & returns"]] as const).map(([k, l]) => (
            <button key={k} onClick={() => setTab(k)} className={`whitespace-nowrap border-b-2 px-4 py-3 text-[14px] font-bold ${tab === k ? "border-[#000080] text-[#000080]" : "border-transparent text-[#6B7280] hover:text-[#100E1A]"}`}>{l}</button>
          ))}
        </div>
        <div className="py-6">
          {tab === "about" && (
            <div className="grid gap-4 text-[14px] leading-[1.8] text-[#374151]">
              <p>{p.description}</p>
              <div className="flex flex-wrap gap-2">{p.tags.map((t) => <Link key={t} href={`${BASE}?q=${encodeURIComponent(t)}`} className="rounded-full bg-[#F3F4F6] px-3 py-1 text-[12px] text-[#6B7280] hover:bg-[#000080] hover:text-white">#{t}</Link>)}</div>
            </div>
          )}
          {tab === "specs" && (
            <dl className="grid overflow-hidden rounded-[16px] border border-[#EBEBEB] bg-white md:grid-cols-2">
              {specsFor(p).map((s) => (<div key={s.label} className="flex justify-between gap-4 border-b border-[#F3F4F6] px-5 py-3 text-[14px]"><dt className="text-[#6B7280]">{s.label}</dt><dd className="font-semibold text-[#100E1A]">{s.value}</dd></div>))}
            </dl>
          )}
          {tab === "reviews" && (
            <div className="grid gap-8 lg:grid-cols-[320px_1fr]">
              <div className="flex flex-col gap-4">
                <div className="flex items-center gap-4"><span className="text-[44px] font-black">{avg.toFixed(1)}</span><div><Stars rating={avg} size={18} /><p className="mt-1 text-[12px] text-[#6B7280]">{Math.max(p.ratingCount, reviews.length)} ratings</p></div></div>
                <div className="flex flex-col gap-2">
                  {[5, 4, 3, 2, 1].map((s, i) => (<div key={s} className="flex items-center gap-2 text-[12px]"><span className="w-3 text-right">{s}</span><div className="h-[8px] flex-1 overflow-hidden rounded-full bg-[#F3F4F6]"><div className="h-full rounded-full bg-[#F59E0B]" style={{ width: `${(hist[i] / maxHist) * 100}%` }} /></div><span className="w-8 text-[#9CA3AF]">{hist[i]}</span></div>))}
                </div>
                <form onSubmit={submitReview} className="flex flex-col gap-3 rounded-[16px] border border-[#EBEBEB] bg-white p-4">
                  <h3 className="text-[14px] font-black">Write a review</h3>
                  <div className="flex gap-1" role="radiogroup" aria-label="Rating">{[1, 2, 3, 4, 5].map((s) => <button type="button" key={s} onClick={() => setRv({ ...rv, rating: s })} aria-label={`${s} stars`} className={`text-[26px] leading-none ${s <= rv.rating ? "text-[#F59E0B]" : "text-[#D1D5DB]"}`}>★</button>)}</div>
                  <input value={rv.author} onChange={(e) => setRv({ ...rv, author: e.target.value })} placeholder="Your name" className="rounded-lg border border-[#E5E7EB] px-3 py-2 text-[13px] outline-none focus:border-[#000080]" />
                  <input value={rv.title} onChange={(e) => setRv({ ...rv, title: e.target.value })} placeholder="Headline (optional)" className="rounded-lg border border-[#E5E7EB] px-3 py-2 text-[13px] outline-none focus:border-[#000080]" />
                  <textarea value={rv.body} onChange={(e) => setRv({ ...rv, body: e.target.value })} rows={3} placeholder="What did you think?" className="rounded-lg border border-[#E5E7EB] px-3 py-2 text-[13px] outline-none focus:border-[#000080]" />
                  {rvErr && <p className="text-[12px] text-rose-600">{rvErr}</p>}
                  <button className="rounded-full bg-[#000080] py-[10px] text-[13px] font-bold text-white hover:bg-[#0000a0]">Submit review</button>
                </form>
              </div>
              <div className="flex flex-col gap-4">
                {reviews.map((r) => (
                  <article key={r.id} className="rounded-[16px] border border-[#EBEBEB] bg-white p-5">
                    <div className="flex items-center justify-between gap-3"><div className="flex items-center gap-3"><span className="flex size-[36px] items-center justify-center rounded-full bg-[#000080]/10 text-[13px] font-black text-[#000080]">{r.author.charAt(0)}</span><div><p className="text-[13px] font-bold">{r.author} {r.verified && <span className="ml-1 rounded-full bg-emerald-50 px-2 py-[1px] text-[10px] font-bold text-emerald-700">Verified purchase</span>}</p><p className="text-[11px] text-[#9CA3AF]">{new Date(r.date).toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" })}</p></div></div><Stars rating={r.rating} size={13} /></div>
                    <h4 className="mt-3 text-[14px] font-bold">{r.title}</h4>
                    <p className="mt-1 text-[13px] leading-[1.7] text-[#4B5563]">{r.body}</p>
                  </article>
                ))}
              </div>
            </div>
          )}
          {tab === "delivery" && (
            <div className="grid gap-4 md:grid-cols-2">
              <div className="rounded-[16px] border border-[#EBEBEB] bg-white p-5"><h3 className="mb-3 text-[15px] font-black">Delivery options</h3><ul className="grid gap-2 text-[14px] text-[#374151]"><li>📍 Pickup at church — free</li>{DELIVERY_ZONES.map((z) => <li key={z.id}>🚚 {z.label} — {naira(z.fee)} · {z.eta}</li>)}<li className="text-[12px] text-[#6B7280]">Free delivery when your order is ₦100,000 or more.</li></ul></div>
              <div className="rounded-[16px] border border-[#EBEBEB] bg-white p-5"><h3 className="mb-3 text-[15px] font-black">Returns</h3><p className="text-[14px] leading-[1.8] text-[#374151]">Because items are sold within the church family, please check your purchase when you collect it. Report any issue within 48 hours through the church office and we will help you reach the seller to agree an exchange or refund. Food items cannot be returned.</p></div>
            </div>
          )}
        </div>
      </section>

      {related.length > 0 && (
        <section className="mt-6" style={vs}>
          <h2 className="mb-4 text-[20px] font-black">You may also like</h2>
          <div className="grid grid-cols-2 gap-4 md:grid-cols-4">{related.map((r) => <ProductCard key={r.id} p={r} compact />)}</div>
        </section>
      )}
      {recent.length > 0 && (
        <section className="mt-10" style={vs}>
          <h2 className="mb-4 text-[20px] font-black">Recently viewed</h2>
          <div className="flex gap-4 overflow-x-auto pb-2">{recent.map((r) => r && (<Link key={r.id} href={`${BASE}/product/${r.id}`} className="w-[150px] flex-shrink-0 overflow-hidden rounded-[14px] border border-[#EBEBEB] bg-white"><img src={r.image} alt={r.name} className="aspect-square w-full object-cover" /><div className="p-2"><p className="line-clamp-1 text-[12px] font-bold">{r.name}</p><p className="text-[12px] text-[#6B7280]">{naira(priceToNum(r.price))}</p></div></Link>))}</div>
        </section>
      )}

      {zoom && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4" onClick={() => setZoom(false)} role="dialog" aria-modal="true">
          <img src={gallery[img]} alt={p.name} className="max-h-full max-w-full rounded-lg object-contain" />
          <button className="absolute right-5 top-5 text-[32px] leading-none text-white" aria-label="Close">×</button>
        </div>
      )}
    </Shell>
  );
}
