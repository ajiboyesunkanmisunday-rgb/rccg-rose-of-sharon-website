"use client";

import { useParams } from "next/navigation";
import { useMemo, useState } from "react";
import { SELLER_PROFILES, naira, priceToNum, sellerBySlug, sellerSlug } from "../../_lib/catalog";
import { allProducts, useMarket } from "../../_lib/store";
import { Shell } from "../../_components/Shell";
import { BASE, Crumbs, ProductCard, Stars, vs } from "../../_components/ui";
import Link from "next/link";

export default function StorePage() {
  const { seller: slug } = useParams<{ seller: string }>();
  const m = useMarket();
  const [sort, setSort] = useState("featured");
  const profile = sellerBySlug(slug);
  const items = useMemo(() => {
    const l = allProducts(m).filter((p) => sellerSlug(p.seller) === slug);
    if (sort === "price_asc") return [...l].sort((a, b) => priceToNum(a.price) - priceToNum(b.price));
    if (sort === "price_desc") return [...l].sort((a, b) => priceToNum(b.price) - priceToNum(a.price));
    if (sort === "rating") return [...l].sort((a, b) => b.rating - a.rating);
    return l;
  }, [m, slug, sort]);
  const avg = items.length ? items.reduce((a, p) => a + p.rating, 0) / items.length : 0;
  const reviews = items.reduce((a, p) => a + p.ratingCount, 0);
  const name = profile?.name ?? decodeURIComponent(slug).replace(/-/g, " ");

  return (
    <Shell wide>
      <Crumbs items={[{ label: "Marketplace", href: BASE }, { label: "Stores" }, { label: name }]} />
      <section className="mb-8 overflow-hidden rounded-[24px] bg-gradient-to-br from-[#00003D] to-[#000080] p-6 text-white md:p-8" style={vs}>
        <div className="flex flex-wrap items-center gap-5">
          <span className="flex size-[72px] items-center justify-center rounded-full bg-white/15 text-[36px]">{profile?.emoji ?? "🛍️"}</span>
          <div className="min-w-0 flex-1"><h1 className="text-[26px] font-black">{name} {profile?.verified && <span className="text-[16px]" title="Verified">✔</span>}</h1><p className="mt-1 max-w-[640px] text-[14px] opacity-90">{profile?.blurb ?? "A seller in the Rose of Sharon community."}</p></div>
        </div>
        <dl className="mt-6 grid grid-cols-2 gap-4 text-[13px] md:grid-cols-4">
          <div><dt className="opacity-70">Products</dt><dd className="text-[20px] font-black">{items.length}</dd></div>
          <div><dt className="opacity-70">Rating</dt><dd className="flex items-center gap-2 text-[20px] font-black">{avg ? avg.toFixed(1) : "—"} {avg > 0 && <Stars rating={avg} size={13} />}</dd></div>
          <div><dt className="opacity-70">Reviews</dt><dd className="text-[20px] font-black">{reviews.toLocaleString()}</dd></div>
          <div><dt className="opacity-70">Replies</dt><dd className="text-[16px] font-bold">{profile?.responseTime ?? "—"}</dd></div>
        </dl>
      </section>

      <div className="mb-5 flex flex-wrap items-center justify-between gap-3" style={vs}>
        <div className="flex flex-wrap gap-2">{SELLER_PROFILES.map((s) => <Link key={s.slug} href={`${BASE}/store/${s.slug}`} className={`rounded-full px-4 py-[6px] text-[12px] font-bold ${s.slug === slug ? "bg-[#000080] text-white" : "border border-[#E5E7EB] bg-white text-[#374151] hover:border-[#000080]"}`}>{s.name}</Link>)}</div>
        <select value={sort} onChange={(e) => setSort(e.target.value)} className="rounded-full border border-[#E5E7EB] bg-white px-4 py-2 text-[13px] font-semibold outline-none"><option value="featured">Featured</option><option value="price_asc">Price: low to high</option><option value="price_desc">Price: high to low</option><option value="rating">Top rated</option></select>
      </div>
      {items.length === 0 ? <p className="py-16 text-center text-[#6B7280]" style={vs}>This store has no products yet. Total listed value: {naira(0)}.</p> : <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">{items.map((p) => <ProductCard key={p.id} p={p} />)}</div>}
    </Shell>
  );
}
