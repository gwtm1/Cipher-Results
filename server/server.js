import express from "express";
import mongoose from "mongoose";
import bodyParser from 'body-parser';
import cors from "cors";
import signup from "./routes/signup.js";
import login from "./routes/login.js";
import uploadresults from "./routes/uploadresults.js";
import dotenv from "dotenv";
dotenv.config();

const mongodb_url = `mongodb+srv://${process.env.mongo_details}@cipher-results.5uw4z.mongodb.net/cipherResults?retryWrites=true&w=majority`;
// const mongodb_url = `mongodb+srv://jithendra:jithendra71@cipher-results.5uw4z.mongodb.net/`; 

const PORT = process.env.PORT || 8080;

mongoose
  .connect(mongodb_url, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log("Connected to mongodb");

    const app = express();
    app.use(express.json());
    // app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: true }));
    app.use(cors());

    app.use("/signup", signup);
    app.use("/login", login);
    app.use("/uploadresults", uploadresults);
    app.get("/", (req, res) => {
      return res.json({ title: "CipherResults" });
    });

    app.listen(PORT, () => console.log(`Server Running on Port:${PORT}`));
  })
  .catch((error) => {
    console.log(`${error} did not connect`);
  });

// mongoose.set(useFindAndModify, false);
