import { Button } from "./ui/button";
import { ContentSection } from "./ContentSection";

const genres = [
  "Action",
  "Aventure", 
  "Animation",
  "Comédie",
  "Crime",
  "Documentaire",
  "Drame",
  "Familial",
  "Fantastique",
  "Histoire",
  "Horreur",
  "Science-fiction"
];

export const GenreSection = () => (
  <ContentSection title="Parcourir par genre">
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
      {genres.map((genre) => (
        <Button
          key={genre}
          variant="genre"
          size="genre"
          className="text-center font-medium text-sm"
          asChild
        >
          <a href={`/genre/${genre.toLowerCase()}`}>
            {genre}
          </a>
        </Button>
      ))}
    </div>
  </ContentSection>
);