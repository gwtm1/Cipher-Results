import express from 'express';
import { logingIn } from '../controllers/login.js';

const router = express.Router();


router.post("/", (req, res) => {
    try {
        logingIn(req,res);
    } catch(error) {
        console.log(error.message);
    }
});

export default router;