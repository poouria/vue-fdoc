<template>
  <div class="Page addUser">
    <v-form @submit.prevent="onsubmited" autocomplete="off">
      <v-container>
        <transition v-if="validationErrors !== []" enter-active-class="animated flash" leave-active-class="animated fadeOut">
          <v-alert   v-for="errors in validationErrors" value="true" type="error">
            {{errors}}
          </v-alert>
        </transition>
        <v-toolbar color="secondary">
          <v-toolbar-title class="head-text-color">اطلاعات شخصی</v-toolbar-title>
        </v-toolbar>
        <v-layout >
          <v-flex
            xs12
            md6
          >
            <v-text-field
              v-model="firstname"
              name="firstname"
              :error-messages="firstNameErrors"
              label="نام"
              required
            ></v-text-field>
          </v-flex>

          <v-flex
            xs12
            md6
          >
            <v-text-field
              v-model="lastname"
              name="lastname"
              label="نام خانوادگی"
              required
            ></v-text-field>
          </v-flex>
        </v-layout>

        <v-toolbar color="secondary">
          <v-toolbar-title class="head-text-color">اطلاعات کاربری</v-toolbar-title>
        </v-toolbar>
        <v-layout >
          <v-flex
            xs12
            md6
          >
            <v-text-field
              v-model="username"
              name="username"
              :error-messages="usernameErrors"
              label="نام کاربری"
              required
              :readonly="$route.path === '/admin/users/add' ? false : true"
            ></v-text-field>
          </v-flex>

          <v-flex
            xs12
            md6
          >
            <v-text-field
              v-model="email"
              name="email"
              :error-messages="emailErrors"
              label="ایمیل"
              required
            ></v-text-field>
          </v-flex>
        </v-layout>
        <v-layout v-if="$route.path === '/admin/users/add'">
          <v-flex
            xs12
            md6
          >
            <v-text-field
              v-model="password"
              :append-icon="showPass ? 'visibility_off' : 'visibility'"
              :type="showPass ? 'text' : 'password'"
              @click:append="showPass = !showPass"
              name="password"
              :error-messages="passwordErrors"
              label="کلمه عبور"
              required
            ></v-text-field>
          </v-flex>

          <v-flex
            xs12
            md6
          >
            <v-text-field
              v-model="cpassword"
              name="cpassword"
              :type="showPass ? 'text' : 'password'"
              :error-messages="cpasswordErrors"
              label="تکرار کلمه عبور"
              required
            ></v-text-field>
          </v-flex>
        </v-layout>
        <v-layout >
          <v-flex
            xs12
            md6
          >
            <v-select
              v-model="role"
              :items="roles"
              name="role"
              item-value="id"
              @change="onRoleChange"
              item-text="role_name"
              required
              :error-messages="roleErrors"
              label="نوع دسترسی"
              solo
            ></v-select>
          </v-flex>

          <transition enter-active-class="animated fadeInLeft" leave-active-class="animated fadeOutLeft">
            <v-flex v-if="selectedRole && selectedRole !== null"
                    xs12
                    md6
            >
              <v-select
                v-model="hsOrBm"
                :items="selectedRole === 3 ? hospitals : bime"
                name="hsOrBm"
                :error-messages="hsbmErrors"
                item-value="id"
                :item-text="selectedRole === 3 ? 'hospital_name' : 'bime_name'"
                :label="selectedRole === 3 ? 'نام بیمارستان' : 'نام بیمه'"
                solo
              ></v-select>
            </v-flex>
          </transition>
        </v-layout>
        <v-toolbar color="secondary">
          <v-toolbar-title class="head-text-color">اطلاعات تکمیلی</v-toolbar-title>
        </v-toolbar>
        <v-layout>
          <v-flex
            xs12
            md6
          >
            <v-checkbox
              label="فعال؟"
              name="isActive"
              v-model="isActive"
            ></v-checkbox>
          </v-flex>

          <v-flex
            xs12
            md2
          >
            <label v-ripple class="fileUpload elevation-2" for="fileax"><v-icon color="white">attach_file</v-icon>تصویر پروفایل</label>
            <input @change="avatarChanged" style="display: none" type="file" name="fileax" id="fileax">
          </v-flex>
          <v-flex
            xs12
            md4
          >
            <v-img
              v-if="avatarTemp !== null"
              max-width="70px"
              max-height="70px"
              :src="avatarTemp"
              aspect-ratio="1"
              class="grey lighten-2"
            >
              <v-layout
                slot="placeholder"
                align-center
                justify-center
                ma-0
              >
                <v-progress-circular indeterminate color="grey lighten-5"></v-progress-circular>
              </v-layout>
            </v-img>
          </v-flex>
        </v-layout>
        <v-divider></v-divider>
        <v-layout>
          <v-flex
            xs12
          >
            <v-btn
              color="success"
              :loading="$store.state.loading"
              :disabled="$store.state.loading"
              @click.prevent="onsubmited">{{submitButtonName}}</v-btn>
          </v-flex>
        </v-layout>
      </v-container>
    </v-form>
    <v-snackbar right v-model="showSnack" :color="snackColor">
      {{snackMessage}}
      <v-btn flat color="white" @click.native="showSnack = false">بستن</v-btn>
    </v-snackbar>
  </div>
