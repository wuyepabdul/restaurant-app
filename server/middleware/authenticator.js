const jwt = require("jsonwebtoken");
const { jwtSecret } = require("../config/keys");

module.exports.authenticateJWT = (req, res, next) => {
  const token = req.cookies.token;
  if (!token) {
    return res
      .status(401)
      .json({ errorMessage: "No Token, Authorization denied" });
  }

  try {
    const decoded = jwt.verify(token, jwtSecret);
    console.log("decoded: ", decoded);
    req.user = decoded.user;
    next();
  } catch (error) {
    console.log(error);
    res.status(401).json({ errorMessage: error.message });
  }
};
