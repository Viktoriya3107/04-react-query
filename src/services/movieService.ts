import axios from "axios";
import type { Movie } from "../types/movie";

const API_KEY = import.meta.env.VITE_TMDB_API_KEY;
const BASE_URL = "https://api.themoviedb.org/3";

export interface MovieResponse {
  page: number;
  results: Movie[];
  total_pages: number;
}

export const fetchMovies = async (
  query: string,
  page: number
): Promise<MovieResponse> => {
  if (!API_KEY) throw new Error("TMDB API key is missing!");

  if (!query.trim()) {
    return { results: [], page: 1, total_pages: 0 };
  }

  try {
    const { data } = await axios.get<MovieResponse>(`${BASE_URL}/search/movie`, {
      params: {
        api_key: API_KEY,
        query,
        page,
      },
    });
    return data;
  } catch (err: unknown) {
    let errorMessage = "Failed to fetch movies";
    if (axios.isAxiosError(err)) {
      errorMessage = err.response?.data?.status_message || err.message;
    }
    console.error("Error fetching movies:", err);
    throw new Error(errorMessage);
  }
};