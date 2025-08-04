
import { getAllResenias } from '../controllers/resenias.controller.js';
import {getReseniaById} from '../controllers/resenias.controller.js';
import {getReseniaByIdLibro} from '../controllers/resenias.controller.js';
import { crearResenia } from '../controllers/resenias.controller.js';
import { actualizarResenia } from '../controllers/resenias.controller.js';
import { eliminarResenia } from '../controllers/resenias.controller.js';

import { Router } from 'express';
const router = Router();
// GET /resenias - Obtener todas las reseñas
router.get('/resenias', getAllResenias);
// GET /resenias/:id - Obtener una reseña por su id_resenia
router.get('/resenias/:id', getReseniaById);
// GET /resenias/libro/:id_libro - Obtener reseñas de un libro específico
router.get('/resenias/libro/:id_libro',getReseniaByIdLibro);
// POST /resenias - Crear una nueva reseña (ver)
router.post('/', crearResenia);
// PUT /resenias/:id - Actualizar una reseña
router.put('/resenias/:id_resenia', actualizarResenia);
// DELETE /resenias/:id - Eliminar una reseña
router.delete('/resenias/:id',eliminarResenia);

export default router;
