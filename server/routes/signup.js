import express from "express";
import { adminSigningUp, studentSigningUp } from "../controllers/signup.js";
import { validateAdmin, validateStudent, validate } from "../middlewares/validator.js"

const router = express.Router();

router.post("/admin", validateAdmin, validate, adminSigningUp);
router.post("/student", validateStudent, validate, studentSigningUp);

export default router;