<template>
    <v-btn @click="likeIt" icon>
        <v-icon color="blue" >{{icon}} </v-icon>{{ likes }}
    </v-btn>
</template>

<script>
export default {
    created(){ 
        this.liked ? this.icon = 'favorite' : 'favorite_border'
     },
    props: ['content'],
    data(){
        return{
            likes: this.content.likes_count,
            liked: this.content.liked,
            icon: 'favorite_border'
        }
    },
    methods: {
        likeIt(){
            this.liked ? this.dec() : this.inc() 
            this.liked = !this.liked
        },
        dec(){
            if(User.loggedIn()){
                axios.delete(`/api/like/${this.content.id}`)
                .then(() => {
                    this.likes --;
                    this.icon = 'favorite_border'
                })
            }
        },
        inc(){
            if(User.loggedIn()){
                axios.post(`/api/like/${this.content.id}`)
                .then(() => {
                    this.likes ++;
                    this.icon = 'favorite'
                })
            }
        }

    }
}
</script>

<style>

</style>
