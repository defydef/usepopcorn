import { useEffect, useState } from "react";
import { NavBar, NumResult, Search } from "./NavBar";
import Main from "./Main";
import MovieList from "./MainComponents/MovieList";
import { MoviesBox, WatchedBox } from "./Main";
import KEY from "./config/keys.json";

export default function App() {
  const tempMovieData = [
    {
      imdbID: "tt1375666",
      Title: "Inception",
      Year: "2010",
      Poster:
        "https://m.media-amazon.com/images/M/MV5BMjAxMzY3NjcxNF5BMl5BanBnXkFtZTcwNTI5OTM0Mw@@._V1_SX300.jpg",
    },
    {
      imdbID: "tt0133093",
      Title: "The Matrix",
      Year: "1999",
      Poster:
        "https://m.media-amazon.com/images/M/MV5BNzQzOTk3OTAtNDQ0Zi00ZTVkLWI0MTEtMDllZjNkYzNjNTc4L2ltYWdlXkEyXkFqcGdeQXVyNjU0OTQ0OTY@._V1_SX300.jpg",
    },
    {
      imdbID: "tt6751668",
      Title: "Parasite",
      Year: "2019",
      Poster:
        "https://m.media-amazon.com/images/M/MV5BYWZjMjk3ZTItODQ2ZC00NTY5LWE0ZDYtZTI3MjcwN2Q5NTVkXkEyXkFqcGdeQXVyODk4OTc3MTY@._V1_SX300.jpg",
    },
  ];
  const [movies, setMovies] = useState(tempMovieData);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const query = "finding";
  const errorMessage = "Something went wrong when fetching the movies";

  useEffect(function () {
    try {
      async function fetchMovies() {
        setIsLoading(true);
        let res = {};
        try {
          res = await fetch(
            `http://www.omdbapi.com/?apikey=${KEY.key}&s=${query}`
          );
        } catch (e) {
          setError(e.message);
        }
        if (res.ok) {
          const data = await res.json();
          setMovies(() => data.Search);
          setIsLoading(false);
        } else {
          setError(errorMessage);
        }
      }
      fetchMovies();
    } catch (e) {
      setError(e.message);
    }
  }, []); // if we use [], it means that the data fetching is done only after the component mounts (initial render)

  return (
    <>
      <NavBar>
        <Search />
        <NumResult movies={movies} />
      </NavBar>
      <Main>
        <MoviesBox>
          {!isLoading && !error && (
            <MovieList movies={movies} type="all"></MovieList>
          )}
          {isLoading && !error && <Loader />}
          {error && <ErrorMessage message={error} />}
        </MoviesBox>
        <WatchedBox />
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
