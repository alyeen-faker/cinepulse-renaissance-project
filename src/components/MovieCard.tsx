import { Play, Star } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "./ui/button";
import { Card } from "./ui/card";

interface MovieCardProps {
  id: string;
  title: string;
  image: string;
  rating: number;
  type: "Film" | "Série";
  seasons?: string;
  releaseDate: string;
  description?: string;
  size?: "small" | "large";
}

export const MovieCard = ({
  id,
  title,
  image,
  rating,
  type,
  seasons,
  releaseDate,
  description,
  size = "small"
}: MovieCardProps) => {
  return (
    <Link to={`/movie/${id}`} className="block">
      <Card 
        className={`group overflow-hidden shadow-card hover:shadow-card-hover transition-all duration-300 hover:-translate-y-2 bg-card border-border/50 ${
          size === "large" ? "h-auto" : "h-fit"
        }`}
      >
      <div className="relative overflow-hidden">
        <img
          src={image}
          alt={title}
          className={`w-full object-cover transition-transform duration-300 group-hover:scale-105 ${
            size === "large" ? "h-64 md:h-80" : "h-40 sm:h-48"
          }`}
        />
        
        {/* Rating Badge */}
        <div className="absolute top-2 right-2 bg-background/90 backdrop-blur-sm px-2 py-1 rounded text-sm flex items-center">
          <Star className="h-3 w-3 text-yellow-400 mr-1 fill-current" />
          {rating}
        </div>

        {/* Play Overlay */}
        <div className="absolute inset-0 bg-gradient-overlay opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
          <Button variant="play" size="icon" className="animate-scale-in">
            <Play className="h-4 w-4 fill-current" />
          </Button>
        </div>

        {/* Bottom Info Overlay for large cards */}
        {size === "large" && (
          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-background via-background/80 to-transparent p-4">
            <div className="flex justify-between items-end">
              <div className="flex items-center space-x-2">
                <span className="bg-primary text-primary-foreground text-xs px-2 py-1 rounded">
                  {type}
                </span>
                {seasons && (
                  <span className="text-xs text-muted-foreground">{seasons}</span>
                )}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Card Content */}
      <div className={size === "large" ? "p-4" : "p-3"}>
        <h3 className={`font-bold mb-1 ${size === "large" ? "text-lg" : "text-sm"}`}>
          {title}
        </h3>
        <p className="text-muted-foreground text-xs mb-2">
          Sortie le {releaseDate}
        </p>
        
        {size === "small" && (
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <span className="bg-primary/20 text-primary text-xs px-2 py-1 rounded">
                {type}
              </span>
              {seasons && (
                <span className="text-xs text-muted-foreground">{seasons}</span>
              )}
            </div>
          </div>
        )}

        {description && size === "large" && (
          <p className="text-sm text-muted-foreground line-clamp-3 mt-2">
            {description}
          </p>
        )}
      </div>
    </Card>
  </Link>
  );
};