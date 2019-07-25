<template>
    <div>
        <reply v-for="(reply,  index) in allReplies" 
        :key="reply.id" 
        :index="index" 
        :questionSlug="questionSlug" 
        :reply="reply">
        </reply>
    </div>
</template>

<script>

import reply from './reply'

export default {
    components: {reply},
    props: ['replies', 'questionSlug'],
    data(){
        return{
            reply_index: null,
            allReplies: {}
        }
    },
    created(){

        this.allReplies = this.replies

        Echo.channel('delete-reply-channel')
        .listen('DeleteReplyEvent', (e) => {
            for(let index = 0; index < this.allReplies.length; index ++){
                if(this.allReplies[index].id == e.id){
                    this.allReplies.splice(index, 1)
                }
            }
        });

        EventBus.$on('replyDeleted', (index) => {
            this.replies.splice(index, 1)
        })

        EventBus.$on('replyCreated', (reply) => {
            this.replies.unshift(reply)
        })

        EventBus.$on('startEditing', (index) => {
            this.reply_index = index
        })

        EventBus.$on('replyUpdated', (reply) => {
            this.replies.splice(this.reply_index, 1, reply)
        })

        Echo.private('App.User.' + User.id())
            .notification((notification) => {
            this.allReplies.unshift(notification.reply)
        });

    }
}
</script>

<style>

</style>
