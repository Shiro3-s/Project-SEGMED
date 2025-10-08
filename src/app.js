
require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const { testConnection } = require('./config/db.config');

// Importar rutas
const userRoutes = require('./routes/user.routes')
const moduleRoutes = require('./routes/module.routes')
const municipalitiesRoutes = require('./routes/municipalities.routes')
const academicProgramRoutes = require('./routes/academicProgram.routes')
const roles = require('./routes/roles.routes')
const tipoDoc = require('./routes/typeDoc.routes')
const tipoUsuario = require('./routes/typeUsers.routes')
const uniCenters = require('./routes/uniCenters.routes')
const tipoPoblacion = require('./routes/typePop.routes')
const EtapadeEmprendimiento = require('./routes/entrepStage.routes')
const emprendimiento = require('./routes/entrepreneurship.routes')
const tracing = require('./routes/tracing.routes')
const assistance = require('./routes/assistance.routes')
const econoSector = require('./routes/econoSector.routes')
const diagnosis = require('./routes/diagnosis.routes')
const mode = require('./routes/mode.routes')
const advice = require('./routes/advice.routes')
const event = require('./routes/event.routes')
const typeEvent = require('./routes/typeEvent.routes')
const dateTimes = require('./routes/dateTimes.routes')

// Crear la aplicación

const app = express()
const PORT = process.env.PORT || 3005


// Middleware
const verifyToken = require('./middleware/auth.middleware');
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Request logging middleware
app.use((req, res, next) => {
    console.log(`${new Date().toISOString()} - ${req.method} ${req.url}`);
    next();
});

// CORS middleware (headers)
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
    if (req.method === 'OPTIONS') {
        res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH');
        return res.status(200).json({});
    }
    next();
});

// Rutas
app.use('/segmed/users', userRoutes)
app.use('/segmed/modules', moduleRoutes)
app.use('/segmed/municipalities', municipalitiesRoutes)
app.use('/segmed/academic-programs', academicProgramRoutes)
app.use('/segmed/roles', roles)
app.use('/segmed/type-doc', tipoDoc)
app.use('/segmed/type-users', tipoUsuario)
app.use('/segmed/uni-centers', uniCenters)
app.use('/segmed/type-pop', tipoPoblacion)
app.use('/segmed/entrep-stage', EtapadeEmprendimiento)
app.use('/segmed/entrepreneurship', emprendimiento)
// Proteger rutas siguientes con el middleware de autenticación
app.use('/segmed/tracing', verifyToken, tracing)
app.use('/segmed/assistance', verifyToken, assistance)
app.use('/segmed/econo-sector', verifyToken, econoSector)
app.use('/segmed/diagnosis', verifyToken, diagnosis)
app.use('/segmed/mode', verifyToken, mode)
app.use('/segmed/advice', verifyToken, advice)
app.use('/segmed/event', verifyToken, event)
app.use('/segmed/type-event', verifyToken, typeEvent)
app.use('/segmed/date-times', verifyToken, dateTimes)


// Health check route
app.get('/health', (req, res) => {
    res.status(200).json({ status: 'OK', timestamp: new Date() });
});


// Handle undefined routes
app.use((req, res) => {
    res.status(404).json({ 
        message: `No se puede encontrar ${req.originalUrl} en este servidor!` 
    });
});

// Error handling middleware
app.use((err, req, res, next) => {
    const statusCode = err.statusCode || 500;
    res.status(statusCode).json({
        status: 'error',
        message: err.message || 'Error interno del servidor'
    });
});

// Inicializar la aplicación
async function startServer() {
    const dbConnected = await testConnection();
    if (!dbConnected) {
        console.error('No se pudo conectar a la base de datos. Verifica la configuración.');
        process.exit(1);
    }

    const server = app.listen(PORT, () => {
        console.log('=================================');
        console.log(`🚀 Server running on port ${PORT}`);
        console.log(`🌍 Environment: ${process.env.NODE_ENV}`);
        console.log('=================================');
        console.log('Available routes:');
        console.log('HEALTH CHECK:');
        console.log('GET /health - Health check');
        console.log('SEGMENTED API ROUTES:');
        console.log('/segmed/*');
        console.log('=================================');
    });
}

startServer();