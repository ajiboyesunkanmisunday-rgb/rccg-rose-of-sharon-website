"use client";

import { useSyncExternalStore } from "react";
import { PRODUCTS, PROMOS, DELIVERY_ZONES, priceToNum, type Product, type Review } from "./catalog";

export interface CartLine { id: number; qty: number; size?: string }
export interface Profile { name: string; phone: string; email: string; address: string; zone: string }
export type OrderStatus = "placed" | "confirmed" | "ready" | "completed" | "cancelled";
export interface Order {
  id: string;
  createdAt: number;
  lines: { id: number; name: string; image: string; price: number; qty: number; size?: string }[];
  subtotal: number; discount: number; delivery: number; total: number;
  promo?: string;
  method: "pickup" | "delivery";
  payment: "transfer" | "pickup";
  paymentRef?: string;
  paid: boolean;
  profile: Profile;
  pickupPoint?: string;
  note?: string;
  status: OrderStatus;
}
export interface Listing extends Product { createdAt: number }

export interface MarketState {
  hydrated: boolean;
  cart: CartLine[];
  wishlist: number[];
  recent: number[];
  compare: number[];
  orders: Order[];
  profile: Profile;
  promo: string;
  reviews: Record<number, Review[]>;
  listings: Listing[];
  toast: string;
}

const KEY = "ros-market-v1";
const EMPTY_PROFILE: Profile = { name: "", phone: "", email: "", address: "", zone: DELIVERY_ZONES[0].id };
const INITIAL: MarketState = { hydrated: false, cart: [], wishlist: [], recent: [], compare: [], orders: [], profile: EMPTY_PROFILE, promo: "", reviews: {}, listings: [], toast: "" };

let state: MarketState = INITIAL;
const listeners = new Set<() => void>();
let loaded = false;

function persist() {
  try {
    const { hydrated: _h, toast: _t, ...rest } = state;
    void _h; void _t;
    localStorage.setItem(KEY, JSON.stringify(rest));
  } catch {}
}
function load() {
  if (loaded || typeof window === "undefined") return;
  loaded = true;
  let saved: Partial<MarketState> = {};
  try { saved = JSON.parse(localStorage.getItem(KEY) || "{}"); } catch {}
  state = { ...INITIAL, ...saved, profile: { ...EMPTY_PROFILE, ...(saved.profile || {}) }, hydrated: true, toast: "" };
}
function set(patch: Partial<MarketState>, save = true) {
  state = { ...state, ...patch };
  if (save) persist();
  listeners.forEach((l) => l());
}
function subscribe(l: () => void) {
  listeners.add(l);
  if (!loaded) { load(); queueMicrotask(() => listeners.forEach((x) => x())); }
  const onStorage = (e: StorageEvent) => { if (e.key === KEY) { loaded = false; load(); listeners.forEach((x) => x()); } };
  window.addEventListener("storage", onStorage);
  return () => { listeners.delete(l); window.removeEventListener("storage", onStorage); };
}

export function useMarket(): MarketState {
  return useSyncExternalStore(subscribe, () => state, () => INITIAL);
}

/* ───────── lookups ───────── */
export function allProducts(s: MarketState = state): Product[] { return [...PRODUCTS, ...s.listings]; }
export function findProduct(id: number, s: MarketState = state) { return allProducts(s).find((p) => p.id === id); }
export function unitPrice(p: Product) { return priceToNum(p.price); }

/* ───────── toast ───────── */
let toastTimer: ReturnType<typeof setTimeout> | undefined;
export function toast(msg: string) {
  set({ toast: msg }, false);
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => set({ toast: "" }, false), 2200);
}

/* ───────── cart ───────── */
export function addToCart(id: number, qty = 1, size?: string) {
  const p = findProduct(id);
  if (!p || p.stock === "out") { toast("This item is out of stock"); return; }
  const cart = [...state.cart];
  const i = cart.findIndex((l) => l.id === id && l.size === size);
  if (i >= 0) cart[i] = { ...cart[i], qty: Math.min(20, cart[i].qty + qty) }; else cart.push({ id, qty, size });
  set({ cart });
  toast(`Added “${p.name}” to cart`);
}
export function setQty(id: number, qty: number, size?: string) {
  const cart = state.cart.flatMap((l) => (l.id === id && l.size === size ? (qty > 0 ? [{ ...l, qty: Math.min(20, qty) }] : []) : [l]));
  set({ cart });
}
export function removeFromCart(id: number, size?: string) { setQty(id, 0, size); }
export function clearCart() { set({ cart: [] }); }
export function cartCount(s: MarketState) { return s.cart.reduce((n, l) => n + l.qty, 0); }

