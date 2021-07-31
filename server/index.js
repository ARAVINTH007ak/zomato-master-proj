import express from "express";
import cors from"cors";  //!Cross orgin Request 
import helmet from "helmet" 

const zomato=express();

zomato.use(express.json());

zomato.use(helmet());
zomato.use(cors());



zomato.get("/",(req,res)=>{

    res.json("Setup Success")
})

zomato.listen(4000,()=>{
    console.log("Server Running in 4000 Aravinth");
})