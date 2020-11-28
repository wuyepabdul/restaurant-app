const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const dbconnection = require("./db");
const app = express();

dotenv.config();

dbconnection();

app.use(cors());

app.listen(process.env.PORT, () => {
  console.log(`server listening on port ${process.env.PORT}`);
});
