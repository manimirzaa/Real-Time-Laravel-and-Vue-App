<template>

    <v-card class="mb-1 mt-5" >
        <v-card-title>
            <div class="headline">{{ reply.user }}</div>
            <div class="ml-2">said {{ reply.created_at }}</div>
            <v-spacer></v-spacer>
            <like :content="reply"></like>
        </v-card-title>
        <v-divider></v-divider>
        <v-card-text>
            {{ reply.reply }}
        </v-card-text>
        <v-divider></v-divider>
        <v-card-actions v-if="own">
            <v-btn @click="editReply(reply.id)" icon small>
                <v-icon color="blue">edit</v-icon>
            </v-btn>
            <v-btn @click="deleteReply(reply.id)" icon small>
                <v-icon color="red">delete</v-icon>
            </v-btn>
            
        </v-card-actions>
    </v-card>
    
</template>

<script>

import like from '../Like/like'

export default {
    props: ['reply', 'questionSlug', 'index'],
    components: {like},
    computed:{
        own(){
            return User.own(this.reply.user_id)
        }
    },
    methods: {
        editReply(){
            EventBus.$emit('editingReply', this.reply)
            EventBus.$emit('startEditing', this.index)
        },
        deleteReply(){
            axios.delete(`/api/question/${this.questionSlug}/reply/${this.reply.id}`)
            .then(res => EventBus.$emit('replyDeleted', this.index))
        }
    }
}
</script>

<style>

</style>
