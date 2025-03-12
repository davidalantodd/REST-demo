// import express and create instance
const express = require('express')
const app = express();

//import userRouter
const userRouter = require("./routes/user")

// use express.json()
app.use(express.json())

// connect userRouter to app here
app.use("/user", userRouter);

module.exports = app;