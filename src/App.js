import { useEffect, useState } from "react";
import { NavBar, NumResult, Search } from "./NavBar";
import Main from "./Main";
import MovieList from "./MainComponents/MovieList";
import { MoviesBox, WatchedBox } from "./Main";
import KEY from "./config/keys.json";
import StarRating from "./StarRating";

export default function App() {
  // const tempMovieData = [
  //   {
  //     imdbID: "tt1375666",
  //     Title: "Inception",
  //     Year: "2010",
  //     Poster:
  //       "https://m.media-amazon.com/images/M/MV5BMjAxMzY3NjcxNF5BMl5BanBnXkFtZTcwNTI5OTM0Mw@@._V1_SX300.jpg",
  //   },
  //   {
  //     imdbID: "tt0133093",
  //     Title: "The Matrix",
  //     Year: "1999",
  //     Poster:
  //       "https://m.media-amazon.com/images/M/MV5BNzQzOTk3OTAtNDQ0Zi00ZTVkLWI0MTEtMDllZjNkYzNjNTc4L2ltYWdlXkEyXkFqcGdeQXVyNjU0OTQ0OTY@._V1_SX300.jpg",
  //   },
  //   {
  //     imdbID: "tt6751668",
  //     Title: "Parasite",
  //     Year: "2019",
  //     Poster:
  //       "https://m.media-amazon.com/images/M/MV5BYWZjMjk3ZTItODQ2ZC00NTY5LWE0ZDYtZTI3MjcwN2Q5NTVkXkEyXkFqcGdeQXVyODk4OTc3MTY@._V1_SX300.jpg",
  //   },
  // ];
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [query, setQuery] = useState("finding");
  const [selectedMovieId, setSelectedMovieId] = useState(null);

  function handleQuery(q) {
    setQuery(q);
  }

  function handleSelectMovie(id) {
    id === selectedMovieId ? setSelectedMovieId(null) : setSelectedMovieId(id);
  }

  function handleCloseMovie() {
    setSelectedMovieId(null);
  }

  useEffect(
    function () {
      async function fetchMovies() {
        try {
          setError("");
          setIsLoading(true);
          const res = await fetch(
            `http://www.omdbapi.com/?apikey=${KEY.key}&s=${query}`
          );
          if (!res.ok) throw new Error();
          const data = await res.json();
          if (data.Response === "False") throw new Error(data.Error);
          setMovies(() => data.Search);
          setIsLoading(false);
        } catch (e) {
          setError(e.message);
        } finally {
          setIsLoading(false);
        }
      }
      if (query.length < 3) {
        setError("");
        setMovies([]);
        return;
      }
      fetchMovies();
    },
    [query]
  ); // if we use [], it means that the data fetching is done only after the component mounts (initial render)

  return (
    <>
      <NavBar>
        <Search query={query} onSearch={handleQuery} />
        <NumResult movies={movies} />
      </NavBar>
      <Main>
        <MoviesBox>
          {!isLoading && !error && (
            <MovieList
              movies={movies}
              type="all"
              onSelect={handleSelectMovie}
            ></MovieList>
          )}
          {isLoading && !error && <Loader />}
          {error && <ErrorMessage message={error} />}
        </MoviesBox>
        {selectedMovieId ? (
          <MovieDetails
            selectedMovieId={selectedMovieId}
            onClose={handleCloseMovie}
          />
        ) : (
          <WatchedBox />
        )}
      </Main>
    </>
  );
}

function Loader() {
  return <p className="loader">Loading...</p>;
}

function ErrorMessage({ message }) {
  return (
    <p className="error">
      <span>⛔️ </span>
      {message}
    </p>
  );
}

function MovieDetails({ selectedMovieId, onClose }) {
  const [movie, setMovie] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [movieRating, setMovieRating] = useState(0);

  const {
    Title: title,
    Year: year,
    Poster: poster,
    Runtime: runtime,
    imdbRating,
    Plot: plot,
    Released: released,
    Genre: genre,
    Actors: actors,
    Director: director,
  } = movie;

  console.log(title, year);

  useEffect(
    function () {
      async function getMovieDetails() {
        try {
          setIsLoading(true);
          const res = await fetch(
            `http://www.omdbapi.com/?apikey=${KEY.key}&i=${selectedMovieId}`
          );
          if (!res.ok) throw new Error();
          const data = await res.json();
          if (data.Response === "False") throw new Error(data.Error);
          setMovie(data);
        } catch (e) {
          console.log(e.message);
        } finally {
          setIsLoading(false);
        }
      }
      getMovieDetails();
    },
    [selectedMovieId]
  );

  return (
    <MoviesBox>
      {isLoading ? (
        <Loader />
      ) : (
        <div className="details">
          <header>
            <button className="btn-back" onClick={onClose}>
              &larr;
            </button>
            <img src={poster} alt={`Poster of ${title} movie`} />
            <div className="details-overview">
              <h2>{title}</h2>
              <p>
                {released} &bull; {runtime}
              </p>
              <p>{genre}</p>
              <p>
                <span>⭐️</span>
                {imdbRating} IMDB rating
              </p>
            </div>
          </header>
          <section>
            <StarRating maxRating={10} onSetRating={setMovieRating} />
            <p>
              <em>{plot}</em>
            </p>
            <p>Starring {actors}</p>
            <p>Directed by {director}</p>
          </section>
        </div>
      )}
    </MoviesBox>
  );
}
