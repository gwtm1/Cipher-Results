import express from 'express';
const router = express.Router();

import { viewresults } from "../controllers/viewresults";

router.post("/", viewresults);

export default router;