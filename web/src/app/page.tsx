import type { Metadata } from "next";
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

export const metadata: Metadata = {
  title: {
    absolute: "Jaco Beach Real Estate | Dominique Brousseau, RE/MAX Costa Rica",
  },
  description:
    "Buy or sell property in Jaco Beach, Costa Rica with Dominique Brousseau of RE/MAX Oceanside Realty. Condos, houses, lots and investments — service in English, Spanish & French.",
  alternates: { canonical: "/" },
};

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
