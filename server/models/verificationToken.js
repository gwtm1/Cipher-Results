import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const verificationTokenSchema = new mongoose.Schema({
    owner:{
        type: mongoose.Types.ObjectId,
        ref: 'Students',
        required:true,
    },
    otp:{
        type: String,
        required:true
    },
    createdAt:{
        type:Date,
        expires:3600,
        default:Date.now()
    }
})

verificationTokenSchema.pre('save', async function (next) {
    const hash = await bcrypt.hash(this.otp, 12);
    this.otp = hash;
    next();
})

verificationTokenSchema.methods.compareToken = async function(token) {
    const res = bcrypt.compareSync(token, this.otp);
    return res;
};

var VerificationToken  = mongoose.model('VerificationToken', verificationTokenSchema);

export default VerificationToken;