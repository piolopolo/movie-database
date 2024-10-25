import { Grid, Card, CardContent, CardMedia, Typography } from '@mui/material';

export default function MovieList({ movies, onMovieClick }) {
  return (
    <Grid container spacing={4} sx={{ marginTop: '20px' }}>
      {movies.map((movie) => (
        <Grid item key={movie.id} xs={12} sm={6} md={4}>
          <Card
            sx={{ cursor: 'pointer' }}
            onClick={() => onMovieClick(movie.id)} 
          >
            <CardMedia
              component="img"
              height="300"
              image={movie.image}
              alt={movie.title}
            />
            <CardContent>
              <Typography variant="h6">{movie.title}</Typography>
              <Typography variant="body2" color="text.secondary">
                Score: {movie.score}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
}
