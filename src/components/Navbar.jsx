import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link, useNavigate } from "@tanstack/react-router";
import { Search, ShoppingBag, Menu, X, ChevronDown, User, LogOut } from "lucide-react";
import { useCart } from "@/context/CartContext";
import { useAuth } from "@/context/AuthContext";
import CartDrawer from "./CartDrawer";

const navItems = [
  { 
    label: "Men", 
    href: "/category/men",
    submenu: ["Running", "Training", "Basketball", "Lifestyle", "Shoes", "Clothing"]
  },
  { 
    label: "Women", 
    href: "/category/women",
    submenu: ["Running", "Training", "Yoga", "Lifestyle", "Shoes", "Clothing"]
  },
  { 
    label: "Kids", 
    href: "/category/kids",
    submenu: ["Boys", "Girls", "Infants", "Shoes", "Clothing"]
  },
  { 
    label: "Accessories", 
    href: "/category/accessories",
    submenu: ["Bags", "Caps", "Socks", "Equipment"]
  },
];

const allProducts = [
  { name: "Shadow Runner X", category: "Men", href: "/category/men" },
  { name: "Flame Tech Hoodie", category: "Men", href: "/category/men" },
  { name: "Elite Training Tee", category: "Men", href: "/category/men" },
  { name: "Performance Leggings", category: "Women", href: "/category/women" },
  { name: "Zen Yoga Top", category: "Women", href: "/category/women" },
  { name: "Swift Run Jacket", category: "Women", href: "/category/women" },
  { name: "Junior Sprint Shoes", category: "Kids", href: "/category/kids" },
  { name: "Active Play Set", category: "Kids", href: "/category/kids" },
  { name: "Urban Snapback", category: "Accessories", href: "/category/accessories" },
  { name: "Pro Gym Duffel", category: "Accessories", href: "/category/accessories" },
];

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const searchInputRef = useRef(null);
  
  const navigate = useNavigate();
  const { cartCount } = useCart();
  const { user, isLoggedIn, logout, openLoginModal } = useAuth();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (isSearchOpen && searchInputRef.current) {
      searchInputRef.current.focus();
    }
  }, [isSearchOpen]);

  useEffect(() => {
    if (searchQuery.trim()) {
      const filtered = allProducts.filter(
        (product) =>
          product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          product.category.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setSearchResults(filtered);
    } else {
      setSearchResults([]);
    }
  }, [searchQuery]);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/products`);
      setIsSearchOpen(false);
      setSearchQuery("");
    }
  };

  const handleResultClick = (href) => {
    navigate(href);
    setIsSearchOpen(false);
    setSearchQuery("");
  };

  return (
    <>
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          isScrolled 
            ? "bg-background/95 backdrop-blur-lg border-b border-border" 
            : "bg-transparent"
        }`}
      >
        <div className="container mx-auto px-4 lg:px-8">
          <div className="flex items-center justify-between h-20">
            {/* Logo */}
            <Link to="/">
              <motion.div
                className="text-3xl md:text-4xl font-display tracking-wider"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <span className="text-foreground">WEAR</span><span className="text-primary">IT</span>
              </motion.div>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center gap-8">
              {navItems.map((item) => (
                <div
                  key={item.label}
                  className="relative"
                  onMouseEnter={() => setActiveDropdown(item.label)}
                  onMouseLeave={() => setActiveDropdown(null)}
                >
                  <Link
                    to={item.href}
                    className="nav-link flex items-center gap-1 py-2 text-sm font-medium uppercase tracking-wide"
                  >
                    {item.label}
                    {item.submenu && (
                      <ChevronDown 
                        className={`w-4 h-4 transition-transform duration-300 ${
                          activeDropdown === item.label ? "rotate-180" : ""
                        }`}
                      />
                    )}
                  </Link>

                  {/* Dropdown */}
                  <AnimatePresence>
                    {item.submenu && activeDropdown === item.label && (
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 10 }}
                        transition={{ duration: 0.2 }}
                        className="absolute top-full left-0 pt-2"
                      >
                        <div className="bg-card/95 backdrop-blur-lg border border-border rounded-lg p-4 min-w-48 card-shadow">
                          {item.submenu.map((subItem) => (
                            <Link
                              key={subItem}
                              to={item.href}
                              className="block py-2 px-3 text-sm text-muted-foreground hover:text-foreground hover:bg-secondary/50 rounded-md transition-colors"
                            >
                              {subItem}
                            </Link>
                          ))}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ))}
            </div>

            {/* Right Icons */}
            <div className="flex items-center gap-2 md:gap-4">
              {/* Search Button (opens global command palette) */}
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => window.dispatchEvent(new Event("velocity:open-search"))}
                className="hidden md:flex items-center gap-2 px-3 py-2 rounded-full border border-border bg-secondary/50 hover:border-primary transition-colors text-muted-foreground hover:text-foreground"
              >
                <Search className="w-4 h-4" />
                <span className="text-xs">Search</span>
                <kbd className="hidden lg:inline text-[10px] px-1.5 py-0.5 rounded bg-background border border-border">
                  ⌘K
                </kbd>
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => window.dispatchEvent(new Event("velocity:open-search"))}
                className="md:hidden p-2 text-foreground/80 hover:text-foreground transition-colors"
              >
                <Search className="w-5 h-5" />
              </motion.button>

              {/* Cart Button */}
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => setIsCartOpen(true)}
                className="relative p-2 text-foreground/80 hover:text-foreground transition-colors"
              >
                <ShoppingBag className="w-5 h-5" />
                {cartCount > 0 && (
                  <motion.span
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="absolute -top-1 -right-1 w-5 h-5 bg-primary text-primary-foreground text-xs rounded-full flex items-center justify-center font-semibold"
                  >
                    {cartCount}
                  </motion.span>
                )}
              </motion.button>

              {/* User Menu / Login Button */}
              {isLoggedIn ? (
                <div 
                  className="relative"
                  onMouseEnter={() => setIsUserMenuOpen(true)}
                  onMouseLeave={() => setIsUserMenuOpen(false)}
                >
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    className="p-2 text-foreground/80 hover:text-foreground transition-colors flex items-center gap-2"
                  >
                    <div className="w-8 h-8 rounded-full gradient-neon flex items-center justify-center">
                      <span className="text-primary-foreground text-sm font-semibold">
                        {user?.name?.charAt(0).toUpperCase()}
                      </span>
                    </div>
                  </motion.button>

                  <AnimatePresence>
                    {isUserMenuOpen && (
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 10 }}
                        className="absolute top-full right-0 pt-2"
                      >
                        <div className="bg-card/95 backdrop-blur-lg border border-border rounded-lg p-3 min-w-48 card-shadow">
                          <p className="px-3 py-2 text-sm text-muted-foreground">
                            Hello, <span className="text-foreground font-medium">{user?.name}</span>
                          </p>
                          <button
                            onClick={logout}
                            className="w-full flex items-center gap-2 py-2 px-3 text-sm text-muted-foreground hover:text-foreground hover:bg-secondary/50 rounded-md transition-colors"
                          >
                            <LogOut className="w-4 h-4" />
                            Sign Out
                          </button>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ) : (
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={openLoginModal}
                  className="hidden md:flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground font-medium text-sm rounded-full hover:opacity-90 transition-opacity"
                >
                  <User className="w-4 h-4" />
                  Login
                </motion.button>
              )}
              
              {/* Mobile Menu Toggle */}
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className="lg:hidden p-2 text-foreground"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              >
                {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </motion.button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="lg:hidden bg-background/95 backdrop-blur-lg border-t border-border"
            >
              <div className="container mx-auto px-4 py-6">
                {navItems.map((item, index) => (
                  <motion.div
                    key={item.label}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <Link
                      to={item.href}
                      className="block py-3 text-lg font-medium uppercase tracking-wide text-foreground/80 hover:text-primary transition-colors"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      {item.label}
                    </Link>
                  </motion.div>
                ))}
                
                {/* Mobile Login Button */}
                {!isLoggedIn && (
                  <motion.button
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: navItems.length * 0.1 }}
                    onClick={() => {
                      openLoginModal();
                      setIsMobileMenuOpen(false);
                    }}
                    className="mt-4 w-full flex items-center justify-center gap-2 px-4 py-3 bg-primary text-primary-foreground font-medium rounded-full"
                  >
                    <User className="w-4 h-4" />
                    Login
                  </motion.button>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.nav>

      {/* Search Overlay */}
      <AnimatePresence>
        {isSearchOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[60] bg-background/95 backdrop-blur-lg"
          >
            <div className="container mx-auto px-4 pt-24">
              {/* Close Button */}
              <motion.button
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                onClick={() => {
                  setIsSearchOpen(false);
                  setSearchQuery("");
                }}
                className="absolute top-6 right-6 p-3 rounded-full bg-secondary hover:bg-muted transition-colors"
              >
                <X className="w-6 h-6" />
              </motion.button>

              {/* Search Form */}
              <motion.form
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 30 }}
                transition={{ delay: 0.1 }}
                onSubmit={handleSearchSubmit}
                className="max-w-3xl mx-auto"
              >
                <div className="relative">
                  <Search className="absolute left-6 top-1/2 -translate-y-1/2 w-6 h-6 text-muted-foreground" />
                  <motion.input
                    ref={searchInputRef}
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search products..."
                    className="w-full py-6 pl-16 pr-6 text-2xl bg-secondary/50 border-2 border-border rounded-2xl focus:border-primary focus:outline-none transition-all duration-300 placeholder:text-muted-foreground"
                    initial={{ scale: 0.95 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  />
                </div>
              </motion.form>

              {/* Search Results */}
              <AnimatePresence>
                {searchResults.length > 0 && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 20 }}
                    className="max-w-3xl mx-auto mt-6"
                  >
                    <p className="text-muted-foreground text-sm mb-4">
                      {searchResults.length} result{searchResults.length > 1 ? "s" : ""} found
                    </p>
                    <div className="bg-card border border-border rounded-2xl overflow-hidden">
                      {searchResults.map((result, index) => (
                        <motion.button
                          key={result.name}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: index * 0.05 }}
                          onClick={() => handleResultClick(result.href)}
                          className="w-full flex items-center justify-between p-4 hover:bg-secondary/50 transition-colors border-b border-border last:border-b-0 text-left"
                        >
                          <div>
                            <p className="font-medium text-foreground">{result.name}</p>
                            <p className="text-sm text-muted-foreground">{result.category}</p>
                          </div>
                          <span className="text-primary">→</span>
                        </motion.button>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Quick Links */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="max-w-3xl mx-auto mt-8"
              >
                <p className="text-muted-foreground text-sm mb-4">Quick Links</p>
                <div className="flex flex-wrap gap-3">
                  {navItems.map((item) => (
                    <motion.button
                      key={item.label}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => handleResultClick(item.href)}
                      className="px-4 py-2 bg-secondary rounded-full text-sm font-medium hover:bg-primary hover:text-primary-foreground transition-colors"
                    >
                      {item.label}
                    </motion.button>
                  ))}
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => handleResultClick("/products")}
                    className="px-4 py-2 bg-primary text-primary-foreground rounded-full text-sm font-medium hover:opacity-90 transition-opacity"
                  >
                    All Products
                  </motion.button>
                </div>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Cart Drawer */}
      <CartDrawer isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
    </>
  );
};

export default Navbar;
