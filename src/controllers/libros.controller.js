import { findAllLibros } from "../models/libros.model.js";
import { findLibroById } from "../models/libros.model.js";
import { findLibrosDisponibles } from "../models/libros.model.js";
import { createLibro } from "../models/libros.model.js";
import { updateLibro } from "../models/libros.model.js";
import { updateExistenciaLibro } from "../models/libros.model.js";
import { deleteLibro } from '../models/libros.model.js';

export const getLibros = async (req, res) => {
  try {
    const libros = await findAllLibros();
    res.json(libros);
  } catch (error) {
    console.error('Error al obtener libros:', error);
    res.status(500).json({ mensaje: 'Error al obtener los libros' });
  }
};

export const getLibroById = async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    if (isNaN(id)) {
      return res.status(400).json({ mensaje: 'ID inválido' });
    }
    const libro = await findLibroById(id);
    if (!libro) {
      return res.status(404).json({ mensaje: 'Libro no encontrado' });
    }
    res.json(libro);
  } catch (error) {
    console.error('Error al obtener el libro:', error);
    res.status(500).json({ mensaje: 'Error al obtener el libro' });
  }
};
export const getLibrosDisponibles = async (req, res) => {
  try {
    const disponibles = await findLibrosDisponibles();
    res.json(disponibles);
  } catch (error) {
    console.error('Error al obtener libros disponibles:', error);
    res.status(500).json({ mensaje: 'Error al obtener libros disponibles' });
  }
};
export const crearLibro = async (req, res) => {
  const nuevo = req.body;
  try {
    const id = await createLibro(nuevo);
    nuevo.id_libro = id;
    res.status(201).json(nuevo);
  } catch (error) {
    console.error('Error al crear el libro:', error);
    res.status(500).json({ mensaje: 'Error al crear el libro' });
  }
};

export const actualizarLibro = async (req, res) => {
  const id = parseInt(req.params.id);
  const datosActualizados = req.body;

  try {
    const resultado = await updateLibro(id, datosActualizados);
    if (resultado.affectedRows > 0) {
        res.json({
            id_libro: id,
            titulo: datosActualizados.titulo,
            autor: datosActualizados.autor,
            existencia: datosActualizados.existencia
        });
    } else {
      res.status(404).json({ mensaje: 'Libro no encontrado' });
    }
  } catch (error) {
    console.error('Error al actualizar el libro:', error);
    res.status(500).json({ mensaje: 'Error al actualizar el libro' });
  }
};
export const actualizarExistenciaLibro = async (req, res) => {
  const id = parseInt(req.params.id);
  const { existencia } = req.body;

  try {
    const resultado = await updateExistenciaLibro(id, existencia);
    if (resultado.affectedRows > 0) {
      res.json({ id_libro: id, existencia });
    } else {
      res.status(404).json({ mensaje: 'Libro no encontrado' });
    }
  } catch (error) {
    console.error('Error al actualizar existencia del libro:', error);
    res.status(500).json({ mensaje: 'Error al actualizar existencia del libro' });
  }
};
export const eliminarLibro = async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const resultado = await deleteLibro(id);
    if (resultado.affectedRows > 0) {
      res.json({ mensaje: 'Libro eliminado correctamente' });
    } else {
      res.status(404).json({ mensaje: 'Libro no encontrado' });
    }
  } catch (error) {
    console.error('Error al eliminar el libro:', error);
    res.status(500).json({ mensaje: 'Error al eliminar el libro' });
  }
};


