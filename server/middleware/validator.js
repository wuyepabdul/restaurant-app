const { check, validationResult } = require("express-validator");

module.exports.signupValidator = [
  check("username")
    .not()
    .isEmpty()
    .trim()
    .withMessage("All fields are required"),
  check("email")
    .isEmail()
    .normalizeEmail()
    .withMessage("Please provide a valid email"),
  check("password")
    .isLength({ min: 5 })
    .withMessage("Password must be greater than 5 characters"),
];

module.exports.signinValidator = [
  check("email")
    .isEmail()
    .normalizeEmail()
    .withMessage("Please provide a valid email"),
  check("password")
    .isLength({ min: 5 })
    .withMessage("Password must be greater than 5 characters"),
];

module.exports.validatorResult = (req, res, next) => {
  const result = validationResult(req);
  const hasError = !result.isEmpty();
  if (hasError) {
    const validatorError = result.array()[0].msg;
    return res.status(400).json({ errorMessage: validatorError });
  }

  next();
};
