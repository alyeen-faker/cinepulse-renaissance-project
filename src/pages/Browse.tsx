import { useState, useEffect } from "react";
import { Navigation } from "@/components/Navigation";
import { MovieCard } from "@/components/MovieCard";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Search, Filter } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import { useNavigate } from "react-router-dom";

interface Film {
  id: string;
  titre: string;
  description: string;
  categorie: string;
  image_url: string;
}

export default function Browse() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedGenre, setSelectedGenre] = useState("all");
  const [films, setFilms] = useState<Film[]>([]);
  const [loading, setLoading] = useState(true);
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/auth");
      return;
    }
    
    fetchFilms();
  }, [isAuthenticated, navigate]);

  const fetchFilms = async () => {
    try {
      const { data, error } = await supabase
        .from("films")
        .select("*");
      
      if (error) throw error;
      setFilms(data || []);
    } catch (error) {
      console.error("Erreur lors du chargement des films:", error);
    } finally {
      setLoading(false);
    }
  };

  const filteredMovies = films.filter(film => {
    const matchesSearch = film.titre.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesGenre = selectedGenre === "all" || film.categorie === selectedGenre;
    return matchesSearch && matchesGenre;
  });

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navigation />
      
      <div className="container mx-auto px-4 py-24 space-y-8">
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-4">Catalogue NYORA</h1>
          <p className="text-muted-foreground text-lg">
            Découvrez notre collection de films et séries
          </p>
        </div>

        {/* Search and Filter */}
        <div className="max-w-2xl mx-auto space-y-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Rechercher un film..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
          
          <div className="flex items-center gap-4">
            <Filter className="h-4 w-4" />
            <Select value={selectedGenre} onValueChange={setSelectedGenre}>
              <SelectTrigger className="w-48">
                <SelectValue placeholder="Tous les genres" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Tous les genres</SelectItem>
                <SelectItem value="Action">Action</SelectItem>
                <SelectItem value="Sci-Fi">Science-Fiction</SelectItem>
                <SelectItem value="Crime">Crime</SelectItem>
                <SelectItem value="Drame">Drame</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Results */}
        {loading ? (
          <div className="text-center py-8">Chargement des films...</div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
            {filteredMovies.map((film) => (
              <MovieCard
                key={film.id}
                id={film.id}
                title={film.titre}
                image={film.image_url}
                rating={8.5} // Default rating for now
                type="Film"
                releaseDate="2024"
                description={film.description}
              />
            ))}
          </div>
        )}

        {!loading && filteredMovies.length === 0 && (
          <div className="text-center py-12">
            <p className="text-muted-foreground">Aucun film trouvé pour votre recherche.</p>
          </div>
        )}
      </div>
      
      <Footer />
    </div>
  );
}