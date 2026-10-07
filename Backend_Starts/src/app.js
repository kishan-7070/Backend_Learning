import express from "express";
import cors from "cors";

const app=express();


//MW
app.use(express.json({limit:"16kb"})) 
app.use(express.urlencoded({extended:true,limit:"16kb"}))
app.use(express.static("public"));

//cors configuration

app.use(cors({
    origin:process.env.CORS_ORIGIN?.split(",") ,
    credentials:true,
    methods:["GET","POST","PUT","PATCH","DELETE"],
    allowedHeaders:["Content-Type","Authorization"]
}))

import healthCheckRouter from "./routes/healthCheck.routes.js";

app.use("/api/v1/healthcheck",healthCheckRouter);

app.get("/",(req,res)=>{
    res.send("Welcome to basecampy");
})
export default app;
