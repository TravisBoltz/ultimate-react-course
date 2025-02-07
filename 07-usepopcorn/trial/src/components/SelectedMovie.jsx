import { useState, useEffect, useRef } from "react";
import StarRating from "./StarRating.jsx";
export default function SelectedMovie({
  selectedId,
  onAddWatchedMovie,
  onCloseMovie,
  watched,
}) {
  const [movie, setMovie] = useState({});
  const [rating, setRating] = useState("");
  const countRef = useRef(0);

  useEffect(() => {
    if (rating) countRef.current++;
  }, [rating]);

  const isWatched = watched.map((movie) => movie.imdbID).includes(selectedId);
  const watchedUserRating = watched.find(
    (movie) => movie.imdbID === selectedId
  )?.rating;
  const {
    Title: title,
    Year: year,
    Poster: poster,
    imdbRating,
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
      CountingDecisions: countRef.currnet,
    };
    onAddWatchedMovie(newWatchedMovie);
    onCloseMovie();
  }

  // Enter Imbd api key here
  const key = "cc13a713";

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
