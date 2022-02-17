"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const mongoose_1 = __importDefault(require("mongoose"));
const morgan_1 = __importDefault(require("morgan"));
const dotenv_1 = __importDefault(require("dotenv"));
const todos_1 = __importDefault(require("./routes/todos"));
const app = (0, express_1.default)();
const PORT = process.env.PORT || 5000;
dotenv_1.default.config();
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
app.use((0, morgan_1.default)("dev"));
app.use("/api/v1/todos", todos_1.default);
app.use("/", (_, res) => {
    res.json({
        success: true,
        name: "mr-chidex",
        github: "github.com/mr-chidex",
        route: "/api/v1/todos",
    });
});
app.use((err, _, res, __) => {
    res.status(500).json({ message: err.message, error: true });
});
mongoose_1.default
    .connect(process.env.TODO)
    .then(() => {
    console.log("db connected");
    app.listen(PORT, () => console.log(`server running on PORT ${PORT}`));
})
    .catch((err) => console.error(err));
