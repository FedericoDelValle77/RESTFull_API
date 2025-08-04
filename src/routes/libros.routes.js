import { actualizarExistenciaLibro,actualizarLibro, crearLibro,getLibrosDisponibles, getLibroById, getLibros, eliminarLibro } from "../controllers/libros.controller.js";
import { Router } from 'express';
const router = Router();

// GET /libros
router.get('/libros',getLibros);

// GET /libros/:id
router.get('/libros/:id',getLibroById);

// GET /libros/disponibles
router.get('/libros/disponibles', getLibrosDisponibles);

// POST /libros
router.post('/libros', crearLibro);

// PUT /libros/:id
router.put('/libros/:id',actualizarLibro);

// PUT /libros/:id/existencia
router.put('/libros/:id/existencia',actualizarExistenciaLibro);

// DELETE /libros/:id
router.delete('/libros/:id', eliminarLibro);
export default router;
