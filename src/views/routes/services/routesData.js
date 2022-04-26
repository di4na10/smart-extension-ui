import http from '@/http-common'

class RoutesData {
  getAll() {
    return http.get('/routes')
  }

  get(id) {
    return http.get(`/routes/${id}`)
  }

  create(data) {
    return http.post('/routes', data)
  }

  update(id, data) {
    return http.put(`/routes/${id}`, data)
  }

  delete(id) {
    return http.delete(`/routes/${id}`)
  }

  deleteAll() {
    return http.delete(`/routes`)
  }
}

export default new RoutesData()
