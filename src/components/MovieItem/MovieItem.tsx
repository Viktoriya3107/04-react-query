import type{ Movie } from "../../types/movie";
import css from "./MovieItem.module.css";

interface MovieItemProps {
  movie: Movie;
  onClick?: (movie: Movie) => void;
}

export default function MovieItem({ movie, onClick }: MovieItemProps) {
  return (
    <div className={css.card} onClick={() => onClick?.(movie)}>
      {movie.poster_path ? (
        <img
          src={`https://image.tmdb.org/t/p/w200${movie.poster_path}`}
          alt={movie.title}
          className={css.poster}
        />
      ) : (
        <div className={css.noPoster}>No Image</div>
      )}
      <p className={css.title}>{movie.title}</p>
    </div>
  );
}