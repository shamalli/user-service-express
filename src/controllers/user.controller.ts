import { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import User from '../models/user.model.js';
import { generateToken } from '../utils/jwt.js';
import { UserInRequest } from '../types/user.type.js';
import { Role } from '../types/role.type.js';
import { plainToClass } from 'class-transformer';
import { UserCreationDTO } from '../dtos/usercreate.dto.js';
import { UserDTO } from '../dtos/user.dto.js';

export const register = async (req: Request, res: Response) => {
  try {
    const createUserDTO = plainToClass(UserCreationDTO, req.body);

    const hashed = await bcrypt.hash(req.body.password, 10);
    var userRole: Role = 'user';

    if (req.body.email == process.env.ADMIN_EMAIL) {
      userRole = 'admin';
    }

    createUserDTO.password = hashed;
    createUserDTO.role = userRole;

    const newUser = await User.create({ ...createUserDTO });
    
    var msg: string;
    if (userRole == 'admin') {
      msg = 'Admin registered';
    } else {
      msg = 'User registered, ID: ' + newUser.get('id');
    }
    res.status(201).json({ message: msg });
  } catch (e: any) {
    res.status(400).json({ error: e.message });
  }
};

export const login = async (req: Request, res: Response) => {
  const { email, password } = req.body;
  const user = await User.findOne({ where: { email } }) as any;
  
  if (!user || !await bcrypt.compare(password, user.password)) {
    return res.status(401).json({ error: 'Invalid credentials' });
  }
  if (!user.isActive) return res.status(403).json({ error: 'User is blocked' });
  const token = generateToken(user);
  res.json({ token });
};

export const getUser = async (req: Request, res: Response) => {
  const { id } = req.params;
  const userReq = req.User as UserInRequest;

  if (userReq.Role !== 'admin' && userReq.ID !== parseInt(id)) {
    return res.status(403).json({ error: 'Forbidden' });
  }

  const userModel = await User.findByPk(id) as any;

  if (userModel) {
    const user = new UserDTO(
      userModel.id,
      userModel.fullName,
      userModel.birthDate,
      userModel.email,
      userModel.role,
      userModel.isActive,
    );

    res.json(user);
  } else {
    return res.status(404).json({ error: 'User not found' });
  }
};

export const getUsers = async (_req: Request, res: Response) => {
  const userModels = await User.findAll();

  var users: Array<UserDTO> = [];
  for (const userModel of userModels as any) {
    let user = new UserDTO(
      userModel.id,
      userModel.fullName,
      userModel.birthDate,
      userModel.email,
      userModel.role,
      userModel.isActive,
    );
    users.push(user);
  }

  res.json(users);
};

export const blockUser = async (req: Request, res: Response) => {
  const { id } = req.params;
  const userReq = req.User as UserInRequest;

  if (userReq.Role !== 'admin' && userReq.ID !== parseInt(id)) {
    return res.status(403).json({ error: 'Forbidden' });
  }
  
  const user = await User.findByPk(id) as any;
  if (!user) return res.status(404).json({ error: 'User not found' });
  user.isActive = false;
  await user.save();
  res.json({ message: 'User blocked' });
};
