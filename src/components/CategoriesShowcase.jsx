import { motion } from "framer-motion";
import { Link } from "@tanstack/react-router";
import { ArrowUpRight } from "lucide-react";
import hero1 from "@/assets/hero-1.jpg";
import hero2 from "@/assets/hero-2.jpg";
import hero3 from "@/assets/hero-3.jpg";
import product5 from "@/assets/product-5.jpg";

const categories = [
  {
    label: "Men",
    href: "/category/men",
    tag: "42 pieces",
    image: hero1,
    size: "lg:col-span-2 lg:row-span-2",
  },
  {
    label: "Women",
    href: "/category/women",
    tag: "38 pieces",
    image: hero3,
    size: "lg:col-span-2",
  },
  {
    label: "Kids",
    href: "/category/kids",
    tag: "24 pieces",
    image: hero2,
    size: "",
  },
  {
    label: "Accessories",
    href: "/category/accessories",
    tag: "56 pieces",
    image: product5,
    size: "",
  },
];

const CategoriesShowcase = () => {
  return (
    <section className="py-24 lg:py-32 bg-background">
      <div className="container mx-auto px-4 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="flex flex-col md:flex-row md:items-end md:justify-between mb-12 gap-6"
        >
          <div>
            <span className="text-primary font-medium tracking-widest uppercase text-sm">
              Shop By Category
            </span>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-display mt-4">
              FIND YOUR <span className="text-gradient">TRIBE</span>
            </h2>
          </div>
          <Link
            to="/products"
            className="text-sm font-medium uppercase tracking-widest text-muted-foreground hover:text-primary transition-colors inline-flex items-center gap-2"
          >
            View All <ArrowUpRight className="w-4 h-4" />
          </Link>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 lg:grid-rows-2 gap-4 lg:gap-6 auto-rows-[280px] lg:auto-rows-[260px]">
          {categories.map((cat, i) => (
            <motion.div
              key={cat.label}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className={`relative overflow-hidden rounded-2xl group ${cat.size}`}
            >
              <Link to={cat.href} className="block absolute inset-0">
                <motion.img
                  src={cat.image}
                  alt={cat.label}
                  className="absolute inset-0 w-full h-full object-cover"
                  whileHover={{ scale: 1.12 }}
                  transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background via-background/40 to-transparent" />
                <div className="absolute inset-0 bg-primary/0 group-hover:bg-primary/10 transition-colors duration-500" />

                <div className="absolute inset-0 p-6 lg:p-8 flex flex-col justify-end">
                  <span className="text-xs uppercase tracking-widest text-primary mb-2">
                    {cat.tag}
                  </span>
                  <div className="flex items-end justify-between">
                    <h3 className="text-3xl lg:text-5xl font-display leading-none">
                      {cat.label}
                    </h3>
                    <motion.div
                      whileHover={{ rotate: 45 }}
                      className="w-12 h-12 rounded-full bg-primary flex items-center justify-center text-primary-foreground opacity-0 group-hover:opacity-100 translate-y-4 group-hover:translate-y-0 transition-all duration-500"
                    >
                      <ArrowUpRight className="w-5 h-5" />
                    </motion.div>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CategoriesShowcase;
