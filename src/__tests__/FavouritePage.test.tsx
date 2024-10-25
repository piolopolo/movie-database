// __tests__/FavouritePage.test.tsx
import { render, screen, fireEvent } from '@testing-library/react';
import FavouritePage from '../pages/favourites';
import { useStore } from '../store/favoritesStore';
import { RouterContext } from 'next/dist/shared/lib/router-context';
import { createMockRouter } from '../test-utils/createMockRouter'; 

jest.mock('../store/favoritesStore'); 

// Sample favorite movies
const mockFavourites = [
  {
    id: 1,
    title: 'Favourite Movie 1',
    image: 'image1.jpg',
    score: 8.5,
  },
  {
    id: 2,
    title: 'Favourite Movie 2',
    image: 'image2.jpg',
    score: 7.8,
  },
];

describe('FavouritePage', () => {
  const mockRemoveFavourite = jest.fn();
  
  beforeEach(() => {
    // Mock the Zustand store hook with sample data
    (useStore as jest.Mock).mockReturnValue({
      favourites: mockFavourites,
      removeFavourite: mockRemoveFavourite,
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test('renders favorite movies', () => {
    render(
      <RouterContext.Provider value={createMockRouter({})}>
        <FavouritePage />
      </RouterContext.Provider>
    );

    // Check that movie titles are displayed
    mockFavourites.forEach(movie => {
      expect(screen.getByText(movie.title)).toBeInTheDocument();
    });

    // Check that scores are displayed
    mockFavourites.forEach(movie => {
      expect(screen.getByText(`Score: ${movie.score}`)).toBeInTheDocument();
    });
  });

  test('navigates to movie detail page on click', () => {
    const mockRouter = createMockRouter({});
    render(
      <RouterContext.Provider value={mockRouter}>
        <FavouritePage />
      </RouterContext.Provider>
    );

    const firstMovie = mockFavourites[0];
    const movieCard = screen.getByText(firstMovie.title);

    fireEvent.click(movieCard);

    expect(mockRouter.push).toHaveBeenCalledWith(`/detail/${firstMovie.id}`);
  });

  test('removes a movie from favorites when "Remove from Favourites" button is clicked', () => {
    render(
      <RouterContext.Provider value={createMockRouter({})}>
        <FavouritePage />
      </RouterContext.Provider>
    );

    const removeButtons = screen.getAllByText('Remove from Favourites');

    fireEvent.click(removeButtons[0]); // Click the remove button for the first movie

    expect(mockRemoveFavourite).toHaveBeenCalledWith(mockFavourites[0].id);
  });

  test('shows message if no favorite movies are available', () => {
    // Mock store to return an empty favorite list
    (useStore as jest.Mock).mockReturnValue({
      favourites: [],
      removeFavourite: jest.fn(),
    });

    render(
      <RouterContext.Provider value={createMockRouter({})}>
        <FavouritePage />
      </RouterContext.Provider>
    );

    expect(screen.getByText('No favourite movies yet.')).toBeInTheDocument();
  });
});
