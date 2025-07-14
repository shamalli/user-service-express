import { Request, Response, NextFunction } from 'express';
import { UserInRequest } from '../types/user.type.js';
import { Role } from '../types/role.type.js';

export default function (roles: string[]) {
  return (req: Request, res: Response, next: NextFunction) => {
    const userRole: Role = (req.User as UserInRequest).Role;

    if (!roles.includes(userRole)) {
      return res.status(403).json({ error: 'Forbidden' });
    }
    next();
  };
}
