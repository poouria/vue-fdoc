<!--suppress ALL -->
<template>
  <div class="doctors Page">
    <v-layout align-center justify-center row >
      <v-flex  xs12>
        <v-card flat>
          <v-img style="background-color: #00838F; height: 170px"
                 :src="require('../../public/img/app/headerbg.png')"
                 :lazy-src="require('../../public/img/app/headerbg.png')">
            <v-card-title style="display: flex; justify-content: center" primary-title class="text-xs-center">
              <v-container class="ma-0 pa-0" >
                <v-icon size=45>face</v-icon>
                <h2 class="headline" style="color: #EFEFEF">{{$route.name}}</h2>
                <h3 v-if="$route.path=='/admin/doctors'">لیست پزشکان ثبت شده در سامانه</h3>
                <v-layout  align-center justify-space-between row fill-height>
                  <transition enter-active-class="animated fadeInRight" leave-active-class="animated fadeOutRight">
                    <div v-if="$route.path =='/admin/doctors'">
                      <div>

                      </div>
                    </div>
                  </transition>
                  <transition  enter-active-class="animated fadeInLeft" leave-active-class="animated fadeOutLeft">
                    <div style="position: absolute; bottom: 0; left: 11px; text-align: left; width: 100%" v-if="$route.path =='/admin/users/add' || $route.name =='ویرایش کاربر'">
                      <div style="">
                        <router-link :to="{ path: '/users'}">
                          <v-btn  flat icon color="white">
                            <v-icon>arrow_back</v-icon>
                          </v-btn>
                        </router-link>
                      </div>
                    </div>
                  </transition>
                </v-layout>
              </v-container>
            </v-card-title>
          </v-img>
          <transition  enter-active-class="animated fadeInRight" leave-active-class="animated fadeOutRight" appear>
            <router-view></router-view>
          </transition>
        </v-card>
      </v-flex>
    </v-layout>

  </div>
</template>
<script>
  import axios from 'axios'

export default {
  name: 'UsersMain',
  data () {
    return {
    }
  },
  methods: {

  }
}
</script>
<style lang="scss" scoped>
  .searchInput{
    .theme--light.v-label {
      color: rgba(255, 255, 255, 0.54);
    }
  }

</style>
