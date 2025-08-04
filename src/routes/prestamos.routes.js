import { actualizarPrestamo, crearPrestamo, getAllPrestamos,BuscarPrestamosByID, eliminarPrestamo, getPrestamosByLibro, getPrestamosByUsuario } from '../controllers/prestamos.controller.js';
import { Router } from 'express';
const router = Router();

// GET /prestamos - Obtener todos los préstamos
router.get('/prestamos',getAllPrestamos);
// GET /prestamos/:id - Obtener un préstamo por su id_prestamo
router.get('/prestamos/:id', BuscarPrestamosByID);
// POST /prestamos - Crear un nuevo préstamo
router.post('/prestamos',crearPrestamo);
// PUT /prestamos/:id - Actualizar un préstamo
router.put('/prestamos/:id',actualizarPrestamo);
// DELETE /prestamos/:id - Eliminar un préstamo
router.delete('/prestamos/:id', eliminarPrestamo);
// GET /prestamos/usuario/:id_usuario - Préstamos por usuario
router.get('/prestamos/usuario/:id_usuario', getPrestamosByUsuario);
// GET /prestamos/libro/:id_libro - Préstamos por libro
router.get('/prestamos/libro/:id_libro',getPrestamosByLibro)
export default router;