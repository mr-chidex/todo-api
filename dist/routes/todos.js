"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const todos_1 = require("../controllers/todos");
const router = (0, express_1.Router)();
router.route("/").get(todos_1.getTodos).post(todos_1.createTodo);
router.route("/:id").patch(todos_1.updateTodo).delete(todos_1.deleteTodo);
exports.default = router;
