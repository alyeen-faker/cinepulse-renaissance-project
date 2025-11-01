/*
  # Schéma complet pour NYORA - Plateforme de streaming

  ## Tables créées
  
  ### 1. films
  - `id` (uuid, primary key)
  - `titre` (text, required)
  - `description` (text)
  - `categorie` (text)
  - `image_url` (text)
  - `video_url` (text)
  - `duree` (integer, minutes)
  - `annee` (integer)
  - `note_moyenne` (numeric)
  - `type` (text: Film ou Série)
  - `saisons` (text, pour les séries)
  - `date_sortie` (date)
  - `created_at` (timestamptz)
  - `updated_at` (timestamptz)
  
  ### 2. user_watchlist
  - `id` (uuid, primary key)
  - `user_id` (uuid, foreign key to auth.users)
  - `film_id` (uuid, foreign key to films)
  - `created_at` (timestamptz)
  
  ### 3. user_ratings
  - `id` (uuid, primary key)
  - `user_id` (uuid, foreign key to auth.users)
  - `film_id` (uuid, foreign key to films)
  - `rating` (integer, 1-5)
  - `created_at` (timestamptz)
  - `updated_at` (timestamptz)
  
  ### 4. user_comments
  - `id` (uuid, primary key)
  - `user_id` (uuid, foreign key to auth.users)
  - `film_id` (uuid, foreign key to films)
  - `comment` (text)
  - `likes` (integer)
  - `created_at` (timestamptz)
  - `updated_at` (timestamptz)
  
  ### 5. user_downloads
  - `id` (uuid, primary key)
  - `user_id` (uuid, foreign key to auth.users)
  - `film_id` (uuid, foreign key to films)
  - `download_date` (timestamptz)
  - `file_size` (text)
  
  ### 6. user_watch_history
  - `id` (uuid, primary key)
  - `user_id` (uuid, foreign key to auth.users)
  - `film_id` (uuid, foreign key to films)
  - `watched_at` (timestamptz)
  - `progress` (integer, percentage)
  
  ### 7. user_profiles
  - `id` (uuid, primary key, foreign key to auth.users)
  - `email` (text)
  - `nom` (text)
  - `avatar_url` (text)
  - `date_inscription` (timestamptz)
  - `abonnement` (text)
  - `minutes_regardees` (integer)
  - `created_at` (timestamptz)
  - `updated_at` (timestamptz)

  ## Sécurité
  - RLS activé sur toutes les tables
  - Politiques d'accès restrictives par utilisateur
  - Les films sont visibles par tous
  - Les données utilisateur sont privées
*/

