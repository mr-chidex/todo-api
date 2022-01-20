import { RequestHandler } from "express";
import { Todo } from "../models/todos";

const TODOS: Todo[] = [];

export const createTodo: RequestHandler = (req, res) => {
  const todotext = (req.body as { text: string }).text;

  const newTodo = new Todo(Date.now().toString(), todotext);
  TODOS.push(newTodo);

  res.status(201).json({ message: "created", cratedTodo: newTodo });
};

export const getTodos: RequestHandler = (req, res) => {
  res.json({ todos: TODOS });
};

export const deleteTodo: RequestHandler<{ id: string }> = (req, res) => {
  const id = req.params.id;

  const todoIndex = TODOS.findIndex((todo) => todo.id === id);

  if (todoIndex < 0) throw new Error("could not find todo with id");

  TODOS.splice(todoIndex, 1);

  res.json({ message: "deleted", status: "success", todos: TODOS });
};

export const updateTodo: RequestHandler<{ id: string }> = (req, res) => {
  const id = req.params.id;

  const todoIndex = TODOS.findIndex((todo) => todo.id === id);

  if (todoIndex < 0) throw new Error("could not find todo with id");

  const newUpdate = (req.body as { text: string }).text;

  const updatedTodo = new Todo(id, newUpdate);

  TODOS[todoIndex] = updatedTodo;

  res.json({ message: "updated", updatedTodo });
};
