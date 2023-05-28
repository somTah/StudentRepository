const express = require('express')
const router = express.Router()
const studentsController = require('../controllers/studentsController')
router.route('/')
    .get(studentsController.getStudentByFirstAndLastName)
    .post(studentsController.createNewStudent)

module.exports = router