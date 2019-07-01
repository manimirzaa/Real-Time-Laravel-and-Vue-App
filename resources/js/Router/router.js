import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '../components/Login/Login'
import Signup from '../components/Login/signup'
import Forum from '../components/Forum/forum'
import Logout from '../components/Logout/logout'

Vue.use(VueRouter)

const routes = [
    { path: '/login', component: Login },
    { path: '/logout', component: Logout },
    { path: '/signup', component: Signup },
    { path: '/forum', component: Forum , name: 'forum'}
]

const router = new VueRouter({
    routes,
    hashbang: false,
    mode: 'history'
});

export default router;