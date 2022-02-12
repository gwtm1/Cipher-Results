import Students from "../models/student";
import csv from 'csvtojson'
const NodeRSA = require('node-rsa')

export const uploadresults = (req, res, next) => {
  try {    
    const { year, batch, semesterNumber } = req.body;

    console.log( year, batch, semesterNumber);
    const 
    const currBatch = await Students.find(batch);
    const grades = await csv().fromFile(
      __dirname+'../admin-uploads'
    )
    const keyMap = new Map();
    currBatch.map(student=>{
      keyMap.set(student.rollNumber,student.publicKey);
    })

    grades.forEach(grade =>{
      const pubKey = new NodeRSA(keyMap.get(grade.rollNumber));
      let encryptedResult = pubKey
      .encrypt(JSON.stringify(grade), "base64")
      .toString();
      const filter = {rollNumber:grade.rollNumber};
      const update = {};
      update[`grades.${semesterNumber - 1}`] = encryptedResult;
      Students.findOneAndUpdate(filter,update);

    })
  } catch (error) {
    console.log(error.message);
  }
};
