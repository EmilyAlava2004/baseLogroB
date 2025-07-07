import { where } from "sequelize";
import { CommentModel } from "../models/CommentModel.js";
import { UserModel } from "../models/UserModel.js";

export const saveComment = async (req, res) => {
    try {
        const { description, user_id, movie_id } = req.body;
        
        if (!(description && user_id && movie_id)) {
            return res.status(400).json({ message: "todos los campos son requeridos" });
        }
        
        const userExists = await UserModel.findOne({where: { id: user_id }});
        if (!userExists) {
            return res.status(404).json({ message: "Usuario no encontrado" });
        }
        
        // ❌ ERROR AQUÍ: Usabas 'comment' en lugar de 'description'
        const newComment = await CommentModel.create({
            description: description, // ✅ CORREGIDO: Usar 'description' no 'comment'
            user_id: user_id,
            movie_id: movie_id
        });
        
        res.status(201).json({
            message: "Comentario creado exitosamente", 
            comment: newComment
        });
    } catch (error) {
        console.error('Error en saveComment:', error); // ✅ AGREGADO: Log del error
        res.status(500).json({ error: error.message });
    }
}

export const getComments = async (req, res) => {
    try {
        const movieId = req.params.id || req.query.movie_id;
        
        if (!movieId) {
            return res.status(400).json({ error: "movie_id es requerido" });
        }
        
        const comments = await CommentModel.findAll({
            where: { movie_id: movieId },
            include: [{
                model: UserModel,
                attributes: ['id', 'user', 'email'],
            }],
        });
        
        res.status(200).json(comments);
    } catch (error) {
        console.error('Error en getComments:', error); // ✅ AGREGADO: Log del error
        res.status(500).json({ error: error.message });
    }
};