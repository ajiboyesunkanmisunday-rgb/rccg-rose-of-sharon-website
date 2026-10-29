"use client";

import { useState, useMemo, useEffect, useCallback, useRef } from "react";
import Link from "@ros/shared/link";
import { API_BASE } from "@ros/shared/api";

const vs = { fontVariationSettings: '"wdth" 100' };

/* ─────────────── AD SLIDES ─────────────── */
const AD_SLIDES = [
  { id: 1, bgFrom: "#E8F0FF", bgTo: "#D4E0F5", borderColor: "#000080", badgeBg: "#000080", title: "Shop within\nthe family", tagline: "Quality goods from your church community at very affordable prices", taglineBg: "#000080", cta: "Shop now", action: "shop" as const, note: "Open to all church members", visual: "store" as const },
  { id: 2, bgFrom: "#FFF8E8", bgTo: "#FFF0CC", borderColor: "#D97706", badgeBg: "#B45309", title: "Purpose\nDriven Life", tagline: "By Rick Warren, available now in the marketplace", taglineBg: "#D97706", cta: "Buy now — ₦4,000", action: "product" as const, productId: 3, note: "Limited stock available", image: "/marketplace/img4.jpg" },
  { id: 3, bgFrom: "#F0EEFF", bgTo: "#E2DDFF", borderColor: "#7C3AED", badgeBg: "#7C3AED", title: "CSR Skills\nProgram", tagline: "Digital marketing, graphic design and more. Enrol today", taglineBg: "#7C3AED", cta: "Explore CSR", action: "link" as const, href: "/csr", note: "Open to all community members", visual: "csr" as const },
  { id: 4, bgFrom: "#FFF0F0", bgTo: "#FFE0E0", borderColor: "#DC2626", badgeBg: "#DC2626", title: "Italian\nLeather Shoes", tagline: "Premium quality from a church member, for formal and special occasions", taglineBg: "#DC2626", cta: "View product", action: "product" as const, productId: 4, note: "₦75,000 · Limited quantity", image: "/marketplace/img5.jpg" },
];

/* ─────────────── STATIC DATA ─────────────── */
const CATEGORIES = ["All", "Books", "Restaurant", "Sneakers", "T-shirts", "Roundnecks", "Foodstuffs", "Shoes", "Children Toys", "Suits"];

const SORT_OPTIONS = [
  { label: "Best Match", value: "featured" },
  { label: "Price: Low to High", value: "price_asc" },
  { label: "Price: High to Low", value: "price_desc" },
  { label: "Customer Rating", value: "rating_desc" },
  { label: "Newest First", value: "newest" },
  { label: "Name A–Z", value: "name_asc" },
];

const PRICE_BUCKETS = [
  { label: "Under ₦5,000", min: 0, max: 5000 },
  { label: "₦5,000 – ₦20,000", min: 5000, max: 20000 },
  { label: "₦20,000 – ₦50,000", min: 20000, max: 50000 },
  { label: "₦50,000 – ₦100,000", min: 50000, max: 100000 },
  { label: "₦100,000 & above", min: 100000, max: Infinity },
];

const SELLERS = ["All Sellers", "Church Members", "ROS Restaurant", "CSR Program"];
const CONDITIONS = ["new", "used", "refurbished"] as const;
type Condition = typeof CONDITIONS[number];

const PRODUCT_CATEGORIES_API = [
  { label: "Books", value: "BOOK" },
  { label: "Electronics", value: "ELECTRONICS" },
  { label: "Cooking Utensils", value: "COOKING_UTENSILS" },
  { label: "Automobile", value: "AUTOMOBILE" },
  { label: "Wears & Clothing", value: "WEARS" },
];

const ITEMS_PER_PAGE = 9;

interface Product {
  id: number;
  name: string;
  description: string;
  price: string;
  originalPrice?: string;
  category: string;
  image: string;
  isNew?: boolean;
  onSale?: boolean;
  stock: "in_stock" | "limited" | "out";
  rating: number;
  ratingCount: number;
  condition: Condition;
  seller: string;
  tags: string[];
}

const PRODUCTS: Product[] = [
  { id: 1, name: "Nike Round Neck", description: "Silk and linen material quality Nike wears.", price: "₦45,000.00", category: "Roundnecks", image: "/marketplace/img2.jpg", stock: "in_stock", rating: 4.5, ratingCount: 128, condition: "new", seller: "Church Members", tags: ["clothing", "men", "nike"] },
  { id: 2, name: "Sport Sneaker", description: "Sneaker suitable for jogging and special sport activities.", price: "₦45,000.00", category: "Sneakers", image: "/marketplace/img3.jpg", isNew: true, stock: "limited", rating: 4.2, ratingCount: 64, condition: "new", seller: "Church Members", tags: ["shoes", "sport", "new"] },
  { id: 3, name: "Purpose Driven Life", description: "Book on purpose finding by Rick Warren.", price: "₦4,000", category: "Books", image: "/marketplace/img4.jpg", stock: "limited", rating: 5.0, ratingCount: 312, condition: "new", seller: "Church Members", tags: ["book", "spiritual", "rick warren"] },
  { id: 4, name: "Italian Shoe", description: "Quality Italian leather shoes for formal occasions.", price: "₦75,000.00", category: "Shoes", image: "/marketplace/img5.jpg", stock: "limited", rating: 4.7, ratingCount: 44, condition: "new", seller: "Church Members", tags: ["shoes", "formal", "leather"] },
  { id: 5, name: "Men Blue Suit", description: "Classic blue suit for formal and church occasions.", price: "₦145,000", category: "Suits", image: "/marketplace/img6.jpg", stock: "in_stock", rating: 4.3, ratingCount: 87, condition: "new", seller: "Church Members", tags: ["formal", "men", "suit"] },
  { id: 6, name: "Snack & Spicy", description: "Sweet taste snack & spicy from ROS restaurant.", price: "₦5,060", category: "Restaurant", image: "/marketplace/img7.jpg", stock: "in_stock", rating: 4.8, ratingCount: 203, condition: "new", seller: "ROS Restaurant", tags: ["food", "snack", "restaurant"] },
  { id: 7, name: "Fried Rice & Chicken", description: "Delicious fried rice and chicken from ROS kitchen.", price: "₦9,500", category: "Restaurant", image: "/marketplace/img8.jpg", stock: "in_stock", rating: 4.9, ratingCount: 445, condition: "new", seller: "ROS Restaurant", tags: ["food", "rice", "restaurant"] },
  { id: 8, name: "Female Red Leather Bag", description: "Premium red leather bag, stylish and durable.", price: "₦45,000.00", category: "T-shirts", image: "/marketplace/img9.jpg", stock: "limited", rating: 4.1, ratingCount: 33, condition: "new", seller: "Church Members", tags: ["bag", "women", "leather"] },
  { id: 9, name: "Power of Character", description: "Book on character by Myles Munroe.", price: "₦4,000", category: "Books", image: "/marketplace/img10.jpg", stock: "in_stock", rating: 4.6, ratingCount: 178, condition: "new", seller: "Church Members", tags: ["book", "spiritual", "myles munroe"] },
];

interface VerifiedMember { id: string; name: string; type: "member" | "emember" }

function priceToNum(price: string) { return parseFloat(price.replace(/[^0-9.]/g, "")) || 0; }

function StarIcon({ filled, half }: { filled: boolean; half?: boolean }) {
  return (
    <svg viewBox="0 0 20 20" className="size-[14px] flex-shrink-0" fill={filled ? "#F59E0B" : half ? "url(#half)" : "none"} stroke="#F59E0B" strokeWidth="1">
      {half && <defs><linearGradient id="half"><stop offset="50%" stopColor="#F59E0B" /><stop offset="50%" stopColor="transparent" /></linearGradient></defs>}
      <path d="M10 1.5l2.47 5.01 5.53.8-4 3.9.94 5.49L10 14.25l-4.94 2.45.94-5.49-4-3.9 5.53-.8z" />
    </svg>
  );
}

function StarRow({ rating }: { rating: number }) {
  return (
    <span className="flex items-center gap-[1px]">
      {[1, 2, 3, 4, 5].map((s) => (
        <StarIcon key={s} filled={s <= Math.floor(rating)} half={s === Math.ceil(rating) && rating % 1 >= 0.4} />
      ))}
    </span>
  );
}

