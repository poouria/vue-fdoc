<template >
  <div class="home Page">
    <v-app>
      <v-toolbar dark app :clipped-right="clipped" color="primary" >
        <v-toolbar-side-icon @click.stop="drawer = !drawer"></v-toolbar-side-icon>

        <v-toolbar-title class="white--text toolbar-title">{{title}}</v-toolbar-title>

        <v-spacer></v-spacer>

        <v-btn icon>
          <v-icon>search</v-icon>
        </v-btn>
        <v-menu offset-y :nudge-width="200" :nudge-top="-14" :close-on-content-click="false">
          <v-btn slot="activator"  color="white" flat icon dark>
            <v-icon>account_circle</v-icon>
          </v-btn>
          <v-card>
            <v-list>
              <v-list-tile avatar>
                <v-list-tile-avatar>
                  <img :src="me.avatar" alt="avatar">
                </v-list-tile-avatar>

                <v-list-tile-content>
                  <v-list-tile-title>{{me.name}}</v-list-tile-title>
                  <v-list-tile-sub-title>{{me.username}}</v-list-tile-sub-title>
                </v-list-tile-content>
              </v-list-tile>
            </v-list>

            <v-divider></v-divider>

            <v-list>
              <v-list-tile ripple @click="">
                <v-list-tile-action>
                  <v-icon>person</v-icon>
                </v-list-tile-action>
                <v-list-tile-title>پروفایل</v-list-tile-title>
              </v-list-tile>
            </v-list>

            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="accent" flat @click="onLogout">خروج</v-btn>
            </v-card-actions>
          </v-card>

        </v-menu>
      </v-toolbar>

      <v-navigation-drawer
        persistent
        :clipped="clipped"
        v-model="drawer"
        enable-resize-watcher
        fixed
        right
        app>
        <v-flex
          align-center
          justify-center
          text-xs-center>
          <v-avatar
            size="95"
            color="grey lighten-4">
            <img :src="me.avatar" alt="avatar">
          </v-avatar>
          <h2>{{me.name}}</h2>
          <p>سطح دسترسی: {{me.role}}</p>
        </v-flex>
        <v-list>
          <v-divider></v-divider>
          <v-list-tile ripple @click="" value="true" v-for="(item, i) in items" :key="i" :to="item.path">
            <v-list-tile-action>
              <v-icon class="menu-icon" v-html="item.icon"></v-icon>
            </v-list-tile-action>

            <v-list-tile-content>
              <v-list-tile-title v-text="item.title"></v-list-tile-title>
            </v-list-tile-content>

          </v-list-tile>
        </v-list>
      </v-navigation-drawer>
      <v-content>
        <transition  enter-active-class="animated slideInDown" leave-active-class="animated fadeOutDown">
          <router-view/>
        </transition>
      </v-content>
    </v-app>
  </div>
</template>
<script>
import { mapState } from 'vuex'
export default {
  name: 'Home',
  data () {
    if (this.$store.state.role === 1) {
      return {
        clipped: true,
        drawer: true,
        fixed: false,
        items: [{
          icon: 'home',
          title: 'خانه',
          path: '/'

        },
        {
          icon: 'group',
          title: 'کاربران',
          path: '/admin/users'
        },
        {
          icon: 'face',
          title: 'پرشکان',
          path: '/admin/doctors'
        },
        {
          icon: 'location_city',
          title: 'شهر و بیمارستان',
          path: '/admin/city&hospital'
        },
        {
          icon: 'local_library',
          title: 'مقطع و تخصص',
          path: '/admin/maghta&skill'
        }],
        right: true,
        title: 'سامانه پزشکان تمام وقت'
      }
    }
    if (this.$store.state.role === 4) {
      return {
        clipped: true,
        drawer: true,
        fixed: false,
        items: [{
          icon: 'home',
          title: 'خانه',
          path: '/'

        }
        ],
        right: true,
        title: 'سامانه پزشکان تمام وقت'
      }
    }
  },
  computed: {
    ...mapState([
      'me'
    ])
  },
  methods: {
    onLogout () {
      this.$store.dispatch('logout')
    }
  }
}
</script>
<style lang="scss">
  a.primary--text.v-list__tile--active.v-list__tile.v-list__tile--link.theme--light.primary--text {
    background-color: #D7D7D7;
  }
  .menu-icon{
    background-color: #D7D7D7;
    border-radius: 100%;
    padding: 7px;
  }
  .toolbar-title{
    font-weight: unset;
    font-size: initial;
  }
</style>
