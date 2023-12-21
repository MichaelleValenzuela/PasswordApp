import User from "../models/User.js"
import { envioEmailVerificacion } from '../emails/authEmail.js'
import {generateJWT} from '../utils/index.js'

const register = async (req, res) => {
  //Valida todos los campos
  if (Object.values(req.body).includes("")) {
    //values transforma el objeto en un arreglo
    const error = new Error("Todos los campos son obligatorios");

    return res.status(400).json({
      //status modifica el estado del endpoint
      msg: error.message,
    });
  }

  const { email, password, name } = req.body;
  //Evitar registros duplicados
  const userExists = await User.findOne({ email }); //findOne entra un registro en la BD
  if (userExists) {
    const error = new Error("Usuario ya registrado");

    return res.status(400).json({
      //status modifica el estado del endpoint
      msg: error.message,
    });
  }

  //Validar la extension del password
  const MIN_PASSWORD_LENGTH = 8;
  if (password.trim().length < MIN_PASSWORD_LENGTH) {
    const error = new Error(
      `La contraseña debe contener ${MIN_PASSWORD_LENGTH} caracteres`
    );

    return res.status(400).json({
      //status modifica el estado del endpoint
      msg: error.message,
    });
    }
    try {
      const user = new User(req.body); //crea un nuevo usuario segun el modelo definido en User.js
      //await user.save(); // Almacena la informacion en la BD
      const result = await user.save()
      const {name, email, token} = result
      //funcion de envio de email de verificacion
      envioEmailVerificacion({
        name,
        email,
        token
      })

      res.json({
        msg: "El usuario se creo correctamente, revisa tu email",
      });
    } catch (error) {
      console.log(error);
    }
}

const verificarCuenta = async (req,res) => {
  const {token} = req.params

  const user = await User.findOne({token})
  if(!user){
    const error = new Error('Hubo un error, token no valido')
    return res.status(401).json({msg: error.message})
  }

  //si el token es valido, confirmar cuenta
  try {
    user.verified = true
    user.token = ''
    await user.save()
    res.json({msg:'Usuario confirmado correctamente'})
  } catch (error) {
    console.log(error)
  }
}

const login = async (req, res) => {
  const {email,password} = req.body

  //Revisar si el usuario existe
  const user = await User.findOne({email})
  if(!user){
    const error = new Error('El usuario no existe')
    return res.status(401).json({msg: error.message})
  }

  //Revisar si el usuario tiene cuenta confirmada
  if(!user.verified){
    const error = new Error('Tu cuenta aun no esta confirmada')
    return res.status(401).json({msg: error.message})
  }

  //Comprobar el password
  if(await user.comprobarContraseña(password)){
    //Generar el token con el id del usuario una vez confirmada la contraseña
    const token = generateJWT(user._id)    

    res.json({
      token
    })
  } else {
    const error = new Error('La contraseña es incorrecta')
    return res.status(401).json({msg: error.message})
  }

  //Revisar si el usuario tiene cuenta activa IMPLEMENTAR
}

const user = async (req, res) => {
  const {user} = req
  res.json(
    user
  )
}

const admin = async (req, res) => {
  const {user} = req
  if (!user.admin) {
    const error = new Error('Accion no valida')
    return res.status(403).json({msg:error.message})
  }
  res.json(
    user
  )
}

const obtenerUsuarios = async (req, res ) => {
  console.log('desde obtener usuarios')
}

const cambiarEstado = async (req, res) => {
  console.log('desde cambiar estado')
}

export {
  register,
  verificarCuenta,
  login,
  user,
  admin,
  obtenerUsuarios,
  cambiarEstado
}
