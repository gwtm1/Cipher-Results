import multer from "multer";
import { sendError } from "../utils/helper.js";

var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    console.log("1");
    cb(null, "./admin-uploads/");
  },
  filename: function (req, file, cb) {
    console.log("2");
    cb(null, file.originalname);
  },
});

var upload = multer({
  storage: storage,
  fileFilter: (req, file, cb) => {
    if (file.mimetype.includes("csv")) {
      console.log("3");
      cb(null, true);
    }

    // if(file.originalname !== `${req.year}${req.group}${req.semesterNumber}.csv`) {
    //   cb("Invalid Filename");
    // }
    else {
      console.log("4");
      cb("Please upload only csv file.", false);
    }
  },
}).single("resultsFile");

export const uploadCSVFile = (req, res, next) => {

  upload(req, res, function (err) {
    if (err) {
      console.log("5");
      // res.send("5", err);
      sendError(res,err)
    } else {
      // res.send("Success, uploaded!");
      next();
    }
  });
};
