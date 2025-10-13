import React, { useState, useEffect } from "react";
import Create from "./Create";
import axios from "axios";
import {
  BsFillTrashFill,
  BsCircleFill,
  BsFillCheckCircleFill,
} from "react-icons/bs";

function Home() {
  const [todos, setTodos] = useState([]);
  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_API_URL}/api/todos`)
      .then((res) => setTodos(res.data));
  }, []);

  const handleEdit = (id) => {
    axios.put(`${process.env.REACT_APP_API_URL}/api/todos/${id}`).then(() => {
      setTodos(todos.map((todo) => (todo._id === id ? res.data : todo)));
    });
  };

  const handleDelete = (id) => {
    axios
      .delete(`${process.env.REACT_APP_API_URL}/api/todos/${id}`)
      .then(() => {
        setTodos(todos.filter((todo) => todo._id !== id));
      });
  };

  const handleAdd = (newTodo) => {
    setTodos([...todos, newTodo]);
  };

  return (
    <div className="home">
      <h2>To Do List</h2>
      <Create onAdd={handleAdd} />

      {todos.length === 0 ? (
        <h2>No Records</h2>
      ) : (
        todos.map((todo) => (
          <div className="task" key={todo._id}>
            <div className="checkbox" onClick={() => handleEdit(todo._id)}>
              {todo.done ? (
                <BsFillCheckCircleFill className="icon" />
              ) : (
                <BsCircleFill className="icon" />
              )}
              <p className={todo.done ? "line_through" : ""}>{todo.task}</p>
            </div>
            <span onClick={() => handleDelete(todo._id)}>
              <BsFillTrashFill className="icon" />
            </span>
          </div>
        ))
      )}
    </div>
  );
}

export default Home;
