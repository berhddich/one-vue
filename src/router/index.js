import { createRouter, createWebHistory } from 'vue-router'
import UserProfile from '../components/userProfile.vue'
import Home from '../views/Home.vue'


const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/user/:userId',
    name: 'UserProfile',
    component: UserProfile
  },
 
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
