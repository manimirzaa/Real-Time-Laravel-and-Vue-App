<template>
    <div>
        <v-form @submit.prevent="post" >
            <markdown-editor 
            v-model="form.body" 
            ref="markdownEditor">
            </markdown-editor>
            <v-btn v-if="reply_id" type="submit" dark color="blue">
                Update
            </v-btn>
            <v-btn v-else  type="submit" dark color="green">
                Reply
            </v-btn>
            
        </v-form>
    </div>
</template>

<script>
export default {
    data(){
        return {
            form: {
                body: null,
                user_id: User.id()
            },
            reply_id: null,
            reply_index: null,
        }
    },
    created(){
        EventBus.$on('editingReply', (reply) => {
            this.form.body = reply.reply;
            this.reply_id = reply.id;
        })
    },
    props : [
        'questionSlug'
    ],
    methods: {
        post() {
            (this.reply_id) ? this.updateReply() : this.createNewReply()
        },
        created(){
            EventBus.$on('editingReply', (reply) => {
                this.reply_id = reply.id
            })
        },
        createNewReply(){
            axios.post(`/api/question/${this.questionSlug}/reply`, this.form)
            .then(res => {
                EventBus.$emit('replyCreated', res.data)
                this.form.body = ''
                window.scroll(0,0)
            })
        },
        updateReply(){
            axios.put(`/api/question/${this.questionSlug}/reply/${this.reply_id}`, this.form)
            .then(res => {
                EventBus.$emit('replyUpdated', res.data)
                this.form.body = '' 
                this.reply_id = null
            })
        }

    }
}
</script>

<style>

</style>
