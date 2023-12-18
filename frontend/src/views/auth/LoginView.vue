<script setup>
    import {inject} from 'vue'    
    import {useRouter} from 'vue-router'
    import AuthAPI from '../../api/AuthAPI';    

    const toast = inject('toast')
    const router = useRouter()

    const handleSubmit = async (formData) => {
        try {
            const {data: {token}} = await AuthAPI.login(formData)
            localStorage.setItem('AUTH_TOKEN', token) //Guardar el token de autenticacion en el localstorage
            router.push({name: 'mis-recursos'}) //Llama la vista principal de los recursos
        } catch (error) {
            toast.open({
                message: error.response.data.msg,
                type: 'error'
            })
        }
    }
</script>

<template>
  <h1 class="text-6xl font-extrabold text-white text-center mt-10">Iniciar sesion</h1>
   <p class="text-2xl text-white text-center my-5">Ingresa tus credenciales</p>

   <!--
    con el id del formulario se resetea el mismo
   -->
    <FormKit
        id="loginForm"
        type="form"
       :actions="false"
       incomplete-message="No se pudo enviar, revisa los datos ingresados"
       @submit="handleSubmit"
    >  
        <FormKit
            type="email"
            label="Correo"
            name="email"
            placeholder="Ingrese su correo"
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
            placeholder="Ingrese su contraseña"
            validation="required"
            :validation-messages="{
                required: 'La contraseña es obligatoria',              
            }"
        />            
        <FormKit
            type="submit"
        >
            Iniciar sesion
        </FormKit>
    </FormKit>

</template>