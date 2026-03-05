import { Router } from 'express';
import { register, login, logoutController } from '../controllers/auth.controller.js';

const router = Router();

router.post('/register', register);
router.post('/login', login);
router.post("/logout", logoutController);


export default router;