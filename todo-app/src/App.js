import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Components from "./components/basics/Components";
import TodoApp from "./components/todo/TodoApp";
function App() {
  return (
    <div className="App">
     <TodoApp /> 
    </div>
  );
}
/*
function App() {
  return (
    <div className="App">
      <PropsExample property1="value1" property2="value2" />
   </div>
  );
}

function PropsExample1(properties) {
  console.log(properties.property1);
  console.log(properties.property2);
  return(<div></div>);
}


function PropsExample({property1, property2}) {
  console.log(property1);
  console.log(property2);
  return(<div></div>);
}
*/
//function App() {
//return (
//<div className="App">
//<BasicComponent />
//</div>
//);
//}

export default App;
