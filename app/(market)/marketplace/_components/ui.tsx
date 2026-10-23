"use client";

import Link from "next/link";
import { naira, priceToNum, sellerSlug, type Product } from "../_lib/catalog";
import { addToCart, toggleWishlist, toggleCompare, useMarket, type OrderStatus } from "../_lib/store";

export const vs = { fontVariationSettings: '"wdth" 100' };
export const BASE = "/marketplace";

export function Stars({ rating, size = 14 }: { rating: number; size?: number }) {
  return (
    <span className="inline-flex items-center gap-[1px]" aria-label={`${rating.toFixed(1)} out of 5`}>
      {[1, 2, 3, 4, 5].map((s) => {
        const fill = Math.max(0, Math.min(1, rating - (s - 1)));
        return (
          <svg key={s} viewBox="0 0 20 20" width={size} height={size} className="flex-shrink-0">
            <defs><linearGradient id={`st-${s}-${Math.round(fill * 100)}`}><stop offset={`${fill * 100}%`} stopColor="#F59E0B" /><stop offset={`${fill * 100}%`} stopColor="transparent" /></linearGradient></defs>
            <path d="M10 1.5l2.47 5.01 5.53.8-4 3.9.94 5.49L10 14.25l-4.94 2.45.94-5.49-4-3.9 5.53-.8z" fill={`url(#st-${s}-${Math.round(fill * 100)})`} stroke="#F59E0B" strokeWidth="1" />
          </svg>
        );
      })}
    </span>
  );
}

export function Heart({ on, className = "size-[20px]" }: { on: boolean; className?: string }) {
  return (
    <svg viewBox="0 0 37 32" fill="none" className={className}>
      <path d="M18.5 28S3 19.5 3 10.5C3 7 5.5 4 9 4c2.5 0 4.8 1.5 6 3.8a7.15 7.15 0 0 1 12 3.5c.5 6.3-8.5 16.7-8.5 16.7z" fill={on ? "#FF4D6D" : "none"} stroke={on ? "#FF4D6D" : "#100E1A"} strokeWidth="2.4" />
    </svg>
  );
}

export function StockBadge({ p }: { p: Product }) {
  const m = p.stock === "in_stock" ? ["In stock", "bg-emerald-50 text-emerald-700"] : p.stock === "limited" ? ["Limited stock", "bg-amber-50 text-amber-700"] : ["Out of stock", "bg-rose-50 text-rose-700"];
  return <span className={`inline-block rounded-full px-[10px] py-[3px] text-[11px] font-bold ${m[1]}`} style={vs}>{m[0]}</span>;
}

