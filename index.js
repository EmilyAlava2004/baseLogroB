
import express from 'express';
import cors from "cors";
import { PORT } from './config/config.js';
import rotuerTypeUsers from './router/TypeUsersRouter.js';
import  { RouterUser } from './router/UserRouter.js';
import { sequelize } from "./db/conexion.js";
import { RouterComment } from './router/Comment.Router.js';

const _PORT = process.env.PORT || 3000;
const app = express();
app.use(express.json());
app.use(cors({
    origin: ['http://localhost:8100', 'https://app-peliculas-38989.web.app'],
  credentials: true
}));

app.use('/api', rotuerTypeUsers);
app.use('/api', RouterUser);
app.use('/api', RouterComment);

const main = async () => {
    try {
        await sequelize.authenticate();
        console.log('Base de datos conectada.');
        await sequelize.sync({ alter: false });
        app.listen(_PORT, () => {
            console.log(`Servidor corriendo en el puerto => ${_PORT}`);
        });
    } catch (error) {
        console.log(`Error ${error}`);
    }
}
main();

