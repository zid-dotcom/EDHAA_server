require('dotenv').config()

const express=require('express')
const cors=require('cors')
const router=require('./routes/router')
const connectCloudinary = require('./config/cloudinary')



const server=express()
server.use(cors())
server.use(express.json())
server.use(router)
require('./connect/db')
connectCloudinary()


const PORT=3000

server.listen(PORT,()=>{
    console.log(`server is Running on ${PORT}`);
    
})