export function ProductCard({ p, compact = false }: { p: Product; compact?: boolean }) {
  const m = useMarket();
  const saved = m.wishlist.includes(p.id);
  const comparing = m.compare.includes(p.id);
  const off = p.originalPrice ? Math.round((1 - priceToNum(p.price) / priceToNum(p.originalPrice)) * 100) : 0;
  return (
    <div className="group flex flex-col overflow-hidden rounded-[16px] border border-[#EBEBEB] bg-white transition-shadow hover:shadow-[0_8px_28px_rgba(0,0,0,0.10)]">
      <div className="relative aspect-[4/4.2] w-full overflow-hidden bg-[#F3F4F6]">
        <Link href={`${BASE}/product/${p.id}`} aria-label={p.name}>
          <img src={p.image} alt={p.name} loading="lazy" className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105" />
        </Link>
        <div className="absolute left-2 top-2 flex flex-col gap-1">
          {p.isNew && <span className="rounded-full bg-[#000080] px-2 py-[2px] text-[10px] font-bold text-white">NEW</span>}
          {off > 0 && <span className="rounded-full bg-[#DC2626] px-2 py-[2px] text-[10px] font-bold text-white">-{off}%</span>}
        </div>
        <button onClick={() => toggleWishlist(p.id)} aria-label="Save to wishlist" className="absolute right-2 top-2 flex size-[34px] items-center justify-center rounded-full bg-white/90 shadow">
          <Heart on={saved} className="size-[18px]" />
        </button>
      </div>
      <div className="flex flex-1 flex-col gap-[6px] p-3">
        <Link href={`${BASE}/product/${p.id}`} className="line-clamp-1 text-[14px] font-bold text-[#100E1A] hover:text-[#000080]" style={vs}>{p.name}</Link>
        {!compact && <p className="line-clamp-2 text-[12px] leading-[1.5] text-[#6B7280]" style={vs}>{p.description}</p>}
        <div className="flex items-center gap-1">
          <Stars rating={p.rating} size={12} />
          <span className="text-[11px] text-[#9CA3AF]">({p.ratingCount})</span>
        </div>
        <Link href={`${BASE}/store/${sellerSlug(p.seller)}`} className="text-[11px] text-[#6B7280] hover:text-[#000080]" style={vs}>by {p.seller}</Link>
        <div className="mt-auto flex items-end justify-between gap-2 pt-1">
          <div className="flex flex-col leading-tight">
            <span className="text-[16px] font-black text-[#100E1A]" style={vs}>{naira(priceToNum(p.price))}</span>
            {p.originalPrice && <span className="text-[11px] text-[#9CA3AF] line-through">{naira(priceToNum(p.originalPrice))}</span>}
          </div>
          <button disabled={p.stock === "out"} onClick={() => addToCart(p.id)} className="rounded-full bg-[#000080] px-4 py-[8px] text-[12px] font-bold text-white transition-colors hover:bg-[#0000a0] disabled:opacity-40" style={vs}>Add</button>
        </div>
        {!compact && (
          <label className="flex cursor-pointer items-center gap-2 pt-1 text-[11px] text-[#6B7280]" style={vs}>
            <input type="checkbox" checked={comparing} onChange={() => toggleCompare(p.id)} className="accent-[#000080]" /> Compare
          </label>
        )}
      </div>
    </div>
  );
}

export function Crumbs({ items }: { items: { label: string; href?: string }[] }) {
  return (
    <nav className="mb-4 flex flex-wrap items-center gap-2 text-[12px] text-[#6B7280]" style={vs}>
      {items.map((it, i) => (
        <span key={i} className="flex items-center gap-2">
          {it.href ? <Link href={it.href} className="hover:text-[#000080]">{it.label}</Link> : <span className="font-semibold text-[#100E1A]">{it.label}</span>}
          {i < items.length - 1 && <span>/</span>}
        </span>
      ))}
    </nav>
  );
}

export function Empty({ title, text, cta, href }: { title: string; text: string; cta: string; href: string }) {
  return (
    <div className="flex flex-col items-center gap-3 rounded-[20px] border border-dashed border-[#D1D5DB] bg-white px-6 py-16 text-center">
      <span className="text-[40px]">🛍️</span>
      <h2 className="text-[18px] font-black text-[#100E1A]" style={vs}>{title}</h2>
      <p className="max-w-[360px] text-[14px] text-[#6B7280]" style={vs}>{text}</p>
      <Link href={href} className="mt-2 rounded-full bg-[#000080] px-6 py-[10px] text-[13px] font-bold text-white hover:bg-[#0000a0]" style={vs}>{cta}</Link>
    </div>
  );
}

export const STATUS_META: Record<OrderStatus, { label: string; cls: string }> = {
  placed: { label: "Order placed", cls: "bg-amber-50 text-amber-700" },
  confirmed: { label: "Confirmed", cls: "bg-blue-50 text-blue-700" },
  ready: { label: "Ready", cls: "bg-indigo-50 text-indigo-700" },
  completed: { label: "Completed", cls: "bg-emerald-50 text-emerald-700" },
  cancelled: { label: "Cancelled", cls: "bg-rose-50 text-rose-700" },
};

