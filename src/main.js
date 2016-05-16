import Vue from 'vue'
import App from './App.vue'
import VueRouter from 'vue-router'
import VueResource from 'vue-resource'
import routerMap from './router'

Vue.use(VueRouter)
Vue.use(VueResource)

const router = new VueRouter()

routerMap(router)

router.start(App, 'app')
