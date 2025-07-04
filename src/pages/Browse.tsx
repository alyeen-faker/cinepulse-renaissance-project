import { useState } from "react";
import { Search, Filter, Star, Play } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { MovieCard } from "@/components/MovieCard";

// Mock data - à remplacer par des données réelles depuis Supabase
const genres = ["Tous", "Action", "Aventure", "Animation", "Comédie", "Crime", "Documentaire", "Drame", "Familial", "Fantastique", "Histoire", "Horreur", "Science-fiction"];
const years = ["Toutes", "2024", "2023", "2022", "2021", "2020", "2019", "2018"];
const types = ["Tous", "Films", "Séries"];

const mockMovies = [
  {
    title: "Everything Everywhere All at Once",
    image: "https://image.tmdb.org/t/p/w1920_and_h800_multi_faces/ss0Os3uWJfQAENILHZUdX8Tt1OC.jpg",
    rating: 8.1,
    type: "Film" as const,
    releaseDate: "2022-03-24",
    genre: "Science-fiction"
  },
  {
    title: "Loki",
    image: "https://image.tmdb.org/t/p/w1920_and_h800_multi_faces/q3jHCb4dMfYF6ojikKuHd6LscxC.jpg",
    rating: 8.2,
    type: "Série" as const,
    seasons: "2 saisons",
    releaseDate: "2021-06-09",
    genre: "Action"
  },
  {
    title: "Inception",
    image: "https://image.tmdb.org/t/p/w1920_and_h800_multi_faces/8ZTVqvKDQ8emSGUEMjsS4yHAwrp.jpg",
    rating: 8.8,
    type: "Film" as const,
    releaseDate: "2010-07-15",
    genre: "Science-fiction"
  },
  {
    title: "The Dark Knight",
    image: "https://image.tmdb.org/t/p/w1920_and_h800_multi_faces/qJ2tW6WMUDux911r6m7haRef0WH.jpg",
    rating: 9.0,
    type: "Film" as const,
    releaseDate: "2008-07-18",
    genre: "Action"
  },
  {
    title: "Breaking Bad",
    image: "https://image.tmdb.org/t/p/w1920_and_h800_multi_faces/ggFHVNu6YYI5L9pCfOacjizRGt.jpg",
    rating: 9.5,
    type: "Série" as const,
    seasons: "5 saisons",
    releaseDate: "2008-01-20",
    genre: "Crime"
  },
  {
    title: "Spirited Away",
    image: "https://image.tmdb.org/t/p/w1920_and_h800_multi_faces/39wmItIWsg5sZMyRUHLkWBcuVCM.jpg",
    rating: 9.2,
    type: "Film" as const,
    releaseDate: "2001-07-20",
    genre: "Animation"
  }
];

