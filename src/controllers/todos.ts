import { RequestHandler } from "express";
import mongoose from "mongoose";

import { Todo } from "../models/todos";

/**
 * @route POST /api/v1/todos
 * @desc add new task to do list
 */
export const createTodo: RequestHandler = async (req, res) => {
  const body = req.body as { text: string };

  const todo = new Todo({ text: body.text });

  await todo.save();

  res.status(201).json({ message: "created", todo });
};

/**
 * @route GET  /api/v1/todos
 * @desc get all todo task
 */
export const getTodos: RequestHandler = async (_, res) => {
  const todos = await Todo.find();
  res.json({ todos });
};

/**
 * @route DELETE  /api/v1/todos/:id
 * @desc delete todo task from do list
 */
export const deleteTodo: RequestHandler<{ id: string }> = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.isValidObjectId(id))
    return res.status(400).json({ message: "invalid todo id" });

  const todo = await Todo.findById(id);

  if (!todo) return res.status(400).json({ message: "todo with id not found" });

  await Todo.deleteOne({ _id: id });

  res.json({ message: "deleted", status: "success", todo });
};

/**
 * @route PATCH  /api/v1/todos/:id
 * @desc update todo task in do list
 */
export const updateTodo: RequestHandler<{ id: string }> = async (req, res) => {
  const id = req.params.id;

  if (!mongoose.isValidObjectId(id))
    return res.status(400).json({ message: "invalid todo id" });

  const todo = await Todo.findById(id);

  if (!todo) return res.status(400).json({ message: "todo with id not found" });

  const body = req.body as { text: string };

  todo.text = body.text || todo.text;

  await todo.save();

  res.json({ message: "updated", todo });
};
