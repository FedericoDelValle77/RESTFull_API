import { findReseniaById } from '../models/resenias.model.js';
import { allResenia } from '../models/resenias.model.js';
import { createResenia } from '../models/resenias.model.js';
import { updateResenia } from '../models/resenias.model.js';
import { deleteResenia } from '../models/resenias.model.js';
import { findReseniaById_Libro } from '../models/resenias.model.js';
// Obtener todas las reseñas

export const getAllResenias= async(req,res)=>{
  try {
      const resenia = await allResenia();
      if(resenia){
        res.json(
          {
            mensaje: "Estas son todas las reseñas",
            data: resenia
          });
      } else {
      res.status(404).json({ mensaje: 'Reseña no encontrada' });
    }
  } catch (error) {
    console.error('Error en getAllResenia:', error);
    res.status(500).json({ error: 'Error al consultar la base de datos' });
  }
}
//Obtener una reseña por su id_resenia
export const getReseniaById = async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    if (isNaN(id)) {
      return res.status(400).json({ mensaje: 'ID inválido' });
    }
    const resenia = await findReseniaById(id);
    if (resenia) {
      res.json(resenia);
    } else {
      res.status(404).json({ mensaje: 'Reseña no encontrada' });
    }
  } catch (error) {
    console.error('Error en getReseniaById:', error);
    res.status(500).json({ error: 'Error al consultar la base de datos' });
  }
};
//Obtener una reseña por su id_libro
export const getReseniaByIdLibro = async (req, res) => {
  try {
    const id_libro = parseInt(req.params.id_libro);
    const resultado = await findReseniaById_Libro(id_libro);
    if (!resultado) {
      return res.status(404).json({ mensaje: "No se encontraron reseñas para ese libro." });
    }
    res.json(resultado);
  }catch (error){
    console.error("Error en getReseniasByIdLibro:", error);
    res.status(500).json({ mensaje: "Error del servidor." });
  }
};

export const crearResenia = async (req, res) => {
  const nueva = req.body; 
  try {
    nueva.id_resenia = await createResenia(nueva);
    res.status(201).json(nueva); 
  } catch (error) {
    res.status(500).json({ error: 'Error al crear la reseña' });
  }
};

export const actualizarResenia = async (req, res) => {
  try {
    const id_resenia = parseInt(req.params.id_resenia);
    const { texto, puntuacion } = req.body;

    const result = await updateResenia(id_resenia, texto, puntuacion);

    if (result.affectedRows === 0) {
      return res.status(404).json({ mensaje: "Reseña no encontrada para actualizar." });
    }

    res.json({ mensaje: "Reseña actualizada correctamente." });
  } catch (error) {
    console.error("Error al actualizar la reseña:", error);
    res.status(500).json({ mensaje: "Error interno del servidor." });
  }
};
export const eliminarResenia = async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const result = await deleteResenia(id);

    if (result.affectedRows === 0) {
      return res.status(404).json({ mensaje: 'Reseña no encontrada' });
    }

    res.json({ mensaje: 'Reseña eliminada correctamente' });
  } catch (error) {
    console.error('Error al eliminar reseña:', error);
    res.status(500).json({ mensaje: 'Error al eliminar la reseña' });
  }
};


