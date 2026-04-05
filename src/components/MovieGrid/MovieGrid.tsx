import type { Movie } from "../../types/movie";
import MovieItem from "../MovieItem/MovieItem";
import css from "./MovieGrid.module.css";

interface MovieGridProps {
  movies: Movie[];
  onMovieClick?: (movie: Movie) => void;
}

export default function MovieGrid({ movies, onMovieClick }: MovieGridProps) {
  return (
    <div className={css.grid}>
      {movies.map((movie) => (
        <MovieItem key={movie.id} movie={movie} onClick={onMovieClick} />
      ))}
    </div>
  );
}