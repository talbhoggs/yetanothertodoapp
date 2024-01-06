import { createContext, useState, useEffect } from 'react';

const TodoComponentContext = createContext();

export default TodoComponentContext;

export function TodoComponentProvider({children}) {

  const [todos, setTodos] = useState([]);
  const [search, setSearch] = useState("");
  const [searchResults, setSearchResults] = useState([]);

  const API_URL = "http://localhost:3500/todos";
/*
  let initialState = {
    todos : [],
    search: "",
    isLoading: true,
    hideAddForm: false,
    fetchError: null
  }
  
  function reducer(state, action) {

    switch(action.type) {
      case "add":
        return {}
      case "update":
        return {}
      case "delete":
        return {}
      case "search":
        return {}
      case "setLoading":
        return {}
      case "setAddFormVisibility":
        return {}
      case "setError":
        return {}
      default:
        throw Error("Error")
    }

  }
*/
  useEffect(()=>{
    const filteredResults = todos.filter((item) =>
              item.description.toLowerCase().includes(search.toLowerCase())
            );
    setSearchResults(filteredResults);
  
  }, [todos, search]); 
  
  useEffect(() => {
    const fetchTodos = async () => {
      try {
        const response = await fetch(API_URL);
        if (!response.ok) throw Error('Did not receive expected data');
        const listTodos = await response.json();
        setTodos(listTodos);
        setFetchError(null);
      } catch (err) {
        setFetchError(err.message);
      } finally {
        setIsLoading(false);
      }
    }

    setTimeout(() => fetchTodos(), 2000);
  }, []);
  
  const [fetchError, setFetchError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [hideAddForm, setHideAddForm] = useState(false);

    return(
        <TodoComponentContext.Provider value={{todos, setTodos, search, setSearch, fetchError, setFetchError, isLoading, setIsLoading, hideAddForm, setHideAddForm, searchResults}}>
{children}
        </TodoComponentContext.Provider>
    )
}