import { render, screen, waitFor } from "@testing-library/react";
import MovieDetailPage from "../pages/detail/[id]";
import { useRouter } from "next/router";
import { MovieApiRepository } from "../infrastructure/repositories/MovieApiRepository";
import "@testing-library/jest-dom/extend-expect";

jest.mock("next/router", () => ({
  useRouter: jest.fn(),
}));

jest.mock("../infrastructure/repositories/MovieApiRepository");

describe("MovieDetailPage", () => {
  const mockMovie = {
    id: 1,
    title: "Mock Movie Title",
    image: "mock-image.jpg",
    score: 8.5,
    synopsis: "This is a mock synopsis.",
    trailerUrl: "https://mock-trailer-url.com",
    year: "2022",
  };

  beforeEach(() => {
    (useRouter as jest.Mock).mockReturnValue({ query: { id: "1" } });
    (MovieApiRepository.getMovieDetails as jest.Mock).mockResolvedValue(
      mockMovie
    );
  });

  test("displays movie title after loading", async () => {
    render(<MovieDetailPage />);

    // Wait for the movie title to appear in the document
    await waitFor(() => {
      expect(screen.getByText("Mock Movie Title")).toBeInTheDocument();
    });
  });
});