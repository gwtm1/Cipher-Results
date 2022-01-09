import express from 'express';
import mongoose from 'mongoose';
import dotenv from "dotenv";
var cors = require('cors')

const signup = require("./routes/signup")
const login = require('./routes/login')

const PORT = process.env.PORT || 3000

mongoose
  .connect(process.env.mongodb_url, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {  
    console.log("Connected to mongodb");

    const app = express();
    app.use(express.json())
    app.use(cors())
    app.use("/", login);
    app.use("/", signup);

    app.listen(PORT, () => console.log(`Server Running on Port: http://localhost:${PORT}`));c 
  })
  .catch((error) => {
    console.log(`${error} did not connect`);
  });

mongoose.set('useFindAndModify', false);
