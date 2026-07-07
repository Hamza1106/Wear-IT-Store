import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ArrowLeft } from "lucide-react";
import { Link } from "@tanstack/react-router";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ProductCard from "@/components/ProductCard";
import { useCart } from "@/context/CartContext";
import { toast } from "sonner";
import product1 from "@/assets/product-1.jpg";
import product2 from "@/assets/product-2.jpg";
import product3 from "@/assets/product-3.jpg";
import product4 from "@/assets/product-4.jpg";
import product5 from "@/assets/product-5.jpg";
import product6 from "@/assets/product-6.jpg";

const allProducts = [
  // Men
  { id: 1, name: "Shadow Runner X", price: 179, image: product1, rating: 4.8, reviews: 256, category: "Men", isNew: true },
  { id: 2, name: "Flame Tech Hoodie", price: 129, originalPrice: 159, image: product2, rating: 4.6, reviews: 189, category: "Men" },
  { id: 3, name: "Elite Training Tee", price: 59, image: product4, rating: 4.5, reviews: 328, category: "Men" },
  { id: 4, name: "Power Stride Shorts", price: 65, image: product3, rating: 4.7, reviews: 198, category: "Men" },
  // Women
  { id: 5, name: "Performance Leggings", price: 89, image: product3, rating: 4.9, reviews: 412, category: "Women", isNew: true },
  { id: 6, name: "Zen Yoga Top", price: 55, image: product2, rating: 4.8, reviews: 287, category: "Women" },
  { id: 7, name: "Swift Run Jacket", price: 145, originalPrice: 180, image: product1, rating: 4.6, reviews: 156, category: "Women" },
  { id: 8, name: "Flex Training Bra", price: 45, image: product4, rating: 4.7, reviews: 342, category: "Women" },
  // Kids
  { id: 9, name: "Junior Sprint Shoes", price: 75, image: product1, rating: 4.8, reviews: 134, category: "Kids", isNew: true },
  { id: 10, name: "Active Play Set", price: 49, image: product4, rating: 4.5, reviews: 89, category: "Kids" },
  { id: 11, name: "Youth Training Tee", price: 35, image: product2, rating: 4.6, reviews: 167, category: "Kids" },
  { id: 12, name: "Mini Champion Shorts", price: 29, image: product3, rating: 4.4, reviews: 78, category: "Kids" },
  // Accessories
  { id: 13, name: "Urban Snapback", price: 45, originalPrice: 55, image: product5, rating: 4.7, reviews: 156, category: "Accessories" },
  { id: 14, name: "Pro Gym Duffel", price: 99, image: product6, rating: 4.8, reviews: 203, category: "Accessories", isNew: true },
  { id: 15, name: "Performance Socks Pack", price: 25, image: product5, rating: 4.5, reviews: 298, category: "Accessories" },
  { id: 16, name: "Sport Water Bottle", price: 35, image: product6, rating: 4.9, reviews: 445, category: "Accessories" },
];

const AllProductsPage = () => {
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [filter, setFilter] = useState("All");
  const { addToCart } = useCart();

  const categories = ["All", "Men", "Women", "Kids", "Accessories"];
  
  const filteredProducts = filter === "All" 
    ? allProducts 
    : allProducts.filter(p => p.category === filter);

  const handleAddToCart = () => {
    if (selectedProduct) {
      addToCart(selectedProduct);
      toast.success(`${selectedProduct.name} added to cart!`);
      setSelectedProduct(null);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <main className="pt-24 pb-20">
        <div className="container mx-auto px-4 lg:px-8">
          {/* Back Button */}
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

          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-12"
          >
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-display mb-4">
              ALL <span className="text-gradient">PRODUCTS</span>
            </h1>
            <p className="text-muted-foreground max-w-xl mx-auto">
              Browse our complete collection of premium athletic wear
            </p>
          </motion.div>

          {/* Filter Tabs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="flex flex-wrap justify-center gap-3 mb-12"
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
