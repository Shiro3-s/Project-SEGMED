const { pool } = require('../config/db.config');

// Obtener todos los usuarios
exports.findAll = async () => {
    const [rows] = await pool.execute(`
        SELECT u.idUsuarios, u.Nombre, u.CorreoInstitucional, u.CorreoPersonal, 
               u.Celular, u.Telefono, u.Direccion, u.Genero, u.EstadoCivil,
               u.FechaNacimiento, u.Estado, u.Semestre, u.Modalidad,
               tu.TipodeUsuario, pa.Nombre as ProgramaAcademico,
               m.Nombre as Municipio, td.TipoDocumento,
               cu.Nombre as CentroUniversitario, tp.Nombre as TipoPoblacion,
               r.Nombre as Rol
        FROM Usuarios u
        INNER JOIN TipoUsuarios tu ON u.TipoUsuarios_idTipoUsuarios = tu.idTipoUsuarios
        LEFT JOIN ProgramaAcademico pa ON u.ProgramaAcademico_idProgramaAcademico = pa.idProgramaAcademico
        LEFT JOIN Municipios m ON u.Municipios_idMunicipio = m.idMunicipio
        LEFT JOIN TipoDocumentos td ON u.TipoDocumentos_idTipoDocumento = td.idTipoDocumento
        LEFT JOIN CentroUniversitarios cu ON u.CentroUniversitarios_idCentroUniversitarios = cu.idCentroUniversitarios
        LEFT JOIN TipoPoblacion tp ON u.TipoPoblacion_idTipoPoblacion = tp.idTipoPoblacion
        LEFT JOIN Roles r ON u.Roles_idRoles1 = r.idRoles
        WHERE u.Estado = 1
    `);
    return rows;
}
// Obtener todos los estudiantes
exports.findAllStudents = async () => {
    const [rows] = await pool.execute(`
        SELECT u.idUsuarios, u.Nombre, u.CorreoInstitucional, u.CorreoPersonal, 
               u.Celular, u.Telefono, u.Direccion, u.Genero, u.EstadoCivil,
               u.FechaNacimiento, u.Estado, u.Semestre, u.Modalidad,
               tu.TipodeUsuario, pa.Nombre as ProgramaAcademico,
               m.Nombre as Municipio, td.TipoDocumento,
               cu.Nombre as CentroUniversitario, tp.Nombre as TipoPoblacion,
               r.Nombre as Rol
        FROM Usuarios u
        INNER JOIN TipoUsuarios tu ON u.TipoUsuarios_idTipoUsuarios = tu.idTipoUsuarios
        LEFT JOIN ProgramaAcademico pa ON u.ProgramaAcademico_idProgramaAcademico = pa.idProgramaAcademico
        LEFT JOIN Municipios m ON u.Municipios_idMunicipio = m.idMunicipio
        LEFT JOIN TipoDocumentos td ON u.TipoDocumentos_idTipoDocumento = td.idTipoDocumento
        LEFT JOIN CentroUniversitarios cu ON u.CentroUniversitarios_idCentroUniversitarios = cu.idCentroUniversitarios
        LEFT JOIN TipoPoblacion tp ON u.TipoPoblacion_idTipoPoblacion = tp.idTipoPoblacion
        LEFT JOIN Roles r ON u.Roles_idRoles1 = r.idRoles
        WHERE tu.TipodeUsuario = 'Estudiante' AND u.Estado = 1
        `)
        return rows
}

exports.findAllTeachers = async () => {
    const [rows] = await pool.execute(`
        SELECT u.idUsuarios, u.Nombre, u.CorreoInstitucional, u.CorreoPersonal, 
               u.Celular, u.Telefono, u.Direccion, u.Genero, u.EstadoCivil,
               u.FechaNacimiento, u.Estado, u.Semestre, u.Modalidad,
               tu.TipodeUsuario, pa.Nombre as ProgramaAcademico,
               m.Nombre as Municipio, td.TipoDocumento,
               cu.Nombre as CentroUniversitario, tp.Nombre as TipoPoblacion,
               r.Nombre as Rol
        FROM Usuarios u
        INNER JOIN TipoUsuarios tu ON u.TipoUsuarios_idTipoUsuarios = tu.idTipoUsuarios
        LEFT JOIN ProgramaAcademico pa ON u.ProgramaAcademico_idProgramaAcademico = pa.idProgramaAcademico
        LEFT JOIN Municipios m ON u.Municipios_idMunicipio = m.idMunicipio
        LEFT JOIN TipoDocumentos td ON u.TipoDocumentos_idTipoDocumento = td.idTipoDocumento
        LEFT JOIN CentroUniversitarios cu ON u.CentroUniversitarios_idCentroUniversitarios = cu.idCentroUniversitarios
        LEFT JOIN TipoPoblacion tp ON u.TipoPoblacion_idTipoPoblacion = tp.idTipoPoblacion
        LEFT JOIN Roles r ON u.Roles_idRoles1 = r.idRoles
        WHERE tu.TipodeUsuario = 'Docente' AND u.Estado = 1
        `)
        return rows
}

