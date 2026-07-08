import { motion } from "framer-motion";
import { Instagram, Heart, MessageCircle } from "lucide-react";
import hero1 from "@/assets/hero-1.jpg";
import hero2 from "@/assets/hero-2.jpg";
import hero3 from "@/assets/hero-3.jpg";
import product1 from "@/assets/product-1.jpg";
import product2 from "@/assets/product-2.jpg";
import product3 from "@/assets/product-3.jpg";

const posts = [
  { image: hero1, likes: "12.4k", comments: 284 },
  { image: product1, likes: "8.9k", comments: 156 },
  { image: hero2, likes: "24.1k", comments: 512 },
  { image: product2, likes: "6.7k", comments: 98 },
  { image: hero3, likes: "18.2k", comments: 341 },
  { image: product3, likes: "10.3k", comments: 217 },
];

const InstagramFeed = () => {
  return (
    <section className="py-24 lg:py-32 bg-background">
      <div className="container mx-auto px-4 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center gap-2 text-primary font-medium tracking-widest uppercase text-sm">
            <Instagram className="w-4 h-4" />
            @velocity.wear
          </div>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-display mt-4">
            TAG US IN <span className="text-gradient">YOUR RUN</span>
          </h2>
          <p className="text-muted-foreground mt-4 max-w-md mx-auto">
            Featured this week on our feed. Use #WearVelocity for a chance to appear.
          </p>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3 lg:gap-4">
          {posts.map((p, i) => (
            <motion.a
              key={i}
              href="#"
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.06 }}
              className="group relative aspect-square overflow-hidden rounded-xl"
            >
              <motion.img
                src={p.image}
                alt=""
                className="absolute inset-0 w-full h-full object-cover"
                whileHover={{ scale: 1.1 }}
                transition={{ duration: 0.6 }}
              />
              <div className="absolute inset-0 bg-primary/70 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-4 text-primary-foreground text-sm font-medium">
                <span className="flex items-center gap-1">
                  <Heart className="w-4 h-4 fill-current" />
                  {p.likes}
                </span>
                <span className="flex items-center gap-1">
                  <MessageCircle className="w-4 h-4" />
                  {p.comments}
                </span>
              </div>
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  );
};

export default InstagramFeed;
