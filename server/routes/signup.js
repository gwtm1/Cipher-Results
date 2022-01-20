import express from "express";
import { emailVerify, studentSigningUp } from "../controllers/signup.js";
import { validateStudentSignup, validator } from "../middlewares/validator.js"

const router = express.Router();

// router.post("/admin", validateAdmin, validate, adminSigningUp);
router.post("/student", validateStudentSignup, validator, studentSigningUp);
router.post('/emailverify',emailVerify)

export default router;