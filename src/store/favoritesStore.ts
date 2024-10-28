import { create } from 'zustand';

interface Movie {
  id: number;
  title: string;
  image: string;
  score: number;
}

interface Store {
  favourites: Movie[];
  addFavourite: (movie: Movie) => void;
  removeFavourite: (id: number) => void;
}

export const useStore = create<Store>((set) => ({
  favourites: [],
  addFavourite: (movie) => set((state) => ({ favourites: [...state.favourites, movie] })),
  removeFavourite: (id) => set((state) => ({
    favourites: state.favourites.filter((movie) => movie.id !== id),
  })),
}));
