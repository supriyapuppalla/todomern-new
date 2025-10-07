const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");

const todoRoutes = require("./Routes/todo");

dotenv.config();

const app = express();
app.use(express.json());
app.use((req, res, next) => {
  console.log(req.path, req.method);
  next();
});

app.get("/", (req, res) => {
  res.json({
    msg: "welcome to todo",
  });
});
app.use("/api/todos", todoRoutes);
const PORT = process.env.PORT || 3001;

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    app.listen(PORT, () => {
      console.log(
        `server is up and running on port:http://localhost:${PORT} & connected to db`
      );
    });
  })
  .catch((err) => {
    console.log(err);
  });
