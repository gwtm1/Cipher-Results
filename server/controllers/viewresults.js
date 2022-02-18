import Students from "../models/student.js";
import { sendError } from "../utils/helper.js";
// import csvtojson from "convert-csv-to-json";

export const viewresults = async (req, res, next) => {
  try {
    const { semester, userId } = req.body;

    const currStudent = await Students.findOne({_id: userId});

    var count = 0;
    currStudent.results.map((result) => {
      if (result.semester == semester) {
        res.json({ result: result.encryptedResult });
        count++;
      }
    });
    if(count === 0)  sendError(res, "No results for entered semester");
  } catch (error) {
    sendError(res, error.message);
  }
};