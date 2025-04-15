import React, { useState } from "react";
import "./Todo-list.css";

function TodoList() {
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState("");

  const handleAddTodo = (e) => {
    e.preventDefault();
    if (newTodo.trim()) {
      setTodos([...todos, { text: newTodo, completed: false }]);
      setNewTodo("");
    }
  };

  const toggleTodo = (index) => {
    const updated = [...todos];
    updated[index].completed = !updated[index].completed;
    setTodos(updated);
  };

  const handleDeleteTodo = (index) => {
    const updated = [...todos];
    updated.splice(index, 1);
    setTodos(updated);
  };

  return (
    <div>
      <h3>You are not assigned to any projects.</h3>
      <p>You can still keep track of your tasks:</p>
      <div className="todo-container">
        <form onSubmit={handleAddTodo} className="todo-form">
          <input
            type="text"
            value={newTodo}
            onChange={(e) => setNewTodo(e.target.value)}
            placeholder="Add a task..."
            className="todo-input"
          />
          <button type="submit" className="todo-add-button">
            Add task
          </button>
        </form>
        <ul className="todo-list">
          {todos.map((todo, index) => (
            <li
              key={index}
              className={`todo-item ${todo.completed ? "completed" : ""}`}
            >
              <span onClick={() => toggleTodo(index)}>{todo.text}</span>
              <button
                className="todo-remove-button"
                onClick={() => handleDeleteTodo(index)}
              >
                Remove
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default TodoList;
