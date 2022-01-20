import { Router } from "express";

import {
  createTodo,
  getTodos,
  deleteTodo,
  updateTodo,
} from "../controllers/todos";

const router = Router();

router.route("/").get(getTodos).post(createTodo);
router.route("/:id").patch(updateTodo).delete(deleteTodo);

export default router;
