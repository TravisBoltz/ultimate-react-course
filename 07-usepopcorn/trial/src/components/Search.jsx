import { useRef } from "react";
import { useKey } from "../hooks/useKey";
//Search
export default function Search({ query, setQuery }) {
  //using ref to access the input element to set the searchbar to focus

  const inputEl = useRef(null);

  useKey("Enter", function () {
    if (document.activeElement === inputEl.current) return;
    inputEl.current.focus();
    setQuery("");
  });

  return (
    <input
      className="search"
      type="text"
      placeholder="Search movies..."
      value={query}
      onChange={(e) => setQuery(e.target.value)}
      ref={inputEl}
    />
  );
}
