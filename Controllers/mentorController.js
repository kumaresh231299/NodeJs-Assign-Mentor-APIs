import Mentors from "../Models/mentorScheme.js";
import Students from "../Models/studentScheme.js";

//Mentor Creation
export const createMentor = async (req, res) => {
    try {
        const { Mentor_Name, Mentor_Email } = req.body;

        //Check the payload
        if (!Mentor_Name || !Mentor_Email) {
            return res.status(400).json({ message: "Mentor_Name and Mentor_Email are required" })
        }

        //Check if the student already Exists
        const existingMentor = await Mentors.findOne({ Mentor_Email })
        if (existingMentor) {
            return res.status(400).json({ message: `Mentor with this email i'd : ${Mentor_Email} already exists. Please try different mail i'd.` })
        }

        //Create a new Mentor
        const newMentor = new Mentors(req.body)
        await newMentor.save()
        res.status(200).json({ message: "Mentor Created Successfully", data: [newMentor] })

    } catch (error) {
        console.log(error)
        res.status(500).json({ message: "Internal server error in Mentor Create method", })
    }
}

//Get All Mentor
export const getAllMentor = async (req, res) => {
    try {
        const mentorDetails = await Mentors.find().populate('Students_Assigned')
        return res.status(200).json({ message: "Fetched Students successfully", data: mentorDetails })
    } catch (error) {
        console.log(error)
        res.status(500).json({ message: "Internal Server Error in Get All method" })
    }
}

//Get Mentor By Id
export const getMentorById = async (req, res) => {
    try {
        const mentorId = req.params.id;
        const getMentorId = await Mentors.findById(mentorId).populate('Students_Assigned')
        if(!getMentorId){
            return res.status(404).json({message:"Mentor Not found!"})
        }
        res.status(200).json({ message: "Mentor fetched successfully", data: getMentorId })
    } catch (error) {
        console.log(error)
        res.status(500).json({message:"Internal Server Error in getbyid method"})
    }
}

//Assign Students to a Mentor
export const assignStudentsToMentor = async(req,res)=>{
    try {
        const {mentorId, studentIds} = req.body;

        //Validate input
        if(!mentorId || !studentIds || studentIds.length === 0){
            return res.status(400).json({message:"Mentor Id and at least one student Id are required"})
        }

        //Find the mentor by ID
        const mentor = await Mentors.findById(mentorId);
        if(!mentor){
            return res.status(404).json({message:"Mentor Not Found"});
        }

        //Filter out students who already have a current mentor
        const validStudents = await Students.find({
            _id: {$in: studentIds},
            Current_Mentor: null
        });
        if(!validStudents.length){
            return res.status(400).json({message:"No Valid students to assign"})
        }

        //Update each valid student's Current_Mentor and add them to mentor's Students_Assigned
        const updatePromises = validStudents.map((stu)=>{
            stu.Current_Mentor = mentorId;
            return stu.save();
        })

        await Promise.all(updatePromises)     //"Promise.all" - handle multiple updates in parallel.

        //Update mentor's Students_Assigned array
        mentor.Student_Assigned.push(...validStudents.map(student => student._id));
        await mentor.save();
        res.status(200).json({message:"Students assigned successfully", data: validStudents})

    } catch (error) {
        console.log(error)
        res.status(500).json({message:"Internal Server Error in assign student method"})
    }
}