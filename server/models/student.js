import mongoose from 'mongoose';

const studentLoginSchema = mongoose.Schema({
    rollnumber:{
        type: String,
        required : true,
        trim: true,
    },
    email:{
        type : String,
        required : true,
        trim: true,
        unique: true
    },
    password:{
        type : String,
        required : true
    }    
})

var studentLogin = mongoose.model('StudentLogin', studentLoginSchema);

export default studentLogin;