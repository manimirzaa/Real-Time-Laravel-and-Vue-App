<template>
      <v-card class="mb-2" >
        <v-card-title primary-title>
          <div>
            <h3 class="headline mb-0">
              <router-link :to="data.path" >
              {{ data.title }}
              </router-link>
            </h3>
            <div class="grey--text"><strong>{{ data.user }}</strong> said {{ data.created_at }} </div>
          </div>
        </v-card-title>
        <v-card-text>
          {{ data.body }}
        </v-card-text>
        
    </v-card>
</template>


<script>
export default {
  props: ['data']
}
</script>

<style>

</style>
