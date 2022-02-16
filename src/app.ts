import express, { Request, Response, NextFunction, Application } from "express";
import mongoose from "mongoose";
import morgan from "morgan";
import dotenv from "dotenv";

import todos from "./routes/todos";

const app: Application = express();
const PORT = process.env.PORT || 4000;
dotenv.config();

app.use(express.json());
app.use(morgan("dev"));

app.use("/todos", todos);

app.use("/", (_: Request, res: Response) => {
  res.json({
    success: true,
    name: "mr-chidex",
    github: "github.com/mr-chidex",
    route: "/todos",
  });
});

app.use((err: Error, _: Request, res: Response, __: NextFunction) => {
  res.status(500).json({ message: err.message, error: true });
});

mongoose
  .connect(process.env.TODO!)
  .then(() => {
    console.log("db connected");
    app.listen(PORT, () => console.log(`server running on PORT ${PORT}`));
  })
  .catch((err) => console.error(err));
