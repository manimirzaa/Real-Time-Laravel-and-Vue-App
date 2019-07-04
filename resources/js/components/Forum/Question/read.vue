<template>
    <div>
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
    </div>
</template>

<script>
import singleQuestion from './singleQuestion'
import editQuestion from './editQuestion'
export default {
    components:{
        singleQuestion, editQuestion
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
