import express from 'express';
import { login,updateUsersPassword, updateUsersEmail, getUsers,createUsers,updateUsers,deleteUsers,getOneUser} from '../controller/UserController.js';
import  {verifyToken}  from '../middleware/auth.js';

const rotuer = express.Router();
rotuer.get('/user',verifyToken, getUsers);
rotuer.get('/user/:id',verifyToken, getOneUser);
rotuer.post('/register', createUsers);
rotuer.put('/user/:id',verifyToken, updateUsers);
rotuer.delete('/user/:id', verifyToken, deleteUsers);
rotuer.post('/login', login);
rotuer.put('/user/email/:id',verifyToken, updateUsersEmail);
rotuer.put('/user/password/:id',verifyToken, updateUsersPassword);
export const RouterUser = rotuer;
