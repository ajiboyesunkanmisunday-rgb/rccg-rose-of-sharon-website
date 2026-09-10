"use client";

import { useState, useMemo, useEffect, useCallback, useRef } from "react";
import Link from "next/link";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { API_BASE } from "@/lib/api";

const vs = { fontVariationSettings: '"wdth" 100' };

/* ── Ad carousel ── */
const AD_SLIDES = [
  {
    id: 1, bgFrom: "#E8F0FF", bgTo: "#D4E0F5", borderColor: "#000080",
    badge: "MEMBER EXCLUSIVE", badgeBg: "#000080",
    title: "SHOP WITHIN\nTHE FAMILY",
    tagline: "QUALITY GOODS FROM YOUR CHURCH COMMUNITY AT VERY AFFORDABLE PRICES",
    taglineBg: "#000080", cta: "SHOP NOW", ctaHref: "#products",
    note: "Open to all church members", visual: "store" as const,
  },
  {
    id: 2, bgFrom: "#FFF8E8", bgTo: "#FFF0CC", borderColor: "#D97706",
    badge: "FEATURED BOOK", badgeBg: "#B45309",
    title: "PURPOSE\nDRIVEN LIFE",
    tagline: "BY RICK WARREN — AVAILABLE NOW IN THE MARKETPLACE",
    taglineBg: "#D97706", cta: "BUY NOW — ₦4,000", ctaHref: "#products",
    note: "Limited stock available",
    image: "https://www.figma.com/api/mcp/asset/05981ae8-ffab-4368-a514-3a3ca960b52e.png",
  },
  {
    id: 3, bgFrom: "#F0EEFF", bgTo: "#E2DDFF", borderColor: "#7C3AED",
    badge: "FREE TRAINING", badgeBg: "#7C3AED",
    title: "CSR SKILLS\nPROGRAM",
    tagline: "DIGITAL MARKETING, FASHION DESIGN & MORE — ENROL TODAY",
    taglineBg: "#7C3AED", cta: "EXPLORE CSR", ctaHref: "/csr",
    note: "Open to all community members", visual: "csr" as const,
  },
  {
    id: 4, bgFrom: "#FFF0F0", bgTo: "#FFE0E0", borderColor: "#DC2626",
    badge: "NEW LISTING", badgeBg: "#DC2626",
    title: "ITALIAN\nLEATHER SHOES",
    tagline: "PREMIUM QUALITY FROM A CHURCH MEMBER — FORMAL & SPECIAL OCCASIONS",
    taglineBg: "#DC2626", cta: "VIEW PRODUCT", ctaHref: "#products",
    note: "₦75,000 · Limited quantity",
    image: "https://www.figma.com/api/mcp/asset/6b05ca7f-d0a1-4c58-ba9d-e113ab18b019.png",
  },
];

const CATEGORIES = ["All", "Books", "Restaurant", "Sneakers", "T-shirts", "Roundnecks", "Foodstuffs", "Shoes", "Children Toys", "Suits"];

const SORT_OPTIONS = [
  { label: "Featured", value: "featured" },
  { label: "Price: Low to High", value: "price_asc" },
  { label: "Price: High to Low", value: "price_desc" },
  { label: "Newest", value: "newest" },
];

const ITEMS_PER_PAGE = 9;

interface Product {
  id: number; name: string; description: string; price: string;
  category: string; image: string; isNew?: boolean; badge?: string; stock?: number;
}

const PRODUCTS: Product[] = [
  { id: 1, name: "Nike Round Neck", description: "Silk and linen material quality Nike wears.", price: "₦45,000", category: "Roundnecks", image: "https://www.figma.com/api/mcp/asset/1153e10c-c55b-4ac2-8749-14ef42a64066.png", badge: "Popular", stock: 12 },
  { id: 2, name: "Sport Sneaker", description: "Sneaker suitable for jogging and special sport activities.", price: "₦45,000", category: "Sneakers", image: "https://www.figma.com/api/mcp/asset/a916d6b8-1b7b-42c8-85fc-724432ca1a3c.png", isNew: true, stock: 5 },
  { id: 3, name: "Purpose Driven Life", description: "Book on purpose finding by Rick Warren.", price: "₦4,000", category: "Books", image: "https://www.figma.com/api/mcp/asset/05981ae8-ffab-4368-a514-3a3ca960b52e.png", badge: "Best Seller", stock: 20 },
  { id: 4, name: "Italian Leather Shoes", description: "Quality Italian leather shoes for formal occasions.", price: "₦75,000", category: "Shoes", image: "https://www.figma.com/api/mcp/asset/6b05ca7f-d0a1-4c58-ba9d-e113ab18b019.png", isNew: true, stock: 3 },
  { id: 5, name: "Men's Blue Suit", description: "Classic blue suit for formal and church occasions.", price: "₦145,000", category: "Suits", image: "https://www.figma.com/api/mcp/asset/746cda1b-3b87-47b0-8677-fa2d55d0bd04.png", stock: 2 },
  { id: 6, name: "Snack & Spicy", description: "Sweet taste snack & spicy from ROS restaurant.", price: "₦5,060", category: "Restaurant", image: "https://www.figma.com/api/mcp/asset/ba329fc1-db3e-4d6d-828a-7b1819f694c1.png", badge: "Fresh Today", stock: 50 },
  { id: 7, name: "Fried Rice & Chicken", description: "Delicious fried rice and chicken from ROS kitchen.", price: "₦9,500", category: "Restaurant", image: "https://www.figma.com/api/mcp/asset/ebe62225-db16-4a2c-9e99-d820eb7830d7.png", badge: "Chef's Pick", stock: 30 },
  { id: 8, name: "Female Red Leather Bag", description: "Premium red leather bag, stylish and durable.", price: "₦45,000", category: "T-shirts", image: "https://www.figma.com/api/mcp/asset/e0127f48-0aeb-4d45-97c0-cc8d6485d923.png", isNew: true, stock: 8 },
  { id: 9, name: "Power of Character", description: "Book on character by Myles Munroe.", price: "₦4,000", category: "Books", image: "https://www.figma.com/api/mcp/asset/4b6ab26c-e188-4441-bd21-61c5e7e7793b.png", badge: "Classic", stock: 15 },
  { id: 10, name: "Children Activity Set", description: "Educational toys and activity pack for kids aged 3–8.", price: "₦12,000", category: "Children Toys", image: "https://www.figma.com/api/mcp/asset/1153e10c-c55b-4ac2-8749-14ef42a64066.png", isNew: true, stock: 10 },
  { id: 11, name: "Ankara T-shirt", description: "Stylish Ankara print T-shirt, available in all sizes.", price: "₦8,500", category: "T-shirts", image: "https://www.figma.com/api/mcp/asset/a916d6b8-1b7b-42c8-85fc-724432ca1a3c.png", stock: 25 },
  { id: 12, name: "Premium Foodstuff Pack", description: "Monthly foodstuff bundle — rice, beans, garri, oil and more.", price: "₦22,000", category: "Foodstuffs", image: "https://www.figma.com/api/mcp/asset/ba329fc1-db3e-4d6d-828a-7b1819f694c1.png", badge: "Value Bundle", stock: 15 },
];

const PRODUCT_CATEGORIES = [
  { label: "Books", value: "BOOK" },
  { label: "Electronics", value: "ELECTRONICS" },
  { label: "Cooking Utensils", value: "COOKING_UTENSILS" },
  { label: "Automobile", value: "AUTOMOBILE" },
  { label: "Wears & Clothing", value: "WEARS" },
];

interface VerifiedMember { id: string; name: string; type: "member" | "emember" }

