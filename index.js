const express = require('express');
const {connection} = require('./config/db');
const bodyParser = require('body-parser');
const cors = require('cors');
const dotenv = require('dotenv');
const {Authrouter} = require('./routes/authRoutes');
const {DoctorRouter} = require('./routes/doctorRoutes');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 8080;
app.use(express.json());


app.use(cors());
app.use(bodyParser.json());

app.get("/",(req,res)=>{
    res.send("Base API point");
})

app.use('/', Authrouter);
app.use('/appointments',DoctorRouter);


app.listen(PORT ,async()=>{
    try {
        await connection
        console.log("Connected to MongoDB");
    } catch (error) {
        console.log(error);
    }
    console.log("Server is running");
})