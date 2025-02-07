import StarRating from "./StarRating.jsx";
export default function MovieList({ movies, onSelectedMovieId }) {
  return (
    <ul className="list list-movies ">
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