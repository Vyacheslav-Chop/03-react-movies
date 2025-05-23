import { useEffect, useState, type ChangeEvent } from "react";
import styles from "./SearchBar.module.css";
import toast from "react-hot-toast";

interface SearchBarProps {
  onSubmit: (topic: string) => void;
}

export default function SearchBar({ onSubmit }: SearchBarProps) {
  const [query, setQuery] = useState(() => {
    const savedQuery = window.localStorage.getItem("query");
    try {
      return savedQuery ? JSON.parse(savedQuery) : "";
    } catch {
      return "";
    }
  });

  const handleSubmit = (formData: FormData) => {
    const query = formData.get("query") as string;
    if (!query || query.trim() === "") {
      toast.error("Please enter your search query.");
      return;
    }
    onSubmit(query.trim());
    setQuery("");
  };

  useEffect(() => {
    if (query !== "") {
      window.localStorage.setItem("query", JSON.stringify(query));
    } else {
      window.localStorage.removeItem("query");
    }
  }, [query]);

  const handleChange = (ev: ChangeEvent<HTMLInputElement>) => {
    const value = ev.target.value;
    setQuery(value);
  };
  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <a
          className={styles.link}
          href="https://www.themoviedb.org/"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by TMDB
        </a>
        <form className={styles.form} action={handleSubmit}>
          <input
            className={styles.input}
            type="text"
            name="query"
            autoComplete="off"
            placeholder="Search movies..."
            autoFocus
            value={query}
            onChange={handleChange}
          />
          <button className={styles.button} type="submit">
            Search
          </button>
        </form>
      </div>
    </header>
  );
}
