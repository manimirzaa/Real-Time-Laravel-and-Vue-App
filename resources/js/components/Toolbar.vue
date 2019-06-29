<template>
  <v-toolbar>
    <!-- <v-toolbar-side-icon></v-toolbar-side-icon> -->
    <v-toolbar-title>Mask Vision</v-toolbar-title>
    <v-spacer></v-spacer>
    <div>
      <v-btn flat>Forum</v-btn>
      <v-btn flat>Ask Question</v-btn>
      <v-btn flat>Categories</v-btn>
      <router-link to="/login">
        <v-btn flat>Login</v-btn>
      </router-link>
    </div>
  </v-toolbar>
</template>

<script>
export default {

}
</script>

<style>

</style>
