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

  const filtered = useMemo(() => {
    return PRODUCTS.filter((p) => {
      const matchCat = activeCategory === "All" || p.category === activeCategory;
      const matchSearch = p.name.toLowerCase().includes(search.toLowerCase()) ||
        p.description.toLowerCase().includes(search.toLowerCase());
      return matchCat && matchSearch;
    });
  }, [search, activeCategory]);

  function addToCart(id: number) {
    setCart((prev) => [...prev, id]);
  }

  function toggleWishlist(id: number) {
    setWishlist((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    );
  }

  const cartCount = cart.length;

  return (
    <main className="bg-[#FFFDFD] min-h-screen">
      {/* ── Hero ── */}
      <section className="relative w-full h-[440px] flex items-center justify-center overflow-hidden">
        <div
          className="absolute inset-[190px_40px_0_40px] rounded-[10px] overflow-hidden"
          style={{
            background:
              "radial-gradient(ellipse at 90% 80%, rgba(255,255,255,1) 0%, rgba(229,229,229,1) 35%, rgba(217,217,217,0.6) 100%)",
          }}
        >
          {/* Decorative shopping cart icons */}
          <div className="absolute left-[584px] top-[184px] size-[45px] opacity-60 rotate-[-38deg]">
            <svg viewBox="0 0 32 32" fill="none" className="size-full text-[#000080]">
              <path d="M6 6h20l-2 12H8L6 6z" fill="currentColor" opacity="0.3" />
              <circle cx="10" cy="26" r="2" fill="currentColor" opacity="0.5" />
              <circle cx="22" cy="26" r="2" fill="currentColor" opacity="0.5" />
            </svg>
          </div>
          <div className="absolute left-[79px] top-[49px] size-[45px] opacity-40 rotate-[-38deg]">
            <svg viewBox="0 0 32 32" fill="none" className="size-full text-[#000080]">
              <path d="M6 6h20l-2 12H8L6 6z" fill="currentColor" opacity="0.3" />
              <circle cx="10" cy="26" r="2" fill="currentColor" opacity="0.5" />
              <circle cx="22" cy="26" r="2" fill="currentColor" opacity="0.5" />
            </svg>
          </div>

          {/* Right side decorative wave */}
          <div className="absolute right-0 bottom-0 w-[480px] h-[220px] opacity-40"
            style={{
              background: "radial-gradient(ellipse at 80% 100%, rgba(181,181,243,0.5) 0%, transparent 70%)",
            }}
          />

          {/* Text content */}
          <div className="absolute right-[60px] top-[55px] w-[436px] flex flex-col gap-[30px]">
            <div className="flex flex-col gap-[26px]">
              <div className="flex flex-col gap-[3px]">
                <h1 className="text-[#000080] font-bold text-[37px] leading-tight" style={vs}>Welcome To</h1>
                <h1 className="text-[#000080] font-bold text-[37px] leading-tight text-center" style={vs}>ROS Market Place</h1>
              </div>
              <p className="text-[#100E1A] text-[18px] leading-[26px]" style={vs}>
                Purchase reading materials, Children wear, foodstuffs, prepared meal at very affordable price
              </p>
            </div>
            <div className="flex items-center gap-[4px]">
              <a
                href="#products"
                className="text-[#000080] font-bold text-[25px]"
                style={vs}
              >
                Buy Now
              </a>
              <svg viewBox="0 0 51 51" fill="none" className="size-[51px]">
                <path d="M20 14l10 10-10 10" stroke="#000080" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
          </div>
        </div>

        <Navbar activePage="marketplace" />
      </section>

      {/* ── Search + Cart bar ── */}
      <div id="products" className="flex items-center gap-[24px] justify-center px-[100px] py-[16px] mt-[16px]">
        {/* Search input */}
        <div className="flex items-center gap-[10px] px-[30px] py-[7px] h-[48px] rounded-[30px] border-[1.5px] border-[#00003D] bg-[#FFFDFD] w-[411px]">
          <svg viewBox="0 0 21 21" fill="none" className="size-[21px] flex-shrink-0">
            <circle cx="9.5" cy="9.5" r="7.5" stroke="#00003D" strokeWidth="2" />
            <path d="M15.5 15.5l4 4" stroke="#00003D" strokeWidth="2" strokeLinecap="round" />
          </svg>
          <input
            type="text"
            placeholder="Search Product"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="bg-transparent outline-none text-[#00003D] font-bold text-[18px] placeholder:text-[#00003D]/70 w-full"
            style={vs}
          />
        </div>

        {/* Cart */}
        <button
          onClick={() => setCartOpen(!cartOpen)}
          className="relative size-[64px] flex items-center justify-center"
        >
          <svg viewBox="0 0 64 64" fill="none" className="size-full text-[#100E1A]">
            <path d="M10 10h6l6 28h22l6-20H20" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
            <circle cx="28" cy="52" r="4" fill="currentColor" />
            <circle cx="46" cy="52" r="4" fill="currentColor" />
          </svg>
          <div className="absolute top-0 right-0 bg-[#000080] rounded-[19px] min-w-[28px] h-[28px] flex items-center justify-center px-[4px]">
            <span className="text-[#FFFDFD] text-[14px] font-bold" style={vs}>{cartCount}</span>
          </div>
        </button>

        {/* Check Out */}
        <button
          onClick={() => setCartOpen(true)}
          className="bg-[#100E1A] text-[#FFFDFD] text-[16px] px-[32px] py-[12px] rounded-[30px] hover:bg-[#1A1826] transition-colors"
          style={vs}
        >
          Check Out
        </button>
      </div>

      {/* Cart dropdown */}
      {cartOpen && (
        <div className="fixed top-[120px] right-[100px] z-50 bg-white rounded-[20px] shadow-[0_8px_40px_rgba(0,0,0,0.15)] p-[24px] w-[340px]">
          <div className="flex items-center justify-between mb-[16px]">
            <h3 className="text-[#100E1A] text-[18px] font-bold" style={vs}>Cart ({cartCount} items)</h3>
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

      {/* ── Main content: sidebar + grid ── */}
      <div className="flex gap-[32px] px-[40px] py-[32px] w-full">

        {/* Category Sidebar */}
        <aside className="w-[181px] flex-shrink-0 flex flex-col gap-[29px]">
          <h2 className="text-black font-bold text-[25px]" style={vs}>Category</h2>
          <div className="flex flex-col gap-[24px]">
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className="flex items-center gap-[21px] text-left group"
              >
                <div className={[
                  "size-[40px] rounded-[10px] border-3 flex items-center justify-center flex-shrink-0 transition-colors",
                  activeCategory === cat
                    ? "bg-[#000080] border-[#000080]"
                    : "border-[#3A394F] group-hover:border-[#000080]",
                ].join(" ")}>
                  {activeCategory === cat && (
                    <svg viewBox="0 0 16 16" fill="none" className="size-[16px]">
                      <path d="M3 8l4 4 6-8" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  )}
                </div>
                <span className={[
                  "text-[20px]",
                  activeCategory === cat ? "text-[#000080] font-bold" : "text-black",
                ].join(" ")} style={vs}>
                  {cat}
                </span>
              </button>
            ))}
          </div>
        </aside>

        {/* Product Grid */}
        <div className="flex-1 min-w-0">
          {filtered.length === 0 ? (
            <div className="flex items-center justify-center h-[400px]">
              <p className="text-[#A3A1AF] text-[18px]" style={vs}>No products found.</p>
            </div>
          ) : (
            <div className="grid grid-cols-3 gap-[24px]">
              {filtered.map((product) => (
                <div
                  key={product.id}
                  className="bg-white rounded-[20px] p-[14px] flex flex-col gap-[24px] shadow-[-4px_-4px_2px_rgba(0,0,0,0.05),4px_4px_2px_rgba(0,0,0,0.05)]"
                >
                  {/* Product image */}
                  <div className="h-[280px] w-full rounded-[18px] overflow-hidden">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-full object-cover"
                    />
                  </div>

                  {/* Product info */}
                  <div className="flex flex-col gap-[28px]">
                    <div className="flex flex-col gap-[10px]">
                      <h3 className="text-black font-bold text-[25px] leading-[32px]" style={vs}>
                        {product.name}
                      </h3>
                      <p className="text-[#100E1A] text-[17px] leading-[26px] h-[52px] overflow-hidden" style={vs}>
                        {product.description}
                      </p>
                    </div>

                    {/* Price + actions */}
                    <div className="flex items-center justify-between">
                      <div className="bg-[#100E1A] px-[36px] py-[13px] rounded-[33px]">
                        <span className="text-[#FFFDFD] text-[18px] font-black" style={vs}>
                          {product.price}
                        </span>
                      </div>

                      <div className="flex items-center gap-[25px]">
                        {/* Wishlist */}
                        <button
                          onClick={() => toggleWishlist(product.id)}
                          className="flex items-center justify-center"
                          aria-label="Add to wishlist"
                        >
                          <svg viewBox="0 0 37 32" fill="none" className="w-[37px] h-[32px]">
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
                          onClick={() => addToCart(product.id)}
                          className="bg-[#00003D] size-[48px] rounded-[24px] flex items-center justify-center hover:bg-[#000080] transition-colors"
                          aria-label="Add to cart"
                        >
                          <svg viewBox="0 0 25 23" fill="none" className="w-[25px] h-[23px]">
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

      {/* ── Let's Tailor CTA ── */}
      <section className="relative w-full py-[84px] flex items-center justify-center overflow-hidden mt-[32px]">
        <div className="absolute inset-0 bg-[#242222]" />
        <div className="absolute inset-0 opacity-35" style={{
          backgroundImage: "url('https://www.figma.com/api/mcp/asset/00ab7363-f75f-485e-aab4-25d9a90cf966.png')",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }} />
        <div className="relative z-10 flex flex-col items-center gap-[14px] w-[495px] text-center">
          <h2 className="text-[#FFFDFD] text-[39px] font-semibold leading-[46px]" style={vs}>
            {"Let's Tailor "}
            <span className="text-[#9B96FE] italic font-bold" style={{ fontFamily: "'Playfair Display', serif" }}>
              Your Experience.
            </span>
          </h2>
          <p className="text-[#FFFDFD] text-[16px] leading-[24px]" style={vs}>
            Join the church groups and see what God can do through you
          </p>
          <div className="flex items-center gap-[14px] mt-[8px]">
            <Link
              href="/groups?filter=men"
              className="border-2 border-[#FFFDFD] text-[#FFFDFD] text-[16px] font-medium px-[32px] py-[12px] rounded-[24px] hover:bg-white/10 transition-colors"
              style={vs}
            >
              MEN
            </Link>
            <Link
              href="/groups?filter=women"
              className="border-2 border-[#9B96FE] text-[#9B96FE] text-[16px] font-medium px-[32px] py-[12px] rounded-[24px] hover:bg-[#9B96FE]/10 transition-colors"
              style={vs}
            >
              WOMEN
            </Link>
            <Link
              href="/groups?filter=youth"
              className="border-2 border-[#FFFDFD] text-[#FFFDFD] text-[16px] font-medium px-[32px] py-[12px] rounded-[24px] hover:bg-white/10 transition-colors"
              style={vs}
            >
              YOUTH
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
