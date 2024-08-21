import mongoose from "mongoose";

const studentSchema = mongoose.Schema({
    Student_Name: String,
    Student_Email: String,
    Previous_Mentor: {
        type: mongoose.Schema.Types.ObjectId,
        default: null,
        ref: "Mentors"
    },
    Current_Mentor: {
        type: mongoose.Schema.Types.ObjectId,
        default: null,
        ref: "Mentors"
    }
})

const Students = mongoose.model("Students", studentSchema);

export default Students