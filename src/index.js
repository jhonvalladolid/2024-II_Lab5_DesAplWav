import express from 'express';
import morgan from 'morgan';
import { engine } from 'express-handlebars';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';
import usuariosRoutes from './routes/usuarios.routes.js';
import rolesRoutes from './routes/roles.routes.js'

// Inicialización
const app = express();
const __dirname = dirname(fileURLToPath(import.meta.url));

// Configuraciones
app.set('port', process.env.PORT || 3000);

// Configurando carpeta para las vistas
app.set('views', join(__dirname, 'views'));

// Configurar motor de plantilla
app.engine('.hbs', engine({
  defaultLayout: 'main',
  layoutsDir: join(app.get('views'), 'layouts'),
  partialsDir: join(app.get('views'), 'partials'),
  extname: '.hbs'
}));
app.set('view engine', '.hbs');

// Middlewares
app.use(morgan('dev'));

// Utilizaremos express para trabajar con interfaces y formularios
app.use(express.urlencoded({ extended: false }));
// Utilizaremos express para trabajar con archivos tipo JSON
app.use(express.json());

// Rutas
app.get('/', (req, res) => {
  res.render('index');
});

app.use(usuariosRoutes);
app.use(rolesRoutes);

// Archivos públicos
app.use(express.static(join(__dirname, 'public')));

// Iniciar servidor
app.listen(app.get('port'), () => {
  console.log('Cargando el puerto', app.get('port'));
});
