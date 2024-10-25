// components/MovieCard.tsx

import { Card, CardContent, CardMedia, Typography } from '@mui/material';

interface MovieCardProps {
  movie: {
    id: number;
    title: string;
    image: string;
    score: number;
  };
  onMovieClick: (id: number) => void; 
}

const MovieCard = ({ movie, onMovieClick }: MovieCardProps) => {
  return (
    <Card onClick={() => onMovieClick(movie.id)} sx={{ cursor: 'pointer' }}>
      <CardMedia
        component="img"
        height="400"
        image={movie.image}
        alt={movie.title}
      />
      <CardContent>
        <Typography variant="h6">
          {movie.title}
        </Typography>
        <Typography variant="body2" color="textSecondary">
          Score: {movie.score || 'N/A'}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default MovieCard;
