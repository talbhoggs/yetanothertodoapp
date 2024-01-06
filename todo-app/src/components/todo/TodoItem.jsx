import { useRef, useState, useContext } from "react";
import { deleteItem, updateItem } from "./apiclient";
import TodoComponentContext from "./context/TodoComponentContext";
export default function TodoItem({ item }) {
  const {todos, setTodos} = useContext(TodoComponentContext);
  const [description, setDescription] = useState(item.description);
  const [targetDate, setTargetDate] = useState(item.targetDate);
  const [isEditing, setIsEditing] = useState(false);

  const inputUseRef = useRef();

  function handleDescriptionUpdate(e) {
    setDescription(e.target.value);
  }

  function handleTargetDateUpdate(e) {
    setTargetDate(e.target.value);
  }

  async function handleOnChange(itemId) {
    const res = await updateItem(itemId, { isDone: !item.isDone });
    if (res) alert(res);
    else {
      const todosMod = todos.map((item) =>
        item.id === itemId ? { ...item, isDone: !item.isDone } : item,
      );
      setTodos(todosMod);
    }
  }

  async function handleDelete(itemId) {
    const res = await deleteItem(itemId);
    if (res) {
      alert(res);
    } else {
      const todosMod = todos.filter((item) => item.id !== itemId);
      setTodos(todosMod);
    }
  }

  async function handleUpdateTodo(e, item) {
    e.preventDefault();
    const isValid = description.length !== 0 && targetDate.length !== 0;
    if (!isValid) {
      alert("Description and Target Date are required fields!");
    } else {
      const updatedItem = {
        ...item,
        description: description,
        targetDate: targetDate,
      };

      const res = await updateItem(item.id, updatedItem);
      if (res) {
        alert(res);
      } else {
        const updatedTodos = todos.map((item) => {
          if (item.id === updatedItem.id) {
            item = updatedItem;
          }
          return item;
        });
        setTodos(updatedTodos);
        setIsEditing(!isEditing);
      }
    }
  }

  const [toggleButtonState, setToggleButtons] = useState(
    new Array(todos.length).fill(false),
  );

  const toggleButton = (index) => {
    console.log(">>>> " + index)
    const newToggleButton = [...toggleButtonState];
    newToggleButton[index] = !newToggleButton[index];
    setToggleButtons(newToggleButton);
    console.log(newToggleButton)
  };
  return (
    <>
      {!isEditing && (
        <tr>
          <th scope="row">
            <input
              className="form-check-input"
              type="checkbox"
              checked={item.isDone}
              onChange={() => handleOnChange(item.id)}
            />
          </th>
          <td>{item.description}</td>
          <td>{item.targetDate}</td>

          <td>
            <a onClick={() => handleDelete(item.id)}>Delete</a>{" "}
            <a onClick={() => setIsEditing(!isEditing)}>Edit</a>
          </td>
        </tr>
      )}
      {isEditing && (
        <tr border="1">
          <th scope="row" style={{ width: 75 }}>
            <input
              className="form-check-input"
              type="checkbox"
              checked={item.isDone}
              onChange={() => handleOnChange(item.id)}
            />
          </th>
          <td colSpan="2">
            <form onSubmit={(e) => handleUpdateTodo(e, item)}>
              <input
                autoFocus
                style={{ width: 210, display: "inline" }}
                className="form-control"
                type="text"
                ref={inputUseRef}
                aria-label="description"
                value={description}
                onChange={handleDescriptionUpdate}
              />
              <input
                id="dateField"
                type="date"
                style={{ width: 210, display: "inline" }}
                className="form-control"
                aria-label="target date"
                value={targetDate}
                onChange={handleTargetDateUpdate}
                onKeyDown={(e) => {
                  //
                  if (e.key === "Enter") inputUseRef.current.focus();
                }}
              />
            </form>
          </td>
          <td>
            <a onClick={() => handleDelete(item.id)}>Delete</a>{" "}
            <a onClick={() => setIsEditing(!isEditing)}>Edit</a>
          </td>
        </tr>
      )}
    </>
  );
}
