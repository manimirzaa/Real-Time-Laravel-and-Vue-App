<template>
    <v-layout row wrap>
      <v-flex xs8>
        <question v-for="question in questions"
        :key="question.path"
        :data=question
        >
        </question>
      </v-flex>
      <v-flex xs4>
        <category>
        </category>
      </v-flex>    
    </v-layout>
</template>


<script>

import question from './Question/question'
import category from './Category/category'

export default {
    data(){
        return {
            questions: {}
        }
    },
    components: {question, category},
    created(){
        axios.get('/api/question')
        .then(res => this.questions = res.data.data)
        .catch(error => console.log(error.response.data))
    }

}
</script>

<style>

</style>
