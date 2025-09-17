const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const { testConnection } = require('./config/db.config')

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
app.use(cors())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

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
app.use('/segmed/tracing', tracing)
app.use('/segmed/assistance', assistance)
app.use('/segmed/econo-sector', econoSector)
app.use('/segmed/diagnosis', diagnosis)
app.use('/segmed/mode', mode)
app.use('/segmed/advice', advice)
app.use('/segmed/event', event)
app.use('/segmed/type-event', typeEvent)
app.use('/segmed/date-times', dateTimes)

// Ruta de prueba   
app.get('/', (req, res) => {
    res.json({ 
        message: 'Bienvenido al API de SGEMD',
        endpoints: {
            users: '/segmed/users',
            modules: '/segmed/modules',
            municipalities: '/segmed/municipalities',
            academicPrograms: '/segmed/academic-programs',
            roles: '/segmed/roles',
            tipoDoc: '/segmed/tipo-doc',
            tipoUsuario: '/segmed/tipo-usuarios',
            uniCenters: '/segmed/uni-centers',
            tipoPoblacion: '/segmed/tipo-poblacion',
            etapadeEmpedimiento: '/segmed/etapade-empedimiento',
            emprendimiento: '/segmed/emprendimiento',
            tracing: '/segmed/tracing',
            assistance: '/segmed/assistance',
            econoSector: '/segmed/econo-sector',
            diagnosis: '/segmed/diagnosis',
            mode: '/segmed/mode',
            advice: '/segmed/advice',
            event: '/segmed/event',
            typeEvent: '/segmed/typeEvent',
            dateTimes: '/segmed/dateTimes'
        }
    })
})

// Manejo de errores
app.use((err, req, res, next) => {
    console.error(err.stack)
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