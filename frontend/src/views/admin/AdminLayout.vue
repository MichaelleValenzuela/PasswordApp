<script setup>
    import { useUserStore } from '../../stores/user'
    const user = useUserStore()
</script>


<template>
    <div class="flex justify-between">
        <div>
            <h1 class="text-2xl lg:text-6xl font-black text-white">PasswordApp</h1>
            <h2 class="text-xl lg:text-2xl font-black text-white">Panel de Administración</h2>
        </div>

        <div class="flex flex-col space-y-5">
              <div class="flex gap-2 items-center">
                  <p class="text-white text-right">Hola: {{ user.getUserName }}</p>
                  <button
                      type="button"
                      class="bg-red-600 hover:bg-red-700 p-2 text-white uppercase text-xs font-extrabold rounded-lg"
                      @click="user.logout"
                  >
                      Cerrar Sesión
                  </button>
              </div>
          </div>
    </div>
    <main class="space-y-6">

    <div class="relative">
        <!-- Contenedor principal -->
        <div class="container mx-auto p-4">
        <!-- Contenido principal de tu componente -->
        </div>
        
        <!-- Botones a la izquierda y que se mueven con la página -->
        <div class="top-0 left-0 flex flex-col gap-4 p-4">
        <button 
            type="button"
            class="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
            @click="user.cambiarEstado"
        >Administrar las cuentas
        </button>
        <button class="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
        >Seleccionar el tipo de encriptacion
        </button>
        <button class="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
        >Administrar los recursos
        </button>
        </div>
    </div>

       <RouterView />
    </main>
</template>