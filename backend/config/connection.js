import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const databaseConnection = async () => {
  try {
    const userName = process.env.DB_USERNAME;
    const password = process.env.DB_PASSWORD;
    const mongoUrl = `mongodb+srv://${userName}:${password}@cluster0.6wmwktk.mongodb.net/UserData?appName=Cluster0`;
    const conn = await mongoose.connect(mongoUrl);
    console.log("Successfully connected");
  } catch (e) {
    console.error("mongodb connection error " + e.message);
    process.exit(1);
  }
};

export default databaseConnection;
