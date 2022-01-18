
import Admins from "../models/admin.js";
import Students from "../models/student.js";
import bcrypt from "bcryptjs";

// export const adminSigningUp = async (req, res) => {
//   const { email, password } = req.body;

//   try {
//     let hashedPassword = await bcrypt.hash(password,12);
//     var newadmin = new Admin({
//       email,
//       password: hashedPassword,
//     });
//     await newadmin.save();
//     res.json(newadmin);
//     console.log("New admin signed up");

//   } catch (error) {
//     res.send(error.message);
//     console.log(error.message);
//   }
// };

export const studentSigningUp = async (req, res) => {
  const { rollnumber, email, password } = req.body;

// validate if another user has same email-id

  try {
    let currEmail = await Students.findOne({ email });
    if (currEmail) {
        return res.status(400).json({ success: false, error: "Already Signed Up" });
    }

    let hashedPassword = await bcrypt.hash(password,12);
    var newstudent = new Students({
      rollnumber,
      email,
      password: hashedPassword,
    });
    await newstudent.save();
    console.log("New student signed up");
    res.json(newstudent);

  } catch (error) {
    res.send(error.message);
    console.log(error.message);
  }
};

