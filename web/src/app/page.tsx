import HeroSection from "@/components/home/HeroSection";
import AgentHighlight from "@/components/home/AgentHighlight";
import MeetDominique from "@/components/home/MeetDominique";
import NeighborhoodsGrid from "@/components/home/NeighborhoodsGrid";
import FeaturedProperties from "@/components/home/FeaturedProperties";
import WhyChooseMe from "@/components/home/WhyChooseMe";
import TestimonialsCarousel from "@/components/home/TestimonialsCarousel";
import PopularCategories from "@/components/home/PopularCategories";
import BlogPreview from "@/components/home/BlogPreview";
import SellerBuyerCTA from "@/components/home/SellerBuyerCTA";

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <AgentHighlight />
      <MeetDominique />
      <NeighborhoodsGrid />
      <FeaturedProperties />
      <WhyChooseMe />
      <TestimonialsCarousel />
      <PopularCategories />
      <BlogPreview />
      <SellerBuyerCTA />
    </>
  );
}
