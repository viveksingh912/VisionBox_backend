import express from "express";
import mongoose from "mongoose";
import userRoute from "./routes/users.js";
import videoRoute from "./routes/videos.js";
import commentRoute from "./routes/comments.js";
import authRoute from "./routes/auth.js";
import cookieParser from "cookie-parser";
import cors from 'cors';
const app = express();
const Connect = () => {
  const username = 'vivek'; // Replace with your actual username
  const password = 'viveksingh'; // Replace with your actual password
  const databaseName = 'vision'; // Specify the database name

  mongoose
    .connect(
      `mongodb+srv://${username}:${password}@cluster0.7jnnhcy.mongodb.net/${databaseName}?retryWrites=true&w=majority`,
      { useNewUrlParser: true, useUnifiedTopology: true }
    )
    .then(() => {
      console.log(`Connected to the '${databaseName}' database`);
    })
    .catch((error) => {
      console.error(`Error connecting to the '${databaseName}' database:`, error);
    });
};
// to accpt json files form outside
app.use(express.json());
app.use(cookieParser());
const corsOptions = {
  origin: '*',
  credentials: true,
};

app.use(cors(corsOptions));
app.use("/api/auth", authRoute);
app.use("/api/videos", videoRoute);
app.use("/api/comments", commentRoute);
app.use("/api/users", userRoute);
Connect();
app.listen(8800, () => {
  console.log("connected");
});
