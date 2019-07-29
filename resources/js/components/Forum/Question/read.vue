<template>
    <v-container>
        
        <edit-question v-if="editing"
         :data=question
        >
        </edit-question>
        <div v-else>
            <single-question
            :data=question
            v-if="question"
            ></single-question>
        </div>
        <new-reply v-if="loggedIn && question" :questionSlug="question.slug"></new-reply>
        <div class="mt-4" v-else>
            <router-link to="/login">Login to reply</router-link>
        </div>
    </v-container>
</template>

<script>
import singleQuestion from './singleQuestion'
import editQuestion from './editQuestion'
import newReply from '../Reply/newReply'
export default {
    components:{
        singleQuestion, editQuestion, newReply
    },
    computed: {
        loggedIn(){
            return User.loggedIn()
        }
    },
    data(){
        return {
            question: null,
            editing: false
        }
    },
    created(){
        this.getQuestion();
        this.listen();        
    },
    methods: {
        getQuestion(){
            axios.get(`/api/question/${this.$route.params.slug}`)
            .then(res => this.question = res.data.data)
            .catch(error => console.log(error.reponse.data))
        },
        listen(){
            EventBus.$on('editing', () => {
                this.editing = true;
            });

            EventBus.$on('cancelEditing', () => {
                this.editing = false;
            })
        }
    }
    
}
</script>

<style>

</style>
