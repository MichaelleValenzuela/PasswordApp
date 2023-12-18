import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
import {db} from './config/db.js'
import loginRoutes from './routes/loginRoutes.js' //si NO es una dependencia hay q colocar el -> .js
import authRoutes from './routes/authRoutes.js'

//Variables de entorno
dotenv.config()

//Configurar la app
const app = express()

//Leer datos via body
app.use(express.json())

//Conectar a BD
db()

//Configurar CORS
const whiteList = [process.env.FRONTEND_URL, undefined] //Quitar >>>>undefined<<<<< al momento de subir a produccion

const corsOptions = {
    origin: function(origin, callback) {
        if(whiteList.includes(origin)) {
            //Permitir la conexcion
            callback(null, true)
        } else {
            //Denegar la conexcion
            callback(new Error('Error de CORS'))
        }
    }
}

app.use(cors(corsOptions)) //Habilitando cors


//Definir una ruta
app.use('/login', loginRoutes)
app.use('/auth', authRoutes)

//Definir puerto
const PORT = process.env.PORT || 4000 //process.env.PORT asigna el puerto de las variables de entorno

//Arrancar la app
app.listen(PORT, () => {
    console.log('El servidor se esta ejecutando en el puerto:', PORT)
})
