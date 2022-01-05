const express=require('express');
const cors = require('cors');


const signup = require("./routes/signup")
const login = require('./routes/login')



const app = express();

app.use(express.json())
app.use(cors())

app.get('/',(req,res)=>{res.json('Welcome')})

app.post('/signup',(req,res)=>{signup(req,res)})

app.post('/login',(req,res)=>{login(req,res)})


const PORT = process.env.PORT || 3000

app.listen(PORT, ()=> {
    console.log(`Now listening to port ${PORT}`);
})


