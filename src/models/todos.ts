import mongoose, { Schema, Document } from "mongoose";
import { TodoDoc } from "../libs/types";

type TodoDocument = Document & TodoDoc;

const todoSchema = new Schema<TodoDocument>(
  {
    text: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

export const Todo = mongoose.model<TodoDocument>("Todo", todoSchema);
