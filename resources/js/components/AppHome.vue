<template>
    <div>
        <toolbar></toolbar>
        <router-view></router-view>
        <footercomponent></footercomponent>
    </div>    
</template>

<script>
import toolbar from './Toolbar';
import footercomponent from './FooterComponent';
import login from './Login/Login';
import signup from './Login/signup';

export default {
  components:{toolbar, footercomponent, login}
}
</script>

<style>

</style>
