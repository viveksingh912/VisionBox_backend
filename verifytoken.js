import jwt from "jsonwebtoken"
import { crateError } from "./error.js";
export const verifyToken=(req,res,next)=>{
    // const token=req.cookies.access_token;
    // // console.log(accessToken);
    const authHeader = req.header('Authorization');
    const token = authHeader && authHeader.split(' ')[1]; 
    // console.log(accessToken);
    // console.log(token);
    if(!token  ){
        return res.status(401).send("You're not authenticated");
    }
    jwt.verify(token,'shhhhh',(err,user)=>{
        if(err)
        return res.status(403).send("Invalid token");
        //assigning this usr to req
        // console.log(req.params.id);
        req.user=user;
        next(); 
    });
}