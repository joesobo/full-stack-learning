import express from "express";
export const router = express.Router();

const todos = [
  {
    id: 0,
    text: "Todo 1",
    done: false,
  },
  {
    id: 1,
    text: "Todo 2",
    done: true,
  },
  // Invalid Todo
  // {
  //   id: 2,
  //   text: 3,
  // },
];

router.get("/", (req, res) => {
  res.json(todos);
});

router.post("/", (req, res) => {
  todos.push({ id: todos.length + 1, ...req.body });
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
