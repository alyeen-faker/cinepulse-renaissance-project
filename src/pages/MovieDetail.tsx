import { useParams, Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { Navigation } from "@/components/Navigation";
import { VideoPlayer } from "@/components/VideoPlayer";
import { RatingSystem } from "@/components/RatingSystem";
import { CommentSection } from "@/components/CommentSection";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Star, Calendar, Clock, Download, Plus, Play, Share2 } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import { toast } from "@/components/ui/sonner";

interface Film {
  id: string;
  titre: string;
  description: string;
  categorie: string;
  image_url: string;
  video_url: string;
  duree: number;
  annee: number;
  note_moyenne: number;
  type: string;
}

export default function MovieDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { isAuthenticated, user } = useAuth();
  const [film, setFilm] = useState<Film | null>(null);
  const [loading, setLoading] = useState(true);
  const [isInWatchlist, setIsInWatchlist] = useState(false);

  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/auth");
      return;
    }
    
    if (id) {
      fetchFilm(id);
    }
  }, [id, isAuthenticated, navigate]);

  const fetchFilm = async (filmId: string) => {
    try {
      const { data, error } = await supabase
        .from("films")
        .select("*")
        .eq("id", filmId)
        .single();

      if (error) throw error;
      setFilm(data);

      if (user) {
        const { data: watchlist } = await supabase
          .from("user_watchlist")
          .select("id")
          .eq("user_id", user.id)
          .eq("film_id", filmId)
          .maybeSingle();

        setIsInWatchlist(!!watchlist);
      }
    } catch (error) {
      console.error("Erreur lors du chargement du film:", error);
    } finally {
      setLoading(false);
    }
  };

  const toggleWatchlist = async () => {
    if (!user || !film) {
      toast.error("Vous devez être connecté");
      return;
    }

    try {
      if (isInWatchlist) {
        const { error } = await supabase
          .from("user_watchlist")
          .delete()
          .eq("user_id", user.id)
          .eq("film_id", film.id);

        if (error) throw error;
        setIsInWatchlist(false);
        toast.success("Retiré de votre liste");
      } else {
        const { error } = await supabase
          .from("user_watchlist")
          .insert({
            user_id: user.id,
            film_id: film.id,
          });

        if (error) throw error;
        setIsInWatchlist(true);
        toast.success("Ajouté à votre liste");
      }
    } catch (error) {
      console.error("Erreur:", error);
      toast.error("Une erreur est survenue");
    }
  };

  const handleDownload = async () => {
    if (!user || !film) {
      toast.error("Vous devez être connecté");
      return;
    }

    try {
      const { error } = await supabase
        .from("user_downloads")
        .insert({
          user_id: user.id,
          film_id: film.id,
          file_size: "2.1 GB",
        });

      if (error && error.code !== "23505") throw error;
      toast.success("Téléchargement ajouté à votre liste");
    } catch (error) {
      console.error("Erreur:", error);
      toast.error("Une erreur est survenue");
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <Navigation />
        <div className="container mx-auto px-4 py-8 text-center">
          Chargement du film...
        </div>
      </div>
    );
  }

  if (!film) {
    return (
      <div className="min-h-screen bg-background">
        <Navigation />
        <div className="container mx-auto px-4 py-8 text-center">
          <h1 className="text-2xl font-bold mb-4">Film non trouvé</h1>
          <Link to="/browse">
            <Button>Retour au catalogue</Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navigation />
      
      <div className="pt-16">
        {/* Hero Section with Video Player */}
        <div className="relative">
          <VideoPlayer 
            movieData={{
              title: film.titre,
              trailer: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
              subtitles: ["Français", "Anglais"]
            }}
            onClose={() => {}}
          />
        </div>

        {/* Movie Info */}
        <div className="container mx-auto px-4 py-8">
          <div className="grid md:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="md:col-span-2 space-y-6">
              {/* Title and Basic Info */}
              <div>
                <h1 className="text-4xl font-bold mb-4">{film.titre}</h1>
                <div className="flex flex-wrap items-center gap-4 text-muted-foreground mb-4">
                  <div className="flex items-center">
                    <Star className="h-4 w-4 text-yellow-400 mr-1 fill-current" />
                    {film.note_moyenne || 0}/10
                  </div>
                  <div className="flex items-center">
                    <Calendar className="h-4 w-4 mr-1" />
                    {film.annee || 2024}
                  </div>
                  {film.duree && (
                    <div className="flex items-center">
                      <Clock className="h-4 w-4 mr-1" />
                      {film.duree} min
                    </div>
                  )}
                </div>
                
                {/* Genres */}
                <div className="flex flex-wrap gap-2 mb-6">
                  <Badge variant="secondary">{film.categorie}</Badge>
                </div>
              </div>

              {/* Synopsis */}
              <div>
                <h2 className="text-2xl font-semibold mb-4">Synopsis</h2>
                <p className="text-muted-foreground leading-relaxed">
                  {film.description}
                </p>
              </div>

              {/* Comments Section */}
              <CommentSection movieId={film.id} />
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Movie Poster */}
              <div className="aspect-[2/3] overflow-hidden rounded-lg">
                <img
                  src={film.image_url}
                  alt={film.titre}
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Action Buttons */}
              <div className="space-y-3">
                <Button className="w-full" size="lg">
                  <Play className="h-4 w-4 mr-2" />
                  Regarder
                </Button>
                
                <Button variant="outline" className="w-full" onClick={toggleWatchlist}>
                  <Plus className="h-4 w-4 mr-2" />
                  {isInWatchlist ? "Retirer de ma liste" : "Ajouter à ma liste"}
                </Button>

                <Button variant="outline" className="w-full" onClick={handleDownload}>
                  <Download className="h-4 w-4 mr-2" />
                  Télécharger
                </Button>
                
                <Button variant="outline" className="w-full">
                  <Share2 className="h-4 w-4 mr-2" />
                  Partager
                </Button>
              </div>

              {/* Rating System */}
              <RatingSystem movieId={film.id} />
            </div>
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
}