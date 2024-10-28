// __tests__/Header.test.tsx
import { render, screen } from '@testing-library/react';
import Header from '../components/Header';
import { ThemeProvider, createTheme } from '@mui/material/styles';

describe('Header Component', () => {
  const renderWithTheme = (component: React.ReactNode) => {
    const theme = createTheme();
    return render(<ThemeProvider theme={theme}>{component}</ThemeProvider>);
  };

  it('renders the header with the correct title', () => {
    renderWithTheme(<Header />);
    
    // Memeriksa apakah judul muncul
    expect(screen.getByText(/Movie Database/i)).toBeInTheDocument();
  });

  it('renders the Home button', () => {
    renderWithTheme(<Header />);
    
    // Memeriksa apakah tombol "Home" ada
    const homeButton = screen.getByRole('button', { name: /home/i });
    expect(homeButton).toBeInTheDocument();
    expect(homeButton).toHaveAttribute('href', '/');
  });

  it('renders the Favorites button', () => {
    renderWithTheme(<Header />);
    
    // Memeriksa apakah tombol "Favorites" ada
    const favoritesButton = screen.getByRole('button', { name: /favorites/i });
    expect(favoritesButton).toBeInTheDocument();
    expect(favoritesButton).toHaveAttribute('href', '/favourites');
  });
});
