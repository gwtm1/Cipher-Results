import express from 'express';
import { uploadresults } from "../controllers/uploadresults.js";
import { uploadFile } from "../middlewares/upload.js";

const router = express.Router();

router.post("", uploadFile, uploadresults);

export default router;