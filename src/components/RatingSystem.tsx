import { useState } from "react";
import { Star } from "lucide-react";
import { Button } from "./ui/button";

interface RatingSystemProps {
  movieId: string;
  initialRating?: number;
}

export const RatingSystem = ({ movieId, initialRating = 0 }: RatingSystemProps) => {
  const [userRating, setUserRating] = useState(initialRating);
  const [hoverRating, setHoverRating] = useState(0);

  const handleRating = (rating: number) => {
    setUserRating(rating);
    // TODO: Sauvegarder en base de données via Supabase
    console.log(`Rating ${rating} for movie ${movieId}`);
  };

  return (
    <div className="flex flex-col items-center gap-4 p-4 bg-card rounded-lg">
      <h4 className="font-semibold text-center">Votre note</h4>
      <div className="flex gap-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <Button
            key={star}
            variant="ghost"
            size="icon"
            className="p-0 w-8 h-8"
            onMouseEnter={() => setHoverRating(star)}
            onMouseLeave={() => setHoverRating(0)}
            onClick={() => handleRating(star)}
          >
            <Star
              className={`h-6 w-6 ${
                star <= (hoverRating || userRating)
                  ? 'text-yellow-400 fill-current'
                  : 'text-muted-foreground'
              }`}
            />
          </Button>
        ))}
      </div>
      {userRating > 0 && (
        <p className="text-sm text-muted-foreground">
          Vous avez noté ce film {userRating}/5
        </p>
      )}
    </div>
  );
};