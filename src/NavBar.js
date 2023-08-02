import { useState } from "react";

export function NavBar({ children }) {
  const [query, setQuery] = useState("");
  function handleSearch(searchQuery) {
    setQuery(searchQuery);
  }
  return (
    <nav className="nav-bar">
      <Logo />
      <Search query={query} onSearch={handleSearch} />
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

function Search({ query, onSearch }) {
  return (
    <input
      className="search"
      type="text"
      placeholder="Search movies..."
      value={query}
      onChange={(e) => onSearch(e.target.value)}
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
