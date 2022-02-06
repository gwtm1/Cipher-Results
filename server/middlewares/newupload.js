import multer from "multer";

var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./uploads/");
    
  },
  filename: function (req, file, cb) {
      console.log("yo");
    cb(null, file.fieldname + "-" + Date.now() );
  },
});

var upload = multer({
  storage: storage,
  fileFilter: (req, file, cb) => {
        if (file.mimetype.includes("csv")) {
            cb(null, true);
        } else {
            cb("Please upload only csv file.", false);
        }
    }
}).single("resultsFile");


export const uploadFile = (req, res, next) => {
  upload(req, res, function (err) {
    if (err) {
        res.send(err);
    }
    else {
        res.send("Success, uploaded!");
        // next();
    }
  });
};