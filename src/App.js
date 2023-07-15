import { useEffect, useState } from "react";
import Todo from "./components/Todo";
import { addTodo, deleteTodo, getAllTodo, updateTodo } from "./api/HandleApi";

function App() {

  const [todo, setTodo] = useState([]);
  const [text, setText] = useState("");
  const [isUpdating, setIsUpdating] = useState(false)
  const [todoId, setTodoId] = useState("");
  const [check, setCheck] = useState(false)

  useEffect(() => {
    getAllTodo(setTodo)
  }, [])

  const UpdateTodo = (_id, text) => {
    if (text) {
      setIsUpdating(true)
      setText(text)
      setTodoId(_id)
      setCheck(false)
    } else {
      setCheck(true)
    }
  }

  return (
    <div className="App">
      <div className="container">
        <h1>ToDo App</h1>
        <div className="top">
          <form>
          <input type="text"
            placeholder="Add ToDos..."
            value={text}
            onChange={(e) => setText(e.target.value)}
            required
          />
          <button type="submit" className="add" onClick={isUpdating ?
            (e) => {
              e.preventDefault();
              updateTodo(todoId, text, setTodo, setText, setIsUpdating,setCheck)} :
            (e) =>{
              e.preventDefault();
              addTodo(text, setText, setTodo,setCheck)}}
          >
            {isUpdating ? "Update" : "Add"}
          </button>
          </form>
          <div>
            {!text && check && <span className="validate">Required</span>}
          </div>
          <div className="list">
            {todo.map(item => <Todo key={item._id} text={item.text} updateTodo={() => UpdateTodo(item._id, item.text)}
              deleteTodo={() => deleteTodo(item._id, setTodo)}
            />
            )}

          </div>
        </div>
      </div>
      );
}

      export default App;
