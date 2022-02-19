const Task = require("../models/Task")

const getAllTasks = async (req, res) => {
  try {
    const tasks = await Task.find({})
    res.status(200).json({ tasks, amount: tasks.length })
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
}

const createTask = async (req, res) => {
  try {
    const task = await Task.create(req.body)
    res.status(201).json({ task })
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
}

const getTask = async (req, res) => {
  try {
    const { id: taskID } = req.params
    const task = await Task.findOne({ _id: taskID })
    if (!task) {
      return res
        .status(404)
        .json({ message: `No task with id: ${taskID} located.` })
    }
    res.status(200).json(task)
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
}

const updateTask = async (req, res) => {
  try {
    const { id: taskID } = req.params

    const task = await Task.findOneAndUpdate({ _id: taskID }, req.body, {
      new: true,
      runValidators: true,
    })

    if (!task) {
      return res.status(404).json({ message: `No task with id: ${taskID}` })
    }

    res.status(200).json({ task })
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
}

const editTask = async (req, res) => {
  try {
    const { id: taskID } = req.params

    const task = await Task.findOneAndUpdate({ _id: taskID }, req.body, {
      new: true,
      runValidators: true,
      overwrite: true,
    })

    if (!task) {
      return res.status(404).json({ message: `No task with id: ${taskID}` })
    }

    res.status(200).json({ task })
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
}

const deleteTask = async (req, res) => {
  try {
    const { id: taskID } = req.params
    const foundTask = await Task.findOneAndDelete({ _id: taskID })
    if (!foundTask) {
      return res
        .status(404)
        .json({ message: `No task with id: ${taskID} was found.` })
    }
    res
      .status(200)
      .json({ message: `Successfully deleted task with id : ${taskID}` })
  } catch (err) {
    const { message } = err
    return res.status(500).json({ message })
  }
}

module.exports = {
  getAllTasks,
  createTask,
  getTask,
  updateTask,
  deleteTask,
  editTask,
}
