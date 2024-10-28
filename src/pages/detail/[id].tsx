import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';
import { MovieApiRepository } from '../../infrastructure/repositories/MovieApiRepository';
import { Container, Typography, Card, CardContent, CardMedia, Button, Grid } from '@mui/material';
import Header from '../../components/Header';
import { useStore } from '../../store/favoritesStore';
import Link from 'next/link';
import { Movie } from '@/domain/entities/Movie';


export default function MovieDetailPage() {
  const router = useRouter();
  const { id } = router.query;
  const [movie, setMovie] = useState<Movie | null>(null); // State untuk menyimpan detail film
  const [recommendations, setRecommendations] = useState<Movie[]>([]);

  const {
    favourites,
    addFavourite,
    removeFavourite,
  } = useStore();
  
  const isFavourite = favourites.some((favMovie) => favMovie.id === Number(id));

  useEffect(() => {
    if (id) {
      const fetchMovieDetails = async () => {
        const movieDetails = await MovieApiRepository.getMovieDetails(Number(id));
        setMovie(movieDetails);
      };

      const fetchMovieRecommendations = async () => {
        const recommendedMovies = await MovieApiRepository.getMovieRecommendations(Number(id));
        setRecommendations(recommendedMovies);
      };

      fetchMovieDetails();
      fetchMovieRecommendations();
    }
  }, [id]);

  if (!movie) {
    return <div>Loading...</div>;
  }

  const handleAddFavourite = () => {
    addFavourite(movie);
  };

  const handleRemoveFavourite = () => {
    removeFavourite(movie.id);
  };


  return (
    <Container>
      <Header />
      {/* Movie Details Section */}
      <Card sx={{ marginTop: '100px' }}>
        <CardMedia
          component="img"
          height="500"
          image={movie.image}
          alt={movie.title}
        />
        <CardContent>
          <Typography variant="h4" gutterBottom>
            {movie.title} ({movie.year ? new Date(movie.year).getFullYear() : 'N/A'})
          </Typography>
          <Typography variant="h6" gutterBottom>
            Score: {movie.score}
          </Typography>
          <Typography variant="body1" paragraph>
            {movie.synopsis ? movie.synopsis : 'No synopsis available.'}
          </Typography>

          {/* Display trailer if available */}
          {movie.trailerUrl && (
            <div>
              <Typography variant="h6" gutterBottom>
                Trailer:
              </Typography>
              <iframe
                width="560"
                height="315"
                src={movie.trailerUrl}
                title="Movie Trailer"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            </div>
          )}
          {/* Tombol Add/Remove Favourite */}
          <Button
            onClick={isFavourite ? handleRemoveFavourite : handleAddFavourite}
            variant="contained"
            color={isFavourite ? "secondary" : "primary"}
            sx={{ marginTop: '20px' }}
          >
            {isFavourite ? "Remove from Favourites" : "Add to Favourites"}
          </Button>

          <Button
            onClick={() => router.back()}
            variant="contained"
            color="primary"
            sx={{ marginTop: '20px', marginLeft: '10px' }}
          >
            Back
          </Button>
        </CardContent>
      </Card>

      {/* Movie Recommendations Section */}
      {recommendations.length > 0 && (
        <div style={{ marginTop: '40px' }}>
          <Typography variant="h5" gutterBottom>
            Recommended Movies
          </Typography>
          <Grid container spacing={3} sx={{ marginTop: '20px' }}>
            {recommendations.map((rec) => (
              <Grid item key={rec.entry.mal_id} xs={12} sm={6} md={4}>
                <Link href={`/detail/${rec.entry.mal_id}`} passHref>
                  <Card sx={{ cursor: 'pointer' }}>
                    <CardMedia
                      component="img"
                      height="300"
                      image={rec.entry.images.jpg.image_url}
                      alt={rec.entry.title}
                    />
                    <CardContent>
                      <Typography variant="h6">{rec.entry.title}</Typography>
                    </CardContent>
                  </Card>
                </Link>
              </Grid>
            ))}
          </Grid>
        </div>
      )}
    </Container>
  );
}
