import express from 'express';
import { verifyjwt } from '../middlewares/verifyjwt.js';

const router = express.Router();

import { viewresults } from "../controllers/viewresults.js";

router.post("", verifyjwt, viewresults);

export default router;