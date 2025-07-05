import { ChevronRight } from "lucide-react";
import { MovieCard } from "./MovieCard";

interface ContentSectionProps {
  title: string;
  showViewMore?: boolean;
  children?: React.ReactNode;
}

export const ContentSection = ({ title, showViewMore = false, children }: ContentSectionProps) => {
  return (
    <section className="mb-12">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold flex items-center">
          <span className="bg-primary w-1 h-6 mr-3 rounded-full"></span>
          {title}
        </h2>
        {showViewMore && (
          <a
            href="#"
            className="text-primary hover:text-primary-hover text-sm flex items-center transition-colors duration-200 group"
          >
            Voir plus
            <ChevronRight className="ml-1 w-4 h-4 transition-transform group-hover:translate-x-1" />
          </a>
        )}
      </div>
      {children}
    </section>
  );
};

// Featured content data
const featuredContent = [
  {
    title: "Flash",
    image: "https://image.tmdb.org/t/p/w500/gFkHcIh7iE5G0oVOgpmY8ONQjhl.jpg",
    rating: 7.8,
    type: "Série" as const,
    seasons: "9 saisons",
    releaseDate: "7 oct. 2014",
    description: "Jeune expert de la police scientifique de Central City, Barry Allen se retrouve doté d'une vitesse extraordinaire après avoir été frappé par la foudre. Sous le costume de Flash, il utilise ses nouveaux pouvoirs pour combattre le crime."
  },
  {
    title: "Loki",
    image: "https://image.tmdb.org/t/p/w500/q3jHCb4dMfYF6ojikKuHd6LscxC.jpg",
    rating: 8.2,
    type: "Série" as const,
    seasons: "2 saisons",
    releaseDate: "9 juin 2021",
    description: "La nouvelle série Disney+ Original des studios Marvel, Loki, se déroule après les événements relatés dans «Avengers: Endgame». Elle met en scène le dieu de la malice juste après qu'il s'est affranchi de son frère Thor."
  },
  {
    title: "Supernatural",
    image: "https://image.tmdb.org/t/p/w500/nVRyd8hlg0ZLxBn9RaI7mUMQLnz.jpg",
    rating: 8.4,
    type: "Série" as const,
    seasons: "15 saisons",
    releaseDate: "13 sept. 2005",
    description: "Deux frères, Sam et Dean Winchester, chasseurs de créatures surnaturelles, sillonnent les États-Unis à bord d'une Chevrolet Impala noire de 1967 et enquêtent sur des phénomènes paranormaux."
  },
  {
    title: "MINDHUNTER",
    image: "https://image.tmdb.org/t/p/w500/a906PH7CDmSOdS7kmnAgdWk5mhv.jpg",
    rating: 8.6,
    type: "Série" as const,
    seasons: "2 saisons",
    releaseDate: "13 oct. 2017",
    description: "Un agent de l'unité d'élite du FBI dédiée aux crimes en série développe des techniques de profilage alors qu'il poursuit de notoires violeurs et assassins."
  }
];

const newReleases = [
  {
    title: "Donnie Darko",
    image: "https://image.tmdb.org/t/p/w500/msCHK5Kh1YbdZ0zPJ2nzPUhhSN9.jpg",
    rating: 8.0,
    type: "Film" as const,
    releaseDate: "19 janv. 2001"
  },
  {
    title: "Foundation",
    image: "https://image.tmdb.org/t/p/w500/7NNNXo0qG2SqH4JoG7GPvJ2hzes.jpg",
    rating: 7.5,
    type: "Série" as const,
    releaseDate: "23 sept. 2021"
  },
  {
    title: "Le Maître du Haut Château",
    image: "https://image.tmdb.org/t/p/w500/pLio7Lod6YoNMM7ybFVjIJjwIxe.jpg",
    rating: 8.1,
    type: "Série" as const,
    releaseDate: "15 janv. 2015"
  },
  {
    title: "Inception",
    image: "https://image.tmdb.org/t/p/w500/8ZTVqvKDQ8emSGUEMjsS4yHAwrp.jpg",
    rating: 8.8,
    type: "Film" as const,
    releaseDate: "15 juil. 2010"
  },
  {
    title: "Everything Everywhere All at Once",
    image: "https://image.tmdb.org/t/p/w500/ss0Os3uWJfQAENILHZUdX8Tt1OC.jpg",
    rating: 7.8,
    type: "Film" as const,
    releaseDate: "24 mars 2022"
  },
  {
    title: "Tenet",
    image: "https://image.tmdb.org/t/p/w500/yY76zq9XSuJ4nWyPDuwkdV7Wt0c.jpg",
    rating: 7.4,
    type: "Film" as const,
    releaseDate: "22 août 2020"
  }
];

const popularSeries = [
  {
    title: "Rick et Morty",
    image: "https://image.tmdb.org/t/p/w500/Ao5pBFuWY32cVuh6iYjEjZMEscN.jpg",
    rating: 9.2,
    type: "Série" as const,
    releaseDate: "2 déc. 2013"
  },
  {
    title: "Les Simpson",
    image: "https://image.tmdb.org/t/p/w500/pxeqQX4qFQ0cVxPt5SWZENV5BH3.jpg",
    rating: 8.7,
    type: "Série" as const,
    releaseDate: "17 déc. 1989"
  },
  {
    title: "Young Sheldon",
    image: "https://image.tmdb.org/t/p/w500/nlDBlCtorM7nx130wYnfR5ZmyLX.jpg",
    rating: 7.7,
    type: "Série" as const,
    releaseDate: "25 sept. 2017"
  },
  {
    title: "DC's Legends of Tomorrow",
    image: "https://image.tmdb.org/t/p/w500/ccAJBppepLkoYxddLMIb7mOiFsl.jpg",
    rating: 6.8,
    type: "Série" as const,
    releaseDate: "21 janv. 2016"
  },
  {
    title: "Avengers",
    image: "https://image.tmdb.org/t/p/w500/9BBTo63ANSmhC4e6r62OJFuK2GL.jpg",
    rating: 8.0,
    type: "Film" as const,
    releaseDate: "25 avr. 2012"
  },
  {
    title: "Doctor Strange 2",
    image: "https://image.tmdb.org/t/p/w500/iKUwhA4DUxMcNKu5lLSbDFwwilk.jpg",
    rating: 6.9,
    type: "Film" as const,
    releaseDate: "4 mai 2022"
  }
];

export const FeaturedSection = () => (
  <ContentSection title="Contenu vedette">
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {featuredContent.map((item) => (
        <MovieCard key={item.title} {...item} id={`featured-${item.title}`} size="large" />
      ))}
    </div>
  </ContentSection>
);

export const NewReleasesSection = () => (
  <ContentSection title="Nouveautés" showViewMore>
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
      {newReleases.map((item) => (
        <MovieCard key={item.title} {...item} id={`new-${item.title}`} />
      ))}
    </div>
  </ContentSection>
);

export const PopularSeriesSection = () => (
  <ContentSection title="Séries populaires" showViewMore>
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
      {popularSeries.map((item) => (
        <MovieCard key={item.title} {...item} id={`popular-${item.title}`} />
      ))}
    </div>
  </ContentSection>
);