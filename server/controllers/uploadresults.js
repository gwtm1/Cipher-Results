import { sendError } from "../utils/helper.js";
import jwt from "jsonwebtoken";

export const uploadresults = (req, res, next) => {
  try {
    const token = req.headers["JWT-KEY"];
    const { year, batch, semesterNumber } = req.body;

    console.log(token, year, batch, semesterNumber);

    const verified = jwt.verify(token, jwtSecretKey);
    if (verified) {
      console.log("Successfully Verified");
      return res.send("Successfully Verified");
    } else {
      return sendError(res, "Access Denied", 401);
    }
  } catch (error) {
    console.log(error.message);
  }
};
