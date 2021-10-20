import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./App.css";
import { RootState } from "./app/store";
import TaskCard from "./components/TaskCard";
import { addTodo } from "./features/todoSlice";

function App() {
  const dispatch = useDispatch();
  const todos = useSelector((state: RootState) => state.todos.value);
  const [todoInput, setTodoInput] = useState("");

  const handleTodos = () => {
    if (todoInput !== "") {
      dispatch(addTodo(todoInput));
    }
    setTodoInput("");
  };

  return (
    <div className="App">
      <h1>To-do List</h1>
      <div className="input-container">
        <input
          type="text"
          value={todoInput}
          onChange={(e) => {
            setTodoInput(e.target.value);
          }}
          onKeyPress={(e) => {
            if (e.key === "Enter") {
              handleTodos();
            }
          }}
        />
        <button className="add" onClick={handleTodos}>
          Add
        </button>
      </div>

      <div className="output-container">
        {todos.map((todo, index) => {
          return <TaskCard task={todo} index={index} key={index} />;
        })}
      </div>
    </div>
  );
}

export default App;
