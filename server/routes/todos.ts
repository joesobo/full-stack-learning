import express from "express";
export const router = express.Router();

const todos = [
  {
    id: 0,
    name: "Todo 1",
  },
  {
    id: 1,
    name: "Todo 2",
  },
];

router.get("/", (req, res) => {
  res.json(todos);
});

router.post("/", (req, res) => {
  res.send("Create Todo");
});

router
  .route("/:id")
  .get((req, res) => {
    res.send(`Get Todo Details ${req.params.id}`);
  })
  .put((req, res) => {
    res.send(`Update Todo Details ${req.params.id}`);
  })
  .delete((req, res) => {
    res.send(`Delete Todo Details ${req.params.id}`);
  });
