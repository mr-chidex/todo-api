"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const todos_1 = __importDefault(require("./routes/todos"));
const app = (0, express_1.default)();
const PORT = process.env.PORT || 4000;
app.use(express_1.default.json());
app.use("/todos", todos_1.default);
app.use((err, _, res, __) => {
    res.status(500).json({ message: err.message, error: true });
});
app.listen(PORT, () => console.log(`server running on PORT ${PORT}`));