-- Table films
CREATE TABLE IF NOT EXISTS public.films (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  titre text NOT NULL,
  description text,
  categorie text,
  image_url text,
  video_url text,
  duree integer,
  annee integer,
  note_moyenne numeric(3,1) DEFAULT 0,
  type text DEFAULT 'Film',
  saisons text,
  date_sortie date,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE public.films ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view films"
  ON public.films
  FOR SELECT
  USING (true);

CREATE POLICY "Authenticated users can insert films"
  ON public.films
  FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE POLICY "Authenticated users can update films"
  ON public.films
  FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

-- Table user_profiles
CREATE TABLE IF NOT EXISTS public.user_profiles (
  id uuid PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email text,
  nom text,
  avatar_url text,
  date_inscription timestamptz DEFAULT now(),
  abonnement text DEFAULT 'Premium',
  minutes_regardees integer DEFAULT 0,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE public.user_profiles ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own profile"
  ON public.user_profiles
  FOR SELECT
  TO authenticated
  USING (auth.uid() = id);

CREATE POLICY "Users can update own profile"
  ON public.user_profiles
  FOR UPDATE
  TO authenticated
  USING (auth.uid() = id)
  WITH CHECK (auth.uid() = id);

CREATE POLICY "Users can insert own profile"
  ON public.user_profiles
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = id);

-- Table user_watchlist
CREATE TABLE IF NOT EXISTS public.user_watchlist (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  film_id uuid NOT NULL REFERENCES public.films(id) ON DELETE CASCADE,
  created_at timestamptz DEFAULT now(),
  UNIQUE(user_id, film_id)
);

ALTER TABLE public.user_watchlist ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own watchlist"
  ON public.user_watchlist
  FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can add to own watchlist"
  ON public.user_watchlist
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can remove from own watchlist"
  ON public.user_watchlist
  FOR DELETE
  TO authenticated
  USING (auth.uid() = user_id);

-- Table user_ratings
CREATE TABLE IF NOT EXISTS public.user_ratings (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  film_id uuid NOT NULL REFERENCES public.films(id) ON DELETE CASCADE,
  rating integer NOT NULL CHECK (rating >= 1 AND rating <= 5),
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now(),
  UNIQUE(user_id, film_id)
);

ALTER TABLE public.user_ratings ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own ratings"
  ON public.user_ratings
  FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Anyone can view all ratings"
  ON public.user_ratings
  FOR SELECT
  USING (true);

CREATE POLICY "Users can insert own ratings"
  ON public.user_ratings
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own ratings"
  ON public.user_ratings
  FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

-- Table user_comments
CREATE TABLE IF NOT EXISTS public.user_comments (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  film_id uuid NOT NULL REFERENCES public.films(id) ON DELETE CASCADE,
  comment text NOT NULL,
  rating integer CHECK (rating >= 1 AND rating <= 5),
  likes integer DEFAULT 0,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE public.user_comments ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view comments"
  ON public.user_comments
  FOR SELECT
  USING (true);

CREATE POLICY "Authenticated users can insert comments"
  ON public.user_comments
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own comments"
  ON public.user_comments
  FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can delete own comments"
  ON public.user_comments
  FOR DELETE
  TO authenticated
  USING (auth.uid() = user_id);

-- Table user_downloads
CREATE TABLE IF NOT EXISTS public.user_downloads (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  film_id uuid NOT NULL REFERENCES public.films(id) ON DELETE CASCADE,
  download_date timestamptz DEFAULT now(),
  file_size text,
  UNIQUE(user_id, film_id)
);

ALTER TABLE public.user_downloads ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own downloads"
  ON public.user_downloads
  FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can add own downloads"
  ON public.user_downloads
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can remove own downloads"
  ON public.user_downloads
  FOR DELETE
  TO authenticated
  USING (auth.uid() = user_id);

-- Table user_watch_history
CREATE TABLE IF NOT EXISTS public.user_watch_history (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  film_id uuid NOT NULL REFERENCES public.films(id) ON DELETE CASCADE,
  watched_at timestamptz DEFAULT now(),
  progress integer DEFAULT 0 CHECK (progress >= 0 AND progress <= 100)
);

ALTER TABLE public.user_watch_history ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own history"
  ON public.user_watch_history
  FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can add to own history"
  ON public.user_watch_history
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

-- Table comment_likes
CREATE TABLE IF NOT EXISTS public.comment_likes (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  comment_id uuid NOT NULL REFERENCES public.user_comments(id) ON DELETE CASCADE,
  created_at timestamptz DEFAULT now(),
  UNIQUE(user_id, comment_id)
);

ALTER TABLE public.comment_likes ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own likes"
  ON public.comment_likes
  FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can add own likes"
  ON public.comment_likes
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can remove own likes"
  ON public.comment_likes
  FOR DELETE
  TO authenticated
  USING (auth.uid() = user_id);

-- Fonction pour mettre à jour updated_at
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Triggers pour updated_at
CREATE TRIGGER update_films_updated_at
  BEFORE UPDATE ON public.films
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_user_profiles_updated_at
  BEFORE UPDATE ON public.user_profiles
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_user_ratings_updated_at
  BEFORE UPDATE ON public.user_ratings
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_user_comments_updated_at
  BEFORE UPDATE ON public.user_comments
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

-- Fonction pour mettre à jour la note moyenne d'un film
CREATE OR REPLACE FUNCTION public.update_film_average_rating()
RETURNS TRIGGER AS $$
BEGIN
  UPDATE public.films
  SET note_moyenne = (
    SELECT ROUND(AVG(rating)::numeric, 1)
    FROM public.user_ratings
    WHERE film_id = COALESCE(NEW.film_id, OLD.film_id)
  )
  WHERE id = COALESCE(NEW.film_id, OLD.film_id);
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Trigger pour mettre à jour la note moyenne
CREATE TRIGGER update_film_rating_on_insert
  AFTER INSERT ON public.user_ratings
  FOR EACH ROW
  EXECUTE FUNCTION public.update_film_average_rating();

CREATE TRIGGER update_film_rating_on_update
  AFTER UPDATE ON public.user_ratings
  FOR EACH ROW
  EXECUTE FUNCTION public.update_film_average_rating();

CREATE TRIGGER update_film_rating_on_delete
  AFTER DELETE ON public.user_ratings
  FOR EACH ROW
  EXECUTE FUNCTION public.update_film_average_rating();

-- Fonction pour mettre à jour les likes d'un commentaire
CREATE OR REPLACE FUNCTION public.update_comment_likes()
RETURNS TRIGGER AS $$
BEGIN
  UPDATE public.user_comments
  SET likes = (
    SELECT COUNT(*)
    FROM public.comment_likes
    WHERE comment_id = COALESCE(NEW.comment_id, OLD.comment_id)
  )
  WHERE id = COALESCE(NEW.comment_id, OLD.comment_id);
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Trigger pour mettre à jour les likes
CREATE TRIGGER update_comment_likes_on_insert
  AFTER INSERT ON public.comment_likes
  FOR EACH ROW
  EXECUTE FUNCTION public.update_comment_likes();

CREATE TRIGGER update_comment_likes_on_delete
  AFTER DELETE ON public.comment_likes
  FOR EACH ROW
  EXECUTE FUNCTION public.update_comment_likes();

-- Insérer des films de démonstration
INSERT INTO public.films (titre, description, categorie, image_url, video_url, duree, annee, type, date_sortie, note_moyenne) VALUES
('Everything Everywhere All at Once', 'Une femme se retrouve plongée dans un multivers infini où elle doit explorer différentes versions d''elle-même pour sauver le monde.', 'Sci-Fi', 'https://image.tmdb.org/t/p/w500/ss0Os3uWJfQAENILHZUdX8Tt1OC.jpg', 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4', 139, 2022, 'Film', '2022-03-24', 8.1),
('Inception', 'Un voleur qui s''introduit dans les rêves des gens se voit confier la mission inverse : implanter une idée dans l''esprit de quelqu''un.', 'Sci-Fi', 'https://image.tmdb.org/t/p/w500/8ZTVqvKDQ8emSGUEMjsS4yHAwrp.jpg', 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4', 148, 2010, 'Film', '2010-07-15', 8.8),
('The Dark Knight', 'Batman affronte le Joker, un criminel anarchiste qui veut plonger Gotham City dans le chaos.', 'Action', 'https://image.tmdb.org/t/p/w500/qJ2tW6WMUDux911r6m7haRef0WH.jpg', 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4', 152, 2008, 'Film', '2008-07-18', 9.0),
('Flash', 'Barry Allen, scientifique de la police, acquiert une vitesse surhumaine après avoir été frappé par la foudre.', 'Action', 'https://image.tmdb.org/t/p/w500/gFkHcIh7iE5G0oVOgpmY8ONQjhl.jpg', 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4', 43, 2014, 'Série', '2014-10-07', 7.8),
('Loki', 'Après avoir volé le Tesseract, Loki est capturé par la TVA et doit aider à réparer la timeline.', 'Sci-Fi', 'https://image.tmdb.org/t/p/w500/q3jHCb4dMfYF6ojikKuHd6LscxC.jpg', 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4', 50, 2021, 'Série', '2021-06-09', 8.2),
('Supernatural', 'Deux frères chassent des créatures surnaturelles à travers les États-Unis.', 'Drame', 'https://image.tmdb.org/t/p/w500/nVRyd8hlg0ZLxBn9RaI7mUMQLnz.jpg', 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4', 44, 2005, 'Série', '2005-09-13', 8.4),
('MINDHUNTER', 'Deux agents du FBI développent des techniques de profilage en interviewant des tueurs en série.', 'Crime', 'https://image.tmdb.org/t/p/w500/a906PH7CDmSOdS7kmnAgdWk5mhv.jpg', 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4', 60, 2017, 'Série', '2017-10-13', 8.6),
('Donnie Darko', 'Un adolescent troublé reçoit la visite d''un lapin géant qui prédit la fin du monde.', 'Sci-Fi', 'https://image.tmdb.org/t/p/w500/msCHK5Kh1YbdZ0zPJ2nzPUhhSN9.jpg', 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4', 113, 2001, 'Film', '2001-01-19', 8.0),
('Tenet', 'Un agent secret manipule le temps pour empêcher une guerre mondiale.', 'Action', 'https://image.tmdb.org/t/p/w500/yY76zq9XSuJ4nWyPDuwkdV7Wt0c.jpg', 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4', 150, 2020, 'Film', '2020-08-22', 7.4),
('Avengers', 'Les plus grands héros de la Terre s''unissent pour affronter une menace extraterrestre.', 'Action', 'https://image.tmdb.org/t/p/w500/9BBTo63ANSmhC4e6r62OJFuK2GL.jpg', 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4', 143, 2012, 'Film', '2012-04-25', 8.0)
ON CONFLICT DO NOTHING;