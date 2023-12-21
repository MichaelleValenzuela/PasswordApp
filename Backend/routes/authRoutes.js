import express from 'express'
import { register,verificarCuenta,login,user, admin, obtenerUsuarios, cambiarEstado } from '../controllers/authController.js'
//import { obtenerUsuarios,cambiarEstado } from '../controllers/adminController.js'
import authMiddleware from '../middleware/authMiddleware.js'


const router = express.Router()

//Rutas de autenticacion y registro de usuarios
router.post('/register', register)
router.get('/verify/:token', verificarCuenta)
router.post('/login', login)

//Area privada - Requiere un JWT
router.get('/user', authMiddleware, user)
router.get('/admin', authMiddleware, admin)
//router.get('/admin', obtenerUsuarios)
router.post('/admin', cambiarEstado)


export default router