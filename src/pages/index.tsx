import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { MovieApiRepository } from '../infrastructure/repositories/MovieApiRepository';
import MovieList from '../components/MovieList';
import { Container, Pagination, TextField, Button } from '@mui/material';
import Header from '../components/Header';

export default function HomePage() {
  const [movies, setMovies] = useState([]);
  const [page, setPage] = useState(1);
  const [inputPage, setInputPage] = useState(''); 
  const router = useRouter();

  useEffect(() => {
    const fetchMovies = async () => {
      const movieList = await MovieApiRepository.getMovies(page);
      setMovies(movieList);
    };
    fetchMovies();
  }, [page]);

  
  const handlePageInputSubmit = () => {
    const pageNumber = parseInt(inputPage, 10);
    if (!isNaN(pageNumber) && pageNumber > 0 && pageNumber <= 10) { 
      setPage(pageNumber); e
      setInputPage('');
    } else {
      alert('Please enter a valid page number between 1 and 10');
    }
  };

  const handleMovieClick = (id: number) => {
    router.push(`/detail/${id}`); 
  };

  return (
    <Container>
      <Header />

      {/* Page Input Field */}
      <Container sx={{ display: 'flex', alignItems: 'center', marginTop: '100px', justifyContent: 'center' }}>
        <TextField
          label="Jump to Page"
          variant="outlined"
          size="small"
          value={inputPage}
          onChange={(e) => setInputPage(e.target.value)}
          sx={{ marginRight: '10px' }}
        />
        <Button variant="contained" color="primary" onClick={handlePageInputSubmit}>
          Go
        </Button>
      </Container>

      {/* Movie List */}
      <MovieList movies={movies} onMovieClick={handleMovieClick} />

      <Pagination
        sx={{ justifyItems: 'center', marginTop: '25px' }}
        count={10} 
        color="primary"
        page={page}
        onChange={(event, value) => setPage(value)}
      />
    </Container>
  );
}
