import { lazy, Suspense } from "react";
import Navbar from "@/components/Navbar";
import HeroCarousel from "@/components/HeroCarousel";
import FeaturedProducts from "@/components/FeaturedProducts";
import WhyVelocity from "@/components/WhyVelocity";
import CategoriesShowcase from "@/components/CategoriesShowcase";
import Footer from "@/components/Footer";
import LoginModal from "@/components/LoginModal";

// Heavy / below-the-fold — load on demand to keep initial paint snappy
const Featured3D = lazy(() => import("@/components/Featured3D"));
const NewArrivals = lazy(() => import("@/components/NewArrivals"));
const TrendingCarousel = lazy(() => import("@/components/TrendingCarousel"));
const Lookbook = lazy(() => import("@/components/Lookbook"));
const Reviews = lazy(() => import("@/components/Reviews"));
const InstagramFeed = lazy(() => import("@/components/InstagramFeed"));
const Newsletter = lazy(() => import("@/components/Newsletter"));

const SectionFallback = () => (
  <div className="h-[400px] w-full bg-gradient-to-b from-background to-card animate-pulse" />
);

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <LoginModal />
      <main>
        <HeroCarousel />
        <FeaturedProducts />
        <WhyVelocity />
        <CategoriesShowcase />
        <Suspense fallback={<SectionFallback />}>
          <Featured3D />
        </Suspense>
        <Suspense fallback={<SectionFallback />}>
          <NewArrivals />
        </Suspense>
        <Suspense fallback={<SectionFallback />}>
          <TrendingCarousel />
        </Suspense>
        <Suspense fallback={<SectionFallback />}>
          <Lookbook />
        </Suspense>
        <Suspense fallback={<SectionFallback />}>
          <Reviews />
        </Suspense>
        <Suspense fallback={<SectionFallback />}>
          <InstagramFeed />
        </Suspense>
        <Suspense fallback={<SectionFallback />}>
          <Newsletter />
        </Suspense>
      </main>
      <Footer />
    </div>
  );
};

export default Index;
