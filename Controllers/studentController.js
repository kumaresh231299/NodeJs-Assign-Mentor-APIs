import Students from "../Models/studentScheme.js"

//Create a student
export const createStudent = async (req, res) => {
    try {
        const { Student_Name, Student_Email } = req.body;   //This method used for some conditions checking purpose.

        //Check the payload
        if (!Student_Name || !Student_Email) {
            return res.status(400).json({ message: "Student_Name and Student_Email are required" });
        }

        //Check if the student already Exists
        const existingStudent = await Students.findOne({ Student_Email })
        if (existingStudent) {
            return res.status(400).json({ message: `Student with this email i'd : ${Student_Email} already exists. Please try different mail i'd.` })
        }

        //Create a new student
        const newStudent = new Students(req.body)    //  This method is easy way to request payload from user.
        await newStudent.save()
        res.status(200).json({ message: "Student Created Successfully", data: [newStudent] })
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Internal Server Eror in Create method" })
    }
}

//Get all Students
export const getAllStudents = async (req, res) => {
    try {
        const studentDetails = await Students.find().populate('Current_Mentor').populate('Previous_Mentor');
        return res.status(200).json({ message: "Fetched Students successfully", data: studentDetails })

    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Internal Server Error in Get All method" })
    }
}

//Get student by Id
export const getStudentById = async (req, res) => {
    try {
        const stuId = req.params.id;
        const getStuId = await Students.findById(stuId).populate('Current_Mentor').populate('Previous_Mentor');
        if (!getStuId) {
            return res.status(404).json({ message: "Student Not Found!" })
        }
        res.status(200).json({ message: "Student fetched successfully", data: getStuId })
    } catch (error) {
        console.log(error)
        res.status(500).json({ message: "Error Fetching Student" })
    }
}
