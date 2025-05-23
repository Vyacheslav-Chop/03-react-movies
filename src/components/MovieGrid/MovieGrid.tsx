import type { Movie } from "../../types/movie";
import css from "./MovieGrid.module.css";
import NoImage from "../NoImage/NoImage";

interface MovieGridProps {
  onSelect: (movie: Movie) => void;
  movies: Movie[];
}

export default function MovieGrid({ onSelect, movies }: MovieGridProps) {
  return (
    <ul className={css.grid}>
      {movies.map((movie) => {
        const { id, poster_path, title } = movie;
        return (
          <li key={id}>
            <div className={css.card} onClick={() => onSelect(movie)}>
              {poster_path ? (
                <img
                  className={css.image}
                  src={`https://image.tmdb.org/t/p/w500${poster_path}`}
                  alt={title}
                  loading="lazy"
                />
              ) : (
                <NoImage title={title} />
              )}
              <h2 className={css.title}>{title}</h2>
            </div>
          </li>
        );
      })}
    </ul>
  );
}
