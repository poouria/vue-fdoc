<template >
  <div class="back login Page">
    <transition enter-active-class="animated fadeIn" appear>
      <v-layout align-center justify-center row fill-height >
        <v-flex  xs12 sm12 md6 lg4>
          <v-card>
            <v-img style="background-color: #00838F"
                   :src="require('../../public/img/app/headerbg.png')"
                   :lazy-src="require('../../public/img/app/headerbg.png')"
                   aspect-ratio="2.1">
              <v-card-title primary-title class="text-xs-center">
                <v-container >
                  <v-img
                    :src="require('../../public/img/app/logo-large.png')"
                    :lazy-src="require('../../public/img/app/logo-large.png')"
                    width="200"
                    style = "margin: 0 auto"
                  ></v-img>
                  <h3 style="color: #EFEFEF" class="headline mb-0">دانشکده علوم پزشکی و خدمات بهداشتی درمانی آبادان</h3>
                  <div style="color: #6900ef" class="text-large">سامانه ثبت پزشکان تمام وقت</div>
                </v-container>
              </v-card-title>
            </v-img>

            <transition  enter-active-class="animated flash" leave-active-class="animated fadeOut">
              <v-alert v-if="$store.state.globalErrorVar !==null" value="true" type="error">
                {{ $store.state.globalErrorVar }}
              </v-alert>
            </transition>

            <v-card-actions>
              <v-container class="text-md-center">
                <v-form  @submit.prevent="onsubmited" autocomplete="off">
                  <v-text-field
                    prepend-icon="person"
                    v-model="username"
                    :error-messages="usernameErrors"
                    label="نام کاربری"
                    name="username"
                    required
                    @keydown.enter="onsubmited"
                    @input="$v.username.$touch()"
                    @blur="$v.username.$touch()"></v-text-field>

                  <v-text-field
                    v-model="password"
                    :error-messages="passwordErrors"
                    label="کلمه عبور"
                    name="password"
                    type="password"
                    prepend-icon="lock"
                    required
                    @keypress.enter="onsubmited"
                    @input="$v.password.$touch()"
                    @blur="$v.password.$touch()"></v-text-field>
                  <div class="text-xs-center">
                    <v-btn
                      :loading="$store.state.loading"
                      :disabled="$store.state.loading"
                      color="primary"
                      @click.prevent="onsubmited">
                      ورود
                    </v-btn>
                  </div>
                </v-form>
              </v-container>
            </v-card-actions>
          </v-card>
        </v-flex>
      </v-layout>
    </transition>
  </div>

</template>

<script>
import router from '../router'
import { validationMixin } from 'vuelidate'
import { required } from 'vuelidate/lib/validators'
export default {
  mixins: [validationMixin],

  validations: {
    username: { required },
    password: { required }
  },

  data () {
    return {
      loader: null,
      username: '',
      password: ''
    }
  },
  computed: {
    usernameErrors () {
      const errors = []
      if (!this.$v.username.$dirty) return errors
      !this.$v.username.required && errors.push('نام کاربری الزامی است')
      return errors
    },
    passwordErrors () {
      const errors = []
      if (!this.$v.password.$dirty) return errors
      !this.$v.password.required && errors.push('کلمه عبور الزامی است')
      return errors
    }
  },
  methods: {
    onsubmited () {
      this.$v.$touch()
      if (!this.$v.$invalid) {
        this.loader = null
        const loginFD = {
          username: this.username,
          password: this.password
        }
        this.$store.dispatch('login', loginFD)
      }
    }
  },
  mounted () {
    if (sessionStorage.getItem('token')) {
      router.push('/')
    }
  }

}

</script>

<style>
  .back{
    height: 100vh;
    background: -moz-linear-gradient(top, #80cbc4 1%, #4db6ac 26%, #26a69a 51%, #00897b 75%, #00796b 100%); /* FF3.6-15 */
    background: -webkit-linear-gradient(top, #80cbc4 1%,#4db6ac 26%,#26a69a 51%,#00897b 75%,#00796b 100%); /* Chrome10-25,Safari5.1-6 */
    background: linear-gradient(to bottom, #80cbc4 1%,#4db6ac 26%,#26a69a 51%,#00897b 75%,#00796b 100%); /* W3C, IE10+, FF16+, Chrome26+, Opera12+, Safari7+ */
    filter: progid:DXImageTransform.Microsoft.gradient( startColorstr='#80cbc4', endColorstr='#00796b',GradientType=0 ); /* IE6-9 */
  }
  @-moz-keyframes loader {
    from {
      transform: rotate(0);
    }
    to {
      transform: rotate(360deg);
    }
  }
  @-webkit-keyframes loader {
    from {
      transform: rotate(0);
    }
    to {
      transform: rotate(360deg);
    }
  }
  @-o-keyframes loader {
    from {
      transform: rotate(0);
    }
    to {
      transform: rotate(360deg);
    }
  }
  @keyframes loader {
    from {
      transform: rotate(0);
    }
    to {
      transform: rotate(360deg);
    }
  }
</style>
