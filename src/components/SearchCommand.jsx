import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Command } from "cmdk";
import { Search, ArrowRight, Sparkles, TrendingUp } from "lucide-react";
import { useNavigate } from "@tanstack/react-router";

const catalog = [
  { name: "Shadow Runner X", category: "Men · Running", href: "/category/men" },
  { name: "Flame Tech Hoodie", category: "Men · Training", href: "/category/men" },
  { name: "Elite Training Tee", category: "Men · Training", href: "/category/men" },
  { name: "Performance Leggings", category: "Women · Bottoms", href: "/category/women" },
  { name: "Zen Yoga Top", category: "Women · Yoga", href: "/category/women" },
  { name: "Swift Run Jacket", category: "Women · Outerwear", href: "/category/women" },
  { name: "Junior Sprint Shoes", category: "Kids · Shoes", href: "/category/kids" },
  { name: "Urban Snapback", category: "Accessories · Caps", href: "/category/accessories" },
  { name: "Pro Gym Duffel", category: "Accessories · Bags", href: "/category/accessories" },
];

const quickLinks = [
  { label: "All Products", href: "/products" },
  { label: "Men", href: "/category/men" },
  { label: "Women", href: "/category/women" },
  { label: "Kids", href: "/category/kids" },
  { label: "Accessories", href: "/category/accessories" },
];

const trending = ["Shadow Runner", "Leggings", "Hoodie", "Duffel", "Snapback"];

const SearchCommand = () => {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const down = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setOpen((o) => !o);
      }
      if (e.key === "Escape") setOpen(false);
    };
    const openEvt = () => setOpen(true);
    window.addEventListener("keydown", down);
    window.addEventListener("velocity:open-search", openEvt);
    return () => {
      window.removeEventListener("keydown", down);
      window.removeEventListener("velocity:open-search", openEvt);
    };
  }, []);

  const go = (href) => {
    setOpen(false);
    navigate({ to: href });
  };

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[100] bg-background/70 backdrop-blur-md flex items-start justify-center pt-[10vh] px-4"
          onClick={() => setOpen(false)}
        >
          <motion.div
            initial={{ y: -30, scale: 0.96, opacity: 0 }}
            animate={{ y: 0, scale: 1, opacity: 1 }}
            exit={{ y: -20, scale: 0.98, opacity: 0 }}
            transition={{ type: "spring", damping: 22, stiffness: 260 }}
            onClick={(e) => e.stopPropagation()}
            className="w-full max-w-2xl bg-card border border-border rounded-2xl overflow-hidden card-shadow"
          >
            <Command loop>
              <div className="flex items-center gap-3 px-5 border-b border-border">
                <Search className="w-5 h-5 text-muted-foreground shrink-0" />
                <Command.Input
                  autoFocus
                  placeholder="Search products, categories, colors..."
                  className="flex-1 py-5 bg-transparent outline-none text-base placeholder:text-muted-foreground"
                />
                <kbd className="hidden sm:inline text-xs px-2 py-1 rounded bg-secondary text-muted-foreground">
                  ESC
                </kbd>
              </div>

              <Command.List className="max-h-[60vh] overflow-y-auto p-3">
                <Command.Empty className="py-8 text-center text-sm text-muted-foreground">
                  No matches. Try "runner", "hoodie", or "leggings".
                </Command.Empty>

                <Command.Group
                  heading="Products"
                  className="[&_[cmdk-group-heading]]:px-2 [&_[cmdk-group-heading]]:py-2 [&_[cmdk-group-heading]]:text-xs [&_[cmdk-group-heading]]:uppercase [&_[cmdk-group-heading]]:tracking-widest [&_[cmdk-group-heading]]:text-muted-foreground"
                >
                  {catalog.map((p) => (
                    <Command.Item
                      key={p.name}
                      value={`${p.name} ${p.category}`}
                      onSelect={() => go(p.href)}
                      className="flex items-center justify-between gap-3 px-3 py-3 rounded-lg cursor-pointer data-[selected=true]:bg-secondary transition-colors"
                    >
                      <div>
                        <div className="font-medium">{p.name}</div>
                        <div className="text-xs text-muted-foreground">
                          {p.category}
                        </div>
                      </div>
                      <ArrowRight className="w-4 h-4 text-primary" />
                    </Command.Item>
                  ))}
                </Command.Group>

                <Command.Group
                  heading="Quick Links"
                  className="[&_[cmdk-group-heading]]:px-2 [&_[cmdk-group-heading]]:py-2 [&_[cmdk-group-heading]]:text-xs [&_[cmdk-group-heading]]:uppercase [&_[cmdk-group-heading]]:tracking-widest [&_[cmdk-group-heading]]:text-muted-foreground"
                >
                  {quickLinks.map((l) => (
                    <Command.Item
                      key={l.label}
                      value={l.label}
                      onSelect={() => go(l.href)}
                      className="flex items-center gap-3 px-3 py-2.5 rounded-lg cursor-pointer data-[selected=true]:bg-secondary transition-colors"
                    >
                      <Sparkles className="w-4 h-4 text-primary" />
                      {l.label}
                    </Command.Item>
                  ))}
                </Command.Group>
              </Command.List>

              <div className="border-t border-border px-4 py-3 flex items-center justify-between text-xs text-muted-foreground">
                <div className="flex items-center gap-2">
                  <TrendingUp className="w-3.5 h-3.5" />
                  <span>Trending:</span>
                  <div className="hidden sm:flex gap-1.5">
                    {trending.slice(0, 3).map((t) => (
                      <span
                        key={t}
                        className="px-2 py-0.5 rounded-full bg-secondary"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
                <div className="flex items-center gap-1.5">
                  <kbd className="px-1.5 py-0.5 rounded bg-secondary">↵</kbd>
                  <span>to select</span>
                </div>
              </div>
            </Command>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default SearchCommand;