exports.findAllAdmin = async () => {
    const [rows] = await pool.execute(`
        SELECT u.idUsuarios, u.Nombre, u.CorreoInstitucional, u.CorreoPersonal, 
               u.Celular, u.Telefono, u.Direccion, u.Genero, u.EstadoCivil,
               u.FechaNacimiento, u.Estado, u.Semestre, u.Modalidad,
               tu.TipodeUsuario, pa.Nombre as ProgramaAcademico,
               m.Nombre as Municipio, td.TipoDocumento,
               cu.Nombre as CentroUniversitario, tp.Nombre as TipoPoblacion,
               r.Nombre as Rol
        FROM Usuarios u
        INNER JOIN TipoUsuarios tu ON u.TipoUsuarios_idTipoUsuarios = tu.idTipoUsuarios
        LEFT JOIN ProgramaAcademico pa ON u.ProgramaAcademico_idProgramaAcademico = pa.idProgramaAcademico
        LEFT JOIN Municipios m ON u.Municipios_idMunicipio = m.idMunicipio
        LEFT JOIN TipoDocumentos td ON u.TipoDocumentos_idTipoDocumento = td.idTipoDocumento
        LEFT JOIN CentroUniversitarios cu ON u.CentroUniversitarios_idCentroUniversitarios = cu.idCentroUniversitarios
        LEFT JOIN TipoPoblacion tp ON u.TipoPoblacion_idTipoPoblacion = tp.idTipoPoblacion
        LEFT JOIN Roles r ON u.Roles_idRoles1 = r.idRoles
        WHERE tu.TipodeUsuario = 'Administrativo' AND u.Estado = 1
        `)
        return rows
}



// Obtener usuario por ID
exports.findById = async (id) => {
    const [rows] = await pool.execute(`
        SELECT u.idUsuarios, u.Nombre, u.CorreoInstitucional, u.CorreoPersonal,
               u.Celular, u.Telefono, u.Direccion, u.Genero, u.EstadoCivil,
               u.FechaNacimiento, u.Semestre, u.Modalidad, u.Estado,
               tu.TipodeUsuario, pa.Nombre as ProgramaAcademico,
               cu.Nombre as CentroUniversitario, m.Nombre as Municipio,
               td.TipoDocumento, r.Nombre as Rol, tp.Nombre as TipoPoblacion,
               u.Password
        FROM Usuarios u
        INNER JOIN TipoUsuarios tu ON u.TipoUsuarios_idTipoUsuarios = tu.idTipoUsuarios
        LEFT JOIN ProgramaAcademico pa ON u.ProgramaAcademico_idProgramaAcademico = pa.idProgramaAcademico
        LEFT JOIN CentroUniversitarios cu ON u.CentroUniversitarios_idCentroUniversitarios = cu.idCentroUniversitarios
        LEFT JOIN Municipios m ON u.Municipios_idMunicipio = m.idMunicipio
        LEFT JOIN TipoDocumentos td ON u.TipoDocumentos_idTipoDocumento = td.idTipoDocumento
        LEFT JOIN Roles r ON u.Roles_idRoles1 = r.idRoles
        LEFT JOIN TipoPoblacion tp ON u.TipoPoblacion_idTipoPoblacion = tp.idTipoPoblacion
        WHERE u.idUsuarios = ? AND u.Estado = 1
    `, [id])
    if (rows.length === 0) {
        throw new Error('Usuario no encontrado')
    }
    return rows[0];
};

// Buscar usuario por correo (para login y seguridad)
exports.findByEmail = async (email) => {
    const [rows] = await pool.execute(
        'SELECT * FROM Usuarios WHERE CorreoInstitucional = ? AND Estado = 1',
        [email]
    );
    return rows[0];
};

// Cambiar contraseña de usuario
const bcrypt = require('bcryptjs');
exports.changePassword = async (userId, oldPassword, newPassword) => {
    const [rows] = await pool.execute(
        'SELECT Password FROM Usuarios WHERE idUsuarios = ? AND Estado = 1',
        [userId]
    );
    if (!rows[0] || !bcrypt.compareSync(oldPassword, rows[0].Password)) {
        throw new Error('Contraseña actual incorrecta');
    }
    const hashedPassword = bcrypt.hashSync(newPassword, 10);
    await pool.execute(
        'UPDATE Usuarios SET Password = ? WHERE idUsuarios = ?',
        [hashedPassword, userId]
    );
    return true;
};

