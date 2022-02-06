import { sendError } from "../utils/helper.js";
import jwt from 'jsonwebtoken';
// import csvtojson from "convert-csv-to-json";

export const viewresults = (req, res) => {
    try {
        const token = req.headers['JWT-KEY'];
        console.log(token);
        const { privateKeyFile, semester, userId } = req.body();

        const verified =  jwt.verify(token, jwtSecretKey);
        if(verified){
            console.log("Successfully Verified");
            return res.send("Successfully Verified");
        } else {
            return sendError( res, "Access Denied", 401);
        }

    } catch(error) {
        console.log(error.message);
    }
}