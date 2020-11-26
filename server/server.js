const express = require("express");
const dotenv = require("dotenv");
const dbconnection = require("./db");
const app = express();

dotenv.config();

dbconnection();

app.listen(process.env.PORT, () => {
  console.log(`server listening on port ${process.env.PORT}`);
});
