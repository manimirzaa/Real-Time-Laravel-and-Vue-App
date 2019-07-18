<template>
    <div>
        <reply v-for="(reply,  index) in replies" 
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
            reply_index: null
        }
    },
    created(){
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
    }
}
</script>

<style>

</style>
