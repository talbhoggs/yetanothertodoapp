import { useContext } from "react";
import TodoList from "./TodoList";
import SearchItem from "./SearchItem";
import AddTodoComponent from "./AddTodoComponent";
import TodoComponentContext
 from "./context/TodoComponentContext";
function TodoComponent() {
  const{setHideAddForm, hideAddForm, isLoading, fetchError} = useContext(TodoComponentContext); 
  return (
    <div className="todoComponent container">
      <div className="row">
        <div className="col-11">
          <SearchItem />
        </div>
        <div className="col">
          <button className="btn btn-primary" onClick={()=> setHideAddForm(!hideAddForm)}>
            +
          </button>
        </div>
      </div>
      <div className="row">
        <div className="col">
        {isLoading && <p>Loading ...</p>}
        {fetchError && <p style={{ color: "red" }}>{`Error: ${fetchError}`}</p>}
          {!fetchError && !isLoading && ( 
          <TodoList
           /> 
          )}
          {hideAddForm && (
            <AddTodoComponent />
          )}
        </div>
      </div>
    </div>
  );
}
export default TodoComponent;
