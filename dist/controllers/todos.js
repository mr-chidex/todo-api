"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateTodo = exports.deleteTodo = exports.getTodos = exports.createTodo = void 0;
const todos_1 = require("../models/todos");
/**
 * @route POST /api/v1/todos
 * @desc add new task to do list
 */
const createTodo = (req, res) => {
    const todotext = req.body.text;
    const newTodo = new todos_1.Todo(todotext);
    res.status(201).json({ message: "created", cratedTodo: newTodo });
};
exports.createTodo = createTodo;
/**
 * @route GET  /api/v1/todos
 * @desc get all todo task
 */
const getTodos = async (req, res) => {
    const todos = await todos_1.Todo.find();
    res.json({ todos });
};
exports.getTodos = getTodos;
/**
 * @route DELETE  /api/v1/todos/:id
 * @desc delete todo task from do list
 */
const deleteTodo = async (req, res) => {
    const { id } = req.params;
    const todo = await todos_1.Todo.findById(id);
    if (!todo)
        return res.status(400).json({ message: "todo with id not found" });
    res.json({ message: "deleted", status: "success", todo });
};
exports.deleteTodo = deleteTodo;
/**
 * @route PUT  /api/v1/todos/:id
 * @desc update todo task in do list
 */
const updateTodo = async (req, res) => {
    const id = req.params.id;
    const todo = await todos_1.Todo.findById(id);
    if (!todo)
        return res.status(400).json({ message: "todo with id not found" });
    const body = req.body;
    todo.text = body.text || todo.text;
    await todo.save();
    res.json({ message: "updated", todo });
};
exports.updateTodo = updateTodo;
