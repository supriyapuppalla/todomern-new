const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const TodoSchema = new Schema(
  {
    task: {
      type: String,
      required: true,
    },
    done: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Todo", TodoSchema);
