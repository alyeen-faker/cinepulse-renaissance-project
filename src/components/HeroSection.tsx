import { Play, Info } from "lucide-react";
import { Button } from "./ui/button";

export const HeroSection = () => {
  return (
    <section 
      className="relative min-h-screen flex items-center pt-20 pb-16"
      style={{
        backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.7)), url('https://image.tmdb.org/t/p/w1920_and_h800_multi_faces/gFkHcIh7iE5G0oVOgpmY8ONQjhl.jpg')`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      {/* Gradient overlay for better text readability */}
      <div className="absolute inset-0 bg-gradient-hero"></div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-2xl">
          <h1 className="text-4xl md:text-6xl font-bold mb-4 text-foreground leading-tight">
            Spider-Verse, Loki, Everything Everywhere
          </h1>
          <p className="text-xl mb-8 text-muted-foreground max-w-lg">
            Les portails s'ouvrent sur des univers fous & multivers infinis. 
            Découvrez des mondes parallèles et des réalités alternatives.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4">
            <Button variant="play" size="play" className="font-semibold">
              <Play className="h-5 w-5 mr-2 fill-current" />
              Regarder maintenant
            </Button>
            <Button variant="transparent" size="play" className="font-semibold">
              <Info className="h-5 w-5 mr-2" />
              Plus d'informations
            </Button>
          </div>
        </div>
      </div>

      {/* Bottom fade gradient */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent"></div>
    </section>
  );
};