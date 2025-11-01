import { useState, useEffect } from "react";
import { Star, Heart, User } from "lucide-react";
import { Button } from "./ui/button";
import { Textarea } from "./ui/textarea";
import { Card, CardContent } from "./ui/card";
import { Avatar, AvatarFallback } from "./ui/avatar";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import { toast } from "./ui/sonner";

interface Comment {
  id: string;
  user_id: string;
  author: string;
  rating: number;
  comment: string;
  created_at: string;
  likes: number;
  isLiked: boolean;
}

interface CommentSectionProps {
  movieId: string;
}

export const CommentSection = ({ movieId }: CommentSectionProps) => {
  const [comments, setComments] = useState<Comment[]>([]);
  const [newComment, setNewComment] = useState("");
  const [newRating, setNewRating] = useState(0);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();

  useEffect(() => {
    fetchComments();
  }, [movieId]);

  const fetchComments = async () => {
    try {
      const { data, error } = await supabase
        .from("user_comments")
        .select(`
          *,
          user_profiles(nom)
        `)
        .eq("film_id", movieId)
        .order("created_at", { ascending: false });

      if (error) throw error;

      const commentsWithLikes = await Promise.all(
        (data || []).map(async (comment) => {
          const { data: likes } = await supabase
            .from("comment_likes")
            .select("user_id")
            .eq("comment_id", comment.id);

          const isLiked = user ? likes?.some((like) => like.user_id === user.id) : false;

          return {
            id: comment.id,
            user_id: comment.user_id,
            author: comment.user_profiles?.nom || "Utilisateur",
            rating: comment.rating || 0,
            comment: comment.comment,
            created_at: new Date(comment.created_at).toLocaleDateString(),
            likes: comment.likes,
            isLiked,
          };
        })
      );

      setComments(commentsWithLikes);
    } catch (error) {
      console.error("Erreur lors du chargement des commentaires:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmitComment = async () => {
    if (!newComment.trim() || newRating === 0) {
      toast.error("Veuillez ajouter une note et un commentaire");
      return;
    }

    if (!user) {
      toast.error("Vous devez être connecté pour commenter");
      return;
    }

    try {
      const { error } = await supabase
        .from("user_comments")
        .insert({
          user_id: user.id,
          film_id: movieId,
          comment: newComment,
          rating: newRating,
        });

      if (error) throw error;

      toast.success("Commentaire ajouté avec succès");
      setNewComment("");
      setNewRating(0);
      fetchComments();
    } catch (error) {
      console.error("Erreur lors de l'ajout du commentaire:", error);
      toast.error("Erreur lors de l'ajout du commentaire");
    }
  };

  const toggleLike = async (commentId: string) => {
    if (!user) {
      toast.error("Vous devez être connecté pour liker");
      return;
    }

    const comment = comments.find((c) => c.id === commentId);
    if (!comment) return;

    try {
      if (comment.isLiked) {
        const { error } = await supabase
          .from("comment_likes")
          .delete()
          .eq("user_id", user.id)
          .eq("comment_id", commentId);

        if (error) throw error;
      } else {
        const { error } = await supabase
          .from("comment_likes")
          .insert({
            user_id: user.id,
            comment_id: commentId,
          });

        if (error) throw error;
      }

      fetchComments();
    } catch (error) {
      console.error("Erreur lors du like:", error);
      toast.error("Erreur lors du like");
    }
  };

  if (loading) {
    return <div className="text-center py-8">Chargement des commentaires...</div>;
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardContent className="p-6">
          <h3 className="text-xl font-semibold mb-4">Laissez votre avis</h3>

          <div className="mb-4">
            <label className="block text-sm font-medium mb-2">Votre note</label>
            <div className="flex gap-1">
              {[1, 2, 3, 4, 5].map((star) => (
                <Button
                  key={star}
                  variant="ghost"
                  size="icon"
                  className="p-0 w-8 h-8"
                  onClick={() => setNewRating(star)}
                >
                  <Star
                    className={`h-6 w-6 ${
                      star <= newRating
                        ? 'text-yellow-400 fill-current'
                        : 'text-muted-foreground'
                    }`}
                  />
                </Button>
              ))}
            </div>
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium mb-2">Votre commentaire</label>
            <Textarea
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              placeholder="Partagez votre opinion sur ce film..."
              className="min-h-[100px]"
            />
          </div>

          <Button onClick={handleSubmitComment} disabled={!newComment.trim() || newRating === 0}>
            Publier l'avis
          </Button>
        </CardContent>
      </Card>

      <div className="space-y-4">
        <h3 className="text-xl font-semibold">Avis des utilisateurs ({comments.length})</h3>

        {comments.length === 0 ? (
          <p className="text-center text-muted-foreground py-8">Aucun commentaire pour le moment. Soyez le premier à donner votre avis !</p>
        ) : (
          comments.map((comment) => (
            <Card key={comment.id}>
              <CardContent className="p-6">
                <div className="flex items-start gap-4">
                  <Avatar>
                    <AvatarFallback>
                      <User className="h-4 w-4" />
                    </AvatarFallback>
                  </Avatar>

                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <h4 className="font-semibold">{comment.author}</h4>
                      <div className="flex">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <Star
                            key={star}
                            className={`h-4 w-4 ${
                              star <= comment.rating
                                ? 'text-yellow-400 fill-current'
                                : 'text-muted-foreground'
                            }`}
                          />
                        ))}
                      </div>
                      <span className="text-sm text-muted-foreground">{comment.created_at}</span>
                    </div>

                    <p className="text-muted-foreground mb-3">{comment.comment}</p>

                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => toggleLike(comment.id)}
                      className={`${comment.isLiked ? 'text-primary' : 'text-muted-foreground'}`}
                    >
                      <Heart className={`h-4 w-4 mr-1 ${comment.isLiked ? 'fill-current' : ''}`} />
                      {comment.likes}
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))
        )}
      </div>
    </div>
  );
};
