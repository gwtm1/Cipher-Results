import { check, validationResult } from "express-validator";

export const validateAdminLogin = [
  check("email").normalizeEmail().isEmail().withMessage("Email is invalid!"),
  check("adminPassword").trim().not().isEmpty().withMessage("Password is missing!"),
];

export const validateStudentSignup = [
  check("rollnumber", "Roll is not in specified format!").matches(
    /^\d{4}[A-Z]{3}\-\d{3}$/
  ),
  check("email").normalizeEmail().isEmail().withMessage("Email is invalid!"),
  check("password")
    .trim()
    .not()
    .isEmpty()
    .withMessage("Password is missing!")
    .isLength({ min: 8, max: 15 })
    .withMessage("Password must be 8 to 15 characters long!"),
];

export const validateStudentLogin = [
  check("rollnumber", "Roll is not in specified format!").matches(
    /^\d{4}[A-Z]{3}\-\d{3}$/
  ),
  check("studentPassword").trim().not().isEmpty().withMessage("Password is missing!"),
];

export const validator = (req, res, next) => {
  const errors = validationResult(req).array();
  if (!errors.length) return next();

  res.status(400).json({ success: false, error: errors[0].msg });
};
