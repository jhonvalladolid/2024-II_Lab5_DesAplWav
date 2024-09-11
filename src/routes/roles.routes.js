import { Router } from 'express';

const router = Router();

// Listar roles
router.get('/listRoles', async (req, res) => {
  try {
    res.render('roles/listRoles');
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Añadir roles
router.get('/addRoles', (req, res) => {
  res.render('roles/addRoles');
});

router.post('/addRoles', async (req, res) => {
  try {
    // Lógica para guardar el rol
    res.redirect('/listRoles');
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Editar roles
router.get('/editRoles/:id', (req, res) => {
  // Lógica para obtener rol por id
  res.render('roles/editRoles');
});

router.post('/editRoles/:id', async (req, res) => {
  try {
    // Lógica para actualizar rol
    res.redirect('/listRoles');
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

export default router;
