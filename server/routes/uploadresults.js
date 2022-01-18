import express from 'express';
import { uploadresults } from "../controllers/uploadresults.js";
const router = express.Router();

router.post("/", uploadresults);

export default router;