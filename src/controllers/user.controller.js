const usersService = require('../services/users.service')

// Obtener todos los estudiantes
exports.getAllUsers = async (req, res) => {
    try {
        const users = await usersService.findAll()
        res.json({ success: true, data: users })
    } catch (error) {
        console.error('Error en getAllUsers:', error)
        res.status(500).json({ success: false, error: error.message })
    }
}

exports.getAllStudents = async (req, res) => {
    try {
        const students = await usersService.findAllStudents()
        res.json({ success: true, data: students })
    } catch (error) {
        console.error('Error en getAllStudents:', error)
        res.status(500).json({ success: false, error: error.message })
    }
}

exports.getAllTeachers = async (req, res) => {
    try {
        const teachers = await usersService.findAllTeachers()
        res.json({ success: true, data: teachers })
    } catch (error) {
        console.error('Error en getAllTeachers:', error)
        res.status(500).json({ success: false, error: error.message })
    }
}

exports.getAllAdmins = async (req, res) => {
    try {
        const admins = await usersService.findAllAdmin()
        res.json({ success: true, data: admins })
    } catch (error) {
        console.error('Error en getAllAdmins:', error)
        res.status(500).json({ success: false, error: error.message })
    }
}

// Obtener usuario por ID
exports.getUsersById = async (req, res) => {
    try {
        const user = await usersService.findById(req.params.id)
        res.json({ success: true, data: user })
    } catch (error) {
        console.error('Error en getStudentById:', error)
        res.status(404).json({ success: false, error: error.message })
    }
}

// Crear nuevo usuario
exports.createUser = async (req, res) => {
    try {
        const newUser = await usersService.create(req.body)
        res.status(201).json({ success: true, data: newUser })
    } catch (error) {
        console.error('Error en createUsers:', error)
        res.status(400).json({ success: false, error: error.message })
    }
}

// Actualizar estudiante
exports.updateUser = async (req, res) => {
    try {
        const updated = await usersService.update(req.params.id, req.body);
        if (updated) {
            res.json({ success: true, message: 'Usuario actualizado correctamente' })
        } else {
            res.status(404).json({ success: false, error: 'Usuario no encontrado' })
        }
    } catch (error) {
        console.error('Error en updateUsuario:', error)
        res.status(400).json({ success: false, error: error.message })
    }
}

// Eliminar usuario
exports.deleteUser = async (req, res) => {
    try {
        const deleted = await usersService.remove(req.params.id)
        if (deleted) {
            res.json({ success: true, message: 'Usuario eliminado correctamente' })
        } else {
            res.status(404).json({ success: false, error: 'Usuario no encontrado' })
        }
    } catch (error) {
        console.error('Error en deleteUsuario:', error)
        res.status(500).json({ success: false, error: error.message })
    }
}

// Login de usuario
exports.loginUser = async (req, res) => {
    try {
        const { email } = req.body;
        if (!email) {
            return res.status(400).json({ success: false, error: 'Email es requerido' })
        }
        
        const user = await usersService.login(email)
        res.json({ success: true, data: user })
    } catch (error) {
        console.error('Error en loginUser:', error)
        res.status(401).json({ success: false, error: error.message })
    }
}

// Obtener emprendimientos de estudiante
exports.getStudentEntrepreneurships = async (req, res) => {
    try {
        const entrepreneurships = await usersService.getEntrepreneurships(req.params.id)
        res.json({ success: true, data: entrepreneurships })
    } catch (error) {
        console.error('Error en getStudentEntrepreneurships:', error)
        res.status(500).json({ success: false, error: error.message })
    }
}