import axios from 'axios';
import { Movie } from '../../domain/entities/Movie';

const API_URL = 'https://api.jikan.moe/v4';

export const MovieApiRepository = {
  async getMovies(page: number): Promise<Movie[]> {
    const response = await axios.get(`${API_URL}/anime?page=${page}`);
    return response.data.data.map((item: any) => ({
      id: item.mal_id,
      title: item.title,
      image: item.images.jpg.image_url,
      score: item.score,
    }));
  },

  async getMovieDetails(id: number): Promise<Movie | null> {
    const response = await axios.get(`${API_URL}/anime/${id}`);
    const item = response.data.data;

    return {
      id: item.mal_id,
      title: item.title,
      image: item.images.jpg.image_url,
      score: item.score,
      synopsis: item.synopsis,
      trailerUrl: item.trailer?.embed_url,
      year: item.aired.from,
    };
  },

  async getMovieRecommendations(id: number) {
    const response = await fetch(`${API_URL}/anime/${id}/recommendations`);
    const data = await response.json();
    return data.data;
    
  },
};
