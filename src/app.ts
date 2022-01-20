import express, { Request, Response, NextFunction, Application } from "express";

import todos from "./routes/todos";

const app: Application = express();
const PORT = process.env.PORT || 4000;

app.use(express.json());

app.use("/todos", todos);

app.use((err: Error, _: Request, res: Response, __: NextFunction) => {
  res.status(500).json({ message: err.message, error: true });
});

app.listen(PORT, () => console.log(`server running on PORT ${PORT}`));
