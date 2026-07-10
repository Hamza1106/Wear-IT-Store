import { useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ArrowLeft } from "lucide-react";
import { Link } from "@tanstack/react-router";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ProductCard from "@/components/ProductCard";
import { useCart } from "@/context/CartContext";
import { toast } from "sonner";

import shadowBlack from "@/assets/p-shadow-runner.jpg";
import shadowOrange from "@/assets/p-shadow-runner-orange.jpg";
import shadowWhite from "@/assets/p-shadow-runner-white.jpg";
import flameHoodie from "@/assets/p-flame-hoodie.jpg";
import trainingTee from "@/assets/p-training-tee.jpg";
import powerShorts from "@/assets/p-power-shorts.jpg";
import leggings from "@/assets/p-leggings.jpg";
import yogaTop from "@/assets/p-yoga-top.jpg";
import runJacket from "@/assets/p-run-jacket.jpg";
import sportsBra from "@/assets/p-sports-bra.jpg";
import kidsShoes from "@/assets/p-kids-shoes.jpg";
import kidsSet from "@/assets/p-kids-set.jpg";
import youthTee from "@/assets/p-youth-tee.jpg";
import kidsShorts from "@/assets/p-kids-shorts.jpg";
import snapback from "@/assets/p-snapback.jpg";
import duffel from "@/assets/p-duffel.jpg";
import socks from "@/assets/p-socks.jpg";
import bottle from "@/assets/p-bottle.jpg";

const C = {
  black: { name: "Black", hex: "#0f0f0f" },
  orange: { name: "Orange", hex: "#ff6a2b" },
  white: { name: "White", hex: "#f5f5f5" },
  cyan: { name: "Cyan", hex: "#22d3ee" },
  olive: { name: "Olive", hex: "#5c6a3a" },
  navy: { name: "Navy", hex: "#1e3a8a" },
  red: { name: "Red", hex: "#dc2626" },
};

