import Students from "../models/student.js";
import { sendError } from "../utils/helper.js";
// import csvtojson from "convert-csv-to-json";

export const viewresults = (req, res) => {
    try {
        const { semester, userId } = req.body;
        // const { privateKeyFile, semester, userId } = req.body;
        const currStudent = await Students.findById(userId, "results");

        // console.log("Hi", semester, userId);
        // console.log( privateKeyFile, semester, userId);
        res.send({ result:currStudent.results[semester-1] });
        
    } catch(error) {
        console.log(error.message);
    }
}