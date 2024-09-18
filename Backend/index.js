import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import testRouter from './routes/test.route.js'
import authRouter from './routes/auth.route.js'
import userRoute from './routes/user.route.js'
import listingRoute from './routes/listing.route.js'
import cookieParser from "cookie-parser";

dotenv.config();

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("Successfully connected to Database.");
  })
  .catch((error) => {
    console.log(error);
  });

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());


const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
  console.log(`Server is running on the PORT ${PORT}`);
});

app.use("/api/test", testRouter);
app.use("/api/auth", authRouter);
app.use("/api/user", userRoute);
app.use("/api/listing", listingRoute);
