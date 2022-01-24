const mongoose=require("mongoose");

function dbConnection() {
    mongoose
      .connect(process.env.URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      })
      .then(() => {
        console.log("Connected with database");
      })
      .catch((err) => {
        console.log(err);
      });
  }
  module.exports = { dbConnection };
