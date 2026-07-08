import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import hero1 from "@/assets/hero-1.jpg";
import hero2 from "@/assets/hero-2.jpg";
import hero3 from "@/assets/hero-3.jpg";
import product2 from "@/assets/product-2.jpg";
import product3 from "@/assets/product-3.jpg";

const shots = [
  { image: hero1, title: "Street 01", tag: "Urban", h: "row-span-2" },
  { image: product2, title: "Off Duty", tag: "Lifestyle", h: "" },
  { image: hero3, title: "Studio 03", tag: "Editorial", h: "" },
  { image: product3, title: "Motion", tag: "Performance", h: "row-span-2" },
  { image: hero2, title: "Nightshift", tag: "After Dark", h: "" },
];

const Lookbook = () => {
  return (
    <section className="py-24 lg:py-32 gradient-hero relative overflow-hidden">
      <div className="container mx-auto px-4 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-14"
        >
          <span className="text-primary font-medium tracking-widest uppercase text-sm">
            Autumn 2026
          </span>
          <h2 className="text-4xl md:text-6xl lg:text-7xl font-display mt-4">
            THE <span className="text-gradient">LOOKBOOK</span>
          </h2>
        </motion.div>

        <div className="grid grid-cols-2 lg:grid-cols-4 grid-rows-2 gap-3 lg:gap-5 auto-rows-[220px] lg:auto-rows-[280px]">
          {shots.map((s, i) => (
            <motion.a
              key={s.title}
              href="#"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.08 }}
              className={`group relative overflow-hidden rounded-2xl ${s.h}`}
            >
              <motion.img
                src={s.image}
                alt={s.title}
                className="absolute inset-0 w-full h-full object-cover"
                whileHover={{ scale: 1.08 }}
                transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/20 to-transparent" />
              <div className="absolute inset-0 p-5 flex flex-col justify-end">
                <div className="translate-y-2 group-hover:translate-y-0 transition-transform duration-500">
                  <span className="text-xs uppercase tracking-widest text-primary">
                    {s.tag}
                  </span>
                  <div className="flex items-center justify-between">
                    <h3 className="text-2xl font-display">{s.title}</h3>
                    <ArrowUpRight className="w-5 h-5 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </div>
                </div>
              </div>
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Lookbook;
