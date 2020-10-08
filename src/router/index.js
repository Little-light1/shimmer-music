import Vue from 'vue'
import VueRouter from 'vue-router'
import Main from '../views/Main.vue'
import Login from '../views/Login.vue'
import Myself from '../views/Myself.vue'
import Search from '../views/Search.vue'
import Playlist from '../views/Playlist.vue'
import Mv from '../views/Mv.vue'
import Header from '../views/Header.vue'
import Lrc from '../views/Lrc.vue'

Vue.use(VueRouter)

const routes = [

  {
    path: '/',
    component: Login
  },
  {
    path: '/header',
    component: Header,
    children: [
        {
          path: '/main',
          name: 'Main',
          component: Main
        },
        {
          path: '/myself',
          name: 'Myself',
          component: Myself
        },
        {
          path: '/search',
          name: 'Search',
          component: Search
        },
        {
          path: '/playlist',
          name: 'Playlist',
          component: Playlist
        },
        {
          path: '/mv',
          name: 'Mv',
          component: Mv
      },
      {
        path: '/lrc',
        name: 'Lrc',
        component: Lrc
      }
    ]
  }
]



const router = new VueRouter({
  routes
})

// 挂载路由守卫
router.beforeEach((to, from, next) => {
  if (to.path === '/') return next()
    // 获取token
    const toStr = window.sessionStorage.getItem('token')

// 没有token 返回登录页
  if (!toStr) {
    return next('/')
  }
  // 有就放行
  next()
})

export default router
