import express from 'express';
import { adminLogingIn, studentLogingIn } from '../controllers/login.js';

const router = express.Router();


router.post("/admin", adminLogingIn);
router.post("/student", studentLogingIn);

export default router;