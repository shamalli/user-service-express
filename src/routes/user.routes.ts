import { Router } from 'express';
import * as ctrl from '../controllers/user.controller.js';
import auth from '../middleware/auth.middleware.js';
import role from '../middleware/role.middleware.js';
import * as vldtr from '../validators/user.validator.js';
import isEmailUnique from '../middleware/emailunique.middleware.js';

const router = Router();

router.post('/register',  vldtr.register, isEmailUnique, ctrl.register);
router.post('/login', vldtr.login, ctrl.login);
router.get('/users/:id', auth, ctrl.getUser);
router.get('/users', auth, role(['admin']), ctrl.getUsers);
router.post('/users/:id/block', auth, ctrl.blockUser);

export default router;
