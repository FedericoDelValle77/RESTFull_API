
import { getAllUsuarios } from '../controllers/usuarios.controller.js';
import {getUsuarioById} from '../controllers/usuarios.controller.js';
import { crearUsuario } from '../controllers/usuarios.controller.js';
import { actualizarUsuario } from '../controllers/usuarios.controller.js';
import { eliminarUsuario } from '../controllers/usuarios.controller.js';

import { Router } from 'express';
const router = Router();
// GET /usuarios - Obtener todos las usuarios
router.get('/usuarios', getAllUsuarios);
// GET /usuarios/:id - Obtener un usuarios por su id_usuarios
router.get('/usuarios/:id', getUsuarioById);
// POST /usuarios - Crear nuevo Usuario 
router.post('/', crearUsuario);
// PUT /usuarios/:id - Actualizar un usuario
router.put('/usuarios/:id_usuarios', actualizarUsuario);
// DELETE /usuarios/:id - Eliminar un usuario
router.delete('/usuarios/:id',eliminarUsuario);

export default router;
