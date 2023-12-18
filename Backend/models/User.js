import mongoose from 'mongoose'
import bcrypt from 'bcrypt'
import { uniqueId } from '../utils/index.js'

const userSchema = mongoose.Schema({
    name: {
        type: String,
        required: true, //es un campo obligatorio
        trim: true //Elimina espacios en blanco al inicio o final del campo
    },
    password: {
        type: String,
        required: true,
        trim: true 
    },
    email: {
        type: String,
        required: true,
        trim: true,
        unique: true, //Que sea un correo unico, no repetido
        lowercase: true //Mantiene el correo en minusculas
    },
    token: {
        type: String,
        default: () => uniqueId()
    },
    verified: {
        type: Boolean,
        default: false
    },
    admin: {
        type: Boolean,
        default: false
    }
    ,estadodecuenta: {  //Por implementar!!!!
         type: Boolean,
         default: true
    }
})

userSchema.pre('save', async function (next){ //.pre ejecuta una funcion de codigo antes de --- en este caso guardarse--
    if(!this.isModified('password')) { //Evita que un password hasheado no lo vuelva a hashear 
        next()
    }
    const salt = await bcrypt.genSalt(10)
    this.password = await bcrypt.hash(this.password, salt) //Genera el hasheo de la contraseña
})

userSchema.methods.comprobarContraseña = async function(inputPassword) {
    //Compara el password plano ingresado con el password hasheado en la bd
    return await bcrypt.compare(inputPassword, this.password) 
    
}

const User = mongoose.model('User', userSchema)

export default User