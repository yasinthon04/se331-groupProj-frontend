import apiClient from '@/services/AxiosClient.js'

export default {
  getUsers(perPage, page) {
    return apiClient.get('/user?_limit=' + perPage + '&_page=' + page)
  },
  getUser(id) {
    return apiClient.get('/user/' + id)
  },
  saveUser(User) {
    return apiClient.post('/user', User)
  },
  getUserByKeyword(keyword, perPage, page) {
    return apiClient.get(
      'user?_limit=' + perPage + '&_page=' + page + '&title=' + keyword
    )
  },
  uploadFile(file) {
    let formData = new FormData()
    formData.append('file', file)
    return apiClient.post('/uploadFile', formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    })
  }
}
