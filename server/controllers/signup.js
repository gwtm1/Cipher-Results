
import student from "../models/admin.js";
import admin from "../models/student.js";

export const adminSigningUp = async (req, res) => {
  const { email, password } = req.body;

  try {
    var newadmin = new admin({
      email,
      password,
    });
    await newadmin.save();
    res.json(newadmin);

  } catch (error) {
    console.log(error.message);
  }
};

export const studentSigningUp = async (req, res) => {
  const { rollnumber, email, password } = req.body;

  try {
    var newstudent = new student({
      rollnumber,
      email,
      password,
    });
    await newstudent.save();
    res.json(newstudent);
    
  } catch (error) {
    console.log(error.message);
  }
};