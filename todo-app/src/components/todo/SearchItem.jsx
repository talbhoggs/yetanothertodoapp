import TodoComponentContext from "./context/TodoComponentContext";
import { useContext } from "react";
export default function SearchItem() {
  const {search, setSearch} = useContext(TodoComponentContext)
  function handleSearchOnChange(e) {
    e.preventDefault();
    setSearch(e.target.value);
  }

  return (
    <>
      <input
        type="text"
        className="form-control"
        id="search"
        placeholder="Search: Todos"
        onChange={handleSearchOnChange}
        value={search}
      />
    </>
  );
}
