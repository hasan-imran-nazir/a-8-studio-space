import HeroSlider from "@/components/home/HeroSlider";
import FeaturedStudios from "@/components/home/FeaturedStudios";
import BrowseByCategory from "@/components/home/BrowseByCategory";
import HowBookingWorks from "@/components/home/HowBookingWorks";
import HostGuarantee from "@/components/home/HostGuarantee";
import CTABanner from "@/components/home/CTABanner";

export default function HomePage() {
  return (
    <>
      <HeroSlider />
      <FeaturedStudios />
      <BrowseByCategory />
      <HowBookingWorks />
      <HostGuarantee />
      <CTABanner />
    </>
  );
}
