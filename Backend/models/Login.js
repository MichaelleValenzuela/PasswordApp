//BORRAR

import mongoose from "mongoose"

const loginSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    email:{
        type: String,
        required: true,
        trim: true
    }
})

const login = mongoose.model('Login', loginSchema)
export default login