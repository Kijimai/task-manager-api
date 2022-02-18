const express = require("express")
const app = express()

const PORT = process.env.PORT || 5000
const tasks = require("./routes/tasks")

const connectDB = require("./db/connect")
require("dotenv").config()

//middleware
app.use(express.static("public"))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use("/api/v1/tasks", tasks)

const start = async () => {
  try {
    app.listen(PORT, () => {
      console.log(`App listening on port ${PORT}`)
    })
    await connectDB(process.env.MONGO_URI)
  } catch (err) {
    console.log(err)
  }
}

start()
