import { findUsuarioById } from '../models/usuarios.model.js';
import { allUsuario } from '../models/usuarios.model.js';
import { createUsuario } from '../models/usuarios.model.js';
import { updateUsuario } from '../models/usuarios.model.js';
import { deleteUsuario } from '../models/usuarios.model.js';
// Obtener todas los usuarios

export const getAllUsuarios= async(req,res)=>{
  try {
      const usuario = await allUsuario();
      if(usuario){
        res.json(
          {
            mensaje: "Todos los usuarios",
            data: usuario
          });
      } else {
      res.status(404).json({ mensaje: 'Usuario no encontrado' });
    }
  } catch (error) {
    console.error('Error en getAllusuario:', error);
    res.status(500).json({ error: 'Error al consultar la base de datos' });
  }
}
//Obtener un Usuario por su id_usuario
export const getUsuarioById = async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    if (isNaN(id)) {
      return res.status(400).json({ mensaje: 'ID inválido' });
    }
    const usuario = await findUsuarioById(id);
    if (usuario) {
      res.json(usuario);
    } else {
      res.status(404).json({ mensaje: 'Usuario no encontrado' });
    }
  } catch (error) {
    console.error('Error en getusuarioById:', error);
    res.status(500).json({ error: 'Error al consultar la base de datos' });
  }
};

export const crearUsuario = async (req, res) => {
  const nueva = req.body; 
  try {
    nueva.id_usuario = await createUsuario(nueva);
    res.status(201).json(nueva); 
  } catch (error) {
    res.status(500).json({ error: 'Error al crear el Usuario' });
  }
};
export const actualizarUsuario = async (req, res) => {
  try {
    const id_usuario = parseInt(req.params.id_usuario);
    const { nombre, apellido, dni, correo } = req.body;

    const result = await updateUsuario(id_usuario, nombre, apellido, dni, correo);

    if (result.affectedRows === 0) {
      return res.status(404).json({ mensaje: "Usuario no encontrado para actualizar." });
    }

    res.json({ mensaje: "Datos del Usuario actualizados correctamente." });
  } catch (error) {
    console.error("Error al actualizar el Usuario:", error);
    res.status(500).json({ mensaje: "Error interno del servidor." });
  }
};

export const eliminarUsuario = async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const result = await deleteUsuario(id);

    if (result.affectedRows === 0) {
      return res.status(404).json({ mensaje: 'Usuario no encontrado' });
    }

    res.json({ mensaje: 'Usuario eliminado correctamente' });
  } catch (error) {
    console.error('Error al eliminar Usuario:', error);
    res.status(500).json({ mensaje: 'Error al eliminar el Usuario' });
  }
};


