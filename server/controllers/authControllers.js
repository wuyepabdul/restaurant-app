const bcrypt = require("bcryptjs");
const User = require("../models/UserModel.js");
const jwt = require("jsonwebtoken");
const { jwtSecret, jwtExpire } = require("../config/keys");

// getall controller
module.exports.getAllRoute = (req, res) => {
  res.send("hello");
};

// sign up controller
module.exports.signupController = async (req, res) => {
  const { email, username, password } = req.body;

  try {
    //check if user exists
    const userExist = await User.findOne({ email });
    if (userExist) {
      res.status(400).json({ errorMessage: "User exists with this email" });
    }

    //hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = new User({
      username,
      email,
      password: hashedPassword,
    });

    const savedUser = await newUser.save();

    res.status(200).json({
      successMessage: "Registration successful",
      savedUser: { username, email },
    });
  } catch (error) {
    res.status(500).json({ errorMessage: "Server error, try again" });
  }
};

// signin controller
module.exports.signinController = async (req, res) => {
  const { email, password } = req.body;
  try {
    const userExist = await User.findOne({ email });
    if (!userExist) {
      res.status(400).json({ errorMessage: "Invalid Credentials" });
    }

    const matchedPassword = await bcrypt.compare(password, userExist.password);
    if (!matchedPassword) {
      res.status(400).json({ errorMessage: "Invalid Credentials" });
    }

    const payload = {
      user: {
        _id: userExist._id,
      },
    };

    await jwt.sign(
      payload,
      jwtSecret,
      { expiresIn: jwtExpire },
      (err, token) => {
        if (err) {
          res.status(400).json({ errorMessage: "Token error" });
        }
        const { _id, username, email, role } = userExist;
        const user = { _id, username, email, role };
        console.log("token:", token, "user:", user);
        res.json({ token, user });
      }
    );
  } catch (error) {
    console.log(error.message);
  }
};
