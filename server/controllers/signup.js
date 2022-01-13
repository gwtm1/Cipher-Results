
import Admins from "../models/admin.js";
import Students from "../models/student.js";
// const bcrypt = require('bcryptjs');
import bcrypt from "bcryptjs";

export const adminSigningUp = async (req, res) => {
  const { email, password } = req.body;

  try {
    let hashedPassword = await bcrypt.hash(password,12);
    var newadmin = new Admins({
      email,
      password: hashedPassword,
    });
    await newadmin.save();
    res.json(newadmin);

  } catch (error) {
    res.send(error.message);
    console.log(error.message);
  }
};

export const studentSigningUp = async (req, res) => {
  const { rollnumber, email, password } = req.body;

  try {
    let hashedPassword = await bcrypt.hash(password,12);
    var newstudent = new Students({
      rollnumber,
      email,
      password: hashedPassword,
    });
    await newstudent.save();
    res.json(newstudent);
    
  } catch (error) {
    res.send(error.message);
    console.log(error.message);
  }
};