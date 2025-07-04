import { useState } from "react";
import { Star, Heart, User } from "lucide-react";
import { Button } from "./ui/button";
import { Textarea } from "./ui/textarea";
import { Card, CardContent } from "./ui/card";
import { Avatar, AvatarFallback } from "./ui/avatar";

interface Comment {
  id: string;
  author: string;
  rating: number;
  comment: string;
  date: string;
  likes: number;
  isLiked: boolean;
}

interface CommentSectionProps {
  movieId: string;
}

// Mock data - à remplacer par des données réelles depuis Supabase
const mockComments: Comment[] = [
  {
    id: "1",
    author: "Marie Dubois",
    rating: 5,
    comment: "Un film absolument incroyable ! Les effets visuels sont époustouflants et l'histoire est brillamment écrite. Michelle Yeoh est parfaite dans ce rôle.",
    date: "2024-01-15",
    likes: 12,
    isLiked: false
  },
  {
    id: "2", 
    author: "Thomas Martin",
    rating: 4,
    comment: "Excellent film, très original. Quelques passages un peu longs mais dans l'ensemble c'est du très bon cinéma. À voir absolument !",
    date: "2024-01-10",
    likes: 8,
    isLiked: true
  }
];

export const CommentSection = ({ movieId }: CommentSectionProps) => {
  const [comments, setComments] = useState<Comment[]>(mockComments);
  const [newComment, setNewComment] = useState("");
  const [newRating, setNewRating] = useState(0);

  const handleSubmitComment = () => {
    if (!newComment.trim() || newRating === 0) return;

    const comment: Comment = {
      id: Date.now().toString(),
      author: "Vous", // TODO: Remplacer par l'utilisateur connecté
      rating: newRating,
      comment: newComment,
      date: new Date().toISOString().split('T')[0],
      likes: 0,
      isLiked: false
    };

    setComments([comment, ...comments]);
    setNewComment("");
    setNewRating(0);
    
    // TODO: Sauvegarder en base de données via Supabase
  };

  const toggleLike = (commentId: string) => {
    setComments(comments.map(comment => 
      comment.id === commentId 
        ? { 
            ...comment, 
            isLiked: !comment.isLiked,
            likes: comment.isLiked ? comment.likes - 1 : comment.likes + 1
          }
        : comment
    ));
  };

  return (
    <div className="space-y-6">
      {/* Add Comment Form */}
      <Card>
        <CardContent className="p-6">
          <h3 className="text-xl font-semibold mb-4">Laissez votre avis</h3>
          
          {/* Rating */}
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

          {/* Comment */}
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

      {/* Comments List */}
      <div className="space-y-4">
        <h3 className="text-xl font-semibold">Avis des utilisateurs ({comments.length})</h3>
        
        {comments.map((comment) => (
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
                    <span className="text-sm text-muted-foreground">{comment.date}</span>
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
        ))}
      </div>
    </div>
  );
};