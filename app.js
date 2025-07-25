const express = require('express');
const app = express();

app.use(express.json());

const PORT = 8080;

let usuarios = [
  { id_usuario: 1, nombre: 'Lucas' },
  { id_usuario: 2, nombre: 'María' }
];

// GET /usuarios
app.get('/usuarios', (req, res) => {
  res.send(usuarios);
});

// GET /usuarios/:id
app.get('/usuarios/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const usuario = usuarios.find(u => u.id_usuario === id);
  res.send(usuario || { mensaje: 'Usuario no encontrado' });
});

// POST /usuarios
app.post('/usuarios', (req, res) => {
  const nuevo = req.body;
  nuevo.id_usuario = usuarios.length + 1;
  usuarios.push(nuevo);
  res.send(nuevo);
});

// PUT /usuarios/:id
app.put('/usuarios/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const index = usuarios.findIndex(u => u.id_usuario === id);
  if (index !== -1) {
    usuarios[index] = { id_usuario: id, ...req.body };
    res.send(usuarios[index]);
  } else {
    res.send({ mensaje: 'Usuario no encontrado' });
  }
});

// DELETE /usuarios/:id
app.delete('/usuarios/:id', (req, res) => {
  const id = parseInt(req.params.id);
  usuarios = usuarios.filter(u => u.id_usuario !== id);
  res.send({ mensaje: 'Usuario eliminado' });
});

let libros = [
  { id_libro: 1, titulo: '1984', autor: 'George Orwell', existencia: 3 },
  { id_libro: 2, titulo: 'Fahrenheit 451', autor: 'Ray Bradbury', existencia: 0 }
];
// GET /libros
app.get('/libros', (req, res) => {
  res.json(libros);
});

// GET /libros/:id
app.get('/libros/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const libro = libros.find(l => l.id_libro === id);
  res.json(libro || { mensaje: 'Libro no encontrado' });
});

// GET /libros/disponibles
app.get('/libros/disponibles', (req, res) => {
  const disponibles = libros.filter(l => l.existencia > 0);
  res.json(disponibles);
});

// POST /libros
app.post('/libros', (req, res) => {
  const nuevo = req.body;
  nuevo.id_libro = libros.length + 1;
  libros.push(nuevo);
  res.status(201).json(nuevo);
});

// PUT /libros/:id
app.put('/libros/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const index = libros.findIndex(l => l.id_libro === id);
  if (index !== -1) {
    libros[index] = { id_libro: id, ...req.body };
    res.json(libros[index]);
  } else {
    res.status(404).json({ mensaje: 'Libro no encontrado' });
  }
});

// PUT /libros/:id/existencia
app.put('/libros/:id/existencia', (req, res) => {
  const id = parseInt(req.params.id);
  const libro = libros.find(l => l.id_libro === id);
  if (libro) {
    libro.existencia = req.body.existencia;
    res.json(libro);
  } else {
    res.status(404).json({ mensaje: 'Libro no encontrado' });
  }
});

// DELETE /libros/:id
app.delete('/libros/:id', (req, res) => {
  const id = parseInt(req.params.id);
  libros = libros.filter(l => l.id_libro !== id);
  res.json({ mensaje: 'Libro eliminado' });
});


let prestamos = [
  { id_prestamo: 1, id_libro: 1, id_usuario: 101, fecha_prestamo: '2025-07-20', fecha_devolucion: '2025-07-27' }
];
// GET /prestamos - Obtener todos los préstamos
app.get('/prestamos', (req, res) => {
  res.json(prestamos);
});

// GET /prestamos/:id - Obtener un préstamo por su id_prestamo
app.get('/prestamos/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const prestamo = prestamos.find(p => p.id_prestamo === id);
  res.json(prestamo || { mensaje: 'Préstamo no encontrado' });
});

// POST /prestamos - Crear un nuevo préstamo
app.post('/prestamos', (req, res) => {
  const nuevo = req.body;
  nuevo.id_prestamo = prestamos.length + 1;
  prestamos.push(nuevo);
  res.status(201).json(nuevo);
});

// PUT /prestamos/:id - Actualizar un préstamo
app.put('/prestamos/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const index = prestamos.findIndex(p => p.id_prestamo === id);
  if (index !== -1) {
    prestamos[index] = { id_prestamo: id, ...req.body };
    res.json(prestamos[index]);
  } else {
    res.status(404).json({ mensaje: 'Préstamo no encontrado' });
  }
});

// DELETE /prestamos/:id - Eliminar un préstamo
app.delete('/prestamos/:id', (req, res) => {
  const id = parseInt(req.params.id);
  prestamos = prestamos.filter(p => p.id_prestamo !== id);
  res.json({ mensaje: 'Préstamo eliminado' });
});
// GET /prestamos/usuario/:id_usuario - Préstamos por usuario
app.get('/prestamos/usuario/:id_usuario', (req, res) => {
  const id_usuario = parseInt(req.params.id_usuario);
  const resultado = prestamos.filter(p => p.id_usuario === id_usuario);
  res.json(resultado);
});

// GET /prestamos/libro/:id_libro - Préstamos por libro
app.get('/prestamos/libro/:id_libro', (req, res) => {
  const id_libro = parseInt(req.params.id_libro);
  const resultado = prestamos.filter(p => p.id_libro === id_libro);
  res.json(resultado);
});

let resenias = [
  { id_resenia: 1, id_libro: 1, texto: 'Muy bueno', puntuacion: 5 }
];
// GET /resenias - Obtener todas las reseñas
app.get('/resenias', (req, res) => {
  res.json(resenias);
});

// GET /resenias/:id - Obtener una reseña por su id_resenia
app.get('/resenias/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const resenia = resenias.find(r => r.id_resenia === id);
  res.json(resenia || { mensaje: 'Reseña no encontrada' });
});

// GET /resenias/libro/:id_libro - Obtener reseñas de un libro específico
app.get('/resenias/libro/:id_libro', (req, res) => {
  const id_libro = parseInt(req.params.id_libro);
  const resultado = resenias.filter(r => r.id_libro === id_libro);
  res.json(resultado);
});

// POST /resenias - Crear una nueva reseña
app.post('/resenias', (req, res) => {
  const nueva = req.body;
  nueva.id_resenia = resenias.length + 1;
  resenias.push(nueva);
  res.status(201).json(nueva);
});

// PUT /resenias/:id - Actualizar una reseña
app.put('/resenias/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const index = resenias.findIndex(r => r.id_resenia === id);
  if (index !== -1) {
    resenias[index] = { id_resenia: id, ...req.body };
    res.json(resenias[index]);
  } else {
    res.status(404).json({ mensaje: 'Reseña no encontrada' });
  }
});

// DELETE /resenias/:id - Eliminar una reseña
app.delete('/resenias/:id', (req, res) => {
  const id = parseInt(req.params.id);
  resenias = resenias.filter(r => r.id_resenia !== id);
  res.json({ mensaje: 'Reseña eliminada' });
});

// Iniciar servidor
app.listen(PORT);