function priceToNum(price: string) {
  return parseFloat(price.replace(/[^0-9.]/g, "")) || 0;
}

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex items-center gap-[2px]">
      {[1, 2, 3, 4, 5].map((s) => (
        <svg key={s} viewBox="0 0 12 12" className="size-[11px]" fill={s <= rating ? "#F59E0B" : "none"} stroke={s <= rating ? "#F59E0B" : "#D1D5DB"} strokeWidth="1">
          <path d="M6 1l1.2 3.6H11l-3 2.2 1.1 3.6L6 8.2 2.9 10.4 4 6.8 1 4.6h3.8z" />
        </svg>
      ))}
    </div>
  );
}

export default function MarketplacePage() {
  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");
  const [sort, setSort] = useState("featured");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [cart, setCart] = useState<number[]>([]);
  const [wishlist, setWishlist] = useState<number[]>([]);
  const [cartOpen, setCartOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [page, setPage] = useState(1);

  const [modalMode, setModalMode] = useState<"sell" | "checkout" | null>(null);
  const [verifyInput, setVerifyInput] = useState("");
  const [verifyStatus, setVerifyStatus] = useState<"idle" | "loading" | "error">("idle");
  const [verifyError, setVerifyError] = useState("");
  const [verifiedMember, setVerifiedMember] = useState<VerifiedMember | null>(null);

  const [slideIndex, setSlideIndex] = useState(0);
  const nextSlide = useCallback(() => setSlideIndex((i) => (i + 1) % AD_SLIDES.length), []);
  useEffect(() => { const t = setInterval(nextSlide, 4500); return () => clearInterval(t); }, [nextSlide]);

  const [sellStep, setSellStep] = useState<"verify" | "form" | "success">("verify");
  const [listForm, setListForm] = useState({ name: "", description: "", price: "", category: "", quantityLeft: "", imageUrl: "", otherInformation: "", tags: "" });
  const [listStatus, setListStatus] = useState<"idle" | "loading" | "error">("idle");
  const [listError, setListError] = useState("");

  const productsRef = useRef<HTMLDivElement>(null);

  const filtered = useMemo(() => {
    let list = PRODUCTS.filter((p) => {
      const matchCat = activeCategory === "All" || p.category === activeCategory;
      const matchSearch = p.name.toLowerCase().includes(search.toLowerCase()) ||
        p.description.toLowerCase().includes(search.toLowerCase());
      return matchCat && matchSearch;
    });
    if (sort === "price_asc") list = [...list].sort((a, b) => priceToNum(a.price) - priceToNum(b.price));
    if (sort === "price_desc") list = [...list].sort((a, b) => priceToNum(b.price) - priceToNum(a.price));
    if (sort === "newest") list = [...list].sort((a, b) => (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0));
    return list;
  }, [search, activeCategory, sort]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / ITEMS_PER_PAGE));
  const paginated = filtered.slice((page - 1) * ITEMS_PER_PAGE, page * ITEMS_PER_PAGE);

  // Reset to page 1 when filters change
  useEffect(() => { setPage(1); }, [search, activeCategory, sort]);

  function goToPage(p: number) {
    setPage(p);
    productsRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  function addToCart(id: number, e?: React.MouseEvent) {
    e?.stopPropagation();
    setCart((prev) => [...prev, id]);
  }
  function removeFromCart(id: number) {
    setCart((prev) => { const idx = prev.indexOf(id); return idx === -1 ? prev : [...prev.slice(0, idx), ...prev.slice(idx + 1)]; });
  }
  function toggleWishlist(id: number, e?: React.MouseEvent) {
    e?.stopPropagation();
    setWishlist((prev) => prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]);
  }

  const cartCount = cart.length;
  const uniqueCartItems = Array.from(new Set(cart));
  const cartTotal = uniqueCartItems.reduce((sum, id) => {
    const qty = cart.filter((x) => x === id).length;
    const p = PRODUCTS.find((x) => x.id === id);
    return sum + (p ? priceToNum(p.price) * qty : 0);
  }, 0);

  function openModal(mode: "sell" | "checkout") {
    setModalMode(mode); setSellStep("verify"); setVerifyInput("");
    setVerifyStatus("idle"); setVerifyError(""); setVerifiedMember(null);
    setListForm({ name: "", description: "", price: "", category: "", quantityLeft: "", imageUrl: "", otherInformation: "", tags: "" });
    setListStatus("idle"); setListError(""); setCartOpen(false);
  }
  function closeModal() { setModalMode(null); setVerifyInput(""); setVerifyStatus("idle"); setVerifyError(""); }

  async function handleVerify(e: React.FormEvent) {
    e.preventDefault();
    if (!verifyInput.trim()) return;
    setVerifyStatus("loading"); setVerifyError("");
    try {
      const memberRes = await fetch(`${API_BASE}/users/member/search`, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ text: verifyInput.trim() }) });
      if (memberRes.ok) {
        const data = await memberRes.json();
        const users = Array.isArray(data) ? data : (data.content || data.data || []);
        if (users.length > 0) { const u = users[0]; setVerifiedMember({ id: u.id, name: `${u.firstName} ${u.lastName}`, type: "member" }); setSellStep("form"); setVerifyStatus("idle"); return; }
      }
      const emRes = await fetch(`${API_BASE}/users/e-member/search`, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ text: verifyInput.trim() }) });
      if (emRes.ok) {
        const data = await emRes.json();
        const users = Array.isArray(data) ? data : (data.content || data.data || []);
        if (users.length > 0) { const u = users[0]; setVerifiedMember({ id: u.id, name: `${u.firstName} ${u.lastName}`, type: "emember" }); setSellStep("form"); setVerifyStatus("idle"); return; }
      }
      setVerifyStatus("error"); setVerifyError("No church member found with that phone number or email. Please register first.");
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
    } catch { setListStatus("error"); setListError("Failed to submit product listing. Please try again."); }
  }

  const inputBase = "w-full rounded-lg border border-[#E5E7EB] px-4 py-3 text-sm text-[#374151] outline-none placeholder:text-[#9CA3AF] focus:border-[#000080] focus:ring-1 focus:ring-[#000080]";

  return (
    <main className="bg-[#F8F8FC] min-h-screen">

      {/* ── Hero / Search ── */}
      <section className="relative w-full overflow-hidden bg-white shadow-sm">
        <div className="absolute top-0 left-0 right-0 h-[120px] z-10 bg-gradient-to-b from-[rgba(0,0,0,0.65)] to-transparent pointer-events-none" />
        <Navbar activePage="marketplace" />

        <div className="pt-[80px] px-4 md:px-10 pb-0">
          <div className="flex items-center gap-[10px] md:gap-[14px] bg-white rounded-[12px] px-[16px] py-[10px] mb-[10px] shadow-[0_2px_12px_rgba(0,0,0,0.08)]">
            <div className="flex items-center gap-[10px] px-[16px] py-[6px] h-[44px] rounded-[30px] border-[1.5px] border-[#00003D] bg-[#FFFDFD] flex-1">
              <svg viewBox="0 0 21 21" fill="none" className="size-[18px] flex-shrink-0">
                <circle cx="9.5" cy="9.5" r="7.5" stroke="#00003D" strokeWidth="2" />
                <path d="M15.5 15.5l4 4" stroke="#00003D" strokeWidth="2" strokeLinecap="round" />
              </svg>
              <input type="text" placeholder="Search products, categories..." value={search} onChange={(e) => setSearch(e.target.value)} className="bg-transparent outline-none text-[#00003D] font-bold text-[15px] md:text-[17px] placeholder:text-[#00003D]/50 w-full" style={vs} />
              {search && (
                <button onClick={() => setSearch("")} className="text-[#9CA3AF] hover:text-[#374151] text-[18px] leading-none flex-shrink-0">×</button>
              )}
            </div>
            <button onClick={() => openModal("sell")} className="flex-shrink-0 bg-[#000080] text-[#FFFDFD] text-[13px] md:text-[15px] font-bold px-[18px] md:px-[24px] py-[10px] rounded-[30px] hover:bg-[#0000a0] transition-colors whitespace-nowrap" style={vs}>
              + Sell an Item
            </button>
            <button onClick={() => setCartOpen(!cartOpen)} className="relative flex-shrink-0 size-[44px] flex items-center justify-center">
              <svg viewBox="0 0 64 64" fill="none" className="size-[36px] text-[#100E1A]">
                <path d="M10 10h6l6 28h22l6-20H20" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
                <circle cx="28" cy="52" r="4" fill="currentColor" />
                <circle cx="46" cy="52" r="4" fill="currentColor" />
              </svg>
              {cartCount > 0 && (
                <div className="absolute -top-1 -right-1 bg-[#000080] rounded-full min-w-[20px] h-[20px] flex items-center justify-center px-[4px]">
                  <span className="text-[#FFFDFD] text-[11px] font-bold" style={vs}>{cartCount}</span>
                </div>
              )}
            </button>
          </div>
        </div>

        {/* Carousel */}
        <div className="px-4 md:px-10 pb-0">
          <div className="w-full rounded-[12px] p-[2.5px]" style={{ background: `linear-gradient(135deg, ${AD_SLIDES[slideIndex].borderColor}, #B5B5F3, ${AD_SLIDES[slideIndex].borderColor})` }}>
            <div className="relative w-full rounded-[10px] overflow-hidden min-h-[200px] md:min-h-[320px] flex flex-col md:flex-row items-stretch transition-all duration-500" style={{ background: `linear-gradient(120deg, ${AD_SLIDES[slideIndex].bgFrom} 0%, ${AD_SLIDES[slideIndex].bgTo} 100%)` }}>
              <div className="relative flex items-center justify-center w-full md:w-[45%] min-h-[160px] md:min-h-[320px] overflow-hidden flex-shrink-0">
                {AD_SLIDES[slideIndex].image ? (
                  <>
                    <div className="absolute inset-0 opacity-10" style={{ background: `radial-gradient(ellipse at 50% 120%, ${AD_SLIDES[slideIndex].borderColor} 0%, transparent 70%)` }} />
                    <img src={AD_SLIDES[slideIndex].image} alt="" className="relative z-10 max-h-[180px] md:max-h-[280px] w-auto object-contain drop-shadow-2xl transition-all duration-500" />
                  </>
                ) : AD_SLIDES[slideIndex].visual === "store" ? (
                  <div className="relative z-10 flex items-end justify-center h-[160px] md:h-[260px] w-full px-6">
                    <div className="absolute inset-0 opacity-10" style={{ background: `radial-gradient(ellipse at 50% 100%, ${AD_SLIDES[slideIndex].borderColor} 0%, transparent 70%)` }} />
                    {[{ label: "Reading", emoji: "📚", h: "100px", rot: "-6deg" }, { label: "Clothing", emoji: "👔", h: "120px", rot: "0deg" }, { label: "Food", emoji: "🍱", h: "90px", rot: "5deg" }].map((item) => (
                      <div key={item.label} className="flex flex-col items-center justify-end rounded-[16px] bg-white/70 backdrop-blur-sm border border-white/80 shadow-lg px-3 py-4 mx-1" style={{ height: item.h, transform: `rotate(${item.rot})` }}>
                        <span style={{ fontSize: "clamp(24px, 5vw, 40px)" }}>{item.emoji}</span>
                        <span className="text-[10px] md:text-[12px] font-semibold text-[#374151] mt-1 whitespace-nowrap">{item.label}</span>
                      </div>
                    ))}
                    <div className="absolute top-4 left-4 md:top-6 md:left-8 size-[64px] md:size-[84px] rounded-full flex flex-col items-center justify-center text-center shadow-xl" style={{ background: AD_SLIDES[slideIndex].badgeBg }}>
                      <span className="text-white text-[10px] md:text-[11px] font-bold leading-tight">MEMBER</span>
                      <span className="text-white text-[14px] md:text-[18px] font-black leading-tight">ONLY</span>
                    </div>
                  </div>
                ) : (
                  <div className="relative z-10 flex items-end justify-center h-[160px] md:h-[260px] w-full px-6">
                    <div className="absolute inset-0 opacity-10" style={{ background: `radial-gradient(ellipse at 50% 100%, ${AD_SLIDES[slideIndex].borderColor} 0%, transparent 70%)` }} />
                    {[{ label: "Marketing", emoji: "📣", h: "110px", rot: "-5deg" }, { label: "Design", emoji: "🎨", h: "130px", rot: "0deg" }, { label: "Business", emoji: "💼", h: "100px", rot: "4deg" }].map((item) => (
                      <div key={item.label} className="flex flex-col items-center justify-end rounded-[16px] bg-white/70 backdrop-blur-sm border border-white/80 shadow-lg px-3 py-4 mx-1" style={{ height: item.h, transform: `rotate(${item.rot})` }}>
                        <span style={{ fontSize: "clamp(24px, 5vw, 40px)" }}>{item.emoji}</span>
                        <span className="text-[10px] md:text-[12px] font-semibold text-[#374151] mt-1 whitespace-nowrap">{item.label}</span>
                      </div>
                    ))}
                    <div className="absolute top-4 left-4 md:top-6 md:left-8 size-[64px] md:size-[84px] rounded-full flex flex-col items-center justify-center text-center shadow-xl" style={{ background: AD_SLIDES[slideIndex].badgeBg }}>
                      <span className="text-white text-[10px] md:text-[11px] font-bold leading-tight">100%</span>
                      <span className="text-white text-[13px] md:text-[15px] font-black leading-tight">FREE</span>
                    </div>
                  </div>
                )}
              </div>
              <div className="flex flex-col justify-center gap-[10px] md:gap-[16px] px-5 md:px-8 py-5 md:py-8 flex-1 relative z-10">
                <div className="flex items-center gap-[10px]">
                  <div className="size-[36px] md:size-[46px] rounded-full flex items-center justify-center flex-shrink-0" style={{ background: AD_SLIDES[slideIndex].badgeBg }}>
                    <svg width="20" height="16" viewBox="0 0 25 23" fill="none"><path d="M2 2h3l3.5 14h12l3-10H7" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /><circle cx="10" cy="20" r="1.5" fill="white" /><circle cx="19" cy="20" r="1.5" fill="white" /></svg>
                  </div>
                  <span className="font-black text-[14px] md:text-[18px] tracking-wider" style={{ color: AD_SLIDES[slideIndex].badgeBg, fontVariationSettings: '"wdth" 100' }}>ROS MARKETPLACE</span>
                </div>
                <h2 className="font-black text-[20px] md:text-[28px] lg:text-[34px] leading-tight text-[#100E1A] whitespace-pre-line" style={{ fontVariationSettings: '"wdth" 100' }}>{AD_SLIDES[slideIndex].title}</h2>
                <div className="rounded-[6px] px-3 py-[10px] md:px-4 md:py-[12px]" style={{ background: AD_SLIDES[slideIndex].taglineBg }}>
                  <p className="text-white font-bold text-[11px] md:text-[14px] leading-tight" style={{ fontVariationSettings: '"wdth" 100' }}>{AD_SLIDES[slideIndex].tagline}</p>
                </div>
                <div className="flex flex-col gap-[6px]">
                  <Link href={AD_SLIDES[slideIndex].ctaHref} className="self-start px-[20px] md:px-[28px] py-[10px] md:py-[12px] rounded-[6px] text-white font-black text-[13px] md:text-[16px] tracking-wide hover:opacity-90 transition-opacity" style={{ background: AD_SLIDES[slideIndex].badgeBg, fontVariationSettings: '"wdth" 100' }}>{AD_SLIDES[slideIndex].cta}</Link>
                  <p className="text-[#6B7280] text-[11px] md:text-[12px]" style={{ fontVariationSettings: '"wdth" 100' }}>{AD_SLIDES[slideIndex].note}</p>
                </div>
              </div>
            </div>
          </div>
          <div className="flex items-center justify-center gap-[8px] mt-[12px] pb-[4px]">
            {AD_SLIDES.map((slide, i) => (
              <button key={slide.id} onClick={() => setSlideIndex(i)} className="rounded-full transition-all duration-300" style={{ background: i === slideIndex ? AD_SLIDES[slideIndex].borderColor : "#D1D5DB", width: i === slideIndex ? "28px" : "8px", height: "8px" }} aria-label={`Go to slide ${i + 1}`} />
            ))}
          </div>
        </div>
      </section>

      {/* ── Cart Drawer ── */}
      {cartOpen && (
        <div className="fixed inset-0 z-40" onClick={() => setCartOpen(false)}>
          <div className="fixed top-0 right-0 h-full w-full max-w-[400px] bg-white shadow-2xl z-50 flex flex-col" onClick={(e) => e.stopPropagation()}>
            {/* Cart header */}
            <div className="flex items-center justify-between px-6 py-5 border-b border-[#F3F4F6]">
              <div className="flex items-center gap-3">
                <h3 className="text-[#100E1A] text-[18px] font-bold" style={vs}>Your Cart</h3>
                <span className="bg-[#000080] text-white text-[12px] font-bold px-2 py-0.5 rounded-full">{cartCount}</span>
              </div>
              <button onClick={() => setCartOpen(false)} className="size-[36px] flex items-center justify-center rounded-full hover:bg-[#F3F4F6] text-[#6B7280] text-[20px] transition-colors">×</button>
            </div>

            {/* Cart items */}
            <div className="flex-1 overflow-y-auto px-6 py-4 flex flex-col gap-3">
              {cartCount === 0 ? (
                <div className="flex flex-col items-center justify-center h-full gap-4 text-center">
                  <span className="text-[56px]">🛒</span>
                  <p className="text-[#6B7280] text-[15px]" style={vs}>Your cart is empty</p>
                  <button onClick={() => setCartOpen(false)} className="text-[#000080] text-[14px] font-semibold underline" style={vs}>Continue Shopping</button>
                </div>
              ) : (
                uniqueCartItems.map((id) => {
                  const qty = cart.filter((x) => x === id).length;
                  const p = PRODUCTS.find((x) => x.id === id);
                  return p ? (
                    <div key={id} className="flex items-center gap-3 p-3 bg-[#F8F8FC] rounded-[14px]">
                      <img src={p.image} alt={p.name} className="size-[56px] rounded-[10px] object-cover flex-shrink-0" />
                      <div className="flex-1 min-w-0">
                        <p className="text-[#100E1A] text-[13px] font-bold truncate" style={vs}>{p.name}</p>
                        <p className="text-[#000080] text-[12px] font-semibold mt-0.5" style={vs}>{p.price}</p>
                        <div className="flex items-center gap-2 mt-2">
                          <button onClick={() => removeFromCart(id)} className="size-[22px] rounded-full border border-[#D1D5DB] flex items-center justify-center text-[14px] text-[#6B7280] hover:border-[#000080] hover:text-[#000080] transition-colors">−</button>
                          <span className="text-[13px] font-semibold text-[#374151] w-4 text-center">{qty}</span>
                          <button onClick={() => addToCart(id)} className="size-[22px] rounded-full border border-[#D1D5DB] flex items-center justify-center text-[14px] text-[#6B7280] hover:border-[#000080] hover:text-[#000080] transition-colors">+</button>
                        </div>
                      </div>
                      <button onClick={() => setCart(c => c.filter(x => x !== id))} className="text-[#9CA3AF] hover:text-red-500 transition-colors text-[18px] flex-shrink-0">×</button>
                    </div>
                  ) : null;
                })
              )}
            </div>

            {/* Cart footer */}
            {cartCount > 0 && (
              <div className="px-6 py-5 border-t border-[#F3F4F6] flex flex-col gap-3">
                <div className="flex items-center justify-between">
                  <span className="text-[#6B7280] text-[14px]" style={vs}>Subtotal</span>
                  <span className="text-[#100E1A] text-[18px] font-black" style={vs}>₦{cartTotal.toLocaleString()}</span>
                </div>
                <p className="text-[#9CA3AF] text-[11px]" style={vs}>Pickup arranged at church or directly with seller</p>
                <button onClick={() => openModal("checkout")} className="w-full bg-[#000080] text-[#FFFDFD] py-[14px] rounded-[24px] text-[15px] font-bold hover:bg-[#0000a0] transition-colors" style={vs}>
                  Proceed to Checkout →
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      {/* ── Product Detail Modal ── */}
      {selectedProduct && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm" onClick={() => setSelectedProduct(null)}>
          <div className="bg-white rounded-[24px] w-full max-w-[560px] flex flex-col shadow-2xl overflow-hidden max-h-[90vh]" onClick={(e) => e.stopPropagation()}>
            <div className="relative h-[280px] md:h-[320px] w-full flex-shrink-0 overflow-hidden bg-[#F8F8FC]">
              <img src={selectedProduct.image} alt={selectedProduct.name} className="w-full h-full object-cover" />
              <button onClick={() => setSelectedProduct(null)} className="absolute top-4 right-4 size-[36px] bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center shadow-md text-[#374151] hover:text-[#100E1A] text-[20px] transition-colors">×</button>
              {selectedProduct.isNew && <span className="absolute top-4 left-4 bg-[#000080] text-white text-[11px] font-bold px-3 py-1 rounded-full uppercase tracking-wide">New</span>}
              {selectedProduct.badge && !selectedProduct.isNew && <span className="absolute top-4 left-4 bg-[#F59E0B] text-white text-[11px] font-bold px-3 py-1 rounded-full uppercase tracking-wide">{selectedProduct.badge}</span>}
            </div>
            <div className="p-6 flex flex-col gap-4 overflow-y-auto">
              <div>
                <div className="flex items-start justify-between gap-3">
                  <h2 className="text-[#100E1A] text-[22px] font-bold leading-tight" style={vs}>{selectedProduct.name}</h2>
                  <button onClick={(e) => toggleWishlist(selectedProduct.id, e)} className="flex-shrink-0">
                    <svg viewBox="0 0 37 32" fill="none" className="w-[32px] h-[28px]">
                      <path d="M18.5 28S3 19.5 3 10.5C3 7 5.5 4 9 4c2.5 0 4.8 1.5 6 3.8a7.15 7.15 0 0 1 12 3.5c.5 6.3-8.5 16.7-8.5 16.7z" fill={wishlist.includes(selectedProduct.id) ? "#FF4D6D" : "none"} stroke={wishlist.includes(selectedProduct.id) ? "#FF4D6D" : "#100E1A"} strokeWidth="2" />
                    </svg>
                  </button>
                </div>
                <div className="flex items-center gap-3 mt-1">
                  <StarRating rating={4} />
                  <span className="text-[#9CA3AF] text-[12px]">(12 reviews)</span>
                  <span className="text-[12px] text-[#6B7280]">·</span>
                  <span className={`text-[12px] font-medium ${(selectedProduct.stock ?? 10) <= 3 ? "text-red-500" : "text-green-600"}`}>
                    {(selectedProduct.stock ?? 10) <= 3 ? `Only ${selectedProduct.stock} left!` : "In Stock"}
                  </span>
                </div>
              </div>
              <p className="text-[#6B7280] text-[14px] leading-[1.7]" style={vs}>{selectedProduct.description}</p>
              <div className="flex items-center justify-between pt-2">
                <div className="bg-[#100E1A] px-6 py-3 rounded-[33px]">
                  <span className="text-[#FFFDFD] text-[20px] font-black" style={vs}>{selectedProduct.price}</span>
                </div>
                <button onClick={(e) => { addToCart(selectedProduct.id, e); setSelectedProduct(null); setCartOpen(true); }} className="bg-[#000080] px-7 py-3 rounded-[24px] text-[#FFFDFD] text-[14px] font-bold hover:bg-[#0000a0] transition-colors flex items-center gap-2" style={vs}>
                  <svg viewBox="0 0 25 23" fill="none" className="w-[16px] h-[14px]"><path d="M2 2h3l3.5 14h12l3-10H7" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /><circle cx="10" cy="20" r="1.5" fill="white" /><circle cx="19" cy="20" r="1.5" fill="white" /></svg>
                  Add to Cart
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ── Member Modal ── */}
      {modalMode && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50" onClick={closeModal}>
          <div className="bg-white rounded-[24px] p-6 md:p-8 w-full max-w-[520px] flex flex-col gap-5 shadow-2xl max-h-[90vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-start justify-between">
              <div>
                <h2 className="text-[#100E1A] text-[20px] font-bold" style={vs}>{modalMode === "sell" ? "List a Product" : "Checkout"}</h2>
                <p className="text-[#A3A1AF] text-[13px] mt-1" style={vs}>{modalMode === "sell" ? "Church members can list items for sale" : "Verify your membership to proceed"}</p>
              </div>
              <button onClick={closeModal} className="text-[#A3A1AF] text-[24px] leading-none hover:text-[#100E1A]">×</button>
            </div>

            {sellStep === "verify" && (
              <form onSubmit={handleVerify} className="flex flex-col gap-4">
                <div className="bg-[#F3F4F6] rounded-[16px] p-4 flex items-start gap-3">
                  <span className="text-[20px]">🔒</span>
                  <p className="text-[#374151] text-[13px] leading-[1.6]" style={vs}>This feature is for <strong>registered church members only</strong>. Enter your registered phone number or email to verify.</p>
                </div>
                <div className="flex flex-col gap-1">
                  <label className="text-[14px] font-semibold text-[#111827]">Phone Number or Email</label>
                  <input type="text" required value={verifyInput} onChange={(e) => setVerifyInput(e.target.value)} placeholder="e.g. 08012345678 or your@email.com" className={inputBase} style={vs} />
                </div>
                {verifyStatus === "error" && (
                  <div className="bg-red-50 border border-red-200 rounded-lg px-4 py-3 text-sm text-red-700" style={vs}>
                    {verifyError}<br />
                    <Link href="/first-timer" className="text-[#000080] font-medium underline">Register as first-timer</Link>{" or "}<Link href="/e-member" className="text-[#000080] font-medium underline">become an e-member</Link>
                  </div>
                )}
                <button type="submit" disabled={verifyStatus === "loading"} className="w-full bg-[#000080] text-[#FFFDFD] py-[14px] rounded-[24px] text-[15px] font-bold hover:bg-[#0000a0] transition-colors disabled:opacity-60" style={vs}>
                  {verifyStatus === "loading" ? "Verifying..." : "Verify Membership"}
                </button>
              </form>
            )}

            {sellStep === "form" && verifiedMember && modalMode === "sell" && (
              <form onSubmit={handleListProduct} className="flex flex-col gap-4">
                <div className="bg-green-50 border border-green-200 rounded-[12px] px-4 py-3 flex items-center gap-2">
                  <span className="text-green-600 font-bold text-lg">✓</span>
                  <p className="text-green-700 text-[13px] font-medium" style={vs}>Verified as: <strong>{verifiedMember.name}</strong></p>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div className="flex flex-col gap-1 sm:col-span-2"><label className="text-[14px] font-semibold text-[#111827]">Product Name *</label><input type="text" required value={listForm.name} onChange={(e) => setListForm(p => ({ ...p, name: e.target.value }))} className={inputBase} placeholder="e.g. Men's Leather Shoes" style={vs} /></div>
                  <div className="flex flex-col gap-1"><label className="text-[14px] font-semibold text-[#111827]">Price (₦) *</label><input type="number" required min="0" step="0.01" value={listForm.price} onChange={(e) => setListForm(p => ({ ...p, price: e.target.value }))} className={inputBase} placeholder="e.g. 5000" style={vs} /></div>
                  <div className="flex flex-col gap-1"><label className="text-[14px] font-semibold text-[#111827]">Qty Available *</label><input type="number" required min="1" value={listForm.quantityLeft} onChange={(e) => setListForm(p => ({ ...p, quantityLeft: e.target.value }))} className={inputBase} placeholder="e.g. 10" style={vs} /></div>
                  <div className="flex flex-col gap-1 sm:col-span-2"><label className="text-[14px] font-semibold text-[#111827]">Category *</label><select required value={listForm.category} onChange={(e) => setListForm(p => ({ ...p, category: e.target.value }))} className={`${inputBase} appearance-none cursor-pointer`} style={vs}><option value="">Select category</option>{PRODUCT_CATEGORIES.map((c) => <option key={c.value} value={c.value}>{c.label}</option>)}</select></div>
                  <div className="flex flex-col gap-1 sm:col-span-2"><label className="text-[14px] font-semibold text-[#111827]">Description *</label><textarea required rows={3} value={listForm.description} onChange={(e) => setListForm(p => ({ ...p, description: e.target.value }))} className={`${inputBase} resize-none`} placeholder="Describe your product..." style={vs} /></div>
                  <div className="flex flex-col gap-1 sm:col-span-2"><label className="text-[14px] font-semibold text-[#111827]">Image URL <span className="text-[#9CA3AF] font-normal">(optional)</span></label><input type="url" value={listForm.imageUrl} onChange={(e) => setListForm(p => ({ ...p, imageUrl: e.target.value }))} className={inputBase} placeholder="https://..." style={vs} /></div>
                  <div className="flex flex-col gap-1 sm:col-span-2"><label className="text-[14px] font-semibold text-[#111827]">Tags <span className="text-[#9CA3AF] font-normal">(comma-separated)</span></label><input type="text" value={listForm.tags} onChange={(e) => setListForm(p => ({ ...p, tags: e.target.value }))} className={inputBase} placeholder="e.g. leather, formal, men" style={vs} /></div>
                  <div className="flex flex-col gap-1 sm:col-span-2"><label className="text-[14px] font-semibold text-[#111827]">Other Info <span className="text-[#9CA3AF] font-normal">(optional)</span></label><textarea rows={2} value={listForm.otherInformation} onChange={(e) => setListForm(p => ({ ...p, otherInformation: e.target.value }))} className={`${inputBase} resize-none`} placeholder="Contact preference, pickup location, etc." style={vs} /></div>
                </div>
                {listStatus === "error" && <p className="text-red-600 text-[13px]" style={vs}>{listError}</p>}
                <div className="flex gap-3">
                  <button type="button" onClick={() => setSellStep("verify")} className="flex-1 border-2 border-[#000080] text-[#000080] py-[12px] rounded-[24px] text-[15px] font-bold hover:bg-[#000080]/5 transition-colors" style={vs}>Back</button>
                  <button type="submit" disabled={listStatus === "loading"} className="flex-1 bg-[#000080] text-[#FFFDFD] py-[12px] rounded-[24px] text-[15px] font-bold hover:bg-[#0000a0] transition-colors disabled:opacity-60" style={vs}>{listStatus === "loading" ? "Submitting..." : "List Product"}</button>
                </div>
              </form>
            )}

            {sellStep === "form" && verifiedMember && modalMode === "checkout" && (
              <div className="flex flex-col gap-4">
                <div className="bg-green-50 border border-green-200 rounded-[12px] px-4 py-3 flex items-center gap-2">
                  <span className="text-green-600 font-bold text-lg">✓</span>
                  <p className="text-green-700 text-[13px] font-medium" style={vs}>Verified as: <strong>{verifiedMember.name}</strong></p>
                </div>
                {cartCount === 0 ? <p className="text-[#A3A1AF] text-[14px] text-center py-4" style={vs}>Your cart is empty.</p> : (
                  <>
                    <div className="flex flex-col gap-2">
                      {uniqueCartItems.map((id) => {
                        const qty = cart.filter((x) => x === id).length;
                        const p = PRODUCTS.find((x) => x.id === id);
                        return p ? (
                          <div key={id} className="flex items-center gap-3 p-3 bg-[#F3F4F6] rounded-[12px]">
                            <img src={p.image} alt={p.name} className="size-[48px] rounded-[8px] object-cover flex-shrink-0" />
                            <div className="flex-1 min-w-0">
                              <p className="text-[#100E1A] text-[13px] font-bold truncate" style={vs}>{p.name}</p>
                              <p className="text-[#000080] text-[12px] font-semibold" style={vs}>{p.price} × {qty}</p>
                            </div>
                          </div>
                        ) : null;
                      })}
                    </div>
                    <div className="flex items-center justify-between bg-[#000080]/5 rounded-[12px] px-4 py-3">
                      <span className="text-[#100E1A] font-semibold text-[14px]">Total</span>
                      <span className="text-[#000080] font-black text-[18px]">₦{cartTotal.toLocaleString()}</span>
                    </div>
                    <div className="bg-[#000080]/5 rounded-[12px] p-4 text-center">
                      <p className="text-[#100E1A] text-[13px] leading-[1.6]" style={vs}>Your order has been noted. Please bring this list to church or contact the seller to arrange pickup.</p>
                    </div>
                    <button onClick={closeModal} className="w-full bg-[#000080] text-[#FFFDFD] py-[14px] rounded-[24px] text-[15px] font-bold hover:bg-[#0000a0] transition-colors" style={vs}>Done</button>
                  </>
                )}
              </div>
            )}

            {sellStep === "success" && (
              <div className="flex flex-col gap-4 items-center text-center py-4">
                <div className="size-[72px] rounded-full bg-green-100 flex items-center justify-center">
                  <svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="#16a34a" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12" /></svg>
                </div>
                <p className="text-[#000080] text-[20px] font-bold" style={vs}>Product Submitted!</p>
                <p className="text-[#6B7280] text-[14px] leading-[1.6]" style={vs}>Your product listing has been submitted and is pending approval. It will appear in the marketplace once approved by the admin.</p>
                <button onClick={closeModal} className="w-full bg-[#000080] text-[#FFFDFD] py-[14px] rounded-[24px] text-[15px] font-bold hover:bg-[#0000a0] transition-colors" style={vs}>Done</button>
              </div>
            )}
          </div>
        </div>
      )}

      {/* ── Products Section ── */}
      <div id="products" ref={productsRef} className="flex flex-col md:flex-row gap-0 md:gap-[32px] px-4 md:px-[40px] py-[24px] md:py-[32px] w-full">

        {/* Sidebar */}
        <aside className="w-full md:w-[200px] md:flex-shrink-0">
          {/* Mobile horizontal scroll */}
          <div className="flex md:hidden items-center gap-2 overflow-x-auto pb-3 scrollbar-hide">
            {CATEGORIES.map((cat) => (
              <button key={cat} onClick={() => setActiveCategory(cat)} className={["flex-shrink-0 px-4 py-2 rounded-full text-[13px] font-medium border transition-colors", activeCategory === cat ? "bg-[#000080] border-[#000080] text-white" : "border-[#D1D5DB] text-[#374151] bg-white hover:border-[#000080]"].join(" ")} style={vs}>{cat}</button>
            ))}
          </div>

          {/* Desktop vertical */}
          <div className="hidden md:flex flex-col gap-[20px] sticky top-[24px]">
            <h2 className="text-black font-bold text-[20px]" style={vs}>Categories</h2>
            <div className="flex flex-col gap-[4px]">
              {CATEGORIES.map((cat) => {
                const count = cat === "All" ? PRODUCTS.length : PRODUCTS.filter(p => p.category === cat).length;
                return (
                  <button key={cat} onClick={() => setActiveCategory(cat)} className={["flex items-center justify-between px-3 py-[10px] rounded-[10px] text-left transition-colors group", activeCategory === cat ? "bg-[#000080] text-white" : "text-[#374151] hover:bg-[#F3F4F6]"].join(" ")}>
                    <span className="text-[14px] font-medium" style={vs}>{cat}</span>
                    <span className={["text-[11px] font-bold px-2 py-0.5 rounded-full", activeCategory === cat ? "bg-white/20 text-white" : "bg-[#F3F4F6] text-[#9CA3AF] group-hover:bg-[#E5E7EB]"].join(" ")}>{count}</span>
                  </button>
                );
              })}
            </div>

            {/* Wishlist summary */}
            {wishlist.length > 0 && (
              <div className="mt-4 bg-[#FFF0F0] rounded-[12px] p-4 border border-[#FFD6D6]">
                <div className="flex items-center gap-2 mb-2">
                  <svg viewBox="0 0 37 32" fill="none" className="w-[16px] h-[14px]"><path d="M18.5 28S3 19.5 3 10.5C3 7 5.5 4 9 4c2.5 0 4.8 1.5 6 3.8a7.15 7.15 0 0 1 12 3.5c.5 6.3-8.5 16.7-8.5 16.7z" fill="#FF4D6D" stroke="#FF4D6D" strokeWidth="2" /></svg>
                  <span className="text-[#FF4D6D] text-[13px] font-bold" style={vs}>Wishlist ({wishlist.length})</span>
                </div>
                {wishlist.slice(0, 2).map(id => {
                  const p = PRODUCTS.find(x => x.id === id);
                  return p ? <p key={id} className="text-[#374151] text-[12px] truncate" style={vs}>{p.name}</p> : null;
                })}
              </div>
            )}
          </div>
        </aside>

        {/* Main grid area */}
        <div className="flex-1 min-w-0">
          {/* Toolbar: count + sort + view toggle */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 mb-5">
            <div>
              <p className="text-[#374151] text-[14px] font-medium" style={vs}>
                Showing <span className="font-bold text-[#100E1A]">{paginated.length}</span> of <span className="font-bold text-[#100E1A]">{filtered.length}</span> products
                {activeCategory !== "All" && <span className="text-[#000080]"> in {activeCategory}</span>}
                {search && <span className="text-[#000080]"> for &ldquo;{search}&rdquo;</span>}
              </p>
            </div>
            <div className="flex items-center gap-3">
              {/* Sort */}
              <select value={sort} onChange={(e) => setSort(e.target.value)} className="text-[13px] border border-[#E5E7EB] rounded-[8px] px-3 py-2 text-[#374151] bg-white outline-none focus:border-[#000080] cursor-pointer" style={vs}>
                {SORT_OPTIONS.map(o => <option key={o.value} value={o.value}>{o.label}</option>)}
              </select>
              {/* View toggle */}
              <div className="flex items-center border border-[#E5E7EB] rounded-[8px] overflow-hidden bg-white">
                <button onClick={() => setViewMode("grid")} className={["px-3 py-2 transition-colors", viewMode === "grid" ? "bg-[#000080] text-white" : "text-[#9CA3AF] hover:text-[#374151]"].join(" ")} aria-label="Grid view">
                  <svg viewBox="0 0 16 16" className="size-[15px]" fill="currentColor"><rect x="1" y="1" width="6" height="6" rx="1" /><rect x="9" y="1" width="6" height="6" rx="1" /><rect x="1" y="9" width="6" height="6" rx="1" /><rect x="9" y="9" width="6" height="6" rx="1" /></svg>
                </button>
                <button onClick={() => setViewMode("list")} className={["px-3 py-2 transition-colors", viewMode === "list" ? "bg-[#000080] text-white" : "text-[#9CA3AF] hover:text-[#374151]"].join(" ")} aria-label="List view">
                  <svg viewBox="0 0 16 16" className="size-[15px]" fill="currentColor"><rect x="1" y="2" width="14" height="2.5" rx="1" /><rect x="1" y="6.75" width="14" height="2.5" rx="1" /><rect x="1" y="11.5" width="14" height="2.5" rx="1" /></svg>
                </button>
              </div>
            </div>
          </div>

          {/* Product grid / list */}
          {filtered.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-[400px] gap-4 text-center">
              <span className="text-[56px]">🔍</span>
              <p className="text-[#100E1A] text-[18px] font-bold" style={vs}>No products found</p>
              <p className="text-[#9CA3AF] text-[14px]" style={vs}>Try a different category or search term</p>
              <button onClick={() => { setSearch(""); setActiveCategory("All"); }} className="px-6 py-2 bg-[#000080] text-white text-[14px] font-semibold rounded-[20px] hover:bg-[#0000a0] transition-colors" style={vs}>Clear Filters</button>
            </div>
          ) : viewMode === "grid" ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-[16px] md:gap-[20px]">
              {paginated.map((product) => (
                <div key={product.id} onClick={() => setSelectedProduct(product)} className="bg-white rounded-[20px] flex flex-col shadow-[0_2px_12px_rgba(0,0,0,0.06)] cursor-pointer hover:shadow-[0_8px_32px_rgba(0,0,128,0.12)] hover:-translate-y-[3px] transition-all duration-200 group overflow-hidden">
                  {/* Image */}
                  <div className="relative h-[220px] w-full overflow-hidden bg-[#F8F8FC]">
                    <img src={product.image} alt={product.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
                    {/* Badges */}
                    <div className="absolute top-3 left-3 flex flex-col gap-1">
                      {product.isNew && <span className="bg-[#000080] text-white text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wide">New</span>}
                      {product.badge && <span className="bg-[#F59E0B] text-white text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wide">{product.badge}</span>}
                      {(product.stock ?? 10) <= 3 && <span className="bg-red-500 text-white text-[10px] font-bold px-2 py-0.5 rounded-full">Low Stock</span>}
                    </div>
                    {/* Wishlist */}
                    <button onClick={(e) => toggleWishlist(product.id, e)} className="absolute top-3 right-3 size-[32px] bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center shadow-md opacity-0 group-hover:opacity-100 transition-opacity">
                      <svg viewBox="0 0 37 32" fill="none" className="w-[16px] h-[14px]"><path d="M18.5 28S3 19.5 3 10.5C3 7 5.5 4 9 4c2.5 0 4.8 1.5 6 3.8a7.15 7.15 0 0 1 12 3.5c.5 6.3-8.5 16.7-8.5 16.7z" fill={wishlist.includes(product.id) ? "#FF4D6D" : "none"} stroke={wishlist.includes(product.id) ? "#FF4D6D" : "#374151"} strokeWidth="2" /></svg>
                    </button>
                  </div>
                  {/* Info */}
                  <div className="p-4 flex flex-col gap-2 flex-1">
                    <div>
                      <p className="text-[#9CA3AF] text-[11px] font-medium uppercase tracking-wide" style={vs}>{product.category}</p>
                      <h3 className="text-[#100E1A] font-bold text-[15px] leading-tight mt-0.5" style={vs}>{product.name}</h3>
                    </div>
                    <p className="text-[#6B7280] text-[12px] leading-[1.5] line-clamp-2" style={vs}>{product.description}</p>
                    <StarRating rating={4} />
                    <div className="flex items-center justify-between mt-auto pt-2">
                      <span className="text-[#100E1A] text-[16px] font-black" style={vs}>{product.price}</span>
                      <button onClick={(e) => { e.stopPropagation(); addToCart(product.id, e); }} className="bg-[#000080] size-[36px] rounded-full flex items-center justify-center hover:bg-[#0000a0] transition-colors flex-shrink-0" aria-label="Add to cart">
                        <svg viewBox="0 0 25 23" fill="none" className="w-[16px] h-[14px]"><path d="M2 2h3l3.5 14h12l3-10H7" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /><circle cx="10" cy="20" r="1.5" fill="white" /><circle cx="19" cy="20" r="1.5" fill="white" /></svg>
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            /* List view */
            <div className="flex flex-col gap-3">
              {paginated.map((product) => (
                <div key={product.id} onClick={() => setSelectedProduct(product)} className="bg-white rounded-[16px] flex items-center gap-4 p-4 shadow-[0_2px_8px_rgba(0,0,0,0.05)] cursor-pointer hover:shadow-[0_4px_20px_rgba(0,0,128,0.10)] transition-all group">
                  <div className="relative size-[90px] md:size-[110px] rounded-[12px] overflow-hidden flex-shrink-0 bg-[#F8F8FC]">
                    <img src={product.image} alt={product.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
                    {product.isNew && <span className="absolute top-1 left-1 bg-[#000080] text-white text-[9px] font-bold px-1.5 py-0.5 rounded-full">New</span>}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-[#9CA3AF] text-[11px] font-medium uppercase tracking-wide" style={vs}>{product.category}</p>
                    <h3 className="text-[#100E1A] font-bold text-[16px] leading-tight mt-0.5" style={vs}>{product.name}</h3>
                    <p className="text-[#6B7280] text-[12px] leading-[1.5] mt-1 line-clamp-1" style={vs}>{product.description}</p>
                    <div className="flex items-center gap-2 mt-1"><StarRating rating={4} /><span className="text-[#9CA3AF] text-[11px]">(12)</span></div>
                  </div>
                  <div className="flex flex-col items-end gap-2 flex-shrink-0">
                    <span className="text-[#100E1A] text-[17px] font-black" style={vs}>{product.price}</span>
                    <div className="flex items-center gap-2">
                      <button onClick={(e) => toggleWishlist(product.id, e)} className="size-[32px] border border-[#E5E7EB] rounded-full flex items-center justify-center hover:border-[#FF4D6D] transition-colors">
                        <svg viewBox="0 0 37 32" fill="none" className="w-[14px] h-[12px]"><path d="M18.5 28S3 19.5 3 10.5C3 7 5.5 4 9 4c2.5 0 4.8 1.5 6 3.8a7.15 7.15 0 0 1 12 3.5c.5 6.3-8.5 16.7-8.5 16.7z" fill={wishlist.includes(product.id) ? "#FF4D6D" : "none"} stroke={wishlist.includes(product.id) ? "#FF4D6D" : "#374151"} strokeWidth="2" /></svg>
                      </button>
                      <button onClick={(e) => { e.stopPropagation(); addToCart(product.id, e); }} className="bg-[#000080] px-4 py-2 rounded-full text-white text-[12px] font-bold hover:bg-[#0000a0] transition-colors whitespace-nowrap" style={vs}>Add to Cart</button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* ── Pagination ── */}
          {totalPages > 1 && (
            <div className="flex items-center justify-between mt-8 flex-wrap gap-4">
              <p className="text-[#9CA3AF] text-[13px]" style={vs}>Page {page} of {totalPages}</p>
              <div className="flex items-center gap-2">
                <button onClick={() => goToPage(page - 1)} disabled={page === 1} className="size-[36px] rounded-full border border-[#E5E7EB] flex items-center justify-center text-[#374151] hover:border-[#000080] hover:text-[#000080] disabled:opacity-30 disabled:cursor-not-allowed transition-colors bg-white">
                  <svg viewBox="0 0 10 16" className="size-[10px]" fill="none"><path d="M8 2L2 8l6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>
                </button>

                {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => {
                  const near = Math.abs(p - page) <= 1 || p === 1 || p === totalPages;
                  const isDot = !near && (p === page - 2 || p === page + 2);
                  if (isDot) return <span key={p} className="text-[#9CA3AF] text-[14px] px-1">…</span>;
                  if (!near) return null;
                  return (
                    <button key={p} onClick={() => goToPage(p)} className={["size-[36px] rounded-full text-[14px] font-bold transition-colors", p === page ? "bg-[#000080] text-white" : "bg-white border border-[#E5E7EB] text-[#374151] hover:border-[#000080] hover:text-[#000080]"].join(" ")} style={vs}>{p}</button>
                  );
                })}

                <button onClick={() => goToPage(page + 1)} disabled={page === totalPages} className="size-[36px] rounded-full border border-[#E5E7EB] flex items-center justify-center text-[#374151] hover:border-[#000080] hover:text-[#000080] disabled:opacity-30 disabled:cursor-not-allowed transition-colors bg-white">
                  <svg viewBox="0 0 10 16" className="size-[10px]" fill="none"><path d="M2 2l6 6-6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* ── Why Shop With Us ── */}
      <section className="bg-[#100E1A] px-6 md:px-[60px] lg:px-[120px] py-[60px] md:py-[84px]">
        <div className="flex flex-col gap-8 items-center text-center mb-10">
          <p className="text-[#B5B5F3] text-[13px] uppercase tracking-[0.2em] font-medium" style={vs}>The ROS Difference</p>
          <h2 className="text-[#FFFDFD] text-[24px] md:text-[36px] font-bold" style={vs}>Why Shop With Us</h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            { icon: "🙏", title: "Faith-Based Sellers", desc: "All vendors are church members or community partners committed to honest trade." },
            { icon: "💰", title: "Affordable Prices", desc: "Quality products at prices that respect every family's budget." },
            { icon: "🚚", title: "Easy Pickup", desc: "Arrange pickup at church during service times for zero delivery hassle." },
            { icon: "🤝", title: "Supports Community", desc: "Every purchase supports a church member's livelihood and mission." },
          ].map((f) => (
            <div key={f.title} className="bg-[#1A1826] rounded-[20px] p-6 flex flex-col gap-3 border border-[#B5B5F3]/10">
              <span className="text-[32px]">{f.icon}</span>
              <p className="text-[#FFFDFD] text-[16px] font-bold" style={vs}>{f.title}</p>
              <p className="text-[#A3A1AF] text-[13px] leading-[1.6]" style={vs}>{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="relative w-full py-[60px] md:py-[84px] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-[#242222]" />
        <div className="absolute inset-0 opacity-35" style={{ backgroundImage: "url('https://www.figma.com/api/mcp/asset/00ab7363-f75f-485e-aab4-25d9a90cf966.png')", backgroundSize: "cover", backgroundPosition: "center" }} />
        <div className="relative z-10 flex flex-col items-center gap-[14px] w-full max-w-[495px] px-6 text-center">
          <h2 className="text-[#FFFDFD] text-[26px] md:text-[39px] font-semibold leading-[1.2]" style={vs}>{"Let's Tailor "}<span className="text-[#9B96FE] italic font-bold" style={{ fontFamily: "'Playfair Display', serif" }}>Your Experience.</span></h2>
          <p className="text-[#FFFDFD] text-[15px] md:text-[16px] leading-[24px]" style={vs}>Join the church groups and see what God can do through you</p>
          <div className="flex flex-wrap items-center justify-center gap-3 md:gap-[14px] mt-[8px]">
            {[{ label: "MEN", href: "/groups?filter=men", color: "#FFFDFD" }, { label: "WOMEN", href: "/groups?filter=women", color: "#9B96FE" }, { label: "YOUTH", href: "/groups?filter=youth", color: "#FFFDFD" }].map(g => (
              <Link key={g.label} href={g.href} className="border-2 text-[15px] font-medium px-[28px] py-[12px] rounded-[24px] hover:bg-white/10 transition-colors" style={{ borderColor: g.color, color: g.color }} >{g.label}</Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── Become a Vendor ── */}
      <section className="bg-[#EEF0F7] px-6 md:px-[60px] lg:px-[120px] py-[60px] md:py-[84px]">
        <div className="flex flex-col lg:flex-row gap-10 lg:gap-[80px] items-center">
          <div className="flex flex-col gap-5 flex-1">
            <p className="text-[#000080] text-[13px] uppercase tracking-[0.2em] font-medium" style={vs}>For Sellers</p>
            <h2 className="text-[#100E1A] text-[24px] md:text-[36px] font-bold" style={vs}>Want to Sell on ROS Marketplace?</h2>
            <p className="text-[#A3A1AF] text-[16px] leading-[1.7]" style={vs}>If you are a church member with products or services to offer, join our marketplace! Reach hundreds of fellow church members and community customers.</p>
            <ul className="flex flex-col gap-3">
              {["Free to list for church members", "No commission on first 3 months", "Get visibility in weekly announcements", "Access to church logistics network"].map(item => (
                <li key={item} className="flex items-center gap-3">
                  <div className="size-[20px] rounded-full bg-[#000080] flex items-center justify-center flex-shrink-0"><span className="text-white text-[11px] font-bold">✓</span></div>
                  <p className="text-[#100E1A] text-[15px]" style={vs}>{item}</p>
                </li>
              ))}
            </ul>
          </div>
          <div className="flex-1 bg-white rounded-[24px] p-8 shadow-[0_8px_40px_rgba(0,0,128,0.10)] flex flex-col gap-5 items-center justify-center text-center">
            <span className="text-[48px]">🛍️</span>
            <h3 className="text-[#100E1A] text-[22px] font-bold" style={vs}>Ready to Start Selling?</h3>
            <p className="text-[#6B7280] text-[15px] leading-[1.7]" style={vs}>Church members can list products instantly. Verify your membership and start selling in under 2 minutes.</p>
            <button onClick={() => openModal("sell")} className="w-full py-4 bg-[#000080] text-[#FFFDFD] text-[16px] font-bold rounded-[30px] hover:bg-[#0000a0] transition-colors" style={vs}>List an Item Now →</button>
            <p className="text-[#9CA3AF] text-[12px]" style={vs}>Members only · Requires church registration</p>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
