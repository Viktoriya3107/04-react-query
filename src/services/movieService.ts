import axios from "axios";
import type { MovieResponse } from "../types/movie";

const API_KEY = "9913175b4e6739416cb28494d28a669a"; 
const BASE_URL = "https://api.themoviedb.org/3";

export const fetchMovies = async (
  query: string,
  page: number
): Promise<MovieResponse> => {
  const { data } = await axios.get(`${BASE_URL}/search/movie`, {
    params: {
      api_key: API_KEY,
      query,
      page,
    },
  });

  return data;
};