import mongoose from "mongoose"
import bcrypt from "bcryptjs"
import User from "../models/User.js"
import jwt from "jsonwebtoken";
import { crateError } from "../error.js";
export const signup= async(req,res,next)=>{
    // console.log(req.body);
    try{
    const user= await User.findOne({email:req.body.email});
    if(user){
        return res.status(400).send("Sorry a User with this email already exists");
    }
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(req.body.password, salt);
    const newUser=await User.create({...req.body,password:hash});
    await newUser.save();
    const {password,...send}=newUser._doc;
    var accessToken = jwt.sign({id:send._id}, 'shhhhh');
    const newData={...send,accessToken}
    res.status(200).json(newData);
    }
    catch(err){
        next(err);
    }
}
export const signin= async(req,res,next)=>{
    // console.log(req.body);
    try{
    const user= await User.findOne({name:req.body.name});
    if(!user){
        return res.status(404).send("Invalid Credentials");
    }
    const checkPassword= await  bcrypt.compareSync(req.body.password, user.password); // true
    if(!checkPassword){
        return next(crateError(400,"Wrong Credentials")); 
    }
    const {password,...send}=user._doc;
    const accessToken = jwt.sign({id:send._id}, 'shhhhh');
     const newData={...send,accessToken}
     res.status(200).json(newData);
    }
    catch(err){
        next(err);
    }
}
export const googleAuth=async (req,res,next)=>{
    try{
        const user=await User.findOne({email:req.body.email});
        if(user){
            const accessToken = jwt.sign({id:user._id}, 'shhhhh');
            res.status(200).json({...user._doc,accessToken});
        }
        else{
            const newUser=new User({
                ...req.body,
                fromGoogle:true, 
            })
            const savedUser=await newUser.save();
            const accessToken = jwt.sign({id:savedUser._id}, 'shhhhh');
            res.status(200).json({...savedUser._doc,accessToken});
        }
    }
    catch(err){
        next(err);
    }
}
