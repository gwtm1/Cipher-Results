import express from 'express';
import { verifyjwt } from '../middlewares/verifyjwt.js';
import { viewresults } from "../controllers/viewresults.js";

const router = express.Router();


router.post("", verifyjwt, viewresults);

export default router;