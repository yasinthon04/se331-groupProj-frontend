import apiClient from '@/services/AxiosClient.js'

export default {
  getDoctors(perPage, page) {
    return apiClient.get('/doctor?_limit=' + perPage + '&_page=' + page)
  },
  getDoctor(id) {
    return apiClient.get('/doctor/' + id)
  },
  saveDoctor(doctors) {
    return apiClient.post('/doctor', doctors)
  },
  getDoctorByKeyword(keyword, perPage, page) {
    return apiClient.get(
      'doctor?_limit=' + perPage + '&_page=' + page + '&title=' + keyword
    )
  },
  getDoctorOwnPeople(id) {
    return apiClient.get('/doctor/' + id + '/people')
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
