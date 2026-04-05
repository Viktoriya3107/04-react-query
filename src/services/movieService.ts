import axios from "axios";
import type { MovieResponse } from "../types/movie";

const API_KEY = import.meta.env.VITE_TMDB_API_KEY;
const BASE_URL = "https://api.themoviedb.org/3";

export const fetchMovies = async (
  query: string,
  page: number
): Promise<MovieResponse> => {
  const { data } = await axios.get<MovieResponse>(`${BASE_URL}/search/movie`, {
    headers: {
      Authorization: `Bearer ${API_KEY}`,
    },
    params: {
      query,
      page,
    },
  });

  return data;
};