const allProducts = [
  // Men
  {
    id: 1, name: "Shadow Runner X", price: 179, category: "Men", brand: "Nike", isNew: true,
    rating: 4.8, reviews: 256,
    image: shadowBlack,
    sizes: ["S", "M", "L", "XL"],
    colors: [
      { ...C.black, image: shadowBlack },
      { ...C.orange, image: shadowOrange },
      { ...C.white, image: shadowWhite },
    ],
  },
  {
    id: 2, name: "Flame Tech Hoodie", price: 129, originalPrice: 159, category: "Men", brand: "Adidas",
    rating: 4.6, reviews: 189,
    image: flameHoodie,
    sizes: ["S", "M", "L", "XL"],
    colors: [{ ...C.black, image: flameHoodie }, { ...C.navy, image: flameHoodie }],
  },
  {
    id: 3, name: "Elite Training Tee", price: 59, category: "Men", brand: "Under Armour",
    rating: 4.5, reviews: 328,
    image: trainingTee,
    sizes: ["XS", "S", "M", "L", "XL"],
    colors: [{ ...C.black, image: trainingTee }, { ...C.white, image: trainingTee }],
  },
  {
    id: 4, name: "Power Stride Shorts", price: 65, category: "Men", brand: "Puma",
    rating: 4.7, reviews: 198,
    image: powerShorts,
    sizes: ["S", "M", "L", "XL"],
    colors: [{ ...C.black, image: powerShorts }, { ...C.olive, image: powerShorts }],
  },
  // Women
  {
    id: 5, name: "Performance Leggings", price: 89, category: "Women", brand: "Nike", isNew: true,
    rating: 4.9, reviews: 412,
    image: leggings,
    sizes: ["XS", "S", "M", "L"],
    colors: [{ ...C.black, image: leggings }, { ...C.navy, image: leggings }],
  },
  {
    id: 6, name: "Zen Yoga Top", price: 55, category: "Women", brand: "New Balance",
    rating: 4.8, reviews: 287,
    image: yogaTop,
    sizes: ["XS", "S", "M", "L"],
    colors: [{ ...C.black, image: yogaTop }, { ...C.orange, image: yogaTop }],
  },
  {
    id: 7, name: "Swift Run Jacket", price: 145, originalPrice: 180, category: "Women", brand: "Adidas",
    rating: 4.6, reviews: 156,
    image: runJacket,
    sizes: ["S", "M", "L", "XL"],
    colors: [{ ...C.black, image: runJacket }, { ...C.orange, image: runJacket }],
  },
  {
    id: 8, name: "Flex Training Bra", price: 45, category: "Women", brand: "Puma",
    rating: 4.7, reviews: 342,
    image: sportsBra,
    sizes: ["XS", "S", "M", "L"],
    colors: [{ ...C.black, image: sportsBra }, { ...C.white, image: sportsBra }],
  },
  // Kids
  {
    id: 9, name: "Junior Sprint Shoes", price: 75, category: "Kids", brand: "Adidas", isNew: true,
    rating: 4.8, reviews: 134,
    image: kidsShoes,
    sizes: ["XS", "S", "M"],
    colors: [{ ...C.navy, image: kidsShoes }, { ...C.red, image: kidsShoes }],
  },
  {
    id: 10, name: "Active Play Set", price: 49, category: "Kids", brand: "Puma",
    rating: 4.5, reviews: 89,
    image: kidsSet,
    sizes: ["XS", "S", "M"],
    colors: [{ ...C.red, image: kidsSet }, { ...C.black, image: kidsSet }],
  },
  {
    id: 11, name: "Youth Training Tee", price: 35, category: "Kids", brand: "Nike",
    rating: 4.6, reviews: 167,
    image: youthTee,
    sizes: ["XS", "S", "M"],
    colors: [{ ...C.black, image: youthTee }, { ...C.white, image: youthTee }],
  },
  {
    id: 12, name: "Mini Champion Shorts", price: 29, category: "Kids", brand: "Under Armour",
    rating: 4.4, reviews: 78,
    image: kidsShorts,
    sizes: ["XS", "S", "M"],
    colors: [{ ...C.navy, image: kidsShorts }, { ...C.black, image: kidsShorts }],
  },
  // Accessories
  {
    id: 13, name: "Urban Snapback", price: 45, originalPrice: 55, category: "Accessories", brand: "New Balance",
    rating: 4.7, reviews: 156,
    image: snapback,
    sizes: ["M", "L"],
    colors: [{ ...C.black, image: snapback }, { ...C.orange, image: snapback }],
  },
  {
    id: 14, name: "Pro Gym Duffel", price: 99, category: "Accessories", brand: "Nike", isNew: true,
    rating: 4.8, reviews: 203,
    image: duffel,
    sizes: ["L", "XL"],
    colors: [{ ...C.black, image: duffel }, { ...C.orange, image: duffel }],
  },
  {
    id: 15, name: "Performance Socks Pack", price: 25, category: "Accessories", brand: "Adidas",
    rating: 4.5, reviews: 298,
    image: socks,
    sizes: ["S", "M", "L"],
    colors: [{ ...C.black, image: socks }, { ...C.white, image: socks }],
  },
  {
    id: 16, name: "Sport Water Bottle", price: 35, category: "Accessories", brand: "Puma",
    rating: 4.9, reviews: 445,
    image: bottle,
    sizes: ["M"],
    colors: [{ ...C.black, image: bottle }, { ...C.orange, image: bottle }],
  },
];

const BRANDS = ["Nike", "Adidas", "Puma", "Under Armour", "New Balance"];
const SIZES = ["XS", "S", "M", "L", "XL"];
const COLORS = [C.black, C.orange, C.cyan, C.white, C.olive, C.navy, C.red];
const PRICES = [
  { label: "Under $50", test: (p) => p < 50 },
  { label: "$50 – $100", test: (p) => p >= 50 && p <= 100 },
  { label: "$100 – $200", test: (p) => p > 100 && p <= 200 },
  { label: "$200+", test: (p) => p > 200 },
];

