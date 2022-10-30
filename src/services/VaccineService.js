import apiClient from '@/services/AxiosClient.js'

export default {
  getVaccine(id, vaccine) {
    return apiClient.post('/vaccines/people' + id, vaccine)
  }
}
