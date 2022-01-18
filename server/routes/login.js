import express from 'express';
import { adminLogingIn, studentLogingIn } from '../controllers/login.js';

import { validateAdminLogin, validateStudentLogin, validator } from "../middlewares/validator.js"

const router = express.Router();


router.post("/admin", validateAdminLogin, validator, adminLogingIn);
router.post("/student",  validateStudentLogin, validator, studentLogingIn);

export default router;