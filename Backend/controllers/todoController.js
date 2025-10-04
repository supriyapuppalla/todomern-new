const Todo = require("../Models/Todo");
const mongoose = require("mongoose");

exports.getTodos = async (req, res) => {
  const todos = await Todo.find().sort({ createdAt: -1 });
  if (!todos) {
    return res.status(400).json({ error: "No todos found" });
  }
  res.status(200).json(todos);
};

exports.getTodo = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "No such todo" });
  }
  const todo = await Todo.findById(id);
  if (!todo) {
    return res.status(404).json({ error: "No Such todo" });
  }
  res.status(200).json(todo);
};

exports.createTodo = async (req, res) => {
  const { task } = req.body;
  if (!task) {
    return res.status(400).json({
      error: "Task is required",
    });
  }
  const todo = await Todo.create({ task, done: false });
  res.status(200).json(todo);
};

exports.deleteTodo = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "No such todo" });
  }
  try {
    const todo = await Todo.findByIdAndDelete(id);
    if (!todo) {
      return res.status(404).json({ error: "No such todo" });
    }
    res.status(200).json(todo);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.updateTodo = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "No such todo" });
  }
  try {
    const todo = await Todo.findByIdAndUpdate(id, req.body, { new: true });
    if (!todo) {
      return res.status(404).json({
        error: "no such todo",
      });
      res.json(200).json(todo);
    }
  } catch (error) {
    res.status(400).json({
      error: error.message,
    });
  }
};
