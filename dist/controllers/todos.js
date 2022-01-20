"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateTodo = exports.deleteTodo = exports.getTodos = exports.createTodo = void 0;
const todos_1 = require("../models/todos");
const TODOS = [];
const createTodo = (req, res) => {
    const todotext = req.body.text;
    const newTodo = new todos_1.Todo(Date.now().toString(), todotext);
    TODOS.push(newTodo);
    res.status(201).json({ message: "created", cratedTodo: newTodo });
};
exports.createTodo = createTodo;
const getTodos = (req, res) => {
    res.json({ todos: TODOS });
};
exports.getTodos = getTodos;
const deleteTodo = (req, res) => {
    const id = req.params.id;
    const todoIndex = TODOS.findIndex((todo) => todo.id === id);
    if (todoIndex < 0)
        throw new Error("could not find todo with id");
    TODOS.splice(todoIndex, 1);
    res.json({ message: "deleted", status: "success", todos: TODOS });
};
exports.deleteTodo = deleteTodo;
const updateTodo = (req, res) => {
    const id = req.params.id;
    const todoIndex = TODOS.findIndex((todo) => todo.id === id);
    if (todoIndex < 0)
        throw new Error("could not find todo with id");
    const newUpdate = req.body.text;
    const updatedTodo = new todos_1.Todo(id, newUpdate);
    TODOS[todoIndex] = updatedTodo;
    res.json({ message: "updated", updatedTodo });
};
exports.updateTodo = updateTodo;
