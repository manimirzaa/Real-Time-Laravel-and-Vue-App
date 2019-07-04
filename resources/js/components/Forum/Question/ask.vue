
<template>
<v-container>  
<v-card>
  <v-card-title>
    <h1>Ask Question</h1>
  </v-card-title>  
<v-card-text>    
    <v-form @submit.prevent="createQuestion">
        
            <v-text-field
            label="Title"
            v-model="form.title"
            required
            ></v-text-field>

            <v-select
            v-model="form.category_id"            
            :items="categories"
            item-text="name"
            item-value="id"
            label="Select Category"
            autocomplete
            ></v-select>

            <markdown-editor 
            v-model="form.body" 
            ref="markdownEditor">
            </markdown-editor>

            <v-btn type="submit"
            color="green"
            class="white--text"
            >Ask</v-btn>

    </v-form>
</v-card-text>
  
</v-card>
</v-container>  
</template>

<script>
export default {
    data(){
        return {
            form: {
                title: null,
                category_id: null,
                body: null,
            },
            categories: {},
            errors: {}
        }
    },
    created(){
        axios.get('api/category')
        .then(res => this.categories = res.data.data)
        .catch(error => console.log(error.response.data))

        this.form.user_id = User.id()
    },
    methods: {
        createQuestion(){
            axios.post('api/question', this.form)
            .then(res => this.$router.push(res.data.path))
            .catch(error => this.errors = error.response.data.error)
        }
    }
}
</script>

<style>

</style>
