import { useState, useEffect } from "react";
import "./App.css";
import { tempMovieData, tempWatchedData } from "./data.js";
import StarRating from "./components/StarRating";

const key = "cc13a713";
const average = (arr) =>
  arr.reduce((acc, cur, i, arr) => acc + cur / arr.length, 0);
export default function App() {
  // const [movies, setMovies] = useState(tempMovieData);
  // const [watched, setWatched] = useState(tempWatchedData);
  const [query, setQuery] = useState("");
  const [movies, setMovies] = useState([]);
  const [watched, setWatched] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const tempQuery = "interstellar";
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
//Loader
function Loader() {
  return <div className="loader">loading...</div>;
}

//Error
function Error({ message }) {
  return <div className="error">😡{message}</div>;
}
//Navbar
function Navbar({ children }) {
  return (
    <nav className="nav-bar">
      <title>usePopcorn</title>
      <Logo />
      {children}
    </nav>
  );
}

//Logo
function Logo() {
  return (
    <div className="logo">
      <span role="img">🍿</span>
      <h1>usePopcorn</h1>
    </div>
  );
}

//Search
function Search({ query, setQuery }) {
  return (
    <input
      className="search"
      type="text"
      placeholder="Search movies..."
      value={query}
      onChange={(e) => setQuery(e.target.value)}
    />
  );
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

function Box({ children }) {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <div className="box overflow-x-hidden">
      <button className="btn-toggle" onClick={() => setIsOpen((open) => !open)}>
        {isOpen ? "–" : "+"}
      </button>
      {isOpen && children}
    </div>
  );
}

function MovieList({ movies, onSelectedMovieId }) {
  return (
    <ul className="list list-movies">
      {movies?.map((movie) => (
        <li key={movie.imdbID} onClick={() => onSelectedMovieId(movie.imdbID)}>
          <img src={movie.Poster} alt={`${movie.Title} poster`} />
          <h3>{movie.Title}</h3>
          <div>
            <p>
              <span>🗓</span>
              <span>{movie.Year}</span>
            </p>
          </div>
          <StarRating
            maxRating={5}
            size={20}
            onSetRating={(rating) => rating}
          />
        </li>
      ))}
    </ul>
  );
}
function SelectedMovie({
  selectedId,
  onAddWatchedMovie,
  onCloseMovie,
  watched,
}) {
  const [movie, setMovie] = useState({});
  const [rating, setRating] = useState(0);
  const isWatched = watched.map((movie) => movie.imdbID).includes(selectedId);
  const watchedUserRating = watched.find(
    (movie) => movie.imdbID === selectedId
  )?.rating;
  const {
    Title: title,
    Year: year,
    Poster: poster,
    imdbRating: imdbRating,
    Released: released,
    Actors: actors,
    Director: director,
    Genre: genre,
    Plot: plot,
    Runtime: runtime,
  } = movie;

  function handleAddWatchedMovie() {
    const newWatchedMovie = {
      imdbID: selectedId,
      title,
      year,
      poster,
      imdbRating: Number(imdbRating),
      runtime: Number(runtime.split(" ").at(0)),
    };
    onAddWatchedMovie(newWatchedMovie);
    onCloseMovie();
  }

  // setWatched((watched) => watched.filter((movie) => movie.imdbID !== id));
  //   }

  useEffect(() => {
    async function fetchMovieDetails() {
      const res = await fetch(
        `http://www.omdbapi.com/?apikey=${key}&i=${selectedId}`
      );
      const data = await res.json();
      setMovie(data);
    }
    fetchMovieDetails();
  }, [selectedId]);
  return (
    <div className="details">
      <header>
        <button className="btn-back" onClick={onCloseMovie}>
          &larr;
        </button>
        <img src={movie.Poster} alt={`${movie.Title} poster`} />
        <div className="details-overview">
          <h2>{title}</h2>

          <div className="flex gap-2">
            {" "}
            <p>
              <span>📅</span>
              <span>{released}</span>
            </p>
            <p>
              <span>🎬</span>
              <span>{runtime}</span>
            </p>
          </div>
          <p>
            <span>📽️</span>
            <span>{genre}</span>
          </p>
          <p>
            <span>⭐️</span>
            <span>{imdbRating} Imdb Rating</span>
          </p>
        </div>
      </header>
      <div className="rating mt-10 mx-20 justify-center  flex items-center">
        {isWatched ? (
          <p>You rated this movie {watchedUserRating}</p>
        ) : (
          <>
            <StarRating maxRating={10} size={24} onSetRating={setRating} />
            <button
              className="btn-add"
              onClick={handleAddWatchedMovie}
              disabled={rating === 0}
            >
              + Add to list
            </button>
          </>
        )}
      </div>
      <section>
        <p>{plot}</p>

        <p>
          <span>Starring: {actors}</span>
        </p>
        <p>
          <span>Directed by: {director}</span>
        </p>
      </section>
    </div>
  );
}
function MoviesWatched({ watched }) {
  const avgImdbRating = average(watched.map((movie) => movie.imdbRating));
  const avgUserRating = average(watched.map((movie) => movie.userRating));
  const avgRuntime = average(watched.map((movie) => movie.runtime));

  return (
    <div className="summary">
      <h2>Movies you watched</h2>
      <div>
        <p>
          <span>#️⃣</span>
          <span>{watched.length} movies</span>
        </p>
        <p>
          <span>⭐️</span>
          <span>{avgImdbRating}</span>
        </p>
        <p>
          <span>🌟</span>
          <span>{avgUserRating}</span>
        </p>
        <p>
          <span>⏳</span>
          <span>{avgRuntime} min</span>
        </p>
      </div>
    </div>
  );
}
function MoviesWatchedList({ watched }) {
  return (
    <ul className="list">
      {watched.map((movie) => (
        <li key={movie.imdbID}>
          <img src={movie.Poster} alt={`${movie.Title} poster`} />
          <h3>{movie.Title}</h3>
          <div>
            <p>
              <span>⭐️</span>
              <span>{movie.imdbRating}</span>
            </p>
            <p>
              <span>🌟</span>
              <span>{movie.userRating}</span>
            </p>
            <p>
              <span>⏳</span>
              <span>{movie.runtime} min</span>
            </p>
          </div>
        </li>
      ))}
    </ul>
  );
}
