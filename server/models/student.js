import mongoose from 'mongoose';

const studentLoginSchema = mongoose.Schema({
    email:{
        type : String,
        required : true
    },
    password:{
        type : String,
        required : true
    },
    rollNumber:{
        type: String,
        required : true
    }
})

var studentLogin = mongoose.model('StudentLogin', studentLoginSchema);

export default studentLogin;