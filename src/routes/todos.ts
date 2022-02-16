import express from "express-promise-router";

const router = express();

import {
  createTodo,
  getTodos,
  deleteTodo,
  updateTodo,
} from "../controllers/todos";

router.route("/").get(getTodos).post(createTodo);
router.route("/:id").patch(updateTodo).delete(deleteTodo);

export default router;
