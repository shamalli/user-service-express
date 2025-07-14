import { Role } from '../types/role.type.js';

export type UserInRequest = {
    ID: number,
    Email: string,
    Role: Role
}