<template>
  <v-form @submit.prevent="login">
    <v-container>  
        <v-text-field
        v-model="form.email"
        label="E-mail"
        required
        ></v-text-field>
        <v-text-field
        v-model="form.password"
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
                form: {
                    email: null,
                    password: null
                }
            }
        },
        methods: {
            login(){                
                User.login(this.form)
            }
        }
    }
</script>

<style>

</style>
