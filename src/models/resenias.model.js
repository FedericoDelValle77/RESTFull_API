// resenias.model.js
import db from '../config/db.js';
export const allResenia = async ()=>{
    try {
        const [rows] = await db.query('SELECT * FROM resenias');
        return rows;
    } catch (error) {
        throw error;
    }
}

export const findReseniaById = async (id) => {
  try {
    const [rows] = await db.query('SELECT * FROM resenias WHERE id_resenia = ?', [id]);
    return rows;
  } catch (error) {
    throw error; // El controlador va a manejar el error
  }
};

export const findReseniaById_Libro = async (id) => {
  try {
    const [rows] = await db.query('SELECT * FROM resenias WHERE id_libro = ?', [id]);
    return rows;
  } catch (error) {
    throw error;
  }
}
export const createResenia = async (newResenia) => {
  try {
    const sql = `
      INSERT INTO resenias ( id_libro, texto, puntuacion )
      VALUES (?, ?, ?)
    `;
    const values = [
      newResenia.id_libro,
      newResenia.texto,
      newResenia.puntuacion
    ];

    const [rows] = await db.query(sql, values);

    return rows; 
  } catch (error) {
    throw error;
  }
};
export const updateResenia = async (id_resenia, texto, puntuacion) => {
  try {
    const sql = `
      UPDATE resenias
      SET texto = ?, puntuacion = ?
      WHERE id_resenia = ?
    `;
    const [rows] = await db.query(sql, [texto, puntuacion, id_resenia]);
    return rows;
  } catch (error) {
    throw error;
  }
};
export const deleteResenia = async (id) => {
  try {
    const sql = `DELETE FROM resenias WHERE id_resenia = ?`;
    const [rows] = await db.query(sql, [id]);
    return rows;
  } catch (error) {
    throw error;
  }
};



