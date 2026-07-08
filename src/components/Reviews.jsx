import { motion } from "framer-motion";
import { Star, BadgeCheck, Heart } from "lucide-react";

const reviews = [
  {
    name: "Ayesha K.",
    country: "🇵🇰 Pakistan",
    rating: 5,
    title: "The best runners I've owned",
    body: "Shadow Runner X carried me through my first marathon. Zero blisters. Insane rebound.",
    verified: true,
    likes: 128,
    initial: "A",
  },
  {
    name: "Marco V.",
    country: "🇮🇹 Italy",
    rating: 5,
    title: "Legit premium quality",
    body: "The stitching, the material, the finish — feels like a $300 product. Fit is true to size.",
    verified: true,
    likes: 94,
    initial: "M",
  },
  {
    name: "Sofia R.",
    country: "🇧🇷 Brazil",
    rating: 4,
    title: "Perfect for hot yoga",
    body: "The leggings breathe like nothing else I've tried. Colors haven't faded after 20+ washes.",
    verified: true,
    likes: 76,
    initial: "S",
  },
  {
    name: "James T.",
    country: "🇺🇸 USA",
    rating: 5,
    title: "Obsessed with the hoodie",
    body: "Wear it every single day. Tech fabric that actually feels like cotton. Chef's kiss.",
    verified: true,
    likes: 201,
    initial: "J",
  },
];

const Reviews = () => {
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
              4.9 / 5 · 12,480 reviews
            </span>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-display mt-4">
              LOVED BY <span className="text-gradient">ATHLETES</span>
            </h2>
          </div>
          <div className="flex items-center gap-1">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className="w-6 h-6 fill-primary text-primary" />
            ))}
          </div>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {reviews.map((r, i) => (
            <motion.div
              key={r.name}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              whileHover={{ y: -6 }}
              className="p-6 rounded-2xl bg-card border border-border flex flex-col gap-4"
            >
              <div className="flex items-center gap-3">
                <div className="w-11 h-11 rounded-full gradient-neon flex items-center justify-center font-semibold text-primary-foreground">
                  {r.initial}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-1 font-medium truncate">
                    {r.name}
                    {r.verified && (
                      <BadgeCheck className="w-4 h-4 text-primary shrink-0" />
                    )}
                  </div>
                  <div className="text-xs text-muted-foreground">
                    {r.country}
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-0.5">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`w-4 h-4 ${
                      i < r.rating
                        ? "fill-primary text-primary"
                        : "fill-muted text-muted"
                    }`}
                  />
                ))}
              </div>

              <div>
                <h4 className="font-semibold mb-1">{r.title}</h4>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {r.body}
                </p>
              </div>

              <div className="pt-3 border-t border-border flex items-center justify-between text-xs text-muted-foreground">
                <button className="flex items-center gap-1.5 hover:text-primary transition-colors">
                  <Heart className="w-4 h-4" />
                  {r.likes}
                </button>
                <span>Verified purchase</span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Reviews;
