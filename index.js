import express from "express"
import cors from "cors"
import dotenv from "dotenv"
import connectDB from "./Database/config.js"
import studentRouter from "./Routers/studentRouter.js"
import mentorRouter from "./Routers/mentorRouter.js"

dotenv.config()

//Initialize the express app
const app = express();

//Configuring Middleware
app.use(cors())
app.use(express.json())

connectDB();

const PORT = process.env.PORT || 5000;

app.use("/api/student",studentRouter);
app.use("/api/mentor",mentorRouter);

//Default Get method 
app.get("/", (req, res) => {
    res.status(200).send("Welcome to our App")
})

//Listening to particular port
app.listen(PORT, () => {
    console.log("App is listening on port")
})