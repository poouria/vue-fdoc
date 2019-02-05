<template>
  <div class="Page users">
    <loading :active.sync="isLoading"
             :can-cancel="false"
             :loader="Spinnerloader"
             :height="Spinnerheight"
             :width="Spinnerwidth"
             :color="Spinnercolor"
             :background-color="SpinnerbgColor"
             :is-full-page="SpinnerfullPage">
    </loading>
    <v-card-actions>
      <v-container class="text-md-center pa-0">
        <v-item-group>
          <v-container grid-list-md>
            <v-layout wrap>
              <v-flex
                v-for="city in cities"
                xs6
                md4
                lg3
                xl2>
                <v-item >
                  <v-card raised hover style="height: 164px; overflow: hidden" color="purple" class="white--text" slot-scope="{}" >
                    <v-layout row class="card-vLayout" >
                      <v-flex xs12>
                        <v-card-title  class="pa-0" primary-title>
                          <v-container style="padding: 6px; margin-left: 4px">
                            <v-layout align-center justify-space-between row fill-height>
                              <div class="delete-container">
                                <div class="delete-btn-border" ripple @click="onDeleteDialog(city.id)">
                                  <v-icon class="delete-icon" dark right>delete_outline</v-icon>
                                </div>
                              </div>
                              <div>
                                <v-menu bottom right>
                                  <v-btn
                                    slot="activator"
                                    dark
                                    icon>
                                    <v-icon>more_vert</v-icon>
                                  </v-btn>
                                  <v-list>
                                    <v-list-tile ripple @click="$router.push('city&hospital/city/edit/'+ city.id)">
                                      <v-list-tile-title>
                                        <v-icon>mode_edit</v-icon>
                                        ویرایش
                                      </v-list-tile-title>
                                    </v-list-tile>
                                  </v-list>
                                </v-menu>
                              </div>
                            </v-layout>
                            <div style="text-align: center; margin-top: 10px">
                              <v-badge right color="error">
                                  <span slot="badge">6</span>
                                  <h3 style="font-size: 30px" class="headline text-center">{{city.city_name}}</h3>
                              </v-badge>
                              <br>
                                  <v-chip selected style="cursor: pointer" outline color="white">مشاهده بیمارستان ها</v-chip>
                            </div>
                          </v-container>
                        </v-card-title>
                      </v-flex>
                    </v-layout>
                  </v-card>
                </v-item>
              </v-flex>
            </v-layout>
          </v-container>
        </v-item-group>
        <v-btn
          color="pink"
          fab
          dark
          small
          absolute
          top
          right
        >
          <v-icon>add</v-icon>
        </v-btn>
      </v-container>
      <v-snackbar right v-model="showSnack" :color="snackColor">
        {{snackMessage}}
        <v-btn flat color="white" @click.native="showSnack = false">بستن</v-btn>
      </v-snackbar>
      <confirm @confirmDialog="OnUserDeleteConfirm($event)"></confirm>
    </v-card-actions>
  </div>
</template>

<script>
import axios from 'axios'
import Confirm from '../components/dialogs/confirm'
import Loading from 'vue-loading-overlay'
import 'vue-loading-overlay/dist/vue-loading.css'
export default {
  name: 'Users',
  components: { Confirm, Loading },
  data () {
    return {
      isLoading: false,
      SpinnerfullPage: false,
      Spinnerloader: 'dots',
      Spinnercolor: '#007bff',
      SpinnerbgColor: '#ffffff',
      Spinnerheight: 128,
      Spinnerwidth: 128,
      snackColor: 'accent',
      snackMessage: null,
      showSnack: false,
      toggleSearch: false
    }
  },
  created () {
    this.getCities()
  },
  computed: {
    cities () {
      return this.$store.getters.allCities
    }
  },
  methods: {
    getCities () {
      this.isLoading = true
      this.$store.commit('UNSET_CH_ERROR')
      this.$store.commit('SET_LOADING')
      this.$store.dispatch('getCities').then(res => {
        this.isLoading = false
        this.$store.commit('UNSET_LOADING')
        this.$store.commit('SET_CITIES', res.data.data)
      },
      error => {
        this.isLoading = false
        this.$store.commit('SET_CH_ERROR', 'خطا در دریافت شهرها')
        console.log(error)
      })
    },
    OnUserBlock (id, status) {
      const statusFD = {
        isActive: +status
      }
      axios
        .post(this.$store.state.baseUrl + '/admin/users/' + id + '/update?token=' + sessionStorage.getItem('token'), statusFD)
        .then(data => {
          if (data.status === 200) {
            this.snackColor = 'success'
            this.snackMessage = data.data.success
            this.showSnack = true
            this.getUsers()
          }
        })
        .catch(error => {
          this.snackColor = 'error'
          this.snackMessage = 'خطا در بروزرسانی وضعیت کاربر '
          this.showSnack = true
        })
    },
    onDeleteDialog (id) {
      const dialog = {
        id: id,
        message: 'آیا مایل به حذف کاربر می باشید؟',
        title: 'حذف کاربر'
      }
      this.$store.dispatch('show_dialog', dialog)
    },
    OnUserDeleteConfirm (event) {
      if (event != false) {
        const idFD = {
          id: event
        }
        axios
          .post(this.$store.state.baseUrl + '/admin/users/destroy?token=' + sessionStorage.getItem('token'), idFD)
          .then(data => {
            if (data.status === 200) {
              this.snackColor = 'success'
              this.snackMessage = data.data.success
              this.showSnack = true
              this.getUsers()
            }
          })
          .catch(error => {
            this.snackColor = 'error'
            this.snackMessage = 'خطا در حذف کاربر '
            this.showSnack = true
          })
      }
    }
  }
}
</script>

<style scoped>
  .card-vLayout{
    height: 164px;
    padding-right: 4px;
  }
  .delete-btn-border{
    position: absolute;
    background-color: #067e89;
    border-radius: 100%;
    padding: 13px;
    top: -45px;
    right: -25px;
    transition: all .5s;
  }
  .delete-container {
    position: relative;
  }
  .delete-container div:hover{
    position: absolute;
    border-radius: 100%;
    background-color: #066f7a;
    padding: 10px;
    top: -35px;
    right: -15px;
    transition: all .5s;
  }
  .delete-icon{
    margin-right: 10px;
    margin-top: 10px;
  }
  @media only screen and (max-width: 600px) {
    .showBlock{
      display: inline-block;
    }
    .hideAvatar {
      display: none;
    }
  }
</style>
