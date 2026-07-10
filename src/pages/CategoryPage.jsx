import { Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { ArrowLeft } from "lucide-react";
import Navbar from "@/components/Navbar";
import LoginModal from "@/components/LoginModal";
import ProductCard from "@/components/ProductCard";
import Footer from "@/components/Footer";
import { ALL_PRODUCTS } from "@/data/products";

const categoryProducts = {
  men: ALL_PRODUCTS.filter((product) => product.category === "Men"),
  women: ALL_PRODUCTS.filter((product) => product.category === "Women"),
  kids: ALL_PRODUCTS.filter((product) => product.category === "Kids"),
  accessories: ALL_PRODUCTS.filter((product) => product.category === "Accessories"),
};

const categoryTitles = {
  men: "Men's Collection",
  women: "Women's Collection",
  kids: "Kids' Collection",
  accessories: "Accessories",
};

const categoryDescriptions = {
  men: "Discover our premium collection of men's athletic footwear and apparel designed for peak performance.",
  women: "Explore stylish and functional women's sportswear crafted for every workout and lifestyle moment.",
  kids: "Fun, durable, and comfortable footwear for active kids who love to move.",
  accessories: "Complete your look with our high-quality bags, caps, socks, and more.",
};

const CategoryPage = ({ category }) => {
  const products = categoryProducts[category] || [];
  const title = categoryTitles[category] || "Products";
  const description = categoryDescriptions[category] || "";

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <LoginModal />
      
      {/* Hero Banner */}
      <section className="pt-28 pb-12 md:pt-36 md:pb-16 px-4">
        <div className="container mx-auto">
          <Link 
            to="/" 
            className="inline-flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors mb-6"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Home
          </Link>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-4xl md:text-6xl font-display uppercase mb-4">
              {title}
            </h1>
            <p className="text-muted-foreground text-lg max-w-2xl">
              {description}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Products Grid */}
      <section className="pb-20 px-4">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {products.map((product, index) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <ProductCard product={product} />
              </motion.div>
            ))}
          </div>
          
          {products.length === 0 && (
            <div className="text-center py-20">
              <p className="text-muted-foreground text-lg">No products found in this category.</p>
            </div>
          )}
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default CategoryPage;
