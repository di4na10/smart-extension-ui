import http from '@/http-common'

class ParameterData {
  getAll() {
    return http.get('/parameters')
  }

  get(Name) {
    return http.get(`/parameters/${Name}`)
  }

  create(data) {
    return http.post('/parameters', data)
  }

  update(Name, data) {
    return http.put(`/parameters/${Name}`, data)
  }

  delete(Name) {
    return http.delete(`/parameters/${Name}`)
  }

  deleteAll() {
    return http.delete(`/parameters`)
  }
}

export default new ParameterData()
