<template>
    <div>
        <v-card>
            <v-card-title primary-title>
                <div>
                    <h3 class="headline mb-0">{{ data.title }}</h3>
                    <div class="grey--text"> {{ data.user }} said {{ data.created_at }} </div>
                </div>
                <v-spacer></v-spacer>
                <v-btn color="grey lighten-2" > {{ replyCount }} Replies</v-btn>
            </v-card-title>
            <v-card-text v-html="body">
            </v-card-text>
            <v-card-actions v-if="own">
                <v-btn @click="editQuestion"  round dark color="blue lighten-1">
                    <v-icon >edit</v-icon>
                </v-btn>
                <v-btn @click="deleteQuestion"  round dark color="red lighten-1">
                    <v-icon>delete</v-icon>
                </v-btn>            
            </v-card-actions>
        </v-card>            
        <replies :replies="data.replies" :questionSlug="data.slug"></replies>
    </div>
</template>

<script>

import replies from '../Reply/replies'

export default {
    created(){
        EventBus.$on('replyCreated', () => {
            this.replyCount ++        
        })

        EventBus.$on('replyDeleted', (index) => {
            this.replyCount --
        })

         Echo.private('App.User.' + User.id())
             .notification((notification) => {
             this.replyCount ++
         })

        Echo.channel('delete-reply-channel')
        .listen('DeleteReplyEvent', (e) => {
            this.replyCount --
        });
    },
    components: {replies},
    data(){
        return{
            own: User.own(this.data.user_id),
            replyCount: this.data.reply_count
        }
    },
    
    props: ['data'],    
    computed: {
        body(){
            return md.parse(this.data.body)
        }
    },
    methods:{
        deleteQuestion(){
               axios.delete(`/api/question/${this.data.slug}`)
            .then(res => this.$router.push('/forum'))
            .catch(error => console.log(error.response.data))
        },
        editQuestion(){
            EventBus.$emit('editing')
        }
    }
}
</script>

<style>

</style>
