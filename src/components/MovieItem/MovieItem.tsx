import type { Movie } from "../../types/movie";

interface MovieItemProps {
  movie: Movie;
}

export default function MovieItem({ movie }: MovieItemProps) {
  return <li>{movie.title}</li>;
}