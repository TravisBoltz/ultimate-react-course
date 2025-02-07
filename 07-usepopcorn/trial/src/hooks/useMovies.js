import { useEffect, useState } from "react";
// Enter Imbd api key here
const key = "cc13a713";
export function useMovies(query) {
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  // Fetch movies when query changes
  useEffect(() => {
    // callback?.();
    const controller = new AbortController();
    async function fetchMovies() {
      try {
        setIsLoading(true);
        setError("");
        const res = await fetch(
          `http://www.omdbapi.com/?apikey=${key}&s=${query}`,
          {
            signal: controller.signal,
          }
        );
        // Check if response was not ok
        if (!res.ok)
          return console.error(`Something went wrong: ${res.statusText}`);
        const data = await res.json();
        // Check if response is not successful
        if (data.Response === "False") throw new Error("Movies not found");
        // console.log(data);
        setMovies(data.Search);
        setIsLoading(false);
      } catch (err) {
        // console.error(err.message);
        setError(err.message);
        if (err.name === "AbortError") return;
      } finally {
        setIsLoading(false);
      }
    }
    if (query.length < 3) {
      setMovies([]);
      setError("");
      return;
    }
    fetchMovies();

    return function cleanup() {
      controller.abort();
    };
  }, [query]);
  return { movies, isLoading, error };
}
