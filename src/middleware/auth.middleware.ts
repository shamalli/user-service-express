import { Request, Response, NextFunction } from 'express';
import { verifyToken } from '../utils/jwt.js';
import { UserInRequest } from '../types/user.type.js';

export default function (req: Request, res: Response, next: NextFunction) {
  try {
    const authorization = req.headers.authorization;

    if (!authorization) throw new Error('No token');
    const token = authorization.split(' ')[1];
    if (verifyToken(token)) {
      const arrayToken = token.split('.');
      const tokenPayload = JSON.parse(atob(arrayToken[1]));
      const User: UserInRequest = {
        ID: tokenPayload.id,
        Email: tokenPayload.email,
        Role: tokenPayload.role
      }
      req.User = User;
    }
    next();
  } catch (e) {
    return res.status(401).json({ error: 'Unauthorized' });
  }
}