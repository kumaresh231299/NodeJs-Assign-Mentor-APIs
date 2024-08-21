import express from "express"
import { assignStudentsToMentor, createMentor, getAllMentor, getMentorById } from "../Controllers/mentorController.js";

const router = express.Router()

router.post("/create",createMentor)
router.get("/getAllMentor",getAllMentor)
router.get("/mentorDetails/:id",getMentorById)
router.put("/assignStudents",assignStudentsToMentor)

export default router;