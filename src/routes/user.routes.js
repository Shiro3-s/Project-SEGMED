const express = require('express')
const router = express.Router()
const userController = require('../controllers/user.controller')

// Rutas para estudiantes
router.get('/', userController.getAllUsers)
router.get('/students', userController.getAllStudents)
router.get('/teachers', userController.getAllTeachers)
router.get('/admins', userController.getAllAdmins)
router.get('/:id', userController.getUsersById)
router.post('/', userController.createUser)
router.put('/:id', userController.updateUser)
router.delete('/:id', userController.deleteUser)
router.post('/login', userController.loginUser)
router.get('/:id/entrepreneurships', userController.getStudentEntrepreneurships)

module.exports = router