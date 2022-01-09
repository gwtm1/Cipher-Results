import express from 'express';
import mongoose from 'mongoose';
import dotenv from "dotenv";

const { MongoClient } = require('mongodb');
process.env.mongo_details = 'jithendra:jithendra71'
const mongodb_url = `mongodb+srv://${process.env.mongo_details}@cipher-results.5uw4z.mongodb.net/`;


const cors = require('cors')

const signup = require("./routes/signup")
const login = require('./routes/login')

const PORT = process.env.PORT || 3000

mongoose
  .connect(mongodb_url, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {  
    console.log("Connected to mongodb");

    const app = express();
    app.use(express.json())
    app.use(cors())
    app.use("/login", login);
    app.use("/signup", signup);

    app.listen(PORT, () => console.log(`Server Running on Port: http://localhost:${PORT}`));c 
  })
  .catch((error) => {
    console.log(`${error} did not connect`);
  });

mongoose.set('useFindAndModify', false);
