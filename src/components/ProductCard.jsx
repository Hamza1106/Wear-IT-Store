import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link, useNavigate } from "@tanstack/react-router";
import { Star, ShoppingBag, Eye, Heart, Check } from "lucide-react";
import { useCart } from "@/context/CartContext";
import { toast } from "sonner";


const DEFAULT_COLORS = [
  { name: "Black", hex: "#0f0f0f" },
  { name: "Orange", hex: "#ff6a2b" },
  { name: "White", hex: "#f5f5f5" },
];
const DEFAULT_SIZES = ["S", "M", "L", "XL"];

const normalizeColor = (c) =>
  typeof c === "string" ? { name: c, hex: c } : c;

const ProductCard = ({ product, onQuickView }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [selectedColor, setSelectedColor] = useState(0);
  const [selectedSize, setSelectedSize] = useState(null);
  const [added, setAdded] = useState(false);
  const navigate = useNavigate();

  const { addToCart } = useCart();

  const colors = (product.colors || DEFAULT_COLORS).map(normalizeColor);
  const sizes = product.sizes || DEFAULT_SIZES;
  const activeColor = colors[selectedColor] || colors[0];
  const activeImage = activeColor?.image || product.image;
  const hoverImage = activeColor?.hoverImage || activeImage;


  const handleAddToCart = (e) => {
    e?.stopPropagation();
    addToCart(product);
    setAdded(true);
    toast.success(`${product.name} added to cart`);
    setTimeout(() => setAdded(false), 1500);
  };

  return (
    <motion.div
      className="group relative"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="relative overflow-hidden rounded-xl bg-card border border-border transition-all duration-500 group-hover:border-primary/40 group-hover:shadow-[0_20px_60px_-15px_oklch(0.65_0.22_45_/_0.3)]">
        {/* Image area */}
        <div className="relative aspect-[4/5] overflow-hidden bg-secondary">
          {/* Primary image */}
          <motion.img
            key={activeImage}
            src={activeImage}
            alt={product.name}
            className="absolute inset-0 w-full h-full object-cover"
            animate={{ opacity: isHovered ? 0 : 1, scale: isHovered ? 1.05 : 1 }}
            transition={{ duration: 0.5 }}
          />
          {/* Hover image */}
          <motion.img
            src={hoverImage}
            alt=""
            className="absolute inset-0 w-full h-full object-cover"
            initial={{ opacity: 0 }}
            animate={{ opacity: isHovered ? 1 : 0, scale: isHovered ? 1.05 : 1 }}
            transition={{ duration: 0.5 }}
          />

          {/* Badges */}
          <div className="absolute top-3 left-3 flex flex-col gap-2 z-10">
            {product.isNew && (
              <span className="px-3 py-1 bg-primary text-primary-foreground text-[10px] font-semibold uppercase tracking-widest rounded-full">
                New
              </span>
            )}
            {product.originalPrice && (
              <span className="px-3 py-1 bg-destructive text-destructive-foreground text-[10px] font-semibold uppercase tracking-widest rounded-full">
                Sale
              </span>
            )}
          </div>

          {/* Wishlist */}
          <motion.button
            whileHover={{ scale: 1.15 }}
            whileTap={{ scale: 0.9 }}
            onClick={(e) => {
              e.stopPropagation();
              setIsWishlisted(!isWishlisted);
            }}
            className="absolute top-3 right-3 z-10 w-9 h-9 bg-background/80 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-background transition-colors"
          >
            <motion.div
              animate={isWishlisted ? { scale: [1, 1.4, 1] } : {}}
              transition={{ duration: 0.3 }}
            >
              <Heart
                className={`w-4 h-4 transition-colors ${
                  isWishlisted
                    ? "fill-primary text-primary"
                    : "text-muted-foreground"
                }`}
              />
            </motion.div>
          </motion.button>

          {/* Hover action bar: sizes + quick add + view */}
          <AnimatePresence>
            {isHovered && (
              <motion.div
                initial={{ y: 30, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: 30, opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="absolute bottom-0 left-0 right-0 p-3 z-10 bg-gradient-to-t from-background via-background/90 to-transparent"
              >
                {/* Sizes */}
                <div className="flex items-center justify-center gap-1.5 mb-2">
                  {sizes.map((s) => (
                    <button
                      key={s}
                      onClick={(e) => {
                        e.stopPropagation();
                        setSelectedSize(s);
                      }}
                      className={`min-w-[32px] h-8 px-2 text-xs font-medium rounded-md border transition-all ${
                        selectedSize === s
                          ? "border-primary bg-primary text-primary-foreground"
                          : "border-border bg-background hover:border-primary"
                      }`}
                    >
                      {s}
                    </button>
                  ))}
                </div>

                {/* Quick add + view */}
                <div className="flex gap-2">
                  <motion.button
                    whileTap={{ scale: 0.97 }}
                    onClick={handleAddToCart}
                    className="flex-1 h-10 gradient-neon text-primary-foreground rounded-full text-xs font-semibold uppercase tracking-widest flex items-center justify-center gap-2"
                  >
                    {added ? (
                      <>
                        <Check className="w-4 h-4" /> Added
                      </>
                    ) : (
                      <>
                        <ShoppingBag className="w-4 h-4" /> Quick Add
                      </>
                    )}
                  </motion.button>
                  {onQuickView && (
                    <motion.button
                      whileTap={{ scale: 0.9 }}
                      onClick={(e) => {
                        e.stopPropagation();
                        onQuickView(product);
                      }}
                      className="w-10 h-10 bg-background border border-border rounded-full flex items-center justify-center hover:border-primary transition-colors"
                    >
                      <Eye className="w-4 h-4" />
                    </motion.button>
                  )}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Content */}
        <div className="p-4">
          <p className="text-[10px] text-muted-foreground uppercase tracking-widest mb-1">
            {product.category}
          </p>
          <h3 className="font-medium text-foreground mb-2 line-clamp-1">
            {product.name}
          </h3>

          {/* Colors */}
          <div className="flex items-center gap-1.5 mb-3">
            {colors.map((c, idx) => (
              <button
                key={idx}
                onClick={(e) => {
                  e.stopPropagation();
                  setSelectedColor(idx);
                }}
                className={`w-4 h-4 rounded-full ring-offset-2 ring-offset-card transition-all ${
                  selectedColor === idx ? "ring-2 ring-primary" : ""
                }`}
                style={{ background: c.hex }}
                aria-label={c.name}

              />
            ))}
            <span className="text-[10px] text-muted-foreground ml-1">
              {colors.length} colors
            </span>
          </div>

          {/* Rating */}
          <div className="flex items-center gap-2 mb-3">
            <div className="flex items-center gap-0.5">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`w-3 h-3 ${
                    i < Math.floor(product.rating)
                      ? "fill-primary text-primary"
                      : "fill-muted text-muted"
                  }`}
                />
              ))}
            </div>
            <span className="text-[11px] text-muted-foreground">
              {product.rating} ({product.reviews})
            </span>
          </div>

          {/* Price */}
          <div className="flex items-end justify-between">
            <div className="flex items-baseline gap-2">
              <span className="text-lg font-semibold text-foreground">
                ${product.price}
              </span>
              {product.originalPrice && (
                <span className="text-xs text-muted-foreground line-through">
                  ${product.originalPrice}
                </span>
              )}
            </div>
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                if (onQuickView) {
                  onQuickView(product);
                } else {
                  navigate({ to: "/products" });
                }
              }}
              className="text-[10px] uppercase tracking-widest text-primary hover:underline"
            >
              View →
            </button>

          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default ProductCard;
