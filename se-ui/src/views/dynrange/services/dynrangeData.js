import http from '@/http-common'

class DynRangeData {
  getAll() {
    return http.get('/dynamic_range')
  }

  get(id) {
    return http.get(`/dynamic_range/${id}`)
  }

  create(data) {
    return http.post('/dynamic_range', data)
  }

  update(id, data) {
    return http.put(`/dynamic_range/${id}`, data)
  }

  delete(id) {
    return http.delete(`/dynamic_range/${id}`)
  }

  deleteAll() {
    return http.delete(`/dynamic_range`)
  }

  /*
  findByTitle(title) {
    return http.get(`/host?title=${title}`)
  }
  */
}

export default new DynRangeData()
