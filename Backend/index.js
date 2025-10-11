const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();

const todoRouter = require("./Routes/todo");

const app = express();

app.use(express.json());
app.use((req, res, next) => {
  console.log(req.path, req.method);
  next();
});

app.get("/", (req, res) => {
  res.send({
    msg: "welcome to todo",
  });
});
app.use("/api/todos", todoRouter);
const PORT = process.env.PORT || 3001;
const mongoURI = process.env.MONGO_URI;
mongoose
  .connect(mongoURI)
  .then(() => {
    console.log("connected to db");
    app.listen(PORT, () => {
      console.log(`server is listening on port:http://localhost:${PORT} `);
    });
  })
  .catch((error) => {
    console.log(error);
  });
