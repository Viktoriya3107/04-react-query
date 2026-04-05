import axios from "axios";
import type { Movie } from "../types/movie";

const API_TOKEN = import.meta.env.VITE_TMDB_API_TOKEN;
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
  if (!API_TOKEN) {
    throw new Error("TMDB API token is missing!");
  }

  if (!query.trim()) {
    return { results: [], page: 1, total_pages: 0 };
  }

  try {
    const { data } = await axios.get<MovieResponse>(
      `${BASE_URL}/search/movie`,
      {
        params: {
          query,
          page,
        },
        headers: {
          Authorization: `Bearer ${API_TOKEN}`,
        },
      }
    );

    return data;
  } catch (err: unknown) {
    let errorMessage = "Failed to fetch movies";

    if (axios.isAxiosError(err)) {
      errorMessage =
        err.response?.data?.status_message || err.message;
    }

    console.error("Error fetching movies:", err);
    throw new Error(errorMessage);
  }
};