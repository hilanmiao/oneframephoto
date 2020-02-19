import qs from 'querystring'
import axios from 'axios'
import { authInterceptor } from '~/services'

axios.defaults.baseURL = process.env.SERVER_URL

// Replace default serializer with one that works with Joi validation
axios.defaults.paramsSerializer = function (params) {
  return qs.stringify(params)
}

// Add a response interceptor
axios.interceptors.response.use(function (response) {
  return Promise.resolve(response)
}, authInterceptor.responseError)

// Initialize auth header
// axios.defaults.headers.common.Authorization =
//   'Bearer ' + store.state.auth.accessToken
axios.defaults.headers.common.Authorization =
  this.$store.state.auth.accessToken
