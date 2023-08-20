import { useEffect, useRef } from "react";
import { useKey } from "./useKey";

export function NavBar({ children }) {
  return (
    <nav className="nav-bar">
      <Logo />
      {children}
    </nav>
  );
}

function Logo() {
  return (
    <div className="logo">
      <span role="img">🍿</span>
      <h1>usePopcorn</h1>
    </div>
  );
}

export function Search({ query, onSearch, onClearQuery }) {
  const inputEl = useRef(null);

  useKey(function () {
    if (document.activeElement === inputEl.current) return;
    inputEl.current.focus();
    onClearQuery();
  }, "Enter");
  // useEffect(
  //   function () {
  //     function callback(e) {

  //       if (e.code === "Enter") {
  // if (document.activeElement === inputEl.current) return;
  //         inputEl.current.focus();
  //         onClearQuery();
  //       }
  //     }
  //     document.addEventListener("keydown", callback);
  //     inputEl.current.focus();

  //     // cleanup effect
  //     return () => document.removeEventListener("keydown", callback);
  //   },
  //   [onClearQuery]
  // );

  return (
    <input
      className="search"
      type="text"
      placeholder="Search movies..."
      value={query}
      onChange={(e) => onSearch(e.target.value)}
      ref={inputEl}
    />
  );
}

export function NumResult({ movies }) {
  return (
    <p className="num-results">
      Found <strong>{movies.length}</strong> results
    </p>
  );
}
