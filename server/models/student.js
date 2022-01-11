import mongoose from 'mongoose';

const studentSchema = mongoose.Schema({
    rollnumber:{
        type: String,
        required : true
    },
    email:{
        type : String,
        required : true,
        unique: true
    },
    password:{
        type : String,
        required : true
    }    
})

var Students = mongoose.model('Students', studentSchema);

export default Students;