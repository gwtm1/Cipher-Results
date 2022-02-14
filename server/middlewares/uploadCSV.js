import multer from "multer";
import { sendError } from "../utils/helper.js";

var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./admin-uploads/");
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});

var upload = multer({
  storage: storage,
  fileFilter: (req, file, cb) => {
    if (file.mimetype.includes("csv")) {
      cb(null, true);
    } 
    
    // if(file.originalname !== `${req.year}${req.group}${req.semesterNumber}.csv`) {
    //   cb("Invalid Filename");
    // }
    else {
      cb("Please upload only csv file.", false);
    }
  },
}).single("resultsFile");

export const uploadCSVFile = (req, res, next) => {
  upload(req, res, function (err) {
    if (err) {
      res.send(err);
    } else {
      // res.send("Success, uploaded!");
      next();
    }
  });
};
