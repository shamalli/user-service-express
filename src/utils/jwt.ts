import jwt from 'jsonwebtoken';

const secret = process.env.JWT_SECRET as string;

export const generateToken = (user: any) => {
  return jwt.sign({
    id: user.id,
    email: user.email,
    role: user.role,
  }, secret, { expiresIn: '1d' });
};

export const verifyToken = (token: string) => jwt.verify(token, secret);
