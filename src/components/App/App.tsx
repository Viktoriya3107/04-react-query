import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import ReactPaginate from "react-paginate";
import { toast, Toaster } from "react-hot-toast";

import { fetchMovies, type MovieResponse } from "../../services/movieService";
import type { Movie } from "../../types/movie";

import SearchBar from "../SearchBar/SearchBar";
import MovieGrid from "../MovieGrid/MovieGrid";
import MovieModal from "../MovieModal/MovieModal";
import Loader from "../Loader/Loader";
import ErrorMessage from "../ErrorMessage/ErrorMessage";

import css from "./App.module.css";

export default function App() {
  const [query, setQuery] = useState("");
  const [page, setPage] = useState(1);
  const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null);

  // Використовуємо react-query для запиту
  const { data, isLoading, isError } = useQuery<MovieResponse, Error>({
    queryKey: ["movies", query, page],
    queryFn: () => fetchMovies(query, page),
    enabled: query !== "",
  });

  // Показ toast, якщо нічого не знайдено
  useEffect(() => {
    if (data?.results.length === 0 && query) {
      toast.error("No movies found for this query");
    }
  }, [data, query]);

  const handleSearch = (newQuery: string) => {
    setQuery(newQuery);
    setPage(1);
  };

  const totalPages = data?.total_pages ?? 0;
  const movies = data?.results ?? [];

  return (
    <div>
      <Toaster />
      
      {/* Пошук */}
      <SearchBar onSubmit={handleSearch} />

      {/* Стани завантаження/помилки */}
      {isLoading && <Loader />}
      {isError && <ErrorMessage message="Could not load movies" />}

      {/* Сітка фільмів */}
      {movies.length > 0 ? (
        <MovieGrid 
          movies={movies} 
          onSelect={(movie: Movie) => setSelectedMovie(movie)} 
        />
      ) : (
        !isLoading && query && <p>No movies found</p>
      )}

      {/* Пагінація */}
      {totalPages > 1 && (
        <ReactPaginate
          pageCount={totalPages}
          pageRangeDisplayed={5}
          marginPagesDisplayed={1}
          onPageChange={({ selected }) => setPage(selected + 1)}
          forcePage={page - 1}
          containerClassName={css.pagination}
          activeClassName={css.active}
          nextLabel="→"
          previousLabel="←"
        />
      )}

      {/* Модалка фільму */}
      <MovieModal 
        movie={selectedMovie} 
        onClose={() => setSelectedMovie(null)} 
      />
    </div>
  );
}