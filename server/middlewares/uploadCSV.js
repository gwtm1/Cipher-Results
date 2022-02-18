import multer from "multer";
import { sendError } from "../utils/helper.js";

// var storage = multer.diskStorage({
//   destination: function (req, file, cb) {
//     cb(null, "./admin-uploads/");
//   },
//   filename: function (req, file, cb) {
//     cb(null, file.originalname);
//   },
// });
const fileFilter = (_, file, callback) => {
  if (!file.originalname.match(/\.(csv)$/))
    return callback(new Error("Please upload a valid .csv file"), false);
  else return callback(null, true);
};

const storage = multer.diskStorage({
  destination: (_, __, callback) => {
    callback(null, "../admin-uploads/");
  },
  filename: (_, file, callback) => {
    callback(null, file.originalname);
  },
});

export const upload = multer({
  storage: storage,
  fileFilter: fileFilter,
  // fileFilter: (req, file, cb) => {
  //   if (file.mimetype.includes("csv")) {
  //     cb(null, true);
  //   }

  //   // if(file.originalname !== `${req.year}${req.group}${req.semesterNumber}.csv`) {
  //   //   cb("Invalid Filename");
  //   // }
  //   else {
  //     console.log("4");
  //     cb("Please upload only csv file.", false);
  //   }
  // },
})
// .single("resultsFile");

// export const uploadCSVFile = (req, res, next) => {

//   upload(req, res, function (err) {
//     if (err) {
//       // res.send("5", err);
//       sendError(res,err)
//     } else {
//       // res.send("Success, uploaded!");
//       next();
//     }
//   });
// };