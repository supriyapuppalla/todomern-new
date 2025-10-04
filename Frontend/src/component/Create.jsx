import React from "react";
import { useState } from "react";
import axios from "axios";

function Create({ onAdd }) {
  const [task, setTask] = useState("");
  const handleAdd = () => {
    if (!task.trim()) return;
    axios.post("http://localhost:3001/api/todos", { task }).then((res) => {
      onAdd(res.data);
      setTask("");
    });
  };

  return (
    <div className="create_form">
      <input
        type="text"
        placeholder="Enter Task"
        onChange={(e) => setTask(e.target.value)}
      />
      <button type="button" onClick={handleAdd}>
        Add
      </button>
    </div>
  );
}

export default Create;
