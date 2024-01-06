import TodoItem from "./TodoItem";
import TodoComponentContext from "./context/TodoComponentContext";
import { useContext } from "react";
export default function TodoList() {
  const {searchResults:todos} = useContext(TodoComponentContext);
  return (
    <>
    {(todos.length == 0) ? <p>No results found</p> :
    <table className="table">
      <thead>
        <tr>
          <th scope="col"></th>
          <th scope="col">Description</th>
          <th scope="col">Target Date</th>
          <th scope="col">Action</th>
        </tr>
      </thead>
      <tbody>
        {todos.map((item) => (
          <TodoItem
            key={item.id}
            item={item}
          />
        ))}
      </tbody>
    </table>
    }
      </>
  );
}
