const Student = require('../models/Student');
const asyncHandler = require('express-async-handler');

const getStudentByFirstAndLastName = asyncHandler(async (req, res) => {
    const { firstName, lastName } = req.query;

    try {
        const student = await Student.findOne({ firstName, lastName });
        
        if (!student) {
            return res.status(404).json({ message: 'Student not found' });
        }
        
        res.status(200).json(student);
    } catch (err) {
        res.status(500).json({ message: 'Failed to get student' });
    }
});

const createNewStudent = asyncHandler(async (req, res) => {
    const { firstName, lastName, telephone, email } = req.body;

    // Confirm data
    if (!firstName || !lastName || !telephone || !email) {
        return res.status(400).json({ message: 'All fields are required' });
    }

    try {
        const newStudent = new Student({
            firstName,
            lastName,
            telephone,
            email
        });

        const createdStudent = await newStudent.save();
        res.status(201).json(createdStudent);
    } catch (err) {
        res.status(500).json({ message: 'Failed to create a new student' });
    }
});

module.exports = {
    getStudentByFirstAndLastName,
    createNewStudent
};
