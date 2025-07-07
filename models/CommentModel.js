import { DataTypes } from "sequelize";
import { sequelize } from "../db/conexion.js";
// ❗IMPORTACIÓN DIFERIDA
let UserModel; // definir variable sin importar al inicio

export const CommentModel = sequelize.define("comments", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  description: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  state: {
    type: DataTypes.BOOLEAN,
    defaultValue: true,
  },
  movie_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
}, {
  timestamps: false,
});

// ✅ Luego del `define`, importar dinámicamente y definir relaciones
import("./UserModel.js").then((module) => {
  UserModel = module.UserModel;
  UserModel.hasMany(CommentModel, { foreignKey: "user_id" });
  CommentModel.belongsTo(UserModel, { foreignKey: "user_id" });
});
