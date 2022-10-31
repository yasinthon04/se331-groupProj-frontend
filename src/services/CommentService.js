import apiClient from '@/services/AxiosClient.js'

export default {
  addCommentToUser(id, comment) {
    return apiClient.post('/comment/people/' + id, {comment:comment})
  },
  getCommentList() {
    return apiClient.get('/comments')
  }
}
