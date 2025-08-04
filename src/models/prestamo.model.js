import db from '../config/db.js';
export const AllPrestamos = async ()=>{
    try {
        const [rows] = await db.query('SELECT * FROM prestamos');
        return rows;
    } catch (error) {
        throw error;
    }
}

export const findPrestamosById = async (id) => {
  try {
    const [rows] = await db.query(
    `SELECT id_prestamo, id_libro, id_usuario, fecha_prestamo, 
    fecha_devolucion FROM prestamos WHERE id_prestamo = ?`,[id]);
    return rows;
  } catch (error) {
    throw error; 
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
export const createPrestamo = async (prestamo) => {
  try {
    const sql = `
      INSERT INTO prestamos (id_libro, id_usuario, fecha_prestamo, fecha_devolucion)
      VALUES (?, ?, ?, ?)
    `;
    const values = [
      prestamo.id_libro,
      prestamo.id_usuario,
      prestamo.fecha_prestamo,
      prestamo.fecha_devolucion
    ];

    const [result] = await db.query(sql, values);
    return result.insertId; 
  } catch (error) {
    throw error;
  }
};
export const updatePrestamo = async (id_prestamo, id_libro, id_usuario, fecha_prestamo, fecha_devolucion) => {
  try {
    const sql = `
      UPDATE prestamos
      SET id_libro = ?, id_usuario = ?, fecha_prestamo = ?, fecha_devolucion = ?
      WHERE id_prestamo = ?
    `;
    const [rows] = await db.query(sql, [id_libro, id_usuario, fecha_prestamo, fecha_devolucion, id_prestamo]);
    return rows; 
  } catch (error) {
    throw error;
  }
};
export const deletePrestamo = async (id) => {
  try {
    const sql = `DELETE FROM prestamos WHERE id_prestamo = ?`;
    const [result] = await db.query(sql, [id]);
    return result; 
  } catch (error) {
    throw error;
  }
};
export const findPrestamosByUsuario = async (id_usuario) => {
  try {
    const sql = `
      SELECT id_prestamo, id_libro, id_usuario, fecha_prestamo, fecha_devolucion
      FROM prestamos
      WHERE id_usuario = ?
    `;
    const [rows] = await db.query(sql, [id_usuario]);
    return rows;
  } catch (error) {
    throw error;
  }
};
export const findPrestamosByLibro = async (id_libro) => {
  try {
    const sql = `
      SELECT id_prestamo, id_libro, id_usuario, fecha_prestamo, fecha_devolucion
      FROM prestamos
      WHERE id_libro = ?
    `;
    const [rows] = await db.query(sql, [id_libro]);
    return rows;
  } catch (error) {
    throw error;
  }
};



