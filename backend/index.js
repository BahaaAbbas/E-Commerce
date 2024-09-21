const express = require('express');
const cors = require('cors');
require('dotenv').config();
const connectMDB = require('./config/db');
const router = require('./routes');
const cookieParser = require('cookie-parser');

const app = express()
app.use(cookieParser())
app.use(cors({
    origin : process.env.FRONTEND_URL,
    credentials:true,
}
))
app.use(express.json())

app.use('/api',router);

const PORT = 4001 || process.env.PORT


connectMDB().then(()=>{

    app.listen(PORT,()=>{
        console.log('Connected to MDB')
        console.log(`Server is Running at PORT= ${PORT} `)
    })
})



