import { useState, useEffect } from "react";
import "./App.css";
// import { tempMovieData, tempWatchedData } from "./data.js";
import Navbar from "./components/Navbar.jsx";
import Box from "./components/Box.jsx";
import MovieList from "./components/MovieList.jsx";
import MoviesWatched from "./components/MoviesWatched.jsx";
import MoviesWatchedList from "./components/MoviesWatchedList.jsx";
import Search from "./components/Search.jsx";
import Loader from "./components/Loading.jsx";
import SelectedMovie from "./components/SelectedMovie.jsx";

// Enter Imbd api key here
const key = "";


export default function App() {
  // const [movies, setMovies] = useState(tempMovieData);
  // const [watched, setWatched] = useState(tempWatchedData);
  const tempQuery = "interstellar";
  const [query, setQuery] = useState(tempQuery);
  const [movies, setMovies] = useState([]);
  const [watched, setWatched] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [selectedId, setSelectedId] = useState(null);

  function handleSelectedMovieId(id) {
    setSelectedId((selectedId) => (selectedId === id ? null : id));
  }

  function handleAddWatchedMovie(movie) {
    setWatched((watched) => [...watched, movie]);
  }
  function handleCloseMovie() {
    setSelectedId(null);
  }

  //Add keypress listener
  useEffect(() => {
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape") handleCloseMovie();
    });
    return function () {
      document.removeEventListener("keydown", (e) => {
        if (e.key === "Escape") handleCloseMovie();
      });
    };
  }, []);

  // Fetch movies when query changes
  useEffect(() => {
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
    handleCloseMovie();
    fetchMovies();

    return function cleanup() {
      controller.abort();
    };
  }, [query]);
  return (
    <>
      <Navbar>
        <Search query={query} setQuery={setQuery} />
        <NumMovies movies={movies} />
      </Navbar>
      <Main>
        <Box>
          {isLoading && !error && <Loader />}
          {!isLoading && error && <Error message={error} />}
          {!isLoading && !error && (
            <MovieList
              movies={movies}
              onSelectedMovieId={handleSelectedMovieId}
            />
          )}
        </Box>

        <Box>
          {selectedId ? (
            <SelectedMovie
              selectedId={selectedId}
              onAddWatchedMovie={handleAddWatchedMovie}
              onCloseMovie={handleCloseMovie}
              watched={watched}
            />
          ) : (
            <>
              <MoviesWatched watched={watched} />
              <MoviesWatchedList watched={watched} />{" "}
            </>
          )}
        </Box>
      </Main>
    </>
  );
}

//Error
function Error({ message }) {
  return <div className="error">😡{message}</div>;
}

//NumMovies
function NumMovies({ movies }) {
  return (
    <p className="num-results">
      Found <strong>{movies.length}</strong> results
    </p>
  );
}

//Main
function Main({ children }) {
  return <main className="main">{children}</main>;
}
