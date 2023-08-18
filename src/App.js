import { useEffect, useState } from "react";
import { NavBar, NumResult, Search } from "./NavBar";
import Main from "./Main";
import MovieList from "./MainComponents/MovieList";
import { MoviesBox, WatchedBox } from "./Main";
import KEY from "./config/keys.json";
import StarRating from "./StarRating";

export default function App() {
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [query, setQuery] = useState("");
  const [selectedMovieId, setSelectedMovieId] = useState(null);
  const [watchedMovie, setWatchedMovie] = useState(function () {
    return JSON.parse(localStorage.getItem("watched"));
  }); // initialize values in watchedMovie using callback function that get values from local storage. his only executes on initial render

  function handleQuery(q) {
    setQuery(q);
  }

  function handleSelectMovie(id) {
    id === selectedMovieId ? setSelectedMovieId(null) : setSelectedMovieId(id);
  }

  function handleCloseMovie() {
    setSelectedMovieId(null);
  }

  function handleAddWatchedMovie(newMovie) {
    setWatchedMovie((prevWatchedMovie) => [...prevWatchedMovie, newMovie]);
  }

  function handleDeleteWatched(id) {
    setWatchedMovie((prevWatchedMovie) =>
      prevWatchedMovie.filter((movie) => movie.imdbID !== id)
    );
  }

  useEffect(
    function (movie) {
      localStorage.setItem("watched", JSON.stringify(watchedMovie));
    },
    [watchedMovie]
  );

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

      handleCloseMovie(); // close movie details before fetching new movies
      fetchMovies();

      // cleanup function
      return function () {
        controller.abort();
      };
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
          {!isLoading && !error && query.length > 2 && (
            <MovieList
              movies={movies}
              type="all"
              onSelect={handleSelectMovie}
            ></MovieList>
          )}
          {isLoading && !error && <Info className="loader">Loading...</Info>}
          {error && <ErrorMessage message={error} />}
          {!isLoading && !error && !query && <Info>Type movie title...</Info>}
        </MoviesBox>
        {selectedMovieId ? (
          <MovieDetails
            selectedMovieId={selectedMovieId}
            onClose={handleCloseMovie}
            onAddWatched={handleAddWatchedMovie}
            watched={watchedMovie}
          />
        ) : (
          <WatchedBox
            watchedMovies={watchedMovie}
            onDelete={handleDeleteWatched}
          />
        )}
      </Main>
    </>
  );
}

function Info({ className, children }) {
  return <p className={`info ${className}`}>{children}</p>;
}

function ErrorMessage({ message }) {
  return (
    <p className="error">
      <span>⛔️ </span>
      {message}
    </p>
  );
}

function MovieDetails({ selectedMovieId, onClose, onAddWatched, watched }) {
  const [movie, setMovie] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [userRating, setUserRating] = useState(0);

  const isWatched = watched
    .map((movie) => movie.imdbID)
    .includes(selectedMovieId);

  const currMovieRating = watched.find(
    (movie) => movie.imdbID === selectedMovieId
  )?.userRating; // ?. only gets userRating if the watched.find object is not null

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
  movie.userRating = userRating;

  function handleAdd() {
    const newWatchedMovie = {
      imdbID: selectedMovieId,
      title,
      year,
      poster,
      imdbRating: Number(imdbRating),
      runtime: runtime !== "N/A" ? Number(runtime.split(" ").at(0)) : 0,
      userRating,
    };
    if (!isWatched) onAddWatched(newWatchedMovie);
    onClose();
  }

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

  useEffect(
    function () {
      if (!title) return;
      document.title = `Movie | ${title}`;

      // cleanup function: executed when the component is unmounted
      return function () {
        document.title = "🍿Use Popcorn";
      };
    },
    [title]
  );

  useEffect(
    function () {
      function cleanupCallback(e) {
        if (e.code === "Escape") onClose();
      }

      document.addEventListener("keydown", cleanupCallback);

      // cleanup function
      return function () {
        document.removeEventListener("keydown", cleanupCallback);
      };
    },
    [onClose]
  );

  return (
    <MoviesBox>
      {isLoading ? (
        <Info className="loader">Loading...</Info>
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
            <div className="rating">
              {!isWatched ? (
                <>
                  <StarRating maxRating={10} onSetRating={setUserRating} />
                  {userRating > 0 && (
                    <button className="btn-add" onClick={handleAdd}>
                      Add to list
                    </button>
                  )}
                </>
              ) : (
                <p>
                  You rated this movie {currMovieRating} <span>⭐️</span>
                </p>
              )}
            </div>
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
