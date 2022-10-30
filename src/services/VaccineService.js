import apiClient from '@/services/AxiosClient.js'

export default {
  getVaccine(id, vaccine) {
    return apiClient.post('/vaccine/people/' + id, vaccine)
  }
}

