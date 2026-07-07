import Navbar from "@/components/Navbar";
import HeroCarousel from "@/components/HeroCarousel";
import FeaturedProducts from "@/components/FeaturedProducts";
import TrendingCarousel from "@/components/TrendingCarousel";
import Newsletter from "@/components/Newsletter";
import Footer from "@/components/Footer";
import LoginModal from "@/components/LoginModal";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <LoginModal />
      <main>
        <HeroCarousel />
        <FeaturedProducts />
        <TrendingCarousel />
        <Newsletter />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
