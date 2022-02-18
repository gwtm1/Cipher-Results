import express from "express";
import multer from "multer";

import { verifyjwt } from "../middlewares/verifyjwt.js";
import { uploadresults } from "../controllers/uploadresults.js";

// import { upload } from "../middlewares/uploadCSV.js";

const router = express.Router();

const fileFilter = (_, file, callback) => {
  if (!file.originalname.match(/\.(csv)$/))
    return callback(new Error("Please upload a valid .csv file"), false);
  else return callback(null, true);
};

const storage = multer.diskStorage({
  destination: (_, __, callback) => {
    callback(null, "./admin-uploads/");
  },
  filename: (_, file, callback) => {
    callback(null, file.originalname);
  },
});

const upload = multer({
  storage: storage,
  fileFilter: fileFilter,
});

router.post("", verifyjwt, upload.any(), uploadresults);

export default router;
