import express from "express";
import cors from "cors";
import historyRoute from "./routes/history";
import userCarsList from "./routes/user-cars-list";
import newExpense from "./routes/new-expense";

const app = express();
app.use(cors());
app.use(express.json());

app.use("/history", historyRoute);
app.use("/user-cars-list", userCarsList);
app.use("/new-expense", newExpense);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on: http://localhost:${PORT}`));
