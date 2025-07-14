import { DataTypes, Model  } from 'sequelize';
import sequelize from '../config/db.js';

class UserModel extends Model {}

UserModel.init({
  id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
  fullName: { type: DataTypes.STRING, allowNull: false },
  birthDate: { type: DataTypes.DATEONLY, allowNull: false },
  email: { type: DataTypes.STRING, unique: true, allowNull: false },
  password: { type: DataTypes.STRING, allowNull: false },
  role: { type: DataTypes.ENUM('admin', 'user'), defaultValue: 'user' },
  isActive: { type: DataTypes.BOOLEAN, defaultValue: true }
},
{
  sequelize,
  modelName: 'User',
  timestamps: false
});

export default UserModel;
