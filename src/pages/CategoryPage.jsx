import { useParams, Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { ArrowLeft } from "lucide-react";
import Navbar from "@/components/Navbar";
import LoginModal from "@/components/LoginModal";
import ProductCard from "@/components/ProductCard";
import Footer from "@/components/Footer";

import product1 from "@/assets/product-1.jpg";
import product2 from "@/assets/product-2.jpg";
import product3 from "@/assets/product-3.jpg";
import product4 from "@/assets/product-4.jpg";
import product5 from "@/assets/product-5.jpg";
import product6 from "@/assets/product-6.jpg";

const categoryProducts = {
  men: [
    { id: 101, name: "Sport Runner Pro", price: 149.99, image: product1, category: "Men's Running", rating: 4.8, reviews: 234, isNew: true },
    { id: 102, name: "Urban Street Max", price: 129.99, image: product2, category: "Men's Lifestyle", rating: 4.6, reviews: 189 },
    { id: 103, name: "Training Force X", price: 119.99, originalPrice: 149.99, image: product3, category: "Men's Training", rating: 4.7, reviews: 156 },
    { id: 104, name: "Basketball Elite", price: 179.99, image: product4, category: "Men's Basketball", rating: 4.9, reviews: 312, isNew: true },
  ],
  women: [
    { id: 201, name: "Yoga Flow Lite", price: 99.99, image: product5, category: "Women's Yoga", rating: 4.9, reviews: 287, isNew: true },
    { id: 202, name: "Running Swift", price: 139.99, image: product6, category: "Women's Running", rating: 4.7, reviews: 198 },
    { id: 203, name: "Lifestyle Flex", price: 109.99, originalPrice: 139.99, image: product1, category: "Women's Lifestyle", rating: 4.5, reviews: 145 },
    { id: 204, name: "Training Edge", price: 124.99, image: product2, category: "Women's Training", rating: 4.8, reviews: 223 },
  ],
  kids: [
    { id: 301, name: "Junior Runner", price: 69.99, image: product3, category: "Kids Running", rating: 4.6, reviews: 134, isNew: true },
    { id: 302, name: "Playground Pro", price: 59.99, image: product4, category: "Kids Lifestyle", rating: 4.8, reviews: 167 },
    { id: 303, name: "School Sport", price: 54.99, originalPrice: 74.99, image: product5, category: "Kids Training", rating: 4.5, reviews: 98 },
    { id: 304, name: "Active Play Max", price: 64.99, image: product6, category: "Kids Active", rating: 4.7, reviews: 112 },
  ],
  accessories: [
    { id: 401, name: "Sport Backpack Pro", price: 89.99, image: product1, category: "Bags", rating: 4.7, reviews: 189, isNew: true },
    { id: 402, name: "Performance Cap", price: 34.99, image: product2, category: "Caps", rating: 4.5, reviews: 245 },
    { id: 403, name: "Elite Sport Socks", price: 19.99, originalPrice: 29.99, image: product3, category: "Socks", rating: 4.8, reviews: 312 },
    { id: 404, name: "Training Gym Bag", price: 79.99, image: product4, category: "Bags", rating: 4.6, reviews: 156 },
  ],
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

const CategoryPage = () => {
  const { category } = useParams();
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