/* ─────────────── MAIN PAGE ─────────────── */
export default function MarketplacePage() {
  /* Carousel */
  const [slideIndex, setSlideIndex] = useState(0);
  const nextSlide = useCallback(() => setSlideIndex((i) => (i + 1) % AD_SLIDES.length), []);
  useEffect(() => { const t = setInterval(nextSlide, 4500); return () => clearInterval(t); }, [nextSlide]);

  /* Filters */
  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");
  const [sort, setSort] = useState("featured");
  const [priceBucket, setPriceBucket] = useState<number | null>(null); // index into PRICE_BUCKETS
  const [priceMin, setPriceMin] = useState("");
  const [priceMax, setPriceMax] = useState("");
  const [customPriceApplied, setCustomPriceApplied] = useState(false);
  const [minRating, setMinRating] = useState(0); // 0=all, 1..5
  const [activeSeller, setActiveSeller] = useState("All Sellers");
  const [activeConditions, setActiveConditions] = useState<Condition[]>([]);
  const [availability, setAvailability] = useState("All");
  const [onSaleOnly, setOnSaleOnly] = useState(false);
  const [newOnly, setNewOnly] = useState(false);
  const [showMoreCats, setShowMoreCats] = useState(false);
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [page, setPage] = useState(1);

  /* Cart / wishlist / modals */
  const [cart, setCart] = useState<number[]>([]);
  const [wishlist, setWishlist] = useState<number[]>([]);
  const [cartOpen, setCartOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [modalMode, setModalMode] = useState<"sell" | "checkout" | null>(null);
  const [verifyInput, setVerifyInput] = useState("");
  const [verifyStatus, setVerifyStatus] = useState<"idle" | "loading" | "error">("idle");
  const [verifyError, setVerifyError] = useState("");
  const [verifiedMember, setVerifiedMember] = useState<VerifiedMember | null>(null);
  const [sellStep, setSellStep] = useState<"verify" | "form" | "success">("verify");
  const [listForm, setListForm] = useState({ name: "", description: "", price: "", category: "", quantityLeft: "", imageUrl: "", otherInformation: "", tags: "" });
  const [listStatus, setListStatus] = useState<"idle" | "loading" | "error">("idle");
  const [listError, setListError] = useState("");

  const productsRef = useRef<HTMLDivElement>(null);

  /* Compute effective price range */
  const effectivePriceMin = useMemo(() => {
    if (customPriceApplied && priceMin) return parseFloat(priceMin);
    if (priceBucket !== null) return PRICE_BUCKETS[priceBucket].min;
    return 0;
  }, [customPriceApplied, priceMin, priceBucket]);

  const effectivePriceMax = useMemo(() => {
    if (customPriceApplied && priceMax) return parseFloat(priceMax);
    if (priceBucket !== null) return PRICE_BUCKETS[priceBucket].max;
    return Infinity;
  }, [customPriceApplied, priceMax, priceBucket]);

  /* Filter count helpers — count products matching all OTHER filters except the target dimension */
  const countFor = useCallback((predicate: (p: Product) => boolean) => {
    return PRODUCTS.filter((p) => {
      const num = priceToNum(p.price);
      const matchSearch = !search || p.name.toLowerCase().includes(search.toLowerCase()) || p.description.toLowerCase().includes(search.toLowerCase()) || p.tags.some((t) => t.toLowerCase().includes(search.toLowerCase()));
      return matchSearch && predicate(p);
    }).length;
  }, [search]);

  /* Filtered + sorted products */
  const filtered = useMemo(() => {
    let list = PRODUCTS.filter((p) => {
      const num = priceToNum(p.price);
      const matchCat = activeCategory === "All" || p.category === activeCategory;
      const matchSearch = !search || p.name.toLowerCase().includes(search.toLowerCase()) || p.description.toLowerCase().includes(search.toLowerCase()) || p.tags.some((t) => t.toLowerCase().includes(search.toLowerCase()));
      const matchPrice = num >= effectivePriceMin && num <= effectivePriceMax;
      const matchRating = minRating === 0 || p.rating >= minRating;
      const matchSeller = activeSeller === "All Sellers" || p.seller === activeSeller;
      const matchCondition = activeConditions.length === 0 || activeConditions.includes(p.condition);
      const matchAvail = availability === "All" || (availability === "In Stock" && p.stock === "in_stock") || (availability === "Limited Stock" && p.stock === "limited");
      const matchSale = !onSaleOnly || p.onSale;
      const matchNew = !newOnly || p.isNew;
      return matchCat && matchSearch && matchPrice && matchRating && matchSeller && matchCondition && matchAvail && matchSale && matchNew;
    });
    if (sort === "price_asc") list = [...list].sort((a, b) => priceToNum(a.price) - priceToNum(b.price));
    if (sort === "price_desc") list = [...list].sort((a, b) => priceToNum(b.price) - priceToNum(a.price));
    if (sort === "rating_desc") list = [...list].sort((a, b) => b.rating - a.rating || b.ratingCount - a.ratingCount);
    if (sort === "newest") list = [...list].sort((a, b) => (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0));
    if (sort === "name_asc") list = [...list].sort((a, b) => a.name.localeCompare(b.name));
    return list;
  }, [search, activeCategory, effectivePriceMin, effectivePriceMax, minRating, activeSeller, activeConditions, availability, onSaleOnly, newOnly, sort]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / ITEMS_PER_PAGE));
  const paginated = filtered.slice((page - 1) * ITEMS_PER_PAGE, page * ITEMS_PER_PAGE);
  useEffect(() => { setPage(1); }, [search, activeCategory, effectivePriceMin, effectivePriceMax, minRating, activeSeller, activeConditions, availability, onSaleOnly, newOnly, sort]);

  const activeFilterCount = [
    activeCategory !== "All" ? 1 : 0,
    priceBucket !== null || customPriceApplied ? 1 : 0,
    minRating > 0 ? 1 : 0,
    activeSeller !== "All Sellers" ? 1 : 0,
    activeConditions.length,
    availability !== "All" ? 1 : 0,
    onSaleOnly ? 1 : 0,
    newOnly ? 1 : 0,
  ].reduce((a, b) => a + b, 0);

  function clearAllFilters() {
    setActiveCategory("All"); setPriceBucket(null); setPriceMin(""); setPriceMax(""); setCustomPriceApplied(false);
    setMinRating(0); setActiveSeller("All Sellers"); setActiveConditions([]); setAvailability("All"); setOnSaleOnly(false); setNewOnly(false); setSearch("");
  }
  function clearPriceFilter() { setPriceBucket(null); setPriceMin(""); setPriceMax(""); setCustomPriceApplied(false); }
  function toggleCondition(c: Condition) { setActiveConditions((p) => p.includes(c) ? p.filter((x) => x !== c) : [...p, c]); }

  function goToPage(p: number) { setPage(p); productsRef.current?.scrollIntoView({ behavior: "smooth", block: "start" }); }
  const [favOpen, setFavOpen] = useState(false);
  useEffect(() => { try { const w = JSON.parse(localStorage.getItem("ros-market-favourites") || "[]"); if (Array.isArray(w)) setWishlist(w); } catch {} }, []);
  useEffect(() => { try { localStorage.setItem("ros-market-favourites", JSON.stringify(wishlist)); } catch {} }, [wishlist]);
  function addToCart(id: number, e?: React.MouseEvent) { e?.stopPropagation(); setCart((p) => [...p, id]); }
  function removeFromCart(index: number) { setCart((p) => p.filter((_, i) => i !== index)); }
  function runSlideAction(sl: { action: string; productId?: number }) {
    if (sl.action === "shop") productsRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    else if (sl.action === "product") { const pr = PRODUCTS.find((x) => x.id === sl.productId); if (pr) setSelectedProduct(pr); }
  }
  function toggleWishlist(id: number, e?: React.MouseEvent) { e?.stopPropagation(); setWishlist((p) => p.includes(id) ? p.filter((x) => x !== id) : [...p, id]); }

  function openModal(mode: "sell" | "checkout") {
    setModalMode(mode); setSellStep("verify"); setVerifyInput(""); setVerifyStatus("idle"); setVerifyError(""); setVerifiedMember(null);
    setListForm({ name: "", description: "", price: "", category: "", quantityLeft: "", imageUrl: "", otherInformation: "", tags: "" });
    setListStatus("idle"); setListError(""); setCartOpen(false);
  }
  function closeModal() { setModalMode(null); }

  async function handleVerify(e: React.FormEvent) {
    e.preventDefault();
    if (!verifyInput.trim()) return;
    setVerifyStatus("loading"); setVerifyError("");
    try {
      for (const endpoint of ["/users/member/search", "/users/e-member/search"]) {
        const res = await fetch(`${API_BASE}${endpoint}`, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ text: verifyInput.trim() }) });
        if (res.ok) {
          const data = await res.json();
          const users = Array.isArray(data) ? data : (data.content || data.data || []);
          if (users.length > 0) {
            const u = users[0];
            setVerifiedMember({ id: u.id, name: `${u.firstName} ${u.lastName}`, type: endpoint.includes("e-member") ? "emember" : "member" });
            setSellStep("form"); setVerifyStatus("idle"); return;
          }
        }
      }
      setVerifyStatus("error"); setVerifyError("No church member found. Please register first.");
    } catch { setVerifyStatus("error"); setVerifyError("Could not verify membership. Please try again."); }
  }

  async function handleListProduct(e: React.FormEvent) {
    e.preventDefault();
    if (!verifiedMember) return;
    setListStatus("loading"); setListError("");
    try {
      const body: Record<string, unknown> = { name: listForm.name, description: listForm.description, owner: verifiedMember.id, price: parseFloat(listForm.price), category: listForm.category, quantityLeft: parseInt(listForm.quantityLeft) || 1 };
      if (listForm.imageUrl.trim()) body.images = [listForm.imageUrl.trim()];
      if (listForm.otherInformation.trim()) body.otherInformation = listForm.otherInformation.trim();
      if (listForm.tags.trim()) body.tags = listForm.tags.split(",").map((t) => t.trim()).filter(Boolean);
      await fetch(`${API_BASE}/products`, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(body) });
      setSellStep("success"); setListStatus("idle");
    } catch { setListStatus("error"); setListError("Failed to submit. Please try again."); }
  }

  const inputBase = "w-full rounded-lg border border-[#E5E7EB] px-4 py-3 text-sm text-[#374151] outline-none placeholder:text-[#9CA3AF] focus:border-[#000080] focus:ring-1 focus:ring-[#000080]";

  /* ──────────── RENDER ──────────── */
  return (
    <main className="bg-[#FFFDFD] min-h-screen pb-[84px] md:pb-0">

      {/* ── NAVBAR + CAROUSEL ── */}
      <AppHeader cartCount={cart.length} favCount={wishlist.length} onCart={() => { setFavOpen(false); setCartOpen(!cartOpen); }} onFav={() => { setCartOpen(false); setFavOpen(!favOpen); }} onSell={() => openModal("sell")} />

      <section className="relative w-full overflow-hidden">

        {/* BANNER */}
        <div className="px-4 md:px-10 pt-4 pb-0">
          <div className="w-full rounded-[12px]">
            <div className="relative w-full rounded-[12px] overflow-hidden min-h-[200px] md:min-h-[300px] flex flex-col md:flex-row items-stretch transition-all duration-500"
              style={{ background: `linear-gradient(120deg, ${AD_SLIDES[slideIndex].bgFrom} 0%, ${AD_SLIDES[slideIndex].bgTo} 100%)` }}>
              {/* Visual */}
              <div className="relative flex items-center justify-center w-full md:w-[42%] min-h-[160px] md:min-h-[300px] overflow-hidden flex-shrink-0">
                {(AD_SLIDES[slideIndex] as { image?: string }).image ? (
                  <>
                    <div className="absolute inset-0 opacity-10" style={{ background: `radial-gradient(ellipse at 50% 120%, ${AD_SLIDES[slideIndex].borderColor} 0%, transparent 70%)` }} />
                    <img src={(AD_SLIDES[slideIndex] as { image?: string }).image} alt="" className="relative z-10 max-h-[160px] md:max-h-[260px] w-auto object-contain drop-shadow-2xl" />
                  </>
                ) : (AD_SLIDES[slideIndex] as { visual?: string }).visual === "store" ? (
                  <div className="relative z-10 flex items-end justify-center h-[160px] md:h-[240px] w-full px-6">
                    <div className="absolute inset-0 opacity-10" style={{ background: `radial-gradient(ellipse at 50% 100%, ${AD_SLIDES[slideIndex].borderColor} 0%, transparent 70%)` }} />
                    {[{ label: "Reading", emoji: "📚", h: "100px", rot: "-6deg" }, { label: "Clothing", emoji: "👔", h: "120px", rot: "0deg" }, { label: "Food", emoji: "🍱", h: "90px", rot: "5deg" }].map((item) => (
                      <div key={item.label} className="flex flex-col items-center justify-end rounded-[16px] bg-white/70 backdrop-blur-sm border border-white/80 shadow-lg px-3 py-4 mx-1" style={{ height: item.h, transform: `rotate(${item.rot})` }}>
                        <span style={{ fontSize: "clamp(22px, 4vw, 36px)" }}>{item.emoji}</span>
                        <span className="text-[10px] md:text-[12px] font-semibold text-[#374151] mt-1 whitespace-nowrap">{item.label}</span>
                      </div>
                    ))}
                    <div className="absolute top-3 left-3 md:top-5 md:left-6 size-[56px] md:size-[72px] rounded-full flex flex-col items-center justify-center shadow-xl" style={{ background: AD_SLIDES[slideIndex].badgeBg }}>
                      <span className="text-white text-[9px] md:text-[10px] font-bold leading-tight">Members</span>
                      <span className="text-white text-[13px] md:text-[16px] font-black leading-tight">only</span>
                    </div>
                  </div>
                ) : (
                  <div className="relative z-10 flex items-end justify-center gap-3 h-[160px] md:h-[240px] w-full px-6">
                    <div className="absolute inset-0 opacity-10" style={{ background: `radial-gradient(ellipse at 50% 100%, ${AD_SLIDES[slideIndex].borderColor} 0%, transparent 70%)` }} />
                    {[{ label: "Marketing", emoji: "📣", h: "110px", rot: "-5deg" }, { label: "Design", emoji: "🎨", h: "130px", rot: "0deg" }, { label: "Business", emoji: "💼", h: "100px", rot: "4deg" }].map((item) => (
                      <div key={item.label} className="flex flex-col items-center justify-end rounded-[16px] bg-white/70 backdrop-blur-sm border border-white/80 shadow-lg px-3 py-4 mx-1" style={{ height: item.h, transform: `rotate(${item.rot})` }}>
                        <span style={{ fontSize: "clamp(22px, 4vw, 36px)" }}>{item.emoji}</span>
                        <span className="text-[10px] md:text-[12px] font-semibold text-[#374151] mt-1 whitespace-nowrap">{item.label}</span>
                      </div>
                    ))}
                    <div className="absolute top-3 left-3 md:top-5 md:left-6 size-[56px] md:size-[72px] rounded-full flex flex-col items-center justify-center shadow-xl" style={{ background: AD_SLIDES[slideIndex].badgeBg }}>
                      <span className="text-white text-[9px] md:text-[10px] font-bold leading-tight">100%</span>
                      <span className="text-white text-[12px] md:text-[14px] font-black leading-tight">free</span>
                    </div>
                  </div>
                )}
              </div>
              {/* Text */}
              <div className="flex flex-col justify-center gap-[10px] md:gap-[14px] px-5 md:px-8 py-5 md:py-7 flex-1 relative z-10">
                <div className="flex items-center gap-[8px]">
                  <div className="size-[32px] md:size-[40px] rounded-full flex items-center justify-center flex-shrink-0" style={{ background: AD_SLIDES[slideIndex].badgeBg }}>
                    <svg width="18" height="14" viewBox="0 0 25 23" fill="none"><path d="M2 2h3l3.5 14h12l3-10H7" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /><circle cx="10" cy="20" r="1.5" fill="white" /><circle cx="19" cy="20" r="1.5" fill="white" /></svg>
                  </div>
                  <span className="font-black text-[13px] md:text-[16px] tracking-wider" style={{ color: AD_SLIDES[slideIndex].badgeBg, fontVariationSettings: '"wdth" 100' }}>ROS Marketplace</span>
                </div>
                <h2 className="font-black text-[18px] md:text-[26px] lg:text-[32px] leading-tight text-[#100E1A] whitespace-pre-line" style={{ fontVariationSettings: '"wdth" 100' }}>{AD_SLIDES[slideIndex].title}</h2>
                <div className="rounded-[6px] px-3 py-[8px] md:px-4 md:py-[10px]" style={{ background: AD_SLIDES[slideIndex].taglineBg }}>
                  <p className="text-white font-bold text-[11px] md:text-[13px] leading-tight" style={{ fontVariationSettings: '"wdth" 100' }}>{AD_SLIDES[slideIndex].tagline}</p>
                </div>
                <div className="flex flex-col gap-[4px]">
                  {(() => { const sl = AD_SLIDES[slideIndex] as { cta: string; action: string; href?: string; productId?: number };
                    return sl.action === "link"
                      ? <Link href={sl.href!} className="self-start px-[18px] md:px-[24px] py-[9px] md:py-[11px] rounded-[6px] text-white font-black text-[12px] md:text-[15px] tracking-wide hover:opacity-90 transition-opacity cursor-pointer" style={{ background: AD_SLIDES[slideIndex].badgeBg, fontVariationSettings: '"wdth" 100' }}>{sl.cta}</Link>
                      : <button type="button" onClick={() => runSlideAction(sl)} className="self-start px-[18px] md:px-[24px] py-[9px] md:py-[11px] rounded-[6px] text-white font-black text-[12px] md:text-[15px] tracking-wide hover:opacity-90 transition-opacity cursor-pointer" style={{ background: AD_SLIDES[slideIndex].badgeBg, fontVariationSettings: '"wdth" 100' }}>{sl.cta}</button>; })()}
                  <p className="text-[#6B7280] text-[10px] md:text-[12px]" style={{ fontVariationSettings: '"wdth" 100' }}>{AD_SLIDES[slideIndex].note}</p>
                </div>
              </div>
            </div>
          </div>
          {/* Dots */}
          <div className="flex items-center justify-center gap-[8px] mt-[10px] pb-[4px]">
            {AD_SLIDES.map((sl, i) => (
              <button key={sl.id} onClick={() => setSlideIndex(i)} className="rounded-full transition-all duration-300"
                style={{ background: i === slideIndex ? AD_SLIDES[slideIndex].borderColor : "#D1D5DB", width: i === slideIndex ? "24px" : "7px", height: "7px" }} />
            ))}
          </div>
        </div>

        {/* SEARCH ROW */}
        <div className="px-4 md:px-10 py-[12px]">
          <div className="flex items-center gap-[10px] md:gap-[14px] bg-white rounded-[12px] px-[14px] py-[9px] shadow-[0_2px_12px_rgba(0,0,0,0.08)]">
            <div className="flex items-center gap-[10px] px-[14px] py-[6px] h-[42px] rounded-[30px] border-[1.5px] border-[#00003D] bg-[#FFFDFD] flex-1">
              <svg viewBox="0 0 21 21" fill="none" className="size-[17px] flex-shrink-0"><circle cx="9.5" cy="9.5" r="7.5" stroke="#00003D" strokeWidth="2" /><path d="M15.5 15.5l4 4" stroke="#00003D" strokeWidth="2" strokeLinecap="round" /></svg>
              <input type="text" placeholder="Search Product" value={search} onChange={(e) => setSearch(e.target.value)}
                className="bg-transparent outline-none text-[#00003D] font-bold text-[14px] md:text-[16px] placeholder:text-[#00003D]/60 w-full" style={vs} />
              {search && <button onClick={() => setSearch("")} className="text-[#00003D]/40 hover:text-[#00003D] text-[18px] leading-none flex-shrink-0">×</button>}
            </div>
          </div>
        </div>
      </section>

      {/* Favourites dropdown */}
      {favOpen && (
        <div className="fixed right-4 md:right-[60px] z-50 bg-white rounded-[20px] shadow-[0_8px_40px_rgba(0,0,0,0.15)] p-5 w-[min(340px,calc(100vw-32px))]" style={{ top: "68px" }}>
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-[#100E1A] text-[16px] font-bold" style={vs}>My favourites ({wishlist.length})</h3>
            <button onClick={() => setFavOpen(false)} className="text-[#A3A1AF] hover:text-[#100E1A] text-[20px] leading-none">×</button>
          </div>
          {wishlist.length === 0 ? <p className="text-[#A3A1AF] text-[14px] leading-[1.6]" style={vs}>You have no favourites yet. Tap the heart on any product to save it here.</p> : (
            <div className="flex max-h-[320px] flex-col gap-[10px] overflow-y-auto pr-1">
              {wishlist.map((id) => { const p = PRODUCTS.find((x) => x.id === id); return p ? (
                <div key={id} className="flex items-center gap-3">
                  <button onClick={() => { setSelectedProduct(p); setFavOpen(false); }} className="flex min-w-0 flex-1 items-center gap-3 text-left"><img src={p.image} alt={p.name} className="size-[44px] rounded-[8px] object-cover bg-[#F3F4F6]" /><div className="min-w-0"><p className="text-[#100E1A] text-[12px] font-bold truncate" style={vs}>{p.name}</p><p className="text-[#000080] text-[11px]" style={vs}>{p.price}</p></div></button>
                  <button onClick={() => addToCart(id)} className="rounded-full bg-[#000080] px-3 py-[6px] text-[11px] font-bold text-white hover:bg-[#0000a0]" style={vs}>Add to cart</button>
                  <button onClick={() => toggleWishlist(id)} aria-label={`Remove ${p.name} from favourites`} className="flex size-[28px] items-center justify-center rounded-full text-[#9CA3AF] hover:bg-red-50 hover:text-red-600">×</button>
                </div>) : null; })}
            </div>
          )}
        </div>
      )}

      {/* Cart dropdown */}
      {cartOpen && (
        <div className="fixed right-4 md:right-[60px] z-50 bg-white rounded-[20px] shadow-[0_8px_40px_rgba(0,0,0,0.15)] p-5 w-[min(340px,calc(100vw-32px))]" style={{ top: "68px" }}>
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-[#100E1A] text-[16px] font-bold" style={vs}>Cart ({cart.length} items)</h3>
            <button onClick={() => setCartOpen(false)} className="text-[#A3A1AF] hover:text-[#100E1A] text-[20px] leading-none">×</button>
          </div>
          {cart.length === 0 ? <p className="text-[#A3A1AF] text-[14px]" style={vs}>Your cart is empty.</p> : (
            <div className="flex flex-col gap-[8px]">
              <div className="flex max-h-[280px] flex-col gap-[8px] overflow-y-auto pr-1">
                {cart.map((id, i) => { const p = PRODUCTS.find((x) => x.id === id); return p ? (<div key={i} className="flex items-center gap-3"><img src={p.image} alt={p.name} className="size-[40px] rounded-[8px] object-cover bg-[#F3F4F6]" /><div className="flex-1 min-w-0"><p className="text-[#100E1A] text-[12px] font-bold truncate" style={vs}>{p.name}</p><p className="text-[#000080] text-[11px]" style={vs}>{p.price}</p></div><button onClick={() => removeFromCart(i)} aria-label={`Remove ${p.name} from the cart`} title="Remove" className="flex size-[30px] flex-shrink-0 items-center justify-center rounded-full text-[#9CA3AF] transition-colors hover:bg-red-50 hover:text-red-600"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" className="size-[17px]"><path strokeLinecap="round" strokeLinejoin="round" d="M4 7h16M10 11v6M14 11v6M6 7l1 12a1 1 0 001 1h8a1 1 0 001-1l1-12M9 7V4h6v3" /></svg></button></div>) : null; })}
              </div>
              <button onClick={() => openModal("checkout")} className="mt-2 w-full bg-[#000080] text-white text-[13px] font-bold py-[11px] rounded-[20px] hover:bg-[#0000a0] transition-colors" style={vs}>Proceed to Checkout</button>
            </div>
          )}
        </div>
      )}

      {/* Product detail modal */}
      {selectedProduct && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50" onClick={() => setSelectedProduct(null)}>
          <div className="bg-white rounded-[24px] p-6 md:p-8 w-full max-w-[500px] flex flex-col gap-4 shadow-2xl" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-start justify-between">
              <h2 className="text-[#100E1A] text-[20px] font-bold" style={vs}>{selectedProduct.name}</h2>
              <button onClick={() => setSelectedProduct(null)} className="text-[#A3A1AF] text-[24px] leading-none">×</button>
            </div>
            <div className="h-[240px] w-full rounded-[16px] overflow-hidden bg-[#F3F4F6]">
              <img src={selectedProduct.image} alt={selectedProduct.name} className="w-full h-full object-cover" />
            </div>
            <div className="flex items-center gap-2">
              <StarRow rating={selectedProduct.rating} />
              <span className="text-[13px] text-[#F59E0B] font-bold">{selectedProduct.rating.toFixed(1)}</span>
              <span className="text-[12px] text-[#9CA3AF]">({selectedProduct.ratingCount} reviews)</span>
            </div>
            <p className="text-[#6B7280] text-[14px] leading-[1.6]" style={vs}>{selectedProduct.description}</p>
            <div className="flex flex-wrap gap-2">
              {selectedProduct.tags.map((tag) => <span key={tag} className="px-3 py-1 bg-[#F3F4F6] rounded-full text-[12px] text-[#6B7280]" style={vs}>{tag}</span>)}
            </div>
            <div className="flex items-center justify-between">
              <div className="flex flex-col">
                <div className="bg-[#100E1A] px-5 py-[10px] rounded-[33px] self-start">
                  <span className="text-[#FFFDFD] text-[17px] font-black" style={vs}>{selectedProduct.price}</span>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <button onClick={(e) => toggleWishlist(selectedProduct.id, e)}>
                  <svg viewBox="0 0 37 32" fill="none" className="w-[34px] h-[28px]"><path d="M18.5 28S3 19.5 3 10.5C3 7 5.5 4 9 4c2.5 0 4.8 1.5 6 3.8a7.15 7.15 0 0 1 12 3.5c.5 6.3-8.5 16.7-8.5 16.7z" fill={wishlist.includes(selectedProduct.id) ? "#FF4D6D" : "none"} stroke={wishlist.includes(selectedProduct.id) ? "#FF4D6D" : "#100E1A"} strokeWidth="2" /></svg>
                </button>
                <button onClick={(e) => { addToCart(selectedProduct.id, e); setSelectedProduct(null); }} className="bg-[#000080] px-5 py-[10px] rounded-[24px] text-white text-[14px] font-bold hover:bg-[#0000a0]" style={vs}>Add to Cart</button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Sell / Checkout modal */}
      {modalMode && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50" onClick={closeModal}>
          <div className="bg-white rounded-[24px] p-6 md:p-8 w-full max-w-[520px] flex flex-col gap-5 shadow-2xl max-h-[90vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-start justify-between">
              <div><h2 className="text-[#100E1A] text-[20px] font-bold" style={vs}>{modalMode === "sell" ? "List a Product" : "Order request"}</h2>
                <p className="text-[#A3A1AF] text-[12px] mt-1" style={vs}>{modalMode === "sell" ? "Church members can list items for sale" : "ROS Marketplace"}</p></div>
              <button onClick={closeModal} className="text-[#A3A1AF] text-[24px] leading-none">×</button>
            </div>
            {modalMode === "sell" && sellStep === "verify" && (
              <form onSubmit={handleVerify} className="flex flex-col gap-4">
                <div className="bg-[#F3F4F6] rounded-[12px] p-4 flex items-start gap-3"><span className="text-[18px]">🔒</span><p className="text-[#374151] text-[13px] leading-[1.6]" style={vs}>Enter your registered phone number or email to verify church membership.</p></div>
                <div className="flex flex-col gap-1"><label className="text-[13px] font-semibold text-[#111827]">Phone or Email</label>
                  <input type="text" required value={verifyInput} onChange={(e) => setVerifyInput(e.target.value)} placeholder="e.g. 08012345678 or your@email.com" className={inputBase} style={vs} /></div>
                {verifyStatus === "error" && <div className="bg-red-50 border border-red-200 rounded-lg px-4 py-3 text-sm text-red-700" style={vs}>{verifyError}<br /><Link href="/first-timer" className="text-[#000080] font-medium underline">Register</Link> or <Link href="/e-member" className="text-[#000080] font-medium underline">become an e-member</Link></div>}
                <button type="submit" disabled={verifyStatus === "loading"} className="w-full bg-[#000080] text-white py-[13px] rounded-[24px] text-[14px] font-bold hover:bg-[#0000a0] disabled:opacity-60" style={vs}>{verifyStatus === "loading" ? "Verifying..." : "Verify Membership"}</button>
              </form>
            )}
            {sellStep === "form" && verifiedMember && modalMode === "sell" && (
              <form onSubmit={handleListProduct} className="flex flex-col gap-4">
                <div className="bg-green-50 border border-green-200 rounded-[10px] px-4 py-2 flex items-center gap-2"><span className="text-green-600 font-bold">✓</span><p className="text-green-700 text-[13px]" style={vs}>Verified: <strong>{verifiedMember.name}</strong></p></div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div className="flex flex-col gap-1 sm:col-span-2"><label className="text-[13px] font-semibold">Product Name *</label><input type="text" required value={listForm.name} onChange={(e) => setListForm(p => ({ ...p, name: e.target.value }))} className={inputBase} placeholder="e.g. Men's Leather Shoes" style={vs} /></div>
                  <div className="flex flex-col gap-1"><label className="text-[13px] font-semibold">Price (₦) *</label><input type="number" required min="0" step="0.01" value={listForm.price} onChange={(e) => setListForm(p => ({ ...p, price: e.target.value }))} className={inputBase} placeholder="5000" style={vs} /></div>
                  <div className="flex flex-col gap-1"><label className="text-[13px] font-semibold">Quantity *</label><input type="number" required min="1" value={listForm.quantityLeft} onChange={(e) => setListForm(p => ({ ...p, quantityLeft: e.target.value }))} className={inputBase} placeholder="1" style={vs} /></div>
                  <div className="flex flex-col gap-1 sm:col-span-2"><label className="text-[13px] font-semibold">Category *</label><select required value={listForm.category} onChange={(e) => setListForm(p => ({ ...p, category: e.target.value }))} className={`${inputBase} appearance-none cursor-pointer`} style={vs}><option value="">Select category</option>{PRODUCT_CATEGORIES_API.map((c) => <option key={c.value} value={c.value}>{c.label}</option>)}</select></div>
                  <div className="flex flex-col gap-1 sm:col-span-2"><label className="text-[13px] font-semibold">Description *</label><textarea required rows={3} value={listForm.description} onChange={(e) => setListForm(p => ({ ...p, description: e.target.value }))} className={`${inputBase} resize-none`} placeholder="Describe your product..." style={vs} /></div>
                  <div className="flex flex-col gap-1 sm:col-span-2"><label className="text-[13px] font-semibold">Image URL <span className="text-[#9CA3AF] font-normal">(optional)</span></label><input type="url" value={listForm.imageUrl} onChange={(e) => setListForm(p => ({ ...p, imageUrl: e.target.value }))} className={inputBase} placeholder="https://..." style={vs} /></div>
                  <div className="flex flex-col gap-1 sm:col-span-2"><label className="text-[13px] font-semibold">Tags <span className="text-[#9CA3AF] font-normal">(comma-separated)</span></label><input type="text" value={listForm.tags} onChange={(e) => setListForm(p => ({ ...p, tags: e.target.value }))} className={inputBase} placeholder="leather, formal, men" style={vs} /></div>
                  <div className="flex flex-col gap-1 sm:col-span-2"><label className="text-[13px] font-semibold">Other Info <span className="text-[#9CA3AF] font-normal">(optional)</span></label><textarea rows={2} value={listForm.otherInformation} onChange={(e) => setListForm(p => ({ ...p, otherInformation: e.target.value }))} className={`${inputBase} resize-none`} placeholder="Contact, pickup location..." style={vs} /></div>
                </div>
                {listStatus === "error" && <p className="text-red-600 text-[13px]" style={vs}>{listError}</p>}
                <div className="flex gap-3">
                  <button type="button" onClick={() => setSellStep("verify")} className="flex-1 border-2 border-[#000080] text-[#000080] py-[11px] rounded-[24px] text-[14px] font-bold" style={vs}>Back</button>
                  <button type="submit" disabled={listStatus === "loading"} className="flex-1 bg-[#000080] text-white py-[11px] rounded-[24px] text-[14px] font-bold disabled:opacity-60" style={vs}>{listStatus === "loading" ? "Submitting..." : "List Product"}</button>
                </div>
              </form>
            )}
            {modalMode === "checkout" && (
              <div className="flex flex-col items-center gap-4 py-2 text-center">
                <div className="size-[64px] rounded-full bg-green-100 flex items-center justify-center"><svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#16a34a" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12" /></svg></div>
                <p className="text-[#000080] text-[20px] font-bold" style={vs}>Request Submitted Successfully!</p>
                <p className="text-[#374151] text-[14px] leading-[1.6]" style={vs}>Thank you for shopping on ROS Marketplace. Your order request has been received successfully.</p>
                <div className="w-full rounded-[10px] bg-[#000080]/5 p-4"><p className="text-[#100E1A] text-[13px] leading-[1.6]" style={vs}><strong>Next step:</strong> Please proceed to Just As New to make your payment and claim your order.</p></div>
                <button onClick={() => { setCart([]); closeModal(); }} className="w-full rounded-[24px] border border-[#000080] py-[13px] text-[14px] font-bold text-[#000080] transition-colors hover:bg-[#000080] hover:text-white" style={vs}>Continue Shopping</button>
              </div>
            )}
            {modalMode === "sell" && sellStep === "success" && (
              <div className="flex flex-col gap-4 items-center text-center py-4">
                <div className="size-[64px] rounded-full bg-green-100 flex items-center justify-center"><svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#16a34a" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12" /></svg></div>
                <p className="text-[#000080] text-[18px] font-bold" style={vs}>Product Submitted!</p>
                <p className="text-[#6B7280] text-[13px] leading-[1.6]" style={vs}>Your listing is pending admin approval and will appear in the marketplace once approved.</p>
                <button onClick={closeModal} className="w-full bg-[#000080] text-white py-[13px] rounded-[24px] text-[14px] font-bold" style={vs}>Done</button>
              </div>
            )}
          </div>
        </div>
      )}

      {/* ── PRODUCTS ── */}
      <div id="products" ref={productsRef} className="flex flex-col md:flex-row gap-0 md:gap-6 px-0 md:px-[28px] lg:px-[40px] py-[16px] md:py-[24px] w-full">

        {/* Product area */}
        <div className="flex-1 min-w-0 px-4 md:px-0">
          {/* Toolbar */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 mb-4">
            <div className="flex items-center gap-3 flex-wrap">
              <p className="text-[#6B7280] text-[13px]" style={vs}>
                <span className="font-bold text-[#100E1A]">{filtered.length}</span> result{filtered.length !== 1 ? "s" : ""}
                {activeCategory !== "All" && <span className="ml-1">in <span className="text-[#000080] font-semibold">{activeCategory}</span></span>}
                {search && <span className="ml-1">for &ldquo;<span className="text-[#000080] font-semibold">{search}</span>&rdquo;</span>}
              </p>
              {activeFilterCount > 0 && <button onClick={clearAllFilters} className="text-[11px] text-red-500 underline hidden md:block" style={vs}>Clear all</button>}
            </div>
            <div className="flex items-center gap-2 self-end sm:self-auto">
              <select value={activeCategory} onChange={(e) => setActiveCategory(e.target.value)} aria-label="Category" className="text-[12px] border border-[#D1D5DB] rounded-[8px] px-2 py-[6px] text-[#374151] bg-white outline-none focus:border-[#000080] cursor-pointer" style={vs}>
                {CATEGORIES.map((c) => <option key={c} value={c}>{c === "All" ? "All categories" : c}</option>)}
              </select>
              <select value={sort} onChange={(e) => setSort(e.target.value)} className="text-[12px] border border-[#D1D5DB] rounded-[8px] px-2 py-[6px] text-[#374151] bg-white outline-none focus:border-[#000080] cursor-pointer" style={vs}>
                {SORT_OPTIONS.map((o) => <option key={o.value} value={o.value}>{o.label}</option>)}
              </select>
              <div className="flex items-center border border-[#D1D5DB] rounded-[8px] overflow-hidden">
                <button onClick={() => setViewMode("grid")} className={["px-[9px] py-[6px]", viewMode === "grid" ? "bg-[#000080] text-white" : "text-[#6B7280] bg-white"].join(" ")} aria-label="Grid">
                  <svg viewBox="0 0 16 16" className="size-[13px]" fill="currentColor"><rect x="1" y="1" width="6" height="6" rx="1" /><rect x="9" y="1" width="6" height="6" rx="1" /><rect x="1" y="9" width="6" height="6" rx="1" /><rect x="9" y="9" width="6" height="6" rx="1" /></svg>
                </button>
                <button onClick={() => setViewMode("list")} className={["px-[9px] py-[6px]", viewMode === "list" ? "bg-[#000080] text-white" : "text-[#6B7280] bg-white"].join(" ")} aria-label="List">
                  <svg viewBox="0 0 16 16" className="size-[13px]" fill="currentColor"><rect x="1" y="2" width="14" height="2.5" rx="1" /><rect x="1" y="6.75" width="14" height="2.5" rx="1" /><rect x="1" y="11.5" width="14" height="2.5" rx="1" /></svg>
                </button>
              </div>
            </div>
          </div>

          {/* Active filter chips */}
          {activeFilterCount > 0 && (
            <div className="flex flex-wrap gap-2 mb-4">
              {activeCategory !== "All" && <Chip label={activeCategory} onRemove={() => setActiveCategory("All")} />}
              {(priceBucket !== null) && <Chip label={PRICE_BUCKETS[priceBucket].label} onRemove={clearPriceFilter} />}
              {customPriceApplied && <Chip label={`₦${priceMin || "0"} – ₦${priceMax || "∞"}`} onRemove={clearPriceFilter} />}
              {minRating > 0 && <Chip label={`${minRating}★ & Up`} onRemove={() => setMinRating(0)} />}
              {activeSeller !== "All Sellers" && <Chip label={activeSeller} onRemove={() => setActiveSeller("All Sellers")} />}
              {activeConditions.map((c) => <Chip key={c} label={c === "new" ? "New" : c === "used" ? "Used" : "Refurbished"} onRemove={() => toggleCondition(c)} />)}
              {availability !== "All" && <Chip label={availability} onRemove={() => setAvailability("All")} />}
              {newOnly && <Chip label="New Arrivals" onRemove={() => setNewOnly(false)} />}
            </div>
          )}

          {/* Results */}
          {filtered.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-[360px] gap-4">
              <span className="text-[44px]">🔍</span>
              <p className="text-[#A3A1AF] text-[16px]" style={vs}>No products match your filters.</p>
              <button onClick={clearAllFilters} className="text-[#000080] text-[13px] font-semibold underline" style={vs}>Clear all filters</button>
            </div>
          ) : viewMode === "grid" ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-[14px] md:gap-[20px]">
              {paginated.map((product) => (
                <div key={product.id} onClick={() => setSelectedProduct(product)}
                  className="bg-white rounded-[20px] p-[13px] flex flex-col gap-[18px] shadow-[-4px_-4px_2px_rgba(0,0,0,0.05),4px_4px_2px_rgba(0,0,0,0.05)] cursor-pointer hover:shadow-[-4px_-4px_8px_rgba(0,0,128,0.08),4px_4px_8px_rgba(0,0,128,0.08)] transition-shadow group">
                  <div className="relative h-[200px] md:h-[240px] w-full rounded-[16px] overflow-hidden bg-[#F3F4F6]">
                    <img src={product.image} alt={product.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" loading="lazy" />
                    <div className="absolute top-2 left-2 flex flex-col gap-1">
                      {product.isNew && <span className="bg-[#000080] text-white text-[9px] font-bold px-[6px] py-[2px] rounded-full tracking-wide">New</span>}
                      {product.stock === "limited" && <span className="bg-[#D97706] text-white text-[9px] font-bold px-[6px] py-[2px] rounded-full">Low Stock</span>}
                    </div>
                    <button onClick={(e) => { toggleWishlist(product.id, e); }} className="absolute top-2 right-2 size-[30px] bg-white/80 backdrop-blur-sm rounded-full flex items-center justify-center shadow-sm hover:bg-white transition-colors">
                      <svg viewBox="0 0 20 18" fill="none" className="size-[14px]"><path d="M10 16S1.5 10.5 1.5 5.5C1.5 3.5 3 2 5 2c1.4 0 2.7.9 3.4 2.2A3.82 3.82 0 0 1 15 6.2C15.3 9.8 10 16 10 16z" fill={wishlist.includes(product.id) ? "#FF4D6D" : "none"} stroke={wishlist.includes(product.id) ? "#FF4D6D" : "#6B7280"} strokeWidth="1.5" /></svg>
                    </button>
                  </div>
                  <div className="flex flex-col gap-[12px]">
                    <div>
                      <h3 className="text-black font-bold text-[16px] md:text-[18px] leading-tight" style={vs}>{product.name}</h3>
                      <p className="text-[#6B7280] text-[12px] md:text-[13px] mt-1 line-clamp-2" style={vs}>{product.description}</p>
                      <div className="flex items-center gap-1 mt-1">
                        <StarRow rating={product.rating} />
                        <span className="text-[11px] text-[#F59E0B] font-bold">{product.rating.toFixed(1)}</span>
                        <span className="text-[11px] text-[#9CA3AF]">({product.ratingCount})</span>
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex flex-col">
                        <div className="bg-[#100E1A] px-[16px] md:px-[22px] py-[9px] md:py-[11px] rounded-[33px]">
                          <span className="text-[#FFFDFD] text-[13px] md:text-[15px] font-black" style={vs}>{product.price}</span>
                        </div>
                      </div>
                      <button onClick={(e) => addToCart(product.id, e)} className="bg-[#00003D] size-[38px] md:size-[42px] rounded-[24px] flex items-center justify-center hover:bg-[#000080] transition-colors">
                        <svg viewBox="0 0 25 23" fill="none" className="size-[17px]"><path d="M2 2h3l3.5 14h12l3-10H7" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /><circle cx="10" cy="20" r="1.5" fill="white" /><circle cx="19" cy="20" r="1.5" fill="white" /></svg>
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="flex flex-col gap-[10px]">
              {paginated.map((product) => (
                <div key={product.id} onClick={() => setSelectedProduct(product)}
                  className="bg-white rounded-[16px] p-[12px] flex items-center gap-4 shadow-[-2px_-2px_2px_rgba(0,0,0,0.04),2px_2px_2px_rgba(0,0,0,0.04)] cursor-pointer hover:shadow-[-2px_-2px_6px_rgba(0,0,128,0.07),2px_2px_6px_rgba(0,0,128,0.07)] transition-shadow group">
                  <div className="relative size-[90px] md:size-[100px] rounded-[12px] overflow-hidden flex-shrink-0 bg-[#F3F4F6]">
                    <img src={product.image} alt={product.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" loading="lazy" />
                    {product.isNew && <span className="absolute top-1 left-1 bg-[#000080] text-white text-[8px] font-bold px-1.5 py-0.5 rounded-full">New</span>}
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="text-black font-bold text-[15px] md:text-[17px] leading-tight" style={vs}>{product.name}</h3>
                    <div className="flex items-center gap-1 mt-[2px]"><StarRow rating={product.rating} /><span className="text-[11px] text-[#F59E0B] font-bold">{product.rating.toFixed(1)}</span><span className="text-[11px] text-[#9CA3AF]">({product.ratingCount})</span></div>
                    <p className="text-[#6B7280] text-[12px] mt-1 line-clamp-1" style={vs}>{product.description}</p>
                    {product.stock === "limited" && <span className="text-[10px] text-[#D97706] font-semibold">Low Stock</span>}
                  </div>
                  <div className="flex items-center gap-2 flex-shrink-0">
                    <div className="flex flex-col items-end">
                      <div className="bg-[#100E1A] px-3 py-[8px] rounded-[33px]"><span className="text-white text-[13px] md:text-[15px] font-black" style={vs}>{product.price}</span></div>
                    </div>
                    <button onClick={(e) => toggleWishlist(product.id, e)}><svg viewBox="0 0 20 18" fill="none" className="size-[18px]"><path d="M10 16S1.5 10.5 1.5 5.5C1.5 3.5 3 2 5 2c1.4 0 2.7.9 3.4 2.2A3.82 3.82 0 0 1 15 6.2C15.3 9.8 10 16 10 16z" fill={wishlist.includes(product.id) ? "#FF4D6D" : "none"} stroke={wishlist.includes(product.id) ? "#FF4D6D" : "#6B7280"} strokeWidth="1.5" /></svg></button>
                    <button onClick={(e) => addToCart(product.id, e)} className="bg-[#00003D] size-[36px] rounded-[24px] flex items-center justify-center hover:bg-[#000080]">
                      <svg viewBox="0 0 25 23" fill="none" className="size-[15px]"><path d="M2 2h3l3.5 14h12l3-10H7" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /><circle cx="10" cy="20" r="1.5" fill="white" /><circle cx="19" cy="20" r="1.5" fill="white" /></svg>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex items-center justify-between mt-8 flex-wrap gap-4">
              <p className="text-[#6B7280] text-[12px]" style={vs}>Page <span className="font-bold text-[#100E1A]">{page}</span> of {totalPages} · {filtered.length} results</p>
              <div className="flex items-center gap-2">
                <button onClick={() => goToPage(page - 1)} disabled={page === 1} className="size-[34px] rounded-[8px] border border-[#D1D5DB] flex items-center justify-center text-[#374151] hover:border-[#000080] hover:text-[#000080] disabled:opacity-30 bg-white">
                  <svg viewBox="0 0 10 16" className="size-[9px]" fill="none"><path d="M8 2L2 8l6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>
                </button>
                {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => {
                  const near = Math.abs(p - page) <= 1 || p === 1 || p === totalPages;
                  const isDot = !near && (p === page - 2 || p === page + 2);
                  if (isDot) return <span key={p} className="text-[#9CA3AF] text-[13px] px-1">…</span>;
                  if (!near) return null;
                  return <button key={p} onClick={() => goToPage(p)} className={["size-[34px] rounded-[8px] border text-[13px] font-bold transition-colors", p === page ? "bg-[#000080] border-[#000080] text-white" : "bg-white border-[#D1D5DB] text-[#374151] hover:border-[#000080]"].join(" ")} style={vs}>{p}</button>;
                })}
                <button onClick={() => goToPage(page + 1)} disabled={page === totalPages} className="size-[34px] rounded-[8px] border border-[#D1D5DB] flex items-center justify-center text-[#374151] hover:border-[#000080] hover:text-[#000080] disabled:opacity-30 bg-white">
                  <svg viewBox="0 0 10 16" className="size-[9px]" fill="none"><path d="M2 2l6 6-6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Why Shop With Us */}
      <section className="bg-[#100E1A] px-6 md:px-[60px] lg:px-[120px] py-[60px] md:py-[80px]">
        <div className="text-center mb-10"><p className="text-[#B5B5F3] text-[12px] tracking-[0.2em] font-medium" style={vs}>The ROS Difference</p><h2 className="text-[#FFFDFD] text-[22px] md:text-[34px] font-bold mt-2" style={vs}>Why Shop With Us</h2><p className="mx-auto mt-3 max-w-[560px] text-[#A3A1AF] text-[14px] md:text-[15px] leading-[1.7]" style={vs}>Our church marketplace offers more than just products. It&apos;s a place of purpose, value and community.</p></div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {[{ icon: "🛡️", title: "Trusted Sellers", desc: "Shop confidently from verified vendors within the ROS community." }, { icon: "💰", title: "Affordable Prices", desc: "Great products at prices that fit your budget." }, { icon: "🛍️", title: "Easy Shopping", desc: "A comfortable, simple and stress-free shopping experience." }, { icon: "🤝", title: "A Supportive Community", desc: "Every purchase helps support the church and its ministry." }].map((f) => (
            <div key={f.title} className="bg-[#1A1826] rounded-[18px] p-5 flex flex-col gap-3 border border-[#B5B5F3]/10">
              <span className="text-[28px]">{f.icon}</span>
              <p className="text-[#FFFDFD] text-[14px] font-bold" style={vs}>{f.title}</p>
              <p className="text-[#A3A1AF] text-[12px] leading-[1.6]" style={vs}>{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* For sellers */}
      <section className="bg-[#EEF0F7] px-6 md:px-[60px] lg:px-[120px] py-[60px] md:py-[80px]">
        <div className="flex flex-col lg:flex-row gap-10 lg:gap-[80px] items-center">
          <div className="flex flex-col gap-5 flex-1">
            <p className="text-[#000080] text-[12px] tracking-[0.2em] font-medium" style={vs}>For Sellers</p>
            <h2 className="text-[#100E1A] text-[22px] md:text-[34px] font-bold" style={vs}>Share your products or services on the ROS Marketplace.</h2>
            <p className="text-[#6B7280] text-[15px] leading-[1.7]" style={vs}>Reach the community, grow your business, and bless others with your God-given gifts.</p>
            <blockquote className="border-l-4 border-[#000080] pl-4 text-[#374151] text-[14px] italic leading-[1.7]" style={vs}>
              &ldquo;Each of you should use whatever gift you have received to serve others, as faithful stewards of God&apos;s grace in its various forms.&rdquo;
              <footer className="mt-1 text-[13px] not-italic font-semibold text-[#000080]">1 Peter 4:10 NIV</footer>
            </blockquote>
          </div>
          <div className="flex-1 bg-white rounded-[24px] p-8 shadow-[0_8px_40px_rgba(0,0,128,0.10)] flex flex-col gap-5 items-center justify-center text-center">
            <span className="text-[44px]">🛍️</span>
            <h3 className="text-[#100E1A] text-[20px] font-bold" style={vs}>Ready to put your gifts to work?</h3>
            <p className="text-[#6B7280] text-[14px] leading-[1.7]" style={vs}>Verify your church membership and list your product or service in just a few minutes.</p>
            <button onClick={() => openModal("sell")} className="w-full py-[14px] bg-[#000080] text-white text-[15px] font-bold rounded-[30px] hover:bg-[#0000a0]" style={vs}>List an Item Now →</button>
            <p className="text-[#9CA3AF] text-[11px]" style={vs}>Exclusively for registered church members.</p>
          </div>
        </div>
      </section>

      <div className="bg-[#100E1A] px-6 py-5 text-center text-[13px] font-semibold tracking-wide text-[#B5B5F3] md:text-[14px]" style={vs}>Shop • Support • Build God&apos;s Kingdom.</div>

      <AppFooter
        cartCount={cart.length}
        onSell={() => openModal("sell")}
        onCart={() => setCartOpen(true)}
      />
    </main>
  );
}


/* ─────────────── APP-STYLE HEADER ─────────────── */
function AppHeader({ cartCount, favCount, onCart, onFav, onSell }: { cartCount: number; favCount: number; onCart: () => void; onFav: () => void; onSell: () => void }) {
  return (
    <header className="sticky top-0 z-40 border-b border-[#E5E7EB] bg-white/95 backdrop-blur">
      <div className="mx-auto flex h-[58px] max-w-[1400px] items-center gap-3 px-4 md:h-[64px] md:px-10">
        <Link
          href="/"
          aria-label="Back to the church website"
          className="flex size-[38px] flex-shrink-0 items-center justify-center rounded-full bg-[#F3F4F6] text-[#00003D] transition-colors hover:bg-[#E5E7EB]"
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" className="size-[18px]">
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 5l-7 7 7 7" />
          </svg>
        </Link>
        <div className="flex min-w-0 items-center gap-[10px]">
          <img src="/ros-logo.png" alt="RCCG Rose of Sharon" className="size-[34px] flex-shrink-0 object-contain" />
          <div className="flex min-w-0 flex-col leading-tight">
            <span className="truncate text-[15px] font-black tracking-wide text-[#00003D] md:text-[17px]" style={vs}>ROS Marketplace</span>
            <span className="hidden text-[11px] text-[#6B7280] sm:block" style={vs}>RCCG Rose of Sharon</span>
          </div>
        </div>
        <div className="ml-auto flex items-center gap-2 md:gap-3">
          <button
            onClick={onSell}
            className="hidden rounded-[30px] bg-[#000080] px-[20px] py-[9px] text-[13px] font-bold text-white transition-colors hover:bg-[#0000a0] md:inline-flex"
            style={vs}
          >
            + Sell an item
          </button>
          <button
            onClick={onFav}
            aria-label="Open favourites"
            title="My favourites"
            className="relative flex size-[42px] items-center justify-center rounded-full text-[#100E1A] transition-colors hover:bg-[#F3F4F6]"
          >
            <svg viewBox="0 0 24 24" fill={favCount > 0 ? "#DC2626" : "none"} stroke={favCount > 0 ? "#DC2626" : "currentColor"} strokeWidth="1.9" className="size-[23px]"><path strokeLinecap="round" strokeLinejoin="round" d="M12 20S3.5 14.5 3.5 8.8C3.5 6.2 5.5 4.5 7.8 4.5c1.7 0 3.4.9 4.2 2.6.8-1.7 2.5-2.6 4.2-2.6 2.3 0 4.3 1.7 4.3 4.3C20.5 14.5 12 20 12 20z" /></svg>
            {favCount > 0 && <span className="absolute right-0 top-0 flex h-[18px] min-w-[18px] items-center justify-center rounded-full bg-[#DC2626] px-[3px] text-[10px] font-bold text-white" style={vs}>{favCount}</span>}
          </button>
          <button
            onClick={onCart}
            aria-label="Open cart"
            className="relative flex size-[42px] items-center justify-center rounded-full text-[#100E1A] transition-colors hover:bg-[#F3F4F6]"
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" className="size-[24px]">
              <path strokeLinecap="round" strokeLinejoin="round" d="M3 4h2.5l2.4 11h10.2l2.3-8H7" />
              <circle cx="9.5" cy="19.5" r="1.4" fill="currentColor" />
              <circle cx="17" cy="19.5" r="1.4" fill="currentColor" />
            </svg>
            <span className="absolute right-0 top-0 flex h-[18px] min-w-[18px] items-center justify-center rounded-full bg-[#000080] px-[3px] text-[10px] font-bold text-white" style={vs}>
              {cartCount}
            </span>
          </button>
        </div>
      </div>
    </header>
  );
}

/* ─────────────── APP-STYLE FOOTER (tab bar on mobile, slim bar on desktop) ─────────────── */
function AppFooter({ cartCount, onSell, onCart }: { cartCount: number; onSell: () => void; onCart: () => void }) {
  const tab = "relative flex flex-1 flex-col items-center justify-center gap-[2px] py-[9px] text-[10px] font-semibold text-[#6B7280] active:scale-95 transition-transform";
  const icon = "size-[22px]";
  const badge = "absolute right-[26%] top-[4px] flex h-[16px] min-w-[16px] items-center justify-center rounded-full bg-[#000080] px-[3px] text-[9px] font-bold text-white";
  return (
    <>
      {/* Mobile bottom tab bar */}
      <nav className="fixed bottom-0 left-0 right-0 z-40 border-t border-[#E5E7EB] bg-white/95 pb-[env(safe-area-inset-bottom)] backdrop-blur md:hidden" style={vs}>
        <div className="mx-auto flex max-w-[520px] items-end px-2">
          <button onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })} className={tab + " !text-[#000080]"}>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" className={icon}><path strokeLinecap="round" strokeLinejoin="round" d="M4 11l8-7 8 7v8a1 1 0 01-1 1h-4v-6H9v6H5a1 1 0 01-1-1v-8z" /></svg>
            Shop
          </button>
          <button onClick={onSell} className="flex flex-1 flex-col items-center gap-[2px] pb-[7px] text-[10px] font-semibold text-[#000080] active:scale-95 transition-transform">
            <span className="-mt-[22px] flex size-[52px] items-center justify-center rounded-full bg-[#000080] text-[30px] font-light leading-none text-white shadow-[0_6px_16px_rgba(0,0,128,0.35)]">+</span>
            Sell
          </button>
          <button onClick={onCart} className={tab}>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" className={icon}><path strokeLinecap="round" strokeLinejoin="round" d="M3 4h2.5l2.4 11h10.2l2.3-8H7" /><circle cx="9.5" cy="19.5" r="1.3" fill="currentColor" /><circle cx="17" cy="19.5" r="1.3" fill="currentColor" /></svg>
            Cart
            {cartCount > 0 && <span className={badge}>{cartCount}</span>}
          </button>
          <Link href="/" className={tab}>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" className={icon}><path strokeLinecap="round" strokeLinejoin="round" d="M12 3v4M10 5h4M5 21V11l7-4 7 4v10M9 21v-5a3 3 0 016 0v5" /></svg>
            Church
          </Link>
        </div>
      </nav>

      {/* Desktop slim footer */}
      <footer className="hidden border-t border-[#E5E7EB] bg-white md:block" style={vs}>
        <div className="mx-auto flex max-w-[1400px] items-center justify-between gap-4 px-10 py-4">
          <div className="flex items-center gap-[10px]">
            <img src="/ros-logo.png" alt="" className="size-[24px] object-contain" />
            <span className="text-[12px] text-[#6B7280]">© {new Date().getFullYear()} RCCG Rose of Sharon · ROS Marketplace</span>
          </div>
          <nav className="flex items-center gap-5 text-[12px] font-semibold text-[#374151]">
            <Link href="/" className="hover:text-[#000080]">Church website</Link>
            <Link href="/give" className="hover:text-[#000080]">Give</Link>
            <Link href="/ql" className="hover:text-[#000080]">Quick links</Link>
            <button onClick={onSell} className="hover:text-[#000080]">Sell an item</button>
          </nav>
        </div>
      </footer>
    </>
  );
}

/* Small helper chip component */
function Chip({ label, onRemove }: { label: string; onRemove: () => void }) {
  return (
    <span className="flex items-center gap-1 bg-[#000080]/10 text-[#000080] text-[12px] font-medium px-3 py-[4px] rounded-full" style={vs}>
      {label}
      <button onClick={onRemove} className="ml-[2px] text-[#000080]/60 hover:text-[#000080] text-[14px] leading-none">×</button>
    </span>
  );
}