// Obtener perfil seguro (sin contraseña)
exports.getProfile = async (userId) => {
    const [rows] = await pool.execute(
        'SELECT idUsuarios, Nombre, CorreoInstitucional, CorreoPersonal, FechaCreacion FROM Usuarios WHERE idUsuarios = ? AND Estado = 1',
        [userId]
    );
    return rows[0];
};

// Obtener perfil público
exports.getPublicProfile = async (userId) => {
    const [rows] = await pool.execute(
        'SELECT idUsuarios, Nombre FROM Usuarios WHERE idUsuarios = ? AND Estado = 1',
        [userId]
    );
    return rows[0];
};

// Verificar si el correo ya existe
exports.emailExists = async (email) => {
    const [rows] = await pool.execute(
        'SELECT idUsuarios FROM Usuarios WHERE CorreoInstitucional = ? AND Estado = 1',
        [email]
    );
    return rows.length > 0;
};

// Crear nuevo estudiante
exports.create = async (newUser) => {
    // Verificar si el correo ya existe
    const emailExists = await exports.emailExists(newUser.CorreoInstitucional)
    if (emailExists) {
        throw new Error('El correo institucional ya está registrado')
    }

    // Usar los IDs proporcionados directamente desde el cliente
    const tipoUsuario = [{ idTipoUsuarios: newUser.TipoUsuarios_idTipoUsuarios }];
    const rol = [{ idRoles: newUser.Roles_idRoles1 }];

    const fechaActual = new Date()
    // Hash the password before storing it
    const hashedPassword = bcrypt.hashSync(newUser.Password, 10)
    const [result] = await pool.execute(
        `INSERT INTO Usuarios (
            Nombre, CorreoInstitucional, CorreoPersonal, Celular, Telefono,
            Direccion, Genero, EstadoCivil, FechaNacimiento, Password,
            Modulos_idModulos, Municipios_idMunicipio, ProgramaAcademico_idProgramaAcademico, 
            Roles_idRoles1, TipoDocumentos_idTipoDocumento, TipoUsuarios_idTipoUsuarios,
            ProgramaAcademico_idProgramaAcademico1, CentroUniversitarios_idCentroUniversitarios,
            Estado, Semestre, Modalidad, TipoPoblacion_idTipoPoblacion,
            FechaCreacion, FechaActualizacion
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
        `,
        [
            newUser.Nombre,
            newUser.CorreoInstitucional,
            newUser.CorreoPersonal || '',
            newUser.Celular || '',
            newUser.Telefono || '',
            newUser.Direccion || '',
            newUser.Genero || '',
            newUser.EstadoCivil || '',
            newUser.FechaNacimiento || fechaActual,
            hashedPassword,
            newUser.Modulos_idModulos || 1,
            newUser.Municipios_idMunicipio || 1,
            newUser.ProgramaAcademico_idProgramaAcademico || 1,
            rol[0].idRoles,
            newUser.TipoDocumentos_idTipoDocumento || 1,
            tipoUsuario[0].idTipoUsuarios,
            newUser.ProgramaAcademico_idProgramaAcademico1 || 1,
            newUser.CentroUniversitarios_idCentroUniversitarios || 1,
            1,
            newUser.Semestre || '1',
            newUser.Modalidad || 'Presencial',
            newUser.TipoPoblacion_idTipoPoblacion || 1,
            fechaActual,
            fechaActual
        ]
    );
    return { id: result.insertId, ...newUser };
};

// Actualizar usuario
exports.update = async (id, updatedUsers) => {
    await exports.findById(id)

    const [result] = await pool.execute(
        `UPDATE Usuarios SET 
            Nombre = ?, CorreoPersonal = ?, Celular = ?, Telefono = ?,
            Direccion = ?, Genero = ?, EstadoCivil = ?, FechaNacimiento = ?,
            Semestre = ?, Modalidad = ?, FechaActualizacion = ?,
            Municipios_idMunicipio = ?, ProgramaAcademico_idProgramaAcademico = ?,
            TipoDocumentos_idTipoDocumento = ?, CentroUniversitarios_idCentroUniversitarios = ?,
            TipoPoblacion_idTipoPoblacion = ?
        WHERE idUsuarios = ? AND Estado = 1`,
        [
            updatedUsers.Nombre,
            updatedUsers.CorreoPersonal,
            updatedUsers.Celular,
            updatedUsers.Telefono,
            updatedUsers.Direccion,
            updatedUsers.Genero,
            updatedUsers.EstadoCivil,
            updatedUsers.FechaNacimiento,
            updatedUsers.Semestre,
            updatedUsers.Modalidad,
            new Date(),
            updatedUsers.Municipios_idMunicipio,
            updatedUsers.ProgramaAcademico_idProgramaAcademico,
            updatedUsers.TipoDocumentos_idTipoDocumento,
            updatedUsers.CentroUniversitarios_idCentroUniversitarios,
            updatedUsers.TipoPoblacion_idTipoPoblacion,
            id
        ]
    )
    return result.affectedRows > 0;
}

