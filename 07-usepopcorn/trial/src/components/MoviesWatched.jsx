const average = (arr) =>
  arr.length > 0 ? arr.reduce((acc, cur) => acc + cur, 0) / arr.length : 0;

export default function MoviesWatched({ watched }) {
  const avgImdbRating = average(watched.map((movie) => movie.imdbRating));
  const avgUserRating = average(watched.map((movie) => movie.rating));
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
          <span>{avgImdbRating ? avgImdbRating.toFixed(2) : "0.00"}</span>
        </p>
        {/* <p>
          <span>🌟</span>
          <span>{avgUserRating ? avgUserRating.toFixed(2) : "0.00"}</span>
        </p> */}
        <p>
          <span>⏳</span>
          <span>{avgRuntime ? avgRuntime.toFixed(0) : "0"} min</span>
        </p>
      </div>
    </div>
  );
}
