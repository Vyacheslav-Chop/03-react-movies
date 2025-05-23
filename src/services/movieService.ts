import axios from "axios";
import type { Movie } from "../types/movie";

interface FetchMoviesRes {
  results: Movie[];
}

export default async function fetchMovies(query: string): Promise<Movie[]> {
  const myKey = import.meta.env.VITE_API_KEY;

  const res = await axios.get<FetchMoviesRes>(
    "https://api.themoviedb.org/3/search/movie",
    {
      params: {
        query,
      },
      headers: {
        Authorization: `Bearer ${myKey}`,
      },
    }
  );
  return res.data.results;
}
