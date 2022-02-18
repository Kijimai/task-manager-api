const mongoose = require("mongoose")
const { Schema } = mongoose

const TaskSchema = new Schema({
  name: {
    type: String,
    required: [true, "must provide a name"],
    trim: true,
    maxLength: [20, "name cannot be longer than 20 characters!"],
  },
  isDone: { type: Boolean, required: [true, "must provide a boolean value!"] },
})

//will pluralize automatically
module.exports = mongoose.model("Task", TaskSchema)
