import { useState, useEffect } from "react";
import KEY from "./config/keys.json";

export function useMovies(query) {
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(
    function () {
      const controller = new AbortController();

      async function fetchMovies() {
        try {
          setError("");
          setIsLoading(true);
          const res = await fetch(
            `http://www.omdbapi.com/?apikey=${KEY.key}&s=${query}`,
            { signal: controller.signal }
          );
          if (!res.ok) throw new Error();
          const data = await res.json();
          if (data.Response === "False") throw new Error(data.Error);
          setMovies(() => data.Search);
          setIsLoading(false);
          setError("");
        } catch (e) {
          if (e.name !== "AbortError") setError(e.message);
        } finally {
          setIsLoading(false);
        }
      }

      if (query.length < 3) {
        setError("");
        setMovies([]);
        return;
      }
      // callback?.();
      fetchMovies();

      // cleanup function
      return function () {
        controller.abort();
      };
    },
    [query]
  );

  return { movies, isLoading, error };
}
