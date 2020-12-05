const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const morgan = require("morgan");
const cookieParser = require("cookie-parser");
const dbconnection = require("./db.js");
const app = express();

dotenv.config();
//import routes
const authRoute = require("./routes/authRoute.js");
const categoryRoute = require("./routes/categoryRoute.js");
// middleware
app.use(cors());
app.use(morgan("dev"));
app.use(express.json());
app.use(cookieParser());
app.use("/api/auth", authRoute);
app.use("/api", categoryRoute);

dbconnection();

app.listen(process.env.PORT, () => {
  console.log(`server listening on port ${process.env.PORT}`);
});
