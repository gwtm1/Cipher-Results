import express from "express";
import { verifyEmail, studentSignUp } from "../controllers/signup.js";
import { validateStudentSignup, validator } from "../middlewares/validator.js"

const router = express.Router();

router.post("/student", validateStudentSignup, validator, studentSignUp);
router.post('/emailverify', verifyEmail)

export default router;