export default function Browse() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedGenre, setSelectedGenre] = useState("Tous");
  const [selectedYear, setSelectedYear] = useState("Toutes");
  const [selectedType, setSelectedType] = useState("Tous");
  const [sortBy, setSortBy] = useState("rating");

  const filteredMovies = mockMovies
    .filter(movie => {
      const matchesSearch = movie.title.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesGenre = selectedGenre === "Tous" || movie.genre === selectedGenre;
      const matchesYear = selectedYear === "Toutes" || movie.releaseDate.startsWith(selectedYear);
      const matchesType = selectedType === "Tous" || 
        (selectedType === "Films" && movie.type === "Film") ||
        (selectedType === "Séries" && movie.type === "Série");
      
      return matchesSearch && matchesGenre && matchesYear && matchesType;
    })
    .sort((a, b) => {
      switch (sortBy) {
        case "rating":
          return b.rating - a.rating;
        case "year":
          return new Date(b.releaseDate).getTime() - new Date(a.releaseDate).getTime();
        case "title":
          return a.title.localeCompare(b.title);
        default:
          return 0;
      }
    });

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <div className="container mx-auto px-4 py-24">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-4">Parcourir le catalogue</h1>
          <p className="text-muted-foreground">
            Découvrez notre collection complète de films et séries
          </p>
        </div>

        {/* Search and Filters */}
        <Card className="mb-8">
          <CardContent className="p-6">
            <div className="flex flex-col gap-4">
              {/* Search Bar */}
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Rechercher un film ou une série..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>

              {/* Filters */}
              <div className="flex flex-wrap gap-4">
                <div className="flex items-center gap-2">
                  <Filter className="h-4 w-4" />
                  <span className="text-sm font-medium">Filtres:</span>
                </div>

                <Select value={selectedGenre} onValueChange={setSelectedGenre}>
                  <SelectTrigger className="w-40">
                    <SelectValue placeholder="Genre" />
                  </SelectTrigger>
                  <SelectContent>
                    {genres.map((genre) => (
                      <SelectItem key={genre} value={genre}>
                        {genre}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>

                <Select value={selectedYear} onValueChange={setSelectedYear}>
                  <SelectTrigger className="w-32">
                    <SelectValue placeholder="Année" />
                  </SelectTrigger>
                  <SelectContent>
                    {years.map((year) => (
                      <SelectItem key={year} value={year}>
                        {year}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>

                <Select value={selectedType} onValueChange={setSelectedType}>
                  <SelectTrigger className="w-32">
                    <SelectValue placeholder="Type" />
                  </SelectTrigger>
                  <SelectContent>
                    {types.map((type) => (
                      <SelectItem key={type} value={type}>
                        {type}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>

                <Select value={sortBy} onValueChange={setSortBy}>
                  <SelectTrigger className="w-40">
                    <SelectValue placeholder="Trier par" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="rating">Note</SelectItem>
                    <SelectItem value="year">Année</SelectItem>
                    <SelectItem value="title">Titre</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Active Filters */}
              {(selectedGenre !== "Tous" || selectedYear !== "Toutes" || selectedType !== "Tous" || searchQuery) && (
                <div className="flex flex-wrap gap-2">
                  <span className="text-sm font-medium">Filtres actifs:</span>
                  {searchQuery && (
                    <Badge variant="secondary" className="gap-1">
                      Recherche: "{searchQuery}"
                      <button onClick={() => setSearchQuery("")} className="ml-1 hover:text-destructive">×</button>
                    </Badge>
                  )}
                  {selectedGenre !== "Tous" && (
                    <Badge variant="secondary" className="gap-1">
                      {selectedGenre}
                      <button onClick={() => setSelectedGenre("Tous")} className="ml-1 hover:text-destructive">×</button>
                    </Badge>
                  )}
                  {selectedYear !== "Toutes" && (
                    <Badge variant="secondary" className="gap-1">
                      {selectedYear}
                      <button onClick={() => setSelectedYear("Toutes")} className="ml-1 hover:text-destructive">×</button>
                    </Badge>
                  )}
                  {selectedType !== "Tous" && (
                    <Badge variant="secondary" className="gap-1">
                      {selectedType}
                      <button onClick={() => setSelectedType("Tous")} className="ml-1 hover:text-destructive">×</button>
                    </Badge>
                  )}
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Results */}
        <div className="mb-6">
          <p className="text-muted-foreground">
            {filteredMovies.length} résultat{filteredMovies.length > 1 ? 's' : ''} trouvé{filteredMovies.length > 1 ? 's' : ''}
          </p>
        </div>

        {/* Movies Grid */}
        {filteredMovies.length > 0 ? (
          <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
            {filteredMovies.map((movie, index) => (
              <MovieCard key={index} {...movie} />
            ))}
          </div>
        ) : (
          <Card>
            <CardContent className="p-12 text-center">
              <Search className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">Aucun résultat trouvé</h3>
              <p className="text-muted-foreground mb-4">
                Essayez de modifier vos critères de recherche
              </p>
              <Button 
                variant="outline" 
                onClick={() => {
                  setSearchQuery("");
                  setSelectedGenre("Tous");
                  setSelectedYear("Toutes");
                  setSelectedType("Tous");
                }}
              >
                Réinitialiser les filtres
              </Button>
            </CardContent>
          </Card>
        )}
      </div>

      <Footer />
    </div>
  );
}