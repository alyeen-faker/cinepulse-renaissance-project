import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { Play, Download, Heart, Star, Plus, Share } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent } from "@/components/ui/card";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { VideoPlayer } from "@/components/VideoPlayer";
import { RatingSystem } from "@/components/RatingSystem";
import { CommentSection } from "@/components/CommentSection";

// Mock data - à remplacer par des données réelles depuis Supabase
const movieData = {
  id: "1",
  title: "Everything Everywhere All at Once",
  originalTitle: "Everything Everywhere All at Once",
  releaseDate: "2022-03-24",
  duration: "139 min",
  rating: 8.1,
  userRating: 0,
  synopsis: "Une blanchisseuse chinoise-américaine est entraînée dans une aventure folle où elle seule peut sauver l'univers en explorant d'autres univers où elle aurait pu mener des vies très différentes.",
  genres: ["Science-fiction", "Action", "Comédie", "Drame"],
  cast: ["Michelle Yeoh", "Stephanie Hsu", "Ke Huy Quan", "Jamie Lee Curtis"],
  director: "Daniels",
  country: "États-Unis",
  language: "Anglais, Mandarin",
  poster: "https://image.tmdb.org/t/p/w1920_and_h800_multi_faces/ss0Os3uWJfQAENILHZUdX8Tt1OC.jpg",
  backdrop: "https://image.tmdb.org/t/p/w1920_and_h800_multi_faces/ss0Os3uWJfQAENILHZUdX8Tt1OC.jpg",
  trailer: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
  available: true,
  downloadable: true,
  subtitles: ["Français", "Anglais", "Espagnol"]
};

export default function MovieDetail() {
  const { id } = useParams();
  const [isWatchlisted, setIsWatchlisted] = useState(false);
  const [showPlayer, setShowPlayer] = useState(false);

  const handleWatchlist = () => {
    setIsWatchlisted(!isWatchlisted);
    // TODO: Intégrer avec Supabase pour sauvegarder en base
  };

  const handleDownload = () => {
    // TODO: Intégrer le système de téléchargement légal
    console.log("Téléchargement initié");
  };

  if (showPlayer) {
    return <VideoPlayer movieData={movieData} onClose={() => setShowPlayer(false)} />;
  }

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      {/* Hero Section */}
      <div 
        className="relative h-screen flex items-end pb-20"
        style={{
          backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.8)), url('${movieData.backdrop}')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        <div className="container mx-auto px-4">
          <div className="max-w-3xl">
            <h1 className="text-5xl md:text-7xl font-bold mb-4 text-foreground">
              {movieData.title}
            </h1>
            <div className="flex items-center gap-4 mb-6">
              <div className="flex items-center">
                <Star className="h-5 w-5 text-yellow-400 mr-1 fill-current" />
                <span className="font-semibold">{movieData.rating}</span>
              </div>
              <span>{movieData.duration}</span>
              <span>{movieData.releaseDate.split('-')[0]}</span>
              <div className="flex gap-2">
                {movieData.genres.slice(0, 3).map((genre) => (
                  <Badge key={genre} variant="secondary" className="text-xs">
                    {genre}
                  </Badge>
                ))}
              </div>
            </div>
            
            <p className="text-xl mb-8 text-muted-foreground max-w-2xl">
              {movieData.synopsis}
            </p>
            
            <div className="flex flex-wrap gap-4">
              <Button 
                variant="play" 
                size="play" 
                onClick={() => setShowPlayer(true)}
                className="font-semibold"
              >
                <Play className="h-5 w-5 mr-2 fill-current" />
                Regarder maintenant
              </Button>
              
              <Button 
                variant="transparent" 
                size="play" 
                onClick={handleDownload}
                className="font-semibold"
              >
                <Download className="h-5 w-5 mr-2" />
                Télécharger
              </Button>
              
              <Button 
                variant="ghost" 
                size="play" 
                onClick={handleWatchlist}
                className={`font-semibold ${isWatchlisted ? 'text-primary' : ''}`}
              >
                {isWatchlisted ? <Heart className="h-5 w-5 mr-2 fill-current" /> : <Plus className="h-5 w-5 mr-2" />}
                {isWatchlisted ? 'Dans ma liste' : 'Ajouter à ma liste'}
              </Button>
              
              <Button variant="ghost" size="play" className="font-semibold">
                <Share className="h-5 w-5 mr-2" />
                Partager
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Content Tabs */}
      <div className="container mx-auto px-4 py-12">
        <Tabs defaultValue="details" className="w-full">
          <TabsList className="mb-8">
            <TabsTrigger value="details">Détails</TabsTrigger>
            <TabsTrigger value="cast">Distribution</TabsTrigger>
            <TabsTrigger value="reviews">Avis</TabsTrigger>
            <TabsTrigger value="similar">Similaires</TabsTrigger>
          </TabsList>

          <TabsContent value="details" className="space-y-8">
            <div className="grid md:grid-cols-3 gap-8">
              <div className="md:col-span-2">
                <h3 className="text-2xl font-bold mb-4">Synopsis</h3>
                <p className="text-muted-foreground leading-relaxed mb-6">
                  {movieData.synopsis}
                </p>
                
                <div className="grid sm:grid-cols-2 gap-4">
                  <Card>
                    <CardContent className="p-4">
                      <h4 className="font-semibold mb-2">Réalisateur</h4>
                      <p className="text-muted-foreground">{movieData.director}</p>
                    </CardContent>
                  </Card>
                  
                  <Card>
                    <CardContent className="p-4">
                      <h4 className="font-semibold mb-2">Pays</h4>
                      <p className="text-muted-foreground">{movieData.country}</p>
                    </CardContent>
                  </Card>
                  
                  <Card>
                    <CardContent className="p-4">
                      <h4 className="font-semibold mb-2">Langue</h4>
                      <p className="text-muted-foreground">{movieData.language}</p>
                    </CardContent>
                  </Card>
                  
                  <Card>
                    <CardContent className="p-4">
                      <h4 className="font-semibold mb-2">Sous-titres</h4>
                      <p className="text-muted-foreground">{movieData.subtitles.join(", ")}</p>
                    </CardContent>
                  </Card>
                </div>
              </div>
              
              <div>
                <img 
                  src={movieData.poster} 
                  alt={movieData.title}
                  className="w-full rounded-lg shadow-card mb-4"
                />
                <RatingSystem movieId={movieData.id} initialRating={movieData.userRating} />
              </div>
            </div>
          </TabsContent>

          <TabsContent value="cast">
            <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {movieData.cast.map((actor, index) => (
                <Card key={index}>
                  <CardContent className="p-4 text-center">
                    <div className="w-16 h-16 bg-muted rounded-full mx-auto mb-3"></div>
                    <h4 className="font-semibold">{actor}</h4>
                    <p className="text-muted-foreground text-sm">Acteur</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="reviews">
            <CommentSection movieId={movieData.id} />
          </TabsContent>

          <TabsContent value="similar">
            <div className="text-center py-12">
              <p className="text-muted-foreground">Contenu similaire à venir...</p>
            </div>
          </TabsContent>
        </Tabs>
      </div>

      <Footer />
    </div>
  );
}