/* ───────── wishlist / recent / compare ───────── */
export function toggleWishlist(id: number) {
  const has = state.wishlist.includes(id);
  set({ wishlist: has ? state.wishlist.filter((x) => x !== id) : [...state.wishlist, id] });
  toast(has ? "Removed from wishlist" : "Saved to wishlist");
}
export function pushRecent(id: number) {
  if (state.recent[0] === id) return;
  set({ recent: [id, ...state.recent.filter((x) => x !== id)].slice(0, 12) });
}
export function toggleCompare(id: number) {
  if (state.compare.includes(id)) { set({ compare: state.compare.filter((x) => x !== id) }); return; }
  if (state.compare.length >= 3) { toast("You can compare up to 3 items"); return; }
  set({ compare: [...state.compare, id] });
}
export function clearCompare() { set({ compare: [] }); }

/* ───────── profile / promo ───────── */
export function saveProfile(p: Partial<Profile>) { set({ profile: { ...state.profile, ...p } }); }
export function applyPromo(code: string): string | null {
  const c = code.trim().toUpperCase();
  if (!c) { set({ promo: "" }); return null; }
  if (!PROMOS[c]) return "That code is not valid";
  set({ promo: c });
  return null;
}

/* ───────── totals ───────── */
export function totals(s: MarketState, method: "pickup" | "delivery", zoneId?: string) {
  const subtotal = s.cart.reduce((n, l) => { const p = findProduct(l.id, s); return n + (p ? unitPrice(p) * l.qty : 0); }, 0);
  const promo = s.promo ? PROMOS[s.promo] : undefined;
  let discount = 0;
  let promoNote = "";
  if (promo) {
    if (promo.min && subtotal < promo.min) promoNote = `Add ₦${(promo.min - subtotal).toLocaleString()} more to use ${s.promo}`;
    else discount = promo.kind === "percent" ? Math.round(subtotal * promo.value / 100) : promo.value;
  }
  const zone = DELIVERY_ZONES.find((z) => z.id === (zoneId ?? s.profile.zone)) ?? DELIVERY_ZONES[0];
  const delivery = method === "delivery" && subtotal > 0 ? (subtotal - discount >= 100000 ? 0 : zone.fee) : 0;
  return { subtotal, discount, delivery, total: Math.max(0, subtotal - discount + delivery), promoNote, zone, freeDelivery: method === "delivery" && subtotal - discount >= 100000 };
}

/* ───────── orders ───────── */
export function placeOrder(input: { method: "pickup" | "delivery"; payment: "transfer" | "pickup"; paymentRef?: string; pickupPoint?: string; note?: string }): Order | null {
  const s = state;
  if (s.cart.length === 0) return null;
  const t = totals(s, input.method);
  const order: Order = {
    id: "ROS-" + Date.now().toString(36).toUpperCase().slice(-6) + Math.floor(Math.random() * 90 + 10),
    createdAt: Date.now(),
    lines: s.cart.flatMap((l) => { const p = findProduct(l.id, s); return p ? [{ id: p.id, name: p.name, image: p.image, price: unitPrice(p), qty: l.qty, size: l.size }] : []; }),
    subtotal: t.subtotal, discount: t.discount, delivery: t.delivery, total: t.total,
    promo: t.discount > 0 ? s.promo : undefined,
    method: input.method, payment: input.payment, paymentRef: input.paymentRef, paid: false,
    profile: s.profile, pickupPoint: input.pickupPoint, note: input.note,
    status: "placed",
  };
  set({ orders: [order, ...s.orders], cart: [], promo: "" });
  return order;
}
export function cancelOrder(id: string) {
  set({ orders: state.orders.map((o) => (o.id === id && (o.status === "placed" || o.status === "confirmed") ? { ...o, status: "cancelled" as const } : o)) });
  toast("Order cancelled");
}
export function markPaid(id: string, ref: string) {
  set({ orders: state.orders.map((o) => (o.id === id ? { ...o, paid: true, paymentRef: ref } : o)) });
}
/** Demo progression: an order advances with time so the tracker is meaningful before back-office integration. */
export function orderStatus(o: Order, now: number): OrderStatus {
  if (o.status === "cancelled" || o.status === "completed") return o.status;
  const mins = (now - o.createdAt) / 60000;
  if (mins > 60 * 48) return "completed";
  if (mins > 60 * 24) return "ready";
  if (mins > 30) return "confirmed";
  return "placed";
}

/* ───────── reviews ───────── */
export function addReview(productId: number, r: Omit<Review, "id" | "date" | "verified">) {
  const review: Review = { ...r, id: `u-${Date.now()}`, date: new Date().toISOString(), verified: state.orders.some((o) => o.lines.some((l) => l.id === productId)) };
  set({ reviews: { ...state.reviews, [productId]: [review, ...(state.reviews[productId] || [])] } });
  toast("Thanks for your review");
}

/* ───────── listings (seller) ───────── */
export function addListing(l: Omit<Listing, "id" | "createdAt" | "rating" | "ratingCount" | "isNew">) {
  const id = 1000 + state.listings.length + 1;
  set({ listings: [{ ...l, id, createdAt: Date.now(), rating: 0, ratingCount: 0, isNew: true }, ...state.listings] });
  return id;
}
export function removeListing(id: number) { set({ listings: state.listings.filter((l) => l.id !== id) }); }
