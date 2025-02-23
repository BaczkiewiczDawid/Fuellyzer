import express from "express";
import cors from "cors";
import historyRoute from "./routes/history";

const app = express();
app.use(cors());
app.use(express.json());

app.use("/history", historyRoute);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on: http://localhost:${PORT}`));
