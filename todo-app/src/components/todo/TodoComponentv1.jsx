import { useEffect, useState } from "react";
import TodoList from "./TodoList";
import SearchItem from "./SearchItem";
import AddTodoComponent from "./AddTodoComponent";
function TodoComponent() {
  // v1 array
  /* const [todos, setTodos] = useState([
    //{ id: 1, description: "Learn AWS", isDone: true, targetDate: "2023-12-23" },
    { "id": 1, "description": "Learn AWS", "isDone": true, "targetDate": "2023-12-23" },
    { "id": 2, "description": "Learn React", "isDone": true, "targetDate": "2023-12-23" }
  ]);
 */

  // v2 local storage
  const [todos, setTodos] = useState(
    JSON.parse(localStorage.getItem("todos")) || [],
  );

  // this useEffect will run when there is an update to the todo state
  // so if the state is updated localstorage will all be updated
  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  const [search, setSearch] = useState("");
  const [hideAddForm, setHideAddForm] = useState(false);

  // v3 using fetch api
  /*
  const [todos, setTodos] = useState([]);

  // this useEffect will run when there is an update to the todo state
  // so if the state is updated localstorage will all be updated
  const API_URL = "http://localhost:3500/todos";
  useEffect(() => {
    const fetchTodos = async () => {
      try {
        const response = await fetch(API_URL);
        if (!response.ok) throw Error('Did not receive expected data');
        const listTodos = await response.json();

        console.log(listTodos)
        setTodos(listTodos);
        //setFetchError(null);
      } catch (err) {
        //setFetchError(err.message);
        console.log(err)
      } finally {
        //setIsLoading(false);
      }
    }

    setTimeout(() => fetchTodos(), 2000);
  }, []);
  
  */

  /*

        <div className="col-11">
          <SearchItem search={search}
          setSearch={setSearch}
          />
        </div>
        <div className="col">
          <button className="btn btn-primary" onClick={()=> setHideAddForm(!hideAddForm)}>
            +
          </button>
        </div>
        
*/
  return (
    <div className="todoComponent container">
      <div className="row">
        <div className="col-11">
          <SearchItem search={search} setSearch={setSearch} />
        </div>
        <div className="col">
          <button
            className="btn btn-primary"
            onClick={() => setHideAddForm(!hideAddForm)}
          >
            +
          </button>
        </div>
      </div>
      <div className="row">
        <div className="col">
          <TodoList
            todoState={todos}
            setTodos={setTodos}
            todos={todos.filter((item) =>
              item.description.toLowerCase().includes(search.toLowerCase()),
            )}
          />

          {hideAddForm && (
            <AddTodoComponent
              todos={todos}
              setTodos={setTodos}
              showAddForm={() => setHideAddForm(!hideAddForm)}
            />
          )}
        </div>
      </div>
    </div>
  );
}
export default TodoComponent;
