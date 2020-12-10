const mongoose = require("mongoose");
const dotenv = require("dotenv");

dotenv.config();

const dbconnection = async () => {
  try {
    mongoose.connect(
      process.env.MONGODB_COMPASS,
      {
        useCreateIndex: true,
        useNewUrlParser: true,
        useUnifiedTopology: true,
      },
      () => {
        console.log("connected to db");
      }
    );
  } catch (error) {
    console.log(error.message);
  }
};

module.exports = dbconnection;
