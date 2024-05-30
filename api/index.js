import express, { urlencoded } from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import userRouter from "./routes/user.route.js"
import authRouter from "./routes/auth.route.js"
import cookieParser from 'cookie-parser';
import listingRouter from './routes/listing.route.js';
import cors from 'cors'

dotenv.config();

mongoose.connect(process.env.MONGO).then(()=>{
    console.log("Connected to database");
}).catch((err)=>{
    console.log(err);
})

const app=express();
app.use(cors())
app.use(express.json());
app.use(cookieParser());
app.use(urlencoded({extended:false}))

app.listen(3000,()=>{
    console.log('Server is running on port 3000!!');
})

app.use("/api/user",userRouter);
app.use("/api/auth",authRouter);
app.use("/listing", listingRouter)

app.use((err, req, res, next)=>{
    const statusCode=err.statusCode||500;
    const message=err.message||'Internal Server Error'
    return res.status(statusCode).json({
        success:false,
        statusCode,
        message
    })
})