// Eliminar usuario (soft delete)
exports.remove = async (id) => {
    const [result] = await pool.execute(
        'UPDATE Usuarios SET Estado = 0, FechaActualizacion = ? WHERE idUsuarios = ?',
        [new Date(), id]
    )
    return result.affectedRows > 0;
}

// Login de usuario
exports.login = async (email) => {
    const [rows] = await pool.execute(`
        SELECT u.idUsuarios, u.Nombre, u.CorreoInstitucional, u.Estado 
        FROM Usuarios u 
        INNER JOIN TipoUsuarios tu ON u.TipoUsuarios_idTipoUsuarios = tu.idTipoUsuarios 
        WHERE u.CorreoInstitucional = ? 
        AND u.Estado = 1 
    `, [email])
    if (rows.length === 0) {
        throw new Error('Usuario no encontrado')
    }
    return rows[0];
}

// Obtener emprendimientos del usuario
exports.getEntrepreneurships = async (userId) => {
    const [modulo] = await pool.execute(
        'SELECT Modulos_idModulos FROM Usuarios WHERE idUsuarios = ?', [userId]
    )
    if (modulo.length === 0) return []
    const moduloId = modulo[0].Modulos_idModulos

    const [rows] = await pool.execute(`
        SELECT e.idEmprendimiento, e.Nombre, e.Descripcion, e.TipoEmprendimiento,
               e.SectorProductivo, e.RedesSociales, e.Acompanamiento, e.FechaCreacion, e.FechaActualizacion,
               ee.TipoEtapa
        FROM Emprendimiento e
        INNER JOIN EtapadeEmpedimiento ee ON e.EtapadeEmpedimiento_idEtapadeEmpedimiento = ee.idEtapadeEmpedimiento
        WHERE e.Modulos_idModulos = ? 
    `, [moduloId])
    return rows
};

// Obtener diagnósticos de un emprendimiento
exports.getDiagnostics = async (entrepreneurshipId) => {
    const [rows] = await pool.execute(`
        SELECT d.idDiagnosticos, d.FechaEmprendimiento, d.AreaEstrategia, d.Diferencial,
               d.Planeacion, d.MercadoObjetivo, d.Tendencias, d.Canales, d.DescripcionPromocion,
               d.Presentacion, d.PasosElaboracion, d.SituacionFinanciera, d.FuenteFinanciero,
               d.EstructuraOrganica, d.ConocimientoLegal, d.MetodologiaInnovacion,
               d.HerramientaTecnologicas, d.Marca, d.AplicacionMetodologia,
               d.ImpactoAmbiental, d.ImpactoSocial, d.Viabilidad,
               se.Nombre as SectorEconomico
        FROM Diagnosticos d
        INNER JOIN SectoEconomico se ON d.SectoEconomico_idSectoEconomico = se.idSectoEconomico
        WHERE d.Emprendimiento_idEmprendimiento = ?
    `, [entrepreneurshipId]);
    return rows;
};

// Obtener consultorías de un usuario
exports.getConsultancies = async (userId) => {
    const [rows] = await pool.execute(`
        SELECT a.idAsesorias, a.Nombre_de_asesoria, a.Descripcion, a.Fecha_asesoria,
               a.Comentarios, a.confimacion, a.Fecha_creacion, a.Fecha_actualizacion,
               m.Presencial, m.Distancia, m.Enlace_virtual, m.Lugar,
               fyh.Fecha_inicio, fyh.Hora_inicio, fyh.Fecha_fin, fyh.Hora_fin
        FROM Asesorias a
        INNER JOIN Modalidad m ON a.Modalidad_idModalidad = m.idModalidad
        INNER JOIN Fecha_y_Horarios fyh ON a.Fecha_y_Horarios_idFecha_y_Horarios = fyh.idFecha_y_Horarios
        WHERE a.Usuarios_idUsuarios = ?
    `, [userId]);
    return rows;
};