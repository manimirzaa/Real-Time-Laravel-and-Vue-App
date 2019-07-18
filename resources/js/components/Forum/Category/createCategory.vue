<template>
    <v-container>  
        <v-card>
            <v-card-title>
                <h1>Create Category</h1>
            </v-card-title>  
            <v-card-text>    
                <v-form @submit.prevent="submit">
                    <v-text-field label="Category Name" v-model="form.name" required >                        
                    </v-text-field>
                    <v-card-actions>
                        <v-btn v-if="editSlug" color="blue" type="submit" round small class="white--text">
                            <v-icon>update</v-icon>
                        </v-btn>
                        <v-btn v-else color="success" type="submit" round small class="white--text">
                            <v-icon>save</v-icon>
                        </v-btn>
                        
                        <v-btn @click="cancelCategoryCreation" color="red" round small class="white--text">
                            <v-icon>cancel</v-icon>
                        </v-btn>
                    </v-card-actions>                    
                </v-form>
            </v-card-text>   
        </v-card>
        <v-card color="blue">
            <v-card-title>
                <h1 class="white--text">Categories</h1>
            </v-card-title>
            <v-list>
                <div v-for="(category, index) in categories" :key="category.id">
                    <v-list-tile >
                        <v-list-tile-action>
                            <v-btn @click="editClick(index, category.slug)" icon >
                                <v-icon color="blue">edit</v-icon>
                            </v-btn>
                        </v-list-tile-action>                   
                        <v-list-tile-content >
                            <v-list-tile-title >{{ category.name }}</v-list-tile-title>
                        </v-list-tile-content>
                        <v-list-tile-action>
                            <v-btn @click="deleteCategory(category.slug, index)" icon >
                                <v-icon color="red">delete</v-icon>
                            </v-btn>
                        </v-list-tile-action>                 
                    </v-list-tile>         
                    <v-divider></v-divider>
                </div>   
            </v-list> 
            
        </v-card>
    </v-container>         
</template>

<script>
export default {
    data(){
        return {
            form: {
                name: null
            },
            categories: {},
            editSlug: null,
            index: null
        }
    },
    created(){
        this.getCategories()
    },
    methods: {
        submit(){
            (this.editSlug != null) ? this.editCategory(this.index) : this.createCategory()
        },
        createCategory(){
            axios.post('/api/category', this.form)
            .then(res => {
                this.categories.unshift(res.data)
                this.form.name = null
            })            
        },
        editClick(index, slug){
            this.index = index;
            let categoryName = this.categories[index].name; 
            let categorySlug = this.categories[index].slug;
            this.form.name = categoryName; 
            this.editSlug = slug;
        },
        editCategory(index){
            axios.patch(`/api/category/${this.editSlug}`, this.form)
            .then(res => {
                //this.categories.splice(index, 1)
                this.categories.splice(index, 1, res.data)
                this.form.name = null
            })            
        },

        getCategories(){
            axios.get('/api/category')
            .then(res => this.categories = res.data.data)
            .catch(error => console.log(error.respose.data))
        },
        cancelCategoryCreation(){
            this.$router.push('/forum')
        },
        deleteCategory(slug, index){
            axios.delete(`/api/category/${slug}`)
            .then(res => this.categories.splice(index, 1))
                                
        }
    }
}
</script>

<style>

</style>
