const mongoose = require("mongoose")

const connectDB = (url) => {
  return mongoose
    .connect(url, {
      useNewUrlParser: true,
      useCreateIndex: true,
      useFindAndModify: true,
      useUnifiedTopology: true,
    })
    .then(() => {
      console.log("Successfully connected to database!")
    })
}

module.exports = connectDB
