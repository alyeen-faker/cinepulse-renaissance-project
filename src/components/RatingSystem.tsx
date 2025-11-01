import { useState, useEffect } from "react";
import { Star } from "lucide-react";
import { Button } from "./ui/button";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import { toast } from "./ui/sonner";

interface RatingSystemProps {
  movieId: string;
  initialRating?: number;
}

export const RatingSystem = ({ movieId, initialRating = 0 }: RatingSystemProps) => {
  const [userRating, setUserRating] = useState(initialRating);
  const [hoverRating, setHoverRating] = useState(0);
  const { user } = useAuth();

  useEffect(() => {
    if (user) {
      fetchUserRating();
    }
  }, [user, movieId]);

  const fetchUserRating = async () => {
    if (!user) return;

    try {
      const { data, error } = await supabase
        .from("user_ratings")
        .select("rating")
        .eq("user_id", user.id)
        .eq("film_id", movieId)
        .maybeSingle();

      if (error) throw error;
      if (data) {
        setUserRating(data.rating);
      }
    } catch (error) {
      console.error("Erreur lors du chargement de la note:", error);
    }
  };

  const handleRating = async (rating: number) => {
    if (!user) {
      toast.error("Vous devez être connecté pour noter");
      return;
    }

    setUserRating(rating);

    try {
      const { error } = await supabase
        .from("user_ratings")
        .upsert({
          user_id: user.id,
          film_id: movieId,
          rating: rating,
        }, {
          onConflict: "user_id,film_id"
        });

      if (error) throw error;
      toast.success(`Film noté ${rating}/5`);
    } catch (error) {
      console.error("Erreur lors de la sauvegarde de la note:", error);
      toast.error("Erreur lors de la sauvegarde de la note");
    }
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
