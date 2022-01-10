import { check, validationResult } from "express-validator";

export const validateAdmin = [
  check("email").normalizeEmail().isEmail().withMessage("Email is invalid!"),
  check("password")
    .trim()
    .not()
    .isEmpty()
    .withMessage("Password is missing!")
    .isLength({ min: 8, max: 15 })
    .withMessage("Password must be 8 to 15 characters long!"),
];

export const validateStudent = [
  check("rollnumber")
    .trim()
    .not()
    .isEmpty()
    .withMessage("Roll Number is missing!")
    .isLength({ min: 11, max: 11 })
    .withMessage("Roll is not in specified format!"),
  check("email").normalizeEmail().isEmail().withMessage("Email is invalid!"),
  check("password")
    .trim()
    .not()
    .isEmpty()
    .withMessage("Password is missing!")
    .isLength({ min: 8, max: 15 })
    .withMessage("Password must be 8 to 15 characters long!"),
];

export const validate = (req, res, next) => {
    const errors = validationResult(req).array();
    if(!errors.length) return next()

    res.status(400).json({success: false, error: errors[0].msg})
}
