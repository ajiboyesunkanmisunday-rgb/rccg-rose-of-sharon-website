"use client";

import Link from "next/link";
import { naira, priceToNum, specsFor, stockCount } from "../_lib/catalog";
import { addToCart, clearCompare, findProduct, toggleCompare, useMarket } from "../_lib/store";
import { Shell } from "../_components/Shell";
import { BASE, Crumbs, Empty, Stars, vs } from "../_components/ui";

export default function ComparePage() {
  const m = useMarket();
  const items = m.compare.map((id) => findProduct(id, m)).filter((p): p is NonNullable<typeof p> => !!p);
  const labels = Array.from(new Set(items.flatMap((p) => specsFor(p).map((s) => s.label))));
  const cheapest = items.length ? Math.min(...items.map((p) => priceToNum(p.price))) : 0;
  const best = items.length ? Math.max(...items.map((p) => p.rating)) : 0;
  return (
    <Shell wide>
      <Crumbs items={[{ label: "Marketplace", href: BASE }, { label: "Compare" }]} />
      <div className="mb-6 flex items-end justify-between" style={vs}><h1 className="text-[28px] font-black">Compare products</h1>{items.length > 0 && <button onClick={clearCompare} className="text-[13px] font-semibold text-[#6B7280] hover:text-rose-600">Clear all</button>}</div>
      {!m.hydrated ? null : items.length < 2 ? <Empty title="Pick at least two products" text="Tick “Compare” on up to three products to see them side by side." cta="Browse products" href={BASE} /> : (
        <div className="overflow-x-auto rounded-[20px] border border-[#EBEBEB] bg-white" style={vs}>
          <table className="w-full min-w-[640px] border-collapse text-left text-[13px]">
            <thead><tr><th className="w-[140px] p-4" />{items.map((p) => (<th key={p.id} className="p-4 align-top"><Link href={`${BASE}/product/${p.id}`}><img src={p.image} alt={p.name} className="mb-3 aspect-square w-full max-w-[200px] rounded-[14px] object-cover" /><span className="text-[15px] font-black text-[#100E1A] hover:text-[#000080]">{p.name}</span></Link><button onClick={() => toggleCompare(p.id)} className="mt-1 block text-[11px] font-semibold text-rose-600">Remove</button></th>))}</tr></thead>
            <tbody>
              <tr className="border-t border-[#F3F4F6]"><td className="p-4 font-bold text-[#6B7280]">Price</td>{items.map((p) => <td key={p.id} className="p-4 text-[16px] font-black">{naira(priceToNum(p.price))}{priceToNum(p.price) === cheapest && <span className="ml-2 rounded-full bg-emerald-50 px-2 py-[2px] text-[10px] font-bold text-emerald-700">Lowest</span>}</td>)}</tr>
              <tr className="border-t border-[#F3F4F6]"><td className="p-4 font-bold text-[#6B7280]">Rating</td>{items.map((p) => <td key={p.id} className="p-4"><span className="flex items-center gap-2"><Stars rating={p.rating} size={13} /><b>{p.rating.toFixed(1)}</b><span className="text-[#9CA3AF]">({p.ratingCount})</span>{p.rating === best && <span className="rounded-full bg-amber-50 px-2 py-[2px] text-[10px] font-bold text-amber-700">Top rated</span>}</span></td>)}</tr>
              <tr className="border-t border-[#F3F4F6]"><td className="p-4 font-bold text-[#6B7280]">In stock</td>{items.map((p) => <td key={p.id} className="p-4">{stockCount(p) > 0 ? `${stockCount(p)} units` : "Out of stock"}</td>)}</tr>
              {labels.map((l) => (<tr key={l} className="border-t border-[#F3F4F6]"><td className="p-4 font-bold text-[#6B7280]">{l}</td>{items.map((p) => <td key={p.id} className="p-4">{specsFor(p).find((s) => s.label === l)?.value ?? "—"}</td>)}</tr>))}
              <tr className="border-t border-[#F3F4F6]"><td className="p-4" />{items.map((p) => <td key={p.id} className="p-4"><button disabled={p.stock === "out"} onClick={() => addToCart(p.id)} className="rounded-full bg-[#000080] px-5 py-[10px] text-[12px] font-bold text-white hover:bg-[#0000a0] disabled:opacity-40">Add to cart</button></td>)}</tr>
            </tbody>
          </table>
        </div>
      )}
    </Shell>
  );
}
