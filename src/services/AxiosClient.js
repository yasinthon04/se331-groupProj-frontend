import axios from 'axios'
///import router from '@/router'

const apiClient = axios.create({
  baseURL: 'http://3.224.152.39:8999',
  withCredentials: false,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json'
  }
})
// apiClient.interceptors.response.use(
//   function (response) {
//     return response
//   },
//   function (error) {
//     if (error.response.status) {
//       router.push('/login')
//       return Promise.resolve(error.response)
//     } else {
//       return Promise.reject(error)
//     }
//   }
// )
export default apiClient
