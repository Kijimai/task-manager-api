const Task = require("../models/Task")
const asyncWrapper = require("../middleware/async")
const { createCustomError } = require("../errors/customError")

const getAllTasks = asyncWrapper(async (req, res) => {
  const tasks = await Task.find({})
  res.status(200).json({ tasks, amount: tasks.length })
})

const createTask = asyncWrapper(async (req, res) => {
  const task = await Task.create(req.body)
  res.status(201).json({ task })
})

const getTask = asyncWrapper(async (req, res, next) => {
  const { id: taskID } = req.params
  const task = await Task.findOne({ _id: taskID })
  if (!task) {
    return next(createCustomError(`No task with id: ${taskID} found!`, 404))
  }
  res.status(200).json({ task })
})

const updateTask = asyncWrapper(async (req, res) => {
  const { id: taskID } = req.params

  const task = await Task.findOneAndUpdate({ _id: taskID }, req.body, {
    new: true,
    runValidators: true,
  })

  if (!task) {
    return next(createCustomError(`No task with id: ${taskID} found!`, 404))
  }

  res.status(200).json({ task })
})

const editTask = asyncWrapper(async (req, res) => {
  const { id: taskID } = req.params

  const task = await Task.findOneAndUpdate({ _id: taskID }, req.body, {
    new: true,
    runValidators: true,
    overwrite: true,
  })

  if (!task) {
    return next(createCustomError(`No task with id: ${taskID} found!`, 404))
  }

  res.status(200).json({ task })
})

const deleteTask = asyncWrapper(async (req, res) => {
  const { id: taskID } = req.params
  const foundTask = await Task.findOneAndDelete({ _id: taskID })
  if (!foundTask) {
    return next(createCustomError(`No task with id: ${taskID} found!`, 404))
  }
  res
    .status(200)
    .json({ message: `Successfully deleted task with id : ${taskID}` })
})

module.exports = {
  getAllTasks,
  createTask,
  getTask,
  updateTask,
  deleteTask,
  editTask,
}
