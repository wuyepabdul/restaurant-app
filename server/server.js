const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const morgan = require("morgan");
const dbconnection = require("./db.js");
const app = express();

dotenv.config();
//import routes
const authRoute = require("./routes/authRoute.js");

// middleware
app.use(cors());
app.use(morgan("dev"));
app.use(express.json());
app.use("/api/auth", authRoute);

dbconnection();

app.listen(process.env.PORT, () => {
  console.log(`server listening on port ${process.env.PORT}`);
});
