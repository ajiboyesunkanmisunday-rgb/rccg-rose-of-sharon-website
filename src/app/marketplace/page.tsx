"use client";

import { useState, useMemo, useEffect, useCallback } from "react";
import Link from "next/link";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { API_BASE } from "@/lib/api";

const vs = { fontVariationSettings: '"wdth" 100' };

const AD_SLIDES = [
  {
    id: 1,
    bgFrom: "#E8F0FF",
    bgTo: "#D4E0F5",
    borderColor: "#000080",
    badge: "MEMBER EXCLUSIVE",
    badgeBg: "#000080",
    title: "SHOP WITHIN\nTHE FAMILY",
    tagline: "QUALITY GOODS FROM YOUR CHURCH COMMUNITY AT VERY AFFORDABLE PRICES",
    taglineBg: "#000080",
    cta: "SHOP NOW",
    ctaHref: "#products",
    note: "Open to all church members",
    visual: "store" as const,
  },
  {
    id: 2,
    bgFrom: "#FFF8E8",
    bgTo: "#FFF0CC",
    borderColor: "#D97706",
    badge: "FEATURED BOOK",
    badgeBg: "#B45309",
    title: "PURPOSE\nDRIVEN LIFE",
    tagline: "BY RICK WARREN — AVAILABLE NOW IN THE MARKETPLACE",
    taglineBg: "#D97706",
    cta: "BUY NOW — ₦4,000",
    ctaHref: "#products",
    note: "Limited stock available",
    image: "https://www.figma.com/api/mcp/asset/05981ae8-ffab-4368-a514-3a3ca960b52e.png",
  },
  {
    id: 3,
    bgFrom: "#F0EEFF",
    bgTo: "#E2DDFF",
    borderColor: "#7C3AED",
    badge: "FREE TRAINING",
    badgeBg: "#7C3AED",
    title: "CSR SKILLS\nPROGRAM",
    tagline: "DIGITAL MARKETING, GRAPHIC DESIGN & MORE — ENROL TODAY",
    taglineBg: "#7C3AED",
    cta: "EXPLORE CSR",
    ctaHref: "/csr",
    note: "Open to all community members",
    visual: "csr" as const,
  },
  {
    id: 4,
    bgFrom: "#FFF0F0",
    bgTo: "#FFE0E0",
    borderColor: "#DC2626",
    badge: "NEW LISTING",
    badgeBg: "#DC2626",
    title: "ITALIAN\nLEATHER SHOES",
    tagline: "PREMIUM QUALITY FROM A CHURCH MEMBER — FORMAL & SPECIAL OCCASIONS",
    taglineBg: "#DC2626",
    cta: "VIEW PRODUCT",
    ctaHref: "#products",
    note: "₦75,000 · Limited quantity",
    image: "https://www.figma.com/api/mcp/asset/6b05ca7f-d0a1-4c58-ba9d-e113ab18b019.png",
  },
];

const CATEGORIES = [
  "All",
  "Books",
  "Restaurant",
  "Sneakers",
  "T-shirts",
  "Roundnecks",
  "Foodstuffs",
  "Shoes",
  "Children Toys",
  "Suits",
];

interface Product {
  id: number;
  name: string;
  description: string;
  price: string;
  category: string;
  image: string;
}

const PRODUCTS: Product[] = [
  {
    id: 1,
    name: "Nike Round Neck",
    description: "Silk and linen material quality Nike wears.",
    price: "₦45,000.00",
    category: "Roundnecks",
    image: "https://www.figma.com/api/mcp/asset/1153e10c-c55b-4ac2-8749-14ef42a64066.png",
  },
  {
    id: 2,
    name: "Sport Sneaker",
    description: "Sneaker suitable for jogging and special sport activities.",
    price: "₦45,000.00",
    category: "Sneakers",
    image: "https://www.figma.com/api/mcp/asset/a916d6b8-1b7b-42c8-85fc-724432ca1a3c.png",
  },
  {
    id: 3,
    name: "Purpose Driven Life",
    description: "Book on purpose finding by Rick Warren.",
    price: "₦45,000.00",
    category: "Books",
    image: "https://www.figma.com/api/mcp/asset/05981ae8-ffab-4368-a514-3a3ca960b52e.png",
  },
  {
    id: 4,
    name: "Italian Shoe",
    description: "Quality Italian leather shoes for formal occasions.",
    price: "₦75,000.00",
    category: "Shoes",
    image: "https://www.figma.com/api/mcp/asset/6b05ca7f-d0a1-4c58-ba9d-e113ab18b019.png",
  },
  {
    id: 5,
    name: "Men Blue Suit",
    description: "Classic blue suit for formal and church occasions.",
    price: "₦145,000",
    category: "Suits",
    image: "https://www.figma.com/api/mcp/asset/746cda1b-3b87-47b0-8677-fa2d55d0bd04.png",
  },
  {
    id: 6,
    name: "Snack & Spicy",
    description: "Sweet taste snack & spicy from ROS restaurant.",
    price: "₦5,060",
    category: "Restaurant",
    image: "https://www.figma.com/api/mcp/asset/ba329fc1-db3e-4d6d-828a-7b1819f694c1.png",
  },
  {
    id: 7,
    name: "Fried Rice & Chicken",
    description: "Delicious fried rice and chicken from ROS kitchen.",
    price: "₦9,500",
    category: "Restaurant",
    image: "https://www.figma.com/api/mcp/asset/ebe62225-db16-4a2c-9e99-d820eb7830d7.png",
  },
  {
    id: 8,
    name: "Female Red Leather Bag",
    description: "Premium red leather bag, stylish and durable.",
    price: "₦45,000.00",
    category: "T-shirts",
    image: "https://www.figma.com/api/mcp/asset/e0127f48-0aeb-4d45-97c0-cc8d6485d923.png",
  },
  {
    id: 9,
    name: "Power of Character",
    description: "Book on character by Myles Munroe.",
    price: "₦4,000",
    category: "Books",
    image: "https://www.figma.com/api/mcp/asset/4b6ab26c-e188-4441-bd21-61c5e7e7793b.png",
  },
];

