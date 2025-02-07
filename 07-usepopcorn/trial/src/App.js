import { useState, useEffect } from "react";
import "./App.css";
// import { tempMovieData, tempWatchedData } from "./data.js";
import Navbar from "./components/Navbar.jsx";
import Box from "./components/Box.jsx";
import { useMovies } from "./hooks/useMovies";
import MovieList from "./components/MovieList.jsx";
import MoviesWatched from "./components/MoviesWatched.jsx";
import MoviesWatchedList from "./components/MoviesWatchedList.jsx";
import Search from "./components/Search.jsx";
import Loader from "./components/Loading.jsx";
import SelectedMovie from "./components/SelectedMovie.jsx";
import { useLocalStorage } from "./hooks/useLocalStorage.js";
import { useKey } from "./hooks/useKey.js";

export default function App() {
  // const [movies, setMovies] = useState(tempMovieData);
  // const [watched, setWatched] = useState(tempWatchedData);
  // const tempQuery = "interstellar";
  const [query, setQuery] = useState("interstellar");

  //custom hook
  const { movies, isLoading, error } = useMovies(query);
  // handleCloseMovie();

  const [watched, setWatched] = useLocalStorage([], "watched");

  const [selectedId, setSelectedId] = useState(null);

  function handleSelectedMovieId(id) {
    setSelectedId((selectedId) => (selectedId === id ? null : id));
  }

  function handleAddWatchedMovie(movie) {
    setWatched((watched) => [...watched, movie]);

    // localStorage.setItem("watched", JSON.stringify([...watched, movie]));
  }

  function handleCloseMovie() {
    setSelectedId(null);
  }

  useKey("Escape", handleCloseMovie);

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
