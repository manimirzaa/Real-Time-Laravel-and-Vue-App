<template>
  <v-toolbar dark color="primary">
    <!-- <v-toolbar-side-icon></v-toolbar-side-icon> -->
    <v-toolbar-title>Mask Vision</v-toolbar-title>
    <v-spacer></v-spacer>
    <div>      
      <router-link v-for="item in items" :to="item.to" :key="item.title" v-if="item.show" >
        <v-btn flat>{{ item.title }}</v-btn>
      </router-link>
    </div>
  </v-toolbar>
</template>

<script>
export default {

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
    }

}
</script>

<style>

</style>
