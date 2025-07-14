import { Request, Response, NextFunction } from 'express';
import User from '../models/user.model.js';

export default async function (req: Request, res: Response, next: NextFunction) {
  const email: string = req.body.email;

  const user = await User.findOne({ where: { email } });
  if (user) {
    return res.status(409).json({ error: 'Email already registered' });
  }

  next();
}
