<script setup>
    import { useUserStore } from '../../stores/user'
    const user = useUserStore()

    export default {
    data() {
        return {
        usuarios: [], // Aquí almacenarás la lista de usuarios
        };
    },
    mounted() {
        // Llama a tu función para obtener la lista de usuarios
        this.obtenerUsuarios();
    },
    methods: {
        obtenerUsuarios() {
        // Realiza una llamada al servidor para obtener la lista de usuarios
        // Actualiza this.usuarios con los datos obtenidos
        },
        cambiarEstado(usuario) {
        // Realiza una llamada al servidor para cambiar el estado del usuario
        // Actualiza la información en MongoDB
        },
        }
</script>


<template>
    <p class="text-white text-lg mt-5">
        Lista de todos los usuarios
    </p>
    <h2>Lista de Usuarios</h2>
    <ul>
      <li v-for="usuario in usuarios" :key="usuario._id">
        {{ usuario.nombre }}
        <label class="switch">
          <input type="checkbox" v-model="usuario.estado" @change="cambiarEstado(usuario)">
          <span class="slider"></span>
        </label>
      </li>
    </ul>
    <RouterView />

</template>