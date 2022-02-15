import Admins from "../models/admin.js";
import Students from "../models/student.js";
import { sendError } from "../utils/helper.js";
import jwt from 'jsonwebtoken'
import bcrypt from "bcryptjs";

const jwtTokenGenerator = (userId) =>{
  let jwtSecretKey = process.env.jwtSecretKey;
    let data = {
        time: Date.now(),
        userId
    }
  
    const token = jwt.sign(data, jwtSecretKey);
    return token;
}

export const adminLogingIn = async (req, res) => {
  try {
    const { email, adminPassword } = req.body;
    let currAdmin = await Admins.findOne({ email });
    if (!currAdmin) {
      return sendError(res, "Invalid Email");
    }
    let passwordMatch = bcrypt.compareSync(adminPassword, currAdmin.password);
    if (!passwordMatch) {
      sendError(res, "Mismatched Email ID or Password!");
    } else {
      const jwtToken = jwtTokenGenerator(currAdmin._id);
      res.json({
        success: true,
        message: 'Successfully Logged In',
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
    const { rollnumber, studentPassword } = req.body;

    let currStudent = await Students.findOne({ rollnumber });
    if (!currStudent) {
      sendError(res, "Roll Number not found");
    }
    let passwordMatch = bcrypt.compareSync(studentPassword, currStudent.password);
    if (!passwordMatch) {
      sendError(res, "Mismatched Roll Number or Password!");
    } else {
      const jwtToken = jwtTokenGenerator(currStudent._id);
      res.json({
        success: true,
        message: 'Successfully Logged In',
        userId: currStudent._id,
        jwtToken
      });
    }
  } catch (error) {
    console.log(error.message);
  }
};
