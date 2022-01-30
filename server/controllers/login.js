import Admins from "../models/admin.js";
import Students from "../models/student.js";
import { sendError } from "../utils/helper.js";
import jwt from 'jsonwebtoken'
import bcrypt from "bcryptjs";

const jwtTokenGenerator = (userId) =>{
  let jwtSecretKey = process.env.JWT_SECRETE;
    let data = {
        time: Date.now(),
        userId
    }
  
    const token = jwt.sign(data, jwtSecretKey);
    return token;
}

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
      const jwtToken = jwtTokenGenerator();
      res.json({
        success: true,
        userId: currAdmin._id,
        jwtToken
      });
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
      jwtToken = jwtTokenGenerator();
      res.json({
        success: true,
        userId: currStudent._id,
        jwtToken
      });
    }
  } catch (error) {
    console.log(error.message);
  }
};
