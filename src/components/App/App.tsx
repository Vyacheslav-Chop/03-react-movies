import SearchBar from "../SearchBar/SearchBar";
import css from "./App.module.css";
import fetchMovies from "../../services/movieService";
import toast, { Toaster } from "react-hot-toast";
import { useEffect, useState } from "react";
import MovieGrid from "../MovieGrid.tsx/MovieGrid";
import type { Movie } from "../../types/movie";
import Loader from "../Loader/Loader";
import ErrorMessage from "../ErrorMessage/ErrorMessage";
import MovieModal from "../MovieModal/MovieModal";

export default function App() {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [isOpenModal, setISOpenModal] = useState(() => {
    const savedStatus = window.localStorage.getItem("openmodal-status");
    try {
      return savedStatus ? JSON.parse(savedStatus) : false;
    } catch {
      return false;
    }
  });
  const [selectedMovie, setSelectedMovie] = useState<Movie | null>(() => {
    const savedMovie = window.localStorage.getItem("selected-movie");
    try {
      return savedMovie ? JSON.parse(savedMovie) : null;
    } catch {
      return null;
    }
  });

  const openModal = () => setISOpenModal(true);
  const closeModal = () => {
    setISOpenModal(false);
    setSelectedMovie(null);
  };

  useEffect(() => {
    window.localStorage.setItem(
      "openmodal-status",
      JSON.stringify(isOpenModal)
    );
  }, [isOpenModal]);

  useEffect(() => {
    if (selectedMovie) {
      window.localStorage.setItem(
        "selected-movie",
        JSON.stringify(selectedMovie)
      );
    } else {
      window.localStorage.removeItem("selected-movie");
    }
  }, [selectedMovie]);

  const handleSearch = async (query: string) => {
    try {
      setIsLoading(true);
      setIsError(false);
      setMovies([]);
      toast.dismiss();
      const newMovies = await fetchMovies(query);

      if (newMovies.length === 0) {
        toast.error("No movies found for your request.");
      }

      setMovies(newMovies);
    } catch {
      setIsError(true);
    } finally {
      setIsLoading(false);
    }
  };
  const handleSelect = (movie: Movie) => {
    setSelectedMovie(movie);
    openModal();
  };

  return (
    <div className={css.app}>
      <Toaster position="top-center" reverseOrder={false} />
      <SearchBar onSubmit={handleSearch} />
      {isLoading && <Loader />}
      {isError && <ErrorMessage />}
      {movies.length > 0 && (
        <MovieGrid movies={movies} onSelect={handleSelect} />
      )}
      {isOpenModal && selectedMovie && (
        <MovieModal onClose={closeModal} movie={selectedMovie} />
      )}
    </div>
  );
}
