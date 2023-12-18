import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import AuthAPI from '../api/AuthAPI'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/admin',
      name: 'admin',
      component: () => import('../views/admin/AdminLayout.vue'),
      meta: {requiresAdmin: true},
      children: [
        {
          path: 'cambiar-estados',
          name: 'cambiarestados',
          component: () => import('../views/admin/CambiarEstadoView.vue')
        },
        {
          path: 'cambiar-encriptacion',
          name: 'cambiarencriptacion',
          component: () => import('../views/admin/CambiarEncriptacionView.vue')
        },
        {
          path: 'tipos-recurso',
          name: 'tiposrecurso',
          component: () => import('../views/admin/TiposRecursoView.vue')
        }
      ]
    },
    {
      path: '/auth',
      name: 'auth',
      component: () => import('../views/auth/AuthLayout.vue'),
      children: [
        {
          path: 'registro',
          name: 'register',
          component: () => import('../views/auth/RegisterView.vue')
        },
        {
          path: 'confirmar-cuenta/:token',
          name: 'confirm-account',
          component: () => import('../views/auth/ConfirmAccountView.vue')
        },
        {
          path: 'login',
          name: 'login',
          component: () => import('../views/auth/LoginView.vue')
        }
      ]
    },
    {
      path: '/recursos',
      name: 'recursos',
      component: () => import('../views/recursos/RecursosLayout.vue'),
      meta: {requiresAuth: true}, //Proteger las rutas, para lo cual es usuario debe estar autenticado
      children: [
        {
          path: '',
          name: 'mis-recursos',
          component: () => import('../views/recursos/MisRecursosView.vue')
        }
      ]

    }    
  ]
})

//Proteccion de rutas
router.beforeEach(async (to, from, next) => { //Se ejecuta antes de mostrar las rutas
  const requiresAuth = to.matched.some(url => url.meta.requiresAuth)
  if(requiresAuth) {
      try {
        const {data} = await AuthAPI.auth()
        if (data.admin) {
          next({name: 'admin'})
        } else {
          next()          
        }
        
      } catch (error) {
        next({name: 'login'})
      }
    } else {
      next()
    }
}) 

router.beforeEach(async (to, from, next) => { //Se ejecuta antes de mostrar las rutas
  const requiresAdmin = to.matched.some(url => url.meta.requiresAdmin)
  if(requiresAdmin) {
     try {
      await AuthAPI.admin()
      next()
     } catch (error) {
        next({name: 'login'})
     }
    } else {
      next()
    }
}) 

export default router
