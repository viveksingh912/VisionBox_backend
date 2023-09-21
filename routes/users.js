import express from "express";
import { update,deleteUser,getUser,subscribe,unSubscribe,like,dislike } from "../controllers/user.js";
import { verifyToken } from "../verifytoken.js";
const router=express.Router();


//dpdate a user 
router.put("/:id",verifyToken,update)

// delete a user
router.delete("/:id",verifyToken,deleteUser );
// get a user
router.get("/find/:id",getUser);

//subscribe a user
router.put("/sub/:id",verifyToken,subscribe);

//unsubscribe a user
router.put("/unsub/:id",verifyToken,unSubscribe);
//like a video 
router.put("/like/:videoId",verifyToken,like);
//dislike a video
router.put("/dislike/:videoId",verifyToken,dislike);
export default router;