<template >
  <v-app>
    <transition  enter-active-class="animated slideInDown" leave-active-class="animated fadeOutDown" appear>
      <router-view/>
    </transition>
  </v-app>
</template>
<script>
import router from './router'
export default {
  name: 'App',
  created () {
    if (sessionStorage.getItem('token')) {
      this.$store.dispatch('getMe')
    }
    if (!sessionStorage.getItem('token')) {
      router.push('/login')
    }
    if (this.$store.state.role === null && sessionStorage.getItem('token')) {
      this.$store.dispatch('decode')
    }
  }
}
</script>
<style>
.Page{
  position: absolute;
  width: 100%;
  background-color: white;
}
</style>
