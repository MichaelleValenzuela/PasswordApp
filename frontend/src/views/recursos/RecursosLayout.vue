<script setup>
    import { RouterView } from 'vue-router'
    import { useUserStore } from '../../stores/user'

    const user = useUserStore()

</script>

<template>    
    <h1>Desde recursoslayout</h1>
    <p class="text-white text-right">Hola: {{user.getUserName}}</p>
    <button
        type="button"
        class="bg-red-600 hover:bg-red-700 p-2 text-white uppercase text-xs font-extrabold rounded-lg"
        @click="user.logout"
    >
        Cerrar sesion
    </button>
    <RouterView/>
</template>