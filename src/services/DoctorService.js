import apiClient from '@/services/AxiosClient.js'

export default {
  getDoctors(page, perPage) {
    return apiClient.get('/doctor?_page=' + page + '&_limit=' + perPage)
  },
  getDoctor(id) {
    return apiClient.get('/doctors/' + id)
  },
  getAllDoctor() {
    return apiClient.get('/doctors')
  },
  getDoctorPeople(id) {
    return apiClient.get('/doctors/' + id + '/people')
  }
}
