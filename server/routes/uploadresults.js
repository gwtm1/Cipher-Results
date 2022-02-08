import express from 'express';
import { verifyjwt } from '../middlewares/verifyjwt.js';
import { uploadCSVFile } from "../middlewares/uploadCSV.js";
import { uploadresults } from "../controllers/uploadresults.js";

const router = express.Router();

router.post("", verifyjwt, uploadCSVFile, uploadresults);

export default router;