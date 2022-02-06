import express from 'express';
const router = express.Router();

import { viewresults } from "../controllers/viewresults.js";

router.post("", viewresults);

export default router;