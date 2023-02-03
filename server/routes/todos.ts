import express from "express";
export const router = express.Router();

let todos = [
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
  res.sendStatus(200);
});

router.post("/", (req, res) => {
  todos.push({ id: todos.length + 1, ...req.body });
  res.sendStatus(200);
});

router
  .route("/:id")
  .get((req, res) => {
    // res.send(`Get Todo Details ${req.params.id}`);
  })
  .put((req, res) => {
    todos[todos.findIndex((todo) => todo.id === Number(req.params.id))] =
      req.body;

    res.sendStatus(200);
  })
  .delete((req, res) => {
    todos = todos.filter((todo) => {
      return todo.id !== Number(req.params.id);
    });
    res.sendStatus(200);
  });
