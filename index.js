import express from 'express';
import cors from "cors";
import rotuerTypeUsers from './router/TypeUsersRouter.js';
import { RouterUsuer } from './router/UserRouter.js';
import { sequelize } from "./db/conexion.js";
import { RouterComment } from './router/Comment.Router.js';

const _PORT = process.env.PORT || 3000; // 👈 Railway usa este
const app = express();

// Middlewares
app.use(express.json());

app.use(cors({
  origin: ['http://localhost:8100', 'https://mysql-production-23a5.up.railway.app'],
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true
}));

// Ruta de prueba para verificar que el servidor responde
app.get('/ping', (req, res) => {
  res.send('pong');
});

// Rutas principales
app.use('/api', rotuerTypeUsers);
app.use('/api', RouterUsuer);
app.use('/api', RouterComment);

// Arranque del servidor
const main = async () => {
  try {
    console.log('🔄 Conectando a la base de datos...');
    await sequelize.authenticate();
    console.log('✅ Base de datos conectada.');

    await sequelize.sync({ alter: false });
    console.log('🔁 Sincronización de modelos lista.');

    app.listen(_PORT, () => {
      console.log(`🚀 Servidor corriendo en el puerto => ${_PORT}`);
    });
  } catch (error) {
    console.error('❌ Error al iniciar el servidor:', error);
  }
};

main();
