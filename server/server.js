import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import signup from "./routes/signup.js";
import login from "./routes/login.js";

process.env.mongo_details = 'jithendra:jithendra71'
const mongodb_url = `mongodb+srv://${process.env.mongo_details}@cipher-results.5uw4z.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;
// const mongodb_url = `mongodb+srv://jithendra:jithendra71@cipher-results.5uw4z.mongodb.net/`;

const PORT = process.env.PORT || 8080

mongoose
  .connect(mongodb_url, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {  
    console.log("Connected to mongodb");

    const app = express();
    app.use(express.json())
    app.use(cors())
    app.use("/signup", signup);
    app.use("/login", login);

    app.listen(PORT, () => console.log(`Server Running on Port: http://localhost:${PORT}`));
  })
  .catch((error) => {
    console.log(`${error} did not connect`);
  });

// mongoose.set(useFindAndModify, false);
