import { UserInRequest } from '../types/user.type.js';

declare global {
    namespace Express {
        interface Request {
            User: UserInRequest
        }
    }
}

export { };