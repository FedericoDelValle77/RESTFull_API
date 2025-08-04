import resenias  from './routes/resenias.routes.js';
import prestamos from './routes/prestamos.routes.js';
import usuarios from './routes/usuarios.routes.js';
import libros from './routes/libros.routes.js';
import express from 'express';
const app = express();

app.use(express.json());
app.use(resenias);
app.use(prestamos);
app.use(usuarios);
app.use(libros);

const PORT = 8080;

// Iniciar servidor
app.listen(PORT);
