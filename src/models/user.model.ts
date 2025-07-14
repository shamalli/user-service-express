import { DataTypes, Model  } from 'sequelize';
import sequelize from '../config/db.js';
import { Role } from '../types/role.type.js';

class UserModel extends Model {
  declare id: number;
  declare fullName: string;
  declare birthDate: string;
  declare email: string;
  declare password: string;
  declare role: Role;
  declare isActive: boolean;
}

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
