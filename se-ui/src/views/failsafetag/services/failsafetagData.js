import http from '@/http-common'

class FailsafeTagData {
  getAll() {
    return http.get('/failsafe_tag')
  }

  get(id) {
    return http.get(`/failsafe_tag/${id}`)
  }

  create(data) {
    return http.post('/failsafe_tag', data)
  }

  update(id, data) {
    return http.put(`/failsafe_tag/${id}`, data)
  }

  delete(id) {
    return http.delete(`/failsafe_tag/${id}`)
  }

  deleteAll() {
    return http.delete(`/failsafe_tag`)
  }

  /*
  findByTitle(title) {
    return http.get(`/host?title=${title}`)
  }
  */
}

export default new FailsafeTagData()
