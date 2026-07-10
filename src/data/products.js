import shadowBlack from "@/assets/p-shadow-runner.jpg";
import shadowOrange from "@/assets/p-shadow-runner-orange.jpg";
import shadowWhite from "@/assets/p-shadow-runner-white.jpg";
import flameHoodie from "@/assets/p-flame-hoodie.jpg";
import flameHoodieNavy from "@/assets/p-flame-hoodie-navy.jpg";
import trainingTee from "@/assets/p-training-tee.jpg";
import trainingTeeWhite from "@/assets/p-training-tee-white.jpg";
import powerShorts from "@/assets/p-power-shorts.jpg";
import powerShortsOlive from "@/assets/p-power-shorts-olive.jpg";
import leggings from "@/assets/p-leggings.jpg";
import leggingsNavy from "@/assets/p-leggings-navy.jpg";
import yogaTop from "@/assets/p-yoga-top.jpg";
import yogaTopOrange from "@/assets/p-yoga-top-orange.jpg";
import runJacket from "@/assets/p-run-jacket.jpg";
import runJacketOrange from "@/assets/p-run-jacket-orange.jpg";
import sportsBra from "@/assets/p-sports-bra.jpg";
import sportsBraWhite from "@/assets/p-sports-bra-white.jpg";
import kidsShoes from "@/assets/p-kids-shoes.jpg";
import kidsShoesRed from "@/assets/p-kids-shoes-red.jpg";
import kidsSet from "@/assets/p-kids-set.jpg";
import kidsSetBlack from "@/assets/p-kids-set-black.jpg";
import youthTee from "@/assets/p-youth-tee.jpg";
import youthTeeWhite from "@/assets/p-youth-tee-white.jpg";
import kidsShorts from "@/assets/p-kids-shorts.jpg";
import kidsShortsBlack from "@/assets/p-kids-shorts-black.jpg";
import snapback from "@/assets/p-snapback.jpg";
import snapbackOrange from "@/assets/p-snapback-orange.jpg";
import duffel from "@/assets/p-duffel.jpg";
import duffelOrange from "@/assets/p-duffel-orange.jpg";
import socks from "@/assets/p-socks.jpg";
import socksWhite from "@/assets/p-socks-white.jpg";
import bottle from "@/assets/p-bottle.jpg";
import bottleOrange from "@/assets/p-bottle-orange.jpg";

export const PRODUCT_COLORS = {
  black: { name: "Black", hex: "#0f0f0f" },
  orange: { name: "Orange", hex: "#ff6a2b" },
  white: { name: "White", hex: "#f5f5f5" },
  cyan: { name: "Cyan", hex: "#22d3ee" },
  olive: { name: "Olive", hex: "#5c6a3a" },
  navy: { name: "Navy", hex: "#1e3a8a" },
  red: { name: "Red", hex: "#dc2626" },
};

const C = PRODUCT_COLORS;

export const FILTER_COLORS = [
  C.black,
  C.orange,
  C.white,
  C.olive,
  C.navy,
  C.red,
];

