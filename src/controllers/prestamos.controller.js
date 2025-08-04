import { AllPrestamos } from "../models/prestamo.model.js";
import {findPrestamosById} from "../models/prestamo.model.js";
import {createPrestamo} from  "../models/prestamo.model.js";
import { updatePrestamo } from "../models/prestamo.model.js";
import { deletePrestamo } from "../models/prestamo.model.js";
import { findPrestamosByUsuario} from "../models/prestamo.model.js";
import { findPrestamosByLibro } from "../models/prestamo.model.js";

export const getAllPrestamos = async  (req, res) => {
    try {
        const prestamos = await AllPrestamos();
        if (prestamos) {
        res.json(
              {
                mensaje: "Todos los prestamos:",
                data: resenia
              });    
        } else {
          res.status(404).json({ mensaje: 'No se encontro ningún prestamo' });
        }
    } catch (error) {
        console.error('Error en getAllPrestamos:', error);
        res.status(500).json({ error: 'Error al consultar la base de datos' });
    }
}

export const BuscarPrestamosByID = async(req, res) => {
  try {
    const id = parseInt(req.params.id);
    const prestamo = await findPrestamosById(id);
    if (prestamo) {
        res.json(prestamo);
    }else{
        res.status(404).json(prestamo || { mensaje: 'Préstamo no encontrado' });
    }
  } catch (error) {
        console.error('Error en buscarPrestamosByID:', error);
        res.status(500).json({ error: 'Error al consultar la base de datos' });
  }
}

export const crearPrestamo = async (req, res) => {
  const nuevoPrestamo = req.body;
  try {
    nuevoPrestamo.id_prestamo = await createPrestamo(nuevoPrestamo);
    res.status(201).json(nuevoPrestamo);
  } catch (error) {
    console.error('Error al crear el préstamo:', error);
    res.status(500).json({ error: 'Error al crear el préstamo' });
  }
};

export const actualizarPrestamo = async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const { id_libro, id_usuario, fecha_prestamo, fecha_devolucion } = req.body;
    const result = await updatePrestamo(id, id_libro, id_usuario, fecha_prestamo, fecha_devolucion);

    if (result.affectedRows === 0) {
      return res.status(404).json({ mensaje: 'Préstamo no encontrado para actualizar' });
    }

    res.json({ mensaje: 'Préstamo actualizado correctamente' });
  } catch (error) {
    console.error('Error al actualizar el préstamo:', error);
    res.status(500).json({ error: 'Error al actualizar el préstamo' });
  }
};
export const eliminarPrestamo = async (req, res) => {
  try {
    const id = parseInt(req.params.id);

    const result = await deletePrestamo(id);

    if (result.affectedRows === 0) {
      return res.status(404).json({ mensaje: 'Préstamo no encontrado' });
    }

    res.json({ mensaje: 'Préstamo eliminado correctamente' });
  } catch (error) {
    console.error('Error al eliminar el préstamo:', error);
    res.status(500).json({ mensaje: 'Error al eliminar el préstamo' });
  }
};
export const getPrestamosByUsuario = async (req, res) => {
  try {
    const id_usuario = parseInt(req.params.id_usuario);
    if (isNaN(id_usuario)) {
      return res.status(400).json({ mensaje: 'ID de usuario inválido' });
    }
    const prestamos = await findPrestamosByUsuario(id_usuario);
    if (prestamos.length === 0) {
      return res.status(404).json({ mensaje: 'No se encontraron préstamos para este usuario' });
    }
    res.json(prestamos);
  } catch (error) {
    console.error('Error al obtener préstamos por usuario:', error);
    res.status(500).json({ mensaje: 'Error del servidor' });
  }
};

export const getPrestamosByLibro = async (req, res) => {
  try {
    const id_libro = parseInt(req.params.id_libro);
    if (isNaN(id_libro)) {
      return res.status(400).json({ mensaje: 'ID de libro inválido' });
    }

    const prestamos = await findPrestamosByLibro(id_libro);

    if (prestamos.length === 0) {
      return res.status(404).json({ mensaje: 'No se encontraron préstamos para este libro' });
    }

    res.json(prestamos);
  } catch (error) {
    console.error('Error al obtener préstamos por libro:', error);
    res.status(500).json({ mensaje: 'Error del servidor' });
  }
};