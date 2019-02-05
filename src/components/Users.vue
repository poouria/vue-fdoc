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
                v-for="user in users"
                xs12
                md6
                lg6
                xl3>
                <v-item >
                  <v-card raised hover style="height: 164px" color="purple" class="white--text" slot-scope="{}" >
                    <v-layout row class="card-vLayout" >
                      <v-flex class="hideAvatar" :class="user.isActive === 1 ? 'avatar-vFlex' : 'avatar-vFlex-disable'">
                        <v-avatar size="125" style="padding-top:27px" >
                          <v-icon v-if="user.isActive === 0" class="avatar-block">block</v-icon>
                          <v-img :src="user.avatar" cover></v-img>
                        </v-avatar>
                      </v-flex>
                      <v-flex xs12>
                        <v-card-title class="pa-0" primary-title>
                          <v-container style="padding: 6px">
                            <v-layout align-center justify-space-between row fill-height>
                              <v-tooltip bottom>
                                <h4 slot="activator" class="subheading">{{user.name}} {{user.family !== 'null' ? user.family : ''}} <span class="showBlock" v-if="user.isActive === 0">(بلاک شده)</span></h4>
                                <span>نام کاربر</span>
                              </v-tooltip>
                              <div>
                                <v-menu bottom right>
                                  <v-btn
                                    slot="activator"
                                    dark
                                    icon>
                                    <v-icon>more_vert</v-icon>
                                  </v-btn>
                                  <v-list>
                                    <v-list-tile ripple @click="$router.push('users/edit/'+ user.id)">
                                      <v-list-tile-title>
                                        <v-icon>mode_edit</v-icon>
                                        ویرایش
                                      </v-list-tile-title>
                                    </v-list-tile>
                                    <v-list-tile ripple @click="onDeleteDialog(user.id)">
                                      <v-list-tile-title>
                                        <v-icon>delete</v-icon>
                                        حذف
                                      </v-list-tile-title>
                                    </v-list-tile>
                                    <v-list-tile ripple @click="OnUserBlock(user.id, !user.isActive)">
                                      <v-list-tile-title v-if="user.isActive === 1">
                                        <v-icon>block</v-icon>
                                        غیر فعال کردن
                                      </v-list-tile-title>
                                      <v-list-tile-title v-if="user.isActive === 0">
                                        <v-icon>block</v-icon>
                                        فعال کردن
                                      </v-list-tile-title>
                                    </v-list-tile>
                                  </v-list>
                                </v-menu>

                              </div>
                            </v-layout>
                            <v-divider></v-divider>
                            <div style="text-align: right">
                              <v-tooltip right>
                                <div slot="activator">
                                  <v-icon dark right>card_membership</v-icon>
                                  {{user.username}}
                                </div>
                                <span>نام کاربری</span>
                              </v-tooltip>
                              <v-tooltip right>
                                <div slot="activator">
                                  <v-icon dark right>mail_outline</v-icon>
                                  {{user.email != null ? user.email : 'ثبت نشده'}}
                                </div>
                                <span>ایمیل</span>
                              </v-tooltip>
                              <v-tooltip right>
                                <div slot="activator">
                                  <v-icon dark right>verified_user</v-icon>
                                  {{user.role}}
                                </div>
                                <span>سطح کاربری</span>
                              </v-tooltip>
                              <v-tooltip right>
                                <div v-if="user.bime_id !== 'null'" slot="activator">
                                  <v-icon dark right>location_city</v-icon>
                                  {{user.bime}}
                                </div>
                                <div v-if="user.hospital_id !== 'null'" slot="activator">
                                  <v-icon dark right>location_city</v-icon>
                                  {{user.hospital}}
                                </div>
                                <span v-if="user.bime_id !== 'null'">نام بیمه</span>
                                <span v-if="user.hospital_id !== 'null'">نام بیمارستان</span>
                              </v-tooltip>
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
    this.getUsers()
  },
  computed: {
    users () {
      return this.$store.getters.allUsers
    }
  },
  methods: {
    getUsers () {
      this.isLoading = true
      this.$store.commit('UNSET_USER_ERROR')
      this.$store.commit('SET_LOADING')
      this.$store.dispatch('getUsers').then(res => {
        this.isLoading = false
        this.$store.commit('UNSET_LOADING')
        this.$store.commit('SET_USERS', res.data.data)
      },
      error => {
        this.isLoading = false
        this.$store.commit('SET_USER_ERROR', 'خطا در دریافت کاربران')
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
  .avatar-vFlex{
    background: #7873f5!important;
    background: linear-gradient(50deg,#ff6ec4,#7873f5)!important;
  }
  .avatar-vFlex-disable{
    background: #7d7d7d !important;
  }
  .avatar-block {
    position: absolute;
    z-index: 1;
    font-size: 147px;
    color: red;
  }
  .showBlock{
    display: none;
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
