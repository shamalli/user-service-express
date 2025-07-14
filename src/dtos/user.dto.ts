import { Role } from '../types/role.type.js';

export class UserDTO {
    id: number;
    fullName: string;
    birthDate: string;
    email: string;
    role: Role;
    isActive: boolean;

    constructor(id: number, fullName: string, birthDate: string, email: string, role: Role, isActive: boolean) {
        this.id = id;
        this.fullName = fullName;
        this.birthDate = birthDate;
        this.email = email;
        this.role = role;
        this.isActive = isActive;
    }
}