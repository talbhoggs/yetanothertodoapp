import { useRef, useState, useContext} from "react";
import {saveItem} from "./apiclient";
import TodoComponentContext from "./context/TodoComponentContext";
export default function AddTodoComponent(/*{ todos, setTodos, showAddForm }*/) {
  const {todos, setTodos, setHideAddForm, hideAddForm} = useContext(TodoComponentContext);
  const inputUseRef = useRef();
  const [description, setDescription] = useState("");
  const [targetDate, setTargetDate] = useState("");

  function handleDescriptionOnChange(e) {
    setDescription(e.target.value);
  }
  
  function handleTargetDate(e) {
    setTargetDate(e.target.value);
  }

  async function handleAddTodo(e) {
    e.preventDefault();

    const isValid = description.length !== 0 && targetDate.length !== 0;
    if (!isValid) {
      alert("Description and Target Date are required fields!");
    } else {
      const newTodo = {
        id: crypto.getRandomValues(new Uint32Array(10))[0],
        description: description,
        isDone: false,
        targetDate: targetDate,
      };
      const res = await saveItem(newTodo);
      if(res) {
        alert(res);
      } else {
        setTodos([...todos, newTodo]);
        setDescription("");
        setTargetDate("");
        setHideAddForm(!hideAddForm)
      }
    }
  }

  return (
    <form onSubmit={handleAddTodo}>
      <div className="input-group">
        <span className="input-group-text">Add Todo</span>
        <input
          autoFocus
          ref={inputUseRef}
          type="text"
          aria-label="Description"
          className="form-control"
          onChange={handleDescriptionOnChange}
          value={description}
        />
        <input
          type="date"
          aria-label="Target Date"
          className="form-control"
          onChange={handleTargetDate}
          onKeyDown={(e) => {
            //
            if (e.key === "Enter") inputUseRef.current.focus();
          }}
          value={targetDate}
        />
      </div>
    </form>
  );
}
