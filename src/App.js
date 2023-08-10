import { useState } from "react";
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

  fetch(`http://www.omdbapi.com/?apikey=${KEY.key}&s=interstellar`)
    .then((res) => res.json)
    .then((data) => console.log(data.toString));

  return (
    <>
      <NavBar>
        <Search />
        <NumResult movies={movies} />
      </NavBar>
      <Main>
        <MoviesBox>
          <MovieList movies={movies} type="all"></MovieList>
        </MoviesBox>
        <WatchedBox />
      </Main>
    </>
  );
}
