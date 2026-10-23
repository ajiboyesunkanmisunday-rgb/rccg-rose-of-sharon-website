"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";
import { cartCount, useMarket } from "../_lib/store";
import { BASE, vs } from "./ui";

const NAV = [
  { href: BASE, label: "Shop" },
  { href: `${BASE}/wishlist`, label: "Wishlist" },
  { href: `${BASE}/orders`, label: "My orders" },
  { href: `${BASE}/sell`, label: "Sell" },
];

export function Shell({ children, wide = false }: { children: React.ReactNode; wide?: boolean }) {
  const m = useMarket();
  const path = usePathname();
  const router = useRouter();
  const [q, setQ] = useState("");
  const count = cartCount(m);
  const active = (href: string) => (href === BASE ? path === BASE : path.startsWith(href));
  const tab = "relative flex flex-1 flex-col items-center justify-center gap-[2px] py-[9px] text-[10px] font-semibold active:scale-95 transition-transform";
  const badge = "absolute right-[22%] top-[4px] flex h-[16px] min-w-[16px] items-center justify-center rounded-full bg-[#000080] px-[3px] text-[9px] font-bold text-white";

  return (
    <div className="min-h-screen bg-[#FAFAFB] pb-[84px] md:pb-0">
      <header className="sticky top-0 z-40 border-b border-[#E5E7EB] bg-white/95 backdrop-blur">
        <div className="mx-auto flex h-[58px] max-w-[1400px] items-center gap-3 px-4 md:h-[64px] md:px-10">
          <Link href={BASE} aria-label="Marketplace home" className="flex min-w-0 items-center gap-[10px]">
            <img src="/ros-logo.png" alt="RCCG Rose of Sharon" className="size-[34px] flex-shrink-0 object-contain" />
            <span className="hidden truncate text-[17px] font-black tracking-wide text-[#00003D] sm:block" style={vs}>ROS Marketplace</span>
          </Link>
          <form onSubmit={(e) => { e.preventDefault(); router.push(`${BASE}?q=${encodeURIComponent(q.trim())}`); }} className="mx-2 flex h-[40px] max-w-[460px] flex-1 items-center gap-2 rounded-full border-[1.5px] border-[#00003D] bg-white px-4">
            <svg viewBox="0 0 21 21" fill="none" className="size-[16px] flex-shrink-0"><circle cx="9.5" cy="9.5" r="7.5" stroke="#00003D" strokeWidth="2" /><path d="M15.5 15.5l4 4" stroke="#00003D" strokeWidth="2" strokeLinecap="round" /></svg>
            <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search products" className="w-full bg-transparent text-[14px] font-semibold text-[#00003D] outline-none placeholder:text-[#00003D]/50" style={vs} />
          </form>
          <nav className="ml-auto hidden items-center gap-1 md:flex" style={vs}>
            {NAV.map((n) => (
              <Link key={n.href} href={n.href} className={`relative rounded-full px-4 py-[8px] text-[13px] font-bold transition-colors ${active(n.href) ? "bg-[#000080] text-white" : "text-[#374151] hover:bg-[#F3F4F6]"}`}>
                {n.label}
                {n.label === "Wishlist" && m.wishlist.length > 0 && <span className="ml-1 text-[11px] opacity-70">({m.wishlist.length})</span>}
              </Link>
            ))}
          </nav>
          <Link href={`${BASE}/cart`} aria-label="Cart" className="relative ml-auto flex size-[42px] items-center justify-center rounded-full text-[#100E1A] hover:bg-[#F3F4F6] md:ml-0">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" className="size-[24px]"><path strokeLinecap="round" strokeLinejoin="round" d="M3 4h2.5l2.4 11h10.2l2.3-8H7" /><circle cx="9.5" cy="19.5" r="1.4" fill="currentColor" /><circle cx="17" cy="19.5" r="1.4" fill="currentColor" /></svg>
            {count > 0 && <span className="absolute right-0 top-0 flex h-[18px] min-w-[18px] items-center justify-center rounded-full bg-[#000080] px-[3px] text-[10px] font-bold text-white">{count}</span>}
          </Link>
        </div>
      </header>

      <main className={`mx-auto px-4 py-6 md:px-10 md:py-8 ${wide ? "max-w-[1400px]" : "max-w-[1100px]"}`}>{children}</main>

      {m.compare.length > 0 && (
        <div className="fixed bottom-[76px] left-1/2 z-40 flex -translate-x-1/2 items-center gap-3 rounded-full bg-[#00003D] px-5 py-[10px] text-white shadow-xl md:bottom-6" style={vs}>
          <span className="text-[12px] font-bold">{m.compare.length} to compare</span>
          <Link href={`${BASE}/compare`} className="rounded-full bg-white px-3 py-[5px] text-[12px] font-black text-[#00003D]">Compare</Link>
        </div>
      )}

      {m.toast && <div className="fixed left-1/2 top-[74px] z-50 -translate-x-1/2 rounded-full bg-[#100E1A] px-5 py-[10px] text-[13px] font-semibold text-white shadow-xl" style={vs} role="status">{m.toast}</div>}

      <nav className="fixed bottom-0 left-0 right-0 z-40 border-t border-[#E5E7EB] bg-white/95 pb-[env(safe-area-inset-bottom)] backdrop-blur md:hidden" style={vs}>
        <div className="mx-auto flex max-w-[520px] items-end px-2">
          <Link href={BASE} className={`${tab} ${active(BASE) ? "text-[#000080]" : "text-[#6B7280]"}`}>Shop</Link>
          <Link href={`${BASE}/wishlist`} className={`${tab} ${active(`${BASE}/wishlist`) ? "text-[#000080]" : "text-[#6B7280]"}`}>Wishlist{m.wishlist.length > 0 && <span className={badge}>{m.wishlist.length}</span>}</Link>
          <Link href={`${BASE}/cart`} className={`${tab} ${active(`${BASE}/cart`) ? "text-[#000080]" : "text-[#6B7280]"}`}>Cart{count > 0 && <span className={badge}>{count}</span>}</Link>
          <Link href={`${BASE}/orders`} className={`${tab} ${active(`${BASE}/orders`) ? "text-[#000080]" : "text-[#6B7280]"}`}>Orders</Link>
          <Link href={`${BASE}/sell`} className={`${tab} ${active(`${BASE}/sell`) ? "text-[#000080]" : "text-[#6B7280]"}`}>Sell</Link>
        </div>
      </nav>

      <footer className="hidden border-t border-[#E5E7EB] bg-white md:block" style={vs}>
        <div className="mx-auto flex max-w-[1400px] items-center justify-between gap-4 px-10 py-4">
          <span className="text-[12px] text-[#6B7280]">© {new Date().getFullYear()} RCCG Rose of Sharon · ROS Marketplace</span>
          <nav className="flex items-center gap-5 text-[12px] font-semibold text-[#374151]">
            <Link href="/" className="hover:text-[#000080]">Church website</Link>
            <Link href="/give" className="hover:text-[#000080]">Give</Link>
            <Link href="/ql" className="hover:text-[#000080]">Quick links</Link>
          </nav>
        </div>
      </footer>
    </div>
  );
}
