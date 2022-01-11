const mongoose = require("mongoose");
const Admins = mongoose.model("Admin");
const Students = mongoose.model("Students");
const bcrypt = require("bcryptjs");

export const adminLogingIn = (req, res) => {
  try {
    const { email, password } = req.body;
    let currAdmin = Admins.findOne({ email: email });
    if (!currAdmin) {
        return res.status(400).json({ error: "Invalid Email" });
        // return res.status(400).json({ error: "Invalid Email or Password" });
    }
    let passwordMatch = bcrypt.compare(password, currAdmin.password);
    if (passwordMatch) {
      res.json(currAdmin);
    } else {
      res.status(400).json({ error: "Invalid Email ID or Password" });
    }
  } catch (error) {
    console.log(error.message);
  }
};
export const studentLogingIn = (req, res) => {
  try {
    const { email, password } = req.body;
    let currStudent = Students.findOne({ email: email });
    if (!currStudent) {
        return res.status(400).json({ error: "Invalid Email" });
        // return res.status(400).json({ error: "Invalid Email or Password" });
    }
    let passwordMatch = bcrypt.compare(password, currStudent.password);
    if (passwordMatch) {
      res.json(currStudent);
    } else {
      res.status(400).json({ error: "Invalid Email ID or Password" });
    }
  } catch (error) {
    console.log(error.message);
  }
};