const PRODUCT_CATEGORIES = [
  { label: "Books", value: "BOOK" },
  { label: "Electronics", value: "ELECTRONICS" },
  { label: "Cooking Utensils", value: "COOKING_UTENSILS" },
  { label: "Automobile", value: "AUTOMOBILE" },
  { label: "Wears & Clothing", value: "WEARS" },
];

interface VerifiedMember { id: string; name: string; type: "member" | "emember" }

export default function MarketplacePage() {
  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");
  const [cart, setCart] = useState<number[]>([]);
  const [wishlist, setWishlist] = useState<number[]>([]);
  const [cartOpen, setCartOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [catOpen, setCatOpen] = useState(false);

  // Member verification state
  const [modalMode, setModalMode] = useState<"sell" | "checkout" | null>(null);
  const [verifyInput, setVerifyInput] = useState("");
  const [verifyStatus, setVerifyStatus] = useState<"idle" | "loading" | "error">("idle");
  const [verifyError, setVerifyError] = useState("");
  const [verifiedMember, setVerifiedMember] = useState<VerifiedMember | null>(null);

  // Carousel state
  const [slideIndex, setSlideIndex] = useState(0);

  const nextSlide = useCallback(() => {
    setSlideIndex((i) => (i + 1) % AD_SLIDES.length);
  }, []);

  useEffect(() => {
    const t = setInterval(nextSlide, 4500);
    return () => clearInterval(t);
  }, [nextSlide]);

  // Sell flow state
  const [sellStep, setSellStep] = useState<"verify" | "form" | "success">("verify");
  const [listForm, setListForm] = useState({
    name: "", description: "", price: "", category: "",
    quantityLeft: "", imageUrl: "", otherInformation: "", tags: "",
  });
  const [listStatus, setListStatus] = useState<"idle" | "loading" | "error">("idle");
  const [listError, setListError] = useState("");

  const filtered = useMemo(() => {
    return PRODUCTS.filter((p) => {
      const matchCat = activeCategory === "All" || p.category === activeCategory;
      const matchSearch = p.name.toLowerCase().includes(search.toLowerCase()) ||
        p.description.toLowerCase().includes(search.toLowerCase());
      return matchCat && matchSearch;
    });
  }, [search, activeCategory]);

  function addToCart(id: number, e?: React.MouseEvent) {
    e?.stopPropagation();
    setCart((prev) => [...prev, id]);
  }

  function toggleWishlist(id: number, e?: React.MouseEvent) {
    e?.stopPropagation();
    setWishlist((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    );
  }

  const cartCount = cart.length;

  function openModal(mode: "sell" | "checkout") {
    setModalMode(mode);
    setSellStep("verify");
    setVerifyInput("");
    setVerifyStatus("idle");
    setVerifyError("");
    setVerifiedMember(null);
    setListForm({ name: "", description: "", price: "", category: "", quantityLeft: "", imageUrl: "", otherInformation: "", tags: "" });
    setListStatus("idle");
    setListError("");
    setCartOpen(false);
  }

  function closeModal() {
    setModalMode(null);
    setVerifyInput("");
    setVerifyStatus("idle");
    setVerifyError("");
  }

  async function handleVerify(e: React.FormEvent) {
    e.preventDefault();
    if (!verifyInput.trim()) return;
    setVerifyStatus("loading");
    setVerifyError("");
    try {
      // Search full members first
      const memberRes = await fetch(`${API_BASE}/users/member/search`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text: verifyInput.trim() }),
      });
      if (memberRes.ok) {
        const data = await memberRes.json();
        const users = Array.isArray(data) ? data : (data.content || data.data || []);
        if (users.length > 0) {
          const u = users[0];
          setVerifiedMember({ id: u.id, name: `${u.firstName} ${u.lastName}`, type: "member" });
          setSellStep("form");
          setVerifyStatus("idle");
          return;
        }
      }
      // Try e-members
      const emRes = await fetch(`${API_BASE}/users/e-member/search`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text: verifyInput.trim() }),
      });
      if (emRes.ok) {
        const data = await emRes.json();
        const users = Array.isArray(data) ? data : (data.content || data.data || []);
        if (users.length > 0) {
          const u = users[0];
          setVerifiedMember({ id: u.id, name: `${u.firstName} ${u.lastName}`, type: "emember" });
          setSellStep("form");
          setVerifyStatus("idle");
          return;
        }
      }
      setVerifyStatus("error");
      setVerifyError("No church member found with that phone number or email. Please register first.");
    } catch {
      setVerifyStatus("error");
      setVerifyError("Could not verify membership. Please try again.");
    }
  }

  async function handleListProduct(e: React.FormEvent) {
    e.preventDefault();
    if (!verifiedMember) return;
    setListStatus("loading");
    setListError("");
    try {
      const body: Record<string, unknown> = {
        name: listForm.name,
        description: listForm.description,
        owner: verifiedMember.id,
        price: parseFloat(listForm.price),
        category: listForm.category,
        quantityLeft: parseInt(listForm.quantityLeft) || 1,
      };
      if (listForm.imageUrl.trim()) body.images = [listForm.imageUrl.trim()];
      if (listForm.otherInformation.trim()) body.otherInformation = listForm.otherInformation.trim();
      if (listForm.tags.trim()) body.tags = listForm.tags.split(",").map((t) => t.trim()).filter(Boolean);

      await fetch(`${API_BASE}/products`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      setSellStep("success");
      setListStatus("idle");
    } catch {
      setListStatus("error");
      setListError("Failed to submit product listing. Please try again.");
    }
  }

  const inputBase = "w-full rounded-lg border border-[#E5E7EB] px-4 py-3 text-sm text-[#374151] outline-none placeholder:text-[#9CA3AF] focus:border-[#000080] focus:ring-1 focus:ring-[#000080]";

  return (
    <main className="bg-[#FFFDFD] min-h-screen">
      {/* ── Hero — dark top for navbar visibility ── */}
      <section className="relative w-full overflow-hidden">
        {/* Dark gradient at top so navbar text is readable */}
        <div className="absolute top-0 left-0 right-0 h-[120px] z-10 bg-gradient-to-b from-[rgba(0,0,0,0.65)] to-transparent pointer-events-none" />

        <Navbar activePage="marketplace" />

        {/* Carousel banner */}
        <div className="pt-[80px] px-4 md:px-10 pb-0">
          {/* Gradient border wrapper */}
          <div
            className="w-full rounded-[12px] p-[2.5px]"
            style={{ background: `linear-gradient(135deg, ${AD_SLIDES[slideIndex].borderColor}, #B5B5F3, ${AD_SLIDES[slideIndex].borderColor})` }}
          >
            <div
              className="relative w-full rounded-[10px] overflow-hidden min-h-[200px] md:min-h-[320px] flex flex-col md:flex-row items-stretch transition-all duration-500"
              style={{ background: `linear-gradient(120deg, ${AD_SLIDES[slideIndex].bgFrom} 0%, ${AD_SLIDES[slideIndex].bgTo} 100%)` }}
            >
              {/* Left: visual */}
              <div className="relative flex items-center justify-center w-full md:w-[45%] min-h-[160px] md:min-h-[320px] overflow-hidden flex-shrink-0">
                {AD_SLIDES[slideIndex].image ? (
                  /* Product image */
                  <>
                    <div className="absolute inset-0 opacity-10"
                      style={{ background: `radial-gradient(ellipse at 50% 120%, ${AD_SLIDES[slideIndex].borderColor} 0%, transparent 70%)` }}
                    />
                    <img
                      src={AD_SLIDES[slideIndex].image}
                      alt=""
                      className="relative z-10 max-h-[180px] md:max-h-[280px] w-auto object-contain drop-shadow-2xl transition-all duration-500"
                    />
                  </>
                ) : AD_SLIDES[slideIndex].visual === "store" ? (
                  /* Store / shopping illustration */
                  <div className="relative z-10 flex items-end justify-center gap-[-8px] h-[160px] md:h-[260px] w-full px-6">
                    <div className="absolute inset-0 opacity-10"
                      style={{ background: `radial-gradient(ellipse at 50% 100%, ${AD_SLIDES[slideIndex].borderColor} 0%, transparent 70%)` }}
                    />
                    {[
                      { label: "Reading", emoji: "📚", h: "100px", md: "160px", rot: "-6deg" },
                      { label: "Clothing", emoji: "👔", h: "120px", md: "200px", rot: "0deg" },
                      { label: "Food", emoji: "🍱", h: "90px", md: "150px", rot: "5deg" },
                    ].map((item) => (
                      <div
                        key={item.label}
                        className="flex flex-col items-center justify-end rounded-[16px] bg-white/70 backdrop-blur-sm border border-white/80 shadow-lg px-3 py-4 mx-1"
                        style={{ height: item.h, transform: `rotate(${item.rot})` }}
                      >
                        <span style={{ fontSize: "clamp(24px, 5vw, 40px)" }}>{item.emoji}</span>
                        <span className="text-[10px] md:text-[12px] font-semibold text-[#374151] mt-1 whitespace-nowrap">{item.label}</span>
                      </div>
                    ))}
                    {/* "UP TO" badge */}
                    <div className="absolute top-4 left-4 md:top-6 md:left-8 size-[64px] md:size-[84px] rounded-full flex flex-col items-center justify-center text-center shadow-xl"
                      style={{ background: AD_SLIDES[slideIndex].badgeBg }}>
                      <span className="text-white text-[10px] md:text-[11px] font-bold leading-tight">MEMBER</span>
                      <span className="text-white text-[14px] md:text-[18px] font-black leading-tight">ONLY</span>
                    </div>
                  </div>
                ) : (
                  /* CSR illustration */
                  <div className="relative z-10 flex items-end justify-center gap-3 h-[160px] md:h-[260px] w-full px-6">
                    <div className="absolute inset-0 opacity-10"
                      style={{ background: `radial-gradient(ellipse at 50% 100%, ${AD_SLIDES[slideIndex].borderColor} 0%, transparent 70%)` }}
                    />
                    {[
                      { label: "Marketing", emoji: "📣", h: "110px", md: "170px", rot: "-5deg" },
                      { label: "Design", emoji: "🎨", h: "130px", md: "210px", rot: "0deg" },
                      { label: "Business", emoji: "💼", h: "100px", md: "160px", rot: "4deg" },
                    ].map((item) => (
                      <div
                        key={item.label}
                        className="flex flex-col items-center justify-end rounded-[16px] bg-white/70 backdrop-blur-sm border border-white/80 shadow-lg px-3 py-4 mx-1"
                        style={{ height: item.h, transform: `rotate(${item.rot})` }}
                      >
                        <span style={{ fontSize: "clamp(24px, 5vw, 40px)" }}>{item.emoji}</span>
                        <span className="text-[10px] md:text-[12px] font-semibold text-[#374151] mt-1 whitespace-nowrap">{item.label}</span>
                      </div>
                    ))}
                    <div className="absolute top-4 left-4 md:top-6 md:left-8 size-[64px] md:size-[84px] rounded-full flex flex-col items-center justify-center text-center shadow-xl"
                      style={{ background: AD_SLIDES[slideIndex].badgeBg }}>
                      <span className="text-white text-[10px] md:text-[11px] font-bold leading-tight">100%</span>
                      <span className="text-white text-[13px] md:text-[15px] font-black leading-tight">FREE</span>
                    </div>
                  </div>
                )}
              </div>

              {/* Right: text */}
              <div className="flex flex-col justify-center gap-[10px] md:gap-[16px] px-5 md:px-8 py-5 md:py-8 flex-1 relative z-10">
                {/* Brand/label */}
                <div className="flex items-center gap-[10px]">
                  <div className="size-[36px] md:size-[46px] rounded-full flex items-center justify-center flex-shrink-0"
                    style={{ background: AD_SLIDES[slideIndex].badgeBg }}>
                    <svg width="20" height="16" viewBox="0 0 25 23" fill="none">
                      <path d="M2 2h3l3.5 14h12l3-10H7" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                      <circle cx="10" cy="20" r="1.5" fill="white" />
                      <circle cx="19" cy="20" r="1.5" fill="white" />
                    </svg>
                  </div>
                  <span className="font-black text-[14px] md:text-[18px] tracking-wider"
                    style={{ color: AD_SLIDES[slideIndex].badgeBg, fontVariationSettings: '"wdth" 100' }}>
                    ROS MARKETPLACE
                  </span>
                </div>

                {/* Headline */}
                <h2
                  className="font-black text-[20px] md:text-[28px] lg:text-[34px] leading-tight text-[#100E1A] whitespace-pre-line"
                  style={{ fontVariationSettings: '"wdth" 100' }}
                >
                  {AD_SLIDES[slideIndex].title}
                </h2>

                {/* Tagline block */}
                <div className="rounded-[6px] px-3 py-[10px] md:px-4 md:py-[12px]"
                  style={{ background: AD_SLIDES[slideIndex].taglineBg }}>
                  <p className="text-white font-bold text-[11px] md:text-[14px] leading-tight"
                    style={{ fontVariationSettings: '"wdth" 100' }}>
                    {AD_SLIDES[slideIndex].tagline}
                  </p>
                </div>

                {/* CTA */}
                <div className="flex flex-col gap-[6px]">
                  <Link
                    href={AD_SLIDES[slideIndex].ctaHref}
                    className="self-start px-[20px] md:px-[28px] py-[10px] md:py-[12px] rounded-[6px] text-white font-black text-[13px] md:text-[16px] tracking-wide hover:opacity-90 transition-opacity"
                    style={{ background: AD_SLIDES[slideIndex].badgeBg, fontVariationSettings: '"wdth" 100' }}
                  >
                    {AD_SLIDES[slideIndex].cta}
                  </Link>
                  <p className="text-[#6B7280] text-[11px] md:text-[12px]"
                    style={{ fontVariationSettings: '"wdth" 100' }}>
                    {AD_SLIDES[slideIndex].note}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Dot indicators */}
          <div className="flex items-center justify-center gap-[8px] mt-[12px] pb-[4px]">
            {AD_SLIDES.map((slide, i) => (
              <button
                key={slide.id}
                onClick={() => setSlideIndex(i)}
                className="rounded-full transition-all duration-300"
                style={{
                  background: i === slideIndex ? AD_SLIDES[slideIndex].borderColor : "#D1D5DB",
                  width: i === slideIndex ? "28px" : "8px",
                  height: "8px",
                }}
                aria-label={`Go to slide ${i + 1}`}
              />
            ))}
          </div>
        </div>
      </section>

      {/* ── Search + Cart bar ── */}
      <div id="products" className="flex flex-wrap items-center gap-3 justify-center px-4 md:px-[60px] lg:px-[100px] py-[16px] mt-[16px]">
        {/* Search input */}
        <div className="flex items-center gap-[10px] px-[16px] md:px-[30px] py-[7px] h-[48px] rounded-[30px] border-[1.5px] border-[#00003D] bg-[#FFFDFD] flex-1 max-w-[411px]">
          <svg viewBox="0 0 21 21" fill="none" className="size-[18px] md:size-[21px] flex-shrink-0">
            <circle cx="9.5" cy="9.5" r="7.5" stroke="#00003D" strokeWidth="2" />
            <path d="M15.5 15.5l4 4" stroke="#00003D" strokeWidth="2" strokeLinecap="round" />
          </svg>
          <input
            type="text"
            placeholder="Search Product"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="bg-transparent outline-none text-[#00003D] font-bold text-[15px] md:text-[18px] placeholder:text-[#00003D]/70 w-full"
            style={vs}
          />
        </div>

        {/* Cart */}
        <button
          onClick={() => setCartOpen(!cartOpen)}
          className="relative size-[52px] md:size-[64px] flex items-center justify-center"
        >
          <svg viewBox="0 0 64 64" fill="none" className="size-full text-[#100E1A]">
            <path d="M10 10h6l6 28h22l6-20H20" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
            <circle cx="28" cy="52" r="4" fill="currentColor" />
            <circle cx="46" cy="52" r="4" fill="currentColor" />
          </svg>
          <div className="absolute top-0 right-0 bg-[#000080] rounded-[19px] min-w-[24px] h-[24px] flex items-center justify-center px-[4px]">
            <span className="text-[#FFFDFD] text-[12px] font-bold" style={vs}>{cartCount}</span>
          </div>
        </button>

        {/* Check Out */}
        <button
          onClick={() => openModal("checkout")}
          className="bg-[#100E1A] text-[#FFFDFD] text-[14px] md:text-[16px] px-[24px] md:px-[32px] py-[12px] rounded-[30px] hover:bg-[#1A1826] transition-colors"
          style={vs}
        >
          Check Out
        </button>

        {/* Sell button */}
        <button
          onClick={() => openModal("sell")}
          className="bg-[#000080] text-[#FFFDFD] text-[14px] md:text-[16px] px-[24px] md:px-[32px] py-[12px] rounded-[30px] hover:bg-[#0000a0] transition-colors border-2 border-[#000080]"
          style={vs}
        >
          + Sell an Item
        </button>
      </div>

      {/* Cart dropdown */}
      {cartOpen && (
        <div className="fixed top-[80px] right-4 md:right-[60px] z-50 bg-white rounded-[20px] shadow-[0_8px_40px_rgba(0,0,0,0.15)] p-[20px] md:p-[24px] w-[min(340px,calc(100vw-32px))]">
          <div className="flex items-center justify-between mb-[16px]">
            <h3 className="text-[#100E1A] text-[16px] md:text-[18px] font-bold" style={vs}>Cart ({cartCount} items)</h3>
            <button onClick={() => setCartOpen(false)} className="text-[#A3A1AF] hover:text-[#100E1A] text-[20px] leading-none">×</button>
          </div>
          {cartCount === 0 ? (
            <p className="text-[#A3A1AF] text-[14px]" style={vs}>Your cart is empty.</p>
          ) : (
            <div className="flex flex-col gap-[8px]">
              {cart.slice(0, 5).map((id, i) => {
                const p = PRODUCTS.find((x) => x.id === id);
                return p ? (
                  <div key={i} className="flex items-center gap-[12px]">
                    <img src={p.image} alt={p.name} className="size-[40px] rounded-[8px] object-cover" />
                    <div className="flex flex-col gap-[2px] flex-1 min-w-0">
                      <p className="text-[#100E1A] text-[13px] font-bold truncate" style={vs}>{p.name}</p>
                      <p className="text-[#000080] text-[12px] font-semibold" style={vs}>{p.price}</p>
                    </div>
                  </div>
                ) : null;
              })}
              {cartCount > 5 && (
                <p className="text-[#A3A1AF] text-[12px]" style={vs}>+{cartCount - 5} more items</p>
              )}
              <button
                onClick={() => openModal("checkout")}
                className="mt-[8px] w-full bg-[#000080] text-[#FFFDFD] text-[14px] font-bold py-[12px] rounded-[20px] hover:bg-[#0000a0] transition-colors"
                style={vs}
              >
                Proceed to Checkout
              </button>
            </div>
          )}
        </div>
      )}

      {/* Product detail modal */}
      {selectedProduct && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50"
          onClick={() => setSelectedProduct(null)}
        >
          <div
            className="bg-white rounded-[24px] p-6 md:p-8 w-full max-w-[500px] flex flex-col gap-5 shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-start justify-between">
              <h2 className="text-[#100E1A] text-[22px] font-bold" style={vs}>{selectedProduct.name}</h2>
              <button onClick={() => setSelectedProduct(null)} className="text-[#A3A1AF] text-[24px] leading-none hover:text-[#100E1A]">×</button>
            </div>
            <div className="h-[260px] w-full rounded-[16px] overflow-hidden">
              <img src={selectedProduct.image} alt={selectedProduct.name} className="w-full h-full object-cover" />
            </div>
            <p className="text-[#A3A1AF] text-[14px] leading-[1.6]" style={vs}>{selectedProduct.description}</p>
            <div className="flex items-center justify-between">
              <div className="bg-[#100E1A] px-6 py-3 rounded-[33px]">
                <span className="text-[#FFFDFD] text-[18px] font-black" style={vs}>{selectedProduct.price}</span>
              </div>
              <div className="flex items-center gap-4">
                <button
                  onClick={(e) => toggleWishlist(selectedProduct.id, e)}
                  aria-label="Add to wishlist"
                >
                  <svg viewBox="0 0 37 32" fill="none" className="w-[37px] h-[32px]">
                    <path
                      d="M18.5 28S3 19.5 3 10.5C3 7 5.5 4 9 4c2.5 0 4.8 1.5 6 3.8a7.15 7.15 0 0 1 12 3.5c.5 6.3-8.5 16.7-8.5 16.7z"
                      fill={wishlist.includes(selectedProduct.id) ? "#FF4D6D" : "none"}
                      stroke={wishlist.includes(selectedProduct.id) ? "#FF4D6D" : "#100E1A"}
                      strokeWidth="2"
                    />
                  </svg>
                </button>
                <button
                  onClick={(e) => { addToCart(selectedProduct.id, e); setSelectedProduct(null); }}
                  className="bg-[#000080] px-6 py-3 rounded-[24px] text-[#FFFDFD] text-[14px] font-bold hover:bg-[#0000a0] transition-colors"
                  style={vs}
                >
                  Add to Cart
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ── Member Verification / Sell / Checkout Modal ── */}
      {modalMode && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50" onClick={closeModal}>
          <div
            className="bg-white rounded-[24px] p-6 md:p-8 w-full max-w-[520px] flex flex-col gap-5 shadow-2xl max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="flex items-start justify-between">
              <div>
                <h2 className="text-[#100E1A] text-[20px] font-bold" style={vs}>
                  {modalMode === "sell" ? "List a Product" : "Checkout"}
                </h2>
                <p className="text-[#A3A1AF] text-[13px] mt-1" style={vs}>
                  {modalMode === "sell"
                    ? "Church members can list items for sale"
                    : "Verify your membership to proceed"}
                </p>
              </div>
              <button onClick={closeModal} className="text-[#A3A1AF] text-[24px] leading-none hover:text-[#100E1A]">×</button>
            </div>

            {/* Step: Verify */}
            {sellStep === "verify" && (
              <form onSubmit={handleVerify} className="flex flex-col gap-4">
                <div className="bg-[#F3F4F6] rounded-[16px] p-4 flex items-start gap-3">
                  <span className="text-[20px]">🔒</span>
                  <p className="text-[#374151] text-[13px] leading-[1.6]" style={vs}>
                    This feature is for <strong>registered church members only</strong>. Enter your registered phone number or email address to verify.
                  </p>
                </div>
                <div className="flex flex-col gap-1">
                  <label className="text-[14px] font-semibold text-[#111827]">Phone Number or Email</label>
                  <input
                    type="text"
                    required
                    value={verifyInput}
                    onChange={(e) => setVerifyInput(e.target.value)}
                    placeholder="e.g. 08012345678 or your@email.com"
                    className={inputBase}
                    style={vs}
                  />
                </div>
                {verifyStatus === "error" && (
                  <div className="bg-red-50 border border-red-200 rounded-lg px-4 py-3 text-sm text-red-700" style={vs}>
                    {verifyError}
                    <br />
                    <Link href="/first-timer" className="text-[#000080] font-medium underline">Register as a first-timer</Link>
                    {" or "}
                    <Link href="/e-member" className="text-[#000080] font-medium underline">become an e-member</Link>
                  </div>
                )}
                <button
                  type="submit"
                  disabled={verifyStatus === "loading"}
                  className="w-full bg-[#000080] text-[#FFFDFD] py-[14px] rounded-[24px] text-[15px] font-bold hover:bg-[#0000a0] transition-colors disabled:opacity-60"
                  style={vs}
                >
                  {verifyStatus === "loading" ? "Verifying..." : "Verify Membership"}
                </button>
              </form>
            )}

            {/* Step: List product form */}
            {sellStep === "form" && verifiedMember && modalMode === "sell" && (
              <form onSubmit={handleListProduct} className="flex flex-col gap-4">
                <div className="bg-green-50 border border-green-200 rounded-[12px] px-4 py-3 flex items-center gap-2">
                  <span className="text-green-600 font-bold text-lg">✓</span>
                  <p className="text-green-700 text-[13px] font-medium" style={vs}>
                    Verified as: <strong>{verifiedMember.name}</strong>
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div className="flex flex-col gap-1 sm:col-span-2">
                    <label className="text-[14px] font-semibold text-[#111827]">Product Name *</label>
                    <input type="text" required value={listForm.name} onChange={(e) => setListForm(p => ({ ...p, name: e.target.value }))} className={inputBase} placeholder="e.g. Men's Leather Shoes" style={vs} />
                  </div>
                  <div className="flex flex-col gap-1">
                    <label className="text-[14px] font-semibold text-[#111827]">Price (₦) *</label>
                    <input type="number" required min="0" step="0.01" value={listForm.price} onChange={(e) => setListForm(p => ({ ...p, price: e.target.value }))} className={inputBase} placeholder="e.g. 5000" style={vs} />
                  </div>
                  <div className="flex flex-col gap-1">
                    <label className="text-[14px] font-semibold text-[#111827]">Quantity Available *</label>
                    <input type="number" required min="1" value={listForm.quantityLeft} onChange={(e) => setListForm(p => ({ ...p, quantityLeft: e.target.value }))} className={inputBase} placeholder="e.g. 10" style={vs} />
                  </div>
                  <div className="flex flex-col gap-1 sm:col-span-2">
                    <label className="text-[14px] font-semibold text-[#111827]">Category *</label>
                    <select required value={listForm.category} onChange={(e) => setListForm(p => ({ ...p, category: e.target.value }))} className={`${inputBase} appearance-none cursor-pointer`} style={vs}>
                      <option value="">Select category</option>
                      {PRODUCT_CATEGORIES.map((c) => <option key={c.value} value={c.value}>{c.label}</option>)}
                    </select>
                  </div>
                  <div className="flex flex-col gap-1 sm:col-span-2">
                    <label className="text-[14px] font-semibold text-[#111827]">Description *</label>
                    <textarea required rows={3} value={listForm.description} onChange={(e) => setListForm(p => ({ ...p, description: e.target.value }))} className={`${inputBase} resize-none`} placeholder="Describe your product..." style={vs} />
                  </div>
                  <div className="flex flex-col gap-1 sm:col-span-2">
                    <label className="text-[14px] font-semibold text-[#111827]">Product Image URL <span className="text-[#9CA3AF] font-normal">(optional)</span></label>
                    <input type="url" value={listForm.imageUrl} onChange={(e) => setListForm(p => ({ ...p, imageUrl: e.target.value }))} className={inputBase} placeholder="https://..." style={vs} />
                  </div>
                  <div className="flex flex-col gap-1 sm:col-span-2">
                    <label className="text-[14px] font-semibold text-[#111827]">Tags <span className="text-[#9CA3AF] font-normal">(comma-separated, optional)</span></label>
                    <input type="text" value={listForm.tags} onChange={(e) => setListForm(p => ({ ...p, tags: e.target.value }))} className={inputBase} placeholder="e.g. leather, formal, men" style={vs} />
                  </div>
                  <div className="flex flex-col gap-1 sm:col-span-2">
                    <label className="text-[14px] font-semibold text-[#111827]">Other Information <span className="text-[#9CA3AF] font-normal">(optional)</span></label>
                    <textarea rows={2} value={listForm.otherInformation} onChange={(e) => setListForm(p => ({ ...p, otherInformation: e.target.value }))} className={`${inputBase} resize-none`} placeholder="Contact preference, pickup location, etc." style={vs} />
                  </div>
                </div>

                {listStatus === "error" && (
                  <p className="text-red-600 text-[13px]" style={vs}>{listError}</p>
                )}

                <div className="flex gap-3">
                  <button type="button" onClick={() => setSellStep("verify")} className="flex-1 border-2 border-[#000080] text-[#000080] py-[12px] rounded-[24px] text-[15px] font-bold hover:bg-[#000080]/5 transition-colors" style={vs}>
                    Back
                  </button>
                  <button type="submit" disabled={listStatus === "loading"} className="flex-1 bg-[#000080] text-[#FFFDFD] py-[12px] rounded-[24px] text-[15px] font-bold hover:bg-[#0000a0] transition-colors disabled:opacity-60" style={vs}>
                    {listStatus === "loading" ? "Submitting..." : "List Product"}
                  </button>
                </div>
              </form>
            )}

            {/* Step: Checkout form (verified) */}
            {sellStep === "form" && verifiedMember && modalMode === "checkout" && (
              <div className="flex flex-col gap-4">
                <div className="bg-green-50 border border-green-200 rounded-[12px] px-4 py-3 flex items-center gap-2">
                  <span className="text-green-600 font-bold text-lg">✓</span>
                  <p className="text-green-700 text-[13px] font-medium" style={vs}>
                    Verified as: <strong>{verifiedMember.name}</strong>
                  </p>
                </div>

                {cartCount === 0 ? (
                  <p className="text-[#A3A1AF] text-[14px] text-center py-4" style={vs}>Your cart is empty.</p>
                ) : (
                  <>
                    <div className="flex flex-col gap-3">
                      {cart.map((id, i) => {
                        const p = PRODUCTS.find((x) => x.id === id);
                        return p ? (
                          <div key={i} className="flex items-center gap-3 p-3 bg-[#F3F4F6] rounded-[12px]">
                            <img src={p.image} alt={p.name} className="size-[48px] rounded-[8px] object-cover flex-shrink-0" />
                            <div className="flex-1 min-w-0">
                              <p className="text-[#100E1A] text-[13px] font-bold truncate" style={vs}>{p.name}</p>
                              <p className="text-[#000080] text-[12px] font-semibold" style={vs}>{p.price}</p>
                            </div>
                          </div>
                        ) : null;
                      })}
                    </div>
                    <div className="bg-[#000080]/5 rounded-[12px] p-4 text-center">
                      <p className="text-[#100E1A] text-[13px] leading-[1.6]" style={vs}>
                        Your order has been noted. Please bring this list to church on Sunday or contact the seller directly to arrange pickup.
                      </p>
                    </div>
                    <button
                      onClick={closeModal}
                      className="w-full bg-[#000080] text-[#FFFDFD] py-[14px] rounded-[24px] text-[15px] font-bold hover:bg-[#0000a0] transition-colors"
                      style={vs}
                    >
                      Done
                    </button>
                  </>
                )}
              </div>
            )}

            {/* Step: Success (listing submitted) */}
            {sellStep === "success" && (
              <div className="flex flex-col gap-4 items-center text-center py-4">
                <div className="size-[72px] rounded-full bg-green-100 flex items-center justify-center">
                  <svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="#16a34a" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                </div>
                <p className="text-[#000080] text-[20px] font-bold" style={vs}>Product Submitted!</p>
                <p className="text-[#6B7280] text-[14px] leading-[1.6]" style={vs}>
                  Your product listing has been submitted and is pending approval from the church admin. It will appear in the marketplace once approved.
                </p>
                <button onClick={closeModal} className="w-full bg-[#000080] text-[#FFFDFD] py-[14px] rounded-[24px] text-[15px] font-bold hover:bg-[#0000a0] transition-colors" style={vs}>
                  Done
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      {/* ── Main content: sidebar + grid ── */}
      <div className="flex flex-col md:flex-row gap-6 md:gap-[32px] px-4 md:px-[40px] py-[24px] md:py-[32px] w-full">

        {/* Category Sidebar — mobile: horizontal scroll, desktop: vertical */}
        <aside className="w-full md:w-[181px] md:flex-shrink-0">
          {/* Mobile: horizontal scroll pills */}
          <div className="flex md:hidden items-center gap-2 overflow-x-auto pb-2 scrollbar-hide">
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={[
                  "flex-shrink-0 px-4 py-2 rounded-full text-[13px] font-medium border transition-colors",
                  activeCategory === cat
                    ? "bg-[#000080] border-[#000080] text-white"
                    : "border-[#3A394F] text-black hover:border-[#000080]",
                ].join(" ")}
                style={vs}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Desktop: vertical list */}
          <div className="hidden md:flex flex-col gap-[20px]">
            <h2 className="text-black font-bold text-[22px] lg:text-[25px]" style={vs}>Category</h2>
            <div className="flex flex-col gap-[18px] lg:gap-[24px]">
              {CATEGORIES.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className="flex items-center gap-[16px] lg:gap-[21px] text-left group"
                >
                  <div className={[
                    "size-[36px] lg:size-[40px] rounded-[10px] border-2 flex items-center justify-center flex-shrink-0 transition-colors",
                    activeCategory === cat
                      ? "bg-[#000080] border-[#000080]"
                      : "border-[#3A394F] group-hover:border-[#000080]",
                  ].join(" ")}>
                    {activeCategory === cat && (
                      <svg viewBox="0 0 16 16" fill="none" className="size-[14px]">
                        <path d="M3 8l4 4 6-8" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    )}
                  </div>
                  <span className={[
                    "text-[16px] lg:text-[20px]",
                    activeCategory === cat ? "text-[#000080] font-bold" : "text-black",
                  ].join(" ")} style={vs}>
                    {cat}
                  </span>
                </button>
              ))}
            </div>
          </div>
        </aside>

        {/* Product Grid */}
        <div className="flex-1 min-w-0">
          {filtered.length === 0 ? (
            <div className="flex items-center justify-center h-[400px]">
              <p className="text-[#A3A1AF] text-[18px]" style={vs}>No products found.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-[16px] md:gap-[24px]">
              {filtered.map((product) => (
                <div
                  key={product.id}
                  onClick={() => setSelectedProduct(product)}
                  className="bg-white rounded-[20px] p-[14px] flex flex-col gap-[20px] md:gap-[24px] shadow-[-4px_-4px_2px_rgba(0,0,0,0.05),4px_4px_2px_rgba(0,0,0,0.05)] cursor-pointer hover:shadow-[-4px_-4px_8px_rgba(0,0,128,0.08),4px_4px_8px_rgba(0,0,128,0.08)] transition-shadow group"
                >
                  {/* Product image */}
                  <div className="h-[220px] md:h-[280px] w-full rounded-[18px] overflow-hidden">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>

                  {/* Product info */}
                  <div className="flex flex-col gap-[16px] md:gap-[28px]">
                    <div className="flex flex-col gap-[6px] md:gap-[10px]">
                      <h3 className="text-black font-bold text-[18px] md:text-[22px] leading-[28px]" style={vs}>
                        {product.name}
                      </h3>
                      <p className="text-[#100E1A] text-[14px] md:text-[16px] leading-[1.5] line-clamp-2" style={vs}>
                        {product.description}
                      </p>
                    </div>

                    {/* Price + actions */}
                    <div className="flex items-center justify-between">
                      <div className="bg-[#100E1A] px-4 md:px-[36px] py-[10px] md:py-[13px] rounded-[33px]">
                        <span className="text-[#FFFDFD] text-[14px] md:text-[18px] font-black" style={vs}>
                          {product.price}
                        </span>
                      </div>

                      <div className="flex items-center gap-3 md:gap-[25px]">
                        {/* Wishlist */}
                        <button
                          onClick={(e) => toggleWishlist(product.id, e)}
                          className="flex items-center justify-center"
                          aria-label="Add to wishlist"
                        >
                          <svg viewBox="0 0 37 32" fill="none" className="w-[30px] h-[26px] md:w-[37px] md:h-[32px]">
                            <path
                              d="M18.5 28S3 19.5 3 10.5C3 7 5.5 4 9 4c2.5 0 4.8 1.5 6 3.8a7.15 7.15 0 0 1 12 3.5c.5 6.3-8.5 16.7-8.5 16.7z"
                              fill={wishlist.includes(product.id) ? "#FF4D6D" : "none"}
                              stroke={wishlist.includes(product.id) ? "#FF4D6D" : "#100E1A"}
                              strokeWidth="2"
                            />
                          </svg>
                        </button>

                        {/* Add to cart */}
                        <button
                          onClick={(e) => addToCart(product.id, e)}
                          className="bg-[#00003D] size-[40px] md:size-[48px] rounded-[24px] flex items-center justify-center hover:bg-[#000080] transition-colors"
                          aria-label="Add to cart"
                        >
                          <svg viewBox="0 0 25 23" fill="none" className="w-[20px] h-[18px] md:w-[25px] md:h-[23px]">
                            <path d="M2 2h3l3.5 14h12l3-10H7" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                            <circle cx="10" cy="20" r="1.5" fill="white" />
                            <circle cx="19" cy="20" r="1.5" fill="white" />
                          </svg>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
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

      {/* ── Let's Tailor CTA ── */}
      <section className="relative w-full py-[60px] md:py-[84px] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-[#242222]" />
        <div className="absolute inset-0 opacity-35" style={{
          backgroundImage: "url('https://www.figma.com/api/mcp/asset/00ab7363-f75f-485e-aab4-25d9a90cf966.png')",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }} />
        <div className="relative z-10 flex flex-col items-center gap-[14px] w-full max-w-[495px] px-6 text-center">
          <h2 className="text-[#FFFDFD] text-[26px] md:text-[39px] font-semibold leading-[1.2]" style={vs}>
            {"Let's Tailor "}
            <span className="text-[#9B96FE] italic font-bold" style={{ fontFamily: "'Playfair Display', serif" }}>
              Your Experience.
            </span>
          </h2>
          <p className="text-[#FFFDFD] text-[15px] md:text-[16px] leading-[24px]" style={vs}>
            Join the church groups and see what God can do through you
          </p>
          <div className="flex flex-wrap items-center justify-center gap-3 md:gap-[14px] mt-[8px]">
            <Link
              href="/groups?filter=men"
              className="border-2 border-[#FFFDFD] text-[#FFFDFD] text-[15px] font-medium px-[28px] py-[12px] rounded-[24px] hover:bg-white/10 transition-colors"
              style={vs}
            >
              MEN
            </Link>
            <Link
              href="/groups?filter=women"
              className="border-2 border-[#9B96FE] text-[#9B96FE] text-[15px] font-medium px-[28px] py-[12px] rounded-[24px] hover:bg-[#9B96FE]/10 transition-colors"
              style={vs}
            >
              WOMEN
            </Link>
            <Link
              href="/groups?filter=youth"
              className="border-2 border-[#FFFDFD] text-[#FFFDFD] text-[15px] font-medium px-[28px] py-[12px] rounded-[24px] hover:bg-white/10 transition-colors"
              style={vs}
            >
              YOUTH
            </Link>
          </div>
        </div>
      </section>

      {/* ── Become a Vendor ── */}
      <section className="bg-[#EEF0F7] px-6 md:px-[60px] lg:px-[120px] py-[60px] md:py-[84px]">
        <div className="flex flex-col lg:flex-row gap-10 lg:gap-[80px] items-center">
          <div className="flex flex-col gap-5 flex-1">
            <p className="text-[#000080] text-[13px] uppercase tracking-[0.2em] font-medium" style={vs}>For Sellers</p>
            <h2 className="text-[#100E1A] text-[24px] md:text-[36px] font-bold" style={vs}>Want to Sell on ROS Marketplace?</h2>
            <p className="text-[#A3A1AF] text-[16px] leading-[1.7]" style={vs}>
              If you are a church member with products or services to offer, join our marketplace! Reach hundreds of fellow church members and community customers, all while supporting the church community.
            </p>
            <ul className="flex flex-col gap-3">
              {["Free to list for church members", "No commission on first 3 months", "Get visibility in weekly announcements", "Access to church logistics network"].map(item => (
                <li key={item} className="flex items-center gap-3">
                  <div className="size-[20px] rounded-full bg-[#000080] flex items-center justify-center flex-shrink-0">
                    <span className="text-white text-[11px] font-bold">✓</span>
                  </div>
                  <p className="text-[#100E1A] text-[15px]" style={vs}>{item}</p>
                </li>
              ))}
            </ul>
          </div>
          <div className="flex-1 bg-white rounded-[24px] p-8 shadow-[0_8px_40px_rgba(0,0,128,0.10)] flex flex-col gap-5 items-center justify-center text-center">
            <span className="text-[48px]">🛍️</span>
            <h3 className="text-[#100E1A] text-[22px] font-bold" style={vs}>Ready to Start Selling?</h3>
            <p className="text-[#6B7280] text-[15px] leading-[1.7]" style={vs}>
              Church members can list products instantly. Verify your membership and start selling in under 2 minutes.
            </p>
            <button
              onClick={() => openModal("sell")}
              className="w-full py-4 bg-[#000080] text-[#FFFDFD] text-[16px] font-bold rounded-[30px] hover:bg-[#0000a0] transition-colors"
              style={vs}
            >
              List an Item Now →
            </button>
            <p className="text-[#9CA3AF] text-[12px]" style={vs}>Members only · Requires church registration</p>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
