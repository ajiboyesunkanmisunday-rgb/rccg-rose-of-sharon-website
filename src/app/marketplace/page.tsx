"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

const vs = { fontVariationSettings: '"wdth" 100' };

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

export default function MarketplacePage() {
  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");
  const [cart, setCart] = useState<number[]>([]);
  const [wishlist, setWishlist] = useState<number[]>([]);
  const [cartOpen, setCartOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [catOpen, setCatOpen] = useState(false);

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

  return (
    <main className="bg-[#FFFDFD] min-h-screen">
      {/* ── Hero — dark top for navbar visibility ── */}
      <section className="relative w-full overflow-hidden">
        {/* Dark gradient at top so navbar text is readable */}
        <div className="absolute top-0 left-0 right-0 h-[120px] z-10 bg-gradient-to-b from-[rgba(0,0,0,0.65)] to-transparent pointer-events-none" />

        <Navbar activePage="marketplace" />

        {/* Hero card */}
        <div className="pt-[80px] px-4 md:px-10 pb-0">
          <div
            className="relative w-full rounded-[10px] overflow-hidden min-h-[260px] md:min-h-[360px] flex flex-col md:flex-row items-center"
            style={{
              background: "radial-gradient(ellipse at 90% 80%, rgba(255,255,255,1) 0%, rgba(229,229,229,1) 35%, rgba(217,217,217,0.6) 100%)",
            }}
          >
            {/* Decorative icons */}
            <div className="absolute left-[10%] top-[30%] size-[45px] opacity-30 rotate-[-38deg] hidden md:block">
              <svg viewBox="0 0 32 32" fill="none" className="size-full text-[#000080]">
                <path d="M6 6h20l-2 12H8L6 6z" fill="currentColor" opacity="0.3" />
                <circle cx="10" cy="26" r="2" fill="currentColor" opacity="0.5" />
                <circle cx="22" cy="26" r="2" fill="currentColor" opacity="0.5" />
              </svg>
            </div>

            <div className="absolute right-0 bottom-0 w-[40%] h-[60%] opacity-40 pointer-events-none"
              style={{ background: "radial-gradient(ellipse at 80% 100%, rgba(181,181,243,0.5) 0%, transparent 70%)" }}
            />

            {/* Text — left on mobile, right on desktop */}
            <div className="flex flex-col gap-6 md:gap-[30px] p-6 md:p-8 md:ml-auto md:w-1/2 lg:w-[480px] relative z-10">
              <div className="flex flex-col gap-2">
                <h1 className="text-[#000080] font-bold text-[28px] md:text-[37px] leading-tight" style={vs}>Welcome To</h1>
                <h1 className="text-[#000080] font-bold text-[28px] md:text-[37px] leading-tight" style={vs}>ROS Market Place</h1>
              </div>
              <p className="text-[#100E1A] text-[15px] md:text-[18px] leading-[1.6]" style={vs}>
                Purchase reading materials, Children wear, foodstuffs, prepared meal at very affordable price
              </p>
              <a
                href="#products"
                className="flex items-center gap-1 text-[#000080] font-bold text-[18px] md:text-[22px]"
                style={vs}
              >
                Buy Now
                <svg viewBox="0 0 51 51" fill="none" className="size-[40px] md:size-[51px]">
                  <path d="M20 14l10 10-10 10" stroke="#000080" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </a>
            </div>
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
          onClick={() => setCartOpen(true)}
          className="bg-[#100E1A] text-[#FFFDFD] text-[14px] md:text-[16px] px-[24px] md:px-[32px] py-[12px] rounded-[30px] hover:bg-[#1A1826] transition-colors"
          style={vs}
        >
          Check Out
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
                <button
                  key={product.id}
                  onClick={() => setSelectedProduct(product)}
                  className="bg-white rounded-[20px] p-[14px] flex flex-col gap-[20px] md:gap-[24px] shadow-[-4px_-4px_2px_rgba(0,0,0,0.05),4px_4px_2px_rgba(0,0,0,0.05)] text-left hover:shadow-[-4px_-4px_8px_rgba(0,0,128,0.08),4px_4px_8px_rgba(0,0,128,0.08)] transition-shadow group"
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
                </button>
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
          <div className="flex-1 bg-white rounded-[24px] p-8 shadow-[0_8px_40px_rgba(0,0,128,0.10)] flex flex-col gap-5">
            <h3 className="text-[#100E1A] text-[20px] font-bold" style={vs}>Register as a Vendor</h3>
            <input placeholder="Full Name" className="w-full border border-[#D2D2E2] rounded-[12px] px-4 py-3 text-[#100E1A] text-[15px] focus:outline-none focus:border-[#000080] focus:ring-2 focus:ring-[#000080]/10" style={vs} />
            <input placeholder="Phone Number" className="w-full border border-[#D2D2E2] rounded-[12px] px-4 py-3 text-[#100E1A] text-[15px] focus:outline-none focus:border-[#000080] focus:ring-2 focus:ring-[#000080]/10" style={vs} />
            <input placeholder="Product / Service Category" className="w-full border border-[#D2D2E2] rounded-[12px] px-4 py-3 text-[#100E1A] text-[15px] focus:outline-none focus:border-[#000080] focus:ring-2 focus:ring-[#000080]/10" style={vs} />
            <textarea rows={3} placeholder="Brief description of what you sell..." className="w-full border border-[#D2D2E2] rounded-[12px] px-4 py-3 text-[#100E1A] text-[15px] focus:outline-none focus:border-[#000080] focus:ring-2 focus:ring-[#000080]/10 resize-none" style={vs} />
            <button className="w-full py-4 bg-[#000080] text-[#FFFDFD] text-[16px] font-bold rounded-[30px] hover:bg-[#0000a0] transition-colors" style={vs}>
              Apply to Sell →
            </button>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
