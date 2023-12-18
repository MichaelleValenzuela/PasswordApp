<script setup>
    import { inject } from 'vue'
    import {reset} from '@formkit/vue'
    import AuthAPI from '../../api/AuthAPI'

    const toast = inject('toast')
    

    const handleSubmit = async ({password_confirm, ...formData}) => {
        try {
            const {data} = await AuthAPI.register(formData)
            //data es un variable de axios, tiene SIEMPRE ESE NOMBRE
            toast.open({
                message: data.msg,
                type: 'success'
            })
            reset('registerForm') //tiene que tener el mismo nombre del formkit en el html
        } catch (error) {                    
            toast.open({
                message: error.response.data.msg,
                type: 'error'
            })
        }        
    }
</script>

<template>
   <h1 class="text-6xl font-extrabold text-white text-center mt-10">Crear una cuenta</h1>
   <p class="text-2xl text-white text-center my-5">Crea una cuenta en PasswordApp</p>

   <!--
    con el id del formulario se resetea el mismo
   -->
    <FormKit
        id="registerForm"
        type="form"
       :actions="false"
       incomplete-message="No se pudo enviar, revisa los datos ingresados"
       @submit="handleSubmit"
    >
        <FormKit
            type="text"
            label="Nombre"
            name="name"
            placeholder="Ingres tu nombre"
            validation="required|length:3"
            :validation-messages="{
                required: 'El nombre es obligatorio',
                length: 'El nombre es muy corto'
            }"
        />

        <FormKit
            type="email"
            label="Correo"
            name="email"
            placeholder="Ingrese su email"
            validation="required|email"
            :validation-messages="{
                required: 'El correo es obligatorio',
                email: 'Correo no valido'
            }"
        />

        <FormKit
            type="password"
            label="Contraseña"
            name="password"
            placeholder="Ingrese su contraseña - MINIMO 8 caracteres"
            validation="required|length:8"
            :validation-messages="{
                required: 'La contraseña es obligatorio',
                length: 'La contraseña debe contener al menos 8 caracteres'
            }"
        />
            <!--
                busca por el nombre
                ejem. password busca por el nombre 
                SIEMPRE PONER -> _ <- y confirm 
            -->
        <FormKit
            type="password"
            label="Repetir contraseña"
            name="password_confirm"
            placeholder="Repite la contraseña"
            validation="required|confirm"
            :validation-messages="{
                required: 'La contraseña es obligatorio',
                confirm: 'Las contraseñas no son iguales'
            }"
        />

        <FormKit
            type="submit"
        >
            Crear cuenta
        </FormKit>
    </FormKit>

</template>