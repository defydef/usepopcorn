export default function MovieList({ movies, type, onSelect }) {
  return (
    <ul className="list list-movies">
      {movies?.map((movie) => (
        <Movie key={movie.imdbID} movie={movie} onSelect={onSelect}>
          {type === "all" && (
            <div>
              <p>
                <span>🗓</span>
                <span>{movie.Year}</span>
              </p>
            </div>
          )}
          {type === "watched" && (
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
          )}
        </Movie>
      ))}
    </ul>
  );
}

function Movie({ movie, children, onSelect }) {
  return (
    <li onClick={() => onSelect(movie.imdbID)}>
      <img src={movie.Poster || movie.poster} alt={`${movie.Title} poster`} />
      <h3>{movie.Title || movie.title}</h3>
      {children}
    </li>
  );
}
