require("dotenv").config();
const logger = require("./config/logger");
const express = require("express");
const app = express();
const morgan = require("morgan");
const handleErrors = require("./middlewares/handleErrors");
const { dbConnection } = require("./config/server");
const  cors = require('cors')

// Database connections
dbConnection();

app.use(cors())

// importing main Router file
const mainRouter = require("./router/mainRouter");

app.use(express.json());
app.use(morgan("tiny"));

app.use(mainRouter);

app.use(handleErrors);

app.get("/", (req, res) => {
  res.send(`server start`);
});

app.all("*", (req, res) => {
  res.status(404).send("Page not found");
});

app.listen(process.env.PORT, () => {
  logger.info("Listening on port " + process.env.PORT || 5556);
});
