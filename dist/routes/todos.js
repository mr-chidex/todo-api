"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_promise_router_1 = __importDefault(require("express-promise-router"));
const router = (0, express_promise_router_1.default)();
const todos_1 = require("../controllers/todos");
router.route("/").get(todos_1.getTodos).post(todos_1.createTodo);
router.route("/:id").patch(todos_1.updateTodo).delete(todos_1.deleteTodo);
exports.default = router;
