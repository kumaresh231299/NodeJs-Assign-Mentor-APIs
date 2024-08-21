import express from "express"
import { createStudent, getAllStudents, getStudentById } from "../Controllers/studentController.js";

const router = express.Router();

router.post("/create",createStudent)
router.get("/getAllStu",getAllStudents)
router.get("/studentDetails/:id",getStudentById)

export default router;