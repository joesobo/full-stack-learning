import express from "express";
import { router as todoRouter } from "./routes/todos";
const app: express.Application = express();

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.use("/todos", todoRouter);

app.listen(4000, () => {
  console.log("Server is running on port 4000");
});
