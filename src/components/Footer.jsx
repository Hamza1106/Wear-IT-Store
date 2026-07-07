import { motion } from "framer-motion";
import { Link } from "@tanstack/react-router";
import { Instagram, Twitter, Facebook, Youtube, MapPin, Phone, Mail } from "lucide-react";

const footerLinks = {
  shop: [
    { label: "Men", href: "/category/men" },
    { label: "Women", href: "/category/women" },
    { label: "Kids", href: "/category/kids" },
    { label: "Accessories", href: "/category/accessories" },
    { label: "All Products", href: "/products" },
  ],
  help: [
    { label: "FAQ", href: "#" },
    { label: "Shipping", href: "#" },
    { label: "Returns", href: "#" },
    { label: "Size Guide", href: "#" },
    { label: "Track Order", href: "#" },
  ],
  company: [
    { label: "About Us", href: "#" },
    { label: "Careers", href: "#" },
    { label: "Press", href: "#" },
    { label: "Sustainability", href: "#" },
    { label: "Affiliates", href: "#" },
  ],
};

const socialLinks = [
  { icon: Instagram, href: "#", label: "Instagram" },
  { icon: Twitter, href: "#", label: "Twitter" },
  { icon: Facebook, href: "#", label: "Facebook" },
  { icon: Youtube, href: "#", label: "YouTube" },
];

const Footer = () => {
  return (
    <footer className="bg-card border-t border-border">
      <div className="container mx-auto px-4 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 lg:gap-8">
          {/* Brand Column */}
          <div className="lg:col-span-2">
            <motion.div
              whileHover={{ scale: 1.02 }}
            >
              <Link
                to="/"
                className="inline-block text-4xl font-display tracking-wider mb-6"
              >
                <span className="text-foreground">WEAR</span><span className="text-primary">IT</span>
              </Link>
            </motion.div>
            <p className="text-muted-foreground mb-6 max-w-sm">
              Empowering athletes and fitness enthusiasts with premium 
              performance gear designed for champions.
            </p>
            
            {/* Contact Info */}
            <div className="space-y-3 text-sm text-muted-foreground">
              <a href="#" className="flex items-center gap-3 hover:text-foreground transition-colors">
                <MapPin className="w-4 h-4 text-primary" />
                123 Athletic Way, Sports City, SC 12345
              </a>
              <a href="tel:+1234567890" className="flex items-center gap-3 hover:text-foreground transition-colors">
                <Phone className="w-4 h-4 text-primary" />
                +1 (234) 567-890
              </a>
              <a href="mailto:hello@wearit.com" className="flex items-center gap-3 hover:text-foreground transition-colors">
                <Mail className="w-4 h-4 text-primary" />
                hello@wearit.com
              </a>
            </div>
          </div>

          {/* Shop Links */}
          <div>
            <h4 className="font-display text-xl text-foreground mb-6">SHOP</h4>
            <ul className="space-y-3">
              {footerLinks.shop.map((link) => (
                <li key={link.label}>
                  <Link
                    to={link.href}
                    className="text-muted-foreground hover:text-primary transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Help Links */}
          <div>
            <h4 className="font-display text-xl text-foreground mb-6">HELP</h4>
            <ul className="space-y-3">
              {footerLinks.help.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="text-muted-foreground hover:text-primary transition-colors"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Company Links */}
          <div>
            <h4 className="font-display text-xl text-foreground mb-6">COMPANY</h4>
            <ul className="space-y-3">
              {footerLinks.company.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="text-muted-foreground hover:text-primary transition-colors"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-border my-10" />

        {/* Bottom Row */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          {/* Social Links */}
          <div className="flex items-center gap-4">
            {socialLinks.map((social) => (
              <motion.a
                key={social.label}
                href={social.href}
                whileHover={{ scale: 1.2, y: -2 }}
                whileTap={{ scale: 0.9 }}
                className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center text-muted-foreground hover:bg-primary hover:text-primary-foreground transition-all duration-300"
                aria-label={social.label}
              >
                <social.icon className="w-5 h-5" />
              </motion.a>
            ))}
          </div>

          {/* Copyright */}
          <p className="text-sm text-muted-foreground text-center">
            © 2026 WearIt. All rights reserved.
          </p>

          {/* Legal Links */}
          <div className="flex items-center gap-6 text-sm text-muted-foreground">
            <a href="#" className="hover:text-foreground transition-colors">
              Privacy Policy
            </a>
            <a href="#" className="hover:text-foreground transition-colors">
              Terms of Service
            </a>
            <a href="#" className="hover:text-foreground transition-colors">
              Cookies
            </a>
          </div>
        </div>
      </div>

      {/* Animated Background Accent */}
      <div className="h-1 gradient-neon" />
    </footer>
  );
};

export default Footer;
