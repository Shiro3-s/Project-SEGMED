const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const { pool } = require('../config/db.config');
const userService = require('../services/users.service');

class AuthController {
    constructor() {
        this.login = this.login.bind(this);
        this.register = this.register.bind(this);
    }

    async login(req, res) {
        try {
            const { email, password } = req.body;
            // Buscar usuario por correo institucional
            const [rows] = await pool.execute(
                'SELECT * FROM Usuarios WHERE CorreoInstitucional = ? AND Estado = 1',
                [email]
            );
            const user = rows[0];
            if (!user || !bcrypt.compareSync(password, user.Contrasena)) {
                return res.status(401).json({ message: 'Credenciales inválidas' });
            }
            const token = jwt.sign(
                { id: user.idUsuarios, email: user.CorreoInstitucional },
                process.env.JWT_SECRET,
                { expiresIn: '8h' }
            );
            res.json({ token });
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }

    async register(req, res) {
        try {
            const { Nombre, CorreoInstitucional, Contrasena } = req.body;
            // Verificar si el correo ya está registrado
            const emailExists = await userService.emailExists(CorreoInstitucional);
            if (emailExists) {
                return res.status(400).json({ message: 'El email ya está registrado' });
            }
            const hashedPassword = bcrypt.hashSync(Contrasena, 10);
            // Crear usuario (ajustar campos según tu modelo)
            const newUser = {
                ...req.body,
                Contrasena: hashedPassword
            };
            const user = await userService.create(newUser);
            res.status(201).json({
                message: 'Usuario registrado exitosamente',
                userId: user.id
            });
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }
}

module.exports = new AuthController();
