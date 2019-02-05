import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import UsersMain from './views/UsersMain'
import DoctorsMain from './views/DoctorsMain'
import CityHospitalMain from './views/City&HospitalMain'
import MaghtaSkillMain from './views/Maghta&SkillMain'
import Login from './components/Login'
import store from './store/store'
Vue.use(Router)

export default new Router({
  routes: [{
    path: '/',
    component: Home,
    children: [
      { name: 'خانه',
        path: '/',
        component: () => import('./components/Dashboard'),
        beforeEnter (to, from, next) {
          if (store.state.role !== null) {
            next()
          } else {
            next('/login')
          }
        }
      },
      { path: 'admin/users',
        component: UsersMain,
        children: [
          { name: 'کاربران',
            path: '/',
            component: () => import('./components/Users'),
            beforeEnter (to, from, next) {
              if (store.state.role !== null) {
                next()
              } else {
                next('/login')
              }
            }
          },
          { name: 'ثبت کاربر',
            path: 'add',
            component: () => import('./components/AddEditUser'),
            beforeEnter (to, from, next) {
              if (store.state.role !== null) {
                next()
              } else {
                next('/login')
              }
            }
          },
          { name: 'ویرایش کاربر',
            path: 'edit/:id',
            component: () => import('./components/AddEditUser'),
            beforeEnter (to, from, next) {
              if (store.state.role !== null) {
                next()
              } else {
                next('/login')
              }
            }
          }
        ]
      },
      { path: 'admin/doctors',
        component: DoctorsMain,
        children: [
          { name: 'پزشکان',
            path: '/',
            component: () => import('./components/Doctors'),
            beforeEnter (to, from, next) {
              if (store.state.role !== null) {
                next()
              } else {
                next('/login')
              }
            }
          }
        ]
      },
      { path: 'admin/city&hospital',
        component: CityHospitalMain,
        children: [
          { name: 'شهر و بیمارستان',
            path: '/',
            component: () => import('./components/Cities'),
            beforeEnter (to, from, next) {
              if (store.state.role !== null) {
                next()
              } else {
                next('/login')
              }
            }
          }
        ]
      },
      { path: 'admin/maghta&skill',
        component: MaghtaSkillMain,
        children: [
          { name: 'مقاطع و تخصص ها',
            path: '/',
            component: () => import('./components/Doctors'),
            beforeEnter (to, from, next) {
              if (store.state.role !== null) {
                next()
              } else {
                next('/login')
              }
            }
          }
        ]
      }
    ] },
  {
    path: '/login',
    name: 'login',
    component: Login
  }
  ]
})