</template>

<script>
import { validationMixin } from 'vuelidate'
import { required, email, sameAs, minLength } from 'vuelidate/lib/validators'
import requiredIf from 'vuelidate/lib/validators/requiredIf'
import router from '../router'
export default {
  mixins: [validationMixin],

  validations: {
    username: { required },
    password: { minLength: minLength(6),
      required: requiredIf(function () {
        return this.$route.path === '/admin/users/add'
      }) },
    cpassword: { sameAsPassword: sameAs('password'),
      required: requiredIf(function () {
        return this.$route.path === '/admin/users/add'
      }) },
    email: { email },
    firstname: { required },
    role: { required },
    hsOrBm: { required: requiredIf(function () {
      return this.selectedRole === 3 || this.selectedRole === 4
    }) }
  },
  name: 'AddUser',
  data () {
    return {
      validationErrors: [],
      selectedRole: null,
      snackColor: 'accent',
      snackMessage: null,
      showSnack: false,
      showPass: false,
      submitButtonName: 'ثبت اطلاعات',
      firstname: '',
      lastname: '',
      email: '',
      username: '',
      password: '',
      cpassword: '',
      isActive: true,
      role: null,
      hsOrBm: null,
      fileax: null,
      avatarTemp: null
    }
  },
  created () {
    if (this.$route.name === 'ثبت کاربر') {
      this.submitButtonName = 'ثبت اطلاعات'
      this.getRoles()
    }
    if (this.$route.name === 'ویرایش کاربر') {
      this.submitButtonName = 'ثبت تغییرات'
      this.getUser()
      this.getRoles()
    }
  },
  methods: {
    avatarChanged (event) {
      let reader = new FileReader()
      if (event.target.files && event.target.files.length > 0) {
        let file = event.target.files[0]
        reader.readAsDataURL(file)
        reader.onload = () => {
          this.avatarTemp = reader.result
        }
      }
      if (event.target.files.length > 0) {
        this.fileax = event.target.files[0]
      }
    },
    getRoles () {
      this.$store.commit('UNSET_USER_ERROR')
      this.$store.commit('SET_LOADING')
      this.$store.dispatch('getRoles').then(res => {
        this.$store.commit('UNSET_LOADING')
        this.$store.commit('SET_ROLES', res.data.data)
      },
      error => {
        this.$store.commit('SET_USER_ERROR', 'خطا در دریافت سطوح کاربری')
        console.log(error)
      })
    },
    onRoleChange (role) {
      if (role === 3 || role === 4) {
        // this.$store.state.selectedRole = role
        this.selectedRole = role
        if (role === 3) {
          this.$store.commit('UNSET_USER_ERROR')
          this.$store.commit('SET_LOADING')
          this.$store.dispatch('getHospitals').then(res => {
            this.$store.commit('UNSET_LOADING')
            this.$store.commit('SET_HOSPITALS', res.data.data)
          },
          error => {
            this.$store.commit('SET_USER_ERROR', 'خطا در دریافت بیمارستان ها')
            console.log(error)
          })
        }
        if (role === 4) {
          this.$store.commit('UNSET_USER_ERROR')
          this.$store.commit('SET_LOADING')
          this.$store.dispatch('getBime').then(res => {
            this.$store.commit('UNSET_LOADING')
            this.$store.commit('SET_BIME', res.data.data)
          },
          error => {
            this.$store.commit('SET_USER_ERROR', 'خطا در دریافت بیمه ها')
            console.log(error)
          })
        }
      } else {
        this.selectedRole = null
      }
    },
    getUser () {
      this.$store.commit('UNSET_USER_ERROR')
      this.$store.commit('SET_LOADING')
      this.$store.dispatch('getUser', this.$route.params.id).then(res => {
        this.$store.commit('UNSET_LOADING')
        this.username = res.data.data.username
        this.firstname = res.data.data.name
        this.lastname = res.data.data.family
        this.email = res.data.data.email
        this.isActive = res.data.data.isActive
        this.role = res.data.data.role_id
        if (res.data.data.role_id === 3) {
          this.onRoleChange(3)
          this.hsOrBm = res.data.data.hospital_id
        }
        if (res.data.data.role_id === 4) {
          this.onRoleChange(4)
          this.hsOrBm = res.data.data.bime_id
        }
        this.avatarTemp = res.data.data.avatar
      },
      error => {
        this.$store.commit('SET_USER_ERROR', 'خطا در دریافت اطلاعات کاربر')
        console.log(error)
      })
    },
    onsubmited () {
      var bimeIdTemp
      var hospitalIdTemp
      if (this.selectedRole === 3) {
        hospitalIdTemp = this.hsOrBm
        bimeIdTemp = null
      }
      if (this.selectedRole === 4) {
        bimeIdTemp = this.hsOrBm
        hospitalIdTemp = null
      }
      this.$v.$touch()
      if (!this.$v.$invalid) {
        this.loader = null
        this.$store.commit('SET_LOADING')
        let fd = new FormData()
        if (this.$route.path === '/admin/users/add') {
          if (this.fileax != null) {
            fd.append('avatar', this.fileax)
          }
          fd.append('username', this.username)
          fd.append('name', this.firstname)
          fd.append('isActive', +this.isActive)
          fd.append('family', this.lastname)
          fd.append('email', this.email)
          fd.append('bime_id', bimeIdTemp)
          fd.append('hospital_id', hospitalIdTemp)
          fd.append('role_id', this.role)
          fd.append('password', this.password)
          fd.append('password_confirmation', this.cpassword)

          this.$store.commit('UNSET_USER_ERROR')
          this.validationErrors = []
          this.$store.commit('SET_LOADING')
          this.$store.dispatch('storeUser', fd).then(res => {
            this.$store.commit('UNSET_LOADING')
            router.push('/admin/users')
            this.snackColor = 'success'
            this.snackMessage = 'کاربر با موفقیت ثبت شد'
            this.showSnack = true
            this.$store.commit('SET_STORE_USER_STATE', res.data.data)
          },
          error => {
            this.$store.commit('UNSET_LOADING')
            if (error.response.status === 400) {
              this.validationErrors = error.response.data.error
            } else {
              this.snackColor = 'error'
              this.snackMessage = 'خطا در ثبت کاربر '
              this.showSnack = true
              this.$store.commit('SET_USER_ERROR', 'خطا در ثبت کاربر')
            }
            console.log(error)
          })
        }
        if (this.$route.name === 'ویرایش کاربر') {
          if (this.fileax != null) {
            fd.append('avatar', this.fileax)
          }
          if (this.email != null) {
            fd.append('email', this.email)
          }
          fd.append('id', this.$route.params.id)
          fd.append('name', this.firstname)
          fd.append('isActive', +this.isActive)
          fd.append('family', this.lastname)
          fd.append('bime_id', bimeIdTemp)
          fd.append('hospital_id', hospitalIdTemp)
          fd.append('role_id', this.role)

          this.$store.commit('UNSET_USER_ERROR')
          this.validationErrors = []
          this.$store.commit('SET_LOADING')
          this.$store.dispatch('updateUser', fd).then(res => {
            this.$store.commit('UNSET_LOADING')
            router.push('/admin/users')
            this.snackColor = 'success'
            this.snackMessage = 'اطلاعات کاربر با موفقیت بروز شد'
            this.showSnack = true
            this.$store.commit('SET_STORE_USER_STATE', res.data.data)
          },
          error => {
            this.$store.commit('UNSET_LOADING')
            if (error.response.status === 400) {
              this.validationErrors = error.response.data.error
            } else {
              this.snackColor = 'error'
              this.snackMessage = 'خطا در بروزرسانی اطلاعات کاربر '
              this.showSnack = true
              this.$store.commit('SET_USER_ERROR', 'خطا در بروزرسانی اطلاعات کاربر')
            }
            console.log(error)
          })
        }
      }
    }
  },
  computed: {
    usernameErrors () {
      const errors = []
      if (!this.$v.username.$dirty) return errors
      !this.$v.username.required && errors.push('نام کاربری الزامی است')
      return errors
    },
    firstNameErrors () {
      const errors = []
      if (!this.$v.firstname.$dirty) return errors
      !this.$v.firstname.required && errors.push('نام الزامی است')
      return errors
    },
    emailErrors () {
      const errors = []
      if (!this.$v.email.$dirty) return errors
      !this.$v.email.email && errors.push('فرمت ایمیل صحیح نیست')
      return errors
    },
    passwordErrors () {
      const errors = []
      if (!this.$v.password.$dirty) return errors
      !this.$v.password.required && errors.push('کلمه عبور الزامی است')
      !this.$v.password.minLength && errors.push('کلمه عبور باید حداقل ۶ کاراکتر باشد')
      return errors
    },
    cpasswordErrors () {
      const errors = []
      if (!this.$v.cpassword.$dirty) return errors
      !this.$v.cpassword.required && errors.push('تایید کلمه عبور الزامی است')
      !this.$v.cpassword.sameAsPassword && errors.push('ورودی با کلمه عبور همخوانی ندارد')

      return errors
    },
    roleErrors () {
      const errors = []
      if (!this.$v.role.$dirty) return errors
      !this.$v.role.required && errors.push('نوع دسترسی الزامی است')
      return errors
    },
    hsbmErrors () {
      const errors = []
      if (!this.$v.hsOrBm.$dirty) return errors
      !this.$v.hsOrBm.required && errors.push('نوع دسترسی الزامی است')
      return errors
    },
    roles () {
      return this.$store.getters.allRoles
    },
    bime () {
      return this.$store.getters.allBime
    },
    hospitals () {
      return this.$store.getters.allHospitals
    }
  }
}
</script>

<style scoped>
.head-text-color{
  color: white;
}
label.fileUpload {
   background-color: #006064;
   color: white;
   padding: 10px;
   display: -webkit-inline-box;
   cursor: pointer;
   margin-top: 11px;
   border-radius: 3px;
}
</style>
