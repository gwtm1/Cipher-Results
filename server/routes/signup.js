import express from "express";
import { signingUp } from "../controllers/signup.js";

const router = express.Router();

router.post("/", (req, res) => {
    try {
        signingUp(req,res);
    } catch(error) {
        console.log(error.message)
    }

});

export default router;
