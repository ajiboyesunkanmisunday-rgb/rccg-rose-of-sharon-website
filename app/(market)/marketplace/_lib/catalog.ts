export const CONDITIONS = ["new", "used", "refurbished"] as const;
export type Condition = typeof CONDITIONS[number];

export interface Product {
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

export const PRODUCTS: Product[] = [
  { id: 1, name: "Nike Round Neck", description: "Silk and linen material quality Nike wears.", price: "₦45,000.00", category: "Roundnecks", image: "/marketplace/img2.jpg", stock: "in_stock", rating: 4.5, ratingCount: 128, condition: "new", seller: "Church Members", tags: ["clothing", "men", "nike"] },
  { id: 2, name: "Sport Sneaker", description: "Sneaker suitable for jogging and special sport activities.", price: "₦45,000.00", originalPrice: "₦55,000.00", category: "Sneakers", image: "/marketplace/img3.jpg", isNew: true, onSale: true, stock: "limited", rating: 4.2, ratingCount: 64, condition: "new", seller: "Church Members", tags: ["shoes", "sport", "new"] },
  { id: 3, name: "Purpose Driven Life", description: "Book on purpose finding by Rick Warren.", price: "₦4,000", category: "Books", image: "/marketplace/img4.jpg", stock: "limited", rating: 5.0, ratingCount: 312, condition: "new", seller: "Church Members", tags: ["book", "spiritual", "rick warren"] },
  { id: 4, name: "Italian Shoe", description: "Quality Italian leather shoes for formal occasions.", price: "₦75,000.00", category: "Shoes", image: "/marketplace/img5.jpg", stock: "limited", rating: 4.7, ratingCount: 44, condition: "new", seller: "Church Members", tags: ["shoes", "formal", "leather"] },
  { id: 5, name: "Men Blue Suit", description: "Classic blue suit for formal and church occasions.", price: "₦145,000", category: "Suits", image: "/marketplace/img6.jpg", stock: "in_stock", rating: 4.3, ratingCount: 87, condition: "new", seller: "Church Members", tags: ["formal", "men", "suit"] },
  { id: 6, name: "Snack & Spicy", description: "Sweet taste snack & spicy from ROS restaurant.", price: "₦5,060", category: "Restaurant", image: "/marketplace/img7.jpg", stock: "in_stock", rating: 4.8, ratingCount: 203, condition: "new", seller: "ROS Restaurant", tags: ["food", "snack", "restaurant"] },
  { id: 7, name: "Fried Rice & Chicken", description: "Delicious fried rice and chicken from ROS kitchen.", price: "₦9,500", originalPrice: "₦11,000", category: "Restaurant", image: "/marketplace/img8.jpg", onSale: true, stock: "in_stock", rating: 4.9, ratingCount: 445, condition: "new", seller: "ROS Restaurant", tags: ["food", "rice", "restaurant"] },
  { id: 8, name: "Female Red Leather Bag", description: "Premium red leather bag, stylish and durable.", price: "₦45,000.00", category: "T-shirts", image: "/marketplace/img9.jpg", stock: "limited", rating: 4.1, ratingCount: 33, condition: "new", seller: "Church Members", tags: ["bag", "women", "leather"] },
  { id: 9, name: "Power of Character", description: "Book on character by Myles Munroe.", price: "₦4,000", category: "Books", image: "/marketplace/img10.jpg", stock: "in_stock", rating: 4.6, ratingCount: 178, condition: "new", seller: "Church Members", tags: ["book", "spiritual", "myles munroe"] },
];


export function priceToNum(price: string) { return parseFloat(price.replace(/[^0-9.]/g, "")) || 0; }
export function naira(n: number) { return "₦" + Math.round(n).toLocaleString("en-NG"); }
export function getProduct(id: number) { return PRODUCTS.find((p) => p.id === id); }

/* ───────── Sellers ───────── */
export interface Seller {
  slug: string; name: string; blurb: string; since: string; location: string; responseTime: string; verified: boolean; emoji: string;
}
export const SELLER_PROFILES: Seller[] = [
  { slug: "church-members", name: "Church Members", blurb: "Items listed by verified members of the Rose of Sharon family — clothing, books, footwear and more.", since: "2024", location: "Rose of Sharon, Lagos", responseTime: "Within a day", verified: true, emoji: "🤝" },
  { slug: "ros-restaurant", name: "ROS Restaurant", blurb: "Freshly prepared meals, snacks and catering from the church kitchen. Order ahead and pick up after service.", since: "2023", location: "Rose of Sharon main campus", responseTime: "Within a few hours", verified: true, emoji: "🍽️" },
  { slug: "csr-program", name: "CSR Program", blurb: "Skills, training and community products from the Rose of Sharon CSR programme.", since: "2025", location: "Rose of Sharon, Lagos", responseTime: "Within two days", verified: true, emoji: "🎓" },
];
export function sellerBySlug(slug: string) { return SELLER_PROFILES.find((s) => s.slug === slug); }
export function sellerSlug(name: string) { return SELLER_PROFILES.find((s) => s.name === name)?.slug ?? name.toLowerCase().replace(/[^a-z0-9]+/g, "-"); }

/* ───────── Product details (derived, deterministic) ───────── */
export function stockCount(p: Product) { return p.stock === "out" ? 0 : p.stock === "limited" ? 3 + (p.id % 4) : 15 + (p.id * 7) % 30; }

export function specsFor(p: Product): { label: string; value: string }[] {
  const base = [
    { label: "Category", value: p.category },
    { label: "Condition", value: p.condition.charAt(0).toUpperCase() + p.condition.slice(1) },
    { label: "Seller", value: p.seller },
    { label: "Availability", value: p.stock === "in_stock" ? "In stock" : p.stock === "limited" ? "Limited stock" : "Out of stock" },
  ];
  const extra: Record<string, { label: string; value: string }[]> = {
    Books: [{ label: "Format", value: "Paperback" }, { label: "Language", value: "English" }],
    Restaurant: [{ label: "Prepared", value: "Fresh, same day" }, { label: "Serves", value: "1 person" }],
    Shoes: [{ label: "Material", value: "Genuine leather" }, { label: "Sizes", value: "40 – 46" }],
    Sneakers: [{ label: "Use", value: "Sport & casual" }, { label: "Sizes", value: "38 – 46" }],
    Suits: [{ label: "Fit", value: "Classic" }, { label: "Sizes", value: "S – XXL" }],
    Roundnecks: [{ label: "Material", value: "Silk & linen blend" }, { label: "Sizes", value: "S – XXL" }],
    "T-shirts": [{ label: "Material", value: "Leather" }, { label: "Colour", value: "Red" }],
  };
  return [...base, ...(extra[p.category] ?? [])];
}

export function sizesFor(p: Product): string[] {
  if (p.category === "Shoes") return ["40", "41", "42", "43", "44", "45"];
  if (p.category === "Sneakers") return ["38", "39", "40", "41", "42", "43", "44"];
  if (p.category === "Suits" || p.category === "Roundnecks") return ["S", "M", "L", "XL", "XXL"];
  return [];
}

/* ───────── Reviews ───────── */
export interface Review { id: string; author: string; rating: number; date: string; title: string; body: string; verified: boolean }
const REVIEW_AUTHORS = ["Adaeze O.", "Tunde A.", "Funmi B.", "Chinedu E.", "Grace I.", "Samuel K.", "Blessing N.", "David M."];
const REVIEW_BODIES: [number, string, string][] = [
  [5, "Exactly as described", "Arrived well packaged and exactly as pictured. Collected after service with no stress."],
  [5, "Great value", "Quality is better than I expected for the price. Will buy from this seller again."],
  [4, "Very good", "Happy with it overall. Collection was easy and the seller was polite."],
  [4, "Solid purchase", "Good quality. Took a day for the seller to reply but everything went smoothly."],
  [3, "Okay", "It is fine for the price, though a little different from the photo."],
];
export function reviewsFor(p: Product): Review[] {
  const n = Math.min(5, Math.max(2, Math.round(p.ratingCount / 60)));
  return Array.from({ length: n }, (_, i) => {
    const tpl = REVIEW_BODIES[(p.id + i) % REVIEW_BODIES.length];
    const rating = Math.max(1, Math.min(5, Math.round(p.rating) - (i === n - 1 && n > 3 ? 1 : 0)));
    return { id: `${p.id}-${i}`, author: REVIEW_AUTHORS[(p.id * 3 + i) % REVIEW_AUTHORS.length], rating, date: new Date(2026, 8 - i, 20 - i * 3).toISOString(), title: tpl[1], body: tpl[2], verified: i % 3 !== 2 };
  });
}
export function ratingHistogram(p: Product) {
  const total = p.ratingCount;
  const w = [Math.max(0, p.rating - 3.5) * 40 + 2, Math.max(0, 4.5 - Math.abs(p.rating - 4)) * 8, 6, 3, 2];
  const sum = w.reduce((a, b) => a + b, 0);
  return w.map((x) => Math.round((x / sum) * total));
}

/* ───────── Delivery / promos ───────── */
export const PICKUP_POINTS = ["Rose of Sharon — main auditorium foyer (after service)", "Rose of Sharon — church office (weekdays 10am – 4pm)"];
export const DELIVERY_ZONES = [
  { id: "lagos-mainland", label: "Lagos Mainland", fee: 2500, eta: "1 – 2 days" },
  { id: "lagos-island", label: "Lagos Island", fee: 3500, eta: "1 – 2 days" },
  { id: "outside-lagos", label: "Outside Lagos", fee: 6000, eta: "3 – 5 days" },
];
export const PROMOS: Record<string, { label: string; kind: "percent" | "flat"; value: number; min?: number }> = {
  FAMILY10: { label: "10% family discount", kind: "percent", value: 10 },
  WELCOME2000: { label: "₦2,000 off orders above ₦20,000", kind: "flat", value: 2000, min: 20000 },
};
export const PAYMENT_METHODS = [
  { id: "transfer", label: "Bank transfer", note: "Pay by transfer, then upload your reference. Order is held for 24 hours." },
  { id: "pickup", label: "Pay on pickup", note: "Pay in cash or by POS when you collect from the church." },
  { id: "card", label: "Card (coming soon)", note: "Online card payment will be available shortly.", disabled: true },
];
