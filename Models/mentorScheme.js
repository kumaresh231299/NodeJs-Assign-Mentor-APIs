import mongoose from "mongoose";

const mentorSchema = mongoose.Schema({
    Mentor_Name: String,
    Mentor_Email: String,
    Students_Assigned: [{
        type: mongoose.SchemaTypes.ObjectId,
        ref: "Students"
    }]
})

const Mentors = mongoose.model("Mentors", mentorSchema);

export default Mentors;