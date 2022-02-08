import { sendError } from "../utils/helper.js";
// import csvtojson from "convert-csv-to-json";

export const viewresults = (req, res) => {
    try {
        const { semester, userId } = req.body;
        // const { privateKeyFile, semester, userId } = req.body;

        console.log("Hi", semester, userId);
        // console.log( privateKeyFile, semester, userId);
        res.send("Inside viewresults controller");
        
    } catch(error) {
        console.log(error.message);
    }
}