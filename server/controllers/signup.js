import Students from "../models/student.js";
import VerificationToken from "../models/verificationToken.js";
import bcrypt from "bcryptjs";

import {
  mailTemplate,
  mailTransport,
  otpGenerator,
} from "../utils/mailVerify.js";
import { sendError } from "../utils/helper.js";
import pkg from "mongoose";

const { isValidObjectId } = pkg;

export const studentSignUp = async (req, res) => {
  try {
    const { rollnumber, email, password } = req.body;

    const year1 = rollnumber.slice(0, 4);
    const group1 = rollnumber.slice(4, 7);
    const rollnumber1 = rollnumber.slice(8, 11);
    const domain1 = "@iiitm.ac.in";

    const year2 = email.slice(4, 8);
    const group2 = email.slice(0, 3).toUpperCase();
    const domain2 = email.slice(11, 23);
    const rollnumber2 = email.slice(8, 11);

    const batch = year1 + group1;
    if (
      year1.localeCompare(year2) ||
      group1.localeCompare(group2) ||
      rollnumber1.localeCompare(rollnumber2) ||
      domain1.localeCompare(domain2)
    ) {
      return sendError(
        res,
        "Enter college emaid-id corresponding to the given roll number!"
      );
    }

    let isEmailFound = await Students.findOne({ email });

    if (isEmailFound && isEmailFound.isVerified === false) {
      let token = await VerificationToken.findOne({
        owner: isEmailFound._id,
      });
      await Students.findByIdAndDelete(isEmailFound._id);
      await VerificationToken.findByIdAndDelete(token._id);
    } else if (isEmailFound) {
      return sendError(res, "Already Signed Up");
    }

    let hashedPassword = await bcrypt.hash(password, 12);
    var newstudent = new Students({
      rollnumber,
      email,
      password: hashedPassword,
      batch
    });

    const OTP = otpGenerator();
    const verificationToken = new VerificationToken({
      owner: newstudent._id,
      otp: OTP,
    });

    await verificationToken.save();
    await newstudent.save();
    res.json({ userId: newstudent._id });

    mailTransport().sendMail(
      {
        from: {
          name: "Cipher Results",
          email: process.env.GMAIL_USERNAME,
        },
        to: newstudent.email,
        subject: "Email Verification for Cipher-Results",
        html: mailTemplate(OTP),
      },
      function (error, info) {
        if (error) {
          console.log(error);
        } else {
          console.log("Email sent: " + info.response);
        }
      }
    );
  } catch (error) {
    res.send(error.message);
    console.log(error);
  }
};

export const verifyEmail = async (req, res) => {
  try {
    const { userId, OTP, publicKey } = req.body;

    if (!userId || !OTP) return sendError(res, "Please enter a valid OTP!!");

    const student = await Students.findById(userId);
    if (!student) return sendError(res, "Sorry, User not found!!");

    if (student.isVerified) return sendError(res, "Account already verified!");

    const token = await VerificationToken.findOne({ owner: student._id });
    if (!token) return sendError(res, "OTP expired, Please Signup again!!");

    const isMatched = await token.compareToken(OTP);
    if (!isMatched) return sendError(res, "Please enter valid OTP!!");

    student.isVerified = true;
    student.publicKey = publicKey;
    
    await VerificationToken.findByIdAndDelete(token._id);
    await student.save();

    res.json({ success: true });
  } catch (error) {
    res.send(error);
    console.log(error);
  }
};
