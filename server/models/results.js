import mongoose from 'mongoose';

const examResults = mongoose.Schema({
    
})

var cipherResults = mongoose.model('cipherResults', examResults);

export default cipherResults;