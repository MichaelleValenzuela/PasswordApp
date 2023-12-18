import express from 'express'
import { register,verificarCuenta,login,user, admin } from '../controllers/authController.js'
import authMiddleware from '../middleware/authMiddleware.js'


const router = express.Router()

//Rutas de autenticacion y registro de usuarios
router.post('/register', register)
router.get('/verify/:token', verificarCuenta)
router.post('/login', login)

//Area privada - Requiere un JWT
router.get('/user', authMiddleware, user)
router.get('/admin', authMiddleware, admin)


export default router