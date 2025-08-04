import db from '../config/db.js';

export const findAllLibros = async () => {
  try {
    const [rows] = await db.query('SELECT * FROM libros');
    return rows;
  } catch (error) {
    throw error;
  }
};
export const findLibroById = async (id_libro) => {
  try {
    const sql = `
      SELECT id_libro, titulo, autor, existencia
      FROM libros
      WHERE id_libro = ?
    `;
    const [rows] = await db.query(sql, [id_libro]);
    return rows[0]; // Devuelve un único objeto o undefined
  } catch (error) {
    throw error;
  }
};
export const findLibrosDisponibles = async () => {
  try {
    const sql = `
      SELECT id_libro, titulo, autor, existencia
      FROM libros
      WHERE existencia > 0
    `;
    const [rows] = await db.query(sql);
    return rows;
  } catch (error) {
    throw error;
  }
};
export const createLibro = async (libro) => {
  try {
    const sql = `
      INSERT INTO libros (titulo, autor, existencia)
      VALUES (?, ?, ?)
    `;
    const values = [libro.titulo, libro.autor, libro.existencia];
    const [result] = await db.query(sql, values);
    return result.insertId;
  } catch (error) {
    throw error;
  }
};

export const updateLibro = async (id, libro) => {
  try {
    const sql = `
      UPDATE libros
      SET titulo = ?, autor = ?, existencia = ?
      WHERE id_libro = ?
    `;
    const values = [libro.titulo, libro.autor, libro.existencia, id];
    const [result] = await db.query(sql, values);
    return result;
  } catch (error) {
    throw error;
  }
};

export const updateExistenciaLibro = async (id_libro, existencia) => {
  try {
    const sql = `
      UPDATE libros
      SET existencia = ?
      WHERE id_libro = ?
    `;
    const [result] = await db.query(sql, [existencia, id_libro]);
    return result;
  } catch (error) {
    throw error;
  }
};
export const deleteLibro = async (id_libro) => {
  try {
    const sql = `DELETE FROM libros WHERE id_libro = ?`;
    const [result] = await db.query(sql, [id_libro]);
    return result;
  } catch (error) {
    throw error;
  }
};
