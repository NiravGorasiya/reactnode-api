const { Router } = require("express");

const userRouter = require("./userRouter");

module.exports = Router()
  .use("/user", userRouter)
  