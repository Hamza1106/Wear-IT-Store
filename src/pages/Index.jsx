import Navbar from "@/components/Navbar";
import HeroCarousel from "@/components/HeroCarousel";
import FeaturedProducts from "@/components/FeaturedProducts";
import WhyVelocity from "@/components/WhyVelocity";
import CategoriesShowcase from "@/components/CategoriesShowcase";
import Featured3D from "@/components/Featured3D";
import NewArrivals from "@/components/NewArrivals";
import TrendingCarousel from "@/components/TrendingCarousel";
import Lookbook from "@/components/Lookbook";
import Reviews from "@/components/Reviews";
import InstagramFeed from "@/components/InstagramFeed";
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
        <WhyVelocity />
        <CategoriesShowcase />
        <Featured3D />
        <NewArrivals />
        <TrendingCarousel />
        <Lookbook />
        <Reviews />
        <InstagramFeed />
        <Newsletter />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
