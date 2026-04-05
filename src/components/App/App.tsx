import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import ReactPaginate from "react-paginate";
import { toast, Toaster } from "react-hot-toast";

import { fetchMovies } from "../../services/movieService";
import type { Movie } from "../../types/movie";

import SearchBar from "../SearchBar/SearchBar";
import MovieGrid from "../MovieGrid/MovieGrid";
import MovieModal from "../MovieModal/MovieModal";
import Loader from "../Loader/Loader";
import ErrorMessage from "../ErrorMessage/ErrorMessage";

import css from "./App.module.css";

interface MoviesData {
  results: Movie[];
  total_pages: number;
}

export default function App() {
  const [query, setQuery] = useState("");
  const [page, setPage] = useState(1);
  const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null);

  const { data, isLoading, isError } = useQuery<MoviesData, Error>({
    queryKey: ["movies", query, page],
    queryFn: () => fetchMovies(query, page),
    enabled: query !== "",
    placeholderData: { results: [], total_pages: 0 }, // заміна keepPreviousData
  });

  useEffect(() => {
    if (data?.results.length === 0 && query) {
      toast.error("Фільми за цим запитом не знайдено");
    }
  }, [data, query]);

  const handleSearch = (newQuery: string) => {
    setQuery(newQuery);
    setPage(1);
  };

  const movies = data?.results ?? [];
  const totalPages = data?.total_pages ?? 0;

  return (
    <div>
      <Toaster />
      <SearchBar onSubmit={handleSearch} />
      {isLoading && <Loader />}
      {isError && <ErrorMessage message="Не вдалося завантажити фільми" />}
      {movies.length > 0 ? (
        <MovieGrid
          movies={movies}
          onSelect={(movie: Movie) => setSelectedMovie(movie)}
        />
      ) : (
        !isLoading && query && <p>Фільми за цим запитом не знайдено</p>
      )}
      {totalPages > 1 && (
        <ReactPaginate
          pageCount={totalPages}
          pageRangeDisplayed={5}
          marginPagesDisplayed={1}
          onPageChange={(event: { selected: number }) =>
            setPage(event.selected + 1)
          }
          forcePage={page - 1}
          containerClassName={css.pagination}
          activeClassName={css.active}
          nextLabel="→"
          previousLabel="←"
        />
      )}
      <MovieModal
        movie={selectedMovie}
        onClose={() => setSelectedMovie(null)}
      />
    </div>
  );
}