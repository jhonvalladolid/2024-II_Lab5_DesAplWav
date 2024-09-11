import { Router } from 'express';

const router = Router();

// Simulando usuarios
let usuarios = [
    { id: 1, usuario: 'Jhon Valladolid', correo: 'jvalladolid@gmail.com', rol: 'Administrador', estado: 'Activo' },
    { id: 2, usuario: 'Maria Perez', correo: 'mperez@gmail.com', rol: 'Vendedor', estado: 'Activo' },
    { id: 3, usuario: 'Pedro Ramírez', correo: 'pramirez@hotmail.com', rol: 'Supervisor', estado: 'Inactivo' },
    { id: 4, usuario: 'Carlos Lopez', correo: 'clopez@empresa.com', rol: 'Administrador', estado: 'Activo' },
    { id: 5, usuario: 'Ana Suarez', correo: 'asuarez@yahoo.com', rol: 'Operador', estado: 'Activo' },
];

//--------LISTADO --------------------------------------------//
router.get('/listUsuario', (req, res) => {
    res.render('usuarios/listUsuario', { usuarios });
});

//--------AÑADIR --------------------------------------------//
router.get('/addUsuario', (req, res) => {
    res.render('usuarios/addUsuario');
});

router.post('/addUsuario', (req, res) => {
    const { usuario, correo, rol, estado } = req.body;
    const newUsuario = {
        id: usuarios.length + 1,
        usuario,
        correo,
        rol,
        estado
    };
    usuarios.push(newUsuario);
    res.redirect('/listUsuario');
});

//--------ACTUALIZAR --------------------------------------------//
router.get('/editUsuario/:id', (req, res) => {
    const usuario = usuarios.find(u => u.id === parseInt(req.params.id));
    if (usuario) {
        res.render('usuarios/editUsuario', { usuario });
    } else {
        res.status(404).send('Usuario no encontrado');
    }
});

router.post('/editUsuario/:id', (req, res) => {
    const { usuario, correo, rol, estado } = req.body;
    const userIndex = usuarios.findIndex(u => u.id === parseInt(req.params.id));

    if (userIndex !== -1) {
        usuarios[userIndex] = {
            id: usuarios[userIndex].id,
            usuario,
            correo,
            rol,
            estado
        };
        res.redirect('/listUsuario');
    } else {
        res.status(404).send('Usuario no encontrado');
    }
});

//--------ELIMINAR --------------------------------------------//
router.get('/deleteUsuario/:id', (req, res) => {
    usuarios = usuarios.filter(u => u.id !== parseInt(req.params.id));
    res.redirect('/listUsuario');
});

export default router;
