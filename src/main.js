import Vue from 'vue'
import App from './App.vue'
import router from './router/router'
import Buefy from "buefy"
import store from './store'
import axios from 'axios'
import 'buefy/dist/buefy.css'
import 'vue-toast-notification/dist/theme-sugar.css';
import VueToast from "vue-toast-notification"
import AuthService from "./helpers/auth.header"
import isNumber from '@/helpers/filters/isNumber'

// font-Awesome
import {
  library
} from '@fortawesome/fontawesome-svg-core'
import {
  fas
} from '@fortawesome/free-solid-svg-icons'


import {
  baseURL
} from './helpers/environment'

import {
  ValidationObserver,
  ValidationProvider,
  extend,
  // localize
} from 'vee-validate';
// import en from 'vee-validate/dist/locale/en.json';
import {
  required,
  email,
  min
} from 'vee-validate/dist/rules';
import {
  FontAwesomeIcon
} from '@fortawesome/vue-fontawesome'
Vue.use(VueToast)
// install rules and localization
// Object.keys(rules).forEach(rule => {
//   extend(rule, rules[rule]);
// });
// localize('en', en);
extend('isRequired', {
  ...required,
  message: 'ໃສ່ຂໍ້ມູນ'
})

extend('isEmail', {
  ...email,
  message: 'ໃສ່ອີເມວໃຫ້ຖືກຕ້ອງ',
})

extend('min', {
  ...min,
  message: 'ຕ້ອງໃສ່ຢ່າງນ້ອຍ 6 ຕົວອັກສອນ',
})


// Install components globally
Vue.component('ValidationObserver', ValidationObserver);
Vue.component('ValidationProvider', ValidationProvider);


Vue.config.productionTip = false

library.add(fas)
Vue.component('vue-fontawesome', FontAwesomeIcon)
Vue.use(Buefy, {
  defaultIconComponent: "vue-fontawesome",
  defaultIconPack: "fas",
  customIconPacks: {
    fas: {
      sizes: {
        default: "lg",
        "is-small": "1x",
        "is-medium": "2x",
        "is-large": "3x"
      },
      iconPrefix: ""
    }
  }
});

Vue.filter('number', isNumber)

store.dispatch('auth/autoLogin')


axios.defaults.headers.common['Authorization'] = AuthService.accessToken().Authorization
axios.defaults.baseURL = baseURL
axios.interceptors.response.use((res) => {
    if (res.data.msg || res.data.message) {
      if (res.config.method === 'post') {
        Vue.$toast.open({
          message: res.data.msg,
          duration: 3000,
          position: 'bottom-right',
          type: 'success',
        })
      } else if (res.config.method === 'put' || res.config.method === 'patch') {
        Vue.$toast.open({
          message: res.data.msg,
          duration: 3000,
          position: 'bottom-right',
          type: 'success'
        })
      }
    }

    return Promise.resolve(res)
  }, error => {
    switch (error.response.status) {
      case 422:
        error.response.data.errors.forEach(err => {
          Vue.$toast.open({
            message: err.msg,
            duration: 3000,
            position: 'bottom-right',
            type: 'error'
          })
        })
        break;
      default:
        error.response.data.errors.forEach(err => {
          Vue.$toast.open({
            message: err.msg,
            duration: 3000,
            position: 'bottom-right',
            type: 'error'
          })
        })
        break
    }
    return Promise.reject(error)
  }),

  new Vue({
    store,
    router,
    render: h => h(App)
  }).$mount('#app')
