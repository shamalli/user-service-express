import { Role } from '../types/role.type.js';

export class UserCreationDTO {
    fullName: string;
    birthDate: string;
    email: string;
    password: string;
    role: Role;
}