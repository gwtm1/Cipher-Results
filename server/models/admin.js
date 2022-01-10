import mongoose from 'mongoose';

const adminLoginSchema = mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        require :true,
    }
})

var adminLogin = mongoose.model('AdminLogin', adminLoginSchema);

export default adminLogin;