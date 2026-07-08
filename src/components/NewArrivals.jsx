import { motion } from "framer-motion";
import ProductCard from "./ProductCard";
import product1 from "@/assets/product-1.jpg";
import product3 from "@/assets/product-3.jpg";
import product6 from "@/assets/product-6.jpg";
import product2 from "@/assets/product-2.jpg";

const newArrivals = [
  {
    id: 101,
    name: "Shadow Runner X",
    price: 179,
    image: product1,
    hoverImage: product2,
    rating: 4.8,
    reviews: 256,
    category: "Running",
    isNew: true,
    colors: ["#ff6a2b", "#0f0f0f", "#f5f5f5"],
    sizes: ["7", "8", "9", "10", "11"],
  },
  {
    id: 102,
    name: "Performance Leggings",
    price: 89,
    image: product3,
    hoverImage: product1,
    rating: 4.9,
    reviews: 412,
    category: "Women",
    isNew: true,
    colors: ["#0f0f0f", "#22d3ee", "#ff6a2b"],
    sizes: ["XS", "S", "M", "L"],
  },
  {
    id: 103,
    name: "Pro Gym Duffel",
    price: 99,
    image: product6,
    hoverImage: product3,
    rating: 4.8,
    reviews: 203,
    category: "Accessories",
    isNew: true,
    colors: ["#0f0f0f", "#ff6a2b"],
    sizes: ["One Size"],
  },
  {
    id: 104,
    name: "Flame Tech Hoodie",
    price: 129,
    originalPrice: 159,
    image: product2,
    hoverImage: product6,
    rating: 4.6,
    reviews: 189,
    category: "Training",
    isNew: true,
    colors: ["#ff6a2b", "#0f0f0f", "#22d3ee"],
    sizes: ["S", "M", "L", "XL"],
  },
];

const NewArrivals = () => {
  return (
    <section className="py-24 lg:py-32 bg-background">
      <div className="container mx-auto px-4 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="flex flex-col md:flex-row md:items-end md:justify-between mb-12 gap-4"
        >
          <div>
            <span className="text-primary font-medium tracking-widest uppercase text-sm">
              Just Landed
            </span>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-display mt-4">
              NEW <span className="text-gradient">ARRIVALS</span>
            </h2>
          </div>
          <p className="text-muted-foreground max-w-sm">
            Fresh drops every Thursday. Hover to see the alternate colorway.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {newArrivals.map((p, i) => (
            <motion.div
              key={p.id}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
            >
              <ProductCard product={p} />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default NewArrivals;
