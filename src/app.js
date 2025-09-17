const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const { testConnection } = require('./config/db.config')

// Importar rutas
const userRoutes = require('./routes/user.routes')
const moduleRoutes = require('./routes/module.routes')

const app = express()
const PORT = process.env.PORT || 3005

// Middleware
app.use(cors())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

// Rutas
app.use('/segmed/users', userRoutes)
app.use('/segmed/modules', moduleRoutes)

// Ruta de prueba
app.get('/', (req, res) => {
    res.json({ 
        message: 'Bienvenido al API de SGEMD',
        endpoints: {
            users: '/segmed/users',
            modules: '/segmed/modules'
        }
    })
})

// Manejo de errores
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ success: false, error: 'Error interno del servidor' });
})

// Ruta no encontrada
app.use('*', (req, res) => {
    res.status(404).json({ success: false, error: 'Ruta no encontrada' });
})

// Inicializar la aplicación
async function startServer() {
    const dbConnected = await testConnection();
    if (!dbConnected) {
        console.error('No se pudo conectar a la base de datos. Verifica la configuración.');
        process.exit(1);
    }

    app.listen(PORT, () => {
        console.log(`Servidor ejecutándose en http://localhost:${PORT}`);
        console.log(`API disponible en http://localhost:${PORT}/segmed/`);
    })
}

startServer()