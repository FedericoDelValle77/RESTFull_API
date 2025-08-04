import db from '../config/db.js';

export const allUsuario = async ()=>{
    try {
        const [rows] = await db.query('SELECT * FROM usuarios');
        return rows;
    } catch (error) {
        throw error;
    }
}

export const findUsuarioById = async (id) => {
  try {
    const [rows] = await db.query('SELECT * FROM usuarios WHERE id_usuario = ?', [id]);
    return rows;
  } catch (error) {
    throw error; 
  }
};
export const createUsuario = async (usuario) => {
  try {
    const sql = `
      INSERT INTO resenias (nombre, apellido, dni,correo)
      VALUES (?,?,?,?)
    `;
    const values = [
        usuario.nombre,
        usuario.apellido,
        usuario.dni,
        usuario.correo
    ];
    const [rows] = await db.query(sql, values);
    return rows; 
  } catch (error) {
    throw error;
  }
};

export const updateUsuario = async (id_usuario, nombre, apellido, dni, correo) => {
  try {
    const sql = `
      UPDATE usuarios
      SET  nombre = ?, apellido = ?, dni = ?, correo=?
      WHERE id_usuario = ?
    `;
    const [rows] = await db.query(sql, [id_usuario, nombre, apellido, dni, correo]);
    return rows;
  } catch (error) {
    throw error;
  }
};
export const deleteUsuario = async (id) => {
  try {
    const sql = `DELETE FROM usuarios WHERE id_usuario = ?`;
    const [rows] = await db.query(sql, [id]);
    return rows;
  } catch (error) {
    throw error;
  }
};