export const ALL_PRODUCTS = [
  {
    id: 1,
    name: "Shadow Runner X",
    price: 179,
    category: "Men",
    brand: "Nike",
    isNew: true,
    rating: 4.8,
    reviews: 256,
    image: shadowBlack,
    sizes: ["7", "8", "9", "10", "11"],
    colors: [
      { ...C.black, image: shadowBlack },
      { ...C.orange, image: shadowOrange },
      { ...C.white, image: shadowWhite },
    ],
  },
  {
    id: 2,
    name: "Flame Tech Hoodie",
    price: 129,
    originalPrice: 159,
    category: "Men",
    brand: "Adidas",
    rating: 4.6,
    reviews: 189,
    image: flameHoodie,
    sizes: ["S", "M", "L", "XL"],
    colors: [
      { ...C.black, image: flameHoodie },
      { ...C.navy, image: flameHoodieNavy },
    ],
  },
  {
    id: 3,
    name: "Elite Training Tee",
    price: 59,
    category: "Men",
    brand: "Under Armour",
    rating: 4.5,
    reviews: 328,
    image: trainingTee,
    sizes: ["XS", "S", "M", "L", "XL"],
    colors: [
      { ...C.black, image: trainingTee },
      { ...C.white, image: trainingTeeWhite },
    ],
  },
  {
    id: 4,
    name: "Power Stride Shorts",
    price: 65,
    category: "Men",
    brand: "Puma",
    rating: 4.7,
    reviews: 198,
    image: powerShorts,
    sizes: ["S", "M", "L", "XL"],
    colors: [
      { ...C.black, image: powerShorts },
      { ...C.olive, image: powerShortsOlive },
    ],
  },
  {
    id: 5,
    name: "Performance Leggings",
    price: 89,
    category: "Women",
    brand: "Nike",
    isNew: true,
    rating: 4.9,
    reviews: 412,
    image: leggings,
    sizes: ["XS", "S", "M", "L"],
    colors: [
      { ...C.black, image: leggings },
      { ...C.navy, image: leggingsNavy },
    ],
  },
  {
    id: 6,
    name: "Zen Yoga Top",
    price: 55,
    category: "Women",
    brand: "New Balance",
    rating: 4.8,
    reviews: 287,
    image: yogaTop,
    sizes: ["XS", "S", "M", "L"],
    colors: [
      { ...C.black, image: yogaTop },
      { ...C.orange, image: yogaTopOrange },
    ],
  },
  {
    id: 7,
    name: "Swift Run Jacket",
    price: 145,
    originalPrice: 180,
    category: "Women",
    brand: "Adidas",
    rating: 4.6,
    reviews: 156,
    image: runJacket,
    sizes: ["S", "M", "L", "XL"],
    colors: [
      { ...C.black, image: runJacket },
      { ...C.orange, image: runJacketOrange },
    ],
  },
  {
    id: 8,
    name: "Flex Training Bra",
    price: 45,
    category: "Women",
    brand: "Puma",
    rating: 4.7,
    reviews: 342,
    image: sportsBra,
    sizes: ["XS", "S", "M", "L"],
    colors: [
      { ...C.black, image: sportsBra },
      { ...C.white, image: sportsBraWhite },
    ],
  },
  {
    id: 9,
    name: "Junior Sprint Shoes",
    price: 75,
    category: "Kids",
    brand: "Adidas",
    isNew: true,
    rating: 4.8,
    reviews: 134,
    image: kidsShoes,
    sizes: ["XS", "S", "M"],
    colors: [
      { ...C.navy, image: kidsShoes },
      { ...C.red, image: kidsShoesRed },
    ],
  },
  {
    id: 10,
    name: "Active Play Set",
    price: 49,
    category: "Kids",
    brand: "Puma",
    rating: 4.5,
    reviews: 89,
    image: kidsSet,
    sizes: ["XS", "S", "M"],
    colors: [
      { ...C.red, image: kidsSet },
      { ...C.black, image: kidsSetBlack },
    ],
  },
  {
    id: 11,
    name: "Youth Training Tee",
    price: 35,
    category: "Kids",
    brand: "Nike",
    rating: 4.6,
    reviews: 167,
    image: youthTee,
    sizes: ["XS", "S", "M"],
    colors: [
      { ...C.black, image: youthTee },
      { ...C.white, image: youthTeeWhite },
    ],
  },
  {
    id: 12,
    name: "Mini Champion Shorts",
    price: 29,
    category: "Kids",
    brand: "Under Armour",
    rating: 4.4,
    reviews: 78,
    image: kidsShorts,
    sizes: ["XS", "S", "M"],
    colors: [
      { ...C.navy, image: kidsShorts },
      { ...C.black, image: kidsShortsBlack },
    ],
  },
  {
    id: 13,
    name: "Urban Snapback",
    price: 45,
    originalPrice: 55,
    category: "Accessories",
    brand: "New Balance",
    rating: 4.7,
    reviews: 156,
    image: snapback,
    sizes: ["M", "L"],
    colors: [
      { ...C.black, image: snapback },
      { ...C.orange, image: snapbackOrange },
    ],
  },
  {
    id: 14,
    name: "Pro Gym Duffel",
    price: 99,
    category: "Accessories",
    brand: "Nike",
    isNew: true,
    rating: 4.8,
    reviews: 203,
    image: duffel,
    sizes: ["L", "XL"],
    colors: [
      { ...C.black, image: duffel },
      { ...C.orange, image: duffelOrange },
    ],
  },
  {
    id: 15,
    name: "Performance Socks Pack",
    price: 25,
    category: "Accessories",
    brand: "Adidas",
    rating: 4.5,
    reviews: 298,
    image: socks,
    sizes: ["S", "M", "L"],
    colors: [
      { ...C.black, image: socks },
      { ...C.white, image: socksWhite },
    ],
  },
  {
    id: 16,
    name: "Sport Water Bottle",
    price: 35,
    category: "Accessories",
    brand: "Puma",
    rating: 4.9,
    reviews: 445,
    image: bottle,
    sizes: ["M"],
    colors: [
      { ...C.black, image: bottle },
      { ...C.orange, image: bottleOrange },
    ],
  },
];

export const FEATURED_PRODUCT_IDS = [1, 2, 5, 3, 13, 14];
export const NEW_ARRIVAL_IDS = [1, 5, 14, 2];

export const getProductsByIds = (ids) =>
  ids.map((id) => ALL_PRODUCTS.find((product) => product.id === id)).filter(Boolean);