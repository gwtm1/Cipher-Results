import mongoose from 'mongoose';

const adminSchema = mongoose.Schema({
    email: {
        type: String,
        required: true,
        trim: true,
        unique: true
    },
    password: {
        type: String,
        require :true,
    }
})

var Admins = mongoose.model('Admins', adminSchema);

export default Admins;