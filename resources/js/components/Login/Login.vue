<template>
  <v-form @submit.prevent="login">
    <v-container>  
        <v-text-field
        label="E-mail"
        required
        ></v-text-field>
        <v-text-field
        label="password"
        type="password"
        required
        ></v-text-field>
        <v-btn type="submit"
        color="green"
         >submit</v-btn>
    </v-container>    
  </v-form>
</template>

<script>
    export default {
        data(){
            return {
                form : {
                    email: null,
                    password: null
                }
            }
        },
        methods: {
            login(){
                alert('Working');
            }
        }
    }
</script>

<style>

</style>
