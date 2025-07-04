import { Navigation } from "@/components/Navigation";
import { HeroSection } from "@/components/HeroSection";
import { FeaturedSection, NewReleasesSection, PopularSeriesSection } from "@/components/ContentSection";
import { GenreSection } from "@/components/GenreSection";
import { Footer } from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navigation />
      <HeroSection />
      
      <div className="container mx-auto px-4 py-8 space-y-16">
        <FeaturedSection />
        <NewReleasesSection />
        <PopularSeriesSection />
        <GenreSection />
      </div>
      
      <Footer />
    </div>
  );
};

export default Index;
