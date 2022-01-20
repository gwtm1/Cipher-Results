
import Admins from "../models/admin.js";
import Students from "../models/student.js";
import bcrypt from "bcryptjs";
import { mailTemplate, mailTransport, otpGenerator } from "../utils/mailVerify.js";
import VerificationToken from "../models/verificationToken.js";
import { sendError } from "../utils/helper.js";
import { isValidObjectId } from "mongoose";

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

    const OTP = otpGenerator();
    const verificationToken =  new VerificationToken({
      owner: newstudent._id,
      token : OTP
    })

    await verificationToken.save();
    await newstudent.save();

    mailTransport().send({
      from : 'resultadmin@iiitm.ac.in',
      to: newstudent.email,
      subject : 'Email Verification for Cipher-Results',
      html : mailTemplate(OTP)
    })

    console.log("New student signed up");
    res.json(newstudent);
    
  } catch (error) {
    res.send(error.message);
    console.log(error.message);
  }
};

export const emailVerify = async (req,res) =>{
  const {userId, otp} = req.body;
  if(!userId || !otp) return sendError(res,'Please enter a vaslid OTP!!');

  if(!isValidObjectId(userId)) return sendError(res,'Session expired, Please Signup again!')

  const student =  await Students.findById(userId)
  if(!student) return sendError(res,'Sorry, User not found!!');
 
  if(student.isVerified) return sendError(res,'Account already verified!')
  
  const token = await VerificationToken.findOne({owner: student._id})
  if(!token) return sendError(res,'Sorry, User not found!')

  const isMatched =  await token.compareTOken(otp);
  if(isMatched) return sendError(res,'Please enter valid OTP!!');

  student.isVerified = true;

  await VerificationToken.findByIdAndDelete(token._id);

  await student.save();

  res.json(student); 

}


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