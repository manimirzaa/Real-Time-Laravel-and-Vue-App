<template>
    <div class="text-xs-center">
    <v-menu offset-y>
      <template v-slot:activator="{ on }">
        <v-btn icon v-on="on">        
            <v-badge color="red" overlap>
                <template v-if="unread.length > 0" v-slot:badge>
                    <span>{{ unreadCount }}</span>
                </template>
                <v-icon>notifications </v-icon>       
            </v-badge>         
        </v-btn>  
      </template>
      <v-list>
        <v-list-tile v-for="notification in unread" :key="notification.id">
          {{ notification.replyBy }} replied on &nbsp;
          <router-link :to="notification.path">  
            <v-list-tile-title @click="readIt(notification)">{{ notification.question }}</v-list-tile-title>
          </router-link>
        </v-list-tile>
        <v-divider></v-divider>
        <v-list-tile v-for="notification in read" :key="notification.id">
          <v-list-tile-title>{{ notification.question }}</v-list-tile-title>
        </v-list-tile>
      </v-list>
    </v-menu>
  </div>
</template>

<script>
export default {
    data(){
        return{
            read: {},
            unread: {},
            unreadCount: 0
        }
    },
    created(){
        /* Instant notification part */
        Echo.private('App.User.' + User.id())
            .notification((notification) => {
            this.unread.unshift(notification)
            this.unreadCount ++
        });

        axios.post('/api/notifications')
        .then((res) => {
            this.read = res.data.read;
            this.unread = res.data.unread;
            this.unreadCount = res.data.unread.length;
        }).catch(error => Exception.handle(error))   
    },
    methods: {
        readIt(notification){
            axios.post('/api/markAsRead', {id: notification.id})
            .then((res) => {
                this.unread.splice(notification, 1);
                this.read.push(notification)
            })
        }
    }
}
</script>

<style>

</style>
