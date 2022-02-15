import Students from "../models/student.js";
import csv from "csvtojson";
import NodeRSA from "node-rsa";

import { fileURLToPath } from "url";
import { dirname } from "path";
import path from "path";

export const uploadresults = async (req, res, next) => {
  try {
    const { year, group, semesterNumber } = req.body;

    const batch = year + group;
    const studentsList = await Students.find({ batch });

    const __filename = fileURLToPath(import.meta.url);
    let __dirname = dirname(__filename);

    __dirname = path.join(
      __dirname,
      "..",
      `admin-uploads/${year}${group}${semesterNumber}.csv`
    );

    const grades = await csv().fromFile(__dirname);

    const keyMap = new Map();
    studentsList.map((student) => {
      keyMap.set(student.rollnumber, student.publicKey);
    });

    grades.forEach((grade) => {
      const pubKey = new NodeRSA(keyMap.get(grade.rollnumber));

      let encryptedResult = pubKey
        .encrypt(JSON.stringify(grade), "base64")
        .toString();

      const filter = { rollnumber: grade.rollnumber };
      const result = { semester: semesterNumber, encryptedResult }

      Students.findOneAndUpdate(
        filter,
        { $push: { results: result } },
      ).exec();
    });

    res.send({ message: "Results Successfully uploaded" });
  } catch (error) {
    console.log(error.message);
  }
};
