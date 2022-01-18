import Admins from "../models/admin.js";
import Students from "../models/student.js";
import { sendError } from "../utils/helper.js"

import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";

export const adminLogingIn = async (req, res) => {
  try {
    const { email, password } = req.body;
    let currAdmin = await Admins.findOne({ email });
    if (!currAdmin) {
      return sendError(res, 400, "Invalid Email");
        // return res.status(400).json({ error: "Invalid Email or Password" });
    }
    let passwordMatch = bcrypt.compareSync(password, currAdmin.password);
    if (passwordMatch) {
      res.json(currAdmin);
    } else {
      sendError(res, 400, "Mismatched Email ID or Password!");
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
      sendError(res, 400, "Roll Number not found")
    }
    let passwordMatch = bcrypt.compareSync(password, currStudent.password);
    if (passwordMatch) {
      res.json(currStudent);
    } else {
      sendError(res, 400, "Mismatched Roll Number or Password!")
    }
  } catch (error) {
    console.log(error.message);
  }
};
