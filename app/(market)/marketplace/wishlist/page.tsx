"use client";

import Link from "next/link";
import { findProduct, addToCart, toggleWishlist, useMarket } from "../_lib/store";
import { naira, priceToNum } from "../_lib/catalog";
import { Shell } from "../_components/Shell";
import { BASE, Crumbs, Empty, ProductCard, vs } from "../_components/ui";

export default function WishlistPage() {
  const m = useMarket();
  const items = m.wishlist.map((id) => findProduct(id, m)).filter((p): p is NonNullable<typeof p> => !!p);
  const total = items.reduce((n, p) => n + priceToNum(p.price), 0);
  return (
    <Shell wide>
      <Crumbs items={[{ label: "Marketplace", href: BASE }, { label: "Wishlist" }]} />
      <div className="mb-6 flex flex-wrap items-end justify-between gap-3" style={vs}>
        <h1 className="text-[28px] font-black text-[#100E1A]">Wishlist <span className="text-[16px] font-semibold text-[#6B7280]">({items.length})</span></h1>
        {items.length > 0 && <div className="flex items-center gap-3 text-[13px]"><span className="text-[#6B7280]">All items: <b className="text-[#100E1A]">{naira(total)}</b></span><button onClick={() => items.filter((p) => p.stock !== "out").forEach((p) => addToCart(p.id))} className="rounded-full bg-[#000080] px-5 py-[9px] font-bold text-white hover:bg-[#0000a0]">Add all to cart</button><button onClick={() => items.forEach((p) => toggleWishlist(p.id))} className="font-semibold text-[#6B7280] hover:text-rose-600">Clear</button></div>}
      </div>
      {!m.hydrated ? null : items.length === 0 ? <Empty title="Nothing saved yet" text="Tap the heart on any product to keep it here for later." cta="Browse products" href={BASE} /> : (
        <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">{items.map((p) => <ProductCard key={p.id} p={p} />)}</div>
      )}
      <p className="mt-8 text-center text-[12px] text-[#9CA3AF]" style={vs}>Saved on this device. <Link href={BASE} className="underline">Keep shopping</Link></p>
    </Shell>
  );
}
