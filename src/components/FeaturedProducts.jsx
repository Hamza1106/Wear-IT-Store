import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import { X } from "lucide-react";
import ProductCard from "./ProductCard";
import { useCart } from "@/context/CartContext";
import { toast } from "sonner";
import product1 from "@/assets/product-1.jpg";
import product2 from "@/assets/product-2.jpg";
import product3 from "@/assets/product-3.jpg";
import product4 from "@/assets/product-4.jpg";
import product5 from "@/assets/product-5.jpg";
import product6 from "@/assets/product-6.jpg";

const products = [
  {
    id: 1,
    name: "Shadow Runner X",
    price: 179,
    image: product1,
    rating: 4.8,
    reviews: 256,
    category: "Running",
    isNew: true,
  },
  {
    id: 2,
    name: "Flame Tech Hoodie",
    price: 129,
    originalPrice: 159,
    image: product2,
    rating: 4.6,
    reviews: 189,
    category: "Training",
  },
  {
    id: 3,
    name: "Performance Leggings",
    price: 89,
    image: product3,
    rating: 4.9,
    reviews: 412,
    category: "Women",
    isNew: true,
  },
  {
    id: 4,
    name: "Elite Training Tee",
    price: 59,
    image: product4,
    rating: 4.5,
    reviews: 328,
    category: "Men",
  },
  {
    id: 5,
    name: "Urban Snapback",
    price: 45,
    originalPrice: 55,
    image: product5,
    rating: 4.7,
    reviews: 156,
    category: "Accessories",
  },
  {
    id: 6,
    name: "Pro Gym Duffel",
    price: 99,
    image: product6,
    rating: 4.8,
    reviews: 203,
    category: "Accessories",
    isNew: true,
  },
];

const FeaturedProducts = () => {
  const [selectedProduct, setSelectedProduct] = useState(null);
  const { addToCart } = useCart();

  const handleAddToCart = () => {
    if (selectedProduct) {
      addToCart(selectedProduct);
      toast.success(`${selectedProduct.name} added to cart!`);
      setSelectedProduct(null);
    }
  };

  return (
    <section className="py-20 lg:py-32 bg-background">
      <div className="container mx-auto px-4 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <motion.span
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-primary font-medium tracking-widest uppercase text-sm"
          >
            Curated Selection
          </motion.span>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-display mt-4 mb-6">
            FEATURED <span className="text-gradient">PRODUCTS</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Discover our handpicked selection of premium athletic wear designed 
            for maximum performance and style.
          </p>
        </motion.div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {products.map((product, index) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <ProductCard
                product={product}
                onQuickView={setSelectedProduct}
              />
            </motion.div>
          ))}
        </div>

        {/* View All Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
          className="text-center mt-12"
        >
          <Link to="/products">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-4 border-2 border-primary text-primary font-semibold uppercase tracking-wide rounded-full hover:bg-primary hover:text-primary-foreground transition-all duration-300"
            >
              View All Products
            </motion.button>
          </Link>
        </motion.div>
      </div>

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
    </section>
  );
};

export default FeaturedProducts;
