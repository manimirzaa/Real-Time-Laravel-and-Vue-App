<template>
        <v-card>
            <v-card-title>
                <h1>Edit Question</h1>
            </v-card-title>  
            <v-form @submit.prevent="updateQuestion">
            <v-card-text>                
                    <v-text-field
                    label="Title"
                    v-model="form.title"
                    required
                    ></v-text-field>

                    <markdown-editor 
                    v-model="form.body" 
                    ref="markdownEditor">
                    </markdown-editor>
            
            </v-card-text>
            <v-card-actions >
                <v-btn type="submit"  round dark color="green lighten-1">
                    <v-icon >save</v-icon>
                </v-btn>
                <v-btn @click="cancelEditing"  round dark color="red lighten-1">
                    <v-icon>cancel</v-icon>
                </v-btn>            
            </v-card-actions>  
            </v-form>
        </v-card>    
</template>

<script>
export default {
    props : ['data'],
    data(){
        return{
            form: {
                body: null,
                title: null
            }
        }
    },
    methods: {
        cancelEditing(){
            EventBus.$emit('cancelEditing')
        },
        updateQuestion(){
            axios.put(`/api/question/${this.form.slug}`, this.form)
            .then(res => EventBus.$emit('cancelEditing'))
            .catch(error => console.log(error.response.data))
        }
    },
    created() {
        this.form = this.data
    }
}
</script>

<style>

</style>
