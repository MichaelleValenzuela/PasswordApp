import mongoose from 'mongoose'
import jwt from 'jsonwebtoken'

const uniqueId = () => Date.now().toString(32)+Math.random().toString(32).substring(2)

//Generador del JWT
const generateJWT = (id) => {
    //emplea la key, el tiempo en q es valido la autenticacion
    const token = jwt.sign({id}, process.env.JWT_SECRET, {
        expiresIn: '1h'
    })

    return token
}

export {
    uniqueId,
    generateJWT
}