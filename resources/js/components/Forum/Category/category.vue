<template>
      <v-card>
        <v-toolbar color="blue lighten-1" dark>
          <v-toolbar-title>Categories</v-toolbar-title>    
        </v-toolbar>
        <v-list>
          <v-list-tile v-for="category in categories" :key="category.id">
              <v-list-tile-content >
                  <v-list-tile-title >{{ category.name }}</v-list-tile-title>
              </v-list-tile-content>  
          </v-list-tile>
        </v-list>  
      </v-card>  
</template>


<script>
export default {
   created(){
     axios.get('api/category')
     .then(res => this.categories = res.data.data)
     .catch(error => error.response.data)
   },
   data(){
     return{
       categories: {}
     }
   }
}
</script>

<style>

</style>
