import { RequestHandler } from "express";
import { Todo } from "../models/todos";

/**
 * @route POST /api/v1/todos
 * @desc add new task to do list
 */
export const createTodo: RequestHandler = (req, res) => {
  const todotext = (req.body as { text: string }).text;

  const newTodo = new Todo(todotext);

  res.status(201).json({ message: "created", cratedTodo: newTodo });
};

/**
 * @route GET  /api/v1/todos
 * @desc get all todo task
 */
export const getTodos: RequestHandler = async (req, res) => {
  const todos = await Todo.find();
  res.json({ todos });
};

/**
 * @route DELETE  /api/v1/todos/:id
 * @desc delete todo task from do list
 */
export const deleteTodo: RequestHandler<{ id: string }> = async (req, res) => {
  const { id } = req.params;

  const todo = await Todo.findById(id);

  if (!todo) return res.status(400).json({ message: "todo with id not found" });

  res.json({ message: "deleted", status: "success", todo });
};

/**
 * @route PUT  /api/v1/todos/:id
 * @desc update todo task in do list
 */
export const updateTodo: RequestHandler<{ id: string }> = async (req, res) => {
  const id = req.params.id;

  const todo = await Todo.findById(id);

  if (!todo) return res.status(400).json({ message: "todo with id not found" });

  const body = req.body as { text: string };

  todo.text = body.text || todo.text;

  await todo.save();

  res.json({ message: "updated", todo });
};
