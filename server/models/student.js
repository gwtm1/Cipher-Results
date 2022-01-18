import mongoose from 'mongoose';

const studentSchema = mongoose.Schema({
    rollnumber:{
        type: String,
        required : true,
        trim: true,
        unique: true  
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

var Students = mongoose.model('Students', studentSchema);

export default Students;