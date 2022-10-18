import axios from "axios"
import Vue from "vue"
axios.interceptors.response.use((res) => {
  if (res.data.msg) {
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
})
