export default function AddTodo() {
   return (
      <form className="addform">
         <div className="add-todo">
            <span>+ </span> <input type="text" placeholder="Add Todo:" />
         </div>
         <div className="due-date">
            <span>
               Due Date : <input type="date" />
            </span>
            <input type="button" value="Add" />
         </div>
      </form>
   );
}
