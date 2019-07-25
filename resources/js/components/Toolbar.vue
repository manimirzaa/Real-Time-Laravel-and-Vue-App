<template>
  <v-toolbar dark color="primary">
    <!-- <v-toolbar-side-icon></v-toolbar-side-icon> -->
    <v-toolbar-title>Mask Vision</v-toolbar-title>
    <v-spacer></v-spacer>
    <notifications v-if="loggedIn"></notifications>
    <div>      
      <router-link v-for="item in items" :to="item.to" :key="item.title" v-if="item.show" >
        <v-btn flat>{{ item.title }}</v-btn>
      </router-link>
    </div>
  </v-toolbar>
</template>

<script>
import notifications from './AppNotifications'
export default {
    components: {notifications},
    data() {
        return {
        items: [
            {title: 'Forum', to: '/forum', show: 'true' },
            {title: 'Ask Question', to: '/ask', show: User.loggedIn() },
            {title: 'Categories', to: '/category', show: User.loggedIn() },
            {title: 'Login', to: '/login', show: !User.loggedIn() },
            {title: 'Logout', to: '/logout', show: User.loggedIn() }
        ]
        }
    },
    created(){
        EventBus.$on('logout', () => {
            console.log('logout');
            User.logout()
        })
    },
    computed: {
      loggedIn(){
        return User.loggedIn()
      }  
    }
}
</script>

<style>

</style>
