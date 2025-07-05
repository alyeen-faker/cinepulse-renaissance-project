import { useState } from "react";
import { User, Heart, Download, Settings, Star, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { MovieCard } from "@/components/MovieCard";

// Mock data - à remplacer par des données réelles depuis Supabase
const userData = {
  name: "Marie Dubois",
  email: "marie.dubois@email.com",
  joinDate: "Mars 2024",
  avatar: "",
  subscription: "Premium",
  watchedMinutes: 2850
};

const watchlistMovies = [
  {
    title: "Dune: Part Two",
    image: "https://image.tmdb.org/t/p/w1920_and_h800_multi_faces/ss0Os3uWJfQAENILHZUdX8Tt1OC.jpg",
    rating: 8.5,
    type: "Film" as const,
    releaseDate: "2024-03-01"
  },
  {
    title: "The Bear",
    image: "https://image.tmdb.org/t/p/w1920_and_h800_multi_faces/q3jHCb4dMfYF6ojikKuHd6LscxC.jpg",
    rating: 9.1,
    type: "Série" as const,
    seasons: "3 saisons",
    releaseDate: "2022-06-23"
  }
];

const downloadedMovies = [
  {
    title: "Everything Everywhere All at Once",
    image: "https://image.tmdb.org/t/p/w1920_and_h800_multi_faces/ss0Os3uWJfQAENILHZUdX8Tt1OC.jpg",
    rating: 8.1,
    type: "Film" as const,
    releaseDate: "2022-03-24",
    downloadDate: "2024-01-15",
    size: "2.1 GB"
  }
];

export default function Profile() {
  const [activeTab, setActiveTab] = useState("watchlist");

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <div className="container mx-auto px-4 py-24">
        {/* Profile Header */}
        <Card className="mb-8">
          <CardContent className="p-8">
            <div className="flex flex-col md:flex-row items-center gap-6">
              <Avatar className="w-24 h-24">
                <AvatarImage src={userData.avatar} />
                <AvatarFallback className="text-2xl">
                  <User className="h-12 w-12" />
                </AvatarFallback>
              </Avatar>
              
              <div className="flex-1 text-center md:text-left">
                <h1 className="text-3xl font-bold mb-2">{userData.name}</h1>
                <p className="text-muted-foreground mb-4">{userData.email}</p>
                <div className="flex flex-wrap gap-4 justify-center md:justify-start">
                  <div className="flex items-center gap-2">
                    <Clock className="h-4 w-4 text-primary" />
                    <span className="text-sm">{userData.watchedMinutes} min regardées</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Star className="h-4 w-4 text-yellow-400" />
                    <span className="text-sm">Abonnement {userData.subscription}</span>
                  </div>
                </div>
              </div>
              
              <Button variant="outline" className="gap-2">
                <Settings className="h-4 w-4" />
                Paramètres
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Profile Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="mb-8">
            <TabsTrigger value="watchlist" className="gap-2">
              <Heart className="h-4 w-4" />
              Ma liste ({watchlistMovies.length})
            </TabsTrigger>
            <TabsTrigger value="downloads" className="gap-2">
              <Download className="h-4 w-4" />
              Téléchargements ({downloadedMovies.length})
            </TabsTrigger>
            <TabsTrigger value="ratings" className="gap-2">
              <Star className="h-4 w-4" />
              Mes notes
            </TabsTrigger>
            <TabsTrigger value="history" className="gap-2">
              <Clock className="h-4 w-4" />
              Historique
            </TabsTrigger>
          </TabsList>

          <TabsContent value="watchlist">
            <Card>
              <CardHeader>
                <CardTitle>Ma liste de lecture</CardTitle>
              </CardHeader>
              <CardContent>
                {watchlistMovies.length > 0 ? (
                  <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                    {watchlistMovies.map((movie, index) => (
                      <MovieCard key={index} {...movie} id={`watchlist-${index}`} />
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-12">
                    <Heart className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                    <p className="text-muted-foreground">Votre liste est vide</p>
                    <p className="text-sm text-muted-foreground">Ajoutez des films et séries à votre liste</p>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="downloads">
            <Card>
              <CardHeader>
                <CardTitle>Mes téléchargements</CardTitle>
              </CardHeader>
              <CardContent>
                {downloadedMovies.length > 0 ? (
                  <div className="space-y-4">
                    {downloadedMovies.map((movie, index) => (
                      <div key={index} className="flex items-center gap-4 p-4 border rounded-lg">
                        <img 
                          src={movie.image} 
                          alt={movie.title}
                          className="w-16 h-24 object-cover rounded"
                        />
                        <div className="flex-1">
                          <h3 className="font-semibold">{movie.title}</h3>
                          <p className="text-sm text-muted-foreground">
                            Téléchargé le {movie.downloadDate}
                          </p>
                          <p className="text-sm text-muted-foreground">{movie.size}</p>
                        </div>
                        <div className="text-right">
                          <div className="flex items-center gap-1 mb-2">
                            <Star className="h-4 w-4 text-yellow-400 fill-current" />
                            <span className="text-sm">{movie.rating}</span>
                          </div>
                          <Button size="sm" variant="outline">
                            Regarder
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-12">
                    <Download className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                    <p className="text-muted-foreground">Aucun téléchargement</p>
                    <p className="text-sm text-muted-foreground">Téléchargez des contenus pour les regarder hors ligne</p>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="ratings">
            <Card>
              <CardHeader>
                <CardTitle>Mes notes et avis</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center py-12">
                  <Star className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                  <p className="text-muted-foreground">Aucune note pour le moment</p>
                  <p className="text-sm text-muted-foreground">Notez les films et séries que vous regardez</p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="history">
            <Card>
              <CardHeader>
                <CardTitle>Historique de visionnage</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center py-12">
                  <Clock className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                  <p className="text-muted-foreground">Historique vide</p>
                  <p className="text-sm text-muted-foreground">Vos films et séries récemment regardés apparaîtront ici</p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>

      <Footer />
    </div>
  );
}