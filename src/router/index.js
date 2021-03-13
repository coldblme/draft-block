import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)
export default new VueRouter({
  mode: 'history',
  base: '/test/',
  routes: [
    {
      path: '/',
      component: ()=> import ('../page/foo/index.vue')
    },
    {
      path: '/foo',
      component: ()=> import ('../page/foo'),
    },
    {
      path: '/bar',
      component: ()=> import ('../page/bar')
    }
  ]
})