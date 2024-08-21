import mongoose from "mongoose";
import dotenv from "dotenv"

dotenv.config()

const MONGODB_URL = process.env.MONGODB_URL

const connectDB = async (req, res) => {
    try {
        const connection = await mongoose.connect(MONGODB_URL)
        console.log("MongoDb Connected Successfully");
        return connection;
    } catch (error) {
        console.log("Error connecting to the database", error);
        res.status(500).json({ message: "MongoDB connection Error" })
    }
}

export default connectDB;