import express from "express";
import {addVideo, addView, deleteVideo, getByTag, getVideo, random, search, subscribed, trend, updateVideo  } from "../controllers/video.js";
import { verifyToken } from "../verifytoken.js";
const router=express.Router();
//add a video
router.post("/",verifyToken,addVideo);
router.put("/:id",verifyToken,updateVideo);
router.delete("/:id",verifyToken,deleteVideo);
router.get("/find/:id",getVideo);
router.get("/view/:id",addView);
router.get("/trend",trend);
router.get("/random",random);
router.get("/sub",verifyToken,subscribed);
router.get("/tags",getByTag);
router.get("/search",search);
export default router;