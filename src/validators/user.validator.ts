import { Request, Response, NextFunction } from 'express';
import { body, validationResult } from 'express-validator';


export const register = [
    body('fullName')
        .notEmpty()
        .withMessage('Name is required')
        .isString()
        .withMessage("Name should be string"),
    body('email')
        .isEmail()
        .withMessage('Invalid email address'),
    body('birthDate')
        .notEmpty()
        .withMessage('Bith date required')
        .isDate()
        .withMessage('Bith date format is incorrect'),
    body('password')
        .notEmpty()
        .withMessage('Password is required')
        .isLength({ min: 6 })
        .withMessage('Password must be at least 6 characters long'),
    (req: Request, res: Response, next: NextFunction) => {
        handleErrors(req, res, next);
    }
];

export const login = [
    body('email')
        .isEmail()
        .withMessage('Invalid email address'),
    body('password')
        .notEmpty()
        .withMessage('Password is required'),
    (req: Request, res: Response, next: NextFunction) => {
        handleErrors(req, res, next);
    }
];

function handleErrors(req: Request, res: Response, next: NextFunction) {
    const result = validationResult(req);
    if (!result.isEmpty()) {
        return res.status(400).json({ errors: result.array() });
    } else {
        next();
    }
}