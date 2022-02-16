"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateTodo = exports.deleteTodo = exports.getTodos = exports.createTodo = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const todos_1 = require("../models/todos");
/**
 * @route POST /api/v1/todos
 * @desc add new task to do list
 */
const createTodo = async (req, res) => {
    const body = req.body;
    const todo = new todos_1.Todo({ text: body.text });
    await todo.save();
    res.status(201).json({ message: "created", todo });
};
exports.createTodo = createTodo;
/**
 * @route GET  /api/v1/todos
 * @desc get all todo task
 */
const getTodos = async (_, res) => {
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
    if (!mongoose_1.default.isValidObjectId(id))
        return res.status(400).json({ message: "invalid todo id" });
    const todo = await todos_1.Todo.findById(id);
    if (!todo)
        return res.status(400).json({ message: "todo with id not found" });
    await todos_1.Todo.deleteOne({ _id: id });
    res.json({ message: "deleted", status: "success", todo });
};
exports.deleteTodo = deleteTodo;
/**
 * @route PATCH  /api/v1/todos/:id
 * @desc update todo task in do list
 */
const updateTodo = async (req, res) => {
    const id = req.params.id;
    if (!mongoose_1.default.isValidObjectId(id))
        return res.status(400).json({ message: "invalid todo id" });
    const todo = await todos_1.Todo.findById(id);
    if (!todo)
        return res.status(400).json({ message: "todo with id not found" });
    const body = req.body;
    todo.text = body.text || todo.text;
    await todo.save();
    res.json({ message: "updated", todo });
};
exports.updateTodo = updateTodo;