const AllProductsPage = () => {
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [filter, setFilter] = useState("All");
  const [brands, setBrands] = useState([]);
  const [sizes, setSizes] = useState([]);
  const [colors, setColors] = useState([]);
  const [prices, setPrices] = useState([]);
  const { addToCart } = useCart();

  const categories = ["All", "Men", "Women", "Kids", "Accessories"];

  const filteredProducts = useMemo(() => {
    return allProducts.filter((p) => {
      if (filter !== "All" && p.category !== filter) return false;
      if (brands.length && !brands.includes(p.brand)) return false;
      if (sizes.length && !p.sizes.some((s) => sizes.includes(s))) return false;
      if (colors.length && !p.colors.some((c) => colors.includes(c.name))) return false;
      if (prices.length) {
        const buckets = PRICES.filter((b) => prices.includes(b.label));
        if (!buckets.some((b) => b.test(p.price))) return false;
      }
      return true;
    });
  }, [filter, brands, sizes, colors, prices]);

  const toggle = (setter, arr, v) =>
    setter(arr.includes(v) ? arr.filter((x) => x !== v) : [...arr, v]);

  const activeCount = brands.length + sizes.length + colors.length + prices.length;

  const clearAll = () => {
    setBrands([]); setSizes([]); setColors([]); setPrices([]);
  };

  const handleAddToCart = () => {
    if (selectedProduct) {
      addToCart(selectedProduct);
      toast.success(`${selectedProduct.name} added to cart!`);
      setSelectedProduct(null);
    }
  };

  const Chip = ({ active, onClick, children }) => (
    <motion.button
      onClick={onClick}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      className={`px-4 py-1.5 rounded-full text-xs font-medium uppercase tracking-widest border transition-all ${
        active
          ? "bg-primary text-primary-foreground border-primary neon-glow"
          : "bg-secondary/50 text-muted-foreground border-border hover:border-primary hover:text-foreground"
      }`}
    >
      {children}
    </motion.button>
  );

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <main className="pt-24 pb-20">
        <div className="container mx-auto px-4 lg:px-8">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="mb-8"
          >
            <Link
              to="/"
              className="inline-flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
              Back to Home
            </Link>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-10"
          >
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-display mb-4">
              ALL <span className="text-gradient">PRODUCTS</span>
            </h1>
            <p className="text-muted-foreground max-w-xl mx-auto">
              Browse our complete collection of premium athletic wear
            </p>
          </motion.div>

          {/* Category tabs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="flex flex-wrap justify-center gap-3 mb-8"
          >
            {categories.map((cat) => (
              <motion.button
                key={cat}
                onClick={() => setFilter(cat)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className={`px-6 py-2 rounded-full font-medium uppercase tracking-wide text-sm transition-all duration-300 ${
                  filter === cat
                    ? "gradient-neon text-primary-foreground neon-glow"
                    : "bg-secondary text-muted-foreground hover:text-foreground"
                }`}
              >
                {cat}
              </motion.button>
            ))}
          </motion.div>

          {/* Filter chips panel */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="mb-10 p-5 rounded-2xl border border-border bg-card/50"
          >
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xs uppercase tracking-widest text-muted-foreground">
                Refine {activeCount > 0 && <span className="text-primary">· {activeCount} active</span>}
              </h3>
              {activeCount > 0 && (
                <button
                  onClick={clearAll}
                  className="text-xs uppercase tracking-widest text-primary hover:underline"
                >
                  Clear all
                </button>
              )}
            </div>

            <div className="space-y-3">
              <div className="flex flex-wrap items-center gap-2">
                <span className="text-[10px] uppercase tracking-widest text-muted-foreground w-16">Brand</span>
                {BRANDS.map((b) => (
                  <Chip key={b} active={brands.includes(b)} onClick={() => toggle(setBrands, brands, b)}>
                    {b}
                  </Chip>
                ))}
              </div>
              <div className="flex flex-wrap items-center gap-2">
                <span className="text-[10px] uppercase tracking-widest text-muted-foreground w-16">Size</span>
                {SIZES.map((s) => (
                  <Chip key={s} active={sizes.includes(s)} onClick={() => toggle(setSizes, sizes, s)}>
                    {s}
                  </Chip>
                ))}
              </div>
              <div className="flex flex-wrap items-center gap-2">
                <span className="text-[10px] uppercase tracking-widest text-muted-foreground w-16">Price</span>
                {PRICES.map((p) => (
                  <Chip key={p.label} active={prices.includes(p.label)} onClick={() => toggle(setPrices, prices, p.label)}>
                    {p.label}
                  </Chip>
                ))}
              </div>
              <div className="flex flex-wrap items-center gap-2">
                <span className="text-[10px] uppercase tracking-widest text-muted-foreground w-16">Color</span>
                {COLORS.map((c) => {
                  const active = colors.includes(c.name);
                  return (
                    <motion.button
                      key={c.name}
                      onClick={() => toggle(setColors, colors, c.name)}
                      whileHover={{ scale: 1.15 }}
                      whileTap={{ scale: 0.9 }}
                      className={`w-7 h-7 rounded-full ring-offset-2 ring-offset-card transition-all ${
                        active ? "ring-2 ring-primary" : "ring-1 ring-border"
                      }`}
                      style={{ background: c.hex }}
                      aria-label={c.name}
                    />
                  );
                })}
              </div>
            </div>
          </motion.div>

          {/* Products Grid */}
          <motion.div 
            layout
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
          >
            <AnimatePresence mode="popLayout">
              {filteredProducts.map((product, index) => (
                <motion.div
                  key={product.id}
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.3, delay: index * 0.05 }}
                >
                  <ProductCard
                    product={product}
                    onQuickView={setSelectedProduct}
                  />
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>

          {filteredProducts.length === 0 && (
            <div className="text-center text-muted-foreground py-16">
              No products match your filters.
            </div>
          )}

          {/* Results Count */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="text-center text-muted-foreground mt-8"
          >
            Showing {filteredProducts.length} products
          </motion.p>
        </div>
      </main>

      <Footer />

      {/* Quick View Modal */}
      <AnimatePresence>
        {selectedProduct && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedProduct(null)}
            className="fixed inset-0 z-50 bg-background/80 backdrop-blur-md flex items-center justify-center p-4"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="relative bg-card rounded-2xl overflow-hidden max-w-4xl w-full card-shadow border border-border"
            >
              <button
                onClick={() => setSelectedProduct(null)}
                className="absolute top-4 right-4 z-10 w-10 h-10 bg-secondary rounded-full flex items-center justify-center hover:bg-muted transition-colors"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="grid md:grid-cols-2">
                <div className="aspect-square">
                  <img
                    src={selectedProduct.image}
                    alt={selectedProduct.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-8 flex flex-col justify-center">
                  <span className="text-primary text-sm uppercase tracking-wide font-medium">
                    {selectedProduct.category}
                  </span>
                  <h3 className="text-3xl font-display mt-2 mb-4">
                    {selectedProduct.name}
                  </h3>
                  <p className="text-muted-foreground mb-6">
                    Premium athletic wear engineered for peak performance. 
                    Featuring advanced moisture-wicking technology and 
                    ergonomic design for maximum comfort.
                  </p>
                  <div className="flex items-center gap-4 mb-8">
                    <span className="text-3xl font-semibold">
                      ${selectedProduct.price}
                    </span>
                    {selectedProduct.originalPrice && (
                      <span className="text-xl text-muted-foreground line-through">
                        ${selectedProduct.originalPrice}
                      </span>
                    )}
                  </div>
                  <motion.button
                    onClick={handleAddToCart}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="w-full gradient-neon text-primary-foreground py-4 font-semibold uppercase tracking-wide rounded-full neon-glow"
                  >
                    Add to Cart
                  </motion.button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default AllProductsPage;
