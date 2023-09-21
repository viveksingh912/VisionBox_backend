import { crateError } from "../error.js";
import User from "../models/User.js";
import Video from "../models/Video.js";
export const addVideo = async (req, res, next) => {
  const newVideo = new Video({ userId: req.user.id, ...req.body });
  try {
    const savedVideo = await newVideo.save();
    res.status(200).json(savedVideo);
  } catch (err) {
    next(err);
  }
};
export const updateVideo = async (req, res, next) => {
  try {
    const video = await Video.findById(req.params.id);
    if (req.user.id === video.userId) {
      const updateVideo = await Video.findByIdAndUpdate(
        req.params.id,
        {
          $set: req.body,
        },
        { new: true }
      );
      res.status(200).json(updateVideo);
    }
    else
    return next(crateError(403),'You can only update you video');
  } catch (err) {
    next(err);
  }
};
export const deleteVideo =async (req, res, next) => {
  try {
    const video = await Video.findById(req.params.id);
    if (req.user.id === video.userId) {
      await Video.findByIdAndDelete(req.params.id);
        res.status(200).send("Your video has been successfully deleted");
    }
    else
    return next(crateError(403),'You can only delete you video');
  } catch (err) {
    next(err);
  }
};
export const getVideo =async (req, res, next) => {
  try {
    const video = await Video.findById(req.params.id);
    res.status(200).json(video);
  } catch (err) {
    next(err);
  }
};
export const addView =async (req, res, next) => {
  try {
    const video = await Video.findByIdAndUpdate(req.params.id,{
        $inc:{views:1},
    });
    res.status(200).send('The view has been increased');
  } catch (err) {
    next(err);
  }
};
export const trend =async (req, res, next) => {
  try {
    // views=-1 sort the most viewed videos
    const videos = await Video.find().sort({views:-1});
    res.status(200).send(videos);
  } catch (err) {
    next(err);
  }
};
export const random =async (req, res, next) => {
  try {
    // aggregate return some random videos
    const videos = await Video.aggregate([{$sample:{size:40}}]) 
    res.status(200).send(videos);
  } catch (err) {
    next(err);
  }
};
export const subscribed = async (req, res, next) => {
  try {
    const user = await User.findById(req.user.id);
    const subscribedChannels = user.subscribedUsers;

    const list = await Promise.all(
      subscribedChannels.map(async (channelId) => {
        return await Video.find({ userId: channelId });
      })
    );

    res.status(200).json(list.flat().sort((a, b) => b.createdAt - a.createdAt));
  } catch (err) {
    next(err);
  }
};


export const getByTag =async (req, res, next) => {
  try {
  
    const tags=req.query.tags.split(",");
    console.log(tags);
    const videos = await Video.find({tags:{$in:tags}}).limit(20);
    res.status(200).send(videos);
  } catch (err) {
    next(err);
  }
};
export const search =async (req, res, next) => {
  try {
    const query=req.query.q;
    // console.log(query);
    // regex is used to partially match any title word ... and option meeans upder case and lower case will be igonorwed
    const videos = await Video.find({title:{$regex:query,$options:"i"}}).limit(40);
    // console.log(videos);
    res.status(200).send(videos);
  } catch (err) {
    next(err);
  }
};