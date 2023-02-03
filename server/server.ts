import express from "express";
import { router as todoRouter } from "./routes/todos";
import cors from "cors";

const app: express.Application = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.use("/todos", todoRouter);

app.listen(4000, () => {
  console.log("Server is running on port 4000");
});
