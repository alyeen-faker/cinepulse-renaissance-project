-- Create films table
CREATE TABLE public.films (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  titre TEXT NOT NULL,
  description TEXT,
  categorie TEXT,
  image_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.films ENABLE ROW LEVEL SECURITY;

-- Create policies for films (public read access, authenticated write)
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
USING (true);

-- Create function to update timestamps
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
NEW.updated_at = now();
RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create trigger for automatic timestamp updates
CREATE TRIGGER update_films_updated_at
BEFORE UPDATE ON public.films
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

-- Insert some sample films
INSERT INTO public.films (titre, description, categorie, image_url) VALUES
('Inception', 'Un thriller de science-fiction sur les rêves dans les rêves', 'Sci-Fi', 'https://images.unsplash.com/photo-1489599807595-3e8efc20b3b7?w=800'),
('The Dark Knight', 'Batman affronte le Joker dans cette suite épique', 'Action', 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800'),
('Interstellar', 'Une épopée spatiale sur la survie de l''humanité', 'Sci-Fi', 'https://images.unsplash.com/photo-1536440136628-849c177e76a1?w=800'),
('The Shawshank Redemption', 'L''histoire d''amitié et d''espoir en prison', 'Drame', 'https://images.unsplash.com/photo-1489599807595-3e8efc20b3b7?w=800'),
('Pulp Fiction', 'Une narration non-linéaire de crimes interconnectés', 'Crime', 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800');