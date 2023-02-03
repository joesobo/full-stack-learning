const express = require("express");
const router = express.Router();

router.use(logger);

const users = [
  {
    name: "John",
  },
  {
    name: "Jane",
  },
];

router.get("/", (req, res) => {
  res.json(users);
});

router.get("/new", (req, res) => {
  res.send("New User Form");
});

router.post("/", (req, res) => {
  res.send("Create User");
});

router
  .route("/:id")
  .get((req, res) => {
    console.log(req.user);
    res.send(`Get User Details ${req.params.id}`);
  })
  .put((req, res) => {
    res.send(`Update User Details ${req.params.id}`);
  })
  .delete((req, res) => {
    res.send(`Delete User Details ${req.params.id}`);
  });

router.param("id", (req, res, next, id) => {
  req.user = users[id];
  next();
});

function logger(req, res, next) {
  console.log(req.originalUrl);
  next();
}

module.exports = router;
