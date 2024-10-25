import { Container, Typography, Grid, Button } from '@mui/material';
import MovieCard from '../components/MovieCard'; 
import Header from '../components/Header';
import { useStore } from '../store/favoritesStore'; 
import router from 'next/router';

export default function FavouritePage() {
  const { favourites, removeFavourite } = useStore();

  const handleMovieClick = (id: number) => {
    router.push(`/detail/${id}`);
  };

  return (
    <Container>
      <Header />
      <Typography variant="h4" gutterBottom sx={{ marginTop: '100px' }}>
        Favourite Movies
      </Typography>

      {favourites.length === 0 ? (
        <Typography variant="body1">No favourite movies yet.</Typography>
      ) : (
        <Grid container spacing={3}>
          {favourites.map((movie) => (
            <Grid item key={movie.id} xs={12} sm={6} md={4}>
              <MovieCard movie={movie} onMovieClick={handleMovieClick} />
              <Button
                  onClick={() => removeFavourite(movie.id)}
                  variant="contained"
                  color="secondary"
                  sx={{ marginTop: '10px' }}
                >
                  Remove from Favourites
                </Button>
            </Grid>
          ))}
        </Grid>
      )}
    </Container>
  );
}
