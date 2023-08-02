import { useState } from "react";
import Button from "./MainComponents/Button";
import MovieList from "./MainComponents/MovieList";

export default function Main({ children }) {
  return <main className="main">{children}</main>;
}

export function MoviesBox({ children }) {
  const [isOpen1, setIsOpen1] = useState(true);

  function handleToggle() {
    setIsOpen1((open) => !open);
  }
  return (
    <div className="box">
      <Button isOpen={isOpen1} onToggle={handleToggle} />
      {isOpen1 && children}
    </div>
  );
}

export function WatchedBox() {
  const tempWatchedData = [
    {
      imdbID: "tt1375666",
      Title: "Inception",
      Year: "2010",
      Poster:
        "https://m.media-amazon.com/images/M/MV5BMjAxMzY3NjcxNF5BMl5BanBnXkFtZTcwNTI5OTM0Mw@@._V1_SX300.jpg",
      runtime: 148,
      imdbRating: 8.8,
      userRating: 10,
    },
    {
      imdbID: "tt0088763",
      Title: "Back to the Future",
      Year: "1985",
      Poster:
        "https://m.media-amazon.com/images/M/MV5BZmU0M2Y1OGUtZjIxNi00ZjBkLTg1MjgtOWIyNThiZWIwYjRiXkEyXkFqcGdeQXVyMTQxNzMzNDI@._V1_SX300.jpg",
      runtime: 116,
      imdbRating: 8.5,
      userRating: 9,
    },
  ];
  const [isOpen2, setIsOpen2] = useState(true);
  const [watched, setWatched] = useState(tempWatchedData);

  function handleToggle() {
    setIsOpen2((open) => !open);
  }

  return (
    <div className="box">
      <Button isOpen={isOpen2} onToggle={handleToggle} />
      {isOpen2 && (
        <>
          <WatchedSummary watched={watched} />
          <MovieList movies={watched} type="watched" />
        </>
      )}
    </div>
  );
}

function WatchedSummary({ watched }) {
  const average = (arr) =>
    arr.reduce((acc, cur, i, arr) => acc + cur / arr.length, 0);
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
