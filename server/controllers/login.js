import Admins from "../models/admin.js";
import Students from "../models/student.js";
import { sendError } from "../utils/helper.js";

import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";

export const adminLogingIn = async (req, res) => {
  try {
    const { email, password } = req.body;
    let currAdmin = await Admins.findOne({ email });
    if (!currAdmin) {
      return sendError(res, 400, "Invalid Email");
    }
    let passwordMatch = bcrypt.compareSync(password, currAdmin.password);
    if (!passwordMatch) {
      sendError(res, 400, "Mismatched Email ID or Password!");
    } else {
      res.json(currAdmin._id);
    }
  } catch (error) {
    console.log(error.message);
  }
};
export const studentLogingIn = async (req, res) => {
  try {
    const { rollnumber, password } = req.body;
    let currStudent = await Students.findOne({ rollnumber });
    if (!currStudent) {
      sendError(res, 400, "Roll Number not found");
    }
    let passwordMatch = bcrypt.compareSync(password, currStudent.password);
    if (!passwordMatch) {
      sendError(res, 400, "Mismatched Roll Number or Password!");
    } else {
      const jwtToken = jwt.sign(
        { currStudentId: currStudent._id },
        process.env.JWT_SECRETE,
        {
          expiresIn: "1h",
        }
      );
      res.json({success: true, student: {userId: currStudent._id, jwtToken}});
    }
  } catch (error) {
    console.log(error.message);
  }
};
