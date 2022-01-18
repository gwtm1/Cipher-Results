import mongoose from "mongoose";
import bcrypt, { hash } from "bcryptjs";

const verificationTokenSchema = new mongoose.Schema({
    owner:{
        type:mongoose.Types.ObjectId,
        ref:'Students',
        required:true,
    },
    token:{
        type:String,
        required:true
    },
    createdAt:{
        type:Date,
        expires:5000,
        default:Date.now()
    }
})

verificationTokenSchema.pre('save', async function (next){
    if(this.isModified('token')){
        const hash = await bcrypt.hash(this.token, 12);
        this.token = hash;
    }
    next();
})

verificationTokenSchema.methods.compareToken = async function(token){
    const res = await bcrypt.compareSync(token, this.token);
    return res;
}

module.exports = mongoose.model('VerificationToken', verificationTokenSchema)