import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '../components/Login/Login'
import Signup from '../components/Login/signup'
import Forum from '../components/Forum/forum'
import Read from '../components/Forum/Question/read'
import Logout from '../components/Logout/logout'
import Ask from '../components/Forum/Question/ask'
import createCategory from '../components/Forum/Category/createCategory'


Vue.use(VueRouter)

const routes = [
    { path: '/login', component: Login },
    { path: '/category', component: createCategory },
    { path: '/logout', component: Logout },
    { path: '/signup', component: Signup },
    { path: '/ask', component: Ask },
    { path: '/forum', component: Forum , name: 'forum'},
    { path: '/question/:slug', component: Read , name: 'read'}
]

const router = new VueRouter({
    routes,
    hashbang: false,
    mode: 'history'
});

export default router;